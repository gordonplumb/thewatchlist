'use client'

import Link from 'next/link'
import { ListItem } from '../../components/ListItem'
import { WatchlistService } from '../../services/watchlistService'
import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { ListItemDTO } from '../../../app/types/ListItemDTO'
import styles from '../../styles/List.module.css'
import { useSession } from 'next-auth/react'

const pageSize = 100
export default function Page() {
  const { id: listId } = useParams<{id: string}>()
  const service = WatchlistService.GetBrowserInstance()
  const [canEdit, setCanEdit] = useState<boolean>(false)
  const [listItems, setListItems] = useState<ListItemDTO[]>([])

  const { data } = useSession()

  useEffect(() => {
    if (data?.user?.id) {
      service.getList(listId)
      .then(res => {
        if (res) {
          setCanEdit(res.userId === Number.parseInt(data.user.id))
        }
      })
    }
    
    service.getListItems(listId, 0, pageSize)
      .then(res => {
        if (res?.content?.length > 0) {
          setListItems(res.content)
        }
      })
  }, [])

  const updateListItem = (
    listItemId: string,
    updateValues: { tags: string[] | undefined, watched: boolean | undefined }
  ) => {
    service.updateListItem(listId, listItemId, updateValues)
  }

  const deleteListItem = async (listItemId: string) => {
    const result = await service.deleteListItem(listId, listItemId)

    if (result) {
      setListItems(listItems.filter(listItem => listItem.id !== listItemId))
    }
  }
  
  return (
    <div>
      <h2 className="text-xl mb-2">
        My List
      </h2>
      <div className="flex mb-2">
        <Link className="button primary" href="/add">
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
      <ul>
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
      </ul>
    </div>
  )
}
