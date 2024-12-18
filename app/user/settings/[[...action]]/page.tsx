"use client"

import SettingsMenu from "@/app/user/settings/[[...action]]/(components)/menu"
import React, { useEffect, useMemo, useState } from "react"
import Settings from "./(components)/settings"
import { useUserState } from "@/context/user"
import { User } from "@/config/types/user"
import { Progress } from "@nextui-org/react"

export default function ManageSettings(props: { params: Promise<{ action: string }> }) {
  const { loading, user, getUser, setUser } = useUserState()
  const [ action, setAction ] = useState<string>("view")
  const [ mounted, setMounted ] = React.useState(false)

  useEffect(() => {
    const resolve = async () => {
      const p = await props.params
      setAction(p.action)
    }

    getUser()
      .then(s => {
        resolve().then(() => {
          setUser(s || {} as User)
          setMounted(true)
        })
      })
  }, [ props.params, getUser, setUser ])

  const currentView = useMemo(() => {
    const a = action.length == 1 ? action[0] : false
    if (a === "view") return <Settings user={ user || {} as User } edit={ false }/>
    if (a === "edit") return <Settings user={ user || {} as User } edit={ true }/>
    return <Settings user={ user || {} as User } edit={ false }/>
  }, [ action, user ])

  if (!mounted && loading) {
    return (
      <div className="flex justify-center min-h-[400px]">
        <Progress
          isIndeterminate
          classNames={ {
            base: `max-w-md`,
            track: "drop-shadow-md border border-default",
            indicator: "bg-gradient-to-r from-secondary-300 to-primary-600",
            label: "tracking-wider font-medium text-default-600",
            value: "text-foreground/60",
          } }
          aria-label="Fetching Settings..."
          label="Fetching Settings..."
          className="max-w-md my-auto"/>
      </div>
    )
  }

  return (
    <div className="flex justify-items-start gap-10 mt-10">
      <SettingsMenu user={ user || {} as User }/>
      { mounted && currentView }
    </div>
  )
}
