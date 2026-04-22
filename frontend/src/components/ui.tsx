import clsx from 'clsx'
import {
  type ButtonHTMLAttributes,
  type ComponentPropsWithoutRef,
  type ReactNode,
  useEffect,
  useEffectEvent,
} from 'react'
import { createPortal } from 'react-dom'

import { CloseIcon } from './icons'

export type NoticeTone = 'error' | 'info' | 'success'

type ButtonTone = 'danger' | 'ghost' | 'primary' | 'secondary'

const buttonToneClasses: Record<ButtonTone, string> = {
  primary:
    'bg-primary-500 text-white shadow-glow hover:bg-primary-600 focus-visible:ring-primary-200',
  secondary:
    'bg-ink-950 text-white hover:bg-ink-800 focus-visible:ring-ink-200',
  ghost:
    'bg-white text-ink-700 ring-1 ring-ink-200 hover:bg-sand-50 focus-visible:ring-primary-200',
  danger:
    'bg-danger-500 text-white hover:bg-[#961811] focus-visible:ring-danger-100',
}

const noticeToneClasses: Record<NoticeTone, string> = {
  success: 'border-success-200 bg-success-100 text-success-600',
  error: 'border-danger-200 bg-danger-100 text-danger-500',
  info: 'border-sand-200 bg-sand-100 text-ink-600',
}

export const fieldClassName =
  'w-full rounded-2xl border border-ink-200 bg-white px-4 py-3 text-sm text-ink-950 outline-none transition duration-200 placeholder:text-ink-300 focus:border-primary-400 focus:ring-4 focus:ring-primary-100/70 disabled:cursor-not-allowed disabled:bg-sand-100 disabled:text-ink-400'

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  tone?: ButtonTone
}

export function Button({
  children,
  className,
  tone = 'primary',
  type = 'button',
  ...props
}: ButtonProps) {
  const buttonClassName = clsx(
    'inline-flex items-center justify-center gap-2 rounded-pill px-5 py-3 text-sm font-bold transition duration-200 focus-visible:outline-none focus-visible:ring-4 disabled:cursor-not-allowed disabled:opacity-55',
    buttonToneClasses[tone],
    className,
  )

  return (
    <button
      className={buttonClassName}
      type={type}
      {...props}
    >
      {children}
    </button>
  )
}

type IconButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  label: string
  tone?: ButtonTone
}

export function IconButton({
  className,
  children,
  label,
  tone = 'ghost',
  type = 'button',
  ...props
}: IconButtonProps) {
  const iconButtonClassName = clsx(
    'inline-flex size-10 items-center justify-center rounded-full transition duration-200 focus-visible:outline-none focus-visible:ring-4 disabled:cursor-not-allowed disabled:opacity-55',
    buttonToneClasses[tone],
    className,
  )

  return (
    <button
      aria-label={label}
      className={iconButtonClassName}
      title={label}
      type={type}
      {...props}
    >
      {children}
    </button>
  )
}

type PanelProps = ComponentPropsWithoutRef<'section'> & {
  subtitle?: string
  title?: string
}

export function Panel({
  children,
  className,
  subtitle,
  title,
  ...props
}: PanelProps) {
  const titleElement = title
    ? <h2 className="text-xl font-black text-ink-950 sm:text-2xl">{title}</h2>
    : null

  const subtitleElement = subtitle
    ? <p className="mt-2 text-sm/7 text-ink-500 sm:text-base/7">{subtitle}</p>
    : null

  const panelHeader = titleElement || subtitleElement
    ? (
        <div className="mb-6">
          {titleElement}
          {subtitleElement}
        </div>
      )
    : null

  const panelClassName = clsx(
    'rounded-panel border border-white/80 bg-white/86 p-6 shadow-soft backdrop-blur sm:p-7',
    className,
  )

  return (
    <section
      className={panelClassName}
      {...props}
    >
      {panelHeader}
      {children}
    </section>
  )
}

type FieldProps = {
  children: ReactNode
  hint?: string
  label: string
}

export function Field({ children, hint, label }: FieldProps) {
  const hintElement = hint
    ? (
        <span className="text-xs font-medium uppercase tracking-[0.18em] text-ink-400">
          {hint}
        </span>
      )
    : null

  return (
    <label className="flex flex-col gap-2 text-sm font-bold text-ink-700">
      <span className="flex items-center justify-between gap-3">
        <span>{label}</span>
        {hintElement}
      </span>
      {children}
    </label>
  )
}

export function FieldErrorMessage({ message }: { message?: string }) {
  const errorMessageElement = message
    ? <p className="text-sm font-medium text-danger-500">{message}</p>
    : null

  return errorMessageElement
}

type NoticeProps = {
  children: ReactNode
  tone?: NoticeTone
}

export function Notice({ children, tone = 'info' }: NoticeProps) {
  const noticeClassName = clsx(
    'rounded-3xl border px-4 py-3 text-sm/6',
    noticeToneClasses[tone],
  )

  return (
    <div className={noticeClassName}>
      {children}
    </div>
  )
}

type EmptyStateProps = {
  action?: ReactNode
  description: string
  title: string
}

export function EmptyState({ action, description, title }: EmptyStateProps) {
  const actionElement = action
    ? <div className="mt-5 flex justify-center">{action}</div>
    : null

  return (
    <div className="rounded-panel border border-dashed border-ink-200 bg-sand-50/75 px-6 py-10 text-center">
      <p className="text-lg font-black text-ink-900">{title}</p>
      <p className="mt-2 text-sm/7 text-ink-500">{description}</p>
      {actionElement}
    </div>
  )
}

export function LoadingState({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-3 rounded-3xl border border-sand-200 bg-sand-50 px-4 py-3 text-sm text-ink-500">
      <span className="size-2 animate-pulse rounded-full bg-primary-500" />
      <span>{label}</span>
    </div>
  )
}

type ModalProps = {
  ariaLabel: string
  children: ReactNode
  isOpen: boolean
  onClose: () => void
}

export function Modal({
  ariaLabel,
  children,
  isOpen,
  onClose,
}: ModalProps) {
  const onEscape = useEffectEvent((event: KeyboardEvent) => {
    if (event.key === 'Escape') {
      onClose()
    }
  })

  useEffect(() => {
    if (!isOpen) {
      return undefined
    }

    const previousOverflow = document.body.style.overflow

    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onEscape)

    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', onEscape)
    }
  }, [isOpen])

  if (!isOpen) {
    return null
  }

  const closeButton = (
    <IconButton label="Close modal" onClick={onClose}>
      <CloseIcon className="size-4" />
    </IconButton>
  )

  const modalChrome = (
    <div className="relative z-10 flex max-h-[88vh] w-full max-w-3xl flex-col overflow-hidden rounded-[2rem] border border-white/85 bg-white shadow-[0_30px_90px_rgba(18,15,13,0.22)]">
      <div className="flex justify-end px-5 py-5 sm:px-6">
        {closeButton}
      </div>

      <div className="overflow-y-auto px-6 pb-6 pt-0 sm:px-7 sm:pb-7">{children}</div>
    </div>
  )

  return createPortal(
    <div
      aria-label={ariaLabel}
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-end justify-center bg-ink-950/40 px-4 py-6 backdrop-blur-sm sm:items-center"
      role="dialog"
    >
      <button
        aria-label="Close modal"
        className="absolute inset-0 cursor-default"
        onClick={onClose}
        type="button"
      />
      {modalChrome}
    </div>,
    document.body,
  )
}
