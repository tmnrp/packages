import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, fireEvent } from "@testing-library/react";
import RangeSlider, {
  POSITION_LIST,
  getSliderThumbShapeCls,
  getLegendPositionCls,
  legendOnTopOfSliderHandler,
  onSlide,
  getLegendOnSlider,
  getLegend,
  isInteger,
  getSliderValue,
  getMin,
  getMax,
  getStep
} from "../RangeSlider";

test("Position list should be accessible", () => {
  expect(POSITION_LIST).toBeDefined();
});

test("Position list should contain values", () => {
  expect(POSITION_LIST.length > 0).toBeTruthy();
});

test(" Should return default cls with attached class with valid Param", () => {
  expect(getSliderThumbShapeCls("square")).toEqual("range-slider square");
});

describe("Should return default cls", () => {
  test("Empty param", () => {
    expect(getSliderThumbShapeCls()).toEqual("range-slider");
  });

  test("null", () => {
    expect(getSliderThumbShapeCls(null)).toEqual("range-slider");
  });

  test("undefined", () => {
    expect(getSliderThumbShapeCls(undefined)).toEqual("range-slider");
  });

  test("Empty string", () => {
    expect(getSliderThumbShapeCls("")).toEqual("range-slider");
  });
});

describe("Legends CLS should return false", () => {
  test("Empty param", () => {
    expect(getLegendPositionCls()).toEqual(false);
  });

  test("null", () => {
    expect(getLegendPositionCls(null)).toEqual(false);
  });

  test("undefined", () => {
    expect(getLegendPositionCls(undefined)).toEqual(false);
  });

  test("Empty string", () => {
    expect(getLegendPositionCls("")).toEqual(false);
  });

  test("Invalid string", () => {
    expect(getLegendPositionCls("invalid")).toEqual(false);
  });
});

describe("Legends CLS should return appopriate value", () => {
  test("top", () => {
    expect(getLegendPositionCls("top")).toEqual("legend-top");
  });
  test("right", () => {
    expect(getLegendPositionCls("right")).toEqual("legend-right");
  });
  test("bottom", () => {
    expect(getLegendPositionCls("bottom")).toEqual("legend-bottom");
  });
  test("left", () => {
    expect(getLegendPositionCls("left")).toEqual("legend-left");
  });
});

describe("DOM testing: Legend on top of slider", () => {
  const testingEl = (
    <div data-testid="myid" id="myid" className="range-slider-value">
      ABC
    </div>
  );

  test("Valid value", () => {
    const { getByTestId } = render(testingEl);
    legendOnTopOfSliderHandler(100);
    expect("130px").toEqual(getByTestId("myid").style.left);
  });
  test("Invalid value", () => {
    const { getByTestId } = render(testingEl);
    legendOnTopOfSliderHandler("abcd");
    expect("").toEqual(getByTestId("myid").style.left);
  });
  test("Empty param", () => {
    const { getByTestId } = render(testingEl);
    legendOnTopOfSliderHandler();
    expect("").toEqual(getByTestId("myid").style.left);
  });
  test("null param", () => {
    const { getByTestId } = render(testingEl);
    legendOnTopOfSliderHandler(null);
    expect("").toEqual(getByTestId("myid").style.left);
  });
  test("undefined param", () => {
    const { getByTestId } = render(testingEl);
    legendOnTopOfSliderHandler(undefined);
    expect("").toEqual(getByTestId("myid").style.left);
  });

  test("Valid value", () => {
    let val = 50;
    const testingEl = (
      <input
        data-testid="myid"
        type="range"
        value={val}
        onChange={(e) => onSlide(e.currentTarget, setValue, true)}
      />
    );
    const setValue = (v) => {
      val = v;
    };
    const { getByTestId } = render(testingEl);
    const el = getByTestId("myid");
    fireEvent.change(el, { target: { value: "100" } });
    expect(val).toEqual("100");
  });
});

test("legend on slider renders", () => {
  expect(getLegendOnSlider(50, true)).toMatchSnapshot();
});

describe("Legend container", () => {
  test("Legend function should exist", () => {
    expect(typeof getLegend).toBeDefined();
  });

  test("Valid parameters should return valid element", () => {
    const { getByTestId } = render(
      getLegend("start", "label", "75", { backgroundColor: "red" }, true)
    );
    expect(getByTestId("legend-testid")).toMatchSnapshot();
  });

  test("Empty param", () => {
    const { getByTestId } = render(getLegend(null, null, null, null, true));
    expect(getByTestId("legend-testid")).toMatchSnapshot();
  });

  test("Invalid param", () => {
    const { getByTestId } = render(
      getLegend("Invalid value", null, null, null, true)
    );
    expect(getByTestId("legend-testid")).toMatchSnapshot();
  });

  test("Falsy alignment test", () => {
    const { getByTestId } = render(getLegend(null, null, null, null, true));
    expect(getByTestId("legend-testid")).toHaveClass("legend");
  });

  test("Truthy alignment test", () => {
    const { getByTestId } = render(getLegend("end", null, null, null, true));
    expect(getByTestId("legend-testid")).toHaveClass("legend end");
  });

  test("Truthy alignment test", () => {
    expect(getLegend("end", null, null, null, false)).toBeNull();
  });
});

describe("Slider rendering", () => {
  const sliderEl = (
    <RangeSlider
      value={50}
      min={0}
      max={100}
      step={1}
      sliderThumbShape="square"
      legend={true}
      legendLabel="Range: "
      legendPosition={"top"}
      legendAlignment={"end"}
    />
  );

  test("Slider is defined", () => {
    expect(RangeSlider).toBeDefined();
  });

  test("Slider renders", () => {
    const { getByTestId } = render(sliderEl);
    expect(getByTestId("range-slider-container-testid")).toMatchSnapshot();
  });

  test("Slider renders", () => {
    const { getByTestId } = render(sliderEl);
    const sliderValue = "100";
    const el = getByTestId("range-slider-container-testid").querySelector(
      "#rangeslider"
    );
    fireEvent.change(el, {
      target: { value: sliderValue }
    });
    expect(el.value).toEqual(sliderValue);
  });

  test("Legend should be rendered", () => {
    const { getByTestId } = render(sliderEl);
    expect(getByTestId("legend-testid")).toHaveClass("legend end");
  });
});

describe("Is integer test", () => {
  test("valid integer", () => {
    expect(isInteger(1)).toBeTruthy();
  });
  test("Valid string", () => {
    expect(isInteger("1")).toBeTruthy();
  });
  test("Invalid string", () => {
    expect(isInteger("a")).toBeFalsy();
  });
  test("null", () => {
    expect(isInteger(null)).toBeFalsy();
  });
  test("undefined", () => {
    expect(isInteger(undefined)).toBeFalsy();
  });
  test("Array", () => {
    expect(isInteger([])).toBeFalsy();
  });
  test("Object", () => {
    expect(isInteger({})).toBeFalsy();
  });
});

describe("Valid integer test", () => {
  test("Valid integer value renders", () => {
    const sliderEl = <RangeSlider value={75} min={10} max={90} step={2} />;
    const { getByTestId } = render(sliderEl);
    const el = getByTestId("range-slider-container-testid").querySelector(
      "#rangeslider"
    );
    expect(el).toMatchSnapshot();
  });
  test("Valid integer value renders", () => {
    const sliderEl = (
      <RangeSlider value={null} min={null} max={null} step={null} />
    );
    const { getByTestId } = render(sliderEl);
    const el = getByTestId("range-slider-container-testid").querySelector(
      "#rangeslider"
    );
    expect(el).toMatchSnapshot();
  });

  test("Valid range value", () => {
    expect(getSliderValue(1)).toEqual(1);
  });
  test("Invalid/Default range value", () => {
    expect(getSliderValue(null)).toEqual(0);
  });

  test("Valid min", () => {
    expect(getMin(1)).toEqual(1);
  });
  test("Invalid/Default min", () => {
    expect(getMin(null)).toEqual(0);
  });

  test("Valid max", () => {
    expect(getMax(1)).toEqual(1);
  });
  test("Invalid/Default max", () => {
    expect(getMax(null)).toEqual(100);
  });
  test("valid max < min", () => {
    expect(getMax(50, 60)).toEqual(60);
  });
  test("Invalid/Default max < min", () => {
    expect(getMax(50, 0)).toEqual(50);
  });

  test("Valid step", () => {
    expect(getStep(1)).toEqual(1);
  });
  test("Invalid/Default step", () => {
    expect(getStep(null)).toEqual(1);
  });
});
