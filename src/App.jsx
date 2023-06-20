import { useCallback, useState } from 'react'
import './App.css'
import { Movies } from './components/Movies'
import { useMovies } from './hooks/useMovies'
import { useSearch } from './hooks/useSearch'
import debounce from 'just-debounce-it'

function App() {
  const [sort, setSort] = useState(false)
  const { search, updateSearch, error } = useSearch()
  const { movies, getMovies, loading } = useMovies({ search, sort })
  //const inputRef = useRef()

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedGetMovies = useCallback(
    debounce(search => {
      getMovies({ search })
    }, 500),
    [getMovies]
  )

  const handleSubmit = event => {
    event.preventDefault()
    // reference of element of DOM
    // console.log(inputRef.current.value)

    // access to form data using not controlled way
    // const data = new window.FormData(event.target)
    // const query = data.get('query')
    // const { query } = Object.fromEntries(new window.FormData(event.target))

    getMovies({ search })
  }

  const handleChange = event => {
    const newSearch = event.target.value
    updateSearch(newSearch)
    // getMovies({ search: newSearch })
    debouncedGetMovies(newSearch)
  }

  const handleSort = () => {
    setSort(!sort)
  }

  // just to understand the renders when using useMemo
  /* useEffect(() => {
    console.log('new getMovies received')
  }, [getMovies]) */

  return (
    <div className='page'>
      <header>
        <h1>Movie Finder</h1>
        <form className='form' onSubmit={handleSubmit}>
          <input
            //ref={inputRef}
            style={{
              border: '1px solid transparent',
              borderColor: error ? 'red' : 'transparent'
            }}
            name='query'
            value={search}
            placeholder='Avengers, Star Wars, The Matrix...'
            onChange={handleChange}
          />
          <input type='checkbox' onChange={handleSort} checked={sort} />
          <button type='submit'>Search</button>
        </form>
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </header>

      <main>{loading ? <p>loading...</p> : <Movies movies={movies} />}</main>
    </div>
  )
}

export default App
