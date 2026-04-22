import type { FieldErrors, UseFormRegister } from 'react-hook-form'

import type { UserFormValues } from '../../features/users/user-form-schema'
import { Field, FieldErrorMessage, fieldClassName } from '../ui'

type UserFormFieldsProps = {
  emailAutoComplete: string
  emailPlaceholder: string
  errors: FieldErrors<UserFormValues>
  passwordAutoComplete: string
  passwordHint?: string
  passwordPlaceholder: string
  register: UseFormRegister<UserFormValues>
}

function UserFormFields({
  emailAutoComplete,
  emailPlaceholder,
  errors,
  passwordAutoComplete,
  passwordHint,
  passwordPlaceholder,
  register,
}: UserFormFieldsProps) {
  const emailErrorMessage = <FieldErrorMessage message={errors.email?.message} />
  const passwordErrorMessage = <FieldErrorMessage message={errors.password?.message} />

  const emailInput = (
    <div className="space-y-2">
      <input
        autoComplete={emailAutoComplete}
        className={fieldClassName}
        placeholder={emailPlaceholder}
        type="email"
        {...register('email')}
      />
      {emailErrorMessage}
    </div>
  )

  const passwordInput = (
    <div className="space-y-2">
      <input
        autoComplete={passwordAutoComplete}
        className={fieldClassName}
        placeholder={passwordPlaceholder}
        type="password"
        {...register('password')}
      />
      {passwordErrorMessage}
    </div>
  )

  const emailField = <Field label="Email">{emailInput}</Field>
  const passwordField = (
    <Field hint={passwordHint} label="Password">
      {passwordInput}
    </Field>
  )

  return (
    <>
      {emailField}
      {passwordField}
    </>
  )
}

export default UserFormFields
