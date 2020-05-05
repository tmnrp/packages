import React from "react";
import RangeSlider from "@tmnrp/reactjs-range-slider";
import Navbar from "@tmnrp/reactjs-navbar";
import { useHistory } from "react-router-dom";

const App = () => {
  const history = useHistory();
  return (
    <div>
      {getNavbar(history)}
      <div>
        <h3>Range Slider Example</h3>
        {getRangeSlider()}
      </div>
    </div>
  );
};

const getNavbar = (history) => {
  const pageDetails = [
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
      pageDetails={pageDetails}
      bgColor="#121212"
      fontColor="white"
      height="70px"
      isLight={true}
      themeCallback={themeModeCallback}
      onPageClickCallback={(e, page) => onPageClickCallback(e, page, history)}
    />
  );
};

const onPageClickCallback = (e, page, history) => {
  history.push(`/packages/${page}`);
};

const themeModeCallback = (isLight) => {
  console.log("is light mode on", isLight);
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

export default App;
