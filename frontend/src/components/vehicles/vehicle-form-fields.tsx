import type { FieldErrors, UseFormRegister } from 'react-hook-form'

import type { VehicleFormValues } from '../../features/vehicles/vehicle-form-schema'
import { Field, FieldErrorMessage, fieldClassName } from '../ui'

type VehicleFormFieldsProps = {
  errors: FieldErrors<VehicleFormValues>
  register: UseFormRegister<VehicleFormValues>
  yearHint: string
}

function VehicleFormFields({
  errors,
  register,
  yearHint,
}: VehicleFormFieldsProps) {
  const yearErrorMessage = <FieldErrorMessage message={errors.year?.message} />
  const modelErrorMessage = <FieldErrorMessage message={errors.model?.message} />
  const userIdErrorMessage = <FieldErrorMessage message={errors.userId?.message} />

  const yearInput = (
    <div className="space-y-2">
      <input
        className={fieldClassName}
        inputMode="numeric"
        placeholder="2026"
        type="number"
        {...register('year')}
      />
      {yearErrorMessage}
    </div>
  )

  const modelInput = (
    <div className="space-y-2">
      <input
        className={fieldClassName}
        maxLength={255}
        placeholder="Transit Cargo"
        {...register('model')}
      />
      {modelErrorMessage}
    </div>
  )

  const userIdInput = (
    <div className="space-y-2">
      <input
        className={fieldClassName}
        inputMode="numeric"
        placeholder="1"
        type="number"
        {...register('userId')}
      />
      {userIdErrorMessage}
    </div>
  )

  const yearField = (
    <Field hint={yearHint} label="Year">
      {yearInput}
    </Field>
  )

  const modelField = <Field label="Model">{modelInput}</Field>
  const userIdField = <Field label="User ID">{userIdInput}</Field>

  return (
    <>
      {yearField}
      {modelField}
      {userIdField}
    </>
  )
}

export default VehicleFormFields
