import "./Navbar.css";
import React, { useState } from "react";
import PropTypes from "prop-types";
import { WiDaySunny, WiNightClear } from "react-icons/wi";

const Navbar = (props) => {
  const { pageDetails, isLight } = props;

  // default styles
  const { bgColor, fontColor, primaryColor, height } = props;
  const defaultStyleAttr = {
    bgColor: bgColor,
    fontColor: fontColor,
    primaryColor: primaryColor,
    height: height
  };

  // callbacks
  const { themeCallback, onPageClickCallback } = props;

  // process navbar
  const pageItems = getPageItems(
    pageDetails,
    defaultStyleAttr,
    onPageClickCallback
  );
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
        {pageItems.concat(themeIcon)}
      </ul>

      {/**Burger menu */}
      {getBurgerMenu(defaultStyleAttr)}
    </nav>
  );
};

Navbar.propTypes = {
  pageDetails: PropTypes.array,
  bgColor: PropTypes.string,
  fontColor: PropTypes.string,
  height: PropTypes.string,
  themeMode: PropTypes.string
};

export default Navbar;

const getPageItems = (pageDetails, defaultStyleAttr, onPageClickCallback) => {
  const [activeItem, setActiveItem] = useState(0);
  const cls = "nav-item";
  return pageDetails.map((pageItem, index) => {
    const isActive = index === activeItem;
    return (
      <li
        key={pageItem.text}
        className={isActive ? `${cls} is-active` : cls}
        onClick={(e) =>
          onNavItemClick(
            e,
            index,
            setActiveItem,
            pageItem.text,
            onPageClickCallback
          )
        }
        style={getNavItemStyles(defaultStyleAttr.bgColor)}
      >
        <a href="#" style={getNavItemLinkStyles(defaultStyleAttr, isActive)}>
          {pageItem.text.toUpperCase()}
        </a>
        <span
          style={getNavItemUnderlineStyles(defaultStyleAttr, isActive)}
        ></span>
      </li>
    );
  });
};

const onNavItemClick = (e, index, setActiveItem, page, onPageClickCallback) => {
  setActiveItem(index);
  onPageClickCallback(e, page);
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

const getNavItemLinkStyles = (defaultStyleAttr, isActive) => {
  return {
    color: isActive ? defaultStyleAttr.primaryColor : defaultStyleAttr.fontColor
  };
};

const getNavItemUnderlineStyles = (defaultStyleAttr, isActive) => {
  return {
    backgroundColor: isActive
      ? defaultStyleAttr.primaryColor
      : defaultStyleAttr.fontColor
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
const getBurgerMenu = (defaultStyleAttr) => {
  const [isActive, setIsActive] = useState(false);
  const { fontColor, primaryColor } = defaultStyleAttr;
  const color = isActive ? primaryColor : fontColor;
  return (
    <div
      className="burger"
      onClick={(e) => onBurgerClickHandler(e, isActive, setIsActive)}
    >
      <div className="burger-line" style={getBurgerLineStyles(color)}></div>
      <div className="burger-line" style={getBurgerLineStyles(color)}></div>
      <div className="burger-line" style={getBurgerLineStyles(color)}></div>
    </div>
  );
};

const onBurgerClickHandler = (e, isActive, setIsActive) => {
  setIsActive(!isActive);
  // for animation
  toggleClass(document.querySelector(".nav-items"), "is-active");
  toggleClass(e.currentTarget, "is-active");
};

const getBurgerLineStyles = (color) => {
  return {
    backgroundColor: color
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
