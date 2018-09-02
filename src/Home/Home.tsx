import * as React from "react";
import { ShowItem } from "./ShowItem";
import { SearchTVResult } from "../data/TmdbService";

export class Home extends React.Component<{ shows: SearchTVResult[]; thumbConfig: (path: string) => string }> {
  public render() {
    return (
      <div>
        {this.props.shows.map(x => (
          <ShowItem
            popularity={x.popularity}
            title={x.name}
            year={new Date(x.first_air_date +  + 'T00:00:00.000Z').getFullYear()}
            posterUrl={this.props.thumbConfig(x.poster_path)}
          />
        ))}
      </div>
    );
  }
}
