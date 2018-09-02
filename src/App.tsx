import * as React from "react";
import "./App.css";
import { Home } from "./Home/Home";
import { SearchTVResult } from "./data/TmdbService";

class App extends React.Component<{ shows: SearchTVResult[]; thumbConfig: (path: string) => string }> {

  public render() {
    return (
      <div className="App">
        <Home shows={this.props.shows} thumbConfig={this.props.thumbConfig} />
      </div>
    );
  }
}

export default App;
