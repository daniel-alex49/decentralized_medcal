"use client"

import React, { useState } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { Lock, LockOpen, LogIn, MessageSquare } from "lucide-react"

import { Alert, AlertDescription } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"

const JoinPage = () => {
  const [username, setUsername] = useState<string>("")
  const [roomName, setRoomName] = useState<string>("")
  const [password, setPassword] = useState<string>("")
  const [error, setError] = useState<string>("")
  const [isJoining, setIsJoining] = useState<boolean>(false)
  const router = useRouter()

  const handleCreateRoom = (e: React.FormEvent) => {
    e.preventDefault()
    if (username.trim() && roomName.trim()) {
      setIsJoining(true)
      sessionStorage.setItem(
        "chatCredentials",
        JSON.stringify({
          username: username.trim(),
          room: roomName.trim(),
          password: password.trim(),
          isCreator: true,
        })
      )
      router.push(`/dashboard/chat/room/${roomName.trim()}`)
    }
  }

  const handleJoinRoom = (e: React.FormEvent) => {
    e.preventDefault()
    if (username.trim() && roomName.trim()) {
      setIsJoining(true)
      sessionStorage.setItem(
        "chatCredentials",
        JSON.stringify({
          username: username.trim(),
          room: roomName.trim(),
          password: password.trim(),
          isCreator: false,
        })
      )
      router.push(`/dashboard/chat/room/${roomName.trim()}`)
    }
  }

  return (
    <div className="min-h-screen bg-background p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        className="mx-auto mt-20 max-w-md"
      >
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MessageSquare className="size-5" />
              Join or Create Room
            </CardTitle>
          </CardHeader>
          <CardContent>
            {error && (
              <Alert variant="destructive" className="mb-4">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            <form onSubmit={handleCreateRoom} className="space-y-4">
              <div>
                <Input
                  type="text"
                  placeholder="Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
              <div>
                <Input
                  type="text"
                  placeholder="Room Name"
                  value={roomName}
                  onChange={(e) => setRoomName(e.target.value)}
                />
              </div>
              <div className="relative">
                <Input
                  type="password"
                  placeholder="Password (optional)"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                {password ? (
                  <Lock className="absolute right-3 top-2.5 size-4 text-muted-foreground" />
                ) : (
                  <LockOpen className="absolute right-3 top-2.5 size-4 text-muted-foreground" />
                )}
              </div>
              <div className="flex gap-2">
                <Button type="submit" disabled={isJoining} className="flex-1">
                  Create Room
                </Button>
                <Button
                  type="button"
                  onClick={handleJoinRoom}
                  disabled={isJoining}
                  variant="secondary"
                  className="flex-1"
                >
                  <LogIn className="mr-2 size-4" />
                  Join Room
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}

export default JoinPage
