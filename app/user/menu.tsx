"use client"

import { fontPrimary } from "@/config/fonts"
import { site } from "@/config/site"
import { Button, Popover, PopoverContent, PopoverTrigger } from "@heroui/react"
import Link from "next/link"

import { signOut } from "aws-amplify/auth"

export default function Menu() {

  const logout = async () => {
    await signOut()
      .then(() => sessionStorage.clear())
      .then(() => localStorage.clear())
      .then(() => location.reload())

    const cookies = document.cookie.split(";")
    for (let cookie of cookies) {
      const cookieName = cookie.split("=")[0].trim()
      document.cookie = `${ cookieName }=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/`
    }
  }

  return (
    <div className="flex animate-flip-up animate-delay-500 animate-duration-1000">
      <Popover showArrow offset={ 10 } placement="bottom" backdrop="blur">
        <PopoverTrigger>
          <Button isIconOnly
                  aria-label="User Options"
                  className="bg-transparent">
            <svg xmlns="http://www.w3.org/2000/svg"
                 viewBox="0 0 24 24"
                 className="h-8 w-8 fill-secondary-400 hover:animate-jump hover:animate-delay-200">
              <path d="M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.514 2 12 2zm0 18c-4.411 0-8-3.589-8-8s3.589-8 8-8 8 3.589 8 8-3.589 8-8 8z"/>
              <path d="M14.829 14.828a4.055 4.055 0 0 1-1.272.858 4.002 4.002 0 0 1-4.875-1.45l-1.658 1.119a6.063 6.063 0 0 0 1.621 1.62 5.963 5.963 0 0 0 2.148.903 6.042 6.042 0 0 0 2.415 0 5.972 5.972 0 0 0 2.148-.903c.313-.212.612-.458.886-.731.272-.271.52-.571.734-.889l-1.658-1.119a4.017 4.017 0 0 1-.489.592z"/>
              <circle cx="8.5" cy="10.5" r="1.5"/>
              <circle cx="15.493" cy="10.493" r="1.493"/>
            </svg>
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-36">
          <div className="flex flex-col w-full justify-between">
            <Link href={ site.page.user.settings.view }
                  className={ `flex justify-between w-full gap-2 px-1 h-8 rounded text-sm text-foreground/60 fill-foreground/60 hover:text-secondary hover:fill-secondary hover:border-secondary ${ fontPrimary.className }` }>

              <Button isIconOnly
                      aria-label="Settings"
                      className="bg-transparent">
                <svg xmlns="http://www.w3.org/2000/svg"
                     viewBox="0 0 24 24"
                     className="h-6 w-6 my-auto fill-inherit">
                  <path d="M1,5 C1,4.44771525 1.44266033,4 1.99895656,4 L3.00104344,4 C3.55275191,4 4,4.44386482 4,5 C4,5.55228475 3.55733967,6 3.00104344,6 L1.99895656,6 C1.44724809,6 1,5.55613518 1,5 Z M12,5 C12,4.44771525 12.444837,4 12.9955775,4 L22.0044225,4 C22.5542648,4 23,4.44386482 23,5 C23,5.55228475 22.555163,6 22.0044225,6 L12.9955775,6 C12.4457352,6 12,5.55613518 12,5 Z M8,6 C7.44771525,6 7,5.55228475 7,5 C7,4.44771525 7.44771525,4 8,4 C8.55228475,4 9,4.44771525 9,5 C9,5.55228475 8.55228475,6 8,6 Z M8,8 C6.34314575,8 5,6.65685425 5,5 C5,3.34314575 6.34314575,2 8,2 C9.65685425,2 11,3.34314575 11,5 C11,6.65685425 9.65685425,8 8,8 Z M1,19 C1,18.4477153 1.44266033,18 1.99895656,18 L3.00104344,18 C3.55275191,18 4,18.4438648 4,19 C4,19.5522847 3.55733967,20 3.00104344,20 L1.99895656,20 C1.44724809,20 1,19.5561352 1,19 Z M12,19 C12,18.4477153 12.444837,18 12.9955775,18 L22.0044225,18 C22.5542648,18 23,18.4438648 23,19 C23,19.5522847 22.555163,20 22.0044225,20 L12.9955775,20 C12.4457352,20 12,19.5561352 12,19 Z M8,20 C7.44771525,20 7,19.5522847 7,19 C7,18.4477153 7.44771525,18 8,18 C8.55228475,18 9,18.4477153 9,19 C9,19.5522847 8.55228475,20 8,20 Z M8,22 C6.34314575,22 5,20.6568542 5,19 C5,17.3431458 6.34314575,16 8,16 C9.65685425,16 11,17.3431458 11,19 C11,20.6568542 9.65685425,22 8,22 Z M1,12 C1,11.4477153 1.4556644,11 1.99539757,11 L10.0046024,11 C10.5543453,11 11,11.4438648 11,12 C11,12.5522847 10.5443356,13 10.0046024,13 L1.99539757,13 C1.44565467,13 1,12.5561352 1,12 Z M19,12 C19,11.4477153 19.4433532,11 20.0093689,11 L21.9906311,11 C22.5480902,11 23,11.4438648 23,12 C23,12.5522847 22.5566468,13 21.9906311,13 L20.0093689,13 C19.4519098,13 19,12.5561352 19,12 Z M15,13 C14.4477153,13 14,12.5522847 14,12 C14,11.4477153 14.4477153,11 15,11 C15.5522847,11 16,11.4477153 16,12 C16,12.5522847 15.5522847,13 15,13 Z M15,15 C13.3431458,15 12,13.6568542 12,12 C12,10.3431458 13.3431458,9 15,9 C16.6568542,9 18,10.3431458 18,12 C18,13.6568542 16.6568542,15 15,15 Z"/>
                </svg>
              </Button>

              <span className="my-auto">Settings</span>
            </Link>

            <Link href={ site.page._.home }
                  onClick={ logout }
                  className={ `flex justify-between w-full gap-2 px-1 h-8 rounded text-sm text-foreground/60 fill-foreground/60 hover:text-secondary hover:fill-secondary hover:border-secondary ${ fontPrimary.className }` }>

              <Button isIconOnly
                      aria-label="Sign Out"
                      className="bg-transparent">
                <svg xmlns="http://www.w3.org/2000/svg"
                     viewBox="0 0 64 64"
                     aria-hidden="true"
                     className="h-6 w-6 my-auto fill-inherit">
                  <path d="M5.946 30.785c-2.999 7.189 2.213 15.866 9.784 17.387c-5.9-3.962-9.584-10.327-9.784-17.387"/>
                  <path d="M15.73 48.172l-.184-.039c.023.006.078.015.184.039"/>
                  <path d="M2 44.261c.489 6.02 8.039 9.878 13.457 7.412C9.879 50.475 6.179 49.378 2 44.261"/>
                  <path d="M46.504 22.794c3.512-7.168-1.475-16.036-9.055-17.963c5.799 4.233 9.239 10.824 9.055 17.963"/>
                  <path d="M48.865 17.848c4.192-3.709 2.502-11.088-2.332-13.49c2.33 4.565 3.151 8.421 2.332 13.49"/>
                  <path d="M60.519 14.345a5.43 5.43 0 0 0-3.303-1.116c-7.206 0-8.498 9.386-10.097 13.05c0 0-7.389-15.469-9.959-20.573c-2.65-5.265-8.307-4.177-9.964-1.311C23.26.316 15.823 3.609 16.771 8.568c-5.104-.392-7.167 4.643-6.034 7.871c-3.945-.122-5.789 4.757-4.455 8.25c.069.182 7.073 13.966 8.959 18.662c.219.545.44 1.128.672 1.742c1.525 4.032 3.614 9.554 8.84 13.989C27.003 60.991 30.118 62 33.764 62c6.426 0 13.581-3.189 18.229-8.126c4.163-4.421 6.158-9.848 5.77-15.695c-.348-5.256 1.324-10.208 2.667-14.188c1.457-4.319 2.607-7.731.089-9.646m-5.947 23.66c.813 11.628-10.842 21.439-20.73 21.439c-3.021 0-6.15-.488-8.105-2.147c-5.606-4.758-7.013-10.646-8.638-14.684c-1.941-4.831-6.705-14.114-9.014-18.784c-.945-1.912.634-5.981 3.384-5.981L19.4 34.716l3.005 1.804s-6.882-14.998-9.061-20.167c-1.272-3.018.92-6.662 3.874-6.187l9.846 21.016l3.006 1.808L18.594 8.757c-.046-4.295 5.831-4.362 7.197-1.854c3.457 6.348 9.947 20.279 9.947 20.279l3.004 1.807L27.969 6.146c2.104-2.754 5.816-2.368 7.416.975c1.922 4.015 10.061 21.454 10.061 21.454c-8.035 3.012-13.52 11.743-7.777 20.35c-4.557-9.41 3.516-16.06 8.285-18.258c1.805-.833 2.469-2.408 2.469-2.408l-.004.001c.629-1.139.592-2.662 1.342-5.127c1.625-5.335 3.854-8.162 7.125-8.162c.754 0 1.704.564 2.14 1.207c2.203 3.251-5.21 11.023-4.454 21.827"/>
                </svg>
              </Button>

              <span className="my-auto">Sign Out</span>
            </Link>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  )
}
