import { Prisma } from '@prisma/client'

export interface IRentDataDTO {
  monthly_cost?: number
  cost?: number
  currency: string
  bedrooms: number
  bathrooms: number
  square_feets: number
  image_url: string
  title: string
  description: string
  location: string
  latitude: Prisma.Decimal
  longitude: Prisma.Decimal
  is_verified: boolean
  rent: boolean
  contact: string
  token: string
}

export interface IRentDTO {
  monthly_cost?: number
  cost?: number
  currency: string
  bedrooms: number
  bathrooms: number
  square_feets: number
  image_url: string
  title: string
  description: string
  location: string
  latitude: Prisma.Decimal
  longitude: Prisma.Decimal
  rent: boolean
  is_verified: boolean
  contact: string
  userId: string
}
