"use client"

import type React from "react"
import { useEffect, useRef, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { Lock, Moon, Sun, Users } from "lucide-react"
import { User } from "next-auth"
import { useSession } from "next-auth/react"
import io, { type Socket } from "socket.io-client"

import { Alert, AlertDescription } from "@/components/ui/alert"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"

type Message = {
  id: string
  text: string
  sender: string
  timestamp: number
  system?: boolean
  room?: string
}

type Room = {
  name: string
  hasPassword: boolean
}

export default function ChatApp({ user }: { user: User }) {
  const [message, setMessage] = useState("")
  const [messages, setMessages] = useState<Message[]>([])
  const [users, setUsers] = useState<User[]>([])
  const [currentRoom, setCurrentRoom] = useState<string | null>(null)
  const [showRoomForm, setShowRoomForm] = useState(true)
  const [roomName, setRoomName] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const socketRef = useRef<Socket>()

  useEffect(() => {
    if (user?.name) {
      socketRef.current = io(
        process.env.NEXT_PUBLIC_CHAT_BACKEND || "http://localhost:5000"
      )

      socketRef.current.on("error", (error: { message: string }) => {
        setError(error.message)
      })

      socketRef.current.on("message", (message: Message) => {
        if (message.room === currentRoom) {
          setMessages((prev) => [...prev, message])
        }
      })

      socketRef.current.on("user_list", ({ users }: { users: User[] }) => {
        setUsers(users)
      })

      socketRef.current.on(
        "room_joined",
        ({ room, username }: { room: string; username: string }) => {
          setCurrentRoom(room)
          setShowRoomForm(false)
          setMessages([
            {
              id: Date.now().toString(),
              text: `${username} joined ${room}`,
              sender: "System",
              timestamp: Date.now(),
              system: true,
              room,
            },
          ])
        }
      )

      return () => {
        socketRef.current?.disconnect()
      }
    }
  }, [currentRoom])

  const handleCreateRoom = (e: React.FormEvent) => {
    e.preventDefault()
    if (user?.name && roomName.trim()) {
      socketRef.current?.emit("create_room", {
        room: roomName.trim(),
        password: password.trim(),
        username: user.name,
      })
    }
  }

  const handleJoinRoom = (e: React.FormEvent) => {
    e.preventDefault()
    if (user?.name && roomName.trim()) {
      socketRef.current?.emit("join_room", {
        room: roomName.trim(),
        password: password.trim(),
        username: user.name,
      })
    }
  }

  const sendMessage = (e: React.FormEvent) => {
    e.preventDefault()
    if (message.trim() && user?.name && currentRoom) {
      socketRef.current?.emit("message", {
        text: message.trim(),
        room: currentRoom,
      })
      setMessage("")
    }
  }

  if (!user) {
    return <div>Please sign in to join the chat.</div>
  }

  return (
    <div className={`min-h-screen`}>
      <Card className="mx-auto my-8 max-w-4xl">
        <CardHeader className="flex items-center justify-between">
          <CardTitle>
            {currentRoom ? `Room: ${currentRoom}` : "Join a Room"}
          </CardTitle>
        </CardHeader>
        <CardContent>
          {error && (
            <Alert variant="destructive" className="mb-4">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {showRoomForm ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-4"
            >
              <h2 className="text-lg font-semibold">Join or Create Room</h2>
              <form onSubmit={handleCreateRoom} className="space-y-4">
                <Input
                  type="text"
                  placeholder="Room Name"
                  value={roomName}
                  onChange={(e) => setRoomName(e.target.value)}
                />
                <Input
                  type="password"
                  placeholder="Password (optional)"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <div className="flex space-x-2">
                  <Button type="submit" className="flex-1">
                    <Lock className="mr-2 size-4" />
                    Create Room
                  </Button>
                  <Button
                    type="button"
                    onClick={handleJoinRoom}
                    variant="secondary"
                    className="flex-1"
                  >
                    <Users className="mr-2 size-4" />
                    Join Room
                  </Button>
                </div>
              </form>
            </motion.div>
          ) : (
            <div className="grid grid-cols-[200px_1fr] gap-4">
              <div>
                <h2 className="mb-2 text-lg font-semibold">
                  Users ({users.length})
                </h2>
                <ul className="space-y-2">
                  <AnimatePresence>
                    {users.map((user) => (
                      <motion.li
                        key={user.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        transition={{ duration: 0.2 }}
                        className="flex items-center space-x-2"
                      >
                        <Avatar>
                          <AvatarImage
                            src={`https://api.dicebear.com/6.x/initials/svg?seed=${user.name}`}
                          />
                          <AvatarFallback>
                            {user.name?.[0] || "V"}
                          </AvatarFallback>
                        </Avatar>
                        <span>{user.name}</span>
                      </motion.li>
                    ))}
                  </AnimatePresence>
                </ul>
              </div>
              <div className="flex h-[500px] flex-col">
                <div className="flex-1 space-y-4 overflow-y-auto p-4">
                  <AnimatePresence>
                    {messages.map((msg) => (
                      <motion.div
                        key={msg.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.2 }}
                        className={`flex ${msg.sender === user?.name ? "justify-end" : "justify-start"}`}
                      >
                        <div
                          className={`max-w-xs ${
                            msg.system
                              ? "bg-gray-200 dark:bg-gray-700"
                              : msg.sender === user?.name
                                ? "bg-blue-500 text-white"
                                : "bg-gray-300 dark:bg-gray-600"
                          } rounded-lg p-3`}
                        >
                          {!msg.system && (
                            <p className="font-semibold">{msg.sender}</p>
                          )}
                          <p>{msg.text}</p>
                          <p className="mt-1 text-right text-xs">
                            {new Date(msg.timestamp).toLocaleTimeString()}
                          </p>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
                <form onSubmit={sendMessage} className="flex space-x-2 p-4">
                  <Input
                    type="text"
                    placeholder="Type a message..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="flex-1"
                  />
                  <Button type="submit">Send</Button>
                </form>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
