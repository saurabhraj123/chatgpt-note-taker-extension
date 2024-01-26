export const checkHasSelection = () => {
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

export const getSelectionMenuStyles = (
  parentRect: DOMRect,
  selectedTextRect: DOMRect
) => {
  const { top: parentTop, left: parentLeft } = parentRect;
  const { top: selectedTextTop, left: selectedTextLeft } = selectedTextRect;

  return {
    display: "flex",
    top: selectedTextTop - parentTop - 20 - 19, // selcted text top - parent top - rect.height - 17
    left: selectedTextLeft - parentLeft,
  };
};

// offset parent is the closest ancestor element that is positioned
export const getSelectedTextOffsetParent = () => {
  const selection = window.getSelection();
  const offsetParent = selection?.anchorNode?.parentElement?.offsetParent;
  return offsetParent;
};

export const getSelectedTextBoundaryRect = () => {
  const selection = window.getSelection();
  const range = selection?.getRangeAt(0);
  const rect = range?.getBoundingClientRect();

  return rect;
};

export const checkShouldHideSelectionMenu = async () => {
  return !((await checkHasSelection()) && getSelectedTextOffsetParent());
};

export const getParentRect = () => {
  const parent = getSelectedTextOffsetParent();
  const parentRect = parent.getBoundingClientRect();
  return parentRect;
};

export const getExpandButtonStyles = (direction: number) => {
  return { tranform: "translateY(0.15rem) rotate(0deg) translateZ(0px);" };
};
