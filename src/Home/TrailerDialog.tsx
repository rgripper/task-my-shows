import * as React from "react";
import styles from "./TrailerDialog.scss";
import { State } from "../store/models";
import { connect } from "react-redux";
import YouTube from "react-youtube";

const opts = {
  height: "390",
  width: "640",
  playerVars: {
    // https://developers.google.com/youtube/player_parameters
    autoplay: 1 as 1
  }
};

const _TrailerDialog = (props: {
  videoId: string | undefined;
  isLoading: boolean;
  onClose: () => void;
}) => (
  <>
    {(props.isLoading || props.videoId) && (
      <div className={styles.root}>
        {props.isLoading ? (
          <div>Loading...</div>
        ) : props.videoId ? (
          <div>
            <button onClick={props.onClose}><i className="fas fa-times"></i></button>
            <YouTube videoId={props.videoId} opts={opts} />
          </div>
        ) : null}
      </div>
    )}
  </>
);

export const TrailerDialog = connect((state: State) => ({
  videoId:
    state.trailer.items &&
    state.trailer.items.filter(x => x.site === "YouTube").map(x => x.key)[0],
  isLoading: state.trailer.isLoading
}),
({ trailer }: any) => ({
  onClose: () => trailer.set(undefined)
}))(_TrailerDialog);
