import * as React from "react";
import * as ReactDOM from "react-dom";
import App from "./App";
import "./index.css";
import registerServiceWorker from "./registerServiceWorker";
import { ActionHelper } from "./store/store";

(async () => {
  await ActionHelper.loadImageConfiguration();
  
  ReactDOM.render(<App/>, document.getElementById("root") as HTMLElement);
  registerServiceWorker();
})();
