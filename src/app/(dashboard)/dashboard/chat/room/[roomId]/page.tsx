"use client"

import React, { useEffect, useRef, useState } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { Send, Users } from "lucide-react"
import { io, Socket } from "socket.io-client"

import { Alert, AlertDescription } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"

interface Message {
  sender?: string
  text: string
  timestamp?: string
  system?: boolean
  room?: string
}

interface User {
  id: string
  username: string
  room: string
}

interface RoomJoinedData {
  room: string
  username: string
}

interface ErrorData {
  message: string
}

interface ChatCredentials {
  username: string
  room: string
  password: string
  isCreator: boolean
}

const ChatRoom = ({ params }: { params: { roomId: string } }) => {
  const [message, setMessage] = useState<string>("")
  const [messages, setMessages] = useState<Message[]>([])
  const [users, setUsers] = useState<User[]>([])
  const [error, setError] = useState<string>("")
  const socketRef = useRef<Socket>()
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const router = useRouter()

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  useEffect(() => {
    const credentialsStr = sessionStorage.getItem("chatCredentials")
    console.log(sessionStorage.getItem("chatCredentials") + "-------------")
    if (!credentialsStr) {
      router.push("/dashboard/chat")
      return
    }

    const credentials: ChatCredentials = JSON.parse(
      credentialsStr
    ) as ChatCredentials
    if (credentials.room !== params.roomId) {
      router.push("/")
      return
    }

    socketRef.current = io("http://localhost:5000")
    const socket = socketRef.current

    socket.on("error", (error: ErrorData) => {
      setError(error.message)
      if (error.message.includes("must join a room")) {
        router.push("/")
      }
    })

    socket.on("message", (message: Message) => {
      if (message.room === params.roomId) {
        setMessages((prev) => [...prev, message])
      }
    })

    socket.on("user_list", ({ users: newUsers }: { users: User[] }) => {
      setUsers(newUsers)
    })

    socket.on("user_left", (user: User) => {
      setMessages((prev) => [
        ...prev,
        {
          text: `${user.username} left the room`,
          system: true,
        },
      ])
    })

    if (credentials.isCreator) {
      socket.emit("create_room", {
        room: credentials.room,
        password: credentials.password,
        username: credentials.username,
      })
    } else {
      socket.emit("join_room", {
        room: credentials.room,
        password: credentials.password,
        username: credentials.username,
      })
    }

    socket.on("room_joined", ({ room, username }: RoomJoinedData) => {
      setMessages([
        {
          text: `${username} joined ${room}`,
          system: true,
        },
      ])
    })

    return () => {
      socket.disconnect()
      localStorage.removeItem("chatCredentials")
    }
  }, [params.roomId, router])

  const sendMessage = (e: React.FormEvent) => {
    e.preventDefault()
    if (message.trim()) {
      socketRef.current?.emit("message", {
        text: message.trim(),
        room: params.roomId,
      })
      setMessage("")
    }
  }

  return (
    <div className="container mx-auto max-w-6xl p-4">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <Card className="h-[80vh]">
          <div className="grid h-full grid-cols-[250px_1fr]">
            <div className="border-r">
              <CardHeader>
                <CardTitle className="text-lg">{params.roomId}</CardTitle>
              </CardHeader>
              <Separator />
              <div className="p-4">
                <div className="mb-2 flex items-center gap-2 text-sm text-muted-foreground">
                  <Users className="size-4" />
                  Users ({users.length})
                </div>
                <ScrollArea className="h-[calc(100vh-15rem)]">
                  <div className="space-y-1">
                    {users.map((user) => (
                      <div
                        key={user.id}
                        className="rounded-md px-2 py-1.5 text-sm hover:bg-accent"
                      >
                        {user.username}
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </div>
            </div>
            <div className="flex h-full flex-col">
              {error && (
                <Alert variant="destructive" className="m-4">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}
              <ScrollArea className="flex-1 p-4">
                <div className="space-y-4">
                  {messages.map((msg, index) => (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      key={index}
                      className={`rounded-lg p-2 ${
                        msg.system
                          ? "bg-muted text-center text-sm text-muted-foreground"
                          : "bg-accent"
                      }`}
                    >
                      {!msg.system && (
                        <span className="mr-2 font-medium">{msg.sender}</span>
                      )}
                      <span>{msg.text}</span>
                      {!msg.system && (
                        <span className="ml-2 text-xs text-muted-foreground">
                          {msg.timestamp &&
                            new Date(msg.timestamp).toLocaleTimeString()}
                        </span>
                      )}
                    </motion.div>
                  ))}
                  <div ref={messagesEndRef} />
                </div>
              </ScrollArea>
              <div className="border-t p-4">
                <form onSubmit={sendMessage} className="flex gap-2">
                  <Input
                    type="text"
                    placeholder="Type a message..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                  />
                  <Button type="submit">
                    <Send className="size-4" />
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </Card>
      </motion.div>
    </div>
  )
}

export default ChatRoom
