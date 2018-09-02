import {
  SearchTVResult,
  ImageConfiguration,
  TmdbService
} from "../api/TmdbService";
import { createModel } from "@rematch/core";

const tmdbService = new TmdbService();

export type State = {
  shows: typeof shows.state;
  imageConfiguration: typeof imageConfiguration.state;
};

export type ShowsState = {
  items: SearchTVResult[];
  query: string;
  isSearching: boolean;
};

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

export type ImageConfigurationState = { value: undefined | ImageConfiguration };

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