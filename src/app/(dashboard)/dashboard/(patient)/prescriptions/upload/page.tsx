"use client"

import { useState } from "react"
import axios from "axios"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

// Utility function to convert image file to Base64
async function convertToBase64(file: File) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => resolve(reader.result)
    reader.onerror = (error) => reject(error)
  })
}

export default function ImageUpload() {
  const [selectedFile, setSelectedFile] = useState(null)

  const handleFileChange = (event) => {
    const file = event.target.files[0]
    if (file) {
      setSelectedFile(file)
    }
  }

  const handleUpload = async () => {
    if (!selectedFile) {
      alert("Please select an image file.")
      return
    }

    try {
      const base64Image = await convertToBase64(selectedFile)
      console.log(base64Image)

      const response = await axios.post("http://localhost:5000/get_meds_ocr", {
        img: base64Image,
      })

      console.log("Image uploaded successfully:", response.data)
    } catch (error) {
      console.error("Error uploading image:", error)
    }
  }

  return (
    <div className="space-y-4">
      <Input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="w-full"
      />
      <Button onClick={handleUpload} className="bg-blue-500 text-white">
        Upload Image
      </Button>
    </div>
  )
}
