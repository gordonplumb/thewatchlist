'use client'
import Link from 'next/link'
import React, { useState } from 'react'
import testSearchResults from '../data/searchResults.json'
import { MovieDetails } from '../types/MovieDetails'
import { SearchResultItem } from '../components/SearchResultItem'
import { TagList } from '../components/TagList'
import { MovieCredits } from '../types/MovieCredits'
import { CreditItem } from '../components/CreditItem'

const testGenres = ['Genre1', 'Genre2', 'Genre3']
const testMovieCredits = {
  cast: [
    { name: 'Cast Member1', character: 'Main Character' },
    { name: 'Another Actor', character: 'The Antagonist' },
    { name: 'Someone Else', character: 'Another Character' }
  ],
  crew: [
    { name: 'Director Person', job: 'Director' },
    { name: 'The Writer', job: 'Writer' }
  ]
}

export default function Page() {
  const [searchInput, setSearchInput] = useState('')
  const [searchResults, setSearchResults] = useState<MovieDetails[]>([])
  const [selectedItem, setSelectedItem] = useState<MovieDetails>()
  const [movieCredits, setMovieCredits] = useState<MovieCredits>()
  const [tags, setTags] = useState<string[]>(testGenres)

  let currentTags = tags

  function search() {
    if (searchInput.length > 0) {
      setSearchResults(testSearchResults)
    }
  }
  function handleSearchResultClick(event: React.MouseEvent) {
    // TODO: make api call to get movie details/credits
    setSelectedItem(searchResults.find((item) => item.id === event.currentTarget.id))
    setMovieCredits(testMovieCredits)
  }

  function onAddCreditAsTag(name: string) {
    if (!currentTags.includes(name)) {
      currentTags = [...currentTags, name]
      setTags(currentTags)
    }
  }

  function renderMovieCredits() {
    if (!movieCredits) {
      return null
    }

    return <div>
      <div className="flex">
        {movieCredits.cast.map(castMember => (
          <CreditItem
            key={castMember.name}
            name={castMember.name}
            detail={castMember.character}
            onAdd={onAddCreditAsTag}
          />
        ))}
      </div>
      <div className="flex">
        {movieCredits.crew.map(crewMember => (
          <CreditItem
            key={crewMember.name}
            name={crewMember.name}
            detail={crewMember.job}
            onAdd={onAddCreditAsTag}
          />
        ))}
      </div>
    </div>
  }

  function onTagsChange(newTags: string[]) {
    currentTags = newTags
    console.log(currentTags)
  }

  return (
    <>
      <div className="flex-auto">
        <h2 className="text-xl mb-2">
          Add to list
        </h2>
        {!selectedItem ?
          <div className="flex-auto flex-col">
          <input
            type="text"
            className="border border-slate-300 bg-transparent rounded px-2 py-1 outline-none focus-within:border-slate-100"
            placeholder="Search movies..."
            onInput={(e) => {
              setSearchInput((e.target as HTMLInputElement).value)
            }}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                search()
              }
            }}
          />
          <div id="searchResults">
            {searchResults.map(searchResult => (
              <SearchResultItem key={searchResult.id} {...searchResult} onClick={handleSearchResultClick}/>
            ))}
          </div>
        </div> : 
        <div>
          <form>
            <h3 className="text-lg">{selectedItem.title}</h3>
            <p>{selectedItem.overview}</p>
            <div>
              <h4>Tags</h4>
              <p className='secondaryText'>Add tags to help filter your list</p>
              <TagList tags={tags} canEdit onTagsChange={onTagsChange}/>
            </div>
            <div>
              <h4>Credits</h4>
              <div>
                {renderMovieCredits()}
              </div>
            </div>
          </form>
        </div>
      }
      </div>
      <div className="flex ml-auto">
        {selectedItem ? <>
          <button
            className="button mr-2"
            onClick={() => setSelectedItem(undefined)}
          >
            Back
          </button>
        </> : ''}
        <Link className="button mr-2" href="/list">
          Cancel
        </Link>
        <button className="button primary" disabled={!selectedItem}>
          Add
        </button>
      </div>
    </>
  )
}
