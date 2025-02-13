"use client"

import { site } from "@/config/site"
import { Button, Link, Popover, PopoverContent, PopoverTrigger, Progress } from "@heroui/react"
import clsx from "clsx"
import React, { useEffect, useState } from "react"
import { useError } from "@/context/error"
import { useUserState } from "@/context/user"
import { fontPrimary, fontSaasy } from "@/config/fonts"

export const Footer = () => {
  const [ mounted, setMounted ] = useState(false)
  const [ loading, setLoading ] = useState(false)

  const { error } = useError()

  const { loading: userLoading } = useUserState()

  useEffect(() => {
    const anyLoading = userLoading

    setLoading(anyLoading)
    setMounted(true)
  }, [ userLoading ])

  return (
    <>
      { mounted
        ? <footer className="fixed bottom-1 flex items-start ml-2 mb-4 w-fit">
          <Popover isOpen={ error.show }
                   color="danger"
                   placement="bottom-start"
                   showArrow={ true }>
            <PopoverTrigger>&nbsp;</PopoverTrigger>
            <PopoverContent className="h-32 w-full bg-danger text-background font-bold animate-jump-in animate-once">
              <div className={ `flex justify-center text-large tracking-wide ${ fontPrimary.className }` }>{ error.message }</div>
            </PopoverContent>
          </Popover>

          <div className="flex flex-col">
            { loading &&
              <Progress
                isIndeterminate
                classNames={ {
                  base: `max-w-md pb-2`,
                  track: "drop-shadow-md border border-default",
                  indicator: "bg-gradient-to-r from-primary-600 to-secondary-700",
                  label: "tracking-wider font-medium text-default-600",
                  value: "text-foreground/60",
                } }
                aria-label="Loading..."
                className="max-w-md"/> }

            <Link href={ site.page._.home }
                  aria-label="tinstafl-email"
                  className={ clsx("w-full justify-center cursor-pointer text-secondary-400 tracking-widest hover:text-fuchsia-400", fontSaasy.className) }>
              hi@saasy.ui
            </Link>

            <div className="flex">
              <Link href={ "https://x.com/_tinstafl" }
                    aria-label="social-x"
                    className="flex justify-center w-10 h-10">
                <Button isIconOnly
                        aria-label="social-x"
                        className="bg-transparent">
                  <svg viewBox="0 0 1200 1227"
                       xmlns="http://www.w3.org/2000/svg"
                       className="w-4 h-4 fill-primary hover:fill-default-foreground">
                    <path d="M714.163 519.284L1160.89 0H1055.03L667.137 450.887L357.328 0H0L468.492 681.821L0 1226.37H105.866L515.491 750.218L842.672 1226.37H1200L714.137 519.284H714.163ZM569.165 687.828L521.697 619.934L144.011 79.6944H306.615L611.412 515.685L658.88 583.579L1055.08 1150.3H892.476L569.165 687.854V687.828Z"/>
                  </svg>
                </Button>
              </Link>

              <Link href={ "https://github.com/tinstafl" }
                    aria-label="social-github"
                    className="flex justify-center w-10 h-10">
                <Button isIconOnly
                        aria-label="social-github"
                        className="bg-transparent">
                  <svg xmlns="http://www.w3.org/2000/svg"
                       viewBox="0 0 24 24"
                       className="w-5 h-5 fill-primary hover:fill-default-foreground">
                    <path d="M12.026 2c-5.509 0-9.974 4.465-9.974 9.974 0 4.406 2.857 8.145 6.821 9.465.499.09.679-.217.679-.481 0-.237-.008-.865-.011-1.696-2.775.602-3.361-1.338-3.361-1.338-.452-1.152-1.107-1.459-1.107-1.459-.905-.619.069-.605.069-.605 1.002.07 1.527 1.028 1.527 1.028.89 1.524 2.336 1.084 2.902.829.091-.645.351-1.085.635-1.334-2.214-.251-4.542-1.107-4.542-4.93 0-1.087.389-1.979 1.024-2.675-.101-.253-.446-1.268.099-2.64 0 0 .837-.269 2.742 1.021a9.582 9.582 0 0 1 2.496-.336 9.554 9.554 0 0 1 2.496.336c1.906-1.291 2.742-1.021 2.742-1.021.545 1.372.203 2.387.099 2.64.64.696 1.024 1.587 1.024 2.675 0 3.833-2.33 4.675-4.552 4.922.355.308.675.916.675 1.846 0 1.334-.012 2.41-.012 2.737 0 .267.178.577.687.479C19.146 20.115 22 16.379 22 11.974 22 6.465 17.535 2 12.026 2z"/>
                  </svg>
                </Button>
              </Link>

              <Link href={ "https://iq.aws.amazon.com" }
                    aria-label="social-awsiq"
                    className="flex justify-center w-10 h-10">
                <Button isIconOnly
                        aria-label="social-awsiq"
                        className="bg-transparent">
                  <svg xmlns="http://www.w3.org/2000/svg"
                       viewBox="0 0 24 24"
                       className="w-6 h-6 fill-yellow-600 hover:fill-default-foreground">
                    <path d="M18.75 11.35a4.32 4.32 0 0 1-.79-.08 3.9 3.9 0 0 1-.73-.23l-.17-.04h-.12q-.15 0-.15.21v.33a.43.43 0 0 0 0 .19.5.5 0 0 0 .21.19 3 3 0 0 0 .76.26 4.38 4.38 0 0 0 1 .12 3 3 0 0 0 1-.14 1.94 1.94 0 0 0 .73-.37 1.81 1.81 0 0 0 .49-.58 1.79 1.79 0 0 0 .17-.78 1.54 1.54 0 0 0-.3-.93 2.15 2.15 0 0 0-1-.64l-.95-.3a2 2 0 0 1-.73-.36.65.65 0 0 1-.2-.47.66.66 0 0 1 .31-.6 1.82 1.82 0 0 1 .89-.18 2.89 2.89 0 0 1 1.27.26.79.79 0 0 0 .26.08c.1 0 .15-.08.15-.22v-.36a.38.38 0 0 0-.06-.22.56.56 0 0 0-.2-.16 1.55 1.55 0 0 0-.28-.12 3.44 3.44 0 0 0-.38-.11l-.44-.1A3.4 3.4 0 0 0 19 6a2.82 2.82 0 0 0-.83.11 2.19 2.19 0 0 0-.7.35A1.61 1.61 0 0 0 17 7a1.5 1.5 0 0 0-.18.74 1.6 1.6 0 0 0 .33 1 2.08 2.08 0 0 0 1.06.68l1 .3a1.58 1.58 0 0 1 .67.34.66.66 0 0 1 .18.47.72.72 0 0 1-.35.63 1.83 1.83 0 0 1-.96.19zM12.94 6.5a.48.48 0 0 0-.13-.26.37.37 0 0 0-.26-.07H12a.43.43 0 0 0-.26.07.42.42 0 0 0-.13.26l-1 4.4-1.14-4.4a.48.48 0 0 0-.14-.26s-.13-.07-.26-.07h-.65c-.11 0-.16.06-.16.17a1.22 1.22 0 0 0 .06.27l1.56 5.14A.61.61 0 0 0 10 12a.45.45 0 0 0 .26.06h.57a.49.49 0 0 0 .27-.06.57.57 0 0 0 .12-.27l1-4.28 1 4.29a.42.42 0 0 0 .12.26.4.4 0 0 0 .27.07h.57a.41.41 0 0 0 .25-.07.44.44 0 0 0 .14-.26l1.61-5.14a.73.73 0 0 0 0-.16.52.52 0 0 0 0-.11.15.15 0 0 0-.17-.17h-.62a.45.45 0 0 0-.26.07.68.68 0 0 0-.13.26L14 11zM5.77 8.63a5.92 5.92 0 0 0-.71-.05 2.42 2.42 0 0 0-1.63.52 1.72 1.72 0 0 0-.6 1.37 1.7 1.7 0 0 0 .49 1.28 1.82 1.82 0 0 0 1.33.48 2.48 2.48 0 0 0 2-.92 3.5 3.5 0 0 0 .2.39 2.34 2.34 0 0 0 .24.31.26.26 0 0 0 .37 0l.42-.28a.28.28 0 0 0 .13-.2.27.27 0 0 0 0-.16 3.63 3.63 0 0 1-.21-.47 2 2 0 0 1-.07-.6V8.19a2.2 2.2 0 0 0-.55-1.64A2.42 2.42 0 0 0 5.33 6a3.9 3.9 0 0 0-1 .13 3.9 3.9 0 0 0-.84.3.47.47 0 0 0-.18.14.37.37 0 0 0 0 .23v.33c0 .14 0 .2.14.2a.26.26 0 0 0 .11 0l.23-.08A4.32 4.32 0 0 1 4.42 7a3 3 0 0 1 .72-.09 1.5 1.5 0 0 1 1.08.31 1.46 1.46 0 0 1 .31 1.06v.49zm.78.9v.27a2.36 2.36 0 0 1-.07.58 1.06 1.06 0 0 1-.23.43 1.38 1.38 0 0 1-.63.42 2.12 2.12 0 0 1-.68.12.94.94 0 0 1-.7-.24.92.92 0 0 1-.24-.71.92.92 0 0 1 .33-.76 1.52 1.52 0 0 1 1-.27h.62a5.67 5.67 0 0 1 .6.16zM19.76 15a19.68 19.68 0 0 1-7.55 1.54 20 20 0 0 1-9.9-2.62c-.24-.15-.43.1-.22.29A14.68 14.68 0 0 0 12 18a14.4 14.4 0 0 0 8.1-2.47c.34-.31.03-.72-.34-.53z"/>
                    <path d="M18.38 14.06c-.19.14-.16.33.05.3.71-.09 2.28-.27 2.56.09s-.31 1.83-.58 2.49c-.08.2.1.28.28.13a3.9 3.9 0 0 0 1.23-3.34 3.94 3.94 0 0 0-3.54.33z"/>
                  </svg>
                </Button>
              </Link>
            </div>
          </div>
        </footer>
        : <></> }
    </>
  )
}
