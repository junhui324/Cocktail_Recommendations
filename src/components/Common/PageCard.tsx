import React, { PropsWithChildren } from "react";

import styles from "./PageCard.module.scss";

function PageCard({ children }: PropsWithChildren) {
  return <div className={styles.pagecard}>{children}</div>;
}

export default PageCard;
