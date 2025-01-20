"use client"

import { useState } from "react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Icons } from "@/components/icons"

export function SearchFilter() {
  const [value, setValue] = useState<string>("")
  return (
    <div className="relative w-full">
      <Input value={value} onChange={(e) => setValue(e.target.value)} />
      <Button
        variant={"secondary"}
        size={"icon"}
        className="absolute right-0 top-0"
      >
        <Icons.search />
      </Button>
    </div>
  )
}
