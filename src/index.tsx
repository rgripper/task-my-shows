import * as React from "react";
import * as ReactDOM from "react-dom";
import App from "./App";
import "./index.css";
import registerServiceWorker from "./registerServiceWorker";
import { store } from "./store/store";

(async () => {
  await store.dispatch.imageConfiguration.load();
  
  ReactDOM.render(<App/>, document.getElementById("root") as HTMLElement);
  registerServiceWorker();
})();
