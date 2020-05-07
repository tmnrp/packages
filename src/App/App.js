import React from "react";
import RangeSlider from "@tmnrp/reactjs-range-slider";
import Navbar from "@tmnrp/reactjs-navbar";
import { useHistory } from "react-router-dom";
import { MdHome, MdContacts, MdWork, MdGroup } from "react-icons/md";

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
  const logo = "Mumbai Dev";
  const pageDetails = [
    {
      text: "Home",
      icon: <MdHome />
    },
    {
      text: "About",
      icon: <MdGroup />
    },
    {
      text: "Contact",
      icon: <MdContacts />
    },
    {
      text: "Career",
      icon: <MdWork />
    }
  ];
  return (
    <Navbar
      logo={logo}
      pageDetails={pageDetails}
      isLight={true}
      theme={{
        dark: {
          bgColor: "#374046",
          fontColor: "white",
          primaryColor: "#F34236"
        },
        light: {
          bgColor: "white",
          fontColor: "black",
          primaryColor: "#F34236"
        }
      }}
      height="70px"
      themeCallback={themeModeCallback}
      breakpoint={742}
      onPageClickCallback={(e, page) => onPageClickCallback(e, page, history)}
    />
  );
};

const onPageClickCallback = (e, page, history) => {
  console.log("Page: ", page);
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
