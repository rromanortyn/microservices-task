import type { FormEventHandler, ReactNode } from 'react'
import type { FieldErrors, UseFormRegister } from 'react-hook-form'

import type { UserFormValues } from '../../features/users/user-form-schema'
import type { User, Vehicle } from '../../types/entities'
import { PencilIcon, TrashIcon } from '../icons'
import { Button, Modal } from '../ui'
import RelatedVehiclesList from './related-vehicles-list'
import UserFormFields from './user-form-fields'

type UserDetailsModalProps = {
  errorElement: ReactNode
  errors: FieldErrors<UserFormValues>
  isDeleting: boolean
  isLoading: boolean
  isOpen: boolean
  isUpdating: boolean
  loadingElement: ReactNode
  noticeElement: ReactNode
  onClose: () => void
  onDelete: (id: number) => void
  onOpenVehicle: (id: number) => void
  onSubmit: FormEventHandler<HTMLFormElement>
  register: UseFormRegister<UserFormValues>
  selectedUser: User | null
  selectedVehicles: Vehicle[]
}

function UserDetailsModal({
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
  onOpenVehicle,
  onSubmit,
  register,
  selectedUser,
  selectedVehicles,
}: UserDetailsModalProps) {
  const deleteSelectedUser = () => {
    if (selectedUser) {
      onDelete(selectedUser.id)
    }
  }

  const modalTitle = selectedUser ? `User #${selectedUser.id}` : 'User details'
  const titleBlock = selectedUser
    ? (
        <div className="space-y-1">
          <h2 className="text-2xl font-black text-ink-950">
            {modalTitle}
          </h2>
          <p className="text-sm text-ink-500">
            Review the current details, update the credentials, or inspect related vehicles.
          </p>
        </div>
      )
    : null

  const summaryCard = selectedUser
    ? (
        <div className="grid gap-3 rounded-[1.75rem] border border-sand-200 bg-sand-50/70 p-5 sm:grid-cols-2">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-ink-400">
              ID
            </p>
            <p className="mt-1 text-lg font-black text-ink-950">
              #{selectedUser.id}
            </p>
          </div>
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-ink-400">
              Email
            </p>
            <p className="mt-1 text-lg font-black text-ink-950">
              {selectedUser.email}
            </p>
          </div>
        </div>
      )
    : null

  const updateButtonLabel = isUpdating ? 'Updating user...' : 'Update user'
  const deleteButtonLabel = isDeleting ? 'Deleting user...' : 'Delete user'

  const actionButtons = (
    <div className="flex flex-col gap-3 sm:flex-row">
      <Button
        className="flex-1"
        disabled={isUpdating}
        type="submit"
      >
        <PencilIcon className="size-4" />
        {updateButtonLabel}
      </Button>
      <Button
        className="flex-1"
        disabled={isDeleting}
        onClick={deleteSelectedUser}
        tone="danger"
      >
        <TrashIcon className="size-4" />
        {deleteButtonLabel}
      </Button>
    </div>
  )

  const editForm = (
    <form className="space-y-4" noValidate onSubmit={onSubmit}>
      <div className="grid gap-4 sm:grid-cols-2">
        <UserFormFields
          emailAutoComplete="email"
          emailPlaceholder="john@example.com"
          errors={errors}
          passwordAutoComplete="new-password"
          passwordHint="required for update"
          passwordPlaceholder="Enter a fresh password"
          register={register}
        />
      </div>
      {errorElement}
      {noticeElement}
      {actionButtons}
    </form>
  )

  const relatedVehiclesCard = (
    <div className="space-y-4 rounded-[1.75rem] border border-sand-200 bg-sand-50/70 p-5">
      <p className="text-sm font-bold text-ink-500">
        Linked vehicles: {selectedVehicles.length}
      </p>
      <RelatedVehiclesList
        onOpenVehicle={onOpenVehicle}
        vehicles={selectedVehicles}
      />
    </div>
  )

  const modalContent = !isLoading && selectedUser
    ? (
        <div className="space-y-6">
          {titleBlock}
          {summaryCard}
          {editForm}
          {relatedVehiclesCard}
        </div>
      )
    : null

  const fallbackErrorElement = !selectedUser ? errorElement : null

  return (
    <Modal
      ariaLabel="User details"
      isOpen={isOpen}
      onClose={onClose}
    >
      {loadingElement}
      {modalContent}
      {fallbackErrorElement}
    </Modal>
  )
}

export default UserDetailsModal
