import * as React from "react";
import styles from "./App.scss";
import { Home } from "./Home/Home";
import { store } from "./store/store";
import { Provider } from "react-redux";

class App extends React.Component {

  public render() {
    return (
      <Provider store={store}>
        <div className={styles.root}>
          <Home />
        </div>
      </Provider>
    );
  }
}

export default App;
