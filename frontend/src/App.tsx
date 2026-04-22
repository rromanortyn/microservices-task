import { RouterProvider } from 'react-router-dom'

import router from './app/router'

function App() {
  const routerProvider = <RouterProvider router={router} />

  return routerProvider
}

export default App
