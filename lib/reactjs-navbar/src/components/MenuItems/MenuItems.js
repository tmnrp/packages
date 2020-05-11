import "./MenuItems.css";
import React, { useState } from "react";

const MenuItems = (props) => {
  const navItems = {
    height: props.isMediaMatch ? "100%" : "calc(100vh - 70px)",
    flexDirection: props.isMediaMatch ? "row" : "column"
  };
  return (
    <ul className="tm-nav-items" style={navItems}>
      {getMenuItems(props.pageDetails, props.theme, props.onPageClickCallback)}
    </ul>
  );
};

const getMenuItems = (pageDetails, theme, onPageClickCallback) => {
  const [activeMenu, setActiveMenu] = useState(0);
  const getStyle = (isActiveMenu) => {
    const style = {
      backgroundColor: theme.bgColor
    };
    if (isActiveMenu) {
      style.color = theme.primaryColor;
    }
    return style;
  };
  const onClickHandler = (e, page, i) => {
    setActiveMenu(i);
    onPageClickCallback(e, page);
  };

  // render
  return pageDetails.map((page, i) => {
    const isActiveMenu = activeMenu === i;
    return (
      <li
        key={i}
        className={`tm-nav-item ${isActiveMenu ? "is-active" : ""}`}
        style={getStyle(isActiveMenu)}
        onClick={(e) => onClickHandler(e, page, i)}
      >
        <div className="tm-nav-item-wrap">
          <div>{page.icon}</div>
          <div>{page.name}</div>
        </div>
      </li>
    );
  });
};

export default MenuItems;
