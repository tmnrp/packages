import React from "react";
import RangeSlider from "@tmnrp/reactjs-range-slider";
import Navbar from "@tmnrp/reactjs-navbar";

const App = () => {
  return (
    <div>
      <div data-testid="myid">Hello World</div>

      <h3>Navbar</h3>
      <Navbar />

      <h3>Range Slider Example</h3>
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
