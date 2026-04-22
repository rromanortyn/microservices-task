import type { User } from '../../types/entities'
import { EyeIcon, PencilIcon, TrashIcon } from '../icons'
import { IconButton } from '../ui'

type UserListItemProps = {
  onDelete: (id: number) => void
  onOpen: (id: number) => void
  user: User
}

function UserListItem({ onDelete, onOpen, user }: UserListItemProps) {
  const openUser = () => onOpen(user.id)
  const deleteUser = () => onDelete(user.id)

  const actionButtons = (
    <div className="flex items-center gap-2 self-end sm:self-center">
      <IconButton
        label={`Open details for ${user.email}`}
        onClick={openUser}
      >
        <EyeIcon className="size-4" />
      </IconButton>
      <IconButton
        label={`Edit ${user.email}`}
        onClick={openUser}
      >
        <PencilIcon className="size-4" />
      </IconButton>
      <IconButton
        label={`Delete ${user.email}`}
        onClick={deleteUser}
        tone="danger"
      >
        <TrashIcon className="size-4" />
      </IconButton>
    </div>
  )

  return (
    <li className="group rounded-[1.6rem] border border-sand-200 bg-sand-50/70 p-4 transition duration-200 hover:-translate-y-0.5 hover:border-primary-200 hover:bg-white">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <button
          className="flex flex-1 flex-col items-start text-left"
          onClick={openUser}
          type="button"
        >
          <span className="text-xs font-black uppercase tracking-[0.22em] text-primary-600">
            User #{user.id}
          </span>
          <span className="mt-2 text-lg font-black text-ink-950">
            {user.email}
          </span>
          <span className="mt-1 text-sm text-ink-500">
            Open this record to edit it, delete it, and inspect related vehicles.
          </span>
        </button>
        {actionButtons}
      </div>
    </li>
  )
}

export default UserListItem
