import { useUserStore } from '@/store/userStore'

export const useUser = () => {
  const { user, setUser, updateUser, clearUser } = useUserStore()

  return {
    user,
    setUser,
    updateUser,
    clearUser,
    isAdmin: user?.userType === 'ADMIN',
    isEmployee: user?.userType === 'EMPLOYEE',
  }
}