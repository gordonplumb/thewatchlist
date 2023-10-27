type TagProps = {
  name: string,
  canDelete: boolean
}

export function Tag({name}: TagProps) {
  return <div>
    <p>{name}</p>
  </div>
}
