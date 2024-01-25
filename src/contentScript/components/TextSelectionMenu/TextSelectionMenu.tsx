/** External */
import React, { useEffect, useRef, useState } from "react";
import ReactDOM from "react-dom";
import { FiCopy } from "react-icons/fi";
import { TbFileImport } from "react-icons/tb";
import { HiOutlineBookOpen } from "react-icons/hi";

/** Internal */
import classes from "./TextSelectionMenu.module.css";

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

  const iconContainerRef = useRef<HTMLDivElement>(null);

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

  useEffect(() => {
    document.addEventListener("mousedown", handleMouseDown);
    document.addEventListener("mouseup", handleMouseUp);
    // document.addEventListener("keyup", handleMouseUp);

    return () => {
      document.addEventListener("mousedown", handleMouseDown);
      document.removeEventListener("mouseup", handleMouseUp);
      //   document.removeEventListener("keyup", handleSelectionChange);
    };
  });

  const handleMouseDown = (e: MouseEvent) => {
    if (iconContainerRef.current?.contains(e.target as Node)) {
      return;
    }
  };

  // offset parent is the closest ancestor element that is positioned
  const getSelectedTextOffsetParent = () => {
    const selection = window.getSelection();
    const offsetParent = selection?.anchorNode?.parentElement?.offsetParent;

    return offsetParent;
  };

  const getSelectedTextBoundaryRect = () => {
    const selection = window.getSelection();
    const range = selection?.getRangeAt(0);
    const rect = range?.getBoundingClientRect();

    return rect;
  };

  const checkHasSelection = () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const selection = window.getSelection();
        if (selection?.toString()) {
          resolve(true);
        } else {
          resolve(false);
        }
      });
    });
  };

  const handleMouseUp = async (e: MouseEvent) => {
    if (iconContainerRef.current?.contains(e.target as Node)) {
      return;
    }

    const hasSelection = await checkHasSelection();
    if (!hasSelection) {
      setContainerStyles({ display: "none" });
      return;
    }

    const selection = window.getSelection();
    const parent = getSelectedTextOffsetParent();
    const parentRect = parent?.getBoundingClientRect();
    const { top, left } = parentRect || {};

    const range = selection?.getRangeAt(0);

    const rect = getSelectedTextBoundaryRect();

    const selectedTextTop = rect?.top;
    const selectedTextLeft = rect?.left;

    const styles = {
      display: "flex",
      top: selectedTextTop - top - 20 - 19, // selcted text top - parent top - rect.height - 17
      left: selectedTextLeft - left,
    };

    setContainerStyles(styles);
  };

  const offsetParent = getSelectedTextOffsetParent();

  return offsetParent
    ? ReactDOM.createPortal(
        <div
          className={classes.container}
          style={containerStyles}
          ref={iconContainerRef}
        >
          {icons.map((icon, index) => (
            <div
              key={index}
              className={icon.classes}
              onClick={icon.onClickHandler}
            >
              {icon.comp}
            </div>
          ))}
        </div>,
        offsetParent
      )
    : null;
};

export default TextSelectionMenu;
