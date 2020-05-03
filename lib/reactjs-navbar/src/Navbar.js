import "./Navbar.css";
import React from "react";
import PropTypes from "prop-types";

const Navbar = (props) => {
  return (
    <nav className="navbar" style={getNavStyles(props.bgColor, props.height)}>
      <div className="nav-logo" style={getNavLogoStyles(props.fontColor)}>
        Mumbai Dev
      </div>
      <ul className="nav-items">
        {props.navItems &&
          getNavItems(props.navItems, props.fontColor, props.height)}
      </ul>
    </nav>
  );
};

Navbar.propTypes = {
  navItems: PropTypes.array,
  bgColor: PropTypes.string,
  fontColor: PropTypes.string,
  height: PropTypes.string
};

export default Navbar;

const getNavItems = (navItems, fontColor, height) => {
  return navItems.map((item) => {
    return (
      <li
        key={item.text}
        className="nav-item"
        onClick={(e) => onNavItemClick(e)}
        style={getNavItemStyles(height)}
      >
        <a href="#" style={getNavItemLinkStyles(fontColor)}>
          {item.text.toUpperCase()}
        </a>
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

const getNavItemStyles = (height) => {
  return {
    height: height
  };
};

const getNavItemLinkStyles = (fontColor) => {
  return {
    color: fontColor
  };
};
