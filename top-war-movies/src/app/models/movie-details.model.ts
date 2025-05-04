export interface MovieDetails {
    _id?: string;
    title: string;
    plot: string;
    releaseYear: number;
    director: string;
    writers: string[];
    actors: string[];
    length: string;
    warType: string;
    imdbRating: {
        userRating: number;
        expertRating: number;
    };
    language: string[];
    country: string[];
    media: {
        imageUrl: string;
        trailerUrl: string;
    };
}
