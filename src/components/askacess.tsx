import { useState } from "react"
import { UserCircle } from "lucide-react"

import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert"
import { Button } from "@/components/ui/button"

export default function AskAcess() {
  const [status, setStatus] = useState<'pending' | 'granted' | 'declined'>('pending')

  const handleAction = (action: 'grant' | 'decline') => {
    setStatus(action === 'grant' ? 'granted' : 'declined')
  }

  return (
    <Alert className="flex items-center justify-between">
      <div className="flex items-start">
        <UserCircle className="h-5 w-5 mt-0.5" />
        <div className="ml-3">
          <AlertTitle>Access Request</AlertTitle>
          <AlertDescription>
            Dr. Jane Doe requests access to Allergies.
          </AlertDescription>
        </div>
      </div>
      {status === 'pending' && (
        <div className="flex space-x-2">
          <Button variant="outline" size="sm" onClick={() => handleAction('decline')}>
            Decline
          </Button>
          <Button size="sm" onClick={() => handleAction('grant')}>
            Grant
          </Button>
        </div>
      )}
      {status === 'granted' && (
        <span className="text-green-600 font-medium">Access Granted</span>
      )}
      {status === 'declined' && (
        <span className="text-red-600 font-medium">Access Declined</span>
      )}
    </Alert>
  )
}
