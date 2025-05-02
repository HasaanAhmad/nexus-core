import { useOrganizationStore } from '@/store/organizationStore'

export const useOrganization = () => {
  const { organization, setOrganization, updateOrganization, clearOrganization } =
    useOrganizationStore()

  return {
    organization,
    setOrganization,
    updateOrganization,
    clearOrganization,
    hasLandingPage: organization?.landingPage ?? false,
    slug: organization?.slug,
  }
}