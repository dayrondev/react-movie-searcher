import { useState, useEffect, useRef } from 'react'

export function useSearch() {
  const [search, updateSearch] = useState('')
  const [error, setError] = useState(null)
  const isFirstInput = useRef(true)

  useEffect(() => {
    if (isFirstInput.current) {
      isFirstInput.current = search === ''
      return
    }

    if (search === '') {
      setError('No text to search!')
      return
    }

    if (search.match(/^\d+$/)) {
      setError('The search cannot start with a number')
      return
    }

    if (search.length < 3) {
      setError('At least 3 characters')
      return
    }

    setError(null)
  }, [search])

  return { search, updateSearch, error }
}
