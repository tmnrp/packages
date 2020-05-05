import React from "react";
import RangeSlider from "@tmnrp/reactjs-range-slider";
import Navbar from "@tmnrp/reactjs-navbar";

const App = () => {
  return (
    <div>
      {getNavbar()}
      <div>
        <h3>Range Slider Example</h3>
        {getRangeSlider()}
      </div>
    </div>
  );
};

/*
<h3>Navbar</h3>

      <div data-testid="myid">Hello World</div>

      
*/

const getRangeSlider = () => {
  return (
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
  );
};

const getNavbar = () => {
  const navItems = [
    {
      text: "Home"
    },
    {
      text: "About"
    },
    {
      text: "Contact"
    },
    {
      text: "Career"
    }
  ];
  return (
    <Navbar
      navItems={navItems}
      bgColor="#121212"
      fontColor="white"
      height="70px"
      isLight={true}
      themeCallback={themeModeCallback}
    />
  );
};

const themeModeCallback = (mode) => {
  console.log("current mode", mode);
};

export default App;
