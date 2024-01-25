/** External */
import React, { useEffect, useRef, useState } from "react";
import ReactDOM from "react-dom";
import { FiCopy } from "react-icons/fi";
import { TbFileImport } from "react-icons/tb";
import { HiOutlineBookOpen } from "react-icons/hi";
import { TiTick } from "react-icons/ti";
import { BsReply } from "react-icons/bs";

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
  onClickReply,
  onClickImport,
  onClickOpenNotebook,
}) => {
  const [containerStyles, setContainerStyles] = useState<{
    display?: string;
    top?: number;
    left?: number;
  } | null>(null);
  const [isCopyIconClicked, setIsCopyIconClicked] = useState(false);

  useEffect(() => {
    document.addEventListener("mouseup", handleMouseUp);

    return () => {
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, []);

  const iconContainerRef = useRef<HTMLDivElement>(null);
  const selectedTextRef = useRef(null);
  const offsetParent = getSelectedTextOffsetParent();

  const getSelectedText = () => {
    const selection = window.getSelection();
    return selection.toString().trim();
  };

  const handleClickCopy = (e: MouseEvent) => {
    const selectedText = getSelectedText();
    onClickCopy(selectedText);
    setIsCopyIconClicked(true);

    setTimeout(() => {
      setIsCopyIconClicked(false);
    }, 2000);
  };

  const hideSelectionMenu = () => {
    setContainerStyles({ display: "none" });
  };

  const saveSelection = () => {
    const selection = window.getSelection();
    if (selection && !selection.isCollapsed) {
      selectedTextRef.current = {
        text: selection.toString(),
        range: selection.getRangeAt(0),
        anchorNode: selection.anchorNode,
        focusNode: selection.focusNode,
      };
    }
  };

  const resetSavedSelection = () => {
    selectedTextRef.current = null;
  };

  const handleClickReply = () => {
    hideSelectionMenu();
    resetSavedSelection();

    const selectedText = getSelectedText();
    onClickReply(selectedText);
  };

  const isSelectionMenuContainerClick = (e: MouseEvent) => {
    return iconContainerRef.current?.contains(e.target as Node);
  };

  const showSelectionMenu = () => {
    const parentRect = getParentRect();
    const selectedTextRect = getSelectedTextBoundaryRect();

    const styles = getSelectionMenuStyles(parentRect, selectedTextRect);
    setContainerStyles(styles);

    saveSelection();
  };

  const applySavedSelection = () => {
    const savedSelection = selectedTextRef.current;
    if (savedSelection) {
      const selection = window.getSelection();
      selection.removeAllRanges();
      selection.addRange(savedSelection.range);
    }
  };

  const handleMouseUp = async (e: MouseEvent) => {
    if (isSelectionMenuContainerClick(e)) {
      applySavedSelection();
      return;
    }

    const shouldHideSelectionMenu = await checkShouldHideSelectionMenu();
    if (shouldHideSelectionMenu) {
      if (!selectedTextRef.current) return;

      hideSelectionMenu();
      resetSavedSelection();
      return;
    }

    showSelectionMenu();
  };

  const icons = [
    {
      comp: isCopyIconClicked ? <TiTick /> : <FiCopy />,
      classes: classes.icon,
      onClickHandler: handleClickCopy,
    },
    {
      comp: <BsReply />,
      classes: classes.icon,
      onClickHandler: handleClickReply,
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
