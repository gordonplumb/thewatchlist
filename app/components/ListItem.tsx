'use client'
import { TagList } from './TagList'
import styles from '../styles/List.module.css'


type ListItemProps = {
  id: number,
  title: string,
  tags: Array<string>,
  runtime: number,
  watched: boolean,
  onUpdate?: (id: number, updateValues: { tags: string[] | undefined, watched: boolean | undefined }) => void
  onDelete?: (id: number) => void
}
export function ListItem({ id, title, tags, runtime, watched, onUpdate, onDelete }: ListItemProps) {
  const idString = id.toString()
  const runtimeString = `${Math.floor(runtime / 60)}:${(runtime % 60).toString().padStart(2, '0')}`
  const onTagsChange = (tags: string[]) => {
    if (onUpdate) {
      onUpdate(id, { tags, watched: undefined })
    }
  }
  return (
    <div className="flex h-14 border-b border-slate-700 p-2">
      <label htmlFor={idString} className={styles.title}>{title}</label>
      <div className={`${styles.tags} flex p-1`}>
        <TagList
          listItemId={id}
          tags={tags}
          canEdit={!!onUpdate}
          onTagsChange={onTagsChange}
        />
      </div>
      <p className={styles.runtime}>{runtimeString}</p>
      <div className={styles.watched}>
        <input
          id={idString}
          type="checkbox"
          className="cursor-pointer"
          disabled={!onUpdate}
          defaultChecked={watched}
          onClick={() =>  {
            if (onUpdate) {
              const checkbox = document.querySelector(`input[id='${id}']`) as HTMLInputElement
              if (checkbox) {
                onUpdate(id, { watched: checkbox.checked, tags: undefined })
              }
            }
          }}
        />
      </div>
      <div className={`${styles.remove} flex flex-row-reverse`}>
        {onDelete ? (
          <button
            className="button secondary icon"
            onClick={() => onDelete(id)}
          >
            X
          </button>
        ) : ''}
      </div>
    </div>
  )
}
