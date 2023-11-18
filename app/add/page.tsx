"use client"
import Link from "next/link"
import React, { useState } from "react"
import testSearchResults from "../data/searchResults.json"
import { SearchItemType } from "../types/SearchItemType"
import { SearchResultItem } from "../components/SearchResultItem"
import { TagList } from "../components/TagList"

const testGenres = ["Genre1", "Genre2", "Genre3"]

export default function Page() {
  const [searchInput, setSearchInput] = useState("")
  const [searchResults, setSearchResults] = useState<SearchItemType[]>([])
  const [selectedItem, setSelectedItem] = useState<SearchItemType>()
  function search() {
    if (searchInput.length > 0) {
      setSearchResults(testSearchResults)
    }
  }
  function handleSearchResultClick(event: React.MouseEvent) {
    // TODO: make api call to get movie details
    setSelectedItem(searchResults.find((item) => item.id === event.currentTarget.id))
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
              if (e.key === "Enter") {
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
            <div>
              <h4>Tags</h4>
              <TagList tags={testGenres} canEdit />

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
        </> : ""}
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
