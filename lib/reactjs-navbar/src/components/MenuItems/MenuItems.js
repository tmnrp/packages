import "./MenuItems.css";
import React, { useState } from "react";

const MenuItems = (props) => {
  const navItems = {
    height: "calc(100vh - 70px)"
  };
  return (
    <ul className="tm-nav-items" style={navItems}>
      {getMenuItems(props.pageDetails, props.theme)}
    </ul>
  );
};

const getMenuItems = (pageDetails, theme) => {
  const [activeMenu, setActiveMenu] = useState(0);
  const style = {
    backgroundColor: theme.bgColor
  };
  const onClickHandler = (i) => {
    setActiveMenu(i);
  };

  // render
  return pageDetails.map((page, i) => {
    return (
      <li
        key={i}
        className={`tm-nav-item ${activeMenu === i ? "is-active" : ""}`}
        style={style}
        onClick={(e) => onClickHandler(i)}
      >
        <div>{page.icon}</div>
        <div>{page.name}</div>
      </li>
    );
  });
};

export default MenuItems;
