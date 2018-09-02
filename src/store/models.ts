import { SearchTVResult, ImageConfiguration } from "../data/TmdbService";

export type ShowsState = { items: SearchTVResult[] };

export const shows = {
  state: { items: [] } as ShowsState,
  reducers: {
    set (state: ShowsState, items: SearchTVResult[]): ShowsState {
      return { ...state, items };
    }
  }
}

export type ImageConfigurationState = { value: undefined | ImageConfiguration };

export const imageConfiguration = {
  state: { value: undefined } as ImageConfigurationState,
  reducers: {
    set (state: ImageConfigurationState, value: ImageConfiguration): ImageConfigurationState {
      return { ...state, value };
    }
  }
}

export type State = { shows: typeof shows.state, imageConfiguration: typeof imageConfiguration.state };