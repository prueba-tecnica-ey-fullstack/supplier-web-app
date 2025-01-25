import { useEffect, useRef, useState } from 'react'

export type InputType = 'text' | 'password' | 'number' | 'date' | 'email' | 'tel' | 'time' | 'url'
export type InputValidationType = 'regex' | 'function'

export type InputValidation = {
  type: 'regex'
  message: string
  regex: RegExp
} |
{
  type: 'function'
  message: string
  validate: (value: string) => boolean
}

interface InputProps extends React.HTMLProps<HTMLInputElement> {
  label: string
  name: string
  type: InputType
  value?: string
  placeholder?: string
  validations?: InputValidation[]
}

export const Input: React.FC<InputProps> = ({
  className,
  label,
  name,
  type,
  placeholder,
  disabled = false,
  required = true,
  validations = [],
  value = '',
  onChange = () => { },
  ...props
}) => {
  const [error, setError] = useState<string | null>(null)

  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (value && inputRef.current) {
      inputRef.current.value = value
    }
  }, [inputRef, value])

  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target

    const valueTrim = value.trim()
    onChange(event)

    const validation = validations.find((validation) => {
      return !(validation.type === 'regex'
        ? validation.regex.test(valueTrim)
        : validation.validate(valueTrim))
    })

    if (validation) {
      setError(validation.message)
      return
    }

    inputRef.current?.classList.remove('input-error')

    setError(null)
  }

  return (
    <label htmlFor={name} className={className}>
      <span className='block mb-1'>{label} {!required && <span className='text-red-600'>(opcional)</span>}</span>

      <input
        ref={inputRef}
        className='block w-full h-10 px-2 border border-gray-300 rounded-md border-solid outline-none focus:shadow-blue focus:shadow-input-focus disabled:bg-gray-200 disabled:text-gray-500'
        id={name}
        name={name}
        type={type}
        disabled={disabled}
        required={required}
        placeholder={placeholder}
        onChange={handleOnChange}
        min={1} step={0.01}
        {...props}
      />
      {error && <p className='block text-red-600 text-sm font-semibold m-0 error'>{error}</p>}
    </label>
  )
}

export default Input
