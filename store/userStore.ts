
import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { User } from '@/types'

interface UserState {
  user: User | null
  setUser: (user: User | null) => void
  updateUser: (userData: Partial<User>) => void
  clearUser: () => void
}

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      user: null,
      setUser: (user) => set({ user }),
      updateUser: (userData) =>
        set((state) => ({
          user: state.user ? { ...state.user, ...userData } : null,
        })),
      clearUser: () => set({ user: null }),
    }),
    {
      name: 'user-storage',
    }
  )
)

