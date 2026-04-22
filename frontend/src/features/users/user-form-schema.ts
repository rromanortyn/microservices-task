import { z } from 'zod'

export const PASSWORD_MIN_LENGTH = 8

export const userFormSchema = z.object({
  email: z
    .string()
    .trim()
    .min(1, 'Email is required.')
    .email('Enter a valid email address.'),
  password: z
    .string()
    .min(PASSWORD_MIN_LENGTH, `Password must be at least ${PASSWORD_MIN_LENGTH} characters long.`),
})

export type UserFormValues = z.infer<typeof userFormSchema>

export const EMPTY_USER_FORM_VALUES: UserFormValues = {
  email: '',
  password: '',
}
