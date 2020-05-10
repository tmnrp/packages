import "./MenuItems.css";
import React, { useState } from "react";

const MenuItems = (props) => {
  const navItems = {
    height: props.isMediaMatch ? "100%" : "calc(100vh - 70px)",
    flexDirection: props.isMediaMatch ? "row" : "column"
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
        <div className="tm-nav-item-wrap">
          <div>{page.icon}</div>
          <div>{page.name}</div>
        </div>
      </li>
    );
  });
};

export default MenuItems;
