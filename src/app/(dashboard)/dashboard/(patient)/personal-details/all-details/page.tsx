import { CalendarDays, Clock, User2 } from "lucide-react"

import { mongo } from "@/lib/mongo"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  demoData,
  PatientHistoryData,
} from "@/components/patient-detail-schema"

async function insertPatientHistory(patientHistoryData: PatientHistoryData) {
  try {
    for (const key of Object.keys(patientHistoryData)) {
      const collection = mongo.collection(key)
      await collection.insertOne(patientHistoryData[key])
      console.log(`New patient history data created for collection: ${key}`)
    }
  } catch (error) {
    console.error("Error inserting patient history data:", error)
  }
}

const SectionCard = ({ title, data }: { title: string; data: any }) => {
  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString(undefined, {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  const shouldSkipField = (key: string) => {
    return key === "userId" || key === "_id"
  }

  const filterObject = (obj: any): any => {
    if (Array.isArray(obj)) {
      return obj.map((item) =>
        typeof item === "object" && item !== null ? filterObject(item) : item
      )
    }
    if (typeof obj === "object" && obj !== null) {
      const filtered: any = {}
      for (const [key, value] of Object.entries(obj)) {
        if (!shouldSkipField(key)) {
          filtered[key] = filterObject(value)
        }
      }
      return filtered
    }

    return obj
  }

  const renderValue = (value: any, depth = 0): React.ReactNode => {
    if (Array.isArray(value)) {
      return (
        <ul className={`space-y-3 ${depth === 0 ? "mt-2" : "mt-1"}`}>
          {value.map((item, index) => (
            <li
              key={index}
              className="duration-300 animate-in slide-in-from-left-1"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              {item && typeof item === "object" ? (
                <div className="rounded-lg bg-muted/50 p-3 transition-colors hover:bg-muted">
                  {Object.entries(item)
                    .filter(([key]) => !shouldSkipField(key))
                    .map(([key, val]) => (
                      <div key={key} className="mb-2 last:mb-0">
                        <span className="font-medium text-muted-foreground">
                          {key.replace(/([A-Z])/g, " $1").trim()}:{" "}
                        </span>
                        {renderValue(val, depth + 1)}
                      </div>
                    ))}
                </div>
              ) : (
                <span className="text-sm">{String(item)}</span>
              )}
            </li>
          ))}
        </ul>
      )
    }

    if (
      value instanceof Date ||
      (typeof value === "string" && !isNaN(Date.parse(value)))
    ) {
      return (
        <span className="inline-flex items-center gap-1 text-sm">
          <CalendarDays className="size-4" />
          {formatDate(value.toString())}
        </span>
      )
    }

    if (typeof value === "object" && value !== null) {
      if (value instanceof Buffer) {
        return null // Skip rendering Buffer objects
      }
      return (
        <div className="rounded-lg bg-muted/30 p-3 text-sm">
          {Object.entries(value)
            .filter(([key]) => !shouldSkipField(key))
            .map(([key, val]) => (
              <div key={key} className="mb-2 last:mb-0">
                <span className="font-medium text-muted-foreground">
                  {key.replace(/([A-Z])/g, " $1").trim()}:{" "}
                </span>
                {renderValue(val, depth + 1)}
              </div>
            ))}
        </div>
      )
    }

    return <span className="text-sm">{String(value)}</span>
  }

  const getIcon = (title: string) => {
    switch (title.toLowerCase()) {
      case "demographics":
        return <User2 className="size-5" />
      case "visits":
        return <Clock className="size-5" />
      default:
        return null
    }
  }

  const filteredData = filterObject(data)

  return (
    <Card className="transition-all duration-300 hover:shadow-lg dark:hover:shadow-primary/5">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-xl">
          {getIcon(title)}
          <span className="capitalize">
            {title.replace(/([A-Z])/g, " $1").trim()}
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {Object.entries(filteredData)
            .filter(([key]) => !shouldSkipField(key))
            .map(([key, value]) => (
              <div
                key={key}
                className="duration-500 animate-in slide-in-from-bottom-2"
              >
                <div className="mb-3 flex items-center justify-between">
                  <h3 className="font-semibold tracking-tight">
                    {key.replace(/([A-Z])/g, " $1").trim()}
                  </h3>
                  {typeof value === "string" && (
                    <Badge variant="secondary" className="font-normal">
                      {value}
                    </Badge>
                  )}
                </div>
                <div className="text-muted-foreground">
                  {renderValue(value)}
                </div>
              </div>
            ))}
        </div>
      </CardContent>
    </Card>
  )
}

export default async function Page() {
  const data: any[] = []
  try {
    for (const key of Object.keys(demoData)) {
      const collection = mongo.collection(key)
      const result = await collection.findOne({})
      data.push({ key, result })
    }
  } catch (error) {
    return (
      <Card className="m-4">
        <CardContent>
          <pre className="text-red-500">{JSON.stringify(error, null, 2)}</pre>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="p-6 duration-1000 animate-in fade-in-0 slide-in-from-bottom-4">
      <h1 className="mb-2 scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
        Patient History
      </h1>
      <p className="mb-8 text-xl text-muted-foreground">
        Comprehensive medical records and patient information
      </p>

      <Tabs defaultValue="demographics" className="w-full">
        <ScrollArea className="w-full">
          <TabsList className="mb-4 h-12 w-full justify-start">
            {Object.keys(demoData).map((key, index) => (
              <TabsTrigger
                key={key}
                value={key}
                className="capitalize data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {key.replace(/([A-Z])/g, " $1").trim()}
              </TabsTrigger>
            ))}
          </TabsList>
        </ScrollArea>

        <div className="mt-6">
          {data.map(({ key, result }) => (
            <TabsContent
              key={key}
              value={key}
              className="duration-300 animate-in zoom-in-95"
            >
              <SectionCard title={key} data={result || demoData[key]} />
            </TabsContent>
          ))}
        </div>
      </Tabs>
    </div>
  )
}
