import * as yup from "yup"
import { UserSchema } from "@/config/schema/regex"

export const schema = yup
  .object({
    username: yup.string()
      .matches(UserSchema.name)
      .required(),
    email: yup.string()
      .matches(UserSchema.email)
      .required(),
  })
  .shape({
    phone: yup.string()
      .when("phone", {
        is: (v: string | null | undefined) => v !== undefined && v !== null && v.length > 0,
        then: () => {
          return yup.string()
            .length(12)
            .matches(/^\d{3}-\d{3}-\d{4}$/)
            .required()
        },
      })
  }, [ [ "phone", "phone" ] ])
  .required()
