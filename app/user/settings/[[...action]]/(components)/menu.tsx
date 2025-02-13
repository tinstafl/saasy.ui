"use client"

import { fontHeader, fontPrimary } from "@/config/fonts"
import { site } from "@/config/site"
import { Button, Listbox, ListboxItem, ListboxSection } from "@heroui/react"
import { signOut } from "aws-amplify/auth"
import { usePathname, useRouter } from "next/navigation"
import React, { useState } from "react"
import { useUserState } from "@/context/user"
import ToggleMfa from "@/app/user/mfa/(components)/modal"
import { User } from "@/config/types/user"

export default function SettingsMenu({ user }: { user: User }): React.JSX.Element {
  const router = useRouter()
  const pathname = usePathname()

  const { setUser, putUser, deleteUser } = useUserState()
  const [ mfaModal, showMfaModal ] = useState<boolean>(false)
  const [ view ] = useState(pathname.endsWith(site.page.user.settings.view))
  const [ edit ] = useState(pathname.endsWith(site.page.user.settings.edit))

  const verified = () => {
    return (
      <Button isIconOnly
              aria-label="Verified MFA"
              className="bg-transparent">
        <svg xmlns="http://www.w3.org/2000/svg"
             viewBox="0 0 24 24"
             className="w-6 h-6 fill-warning/60">
          <path d="M12 2C9.243 2 7 4.243 7 7v3H6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8a2 2 0 0 0-2-2h-1V7c0-2.757-2.243-5-5-5zM9 7c0-1.654 1.346-3 3-3s3 1.346 3 3v3H9V7zm4 10.723V20h-2v-2.277a1.993 1.993 0 0 1 .567-3.677A2.001 2.001 0 0 1 14 16a1.99 1.99 0 0 1-1 1.723z"/>
        </svg>
      </Button>
    )
  }

  const unverified = () => {
    return (
      <Button isIconOnly
              aria-label="Unverified MFA"
              className="bg-transparent">
        <svg xmlns="http://www.w3.org/2000/svg"
             viewBox="0 0 24 24"
             className="w-6 h-6 fill-warning/60">
          <path d="M18 10H9V7c0-1.654 1.346-3 3-3s3 1.346 3 3h2c0-2.757-2.243-5-5-5S7 4.243 7 7v3H6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8a2 2 0 0 0-2-2zm-7.939 5.499A2.002 2.002 0 0 1 14 16a1.99 1.99 0 0 1-1 1.723V20h-2v-2.277a1.992 1.992 0 0 1-.939-2.224z"/>
        </svg>
      </Button>
    )
  }

  const updateUserMfa = () => {
    putUser({
      ...user,
      settings: {
        ...user.settings,
        mfa: {
          configured: !user.settings?.mfa?.configured,
          enabled: !user.settings?.mfa?.enabled,
        }
      }
    }).then(user => {
      setUser(user || {} as User)
    })
  }

  const deleteAccount = async () => {
    return deleteUser()
      .then(async () => {
        await signOut()
        router.push(site.page._.home)
      })
  }

  const settings = () => {
    if (edit)
      return ViewSettings()
    if (view)
      return EditSettings()

    return ViewSettings()
  }

  const ViewSettings = () => {
    return <ListboxItem key="view"
                        color="secondary"
                        aria-label="View Settings"
                        textValue="View Settings"
                        onPress={ () => router.push(site.page.user.settings.view) }
                        startContent={
                          <Button isIconOnly
                                  aria-label="View Settings"
                                  onPress={ () => router.push(site.page.user.settings.view) }
                                  className="bg-transparent">
                            <svg xmlns="http://www.w3.org/2000/svg"
                                 viewBox="0 0 489.7 489.7"
                                 className="w-6 h-6 fill-secondary flex-shrink-0">
                              <path d="M461.9,145.905l11.5-11.3l2.9-2.8l1.4-1.4c0.6-0.6,1.6-1.6,2.4-2.5c3.3-3.7,6.4-8.9,8-14.1c0.9-2.9,1.4-6.1,1.5-9.1    l0.1-3.8c0-1-0.2-1.9-0.6-2.9c-1.1-2.4-2.6-5.9-4.4-9.3c-1.8-3.5-4-6.8-5.6-8.4c-0.5-0.6-1-1.1-1.5-1.4c-0.4-0.3-0.8-0.4-1.1-0.5    c-0.7-0.2-1.3-0.1-1.8,0.1c-1,0.6-1.7,1.6-1.8,4.1c-0.5,4.4-1.1,10.9-1.1,18.1c0,0.5,0,1,0,1.5v0.6c-0.9,3.1-2.3,6.1-4.3,8.4    c-2,2.4-4.5,4-7.1,5.8c-5.2,3.6-10.4,7.4-15.6,11.4c-10.5,7.9-21.1,16.3-31.7,25.2c-21.3,17.7-42.8,37.2-63.8,57.4    c-25.7,24.6-51.3,49.1-77,73.7l-38.9,37.2l-9.6,9.3l-2.2,2.1c0,0-0.2,0.1-0.3,0.1l-0.6,0.1l-25.4,4.9    c-17.5,3.5-34.9,6.9-52.4,10.4l-8.4,1.7c3.4-16.5,6.9-33.1,10.3-49.6l5.2-26.3l1.3-6.6l0.6-3.3l0.1-0.4v-0.2v-0.1    c0.1-0.4-0.1,0.5-0.1,0.3s0.2-0.8,0.1-0.4c-0.2,0.6-0.1,0.3-0.1,0.4c-0.1,0,0.2-0.5,0.2-0.6l0,0l0,0l0.3-0.3l1.2-1.2l2.3-2.4    c12.7-12.3,25.5-24.5,38.2-36.8c40.1-39.1,80.2-78.4,119.7-118.1c19.7-19.9,39.3-39.9,58.7-60l7.3-7.6c1.2-1.3,1.9-2,2.3-2.4h0.3    c3.4,0.3,6.2,0.6,8.4,1.1c1.1,0.2,2,0.4,2.7,0.7h0.1c-0.2-0.1,0.4,0.2-0.3-0.1h0.1l0.2,0.1l0.6,0.2l1.2,0.5l2.4,1    c3,1.3,5.1,2.2,7.9,3.6c5.3,2.7,10.3,5.8,15.1,9.4c21.6,15.9,33.9,37.8,41.7,32.1c3.3-2.6,4.3-9.9,1.1-20.4    c-3.2-10.4-10.9-24.2-24.9-36.1c-6.2-5.3-13-10-20.1-14c-1.8-1-3.8-2-5.6-3c-2-1.1-3.4-1.6-5.2-2.5l-1.2-0.6l-1-0.5l-0.9-0.4    c-1.2-0.5-2.4-0.9-3.6-1.3c-2.4-0.7-4.6-1.3-6.8-1.7c-2.1-0.4-4.2-0.8-6.1-1.1l-2.8-0.4l-1.6-0.2c-0.9-0.1-1.8-0.2-2.7-0.2    c-3.6-0.1-7.6,0.5-11.1,1.8s-6.5,3.1-8.8,5c-0.6,0.4-1.2,1-1.9,1.6l-1.4,1.3l-2,1.9l-4,3.8l-8,7.6c-21.2,20.3-42.3,40.9-63,61.7    c-33.3,33.6-66.2,67.3-99.1,101.3l-49.2,50.9l-3.2,3.3c-1.8,1.9-3.3,3.9-4.6,6c-1.2,2.1-2.3,4.3-3.1,6.9c-1,3.4-0.9,4.1-1.3,5.7    l-3.4,17.4l-6.9,34.7c-2.8,10.2-5.7,20.4-8.5,30.7l-2.1,7.7l-1,3.9l-0.5,1.9c-0.2,1-0.6,2.7-0.7,4.1c-0.6,5.9,1,13.5,6,19.2    c2.4,2.8,5.6,5.1,8.9,6.5s6.7,2.1,10.1,2.2c1,0,2,0,3-0.1l1.6-0.2l0.5-0.1l1.4-0.2l1-0.2l3.9-0.7l7.9-1.3l15.7-2.7    c10.5-1.9,21-3.8,31.5-5.7c10.5-2,21-4,31.5-6l7.9-1.5c4.6-0.9,10-3,14.5-6.1c1.1-0.8,2.2-1.6,3.1-2.4l1.6-1.4l0.9-0.9l2.9-2.8    l5.7-5.6c15.2-15.1,30.5-30.1,45.7-45.2c30.3-30.4,60.6-60.9,90.9-91.3c15.2-15.2,30.4-30.4,45.5-45.5L461.9,145.905z     M380.6,34.805L380.6,34.805c-0.3,0-0.6,0-0.7-0.1L380.6,34.805z M121,353.305c-0.5,0.1,0.1,0,0.4-0.1c0.1,0,0.1,0,0.2,0    L121,353.305z"/>
                              <path d="M400.9,282.405c-4.9-7.7-9,2.3-12.1,17.3c-5.2,24.7-8.9,52-11.4,80.8c-1.3,14.4-2.3,29.2-3,44.1    c-0.2,3.7-0.3,7.5-0.5,11.3l-0.2,5.7v0.7v0.4c0-0.3,0,0.7,0-0.6l0,0v0.1v0.2l-0.1,1.4c-0.1,1.3-0.2,1-0.3,1.3    c-0.8,3.3-3.4,6.5-6.5,8.1c-2,1-3.8,1.4-6.4,1.3l-13.8-0.3l-27.5-0.6l-55.1-1.2c-36.7-0.7-73.5-1.3-110.2-2    c-36.8-0.5-73.6-0.9-110.4-0.9H43h-0.4l-1.7-0.1c-0.1-0.2,0.5,0,0-0.1c-0.6-0.1-1.1-0.4-1.7-0.6c-1-0.6-2.1-1.5-2.7-2.5    c-0.7-1-1-2.2-1.1-3.5l-0.2-13.8c-0.2-18.4-0.5-36.9-0.9-55.4c0.4-18.3,0.7-36.5,1.1-54.8c0.8-58,1.4-115.9,1.2-173.8l-0.1-20.7    c0-2,0.7-3.3,2-4.6c0.6-0.6,1.4-1,2.2-1.3c0.4-0.1,0.8-0.2,1.3-0.3c0.1,0,0.2,0,0.3,0c0,0,0.8,0,1.1,0h2.7l21.7-0.3    c28.9-0.5,57.8-1.2,86.6-2.3c32.8-1.2,60-5.8,57.6-14.8c-2.2-8.3-25.5-14.4-59.1-15.3c-30.2-0.8-60.6-1.6-91-2.4l-11.4-0.2    l-5.7-0.1c-1.1,0-1.7-0.1-3.1,0c-1.5,0.1-3.1,0.1-4.6,0.3c-12.3,1.4-23.8,8.5-30.5,18.9c-1.7,2.6-3.1,5.4-4.1,8.3    c-1.1,3-1.8,5.7-2.3,9.7l-0.1,1.3v0.7l-0.1,1.4v1.5v0.7v1.4v5.7v22.8c0.2,48.8,0.8,97.6,1.5,146.4l1.1,73.2l0.6,36.6l0.3,18.3    l0.1,9.1v2.3c0,0.8,0,1.3,0.1,2.6c0.1,2.3,0.4,4.5,0.8,6.8c1.3,8.1,5.3,15.9,11.3,21.7c3,2.9,6.5,5.5,10.3,7.3    c3.9,1.8,7.6,3.1,13,3.8l2,0.2l0.5,0.1h1.3l1,0.1l4.1,0.2l8.2,0.4l16.5,0.7c22,0.9,44,1.6,66,2.1c44.1,1,88.4,1.4,132.7,1.4    c22.2,0,44.4-0.1,66.5-0.1l16.6-0.1h4.2h2.3l3.6-0.2c4.9-0.5,9.7-1.7,14.2-3.6c9-4,16.6-10.8,21.4-19.3c2.4-4.3,4.1-8.8,5.1-13.7    c0.3-1.5,0.5-2.9,0.6-4.4c0.1-0.9,0.1-1.1,0.1-1.5v-1l0.1-2v-1v-2.1c-0.1-44.4-0.1-88.7,0.5-132.9    C406.9,298.705,403.4,286.305,400.9,282.405z"/>
                            </svg>
                          </Button>
                        }>

      <span className={ `text-base ${ fontHeader.className }` }>View Settings</span>
    </ListboxItem>
  }

  const EditSettings = () => {
    return <ListboxItem key="edit"
                        color="secondary"
                        aria-label="Edit Settings"
                        textValue="Edit Settings"
                        onPress={ () => router.push(site.page.user.settings.edit) }
                        startContent={
                          <Button isIconOnly
                                  aria-label="Edit Settings"
                                  onPress={ () => router.push(site.page.user.settings.edit) }
                                  className="bg-transparent">
                            <svg xmlns="http://www.w3.org/2000/svg"
                                 viewBox="0 0 24 24"
                                 className="w-6 h-6 fill-secondary flex-shrink-0">
                              <path d="M12 16c2.206 0 4-1.794 4-4s-1.794-4-4-4-4 1.794-4 4 1.794 4 4 4zm0-6c1.084 0 2 .916 2 2s-.916 2-2 2-2-.916-2-2 .916-2 2-2z"/>
                              <path d="m2.845 16.136 1 1.73c.531.917 1.809 1.261 2.73.73l.529-.306A8.1 8.1 0 0 0 9 19.402V20c0 1.103.897 2 2 2h2c1.103 0 2-.897 2-2v-.598a8.132 8.132 0 0 0 1.896-1.111l.529.306c.923.53 2.198.188 2.731-.731l.999-1.729a2.001 2.001 0 0 0-.731-2.732l-.505-.292a7.718 7.718 0 0 0 0-2.224l.505-.292a2.002 2.002 0 0 0 .731-2.732l-.999-1.729c-.531-.92-1.808-1.265-2.731-.732l-.529.306A8.1 8.1 0 0 0 15 4.598V4c0-1.103-.897-2-2-2h-2c-1.103 0-2 .897-2 2v.598a8.132 8.132 0 0 0-1.896 1.111l-.529-.306c-.924-.531-2.2-.187-2.731.732l-.999 1.729a2.001 2.001 0 0 0 .731 2.732l.505.292a7.683 7.683 0 0 0 0 2.223l-.505.292a2.003 2.003 0 0 0-.731 2.733zm3.326-2.758A5.703 5.703 0 0 1 6 12c0-.462.058-.926.17-1.378a.999.999 0 0 0-.47-1.108l-1.123-.65.998-1.729 1.145.662a.997.997 0 0 0 1.188-.142 6.071 6.071 0 0 1 2.384-1.399A1 1 0 0 0 11 5.3V4h2v1.3a1 1 0 0 0 .708.956 6.083 6.083 0 0 1 2.384 1.399.999.999 0 0 0 1.188.142l1.144-.661 1 1.729-1.124.649a1 1 0 0 0-.47 1.108c.112.452.17.916.17 1.378 0 .461-.058.925-.171 1.378a1 1 0 0 0 .471 1.108l1.123.649-.998 1.729-1.145-.661a.996.996 0 0 0-1.188.142 6.071 6.071 0 0 1-2.384 1.399A1 1 0 0 0 13 18.7l.002 1.3H11v-1.3a1 1 0 0 0-.708-.956 6.083 6.083 0 0 1-2.384-1.399.992.992 0 0 0-1.188-.141l-1.144.662-1-1.729 1.124-.651a1 1 0 0 0 .471-1.108z"/>
                            </svg>
                          </Button>
                        }>

      <span className={ `text-base ${ fontHeader.className }` }>Edit Settings</span>
    </ListboxItem>
  }

  return (
    <>
      <Listbox variant="light"
               aria-label="Settings"
               className={ `w-64 ${ fontPrimary.className }` }>

        <ListboxSection showDivider>
          { settings() }

          <ListboxItem key="reset-password"
                       color="warning"
                       aria-label="Reset Password"
                       textValue="Reset Password"
                       onPress={ () => router.push(site.page.auth.password.reset) }
                       startContent={
                         <Button isIconOnly
                                 aria-label="Reset Password"
                                 onPress={ () => router.push(site.page.auth.password.reset) }
                                 className="bg-transparent">
                           <svg xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                className="w-6 h-6 fill-warning flex-shrink-0">
                             <path d="M9.715 12c1.151 0 2-.849 2-2s-.849-2-2-2-2 .849-2 2 .848 2 2 2z"/>
                             <path d="M20 4H4c-1.103 0-2 .841-2 1.875v12.25C2 19.159 2.897 20 4 20h16c1.103 0 2-.841 2-1.875V5.875C22 4.841 21.103 4 20 4zm0 14-16-.011V6l16 .011V18z"/>
                             <path d="M14 9h4v2h-4zm1 4h3v2h-3zm-1.57 2.536c0-1.374-1.676-2.786-3.715-2.786S6 14.162 6 15.536V16h7.43v-.464z"/>
                           </svg>
                         </Button> }>

            <span className={ `text-base ${ fontHeader.className }` }>Reset Password</span>
          </ListboxItem>

          <ListboxItem key="enable-mfa"
                       color={ user?.settings?.mfa?.enabled ? "warning" : "success" }
                       aria-label="MFA"
                       textValue="MFA"
                       className="my-auto w-fit"
                       onPress={ () => {showMfaModal(true)} }
                       startContent={ user?.settings?.mfa?.enabled ? verified() : unverified() }>

            <span className={ `text-base ${ fontHeader.className }` }>{ user?.settings?.mfa?.enabled ? "Disable MFA" : "Enable MFA" }</span>
          </ListboxItem>
        </ListboxSection>

        <ListboxSection>
          <ListboxItem key="delete"
                       color="danger"
                       variant="flat"
                       aria-label="Delete Account"
                       textValue="Delete Account"
                       onPress={ deleteAccount }
                       startContent={
                         <Button isIconOnly
                                 aria-label="Delete Account"
                                 className="bg-transparent">
                           <svg aria-hidden="true"
                                fill="none"
                                viewBox="0 0 24 24"
                                className="w-6 h-6 flex-shrink-0 text-danger">
                             <path d="M21.07 5.23c-1.61-.16-3.22-.28-4.84-.37v-.01l-.22-1.3c-.15-.92-.37-2.3-2.71-2.3h-2.62c-2.33 0-2.55 1.32-2.71 2.29l-.21 1.28c-.93.06-1.86.12-2.79.21l-2.04.2c-.42.04-.72.41-.68.82.04.41.4.71.82.67l2.04-.2c5.24-.52 10.52-.32 15.82.21h.08c.38 0 .71-.29.75-.68a.766.766 0 0 0-.69-.82Z"
                                   fill="currentColor"/>
                             <path opacity={ 0.4 }
                                   d="M19.23 8.14c-.24-.25-.57-.39-.91-.39H5.68c-.34 0-.68.14-.91.39-.23.25-.36.59-.34.94l.62 10.26c.11 1.52.25 3.42 3.74 3.42h6.42c3.49 0 3.63-1.89 3.74-3.42l.62-10.25c.02-.36-.11-.7-.34-.95Z"
                                   fill="currentColor"/>
                             <path clipRule="evenodd"
                                   d="M9.58 17a.75.75 0 0 1 .75-.75h3.33a.75.75 0 0 1 0 1.5h-3.33a.75.75 0 0 1-.75-.75ZM8.75 13a.75.75 0 0 1 .75-.75h5a.75.75 0 0 1 0 1.5h-5a.75.75 0 0 1-.75-.75Z"
                                   fill="currentColor" fillRule="evenodd"/>
                           </svg>
                         </Button> }>

            <span className={ `text-base text-danger ${ fontHeader.className }` }>Delete Account</span>
          </ListboxItem>
        </ListboxSection>
      </Listbox>

      <ToggleMfa mfaEnabled={ user?.settings?.mfa?.enabled }
                 isOpen={ mfaModal }
                 updateUser={ () => updateUserMfa() }
                 hide={ () => showMfaModal(false) }/>
    </>
  )
}
