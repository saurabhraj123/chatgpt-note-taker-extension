/** External */
import React, { useEffect, useRef, useState } from "react";
import ReactDOM from "react-dom";
import { FiCopy } from "react-icons/fi";
import { TbFileImport } from "react-icons/tb";
import { HiOutlineBookOpen } from "react-icons/hi";

/** Internal */
import classes from "./TextSelectionMenu.module.css";
import {
  getParentRect,
  getSelectionMenuStyles,
  getSelectedTextOffsetParent,
  getSelectedTextBoundaryRect,
  checkShouldHideSelectionMenu,
} from "../../modules/utils";

const TextSelectionMenu = ({
  onClickCopy,
  onClickImport,
  onClickOpenNotebook,
}) => {
  const [containerStyles, setContainerStyles] = useState<{
    display?: string;
    top?: number;
    left?: number;
  } | null>(null);

  useEffect(() => {
    document.addEventListener("mouseup", handleMouseUp);

    return () => {
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, []);

  const iconContainerRef = useRef<HTMLDivElement>(null);
  const offsetParent = getSelectedTextOffsetParent();

  const icons = [
    {
      comp: <FiCopy />,
      classes: classes.icon,
      onClickHandler: onClickCopy,
    },
    {
      comp: <TbFileImport />,
      classes: classes.icon,
      onClickHandler: onClickImport,
    },
    {
      comp: <HiOutlineBookOpen />,
      classes: classes.icon,
      onClickHandler: onClickOpenNotebook,
    },
  ];

  const isSelectionMenuContainerClick = (e: MouseEvent) => {
    return iconContainerRef.current?.contains(e.target as Node);
  };

  const hideSelectionMenu = () => {
    setContainerStyles({ display: "none" });
  };

  const showSelectionMenu = () => {
    const parentRect = getParentRect();
    const selectedTextRect = getSelectedTextBoundaryRect();

    const styles = getSelectionMenuStyles(parentRect, selectedTextRect);
    setContainerStyles(styles);
  };

  const handleMouseUp = async (e: MouseEvent) => {
    if (isSelectionMenuContainerClick(e)) return;

    const shouldHideSelectionMenu = await checkShouldHideSelectionMenu();
    if (shouldHideSelectionMenu) {
      hideSelectionMenu();
      return;
    }

    showSelectionMenu();
  };

  const selectionMenuElement = (
    <div
      className={classes.container}
      style={containerStyles}
      ref={iconContainerRef}
    >
      {icons.map((icon, index) => (
        <div key={index} className={icon.classes} onClick={icon.onClickHandler}>
          {icon.comp}
        </div>
      ))}
    </div>
  );

  return offsetParent
    ? ReactDOM.createPortal(selectionMenuElement, offsetParent)
    : null;
};

export default TextSelectionMenu;
