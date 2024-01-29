'use client'
import Link from 'next/link'
import React, { useState } from 'react'
import { TagList } from '../../../components/TagList'
import { CreditItem } from '../../../components/CreditItem'
import { useSession } from 'next-auth/react'
import { useParams, useRouter } from 'next/navigation'
import { Search } from '@/app/components/Search'
import { WatchlistService } from '@/app/services/watchlistService'
import { MovieDetails } from '@/app/types/MovieDetails'

export default function Page() {
  const { data } = useSession()
  const router = useRouter()
  if (!data?.user) {
    router.push('/login')
  }
  const { id } = useParams<{id: string}>()
  const listId = Number.parseInt(id)
  const [selectedItem, setSelectedItem] = useState<MovieDetails>()
  const [tags, setTags] = useState<string[]>([])
  const service = WatchlistService.GetBrowserInstance()

  let currentTags = tags

  async function onSearchResultClick(id: number) {
    // TODO: make api call to get movie details/credits
    const results = await service.getMovieDetails(id)
    setSelectedItem(results)

    if (results.genres.length > 0) {
      setTags(results.genres.map(genre => genre.name))
    }
  }

  async function addItem() {
    if (!selectedItem) {
      return
    }
    const result = await service.addListItem(
      listId,
      selectedItem.id,
      selectedItem.title,
      tags,
      selectedItem.runtime,
      false
    )

    if (result) {
      router.push(`/list/${listId}`)
    }
  }

  function onAddCreditAsTag(name: string) {
    if (!currentTags.includes(name)) {
      currentTags = [...currentTags, name]
      setTags(currentTags)
    }
  }

  function renderMovieCredits() {
    const credits = selectedItem?.credits
    if (!credits) {
      return null
    }

    return <div>
      <div
        id="cast-container"
        className="flex overflow-x-scroll"
        onWheel={(e) => {
          const scrollable = document.getElementById('cast-container')
          if (scrollable) {
            scrollable.scrollLeft += e.deltaX + e.deltaY
          }
        }}
      >
        {credits.cast.map(castMember => (
          <CreditItem
            key={castMember.name}
            name={castMember.name}
            detail={castMember.character}
            onAdd={onAddCreditAsTag}
          />
        ))}
      </div>
      <div
        id="crew-container"
        className="flex overflow-x-scroll"
        onWheel={(e) => {
          const scrollable = document.getElementById('crew-container')
          if (scrollable) {
            scrollable.scrollLeft += e.deltaX + e.deltaY
          }
        }}
      >
        {credits.crew.map(crewMember => (
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
  }

  return (
    <>
      <div className="flex-auto">
        <h2 className="text-xl mb-2">
          Add to list
        </h2>
        {!selectedItem ?
          <Search onSearchResultClick={onSearchResultClick}/> : 
          <div>
            <h3 className="text-lg">{selectedItem.title}</h3>
            <p className="secondaryText">{selectedItem.overview}</p>
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
        <Link className="button mr-2" href={`/list/${listId}`}>
          Cancel
        </Link>
        <button
          className="button primary"
          disabled={!selectedItem}
          onClick={addItem}
        >
          Add
        </button>
      </div>
    </>
  )
}
