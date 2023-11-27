import { MovieDetails } from "../types/MovieDetails";

type Props = MovieDetails & {
  onClick: React.MouseEventHandler
}

export function SearchResultItem({ id, title, releaseDate, overview, onClick: handleOnClick }: Props) {
  return <div
      id={id.toString()}
      className="flex border border-slate-300 rounded px-2 py-1 my-1 cursor-pointer hover:bg-slate-700"
      onClick={handleOnClick}
    >
    <div className="flex flex-col w-1/3">
      <p>{title}</p>
      <p>{releaseDate}</p>
    </div>
    <div className="w-2/3">
      <p>{overview}</p>
    </div>
  </div>
}
