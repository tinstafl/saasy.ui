"use client"

import React, { createContext, useContext, useState } from "react"

interface ErrorProviderProps {
  children: React.ReactNode
}

interface Error {
  show: boolean
  message: React.JSX.Element
}

interface ErrorContextType {
  error: Error
  triggerError: (e: Error) => void
  clearError: () => void
}

const e = { show: false, message: <></> }
const ErrorContext = createContext({} as ErrorContextType)

export const ErrorProvider = ({ children }: ErrorProviderProps) => {
  const [ error, setError ] = useState(e)

  const triggerError = (message: Error) => setError(message)
  const clearError = () => {
    document.removeEventListener("click", clearError)
    setError(e)
  }

  if (error.show)
    document.addEventListener("click", clearError)

  return (
    <ErrorContext.Provider value={ { error, triggerError, clearError } }>
      { children }
    </ErrorContext.Provider>
  )
}

export const useError = () => useContext(ErrorContext)
