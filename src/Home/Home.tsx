import * as React from "react";
import { ShowItem } from "./ShowItem";
import { SearchTVResult } from "../api/TmdbService";
import { connect } from "react-redux";
import { State } from "../store/models";
import { SearchBar } from "./SearchBar";
import { getYearFromDate } from "../api/TmdbService";
import { createThumbConfig } from "../store/store";
import styles from "./Home.scss";
import { TrailerDialog } from "./TrailerDialog";

interface MappedStateProps {
  shows: SearchTVResult[];
  isSearching: boolean;
  thumbConfig: undefined | ((path: string) => string);
}

interface MappedDispatchProps {
  playTrailer: (id: number) => void;
}

type Props = MappedStateProps & MappedDispatchProps;

class _Home extends React.Component<Props> {
  public render() {
    const thumbConfig = this.props.thumbConfig;
    const isEmpty = this.props.shows.length == 0;
    return (
      <div className={styles.root}>
        <SearchBar />
        <TrailerDialog />
        {this.props.isSearching ? (
          <div>Searching...</div>
        ) : isEmpty ? (
          <div>No shows found.</div>
        ) : (
          thumbConfig &&
          this.props.shows.map(x => (
            <ShowItem
              key={x.id}
              rating={x.vote_average}
              title={x.name}
              year={x.first_air_date ? getYearFromDate(x.first_air_date) : null}
              posterUrl={thumbConfig(x.poster_path)}
              playTrailer={() => this.props.playTrailer(x.id)}
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
  }),
  ({ trailer }: any): MappedDispatchProps => ({
    playTrailer: (id: number) => trailer.load(id)
  })
)(_Home);
