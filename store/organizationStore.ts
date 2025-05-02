import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { Organization } from '@/types'

interface OrganizationState {
  organization: Organization | null
  setOrganization: (organization: Organization | null) => void
  updateOrganization: (orgData: Partial<Organization>) => void
  clearOrganization: () => void
}

export const useOrganizationStore = create<OrganizationState>()(
  persist(
    (set) => ({
      organization: null,
      setOrganization: (organization) => set({ organization }),
      updateOrganization: (orgData) =>
        set((state) => ({
          organization: state.organization
            ? { ...state.organization, ...orgData }
            : null,
        })),
      clearOrganization: () => set({ organization: null }),
    }),
    {
      name: 'organization-storage',
    }
  )
)