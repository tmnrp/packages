import "./ThemeModeButton.css";
import React, { useState } from "react";
import { WiDaySunny, WiNightClear } from "react-icons/wi";

const ThemeModeButton = (props) => {
  const [isLight, setIsLight] = useState(props.isLight);
  const onThemeModeClick = (e) => {
    const currentMode = !isLight;
    setIsLight(currentMode);
    props.callback(currentMode);
  };

  // render
  return (
    <div className="tm-theme-mode" onClick={(e) => onThemeModeClick(e)}>
      {isLight ? <WiNightClear /> : <WiDaySunny className="sun" />}
    </div>
  );
};

export default ThemeModeButton;
