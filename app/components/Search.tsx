import { useLayoutEffect, useRef, useState } from 'react'
import { SearchResultItem } from './SearchResultItem'
import { WatchlistService } from '../services/watchlistService'
import { SearchItem } from '../types/SearchItem'

type SearchProps = {
  onSearchResultClick: (id: number) => void
}

export function Search({ onSearchResultClick }: SearchProps) {
  const searchInput = useRef('')
  const currentSearch = useRef('')
  const currentPage = useRef(1)
  const totalPages = useRef(0)
  const isLoading = useRef(false)
  const [searchResults, setSearchResults] = useState<SearchItem[]>([])
  const service = WatchlistService.GetBrowserInstance()
  const [size, setSize] = useState([0, 0])

  useLayoutEffect(() => {
    function updateSize() {
      setSize([window.innerWidth, window.innerHeight])
    }
    window.addEventListener('resize', updateSize)
    updateSize()
    return () => window.removeEventListener('resize', updateSize)
  }, [])

  async function search() {
    const searchQuery = searchInput.current
    if (searchQuery.length > 0 && !isLoading.current) {
      isLoading.current = true
      document.getElementById('searchResults')?.scrollTo(0, 0)
      currentSearch.current = searchQuery
      currentPage.current = 1
      const page = await service.search(searchQuery, currentPage.current)
      if (page) {
        totalPages.current = page.totalPages
        setSearchResults(page.results)
      }
      isLoading.current = false
      console.log(isLoading.current)
    }
  }

  async function loadMore() {
    const searchQuery = currentSearch.current
    if (
      currentPage.current < totalPages.current &&
      searchQuery &&
      !isLoading.current
    ) {
      isLoading.current = true
      currentPage.current++
      const page = await service.search(searchQuery, currentPage.current)
      setSearchResults(searchResults.concat(page.results))
      isLoading.current = false
    }
  }

  function handleSearchResultClick(event: React.MouseEvent) {
    const searchItem = searchResults.find((item) => item.id.toString() === event.currentTarget.id)
    if (searchItem) {
      onSearchResultClick(searchItem.id)
    }
  }

  let searchResultHeight = size[1] - 200

  return (
    <div className="flex-auto flex-col">
      <input
        type="text"
        className="border border-slate-300 bg-transparent rounded px-2 py-1 outline-none focus-within:border-slate-100"
        placeholder="Search movies..."
        onChange={(e) => {
          searchInput.current = e.target.value
        }}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            search()
          }
        }}
      />
      <div
        id="searchResults"
        className="overflow-y-scroll"
        style={{ height: `${searchResultHeight}px` }}
        onScroll={(event) => {
          const element = event.target as HTMLElement
          if (element.scrollTop + searchResultHeight === element.scrollHeight) {
            loadMore()
          }
        }}
      >
        {searchResults.map(searchResult => (
          <SearchResultItem key={searchResult.id} {...searchResult} onClick={handleSearchResultClick}/>
        ))}
      </div>
    </div>
  )
}
