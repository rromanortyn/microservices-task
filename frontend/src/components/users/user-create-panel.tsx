import type { FormEventHandler, ReactNode } from 'react'
import type { FieldErrors, UseFormRegister } from 'react-hook-form'

import type { UserFormValues } from '../../features/users/user-form-schema'
import { PlusIcon } from '../icons'
import { Button, Panel } from '../ui'
import UserFormFields from './user-form-fields'

type UserCreatePanelProps = {
  createErrorElement: ReactNode
  errors: FieldErrors<UserFormValues>
  isCreating: boolean
  noticeElement: ReactNode
  onSubmit: FormEventHandler<HTMLFormElement>
  register: UseFormRegister<UserFormValues>
}

function UserCreatePanel({
  createErrorElement,
  errors,
  isCreating,
  noticeElement,
  onSubmit,
  register,
}: UserCreatePanelProps) {
  const submitButtonLabel = isCreating ? 'Creating user...' : 'Create user'

  const submitButton = (
    <Button
      className="w-full"
      disabled={isCreating}
      type="submit"
    >
      <PlusIcon className="size-4" />
      {submitButtonLabel}
    </Button>
  )

  return (
    <Panel title="Create user">
      <form className="space-y-4" noValidate onSubmit={onSubmit}>
        <UserFormFields
          emailAutoComplete="email"
          emailPlaceholder="john@example.com"
          errors={errors}
          passwordAutoComplete="new-password"
          passwordHint="min 8 chars"
          passwordPlaceholder="Create a strong password"
          register={register}
        />
        {createErrorElement}
        {noticeElement}
        {submitButton}
      </form>
    </Panel>
  )
}

export default UserCreatePanel
