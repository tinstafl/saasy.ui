import * as yup from "yup"
import { UserSchema } from "@/config/schema/regex"

export const schema = yup
  .object({
    email: yup.string()
      .matches(UserSchema.email)
      .required()
  })
  .required()
