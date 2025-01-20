"use client"

import { ethers } from "ethers"

import {
  ContractABI,
  ContractAddress,
  TokenABI,
  TokenAddress,
} from "@/lib/contract"

import { toast } from "./ui/use-toast"

interface Doctor {
  doctorAddress: string
  name: string
  speciality: string
  fees: ethers.Numeric
  tokenBalance: ethers.Numeric
  verified: boolean
}

interface Patient {
  patientAddress: string
  name: string
}

interface Medication {
  name: string
  dosage: string
  duration: number
  additionalInstructions: string
}

interface Prescription {
  id: number
  doctorAddress: string
  patientAddress: string
  medications: Medication[]
  issueDate: number
  active: boolean
}

export class MedicalContract {
  private provider: ethers.BrowserProvider
  private signer: ethers.Signer
  private prescriptionContract: ethers.Contract
  private tokenContract: ethers.Contract
  public connected: boolean = false
  public account: string | null = null

  constructor(address: string) {
    this.account = address
    this.connected = true
    toast({
      title: "Contract is live!",
    })
  }

  public async init() {
    if (!window.ethereum) throw new Error("Metamask not present")
    this.provider = new ethers.BrowserProvider(window.ethereum)
    this.signer = await this.provider.getSigner()

    // Initialize the contracts
    this.prescriptionContract = new ethers.Contract(
      ContractAddress,
      ContractABI,
      this.signer
    )
    this.tokenContract = new ethers.Contract(
      TokenAddress,
      TokenABI,
      this.signer
    )
  }

  /** Disconnect wallet */
  public disconnect(): void {
    this.connected = false
    this.account = null
  }

  /** Register a doctor with name, speciality, and fees */
  public async registerDoctor(
    name: string,
    speciality: string,
    fees: number
  ): Promise<void> {
    if (!this.connected) return this.notifyNotConnected()

    try {
      const tx = await this.prescriptionContract.registerDoctor(
        name,
        speciality,
        ethers.parseUnits(fees.toString(), "ether")
      )
      await tx.wait()
      toast({
        title: "Success",
        description: "Doctor registered successfully!",
      })
    } catch (error) {
      alert("Cannot register as doctor in blockchain!")
    }
  }

  /** Register a patient with name */
  public async registerPatient(name: string): Promise<void> {
    if (!this.connected) return this.notifyNotConnected()

    try {
      const tx = await this.prescriptionContract.registerPatient(name)
      await tx.wait()
      toast({
        title: "Success",
        description: "Patient registered successfully!",
      })
    } catch (error) {
      console.error("Error registering patient", error)
      toast({
        title: "Registration Error",
        description: "Failed to register patient.",
      })
    }
  }

  /** Issue a prescription with patient address and medication details */
  public async issuePrescription(
    patientAddress: string,
    medications: Medication[]
  ): Promise<void> {
    if (!this.connected) return this.notifyNotConnected()

    try {
      const tx = await this.prescriptionContract.issuePrescription(
        patientAddress,
        medications
      )
      await tx.wait()
      toast({
        title: "Success",
        description: "Prescription issued successfully!",
      })
    } catch (error) {
      console.error("Error issuing prescription", error)
      toast({
        title: "Issue Error",
        description: "Failed to issue prescription.",
      })
    }
  }

  /** Pay a doctor with the specified amount of HealthTokens */
  public async payDoctor(doctorAddress: string, amount: number): Promise<void> {
    if (!this.connected) return this.notifyNotConnected()

    const amountInTokens = ethers.parseUnits(amount.toString(), "ether")

    try {
      // Approve tokens
      const approvalTx = await this.tokenContract.approve(
        ContractAddress,
        amountInTokens
      )
      await approvalTx.wait()

      // Pay the doctor
      const payTx = await this.prescriptionContract.payDoctor(
        doctorAddress,
        amountInTokens
      )
      await payTx.wait()
      toast({ title: "Success", description: "Doctor paid successfully!" })
    } catch (error) {
      console.error("Error paying doctor", error)
      toast({
        title: "Payment Error",
        description: "Failed to pay the doctor.",
      })
    }
  }

  /** Withdraw tokens to ETH for the doctor */
  public async withdrawTokens(tokenAmount: number): Promise<void> {
    if (!this.connected) return this.notifyNotConnected()

    try {
      const tx = await this.prescriptionContract.withdrawTokens(
        ethers.parseUnits(tokenAmount.toString(), "ether")
      )
      await tx.wait()
      toast({ title: "Success", description: "Tokens withdrawn successfully!" })
    } catch (error) {
      console.error("Error withdrawing tokens", error)
      toast({
        title: "Withdrawal Error",
        description: "Failed to withdraw tokens.",
      })
    }
  }

  /** Get doctor details by address */
  public async getDoctor(doctorAddress: string): Promise<Doctor> {
    try {
      const doctor = await this.prescriptionContract.doctors(doctorAddress)
      return doctor
    } catch (error) {
      console.error("Error fetching doctor details", error)
      toast({
        title: "Fetch Error",
        description: "Failed to fetch doctor details.",
      })
      throw error
    }
  }

  /** Notify user if not connected */
  private notifyNotConnected(): void {
    toast({
      title: "Not Connected",
      description: "Please connect your wallet first.",
    })
  }
}
