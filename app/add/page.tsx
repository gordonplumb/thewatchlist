"use client"
import Link from "next/link"
import { useState } from "react"
import testSearchResults from "../data/searchResults.json"
import { SearchItemType } from "../types/SearchItemType"
import { SearchResultItem } from "../components/SearchResultItem"
import { Tag } from "../components/Tag"

export default function Page() {
  const [searchInput, setSearchInput] = useState("")
  const [searchResults, setSearchResults] = useState<SearchItemType[]>([])
  const [selectedItemId, setSelectedItemId] = useState("")
  const [tags, setTags] = useState<string[]>([])
  function search() {
    if (searchInput.length > 0) {
      setSearchResults(testSearchResults)
    }
  }
  function handleSearchResultClick(event: React.MouseEvent) {
    setSelectedItemId(event.currentTarget.id)
    // const genres
  }
  return (
    <>
      <div className="flex-auto">
        <h2 className="text-xl mb-2">
          Add to list
        </h2>
        {selectedItemId === "" ?
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
            <h3 className="text-lg">Inception</h3>
            <div>
              <h4>Tags</h4>
              {tags.map(tag => (
                <Tag key={tag} name={tag} canDelete/>
              ))}
            </div>
          </form>
        </div>
      }
      </div>
      <div className="flex ml-auto">
        {selectedItemId !== "" ? <>
          <button
            className="button mr-2"
            onClick={() => setSelectedItemId("")}
          >
            Back
          </button>
        </> : ""}
        <Link className="button mr-2" href="/list">
          Cancel
        </Link>
        <button className="button primary" disabled={selectedItemId === ""}>
          Add
        </button>
      </div>
    </>
  )
}
