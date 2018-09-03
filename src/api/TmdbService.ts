export interface SearchTVResult {
  original_name: string;
  id: number;
  name: string;
  vote_count: number;
  vote_average: number;
  poster_path: string;
  first_air_date: string;
  popularity: number;
  genre_ids: number[];
  original_language: string;
  backdrop_path: string;
  overview: string;
  origin_country: string[];
}

interface SearchTVResponse {
  page: number;
  total_results: number;
  total_pages: number;
  results: SearchTVResult[];
}

export interface ImageConfiguration {
  base_url: string;
  secure_base_url: string;
  backdrop_sizes: string[];
  logo_sizes: string[];
  poster_sizes: string[];
  profile_sizes: string[];
  still_sizes: string[];
}

interface ConfigurationResponse {
  images: ImageConfiguration;
  change_keys: string[];
}

interface TVVideosResponse {
  id: number;
  results: TVVideoResult[];
}

export interface TVVideoResult {
  id: string;
  iso_639_1: string;
  iso_3166_1: string;
  key: string;
  name: string;
  site: string;
  size: number;
  type: string;
}

export const getYearFromDate = (date: string) =>
  new Date(date + "T00:00:00.000Z").getFullYear();

const apiKey = "1de6071af59ed7706bbfbd09e648558e";

export class TmdbService {
  private readonly movieDB = require("moviedb")(apiKey);

  getImageConfiguration = (): Promise<ImageConfiguration> => {
    return new Promise((resolve, reject) => {
      this.movieDB.configuration((err: any, res: ConfigurationResponse) => {
        if (err) {
          reject(err);
        } else {
          resolve(res.images);
        }
      });
    });
  };

  searchTv = (query: string | undefined): Promise<SearchTVResult[]> => {
    return new Promise((resolve, reject) => {
      this.movieDB.searchTv({ query }, (err: any, res: SearchTVResponse) => {
        if (err) {
          reject(err);
        } else {
          resolve(res.results);
        }
      });
    });
  };

  getTVVideos = (id: number): Promise<TVVideoResult[]> => {
    return new Promise((resolve, reject) => {
      this.movieDB.tvVideos({ id }, (err: any, res: TVVideosResponse) => {
        if (err) {
          reject(err);
        } else {
          resolve(res.results);
        }
      });
    });
  };
}
