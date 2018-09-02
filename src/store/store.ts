import { init } from '@rematch/core'
import * as models from './models'
import { ImageConfiguration } from '../api/TmdbService';

export const createThumbConfig = (imageConfiguration: ImageConfiguration) => (
  path: string | null
): string =>
  path
    ? imageConfiguration.base_url + imageConfiguration.logo_sizes[1] + path
    : "";

export const store = init({
  models,
})

