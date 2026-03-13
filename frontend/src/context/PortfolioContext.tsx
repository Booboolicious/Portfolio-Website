import React, { createContext, useContext, useState, useEffect } from 'react'
import { getPortfolio } from '../api/client'
import type { Portfolio } from '../types'

interface PortfolioContextType {
  data: Portfolio | null
  loading: boolean
  error: string | null
  refreshData: () => Promise<void>
}

const PortfolioContext = createContext<PortfolioContextType | undefined>(undefined)

export function PortfolioProvider({ children }: { children: React.ReactNode }) {
  const [data, setData] = useState<Portfolio | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const refreshData = async () => {
    console.log('Refreshing global portfolio data...');
    try {
      const res = await getPortfolio()
      console.log('New data received:', res.personal.tagline);
      setData({ ...res }) // Force new object reference
    } catch (err: any) {
      console.error('Refresh error:', err)
      setError(err.message || 'Failed to refresh data.')
    }
  }

  useEffect(() => {
    const initFetch = async () => {
      try {
        const res = await getPortfolio()
        setData(res)
      } catch (err: any) {
        console.error('Fetch error:', err)
        setError(err.message || 'Failed to fetch data from backend.')
      } finally {
        setLoading(false)
      }
    }
    initFetch()
  }, [])

  return (
    <PortfolioContext.Provider value={{ data, loading, error, refreshData }}>
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
