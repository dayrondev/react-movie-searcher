import { useRef, useState, useMemo, useCallback } from 'react'
import { searchMovies } from '../services/movies'
//import withResults from '../mocks/with-results.json'
//import withoutResults from '../mocks/no-results.json'

export function useMovies({ search, sort }) {
  const [movies, setMovies] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const previousSearch = useRef(search)

  // lets you cache a function definition between re-renders
  const getMovies = useCallback(async ({ search }) => {
    if (search === previousSearch.current) return

    setLoading(true)
    setError(null)
    previousSearch.current = search
    try {
      const newMovies = await searchMovies({ search })
      setMovies(newMovies)
    } catch (e) {
      setError(e.message)
    } finally {
      // always executed after try and catch
      setLoading(false)
    }
  }, [])

  // lets you cache the result of a calculation between re-renders
  const sortedMovies = useMemo(() => {
    return sort
      ? [...movies].sort((a, b) => a.title.localeCompare(b.title))
      : movies
  }, [sort, movies])

  return { movies: sortedMovies, getMovies, loading, error }
}
