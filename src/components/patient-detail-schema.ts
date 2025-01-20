import { ObjectId } from "mongodb"

export interface PatientDemographics {
  // _id: ObjectId
  userId: ObjectId
  gender: string
  dateOfBirth: Date
  bloodType: string
  maritalStatus: string
  occupation: string
  race: string
  ethnicity: string
  language: string
  religion: string
  disabilityStatus: string
  createdAt: Date
  updatedAt: Date
}

export interface MedicalHistory {
  // _id: ObjectId
  userId: ObjectId
  chronicDiseases: string[]
  pastIllnesses: string[]
  surgeries: {
    name: string
    date: Date
    hospital: string
    notes: string
  }[]
  hospitalizations: {
    reason: string
    startDate: Date
    endDate: Date
    hospital: string
    notes: string
  }[]
  familyMedicalHistory: {
    condition: string
    relationship: string
    ageAtDiagnosis: number
    notes: string
  }[]
  createdAt: Date
  updatedAt: Date
}

export interface Allergies {
  // _id: ObjectId
  userId: ObjectId
  allergies: {
    name: string
    reaction: string
    severity: string
    diagnosedDate: Date
    notes: string
  }[]
  createdAt: Date
  updatedAt: Date
}

export interface Medications {
  // _id: ObjectId
  userId: ObjectId
  medications: {
    name: string
    dosage: string
    frequency: string
    route: string
    startDate: Date
    endDate: Date
    effectiveness: string
    sideEffects: string[]
    notes: string
  }[]
  createdAt: Date
  updatedAt: Date
}

export interface Visits {
  // _id: ObjectId
  userId: ObjectId
  visits: {
    visitId: ObjectId
    date: Date
    reason: string
    clinic: {
      name: string
      address: {
        street: string
        city: string
        state: string
        postalCode: string
        country: string
      }
    }
    diagnosis: {
      condition: string
      severity: string
      dateDiagnosed: Date
      notes: string
    }[]
    treatments: {
      type: string
      description: string
      duration: string
      prescribedMedication: {
        name: string
        dosage: string
        frequency: string
        route: string
      }[]
      notes: string
    }[]
    followUpDate: Date
    notes: string
  }[]
  createdAt: Date
  updatedAt: Date
}

export interface Tests {
  // _id: ObjectId
  userId: ObjectId
  tests: {
    testName: string
    datePerformed: Date
    result: string
    normalRange: string
    units: string
    notes: string
    laboratory: {
      name: string
      address: {
        street: string
        city: string
        state: string
        postalCode: string
        country: string
      }
    }
  }[]
  createdAt: Date
  updatedAt: Date
}

export interface Prescriptions {
  // _id: ObjectId
  userId: ObjectId
  prescriptions: {
    medication: {
      name: string
      dosage: string
      frequency: string
      route: string
    }
    prescribedDate: Date
    dosageInstructions: string
    duration: string
    refillInfo: {
      refillsRemaining: number
      lastRefillDate: Date
      nextRefillDate: Date
    }
    notes: string
  }[]
  createdAt: Date
  updatedAt: Date
}

export interface Immunizations {
  // _id: ObjectId
  userId: ObjectId
  immunizations: {
    vaccineName: string
    dateAdministered: Date
    doseNumber: number
    totalDoses: number
    site: string
    notes: string
  }[]
  createdAt: Date
  updatedAt: Date
}

export interface InsuranceInfo {
  // _id: ObjectId
  userId: ObjectId
  provider: string
  policyNumber: string
  coverageDetails: {
    type: string
    description: string
    copay: number
    deductible: number
  }[]
  validUntil: Date
  createdAt: Date
  updatedAt: Date
}

export interface EmergencyContacts {
  // _id: ObjectId
  userId: ObjectId
  emergencyContacts: {
    relationship: string
    phone: string
    address: {
      street: string
      city: string
      state: string
      postalCode: string
      country: string
    }
    notes: string
  }[]
  createdAt: Date
  updatedAt: Date
}

export interface PatientHistoryData {
  // _id: ObjectId
  // userId: ObjectId
  demographics: PatientDemographics
  medicalHistory: MedicalHistory
  allergies: Allergies
  medications: Medications
  visits: Visits
  tests: Tests
  prescriptions: Prescriptions
  immunizations: Immunizations
  insuranceInfo: InsuranceInfo
  emergencyContacts: EmergencyContacts
}

//demidata:
// Unique userId for all related data
const userId = new ObjectId()

export const demoDemographics: PatientDemographics = {
  // _id: new ObjectId(),
  userId,
  gender: "Male",
  dateOfBirth: new Date("1990-05-20"),
  bloodType: "O+",
  maritalStatus: "Single",
  occupation: "Engineer",
  race: "Asian",
  ethnicity: "Indian",
  language: "English",
  religion: "Hindu",
  disabilityStatus: "None",
  createdAt: new Date(),
  updatedAt: new Date(),
}

export const demoMedicalHistory: MedicalHistory = {
  // _id: new ObjectId(),
  userId,
  chronicDiseases: ["Hypertension"],
  pastIllnesses: ["Chickenpox"],
  surgeries: [
    {
      name: "Appendectomy",
      date: new Date("2015-03-15"),
      hospital: "City Hospital",
      notes: "Routine procedure",
    },
  ],
  hospitalizations: [
    {
      reason: "Severe Asthma Attack",
      startDate: new Date("2022-06-10"),
      endDate: new Date("2022-06-15"),
      hospital: "General Hospital",
      notes: "Intensive care required",
    },
  ],
  familyMedicalHistory: [
    {
      condition: "Diabetes",
      relationship: "Father",
      ageAtDiagnosis: 50,
      notes: "Controlled by medication",
    },
  ],
  createdAt: new Date(),
  updatedAt: new Date(),
}

export const demoAllergies: Allergies = {
  // _id: new ObjectId(),
  userId,
  allergies: [
    {
      name: "Peanuts",
      reaction: "Anaphylaxis",
      severity: "Severe",
      diagnosedDate: new Date("2000-04-12"),
      notes: "Carries an epinephrine auto-injector",
    },
  ],
  createdAt: new Date(),
  updatedAt: new Date(),
}

export const demoMedications: Medications = {
  // _id: new ObjectId(),
  userId,
  medications: [
    {
      name: "Lisinopril",
      dosage: "10mg",
      frequency: "Once daily",
      route: "Oral",
      startDate: new Date("2022-01-10"),
      endDate: new Date("2023-01-10"),
      effectiveness: "Effective",
      sideEffects: ["Mild dizziness"],
      notes: "Take in the morning",
    },
  ],
  createdAt: new Date(),
  updatedAt: new Date(),
}

export const demoVisits: Visits = {
  // _id: new ObjectId(),
  userId,
  visits: [
    {
      visitId: new ObjectId(),
      date: new Date("2023-02-15"),
      reason: "Routine check-up",
      clinic: {
        name: "Health Clinic",
        address: {
          street: "123 Health St",
          city: "Metropolis",
          state: "MT",
          postalCode: "12345",
          country: "Countryland",
        },
      },
      diagnosis: [
        {
          condition: "Mild Hypertension",
          severity: "Moderate",
          dateDiagnosed: new Date("2023-02-15"),
          notes: "Recommended lifestyle changes",
        },
      ],
      treatments: [
        {
          type: "Medication",
          description: "Blood pressure control",
          duration: "6 months",
          prescribedMedication: [
            {
              name: "Lisinopril",
              dosage: "10mg",
              frequency: "Once daily",
              route: "Oral",
            },
          ],
          notes: "Monitor blood pressure weekly",
        },
      ],
      followUpDate: new Date("2023-08-15"),
      notes: "Next visit in 6 months",
    },
  ],
  createdAt: new Date(),
  updatedAt: new Date(),
}

export const demoTests: Tests = {
  // _id: new ObjectId(),
  userId,
  tests: [
    {
      testName: "Complete Blood Count",
      datePerformed: new Date("2023-02-15"),
      result: "Normal",
      normalRange: "4.5-11 x10^9/L",
      units: "x10^9/L",
      notes: "Within normal limits",
      laboratory: {
        name: "Health Lab",
        address: {
          street: "45 Lab Road",
          city: "Metropolis",
          state: "MT",
          postalCode: "54321",
          country: "Countryland",
        },
      },
    },
  ],
  createdAt: new Date(),
  updatedAt: new Date(),
}

export const demoPrescriptions: Prescriptions = {
  // _id: new ObjectId(),
  userId,
  prescriptions: [
    {
      medication: {
        name: "Ibuprofen",
        dosage: "200mg",
        frequency: "As needed",
        route: "Oral",
      },
      prescribedDate: new Date("2023-02-15"),
      dosageInstructions: "Take with food",
      duration: "5 days",
      refillInfo: {
        refillsRemaining: 2,
        lastRefillDate: new Date("2023-03-01"),
        nextRefillDate: new Date("2023-03-30"),
      },
      notes: "For pain relief only",
    },
  ],
  createdAt: new Date(),
  updatedAt: new Date(),
}

export const demoImmunizations: Immunizations = {
  // _id: new ObjectId(),
  userId,
  immunizations: [
    {
      vaccineName: "Influenza",
      dateAdministered: new Date("2023-10-01"),
      doseNumber: 1,
      totalDoses: 1,
      site: "Left arm",
      notes: "Annual flu shot",
    },
  ],
  createdAt: new Date(),
  updatedAt: new Date(),
}

export const demoInsuranceInfo: InsuranceInfo = {
  // _id: new ObjectId(),
  userId,
  provider: "Health Insurance Co.",
  policyNumber: "H123456789",
  coverageDetails: [
    {
      type: "Medical",
      description: "Covers hospital and physician fees",
      copay: 20,
      deductible: 500,
    },
  ],
  validUntil: new Date("2024-12-31"),
  createdAt: new Date(),
  updatedAt: new Date(),
}

export const demoEmergencyContacts: EmergencyContacts = {
  // _id: new ObjectId(),
  userId,
  emergencyContacts: [
    {
      relationship: "Mother",
      phone: "123-456-7890",
      address: {
        street: "789 Family Rd",
        city: "Metropolis",
        state: "MT",
        postalCode: "12345",
        country: "Countryland",
      },
      notes: "Primary emergency contact",
    },
  ],
  createdAt: new Date(),
  updatedAt: new Date(),
}

export const demoData: PatientHistoryData = {
  // _id: new ObjectId(),
  // userId,
  demographics: demoDemographics,
  medicalHistory: demoMedicalHistory,
  allergies: demoAllergies,
  medications: demoMedications,
  visits: demoVisits,
  tests: demoTests,
  prescriptions: demoPrescriptions,
  immunizations: demoImmunizations,
  insuranceInfo: demoInsuranceInfo,
  emergencyContacts: demoEmergencyContacts,
}
