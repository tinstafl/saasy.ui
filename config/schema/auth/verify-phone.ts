import * as yup from "yup"
import { UserSchema } from "@/config/schema/regex"

export const schema = yup
  .object({
    confirmationCode: yup.string()
      .matches(UserSchema.confirmation)
      .required(),
  })
  .shape({
    phone: yup.string()
      .matches(UserSchema.phone)
      .required()
  }, [ [ "phone", "phone" ] ])
  .required()
