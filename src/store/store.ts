import { init } from '@rematch/core'
import * as models from './models'
import { TmdbService, ImageConfiguration } from '../data/TmdbService';

export const store = init({
  models,
})

const { dispatch } = store;

const tmdbService = new TmdbService();

export const ActionHelper = {
  createThumbConfig: (imageConfiguration: ImageConfiguration) => (path: string): string => imageConfiguration.base_url + imageConfiguration.logo_sizes[1] + path,
  loadShows: async (query: string) => dispatch.shows.set(await tmdbService.searchTv(query)),
  loadImageConfiguration: async () => dispatch.imageConfiguration.set(await tmdbService.getImageConfiguration())
}


