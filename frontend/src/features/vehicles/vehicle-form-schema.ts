import { z } from 'zod'

import type { VehiclePayload } from '../../types/entities'

export const CURRENT_VEHICLE_YEAR = new Date().getFullYear() + 1
export const MIN_VEHICLE_YEAR = 1886
export const MODEL_MAX_LENGTH = 255

export const vehicleFormSchema = z.object({
  year: z
    .string()
    .trim()
    .min(1, 'Year is required.')
    .refine((value) => /^\d+$/.test(value), 'Year must be a whole number.')
    .refine((value) => {
      const year = Number(value)
      return year >= MIN_VEHICLE_YEAR && year <= CURRENT_VEHICLE_YEAR
    }, `Year must be between ${MIN_VEHICLE_YEAR} and ${CURRENT_VEHICLE_YEAR}.`),
  model: z
    .string()
    .trim()
    .min(1, 'Model is required.')
    .max(MODEL_MAX_LENGTH, `Model must be ${MODEL_MAX_LENGTH} characters or fewer.`),
  userId: z
    .string()
    .trim()
    .min(1, 'User ID is required.')
    .refine((value) => /^\d+$/.test(value) && Number(value) > 0, 'User ID must be a positive integer.'),
})

export type VehicleFormValues = z.infer<typeof vehicleFormSchema>

export const EMPTY_VEHICLE_FORM_VALUES: VehicleFormValues = {
  year: '',
  model: '',
  userId: '',
}

export function toVehiclePayload(values: VehicleFormValues): VehiclePayload {
  return {
    year: Number(values.year),
    model: values.model.trim(),
    userId: Number(values.userId),
  }
}
