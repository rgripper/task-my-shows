## My Shows task

### Running

Usual commands: `yarn start`, `yarn test`, `yarn build`.

### Tech choices

- Based on create-react-app
- TypeScript 3.0
- Webpack 3. Config is ejected from create-react-app so a bit messy - some stuff automatically arrived to `dependencies` instead of `devDependencies`
- CSS Modules and a SCSS loader
- `rematch` on top of Redux for state management
- `react-router` for navigation
- `moviedb` for connecting to TMDB's API v3

### Tests

For demo purposes there are 2 tests in  `/src/Home/ShowItem.spec.tsx`.