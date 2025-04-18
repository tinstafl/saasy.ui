"use client"

import React, { createContext, useCallback, useContext, useState } from "react"
import { User } from "@/config/types/user"

interface UserContextType {
  loading: boolean,
  user: User | undefined
  postUser: (user: User) => Promise<User | undefined>
  putUser: (user: User) => Promise<User | undefined>
  getUser: () => Promise<User | undefined>
  deleteUser: () => Promise<void>
  setUser: React.Dispatch<React.SetStateAction<User | undefined>>
}

export const UserContext = createContext({} as UserContextType)

interface UserStateProviderProps {
  children: React.JSX.Element
}

export const UserProvider = ({ children }: UserStateProviderProps) => {
  const [ loading, setLoading ] = useState(false)
  const [ user, setUser ] = useState<User | undefined>(undefined)

  const postUser = useCallback(async (user: User) => {
    setLoading(true)
    return fetch("/api/user", { method: "POST", body: JSON.stringify({ user }) })
      .then(async (response) => {
        const { body } = await response.json()
        console.debug("post user, ok", body)
        return body as User
      }).catch(error => {
        console.error("post user, not ok", error)
        return undefined
      }).finally(() => setLoading(false))
  }, [])

  const getUser = useCallback(async () => {
    setLoading(true)
    return fetch("/api/user", { method: "GET", })
      .then(async (response) => {
        const { body } = await response.json()
        console.debug("get user, ok", body)
        return body as User
      }).catch((error) => {
        console.error("get user, not ok", error)
        return undefined
      }).finally(() => setLoading(false))
  }, [])

  const putUser = useCallback(async (user: User) => {
    setLoading(true)
    return fetch("/api/user", { method: "PUT", body: JSON.stringify({ user }) })
      .then(async (response) => {
        const { body } = await response.json()
        console.debug("put user, ok", body)
        return body as User
      }).catch(error => {
        console.error("put user, not ok", error)
        return undefined
      }).finally(() => setLoading(false))
  }, [])

  const deleteUser = async () => {
    return fetch("/api/user/unsubscribe", { method: "DELETE", })
      .then(async (response) => {
        console.debug("delete user, ok", response)
      }).catch(error => console.error("delete user, not ok", error))
  }

  return (
    <UserContext.Provider value={ {
      loading,
      user,
      postUser,
      putUser,
      getUser,
      deleteUser,
      setUser
    } }>
      { children }
    </UserContext.Provider>
  )
}

export const useUserState = () => useContext(UserContext)
