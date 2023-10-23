import React from "react";

export default function Progressbar(props: {
  completed: number;
  todoslength: number;
}) {
  const { completed, todoslength } = props;

  const containerStyles = {
    height: 35,
    width: "100%",
    backgroundColor: "#e0e0de",
  };

  const fillerStyles = {
    height: "100%",
    width: `${(completed / todoslength) * 100}%`,
    backgroundColor: "yellow",
    borderRadius: "inherit",
    textAlign: "right",
  };

  const labelStyles = {
    padding: 5,
    color: "black",
    fontWeight: "bold",
  };

  return (
    <div className="relative" style={containerStyles}>
      <div style={fillerStyles}>
        <span style={labelStyles} className="absolute  text-sm left-10">
          {`${completed}`} of {todoslength} tasks done{" "}
        </span>
      </div>
    </div>
  );
}
