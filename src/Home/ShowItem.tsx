import * as React from "react";
import styles from "./ShowItem.scss";

export const ShowItem = (props: {
  posterUrl: string;
  year: number;
  title: string;
  popularity: number;
}) => (
  <article className={styles.root}>
    <img src={props.posterUrl} alt="" />
    <header>
      <small>{props.year}</small>
      <div>{props.title}</div>
      <button>
        <i className="fa fa-heart" />
      </button>
    </header>
    <button>
      <i className="fa fa-youtube" />
    </button>
    <section>
      <small>Rating</small>
      <div>{Math.floor(props.popularity * 100)}%</div>
    </section>
    <section>
      <button>
        <i className="fa fa-clipboard-list" />
      </button>
    </section>
  </article>
);
