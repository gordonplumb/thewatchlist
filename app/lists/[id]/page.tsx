'use client'

import { useSession } from 'next-auth/react';
import { WatchlistService } from '../../services/watchlistService';
import { useEffect, useRef, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { List } from '../../types/List'
import styles from '../../styles/List.module.css'

export default function Page() {
  const { id } = useParams<{id: string}>()
  const service = WatchlistService.GetBrowserInstance()
  const [lists, setLists] = useState<List[]>([])
  const [name, setName] = useState('')
  const isLoading = useRef(true)
  const router = useRouter()
  const { data } = useSession()

  useEffect(() => {
    service.getUserLists(id)
      .then(res => {
        isLoading.current = false
        if (res) {
          setLists(res.lists.content)
          setName(res.name)
        }
      })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const createList = async () => {
    const res = await service.createList(`${name}'s list`)
    if (res && res.id) {
      router.push(`/list/${res.id}`)
    }
  }

  return (
    <div>
      <h2 className="text-xl mb-2">
        {name ? `${name}'s lists` : ''}
      </h2>
      {!isLoading.current && lists?.length < 1 ? (
        <div className="mb-2">
          <button
            className="button primary"
            onClick={() => createList()}>
            Start a list
          </button>
        </div>
        
      ) : ''}
      <div className={styles.container}>
        <p>Name</p>
      </div>
      {lists?.map(list => (
        <div key={list.id} className={`${styles.item} ${styles.container}`}>
          <a href={`/list/${list.id}`}>{list.name}</a>
        </div>
      ))}
    </div>
  )
}
