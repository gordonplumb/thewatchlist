import React, { useEffect, useState } from 'react'
import styles from '../styles/TagList.module.css'
import { Tag } from './Tag'
import { AddIcon } from './AddIcon'

type TagListProps = {
  listItemId?: string,
  tags: string[],
  canEdit: boolean,
  onTagsChange?: (tags: string[]) => void
}

export function TagList({ listItemId, tags, canEdit, onTagsChange }: TagListProps) {
  const [isEditing, setIsEditing] = useState(canEdit && listItemId === undefined)
  const [displayedTags, setDisplayedTags] = useState<string[]>(tags)
  const [newTagName, setNewTagName] = useState('')
  let newDisplayedTags = tags
  useEffect(() => {
    setDisplayedTags(newDisplayedTags)
  }, [newDisplayedTags])

  function addNewTag() {
    if (newTagName !== '' && !displayedTags.includes(newTagName)) {
      newDisplayedTags = [...displayedTags, newTagName]
      setDisplayedTags(newDisplayedTags)
      setNewTagName('')
      if (!listItemId && onTagsChange) {
        onTagsChange(newDisplayedTags)
      }
    }
  }

  function handleDeleteTag(tagName: string) {
    newDisplayedTags = displayedTags.filter(tag => tag !== tagName)
    setDisplayedTags(newDisplayedTags)
    if (!listItemId && onTagsChange) {
      onTagsChange(newDisplayedTags)
    }
  }

  function saveTagList() {
    if (listItemId && onTagsChange) {
      onTagsChange(displayedTags)
    }
    setIsEditing(false)
  }

  function renderEditActionButton() {
    return (
      <div className="pl-1">
        {isEditing ? 
          <svg
            className={styles.saveButton}
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            onClick={saveTagList}
          >
            <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
            <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
            <g id="SVGRepo_iconCarrier">
              <path fill-rule="evenodd" clip-rule="evenodd" d="M18.1716 1C18.702 1 19.2107 1.21071 19.5858 1.58579L22.4142 4.41421C22.7893 4.78929 23 5.29799 23 5.82843V20C23 21.6569 21.6569 23 20 23H4C2.34315 23 1 21.6569 1 20V4C1 2.34315 2.34315 1 4 1H18.1716ZM4 3C3.44772 3 3 3.44772 3 4V20C3 20.5523 3.44772 21 4 21L5 21L5 15C5 13.3431 6.34315 12 8 12L16 12C17.6569 12 19 13.3431 19 15V21H20C20.5523 21 21 20.5523 21 20V6.82843C21 6.29799 20.7893 5.78929 20.4142 5.41421L18.5858 3.58579C18.2107 3.21071 17.702 3 17.1716 3H17V5C17 6.65685 15.6569 8 14 8H10C8.34315 8 7 6.65685 7 5V3H4ZM17 21V15C17 14.4477 16.5523 14 16 14L8 14C7.44772 14 7 14.4477 7 15L7 21L17 21ZM9 3H15V5C15 5.55228 14.5523 6 14 6H10C9.44772 6 9 5.55228 9 5V3Z"></path>
            </g>
          </svg> : 
          <svg
            className={styles.editButton}
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            onClick={() => setIsEditing(true)}
          >
            <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
            <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
            <g id="SVGRepo_iconCarrier">
              <path d="M21.2799 6.40005L11.7399 15.94C10.7899 16.89 7.96987 17.33 7.33987 16.7C6.70987 16.07 7.13987 13.25 8.08987 12.3L17.6399 2.75002C17.8754 2.49308 18.1605 2.28654 18.4781 2.14284C18.7956 1.99914 19.139 1.92124 19.4875 1.9139C19.8359 1.90657 20.1823 1.96991 20.5056 2.10012C20.8289 2.23033 21.1225 2.42473 21.3686 2.67153C21.6147 2.91833 21.8083 3.21243 21.9376 3.53609C22.0669 3.85976 22.1294 4.20626 22.1211 4.55471C22.1128 4.90316 22.0339 5.24635 21.8894 5.5635C21.7448 5.88065 21.5375 6.16524 21.2799 6.40005V6.40005Z" stroke-linecap="round" stroke-linejoin="round"></path>
              <path d="M11 4H6C4.93913 4 3.92178 4.42142 3.17163 5.17157C2.42149 5.92172 2 6.93913 2 8V18C2 19.0609 2.42149 20.0783 3.17163 20.8284C3.92178 21.5786 4.93913 22 6 22H17C19.21 22 20 20.2 20 18V13" stroke-linecap="round" stroke-linejoin="round"></path>
            </g>
          </svg>
        }
      </div>
    )
  }

  return <div className={styles.tagListContainer}>
    <div
      id={`list-${listItemId}`}
      className={styles.tagList}
      onWheel={(e) => {
        const scrollable = document.getElementById(`list-${listItemId}`)
        if (scrollable) {
          scrollable.scrollLeft += e.deltaX + e.deltaY
        }
      }}
    >
      {displayedTags.map(tag => (
        <div key={tag} className={styles.tag}>
          <Tag name={tag} onDelete={isEditing ? handleDeleteTag : undefined}/>
        </div>
      ))}
      {isEditing ?
        <div className={styles.addContainer}>
          <div className="flex">
            <input
              autoFocus
              type="text"
              className={styles.addInput}
              placeholder="Add a tag"
              value={newTagName}
              onInput={(e) => {
                setNewTagName((e.target as HTMLInputElement).value)
              }}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  addNewTag()
                  e.preventDefault()
                }
              }}
            />
            <div className="pr-1" onClick={addNewTag}>
              <AddIcon />
            </div>
          </div>
        </div> : ''
      }
    </div>
    {canEdit && listItemId !== undefined ? renderEditActionButton() : ''}
  </div>
}
