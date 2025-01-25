import React, { useEffect, type ChangeEvent, type ReactElement, useState, useMemo, useRef } from 'react'
import { cn } from '@/common/lib/utils'
import { IconProps } from '@/common/lib/types'

export const ArrowDown: React.FC<IconProps> = ({ className, onClick }) => {
  return (
    <svg
      className={className}
      onClick={onClick}
      xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth='1.5' stroke='currentColor'
    >
      <path strokeLinecap='round' strokeLinejoin='round' d='M19.5 8.25l-7.5 7.5-7.5-7.5' />
    </svg>
  )
}

export const ArrowUp: React.FC<IconProps> = ({ className, onClick }) => {
  return (
    <svg
      className={className}
      onClick={onClick}
      xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth={1.5} stroke='currentColor'
    >
      <path strokeLinecap='round' strokeLinejoin='round' d='M4.5 15.75l7.5-7.5 7.5 7.5' />
    </svg>
  )
}

interface SelectInputProps<T> {
  value?: string
  name: string
  label: string
  objects: T[]

  onChange?: (value: string) => void

  valueKey?: keyof T
  optionKey?: keyof T

  disabled?: boolean
  className?: string
  searchable?: boolean

  children?: React.ReactNode
  labelClassName?: string
}

export const SelectInput = <T, >({
  value: initialValue = '',
  name,
  label,
  objects,
  valueKey,
  optionKey,
  disabled = false,
  className = '',
  searchable = false,
  children,
  labelClassName = '',
  onChange = () => { }
}: SelectInputProps<T>): ReactElement => {
  const [value, setValue] = useState<string>(initialValue)
  const [searchItem, setSearchItem] = useState('')
  const [showOptions, setShowOptions] = useState<boolean>(false)
  const selectRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const inputValueRef = useRef<HTMLInputElement>(null)
  const selectedOptionRef = useRef<HTMLParagraphElement>(null)

  useEffect(() => {
    if (objects.length === 0) return

    if (initialValue !== '') {
      setValue(String(initialValue))
      return
    }

    const aux = valueKey ? objects[0][valueKey] : objects[0]
    setValue(String(aux))
  }, [objects, initialValue, valueKey])

  const handleOptionClick = (): void => {
    if (disabled) return

    setShowOptions(!showOptions)
  }

  useEffect(() => {
    inputRef.current?.focus()
  }, [showOptions])

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setSearchItem(event.target.value)
  }

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent): void => {
      if (
        selectRef.current &&
        !selectRef.current.contains(event.target as Node)
      ) {
        setShowOptions(false)
      }
    }

    window.addEventListener('click', handleOutsideClick)

    return () => {
      window.removeEventListener('click', handleOutsideClick)
    }
  }, [])

  useEffect(() => {
    if (showOptions && selectedOptionRef.current) {
      selectedOptionRef.current.scrollIntoView({ block: 'nearest', behavior: 'smooth' })
    }
  }, [showOptions])

  useEffect(() => {
    if (inputValueRef === null || inputValueRef.current === null) return
    inputValueRef.current.value = value
    inputValueRef.current.dispatchEvent(new Event('change', { bubbles: true }))
  }, [value])

  const isObject = (() => {
    if (objects.length === 0) return false

    return typeof objects[0] === 'object'
  })()

  const filteredOptions = useMemo(() => {
    return objects.filter((object) => {
      const option = isObject && object && optionKey ? object[optionKey] : object

      return String(option).toLowerCase().includes(searchItem.toLowerCase())
    })
  }, [objects, searchItem, isObject, optionKey])

  const selectedOption: string | null = useMemo(() => {
    const object = objects.find((object) => {
      const objectValue = isObject && object && valueKey ? object[valueKey] : object

      return String(objectValue) === value
    })

    if (object === undefined) return null

    return isObject && object && optionKey ? String(object[optionKey]) : String(object)
  }, [objects, value, isObject, optionKey, valueKey])

  const highlightSearchTerm = (label: string): React.ReactNode => {
    if (searchItem.trim() === '') {
      return label
    }

    const regex = new RegExp(`(${searchItem.toLowerCase()})`, 'gi')
    const parts = label.split(regex)

    return (
      <span>
        {parts.map((part, index) =>
          regex.test(part)
            ? (
              <strong key={index}>{part}</strong>
              )
            : (
              <span key={index}>{part}</span>
              )
        )}
      </span>
    )
  }

  return (
    <div className={className} ref={selectRef}>
      <label className={cn('block mb-1', labelClassName)} htmlFor={name}>
        {label}
        {children}
      </label>
      <div
        id='select-input'
        onClick={handleOptionClick}
        className={`w-full h-10 px-2 border border-gray-300 border-solid flex flex-col  justify-center ${selectedOption == null ? 'text-blue' : ''} ${showOptions ? 'rounded-tl-md rounded-tr-md' : 'rounded-md '} ${disabled ? 'cursor-not-allowed bg-gray-200 text-gray-500' : 'cursor-pointer'}`}
      >

        <div className='flex justify-between items-center'>
          {
            selectedOption
              ? (
                <p>{selectedOption}</p>
                )
              : (
                <p className='text-[#0E82F5]'>--- seleccione ----</p>
                )
          }
          <ArrowUp className={`w-6 h-6 ${!showOptions ? 'hidden' : ''}`} />
          <ArrowDown className={`w-6 h-6 ${showOptions ? 'hidden' : ''}`} />

          <input type='text' readOnly className='hidden' value={value} name={name} />
        </div>
      </div>
      <div className='relative'>
        {
          showOptions && (
            <div className='absolute z-10 w-full bg-white border border-gray-400 max-h-36 overflow-y-auto max-w-full overflow-x-hidden rounded-br-md rounded-bl-md'>
              {
                searchable && (
                  <input
                    ref={inputRef}
                    type='text'
                    className='w-full text-gray-600 py-1 pr-10 pl-3 focus:outline-none border-b-[1px] border-gray-300'
                    placeholder='Search...'
                    value={searchItem}
                    onChange={handleInputChange}
                  />
                )
              }
              {
                ...filteredOptions.map((object) => {
                  const isObject = typeof object === 'object'
                  const objectValue = isObject && object && valueKey ? object[valueKey] : object
                  const option = isObject && object && optionKey ? object[optionKey] : object

                  const selected = String(value) === String(objectValue)

                  return (
                    <p
                      key={String(objectValue)}
                      ref={selected ? selectedOptionRef : null}
                      className={`block w-full px-2 py-1 cursor-pointer ${selected ? 'bg-primary text-white' : 'hover:bg-gray-200'}`}
                      onClick={() => {
                        setValue(String(objectValue))
                        onChange(String(objectValue))
                        setSearchItem('')
                        setShowOptions(false)
                      }}
                    >{highlightSearchTerm(String(option))}
                    </p>
                  )
                })
              }
            </div>
          )
        }
      </div>

    </div>

  )
}

export default SelectInput
