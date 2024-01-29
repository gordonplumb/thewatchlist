import { MovieCredits } from './MovieCredits';
import { SearchItem } from './SearchItem';

export type MovieDetails = SearchItem & {
  credits: MovieCredits,
  genres: { id: number, name: string }[]
  runtime: number
}
