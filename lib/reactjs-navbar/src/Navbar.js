import "./Navbar.css";
import React, { useState, useEffect } from "react";
import ThemeModeButton from "./components/ThemeModeButton/ThemeModeButton";
import BurgerButton from "./components/BurgerButton/BurgerButton";
import MenuItems from "./components/MenuItems/MenuItems";

const Navbar = (props) => {
  const logo = props.logo;
  const [isMenuActive, setIsMenuActive] = useState(false);
  const [isLight, setIsLight] = useState(props.theme.isLight);
  const currentTheme = isLight ? props.theme.light : props.theme.dark;
  currentTheme.primaryColor = props.theme.primaryColor;
  const navStyles = {
    backgroundColor: currentTheme.bgColor,
    color: currentTheme.fontColor
  };
  const navItemsStyles = {
    backgroundColor: currentTheme.bgColor,
    color: currentTheme.fontColor,
    width: isMenuActive ? "70%" : "0px"
  };
  const themeModeBtnCallback = (mode) => {
    setIsLight(mode);
  };
  const burgerBtnCallback = (isActive) => {
    setIsMenuActive(isActive);
  };

  return (
    <nav
      id="tm-nav"
      className="default tm-bgcolor-ease-in-out"
      style={navStyles}
    >
      <div className="tm-logo-container">
        {/**Your logo */}
        {logo}
      </div>

      <div className="tm-nav-items-container" style={navItemsStyles}>
        {/**Nav items */}
        {<MenuItems pageDetails={props.pageDetails} theme={currentTheme} />}
      </div>

      {/**ThemeModeButton + BurgerButton Wrapper */}
      <div className="tm-theme-mode-burger-wrap">
        <div className="tm-theme-mode-container">
          {/**ThemeModeButton */}
          <ThemeModeButton
            isLight={isLight}
            theme={currentTheme}
            callback={themeModeBtnCallback}
          />
        </div>

        <div className="tm-burger-container">
          {/**BurgerButton */}
          <BurgerButton
            isMenuActive={isMenuActive}
            isLight={isLight}
            theme={currentTheme}
            callback={burgerBtnCallback}
          />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
