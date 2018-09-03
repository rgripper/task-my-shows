import * as React from "react";
import { ShowItem } from "./ShowItem";
import { SearchTVResult } from "../api/TmdbService";
import { connect } from "react-redux";
import { State } from "../store/models";
import { SearchBar } from "./SearchBar";
import { getYearFromDate } from "../api/TmdbService";
import { createThumbConfig } from "../store/store";
import styles from './Home.scss';

interface MappedStateProps {
  shows: SearchTVResult[];
  isSearching: boolean;
  thumbConfig: undefined | ((path: string) => string);
}

class _Home extends React.Component<MappedStateProps> {
  public render() {
    const thumbConfig = this.props.thumbConfig;
    const isEmpty = this.props.shows.length == 0;
    return (
      <div className={styles.root}>
        <SearchBar />
        {this.props.isSearching ? (
          <div>Searching...</div>
        ) : isEmpty ? (
          <div>No shows found.</div>
        ) : (
          thumbConfig &&
          this.props.shows.map(x => (
            <ShowItem
              rating={x.vote_average}
              title={x.name}
              year={getYearFromDate(x.first_air_date)}
              posterUrl={thumbConfig(x.poster_path)}
            />
          ))
        )}
      </div>
    );
  }
}

export const Home = connect(
  (state: State): MappedStateProps => ({
    shows: state.shows.items,
    isSearching: state.shows.isSearching,
    thumbConfig: state.imageConfiguration.value
      ? createThumbConfig(state.imageConfiguration.value)
      : undefined
  })
)(_Home);
