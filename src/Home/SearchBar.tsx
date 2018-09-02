import * as React from "react";
import { State } from "../store/models";
import { connect } from "react-redux";
import { store } from "../store/store";

interface MappedStateProps {
  value: string;
}

interface MappedDispatchProps {
  onChange: (value: string) => void;
}

const _SearchBar = (props: MappedStateProps & MappedDispatchProps) => (
  <div>
    <input
      type="text"
      value={props.value}
      onChange={event => props.onChange(event.currentTarget.value)}
    />
  </div>
);

export const SearchBar = connect(
  (state: State): MappedStateProps => ({
    value: state.shows.query
  }),
  (): MappedDispatchProps => ({
    onChange: (query: string) => store.dispatch.shows.load(query)
  })
)(_SearchBar);
