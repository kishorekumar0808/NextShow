export type SubMovieCardProps = {
  image?: string;
  title?: string;
  isFirst?: boolean;
  isLast?: boolean;
  marginAtEnd?: boolean;
  marginAround?: boolean;
  cardWidth?: number;
  cardFunction?: () => void;
};
