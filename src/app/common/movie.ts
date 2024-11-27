export interface Movie {
  imdb: Imdb
  _id: string
  title: string
  year: number
  director: string
  plot: string
  genres: string[]
  poster: string
  __v: number
}

export interface Imdb {
  rating: number
  votes: number
}