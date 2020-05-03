import "./RangeSlider.css";
import React, { useState } from "react";

export const POSITION_LIST = ["top", "right", "bottom", "left"];
const ALIGNMENT_LIST = ["start", "end"];
const NUMBERS_REG = "^[0-9]*$";

const RangeSlider = (props) => {
  const [value, setValue] = useState(getSliderValue(props.value));
  const legendPositionCls = getLegendPositionCls(props.legendPosition);
  const legend = props.legend && !!legendPositionCls;
  const sliderThumbShapeCls = getSliderThumbShapeCls(props.sliderThumbShape);
  const min = getMin(props.min);
  const max = getMax(props.max, min);
  const step = getStep(props.step);

  //
  return (
    <span
      className={`range-slider-container ${legendPositionCls}`}
      data-testid="range-slider-container-testid"
    >
      <span className={`range-slider-wrap ${props.alignment}`}>
        <span className="min-wrap">{props.min}</span>
        <span className="custom-range-slider">
          {getLegendOnSlider(value, props.legenOnTopOfSlider)}
          <input
            type="range"
            name="rangeslider"
            id="rangeslider"
            className={sliderThumbShapeCls}
            step={step}
            value={value}
            min={min}
            max={max}
            onChange={(e) =>
              onSlide(e.currentTarget, setValue, props.legenOnTopOfSlider)
            }
          />
        </span>
        <span className="max-wrap">{props.max}</span>
      </span>
      {getLegend(
        props.legendAlignment,
        props.legendLabel,
        value,
        props.legendStyle,
        legend
      )}
    </span>
  );
};

export const getLegend = (alignment, label, value, legendStyle, legend) => {
  if (!legend) {
    return null;
  }

  alignment = ALIGNMENT_LIST.includes(alignment)
    ? `legend ${alignment}`
    : "legend";

  return (
    <span
      data-testid="legend-testid"
      className={alignment}
      style={legendStyle}
    >{`${label || ""} ${value || ""}`}</span>
  );
};

export const getLegendOnSlider = (value, legenOnTopOfSlider) => {
  return legenOnTopOfSlider ? (
    <React.Fragment>
      <span className="range-slider-thumb"></span>
      <span className="range-slider-value">{value}</span>
    </React.Fragment>
  ) : null;
};

export const getLegendPositionCls = (legendPosition) => {
  if (!POSITION_LIST.includes(legendPosition)) {
    return false;
  }
  return "legend-" + legendPosition;
};

export const getSliderThumbShapeCls = (sliderThumbShape) => {
  return sliderThumbShape ? `range-slider ${sliderThumbShape}` : "range-slider";
};

export const onSlide = (el, setValue, legenOnTopOfSlider) => {
  const value = el.value;
  setValue(value);

  // Slider gradiant fill
  el.style.background =
    "linear-gradient(to right, #82CFD0 0%, #82CFD0 " +
    value +
    "%, #fff " +
    value +
    "%, white 100%)";

  if (legenOnTopOfSlider) {
    legendOnTopOfSliderHandler(value);
  }
};

export const legendOnTopOfSliderHandler = (value) => {
  const rsv = document.querySelector(".range-slider-value");
  if (value && rsv) {
    const processLeft =
      (value * (131 - 25)) / 100 + value.toString().length * 8;
    rsv.style.left = `${processLeft}px`;
  }
};

export const getSliderValue = (value) => {
  return isInteger(value) ? value : 0;
};

export const getMin = (value) => {
  return isInteger(value) ? value : 0;
};

export const getMax = (max, min) => {
  max = isInteger(max) ? max : 100;
  return max < min ? min : max;
};

export const getStep = (value) => {
  return isInteger(value) ? value : 1;
};

export const isInteger = (value) => {
  if (typeof value === "number") {
    return true;
  } else if (typeof value === "string") {
    return value.match(NUMBERS_REG);
  } else {
    return false;
  }
};

export default RangeSlider;
