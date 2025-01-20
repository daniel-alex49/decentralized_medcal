"use client"

import { useEffect, useState } from "react"
import { useSDK } from "@metamask/sdk-react"
import { InfoIcon, WalletIcon } from "lucide-react"

import { toast } from "@/hooks/use-toast"
import { Button } from "@/components/ui/button"
import { ToastAction } from "@/components/ui/toast"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

import MetaMaskProvider from "./MetamaskProvider"
import { Toaster } from "./ui/toaster"

// Move constants to a separate configuration object
const CHAIN_CONFIG = {
  GANACHE_TESTNET: "0x539",
  LOCAL_TESTNET: "0x7a69",
  FUJI_TESTNET: "0xa869", // Fuji testnet chain ID
} as const

// Type definitions for better type safety
type ConnectWalletButtonProps = {
  setAddress: (addr: string) => void
}

const switchEthereumChain = async (e: React.MouseEvent<HTMLButtonElement>) => {
  e.preventDefault()

  if (!window?.ethereum) {
    toast({
      title: "MetaMask Not Found",
      description: "Please install MetaMask to continue",
      variant: "destructive",
    })
    return
  }

  try {
    await window.ethereum.request({
      method: "wallet_switchEthereumChain",
      params: [{ chainId: CHAIN_CONFIG.FUJI_TESTNET }],
    })
    window.location.reload()
  } catch (error) {
    console.error("Failed to switch chain:", error)
    toast({
      title: "Chain Switch Failed",
      description: "Failed to switch to Ganache network",
      variant: "destructive",
    })
  }
}

const ConnectWalletButton = ({ setAddress }: ConnectWalletButtonProps) => {
  const [chainId, setChainId] = useState<string | null>(null)
  const [connected, setConnected] = useState<boolean>(false)
  const { sdk, connecting, balance } = useSDK()

  useEffect(() => {
    const ethereum = window?.ethereum

    if (!ethereum) return

    const checkConnection = async () => {
      if (ethereum?.selectedAddress) {
        setChainId(ethereum.chainId)
        setConnected(true)
        setAddress(ethereum.selectedAddress)
      } else {
        setConnected(false)
      }
    }

    const handleAccountsChanged = (accounts: string[]) => {
      if (accounts.length > 0) {
        setConnected(true)
        setAddress(accounts[0])
      } else {
        setConnected(false)
        window.localStorage.removeItem("eth_id")
      }
    }

    const handleChainChanged = (newChainId: string) => {
      setChainId(newChainId)
      window.location.reload()
    }

    checkConnection()

    ethereum.on("accountsChanged", handleAccountsChanged)
    ethereum.on("chainChanged", handleChainChanged)

    return () => {
      ethereum.removeListener("accountsChanged", handleAccountsChanged)
      ethereum.removeListener("chainChanged", handleChainChanged)
    }
  }, [setAddress])

  const isOnTestnet =
    chainId === CHAIN_CONFIG.GANACHE_TESTNET ||
    chainId === CHAIN_CONFIG.LOCAL_TESTNET

  const connect = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()

    if (!window?.ethereum) {
      toast({
        title: "MetaMask Not Found",
        description: "Please install MetaMask to continue",
        variant: "destructive",
      })
      return
    }

    try {
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      })

      if (accounts?.[0]) {
        setConnected(true)
        setChainId(window.ethereum.chainId)
        setAddress(accounts[0])
        window.localStorage.setItem("eth_id", accounts[0])

        toast({
          title: "MetaMask Connected!",
          description: `Address: ${accounts[0].slice(0, 15)}...`,
          action: (
            <ToastAction
              altText="Logout"
              onClick={disconnect}
              className="bg-destructive/50"
            >
              Logout
            </ToastAction>
          ),
        })
      }
    } catch (err) {
      console.error("Error connecting to MetaMask:", err)
      toast({
        title: "Connection Failed",
        description: "Failed to connect to MetaMask",
        variant: "destructive",
      })
    }
  }

  const disconnect = async () => {
    try {
      await sdk?.terminate()
      window.localStorage.removeItem("eth_id")
      setConnected(false)
      setAddress("")

      toast({
        title: "Disconnected",
        description: "Successfully disconnected from MetaMask",
      })
    } catch (err) {
      console.error("Error disconnecting:", err)
      toast({
        title: "Disconnect Failed",
        description: "Failed to disconnect from MetaMask",
        variant: "destructive",
      })
    }
  }

  return (
    <div className="relative">
      {connected ? (
        isOnTestnet ? (
          <div className="flex items-center gap-4">
            <Button type="button" variant="destructive" onClick={disconnect}>
              <WalletIcon className="size-4" /> Disconnect
            </Button>

            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <InfoIcon className="size-6 text-primary/50" />
                </TooltipTrigger>
                <TooltipContent>
                  <code>{balance ?? "Balance not available"}</code>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        ) : (
          <Button
            variant="destructive"
            type="button"
            onClick={switchEthereumChain}
          >
            Switch Network
          </Button>
        )
      ) : (
        <Button
          type="button"
          variant="default"
          disabled={connecting}
          onClick={connect}
        >
          <WalletIcon className="size-4" /> Connect MetaMask
        </Button>
      )}
    </div>
  )
}

const NavBar = ({ setAddress }: ConnectWalletButtonProps) => {
  return (
    <MetaMaskProvider>
      <Toaster />
      <ConnectWalletButton setAddress={setAddress} />
    </MetaMaskProvider>
  )
}

export default NavBar
