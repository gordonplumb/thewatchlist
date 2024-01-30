'use client'

import Link from 'next/link'
import { ListItem } from '../../components/ListItem'
import { WatchlistService } from '../../services/watchlistService'
import { useParams } from 'next/navigation'
import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { ListItemDTO } from '../../../app/types/ListItemDTO'
import styles from '../../styles/List.module.css'
import { useSession } from 'next-auth/react'

const pageSize = 100
export default function Page() {
  const { id } = useParams<{id: string}>()
  const listId = Number.parseInt(id)
  const service = WatchlistService.GetBrowserInstance()
  const [canEdit, setCanEdit] = useState<boolean>(false)
  const [listItems, setListItems] = useState<ListItemDTO[]>([])
  const [size, setSize] = useState([0, 0])
  const nextPage = useRef(0)
  const totalPages = useRef(0)
  const isLoading = useRef(false)

  const { data } = useSession()

  useLayoutEffect(() => {
    function updateSize() {
      setSize([window.innerWidth, window.innerHeight])
    }
    window.addEventListener('resize', updateSize)
    updateSize()
    return () => window.removeEventListener('resize', updateSize)
  }, [])

  useEffect(() => {
    if (data?.user?.id) {
      service.getList(listId)
      .then(res => {
        if (res) {
          setCanEdit(res.userId === Number.parseInt(data.user.id))
        }
      })
    }
    
    isLoading.current = true
    service.getListItems(listId, 0, pageSize)
      .then(res => {
        isLoading.current = false
        if (res?.content?.length > 0) {
          nextPage.current = 1
          totalPages.current = res.totalPages
          setListItems(res.content)
        }
      })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const updateListItem = (
    listItemId: number,
    updateValues: { tags: string[] | undefined, watched: boolean | undefined }
  ) => {
    service.updateListItem(listId, listItemId, updateValues)
  }

  const deleteListItem = async (listItemId: number) => {
    const result = await service.deleteListItem(listId, listItemId)

    if (result) {
      setListItems(listItems.filter(listItem => listItem.id !== listItemId))
    }
  }

  async function loadMore() {
    if (
      nextPage.current < totalPages.current &&
      !isLoading.current
    ) {
      isLoading.current = true
      const results = await service.getListItems(listId, nextPage.current, pageSize)
      nextPage.current++
      setListItems(listItems.concat(results.content))
      isLoading.current = false
    }
  }

  const listHeight = size[1] - 250
  
  return (
    <div>
      <h2 className="text-xl mb-2">
        My List
      </h2>
      <div className="flex mb-2">
        <Link className="button primary" href={`/list/${listId}/add`}>
          Add
        </Link>
      </div>
      <div className="flex border-b border-slate-700 p-2">
        <p className={styles.title}>Title</p>
        <p className={styles.tags}>Tags</p>
        <p className={styles.runtime}>Runtime</p>
        <p className={styles.watched}>Watched</p>
        <div className={styles.remove}></div>
      </div>
      <div
        className="overflow-y-scroll"
        style={{ height: `${listHeight}px` }}
        onScroll={(event) => {
          const element = event.target as HTMLElement
          if (element.scrollTop + listHeight === element.scrollHeight) {
            loadMore()
          }
        }}
      >
        {listItems.map(item => {
          const listItemProps = {
            ...item,
            ...canEdit && {
              onUpdate: updateListItem,
              onDelete: deleteListItem
            }
          }
          return (
          <ListItem key={item.id} {...listItemProps} />
        )})}
      </div>
    </div>
  )
}
