import React from "react";
import RangeSlider from "@tmnrp/reactjs-range-slider";

const App = () => {
  return (
    <div>
      <div data-testid="myid">Hello World</div>
      <RangeSlider
        value={50}
        min={0}
        max={100}
        step={1}
        sliderThumbShape="square"
        legend={true}
        legendLabel="Range: "
        legendPosition="top"
        legendAlignment="end"
      />
    </div>
  );
};

export default App;
