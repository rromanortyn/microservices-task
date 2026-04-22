import type { ReactNode } from 'react'

import type { User } from '../../types/entities'
import { EmptyState, LoadingState, Panel } from '../ui'
import UserListItem from './user-list-item'

type UsersListPanelProps = {
  errorElement: ReactNode
  isLoading: boolean
  onDelete: (id: number) => void
  onOpen: (id: number) => void
  users: User[]
}

function UsersListPanel({
  errorElement,
  isLoading,
  onDelete,
  onOpen,
  users,
}: UsersListPanelProps) {
  const userListItems = users.map((user) => (
    <UserListItem
      key={user.id}
      onDelete={onDelete}
      onOpen={onOpen}
      user={user}
    />
  ))

  const usersList = <ul className="space-y-3">{userListItems}</ul>

  const usersListContent = isLoading
    ? <LoadingState label="Loading users and vehicles..." />
    : users.length === 0
      ? (
          <EmptyState
            description="Create the first user to begin populating the dashboard."
            title="No users yet"
          />
        )
      : usersList

  return (
    <Panel
      subtitle="Open any record in a route-driven modal for the full get-by-id, update, and delete flow."
      title={`Users (${users.length})`}
    >
      <div className="space-y-4">
        {errorElement}
        {usersListContent}
      </div>
    </Panel>
  )
}

export default UsersListPanel
