export type MovieCardProps = {
  image?: string;
  title?: string;
  isFirst?: boolean;
  isLast?: boolean;
  marginAtEnd?: boolean;
  marginAround?: boolean;
  cardWidth?: number;
  genre?: [];
  genresList?: Object;
  vote_average?: string;
  vote_count?: string;
  cardFunction?: () => void;
};

export const genresData = {
  28: 'Action',
  12: 'Adventure',
  16: 'Animation',
  35: 'Comedy',
  80: 'Crime',
  99: 'Documentry',
  18: 'Drama',
  10751: 'Family',
  14: 'Fantasy',
  36: 'History',
  27: 'Horror',
  10402: 'Music',
  9648: 'Mystry',
  10749: 'Romance',
  878: 'Scince Fiction',
  10770: 'TV Movie',
  53: 'Thriller',
  10752: 'War',
  37: 'Wastern',
};
