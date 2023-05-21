import React from "react";

type LoadingProps = {
  loading: boolean;
};

const Loading: React.FC<LoadingProps> = ({ loading }) => (
  <>{loading ? <p>Loading ...</p> : null}</>
);

export default Loading;
