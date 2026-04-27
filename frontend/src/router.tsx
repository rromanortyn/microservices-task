import { Navigate, createBrowserRouter } from 'react-router-dom'

import AppShell from './components/app-shell'
import UsersPage from './features/users/users-page'
import VehiclesPage from './features/vehicles/vehicles-page'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Navigate replace to="/users" />,
  },
  {
    element: <AppShell />,
    children: [
      {
        path: '/users',
        element: <UsersPage />,
      },
      {
        path: '/users/:id',
        element: <UsersPage />,
      },
      {
        path: '/vehicles',
        element: <VehiclesPage />,
      },
      {
        path: '/vehicles/:id',
        element: <VehiclesPage />,
      },
    ],
  },
  {
    path: '*',
    element: <Navigate replace to="/users" />,
  },
])

export default router
