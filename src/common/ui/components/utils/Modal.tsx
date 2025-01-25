import { cn } from '@/common/lib/utils'
import { useEffect, useId, useState } from 'react'
import ReactDOM from 'react-dom'

export type ModalWidth = 'max-w-lg' | 'max-w-md' | 'max-w-sm' | 'max-w-xl' | 'max-w-2xl' | 'max-w-3xl' | 'max-w-4xl' | 'max-w-5xl' | 'max-w-6xl' | 'max-w-7xl'

interface ModalProps {
  isOpen: boolean
  onClose?: () => void
  children?: React.ReactNode
  width?: ModalWidth
  onTop?: boolean
  className?: string
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children, onTop = false, className, width = 'max-w-lg' }) => {
  const id = useId()
  const [show, setShow] = useState(true)
  const [clickedInside, setClickedInside] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setShow(isOpen)
      document.body.style.overflow = isOpen ? 'hidden' : 'auto'
    }, isOpen ? 0 : 150)

    return () => clearTimeout(timer)
  }, [isOpen])

  const handleMouseDown = (event: React.MouseEvent) => {
    const { target, currentTarget } = event

    setClickedInside(target !== currentTarget)
  }

  const handleMouseUp = (event: React.MouseEvent) => {
    const { target, currentTarget, button } = event

    if (!clickedInside && target === currentTarget && button === 0) {
      onClose?.()
    }
  }

  return ReactDOM.createPortal(
    <div
      id={id}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      className={cn(
        'transition-all duration-150 ease-linear inset-0 flex',
        isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none',
        'fixed z-50 overflow-auto',
        'w-full',
        !onTop && 'items-center',
        'bg-black/15'
      )}
    >
      <div
        className={cn(
          'mx-auto w-full transform rounded-2xl bg-white p-5 text-left align-middle shadow-xl transition-all',
          width,
          className
        )}
      >
        {show && children}
      </div>
    </div>,
    document.body
  )
}

export default Modal
