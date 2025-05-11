export interface MovieCard {
  _id?: string;
  title: string;
  plot: string;
  imdbRating: {
    userRating: number;
  }
  media: {
    imageUrl: string;
  }
}
