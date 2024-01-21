'use client'
import { TagList } from './TagList'
import styles from '../styles/List.module.css'


type ListItemProps = {
  id: string,
  title: string,
  tags: Array<string>,
  runtime: number,
  watched: boolean,
  onUpdate?: (id: string, updateValues: { tags: string[] | undefined, watched: boolean | undefined }) => void
  onDelete?: (id: string) => void
}
export function ListItem({ id, title, tags, runtime, watched, onUpdate, onDelete }: ListItemProps) {
  const onTagsChange = (tags: string[]) => {
    if (onUpdate) {
      onUpdate(id, { tags, watched: undefined })
    }
  }
  return <li>
    <div className="flex h-14 border-b border-slate-700 p-2">
      <label htmlFor={id} className={styles.title}>{title}</label>
      <div className={`${styles.tags} flex p-1`}>
        <TagList
          listItemId={id}
          tags={tags}
          canEdit={!!onUpdate}
          onTagsChange={onTagsChange}
        />
      </div>
      <p className={styles.runtime}>{runtime}</p>
      <div className={styles.watched}>
        <input
          id={id}
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
  </li>
}
