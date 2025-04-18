"use client"

import { createContext, useCallback, useContext, useState } from "react"

interface SessionContextType {
  loading: boolean
  setLoading: (value: boolean) => void
  getSession: () => Promise<boolean>
}

export const SessionContext = createContext({} as SessionContextType)

interface SessionStateProviderProps {
  children: React.ReactNode
}

export const SessionProvider = ({ children }: SessionStateProviderProps) => {
  const [ loading, setLoading ] = useState(false)

  const getSession = useCallback(async () => {
    setLoading(true)
    return fetch("/user/authenticated")
      .then(async (response) => {
        const { body } = await response.json()
        console.debug("check subscriber authentication, ok", body)
        return body
      })
      .finally(() => setLoading(false))
      .catch(error => {
        console.error("check subscriber authentication, not ok", error)
        return false
      })
  }, [])

  return (
    <SessionContext.Provider value={ {
      loading,
      setLoading,
      getSession,
    } }>
      { children }
    </SessionContext.Provider>
  )
}

export const useSessionState = () => useContext(SessionContext)
