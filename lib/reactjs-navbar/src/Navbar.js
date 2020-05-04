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
      {getBurgerMenu(props.onBurgerClick, props.fontColor)}
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
        style={getNavItemStyles(bgColor)}
      >
        <a href="#" style={getNavItemLinkStyles(fontColor)}>
          {item.text.toUpperCase()}
        </a>
        <span data-testid="nav-item-underline"></span>
      </li>
    );
  });

  items.push(getThemeModeIcon(mode, fontColor, bgColor));
  return items;
};

const getThemeModeIcon = (mode, fontColor, bgColor) => {
  const [isLightTheme, setIsLightTheme] = useState(mode === "light");
  return (
    <li
      key="theme-mode"
      className="nav-item theme-mode-icon"
      style={getThemeModeIconStyles(fontColor, bgColor)}
      onClick={(e) =>
        onThemeModeClick(
          e.currentTarget,
          "fade-in",
          isLightTheme,
          setIsLightTheme
        )
      }
    >
      {isLightTheme ? (
        <FaRegSun className="fade-in" />
      ) : (
        <FaRegMoon className="fade-in" />
      )}
    </li>
  );
};

const onThemeModeClick = (el, animationCls, isLightTheme, setIsLightTheme) => {
  setIsLightTheme(!isLightTheme);
  repeatAnimation(el, animationCls);
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

const getThemeModeIconStyles = (fontColor, bgColor) => {
  return {
    backgroundColor: bgColor,
    color: fontColor
  };
};

const getBurgerMenu = (onBurgerClick, fontColor) => {
  const [isBurgerClicked, setIsBurgerClicked] = useState(false);
  return (
    <div
      className="burger"
      onClick={(e) =>
        onBurgerClickHandler(
          e,
          isBurgerClicked,
          setIsBurgerClicked,
          onBurgerClick
        )
      }
    >
      <div className="burger-line" style={getBurgerLineStyles(fontColor)}></div>
      <div className="burger-line" style={getBurgerLineStyles(fontColor)}></div>
      <div className="burger-line" style={getBurgerLineStyles(fontColor)}></div>
    </div>
  );
};

const onBurgerClickHandler = (
  e,
  isBurgerClicked,
  setIsBurgerClicked,
  onBurgerClick
) => {
  const toggleValue = !isBurgerClicked;
  toggleClass(document.querySelector(".nav-items"), "is-active");
  toggleClass(e.currentTarget, "is-active");
  //setIsBurgerClicked(toggleValue);
  //onBurgerClick(toggleValue);
};

const getBurgerLineStyles = (fontColor) => {
  return {
    backgroundColor: fontColor
  };
};

const repeatAnimation = (el, animationCls) => {
  el.classList.remove(animationCls);
  setTimeout(() => {
    //el.classList.add(animationCls);
  }, 0);
};

const toggleClass = (el, cls) => {
  el.classList.toggle(cls);
};
