import * as React from "react";
import { ShowItem } from "./ShowItem";
import { SearchTVResult } from "../data/TmdbService";
import { connect } from "react-redux";
import { State } from "../store/models";
import { ActionHelper } from "../store/store";

interface MappedStateProps {
  shows: SearchTVResult[];
  thumbConfig: undefined | ((path: string) => string);
}

class _Home extends React.Component<MappedStateProps> {
  public render() {
    const thumbConfig = this.props.thumbConfig;
    const isEmpty = this.props.shows.length == 0;
    return (
      <div>
        {isEmpty && <div>No shows found.</div>}
        {thumbConfig && this.props.shows.map(x => (
          <ShowItem
            popularity={x.popularity}
            title={x.name}
            year={new Date(x.first_air_date + "T00:00:00.000Z").getFullYear()}
            posterUrl={thumbConfig(x.poster_path)}
          />
        ))}
      </div>
    );
  }
}

export const Home = connect((state: State): MappedStateProps => ({
  shows: state.shows.items,
  thumbConfig: state.imageConfiguration.value
    ? ActionHelper.createThumbConfig(state.imageConfiguration.value)
    : undefined
}))(_Home);
