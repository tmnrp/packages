import React from "react";
import RangeSlider from "@tmnrp/reactjs-range-slider";
import Navbar from "@tmnrp/reactjs-navbar";

const App = () => {
  const onNavBurgerClick = (e) => {
    console.log(e.currentTarget);
  };
  return (
    <div>
      {getNavbar()}
      <h3>Navbar</h3>

      <div data-testid="myid">Hello World</div>

      <h3>Range Slider Example</h3>
      {getRangeSlider()}
    </div>
  );
};

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

const getNavbar = (onNavBurgerClick) => {
  const navItems = [
    {
      text: "Home"
    },
    {
      text: "About"
    },
    {
      text: "Contact"
    }
  ];
  return (
    <Navbar
      navItems={navItems}
      bgColor="#121212"
      fontColor="white"
      height="70px"
      themeMode="dark"
      onNavBurgerClick={onNavBurgerClick}
    />
  );
};

export default App;
