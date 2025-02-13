"use client"

import React, { useEffect } from "react"
import { useUserState } from "@/context/user"
import { User } from "@/config/types/user"
import { Progress } from "@heroui/react"

export default function GetStartedPage(): React.JSX.Element {
  const { loading, user, getUser, setUser } = useUserState()

  useEffect(() => {
    getUser()
      .then(s => setUser(s || {} as User))
  }, [ getUser ])

  if (loading) {
    return (
      <div className="flex justify-center min-h-[400px]">
        <Progress
          isIndeterminate
          classNames={ {
            base: `max-w-full`,
            track: "drop-shadow-md border border-default",
            indicator: "bg-gradient-to-r from-primary-600 to-secondary-700",
            label: "tracking-wider font-medium text-default-600",
            value: "text-foreground/60",
          } }
          aria-label="Fetching Configuration..."
          label="Fetching Configuration..."
          className="max-w-md my-auto"/>
      </div>
    )
  }

  return (
    <div className="h-full flex justify-center">
      { !loading && <span className="my-auto">welcome, { user?.email }!</span> }
    </div>
  )
}
