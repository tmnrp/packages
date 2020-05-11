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
      name: "Home",
      icon: <MdHome />
    },
    {
      name: "About",
      icon: <MdGroup />
    },
    {
      name: "Contact",
      icon: <MdContacts />
    },
    {
      name: "Career",
      icon: <MdWork />
    }
  ];
  return (
    <Navbar
      logo={logo}
      pageDetails={pageDetails}
      theme={{
        isLight: true,
        primaryColor: "#f44336",
        dark: {
          bgColor: "#374046",
          fontColor: "white"
        },
        light: {
          bgColor: "white",
          fontColor: "#374046"
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
  history.push(`/packages/${page.name.toLowerCase()}`);
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
