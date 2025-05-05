export interface User {
  id: string
  email: string
  fullName: string
  userType: 'ADMIN' | 'EMPLOYEE'
  onboardingCompleted: boolean
  profilePicture?: string
  organizationId?: string
  createdAt: Date
  updatedAt: Date
}

export interface Organization {
  id: string
  name: string
  logo?: string
  description?: string
  location?: any
  servicesAssigned?: string
  slug: string
  industry: string
  landingPage: boolean
  landingPageHTML?: string
  teamSize: string
}