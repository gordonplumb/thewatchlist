import Link from 'next/link'
import { ListItem } from '../components/ListItem'

const testData = [
  { id: '1', title: 'The Batman', tags: ['Thriller', 'Superhero'], runtime: 177, watched: true },
]
export default function Page() {
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
      <div className="flex gap-1">
        <p className="w-1/3">Title</p>
        <p className="w-1/3">Tags</p>
        <p className="w-1/6">Runtime</p>
        <p className="w-1/6">Watched?</p>
      </div>
      <ul>
        {testData.map(item => (
          <ListItem key={item.id} {...item} />
        ))}
      </ul>
    </div>
  )
}
  