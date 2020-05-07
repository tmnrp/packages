import "./Navbar.css";
import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { WiDaySunny, WiNightClear } from "react-icons/wi";

const clsIsActive = "is-active";

const Navbar = (props) => {
  // Dynamic media query as per users break point
  const mediaMatch = `(min-width: ${props.breakpoint}px)`;
  const [isMediaMatch, setIsMediaMatch] = useState(
    window.matchMedia(mediaMatch).matches
  );
  useEffect(() => {
    window
      .matchMedia(mediaMatch)
      .addListener((e) => matchMediaHandler(e, setIsMediaMatch));
  }, []);

  // callbacks
  const { themeCallback, onPageClickCallback } = props;

  // User provided Styles
  const { logo, pageDetails, isLight, height } = props;

  // default styles
  const [currentTheme, setCurrentTheme] = useState(
    isLight ? props.theme.light : props.theme.dark
  );
  const { bgColor, fontColor, primaryColor } = currentTheme;
  const defaultStyleAttr = {
    bgColor: bgColor,
    fontColor: fontColor,
    primaryColor: primaryColor,
    height: height,
    isMediaMatch: isMediaMatch
  };

  // process navbar
  const pageItems = getPageItems(
    pageDetails,
    defaultStyleAttr,
    onPageClickCallback
  );
  const themeIcon = getThemeModeIcon(
    isLight,
    defaultStyleAttr,
    props.theme,
    setCurrentTheme,
    themeCallback
  );
  const burgerButton = getBurgerMenu(defaultStyleAttr);

  const icon1 = pageDetails[0].icon;
  // render
  return (
    //navbar container
    <nav id="tm-nav" style={getNavStyles(bgColor, height)}>
      {/**Logo */}
      <div className="tm-nav-logo" style={getNavLogoStyles(fontColor)}>
        {logo}
      </div>

      <div className="tm-wrap-row">
        {/**Menu Items Container */}
        {pageItems}

        {/**Theme Mode icon */}
        {themeIcon}

        {/**Burger menu */}
        {burgerButton}
      </div>
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
  const cls = "tm-nav-item";
  return (
    <ul className="tm-nav-items" style={getNavItemsStyles(defaultStyleAttr)}>
      {pageDetails.map((pageItem, index) => {
        const isActive = index === activeItem;
        return (
          <li
            key={pageItem.text}
            className={isActive ? `${cls} ${clsIsActive}` : cls}
            style={getNavItemStyles(defaultStyleAttr)}
            onClick={(e) =>
              onNavItemClick(
                e,
                index,
                setActiveItem,
                pageItem.text,
                onPageClickCallback
              )
            }
          >
            <div className="tm-nav-item-wrap">
              <span
                className="tm-nav-item-icon"
                style={getNavItemIconStyles(defaultStyleAttr, isActive)}
              >
                {pageItem.icon}
              </span>
              <a
                href="#"
                style={getNavItemLinkStyles(defaultStyleAttr, isActive)}
              >
                {pageItem.text.toUpperCase()}
              </a>
            </div>
            <div
              className="tm-nav-item-underline"
              style={getNavItemUnderlineStyles(defaultStyleAttr, isActive)}
            ></div>
          </li>
        );
      })}
    </ul>
  );
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

const getNavItemsStyles = (defaultStyleAttr) => {
  const style = { top: defaultStyleAttr.height };
  if (defaultStyleAttr.isMediaMatch) {
    style["top"] = "0px";
    style["position"] = "relative";
    style["width"] = "100%";
    style["flexDirection"] = "row";
    style["height"] = defaultStyleAttr.height;
  }
  return style;
};
const getNavItemStyles = (defaultStyleAttr) => {
  const style = {
    backgroundColor: defaultStyleAttr.bgColor
  };

  if (defaultStyleAttr.isMediaMatch) {
    style["height"] = "100%";
    style["padding"] = "5px";
  }

  return style;
};

const getNavItemLinkStyles = (defaultStyleAttr, isActive) => {
  return {
    color: isActive ? defaultStyleAttr.primaryColor : defaultStyleAttr.fontColor
  };
};

const getNavItemIconStyles = (defaultStyleAttr, isActive) => {
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
const getThemeModeIcon = (
  isThemeLight,
  defaultStyleAttr,
  theme,
  setCurrentTheme,
  themeCallback
) => {
  const [isLight, setIsLight] = useState(isThemeLight);
  const animationCls = "fade-in";

  //render
  return (
    <div
      className="tm-theme-mode-icon"
      style={getThemeModeIconStyles(
        defaultStyleAttr.fontColor,
        defaultStyleAttr.bgColor
      )}
      onClick={(e) =>
        onThemeModeClick(
          e,
          isLight,
          setIsLight,
          theme,
          setCurrentTheme,
          animationCls,
          themeCallback
        )
      }
    >
      {isLight ? (
        <WiDaySunny className={animationCls} />
      ) : (
        <WiNightClear className={animationCls} />
      )}
    </div>
  );
};

const onThemeModeClick = (
  e,
  isLight,
  setIsLight,
  theme,
  setCurrentTheme,
  animationCls,
  themeCallback
) => {
  const mode = !isLight;
  setIsLight(mode);
  setCurrentTheme(mode ? theme.light : theme.dark);
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
  const style = getBurgerLineStyles(color);
  return (
    <div
      id="tm-burger"
      style={getBurgerStyle(defaultStyleAttr)}
      onClick={(e) => onBurgerClickHandler(e, isActive, setIsActive)}
    >
      <div className="tm-burger-line" style={style}></div>
      <div className="tm-burger-line" style={style}></div>
      <div className="tm-burger-line" style={style}></div>
    </div>
  );
};

const onBurgerClickHandler = (e, isActive, setIsActive) => {
  setIsActive(!isActive);
  // Animation X pattern
  toggleClass(e.currentTarget, clsIsActive);

  // show menu items
  toggleClass(document.querySelector(".tm-nav-items"), clsIsActive);
};

const getBurgerStyle = (defaultStyleAttr) => {
  const style = {};
  if (defaultStyleAttr.isMediaMatch) {
    style["display"] = "none";
  }
  return style;
};

const getBurgerLineStyles = (color) => {
  return {
    backgroundColor: color
  };
};

// -----------------------------------------------
const matchMediaHandler = (e, setIsMediaMatch) => {
  console.log(e.matches);
  setIsMediaMatch(e.matches);
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
