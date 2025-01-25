import { cn } from '@/common/lib/utils'
import React from 'react'

type ButtonType = 'button' | 'submit' | 'reset' | undefined
export type ButtonColor = 'primary' | 'secondary' | 'success' | 'danger'
type ButtonSize = 'xs' | 'sm' | 'base' | 'lg' | 'xl'

interface ButtonProps extends Omit<React.HTMLProps<HTMLButtonElement>, 'size'> {
  color: ButtonColor
  type?: ButtonType
  disabled?: boolean
  size?: ButtonSize
}

const padding: Record<ButtonSize, string> = {
  xs: 'px-6 py-1',
  sm: 'px-6 py-1',
  base: 'px-7 py-2',
  lg: 'px-8 py-3',
  xl: 'px-9 py-4'
}

type StringBG = `bg-${string}`

const colors: Record<ButtonColor, StringBG> = {
  'primary': 'bg-primary',
  'secondary': 'bg-secondary',
  'danger': 'bg-danger',
  'success': 'bg-success'
}

export const Button: React.FC<ButtonProps> = ({
  children,
  color,
  onClick,
  disabled = false,
  type = 'button',
  className = '',
  size = 'xs',
  ...props
}) => {

  return (
    <button
      {...props}
      className={cn(
        'rounded-md relative transition-colors duration-300 uppercase',
        `text-white ${colors[color]} hover:brightness-90 hover:cursor-pointer`,
        disabled && 'opacity-85',
        padding[size],
        `text-${size}`,
        className
      )}
      onClick={onClick}
      disabled={disabled}
      type={type}
    >
      {children}
    </button>
  )
}

export default Button
