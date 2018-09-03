import * as React from "react";
import { State } from "../store/models";
import { connect } from "react-redux";
import styles from "./SearchBar.scss";
import memoizeOne from "memoize-one";
import { debounce } from "throttle-debounce";

interface MappedStateProps {
  value: string;
}

interface MappedDispatchProps {
  onChange: (value: string) => void;
}

type Props = MappedStateProps & MappedDispatchProps;

class _SearchBar extends React.Component<Props, State> {

  // make sure we cache and use the same debouncer
  memoizeDebounce = memoizeOne(fun => debounce(300, fun));

  render() {
    return (
      <div className={styles.root}>
        <i className="fa fa-search" />
        <input
          type="text"
          placeholder="Search title..."
          onChange={event => this.memoizeDebounce(this.props.onChange)(event.currentTarget.value)}
        />
      </div>
    );
  }
}

export const SearchBar = connect(
  (state: State): MappedStateProps => ({
    value: state.shows.query
  }),
  ({ shows }: any): MappedDispatchProps => ({
    onChange: (query: string) => shows.load(query)
  })
)(_SearchBar);
