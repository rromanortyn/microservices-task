import { Outlet } from 'react-router-dom'

import NavigationTabs from './navigation-tabs'

function AppShell() {
  const navigationTabs = <NavigationTabs />

  return (
    <div className="relative min-h-screen overflow-hidden">
      <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[24rem] bg-[radial-gradient(circle_at_top_left,_rgba(248,82,28,0.22),_transparent_38%),radial-gradient(circle_at_top_right,_rgba(255,209,150,0.45),_transparent_34%),linear-gradient(180deg,_#fffaf6_0%,_#fff4eb_42%,_#fffdf9_100%)]" />
      <div className="pointer-events-none absolute inset-y-32 right-[-8rem] -z-10 h-80 w-80 rounded-full bg-primary-200/35 blur-3xl" />
      <div className="pointer-events-none absolute bottom-16 left-[-7rem] -z-10 h-72 w-72 rounded-full bg-sand-200/75 blur-3xl" />

      <div className="mx-auto flex min-h-screen w-full max-w-7xl flex-col px-4 py-4 sm:px-6 lg:px-8">
        <header className="flex justify-center py-4">
          {navigationTabs}
        </header>

        <main className="flex-1 py-4">
          <Outlet />
        </main>
      </div>
    </div>
  )
}

export default AppShell
