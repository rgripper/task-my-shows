import * as React from "react";
import styles from "./ShowItem.scss";
import * as classNames from "classnames";

export const ShowItem = (props: {
  posterUrl: string;
  year: number;
  title: string;
  rating: number;
}) => (
  <article className={styles.root}>
    <img src={props.posterUrl} alt="" />
    <header>
      <small>{props.year}</small>
      <div>{props.title}</div>
      <button className={styles["button-icon"]}>
        <i className="fas fa-heart" />
      </button>
    </header>
    <section className={styles['section-play']}>
      <button className={classNames(styles["button-icon"], styles["button-icon-lg"])} title="Open in youtube">
        <i className="fab fa-youtube"></i>
      </button>
    </section>
    <section>
      <small>Rating</small>
      <div>{Math.floor(props.rating * 10)}%</div>
    </section>
    <section>
      <button className={styles["button-icon"]}>
        <i className="fas fa-clipboard-list" />
      </button>
    </section>
  </article>
);
