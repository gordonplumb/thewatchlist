import { SearchItem } from '../types/SearchItem';

type Props = SearchItem & {
  onClick: React.MouseEventHandler
}

export function SearchResultItem({ id, title, releaseDate, overview, onClick: handleOnClick }: Props) {
  return <div
      id={id.toString()}
      className="flex border border-slate-300 rounded px-2 py-1 my-1 cursor-pointer hover:bg-slate-700"
      onClick={handleOnClick}
    >
    <div className="flex flex-col w-1/3 pr-2">
      <p>{title}</p>
      <p className="secondaryText">{releaseDate}</p>
    </div>
    <div className="w-2/3">
      <p className="secondaryText">{overview}</p>
    </div>
  </div>
}
