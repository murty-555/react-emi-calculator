import React from "react";
import { numberWithCommas } from "../utils/config";

const SliderInput = ({
  title,
  state,
  min,
  max,
  onChange,
  labelMin,
  labelMax,
  underlineTitle,
}) => {
  return (
    <>
      <span className="title">{title}</span>
      {state > 0 && (
        <span className="title" style={{ textDecoration: "underline" }}>
          {underlineTitle}
        </span>
      )}
      <div>
        <input
          value={state}
          onChange={onChange}
          type="range"
          className="range"
          min={min}
          max={max}
        />
        <div className="labels">
          <label>{labelMin ?? numberWithCommas(min)}</label>
          <b>{numberWithCommas(state)}</b>
          <label>{labelMax ?? numberWithCommas(max)}</label>
        </div>
      </div>
    </>
  );
};

export default SliderInput;
