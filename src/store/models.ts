import {
  SearchTVResult,
  ImageConfiguration,
  TmdbService,
  TVVideoResult
} from "../api/TmdbService";
import { createModel } from "@rematch/core";

const tmdbService = new TmdbService();

export interface State {
  shows: typeof shows.state;
  trailer: typeof trailer.state;
  imageConfiguration: typeof imageConfiguration.state;
}

export interface ShowsState {
  items: SearchTVResult[];
  query: string;
  isSearching: boolean;
}

export const shows = createModel({
  state: { items: [], query: "", isSearching: false } as ShowsState,
  reducers: {
    startSearching(state: ShowsState, query: string): ShowsState {
      return { ...state, items: [], query, isSearching: true };
    },
    trySetSearchResults(
      state: ShowsState,
      query: string,
      items: SearchTVResult[]
    ): ShowsState {
      if (state.query !== query) {
        return state;
      }
      return { ...state, items, isSearching: false };
    }
  },
  effects: {
    async load(query: string) {
      this.startSearching(query);
      const shows = await tmdbService.searchTv(query);
      this.trySetSearchResults(query, shows);
    }
  }
});

export interface TrailerState {
  items: TVVideoResult[] | undefined;
  isLoading: boolean;
}

export const trailer = createModel({
  state: { items: undefined, isLoading: false } as TrailerState,
  reducers: {
    startLoading (state: TrailerState): TrailerState {
      return { ...state, items: undefined, isLoading: true };
    },
    set (state: TrailerState, items: TVVideoResult[] | undefined): TrailerState {
      return { ...state, items, isLoading: false };
    }
  },
  effects: {
    async load(id: number) {
      this.startLoading();
      const videos = await tmdbService.getTVVideos(id);
      this.set(videos);
    }
  }
});

export interface ImageConfigurationState {
  value: undefined | ImageConfiguration;
}

export const imageConfiguration = createModel({
  state: { value: undefined } as ImageConfigurationState,
  reducers: {
    set(
      state: ImageConfigurationState,
      value: ImageConfiguration
    ): ImageConfigurationState {
      return { ...state, value };
    }
  },
  effects: {
    async load() {
      this.set(await tmdbService.getImageConfiguration());
    }
  }
});
