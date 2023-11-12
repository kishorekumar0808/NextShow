import {
  movieCastDetails,
  movieDetails,
  nowPlayingMovies,
  popularMovies,
  upComingMovies,
} from './apiCalls';

export const getNowPlayingMoviesList = async () => {
  try {
    const response = await fetch(nowPlayingMovies);
    const json = await response.json();
    return json;
  } catch (error) {
    console.error('getNowPlayingMoviesList function', error);
  }
};

export const getUpComingMoviesList = async () => {
  try {
    const response = await fetch(upComingMovies);
    const json = await response.json();
    return json;
  } catch (error) {
    console.error('getUpComingMoviesList function', error);
  }
};

export const getPopularMoviesList = async () => {
  try {
    const response = await fetch(popularMovies);
    const json = await response.json();
    return json;
  } catch (error) {
    console.error('getPopularMoviesList function', error);
  }
};

export const getMovieDetails = async (movieId: number) => {
  try {
    const response = await fetch(movieDetails(movieId));
    const json = await response.json();
    return json;
  } catch (error) {
    console.error('getMovieDetails function', error);
  }
};

export const getMovieCastDetails = async (movieId: number) => {
  try {
    const response = await fetch(movieCastDetails(movieId));
    const json = await response.json();
    return json;
  } catch (error) {
    console.error('getMovieCastDetails function', error);
  }
};
