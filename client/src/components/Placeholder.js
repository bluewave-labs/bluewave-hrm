import React from "react";

const style = {
  alignContent: "center",
  textAlign: "center",
  height: "200px",
  width: "400px",
  position: "fixed",
  top: "50%",
  left: "50%",
  marginTop: "-100px",
  marginLeft: "-200px",
};

function Placeholder({content}) {
  return <div style={style}>{content}</div>;
}

export default Placeholder;
