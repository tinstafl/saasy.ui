import {
  Roboto as FontPrimary,
  Archivo as FontHeader,
  Leckerli_One as FontSaasy,
} from "next/font/google"

export const fontPrimary = FontPrimary({
  weight: [ "400", "700", "900" ],
  subsets: [ "latin" ],
  variable: "--font-primary",
})

export const fontHeader = FontHeader({
  weight: [ "400", "700", "900" ],
  subsets: [ "latin", "latin-ext" ],
  variable: "--font-header"
})

export const fontSaasy = FontSaasy({
  weight: [ "400" ],
  subsets: [ "latin" ],
  variable: "--font-saasy",
})
