import * as yup from "yup"
import { UserSchema } from "@/config/schema/regex"

export const schema = yup
  .object()
  .shape({
    email: yup.string()
      .matches(UserSchema.email)
      .required(),
  })
  .required()