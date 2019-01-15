import React from "react";

export default function loader() {
  return (
    <React.Fragment>
      <div className="loader" />
      <span className="loader-info">Loading...</span>
    </React.Fragment>
  );
}
