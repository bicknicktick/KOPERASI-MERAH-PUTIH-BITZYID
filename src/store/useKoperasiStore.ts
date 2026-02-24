import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface User {
  id: string
  name: string
  role: 'admin' | 'member'
  balance: number
}

interface Transaction {
  id: string
  type: 'simpanan' | 'pinjaman' | 'angsuran'
  amount: number
  date: string
  status: 'pending' | 'approved' | 'rejected'
}

interface KoperasiState {
  user: User | null
  transactions: Transaction[]
  login: (user: User) => void
  logout: () => void
  addTransaction: (transaction: Omit<Transaction, 'id' | 'date' | 'status'>) => void
  approveTransaction: (id: string) => void
}

export const useKoperasiStore = create<KoperasiState>()(
  persist(
    (set) => ({
      user: {
        id: 'usr-1',
        name: 'Warga Bangeran',
        role: 'member',
        balance: 5000000,
      }, // Mock logged in user
      transactions: [
        { id: 'trx-1', type: 'simpanan', amount: 500000, date: new Date().toISOString(), status: 'approved' },
        { id: 'trx-2', type: 'pinjaman', amount: 2000000, date: new Date().toISOString(), status: 'pending' },
      ],
      login: (user) => set({ user }),
      logout: () => set({ user: null }),
      addTransaction: (data) => set((state) => ({
        transactions: [
          ...state.transactions,
          {
            id: `trx-${Math.random().toString(36).substr(2, 9)}`,
            ...data,
            date: new Date().toISOString(),
            status: 'pending'
          }
        ]
      })),
      approveTransaction: (id) => set((state) => ({
        transactions: state.transactions.map(t => t.id === id ? { ...t, status: 'approved' } : t)
      })),
    }),
    {
      name: 'koperasi-storage',
    }
  )
)