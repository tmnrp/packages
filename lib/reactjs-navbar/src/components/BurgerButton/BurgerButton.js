import "./BurgerButton.css";
import React, { useState } from "react";

const BurgerButton = (props) => {
  const [isActive, setIsActive] = useState(props.isMenuActive);
  const clsIsActive = "is-active";
  const clsBurger = `tm-burger ${isActive ? clsIsActive : ""}`;
  const onBurgerBtnClick = (e) => {
    const currentState = !isActive;
    setIsActive(currentState);
    props.callback(currentState);
  };
  const burgerLineStyles = {
    backgroundColor: isActive ? props.theme.primaryColor : props.theme.fontColor
  };

  // render
  return (
    <div className={clsBurger} onClick={(e) => onBurgerBtnClick(e)}>
      <div className="tm-burger-line" style={burgerLineStyles}></div>
      <div className="tm-burger-line" style={burgerLineStyles}></div>
      <div className="tm-burger-line" style={burgerLineStyles}></div>
    </div>
  );
};

export default BurgerButton;
