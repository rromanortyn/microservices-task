import type { FormEventHandler, ReactNode } from 'react'
import type { FieldErrors, UseFormRegister } from 'react-hook-form'

import type { VehicleFormValues } from '../../features/vehicles/vehicle-form-schema'
import type { Vehicle } from '../../types/entities'
import { PencilIcon, TrashIcon } from '../icons'
import { Button, Modal } from '../ui'
import VehicleFormFields from './vehicle-form-fields'

type VehicleDetailsModalProps = {
  errorElement: ReactNode
  errors: FieldErrors<VehicleFormValues>
  isDeleting: boolean
  isLoading: boolean
  isOpen: boolean
  isUpdating: boolean
  loadingElement: ReactNode
  noticeElement: ReactNode
  onClose: () => void
  onDelete: (id: number) => void
  onSubmit: FormEventHandler<HTMLFormElement>
  register: UseFormRegister<VehicleFormValues>
  selectedVehicle: Vehicle | null
  yearHint: string
}

function VehicleDetailsModal({
  errorElement,
  errors,
  isDeleting,
  isLoading,
  isOpen,
  isUpdating,
  loadingElement,
  noticeElement,
  onClose,
  onDelete,
  onSubmit,
  register,
  selectedVehicle,
  yearHint,
}: VehicleDetailsModalProps) {
  const deleteSelectedVehicle = () => {
    if (selectedVehicle) {
      onDelete(selectedVehicle.id)
    }
  }

  const modalTitle = selectedVehicle ? `Vehicle #${selectedVehicle.id}` : 'Vehicle details'
  const titleBlock = selectedVehicle
    ? (
        <div className="space-y-1">
          <h2 className="text-2xl font-black text-ink-950">
            {modalTitle}
          </h2>
          <p className="text-sm text-ink-500">
            Review the current state, then update or remove this vehicle record.
          </p>
        </div>
      )
    : null

  const stateLabel = selectedVehicle?.year && selectedVehicle.model ? 'Ready' : 'Needs details'
  const summaryCard = selectedVehicle
    ? (
        <div className="grid gap-3 rounded-[1.75rem] border border-sand-200 bg-sand-50/70 p-5 sm:grid-cols-3">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-ink-400">
              ID
            </p>
            <p className="mt-1 text-lg font-black text-ink-950">
              #{selectedVehicle.id}
            </p>
          </div>
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-ink-400">
              User ID
            </p>
            <p className="mt-1 text-lg font-black text-ink-950">
              {selectedVehicle.userId ?? 'Not set'}
            </p>
          </div>
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-ink-400">
              State
            </p>
            <p className="mt-1 text-lg font-black text-ink-950">
              {stateLabel}
            </p>
          </div>
        </div>
      )
    : null

  const updateButtonLabel = isUpdating ? 'Updating vehicle...' : 'Update vehicle'
  const deleteButtonLabel = isDeleting ? 'Deleting vehicle...' : 'Delete vehicle'

  const actionButtons = (
    <div className="flex flex-col gap-3 sm:flex-row">
      <Button className="flex-1" disabled={isUpdating} type="submit">
        <PencilIcon className="size-4" />
        {updateButtonLabel}
      </Button>
      <Button
        className="flex-1"
        disabled={isDeleting}
        onClick={deleteSelectedVehicle}
        tone="danger"
      >
        <TrashIcon className="size-4" />
        {deleteButtonLabel}
      </Button>
    </div>
  )

  const editForm = (
    <form className="space-y-4" noValidate onSubmit={onSubmit}>
      <div className="grid gap-4 sm:grid-cols-3">
        <VehicleFormFields
          errors={errors}
          register={register}
          yearHint={yearHint}
        />
      </div>
      {errorElement}
      {noticeElement}
      {actionButtons}
    </form>
  )

  const modalContent = !isLoading && selectedVehicle
    ? (
        <div className="space-y-6">
          {titleBlock}
          {summaryCard}
          {editForm}
        </div>
      )
    : null

  const fallbackErrorElement = !selectedVehicle ? errorElement : null

  return (
    <Modal
      ariaLabel="Vehicle details"
      isOpen={isOpen}
      onClose={onClose}
    >
      {loadingElement}
      {modalContent}
      {fallbackErrorElement}
    </Modal>
  )
}

export default VehicleDetailsModal
