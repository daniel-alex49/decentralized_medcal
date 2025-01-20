"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import axios from "axios"
import { format } from "date-fns"
import { CalendarIcon, Check, ChevronsUpDown, Droplets } from "lucide-react"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { toast } from "@/components/ui/use-toast"

import { MedicalContract } from "./contract"
import NavBar from "./metamask"
import { Calendar } from "./ui/calendar"
import { InputTags } from "./ui/input-tags"

const FormSchema = z.object({
  name: z.string().min(4, { message: "name must be atleast 4 letters" }),
  gender: z.string().min(1, { message: "Gender is required." }),
  dateOfBirth: z.date({
    required_error: "A date of birth is required.",
  }),
  bloodType: z.string().min(1, { message: "Blood type is required." }),
  chronicDiseases: z
    .string()
    .array()
    .max(10, "No more than 10 illnesses can be added!"),
  emergencyContact: z
    .string()
    .min(10, { message: "Emergency contact must be at least 10 digits." }),
  blockId: z.string().startsWith("0x", { message: "Invalid account address." }),
})

type FormData = z.infer<typeof FormSchema>

interface PatientFormProps extends React.HTMLAttributes<typeof Form> {
  userId: string
}

export function PatientForm({ ...props }: PatientFormProps) {
  const [address, setAddress] = useState("")
  const router = useRouter()
  const form = useForm<FormData>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: "",
      gender: "",
      dateOfBirth: new Date(),
      bloodType: "",
      chronicDiseases: [],
      emergencyContact: "",
      blockId: "",
    },
  })

  async function onSubmit(data: FormData) {
    console.log(data)
    try {
      const contract = new MedicalContract(data.blockId)
      await contract.init()
      await contract.registerPatient(data.name)
      const res = await axios.post("/api/users/patient", {
        ...data,
        userId: props.userId,
      })
      if (res.status != 200)
        return toast({
          title: "Registration failed. Please try again!",
          variant: "destructive",
        })

      router.push("/dashboard")
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    if (address) form.setValue("blockId", address)
  }, [address])

  const bloodTypes = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"]

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-[500px] max-w-full space-y-6 p-4"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <Input placeholder="Enter your name" {...field} />
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="gender"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Gender</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select your gender" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="male">Male</SelectItem>
                  <SelectItem value="female">Female</SelectItem>
                  <SelectItem value="non-binary">Non Binary</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="dateOfBirth"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Date of birth</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "text-left font-normal",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value ? (
                        format(field.value, "PPP")
                      ) : (
                        <span>Pick a date</span>
                      )}
                      <CalendarIcon className="ml-auto size-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    disabled={(date) =>
                      date > new Date() || date < new Date("1900-01-01")
                    }
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <FormDescription>
                Your date of birth is used to calculate your age.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="bloodType"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Blood Type</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant="outline"
                      role="combobox"
                      className="w-full justify-between"
                    >
                      {field.value || "Select blood type"}
                      <ChevronsUpDown className="ml-2 size-4 shrink-0 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-full p-0">
                  <Command>
                    <CommandInput placeholder="Search blood type..." />
                    <CommandList>
                      <CommandGroup>
                        {bloodTypes.map((type) => (
                          <CommandItem
                            key={type}
                            value={type}
                            onSelect={() => form.setValue("bloodType", type)}
                          >
                            <Droplets className="mr-2 size-4" />
                            {type}
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="chronicDiseases"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Chronic Diseases</FormLabel>
              <FormControl>
                <InputTags
                  placeholder="write disease(s) name and press add"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="emergencyContact"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Emergency Contact</FormLabel>
              <FormControl>
                <Input
                  placeholder="Add a emergency contact(email or phone)"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="blockId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Block ID</FormLabel>
              <FormControl>
                <div className="flex gap-2">
                  <Input placeholder="Account address" {...field} disabled />
                  <NavBar setAddress={setAddress} />
                </div>
              </FormControl>
              <FormDescription>*You cannot change this later</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full">
          Submit
        </Button>
      </form>
    </Form>
  )
}
