import * as yup from "yup"
import { UserSchema } from "@/config/schema/regex"

export const schema = yup
  .object()
  .shape({
    confirmationCode: yup.string()
      .matches(UserSchema.confirmation)
      .required()
  })
  .required()