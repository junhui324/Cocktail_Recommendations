import React, { PropsWithChildren } from "react";
import styles from "./CHPageCard.module.scss";

function PageCard({ children }: PropsWithChildren<{}>) {
  return <div className={styles.pagecard}>{children}</div>;
}

export default PageCard;
