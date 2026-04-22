import clsx from 'clsx'
import { NavLink } from 'react-router-dom'

const navigationItems = [
  { label: 'Users', to: '/users' },
  { label: 'Vehicles', to: '/vehicles' },
]

function NavigationTabLink({ label, to }: { label: string; to: string }) {
  const getClassName = ({ isActive }: { isActive: boolean }) => {
    const activeClassName = isActive
      ? 'bg-primary-500 text-white shadow-glow'
      : 'text-ink-500 hover:bg-sand-50 hover:text-ink-800'

    return clsx(
      'flex-1 rounded-pill px-4 py-3 text-center text-sm font-bold transition duration-200',
      activeClassName,
    )
  }

  return (
    <NavLink className={getClassName} to={to}>
      {label}
    </NavLink>
  )
}

function NavigationTabs() {
  const tabLinks = navigationItems.map((item) => (
    <NavigationTabLink
      key={item.to}
      label={item.label}
      to={item.to}
    />
  ))

  return (
    <nav
      aria-label="Primary"
      className="flex w-full max-w-md items-center gap-2 rounded-pill border border-white/85 bg-white/88 p-2 shadow-soft backdrop-blur"
    >
      {tabLinks}
    </nav>
  )
}

export default NavigationTabs
