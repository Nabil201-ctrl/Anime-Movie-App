export interface Anime {
  id: string;
  title: string;
  synopsis: string;
  ranking?: number;
  genres: string[];
  episodes?: number;
  image: string;
  link?: string;
  type?: string;
}

export interface MetaData {
  page: number;
  size: number;
  totalData: number;
  totalPage: number;
}

export interface AnimeListResponse {
  data: Anime[];
  meta: MetaData;
}
