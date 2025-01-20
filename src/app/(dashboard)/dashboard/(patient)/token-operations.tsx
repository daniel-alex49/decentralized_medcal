import React, { useEffect, useState } from "react"
import { ethers } from "ethers"
import { Loader2, Plus } from "lucide-react"

import { TokenABI, TokenAddress } from "@/lib/contract"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { useToast } from "@/components/ui/use-toast"
import { MedicalContract } from "@/components/contract"

export const HealthTokenBalance = () => {
  const [balance, setBalance] = useState<string>("0")
  const [topUpAmount, setTopUpAmount] = useState<string>("")
  const [loading, setLoading] = useState<boolean>(false)
  const [contract, setContract] = useState<ethers.Contract | null>(null)
  const [medicalContract, setMedicalContract] =
    useState<MedicalContract | null>(null)
  const { toast } = useToast()

  useEffect(() => {
    const initializeContracts = async () => {
      try {
        if (!window.ethereum) {
          toast({
            title: "Web3 Not Found",
            description: "Please install MetaMask to use this feature.",
            variant: "destructive",
          })
          return
        }

        const provider = new ethers.BrowserProvider(window.ethereum)
        const signer = await provider.getSigner()
        const tokenContract = new ethers.Contract(
          TokenAddress,
          TokenABI,
          signer
        )
        setContract(tokenContract)

        // Initialize medical contract
        const medical = new MedicalContract(await signer.getAddress())
        await medical.init()
        setMedicalContract(medical)

        await fetchBalance(tokenContract, signer)

        // Listen for account changes
        window.ethereum.on("accountsChanged", () => initializeContracts())
      } catch (error) {
        console.error("Initialization error:", error)
        toast({
          title: "Connection Error",
          description: "Failed to connect to the blockchain.",
          variant: "destructive",
        })
      }
    }

    initializeContracts()

    return () => {
      // Clean up listeners
      if (window.ethereum) {
        window.ethereum.removeAllListeners("accountsChanged")
      }
    }
  }, [])

  const fetchBalance = async (
    tokenContract: ethers.Contract,
    signer: ethers.Signer
  ) => {
    if (!contract) {
      toast({
        title: "Invalid Amount",
        description: "Please enter a valid amount to top up.",
        variant: "destructive",
      })
      return
    }
    try {
      const address = await signer.getAddress()
      const balanceWei = await contract.balanceOf(address)
      const balanceEth = ethers.formatEther(balanceWei)
      setBalance(balanceEth)
    } catch (error) {
      console.error("Balance fetch error:", error)
      toast({
        title: "Error",
        description: "Failed to fetch token balance.",
        variant: "destructive",
      })
    }
  }

  const handleTopUp = async () => {
    if (!contract || !topUpAmount || parseFloat(topUpAmount) <= 0) {
      toast({
        title: "Invalid Amount",
        description: "Please enter a valid amount to top up.",
        variant: "destructive",
      })
      return
    }

    setLoading(true)
    try {
      const ethAmount = ethers.parseEther(topUpAmount)
      const tx = await contract.buyTokens({ value: ethAmount })
      await tx.wait()

      // Fetch updated balance
      if (window.ethereum) {
        const provider = new ethers.BrowserProvider(window.ethereum)
        const signer = await provider.getSigner()
        await fetchBalance(contract, signer)
      }

      setTopUpAmount("")
      toast({
        title: "Success",
        description: `Successfully topped up ${topUpAmount} ETH worth of HTK tokens.`,
      })
    } catch (error: any) {
      console.error("Top up error:", error)
      toast({
        title: "Transaction Failed",
        description: error.message || "Failed to top up tokens.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleApproveSpending = async () => {
    if (!contract || !medicalContract) return

    setLoading(true)
    try {
      const amount = ethers.parseEther("1000000") // Large approval amount
      const tx = await contract.approve(medicalContract.account, amount)
      await tx.wait()
      toast({
        title: "Success",
        description: "Spending approved for medical contract.",
      })
    } catch (error: any) {
      console.error("Approval error:", error)
      toast({
        title: "Approval Failed",
        description: error.message || "Failed to approve token spending.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card className="size-full">
      <CardHeader>
        <CardTitle>HTK Token Balance</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium">Current Balance:</span>
          <span className="text-lg font-bold">
            {parseFloat(balance).toFixed(2)} HTK
          </span>
        </div>

        <div className="flex space-x-2">
          <Input
            type="number"
            value={topUpAmount}
            onChange={(e) => setTopUpAmount(e.target.value)}
            placeholder="Amount in ETH"
            className="flex-1"
            min="0"
            step="0.01"
          />
          <Button
            onClick={handleTopUp}
            className="bg-green-500 text-white hover:bg-green-600"
            disabled={loading || !topUpAmount}
          >
            {loading ? (
              <Loader2 className="mr-2 size-4 animate-spin" />
            ) : (
              <Plus className="mr-2 size-4" />
            )}
            Top Up
          </Button>
        </div>

        <Button
          onClick={handleApproveSpending}
          className="w-full"
          variant="outline"
          disabled={loading}
        >
          {loading ? (
            <Loader2 className="mr-2 size-4 animate-spin" />
          ) : (
            "Approve Medical Contract"
          )}
        </Button>
      </CardContent>
    </Card>
  )
}
