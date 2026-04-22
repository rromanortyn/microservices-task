import { zodResolver } from '@hookform/resolvers/zod'
import { startTransition, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate, useParams } from 'react-router-dom'

import UserCreatePanel from '../../components/users/user-create-panel'
import UserDetailsModal from '../../components/users/user-details-modal'
import UsersListPanel from '../../components/users/users-list-panel'
import { LoadingState, Notice } from '../../components/ui'
import { parsePositiveIntegerId } from '../../lib/route-params'
import {
  getErrorMessage,
  loadDashboardSnapshot,
  usersApi,
  vehiclesApi,
} from '../../lib/api'
import type { User, Vehicle } from '../../types/entities'
import {
  EMPTY_USER_FORM_VALUES,
  type UserFormValues,
  userFormSchema,
} from './user-form-schema'

function UsersPage() {
  const navigate = useNavigate()
  const params = useParams()
  const selectedUserId = parsePositiveIntegerId(params.id)

  const [users, setUsers] = useState<User[]>([])
  const [vehicles, setVehicles] = useState<Vehicle[]>([])
  const [pageError, setPageError] = useState<string | null>(null)
  const [pageNotice, setPageNotice] = useState<string | null>(null)
  const [isPageLoading, setIsPageLoading] = useState(true)
  const [createSubmitError, setCreateSubmitError] = useState<string | null>(null)

  const [selectedUser, setSelectedUser] = useState<User | null>(null)
  const [modalError, setModalError] = useState<string | null>(null)
  const [modalNotice, setModalNotice] = useState<string | null>(null)
  const [isModalLoading, setIsModalLoading] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)

  const {
    register: registerCreate,
    handleSubmit: handleCreateSubmit,
    reset: resetCreateForm,
    formState: {
      errors: createFieldErrors,
      isSubmitting: isCreating,
    },
  } = useForm<UserFormValues>({
    defaultValues: EMPTY_USER_FORM_VALUES,
    resolver: zodResolver(userFormSchema),
  })

  const {
    register: registerModal,
    handleSubmit: handleModalSubmit,
    reset: resetModalForm,
    formState: {
      errors: modalFieldErrors,
      isSubmitting: isUpdating,
    },
  } = useForm<UserFormValues>({
    defaultValues: EMPTY_USER_FORM_VALUES,
    resolver: zodResolver(userFormSchema),
  })

  useEffect(() => {
    let isActive = true

    async function loadPage() {
      setIsPageLoading(true)
      setPageError(null)

      try {
        const snapshot = await loadDashboardSnapshot()

        if (!isActive) {
          return
        }

        setUsers(snapshot.users)
        setVehicles(snapshot.vehicles)
      }

      catch (error) {
        if (!isActive) {
          return
        }

        setPageError(getErrorMessage(error, 'Failed to load users.'))
      }

      finally {
        if (isActive) {
          setIsPageLoading(false)
        }
      }
    }

    void loadPage()

    return () => {
      isActive = false
    }
  }, [])

  useEffect(() => {
    if (params.id && selectedUserId === null) {
      navigate('/users', { replace: true })
    }
  }, [navigate, params.id, selectedUserId])

  useEffect(() => {
    if (selectedUserId === null) {
      setSelectedUser(null)
      setModalError(null)
      setModalNotice(null)
      resetModalForm(EMPTY_USER_FORM_VALUES)

      return
    }

    let isActive = true
    const userId = selectedUserId

    async function loadSelectedUser() {
      setIsModalLoading(true)
      setModalError(null)

      try {
        const [user, latestVehicles] = await Promise.all([
          usersApi.getById(userId),
          vehiclesApi.list(),
        ])

        if (!isActive) {
          return
        }

        setSelectedUser(user)
        setVehicles(latestVehicles)
        resetModalForm({
          email: user.email,
          password: '',
        })
      }

      catch (error) {
        if (!isActive) {
          return
        }

        setModalError(getErrorMessage(error, 'Failed to load this user.'))
      }

      finally {
        if (isActive) {
          setIsModalLoading(false)
        }
      }
    }

    void loadSelectedUser()

    return () => {
      isActive = false
    }
  }, [resetModalForm, selectedUserId])

  const selectedVehicles = vehicles.filter((vehicle) => vehicle.userId === selectedUser?.id)

  async function refreshSnapshot() {
    const snapshot = await loadDashboardSnapshot()

    setUsers(snapshot.users)
    setVehicles(snapshot.vehicles)
  }

  const onCreateUser = handleCreateSubmit(async (values) => {
    setCreateSubmitError(null)
    setPageNotice(null)

    try {
      await usersApi.create(values)
      resetCreateForm(EMPTY_USER_FORM_VALUES)
      setPageNotice('User created successfully.')
      await refreshSnapshot()
    }

    catch (error) {
      setCreateSubmitError(getErrorMessage(error, 'Failed to create user.'))
    }
  })

  const onUpdateUser = handleModalSubmit(async (values) => {
    if (!selectedUser) {
      return
    }

    setModalError(null)
    setModalNotice(null)

    try {
      const updatedUser = await usersApi.update(selectedUser.id, values)

      setSelectedUser(updatedUser)
      resetModalForm({
        email: updatedUser.email,
        password: '',
      })
      setModalNotice('User updated successfully.')
      await refreshSnapshot()
    }

    catch (error) {
      setModalError(getErrorMessage(error, 'Failed to update user.'))
    }
  })

  function openUserModal(id: number) {
    startTransition(() => {
      navigate(`/users/${id}`)
    })
  }

  function closeUserModal() {
    startTransition(() => {
      navigate('/users')
    })
  }

  function openVehicleModal(id: number) {
    startTransition(() => {
      navigate(`/vehicles/${id}`)
    })
  }

  async function deleteUser(userId: number, origin: 'list' | 'modal') {
    const confirmed = window.confirm('Delete this user?')

    if (!confirmed) {
      return
    }

    if (origin === 'modal') {
      setIsDeleting(true)
      setModalError(null)
    }

    else {
      setPageError(null)
      setPageNotice(null)
    }

    try {
      await usersApi.remove(userId)
      await refreshSnapshot()

      if (origin === 'modal') {
        closeUserModal()
      }

      setPageNotice('User deleted successfully.')
    }

    catch (error) {
      const message = getErrorMessage(error, 'Failed to delete user.')

      if (origin === 'modal') {
        setModalError(message)
      }

      else {
        setPageError(message)
      }
    }

    finally {
      if (origin === 'modal') {
        setIsDeleting(false)
      }
    }
  }

  const pageErrorElement = pageError ? <Notice tone="error">{pageError}</Notice> : null
  const pageNoticeElement = pageNotice ? <Notice tone="success">{pageNotice}</Notice> : null
  const createErrorElement = createSubmitError ? <Notice tone="error">{createSubmitError}</Notice> : null
  const modalErrorElement = modalError ? <Notice tone="error">{modalError}</Notice> : null
  const modalNoticeElement = modalNotice ? <Notice tone="success">{modalNotice}</Notice> : null
  const modalLoadingElement = isModalLoading ? <LoadingState label="Loading user details..." /> : null

  const createPanel = (
    <UserCreatePanel
      createErrorElement={createErrorElement}
      errors={createFieldErrors}
      isCreating={isCreating}
      noticeElement={pageNoticeElement}
      onSubmit={onCreateUser}
      register={registerCreate}
    />
  )

  const listPanel = (
    <UsersListPanel
      errorElement={pageErrorElement}
      isLoading={isPageLoading}
      onDelete={(id) => {
        void deleteUser(id, 'list')
      }}
      onOpen={openUserModal}
      users={users}
    />
  )

  const pageGrid = (
    <div className="grid gap-6 xl:grid-cols-[minmax(0,24rem)_minmax(0,1fr)]">
      {createPanel}
      {listPanel}
    </div>
  )

  const userDetailsModal = (
    <UserDetailsModal
      errorElement={modalErrorElement}
      errors={modalFieldErrors}
      isDeleting={isDeleting}
      isLoading={isModalLoading}
      isOpen={selectedUserId !== null}
      isUpdating={isUpdating}
      loadingElement={modalLoadingElement}
      noticeElement={modalNoticeElement}
      onClose={closeUserModal}
      onDelete={(id) => {
        void deleteUser(id, 'modal')
      }}
      onOpenVehicle={openVehicleModal}
      onSubmit={onUpdateUser}
      register={registerModal}
      selectedUser={selectedUser}
      selectedVehicles={selectedVehicles}
    />
  )

  return (
    <>
      {pageGrid}
      {userDetailsModal}
    </>
  )
}

export default UsersPage
