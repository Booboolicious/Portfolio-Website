import React, { createContext, useContext, useState, useEffect } from 'react'
import { getPortfolio } from '../api/client'
import type { Portfolio } from '../types'

interface PortfolioContextType {
  data: Portfolio | null
  loading: boolean
  error: string | null
}

const PortfolioContext = createContext<PortfolioContextType | undefined>(undefined)

export function PortfolioProvider({ children }: { children: React.ReactNode }) {
  const [data, setData] = useState<Portfolio | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    getPortfolio()
      .then(setData)
      .catch(err => {
        console.error('Fetch error:', err)
        setError(err.message || 'Failed to fetch data from backend.')
      })
      .finally(() => setLoading(false))
  }, [])

  return (
    <PortfolioContext.Provider value={{ data, loading, error }}>
      {children}
    </PortfolioContext.Provider>
  )
}

export function usePortfolio() {
  const context = useContext(PortfolioContext)
  if (context === undefined) {
    throw new Error('usePortfolio must be used within a PortfolioProvider')
  }
  return context
}
