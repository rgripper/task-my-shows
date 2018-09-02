import * as React from "react";
import * as ReactDOM from "react-dom";
import App from "./App";
import "./index.css";
import registerServiceWorker from "./registerServiceWorker";
import { TmdbService } from "./data/TmdbService";

(async () => {
  const tmdbService = new TmdbService();
  const results = await tmdbService.searchTv("West");
  const imageConfiguration = await tmdbService.getConfiguration();
  const thumbConfig = (path: string): string => imageConfiguration.base_url + imageConfiguration.logo_sizes[1] + path;
  ReactDOM.render(<App shows={results} thumbConfig={thumbConfig}/>, document.getElementById("root") as HTMLElement);
  registerServiceWorker();
})();
