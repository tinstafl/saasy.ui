import * as yup from "yup"
import { UserSchema } from "@/config/schema/regex"

export const schema = yup
  .object({
    email: yup.string()
      .matches(UserSchema.email)
      .required(),
    password: yup.string()
      .matches(UserSchema.password)
      .required(),
    confirmationCode: yup.string()
      .matches(UserSchema.confirmation)
      .required(),
  })
  .required()