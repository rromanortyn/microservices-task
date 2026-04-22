import type { SVGProps } from 'react'

type IconProps = SVGProps<SVGSVGElement>

function iconDefaults(props: IconProps) {
  return {
    fill: 'none',
    stroke: 'currentColor',
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
    strokeWidth: 1.8,
    viewBox: '0 0 24 24',
    ...props,
  }
}

export function PencilIcon(props: IconProps) {
  return (
    <svg {...iconDefaults(props)}>
      <path d="M4 20h4l10.5-10.5a2.1 2.1 0 0 0-4-1L4 19.9V20Z" />
      <path d="m13.5 5.5 5 5" />
    </svg>
  )
}

export function TrashIcon(props: IconProps) {
  return (
    <svg {...iconDefaults(props)}>
      <path d="M4 7h16" />
      <path d="M9 7V4.8A.8.8 0 0 1 9.8 4h4.4a.8.8 0 0 1 .8.8V7" />
      <path d="M18 7v11.2a1.8 1.8 0 0 1-1.8 1.8H7.8A1.8 1.8 0 0 1 6 18.2V7" />
      <path d="M10 11.2v5.3" />
      <path d="M14 11.2v5.3" />
    </svg>
  )
}

export function EyeIcon(props: IconProps) {
  return (
    <svg {...iconDefaults(props)}>
      <path d="M1.5 12s3.8-6.5 10.5-6.5S22.5 12 22.5 12 18.7 18.5 12 18.5 1.5 12 1.5 12Z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  )
}

export function CloseIcon(props: IconProps) {
  return (
    <svg {...iconDefaults(props)}>
      <path d="m6 6 12 12" />
      <path d="M18 6 6 18" />
    </svg>
  )
}

export function PlusIcon(props: IconProps) {
  return (
    <svg {...iconDefaults(props)}>
      <path d="M12 5v14" />
      <path d="M5 12h14" />
    </svg>
  )
}

export function ArrowOutIcon(props: IconProps) {
  return (
    <svg {...iconDefaults(props)}>
      <path d="M8 16 16 8" />
      <path d="M9 8h7v7" />
      <path d="M6 10v8h8" />
    </svg>
  )
}
