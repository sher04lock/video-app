import { IUser } from '../_services/user.service';

export interface IMovie {
    id: string;
    _id: string;
    movie_id: number;
    title: string;
    genres: string[];
    genresString: string;
    year: string;
    avgRating?: number;
    imdb_id: string;
    hidden?: boolean;
    poster: string;
    plot: string;
    votes: string;
    userRating?: number;
    user?: IUser;
}


export type ISavedMovie = Pick<IMovie, 'id' | 'movie_id' | 'title' | 'imdb_id' | 'poster' | 'plot' | 'votes'>;

export type ILastViewedMovie =
    Pick<IMovie, 'id' | 'movie_id' | 'title' | 'imdb_id' | 'poster' | 'plot' | 'votes'>
    & { lastUpdated: string, views: number };

export type IFoundMovie = Pick<IMovie, 'id' | 'movie_id' | 'title' | 'imdb_id' | 'poster' | 'plot' | 'votes'> & { score: number };


