"use client"
import { TagList } from "./TagList"

type ListItemProps = {
  id: string,
  title: string,
  tags: Array<string>,
  runtime: number,
  watched: boolean
}
export function ListItem({id, title, tags, runtime, watched}: ListItemProps) {
  return <li>
    <div className="flex gap-1">
      <label htmlFor={id} className="w-1/3">{title}</label>
      <div className="flex gap-1 w-1/3">
        <TagList listItemId={id} tags={tags} canEdit/>
      </div>
      <p className="w-1/6">{runtime}</p>
      <input id={id} type="checkbox" className="w-1/6 cursor-pointer" checked={watched}/>
    </div>
  </li>
}