export interface Review {
  id: string;
  author: string;
  avatar: string;
  score: number;
  title: string;
  body: string;
  date: string;
  platform: string;
  helpful: number;
}

export interface GameData {
  id: string;
  title: string;
  subtitle: string;
  developer: string;
  publisher: string;
  releaseDate: string;
  platforms: string[];
  genres: string[];
  description: string;
  criticScore: number;
  userScore: number;
  totalReviews: number;
  coverImage: string;
  heroImage: string;
  screenshots: string[];
  reviews: Review[];
}
