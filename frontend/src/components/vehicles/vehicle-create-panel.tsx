import type { FormEventHandler, ReactNode } from 'react'
import type { FieldErrors, UseFormRegister } from 'react-hook-form'

import type { VehicleFormValues } from '../../features/vehicles/vehicle-form-schema'
import { PlusIcon } from '../icons'
import { Button, Panel } from '../ui'
import VehicleFormFields from './vehicle-form-fields'

type VehicleCreatePanelProps = {
  createErrorElement: ReactNode
  errors: FieldErrors<VehicleFormValues>
  isCreating: boolean
  noticeElement: ReactNode
  onSubmit: FormEventHandler<HTMLFormElement>
  register: UseFormRegister<VehicleFormValues>
  yearHint: string
}

function VehicleCreatePanel({
  createErrorElement,
  errors,
  isCreating,
  noticeElement,
  onSubmit,
  register,
  yearHint,
}: VehicleCreatePanelProps) {
  const submitButtonLabel = isCreating ? 'Creating vehicle...' : 'Create vehicle'

  const submitButton = (
    <Button className="w-full" disabled={isCreating} type="submit">
      <PlusIcon className="size-4" />
      {submitButtonLabel}
    </Button>
  )

  return (
    <Panel title="Create vehicle">
      <form className="space-y-4" noValidate onSubmit={onSubmit}>
        <VehicleFormFields
          errors={errors}
          register={register}
          yearHint={yearHint}
        />
        {createErrorElement}
        {noticeElement}
        {submitButton}
      </form>
    </Panel>
  )
}

export default VehicleCreatePanel
