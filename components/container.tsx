import React from "react";

const Container = (props) => {
  return (
    <div
      className={`container-w p-8 mx-auto ${
        props.className ? props.className : ""
      }`}
    >
      {props.children}
    </div>
  );
};

export default Container;
