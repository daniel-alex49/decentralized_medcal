import { useEffect, useState } from "react"
import io, { type Socket } from "socket.io-client"

export function useSocket() {
  const [socket, setSocket] = useState<Socket | null>(null)

  useEffect(() => {
    const newSocket = io()
    setSocket(newSocket)

    return () => {
      newSocket.close()
    }
  }, [])

  return { socket }
}
