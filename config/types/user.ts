export interface User {
  id: string
  email: string
  phone: string
  username: string
  settings: Settings
  verification: Verification
  updated: number
}

export const SubscriptionType = Object.freeze({
  FREE: "FREE",
  STARTUP: "STARTUP",
  ENTERPRISE: "ENTERPRISE"
} as const)

export type SubscriptionType = typeof SubscriptionType[keyof typeof SubscriptionType];

export interface Settings {
  mfa: MFASettings
  theme: "light" | "dark"
  subscription: SubscriptionType
}

export interface MFASettings {
  enabled: boolean
  configured: boolean
}

export interface Verification {
  email: boolean
  phone: boolean
  terms: boolean
  status: "PENDING" | "CONFIRMED" | "REJECTED"
}
