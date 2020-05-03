import "./Navbar.css";
import React, { useState } from "react";
import PropTypes from "prop-types";
import { FaRegSun, FaRegMoon } from "react-icons/fa";

const Navbar = (props) => {
  return (
    <nav className="navbar" style={getNavStyles(props.bgColor, props.height)}>
      <div className="nav-logo" style={getNavLogoStyles(props.fontColor)}>
        Mumbai Dev
      </div>
      <ul className="nav-items">
        {props.navItems &&
          getNavItems(
            props.navItems,
            props.bgColor,
            props.fontColor,
            props.height,
            props.themeMode
          )}
      </ul>
    </nav>
  );
};

Navbar.propTypes = {
  navItems: PropTypes.array,
  bgColor: PropTypes.string,
  fontColor: PropTypes.string,
  height: PropTypes.string,
  themeMode: PropTypes.string
};

export default Navbar;

const getNavItems = (navItems, bgColor, fontColor, height, mode) => {
  const items = navItems.map((item) => {
    return (
      <li
        key={item.text}
        className="nav-item"
        onClick={(e) => onNavItemClick(e)}
        style={getNavItemStyles(bgColor, height)}
      >
        <a href="#" style={getNavItemLinkStyles(fontColor)}>
          {item.text.toUpperCase()}
        </a>
        <span></span>
      </li>
    );
  });

  items.push(getThemeModeIcon(mode, fontColor));
  return items;
};

const getThemeModeIcon = (mode, fontColor) => {
  const [isLightTheme, setIsLightTheme] = useState(mode === "light");
  return (
    <li
      key="theme-mode"
      className="nav-item theme-mode-icon"
      style={getThemeModeIconStyles(fontColor)}
      onClick={() => setIsLightTheme(!isLightTheme)}
    >
      {isLightTheme ? <FaRegSun /> : <FaRegMoon />}
    </li>
  );
};

const onNavItemClick = (e) => {
  console.log(e.currentTarget);
};

const getNavStyles = (bgColor, height) => {
  return {
    backgroundColor: bgColor,
    height: height
  };
};

const getNavLogoStyles = (fontColor) => {
  return {
    color: fontColor
  };
};

const getNavItemStyles = (bgColor, height) => {
  return {
    backgroundColor: bgColor,
    height: height
  };
};

const getNavItemLinkStyles = (fontColor) => {
  return {
    color: fontColor
  };
};

const getThemeModeIconStyles = (fontColor) => {
  return {
    color: fontColor
  };
};
