import { useState } from 'react'

export const useBooleanState = (initialState = false): [
  boolean,
  () => void,
  React.Dispatch<React.SetStateAction<boolean>>
] => {
  const [state, setState] = useState(initialState)

  const toggle = () => setState((prevState) => !prevState)

  return [
    state,
    toggle,
    setState
  ]
}
