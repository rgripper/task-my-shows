import * as React from "react";
import "./App.css";
import { Home } from "./Home/Home";
import { store } from "./store/store";
import { Provider } from "react-redux";

class App extends React.Component {

  public render() {
    return (
      <Provider store={store}>
        <div className="App">
          <Home />
        </div>
      </Provider>
    );
  }
}

export default App;
