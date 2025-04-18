import React from "react"
import { UserSchema } from "@/config/schema/regex"

export const changePhone = (change: (...event: any[]) => void,
                            event: React.ChangeEvent<HTMLInputElement>) => {
  const value = event.target.value || ""
  const lastValue = value.charAt(value.length - 1)

  if (value.length > 0
    && lastValue !== "-"
    && !/\d/.test(lastValue)) {
    change({ target: { value: value.substring(0, lastValue.length - 2) } })
  }

  const digits: number[] = []
  for (const i of value)
    if (/\d/.test(i))
      digits?.push(+i)


  if (digits && digits.length > 0 && digits.length < 4) {
    change({ target: { value: `${ digits.join("") }` } })
  } else if (digits && digits.length >= 4 && digits.length < 7) {
    change({ target: { value: `${ digits.slice(0, 3).join("") }-${ digits.slice(3, digits.length).join("") }` } })
  } else if (digits && digits.length >= 7) {
    const max = digits.length <= 10 ? digits.length : 10
    change({ target: { value: `${ digits.slice(0, 3).join("") }-${ digits.slice(3, 6).join("") }-${ digits.slice(6, max).join("") }` } })
  } else change({ target: { value: "" } })
}

export const formatPhone = (data: string) => {
  if (data === "") return ""
  if (UserSchema.phone.test(data)) return data

  const phone = data.slice(2).split("")
  return `${ phone.slice(0, 3).join("") }-${ phone.slice(3, 6).join("") }-${ phone.slice(6, 10).join("") }`
}

export const numbersOnly = (change: (...event: any[]) => void,
                            event: React.ChangeEvent<HTMLInputElement>) => {
  const value = event.target.value || ""
  const lastValue = value.charAt(value.length - 1)

  if (value.length > 0 && !/\d/.test(lastValue)) {
    change({ target: { value: value.substring(0, lastValue.length - 1) } })
  } else change(event)
}
