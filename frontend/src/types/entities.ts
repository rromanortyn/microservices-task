export type User = {
  email: string
  id: number
}

export type Vehicle = {
  id: number
  model: string | null
  userId: number | null
  year: number | null
}

export type UserPayload = {
  email: string
  password: string
}

export type VehiclePayload = {
  model: string
  userId: number
  year: number
}
