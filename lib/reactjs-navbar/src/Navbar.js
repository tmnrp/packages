import "./Navbar.css";
import React, { useState } from "react";
import PropTypes from "prop-types";
import { WiDaySunny, WiNightClear } from "react-icons/wi";

const Navbar = (props) => {
  // default styles
  const { bgColor, fontColor, height } = props;
  const defaultStyleAttr = {
    bgColor: bgColor,
    fontColor: fontColor,
    height: height
  };
  const { navItems, isLight, themeCallback } = props;
  const menuItems = getNavMenuItems(navItems, defaultStyleAttr);
  const themeIcon = getThemeModeIcon(isLight, defaultStyleAttr, themeCallback);

  // render
  return (
    //navbar container
    <nav className="navbar" style={getNavStyles(bgColor, height)}>
      {/**Logo */}
      <div className="nav-logo" style={getNavLogoStyles(fontColor)}>
        Mumbai Dev
      </div>

      {/**Menu Items Container */}
      <ul className="nav-items">
        {/**Menu Items and Theme Icon */}
        {menuItems.concat(themeIcon)}
      </ul>

      {/**Burger menu */}
      {getBurgerMenu(fontColor)}
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

const getNavMenuItems = (navItems, defaultStyleAttr) => {
  return navItems.map((item) => {
    return (
      <li
        key={item.text}
        className="nav-item"
        onClick={(e) => onNavItemClick(e)}
        style={getNavItemStyles(defaultStyleAttr.bgColor)}
      >
        <a href="#" style={getNavItemLinkStyles(defaultStyleAttr.fontColor)}>
          {item.text.toUpperCase()}
        </a>
        <span data-testid="nav-item-underline"></span>
      </li>
    );
  });
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

const getNavItemStyles = (bgColor) => {
  return {
    backgroundColor: bgColor
  };
};

const getNavItemLinkStyles = (fontColor) => {
  return {
    color: fontColor
  };
};

// ThemeMode -----------------------------------------------------------
const getThemeModeIcon = (isThemeLight, defaultStyleAttr, themeCallback) => {
  const [isLight, setIsLight] = useState(isThemeLight);
  const animationCls = "fade-in";

  //render
  return (
    <li
      key="theme-mode"
      className="nav-item theme-mode-icon"
      style={getThemeModeIconStyles(
        defaultStyleAttr.fontColor,
        defaultStyleAttr.bgColor
      )}
      onClick={(e) =>
        onThemeModeClick(e, isLight, setIsLight, animationCls, themeCallback)
      }
    >
      {isLight ? (
        <WiDaySunny className={animationCls} />
      ) : (
        <WiNightClear className={animationCls} />
      )}
    </li>
  );
};

const onThemeModeClick = (
  e,
  isLight,
  setIsLight,
  animationCls,
  themeCallback
) => {
  const mode = !isLight;
  setIsLight(mode);
  repeatAnimation(e.currentTarget, animationCls);
  themeCallback(mode);
};

const getThemeModeIconStyles = (fontColor, bgColor) => {
  return {
    backgroundColor: bgColor,
    color: fontColor
  };
};

// Burger -----------------------------------------------------------
const getBurgerMenu = (fontColor) => {
  return (
    <div className="burger" onClick={(e) => onBurgerClickHandler(e)}>
      <div className="burger-line" style={getBurgerLineStyles(fontColor)}></div>
      <div className="burger-line" style={getBurgerLineStyles(fontColor)}></div>
      <div className="burger-line" style={getBurgerLineStyles(fontColor)}></div>
    </div>
  );
};

const onBurgerClickHandler = (e) => {
  toggleClass(document.querySelector(".nav-items"), "is-active");
  toggleClass(e.currentTarget, "is-active");
};

const getBurgerLineStyles = (fontColor) => {
  return {
    backgroundColor: fontColor
  };
};

// Helper classes -----------------------------------------------------------
const repeatAnimation = (el, animationCls) => {
  el.classList.remove(animationCls);
  setTimeout(() => {
    //el.classList.add(animationCls);
  }, 0);
};

const toggleClass = (el, cls) => {
  el.classList.toggle(cls);
};
