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
    phone: yup.string()
      .optional()
      .defined()
      .matches(UserSchema.phone, { excludeEmptyString: true }),
    password: yup.string()
      .matches(UserSchema.password)
      .required(),
    confirmPassword: yup.string()
      .matches(UserSchema.password)
      .required()
      .oneOf([ yup.ref("password") ]),
    mfa: yup.boolean().required(),
    terms: yup.boolean().required(),
  })
