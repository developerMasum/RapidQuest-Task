import React from "react";
import GridLoader from "react-spinners/GridLoader";

function Loader() {
  return (
    <div style={loaderStyle}>
      <GridLoader color="#038c7b" size={50} />
    </div>
  );
}

const loaderStyle: React.CSSProperties = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "100vh",
  width: "full",
};

export default Loader;
