import React, { useState } from "react";
import classNames from "classnames";
import classes from "./ArrowButton.module.css";

interface ArrowProps {
  position: "left" | "right";
  isOpen: boolean;
  onClick: () => void;
}

const ArrowButton = ({ position, isOpen, onClick }: ArrowProps) => {
  const [isHovered, setIsHovered] = useState(false);

  const upperLineClasses = classNames(classes.line, classes.upperLine, {
    [classes.rotateUp]: !isOpen && position === "right",
    [classes.rotateDown]: !isOpen && position === "left",
    [classes.rotateUpHover]: isHovered && isOpen && position === "right",
    [classes.rotateDownHover]: isHovered && isOpen && position === "left",
  });

  const lowerLineClasses = classNames(classes.line, classes.lowerLine, {
    [classes.rotateDown]: !isOpen && position === "right",
    [classes.rotateUp]: !isOpen && position === "left",
    [classes.rotateDownHover]: isHovered && isOpen && position === "right",
    [classes.rotateUpHover]: isHovered && isOpen && position === "left",
  });

  const handleMouseOver = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <div
      className={classes.container}
      onClick={onClick}
      onMouseOver={handleMouseOver}
      onMouseLeave={handleMouseLeave}
    >
      <div className={upperLineClasses} />
      <div className={lowerLineClasses} />
    </div>
  );
};

export default ArrowButton;
