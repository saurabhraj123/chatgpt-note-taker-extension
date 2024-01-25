/** External */
import React, { useState } from "react";
import classNames from "classnames";

/** Internal */
import TextSelectionMenu from "./TextSelectionMenu/TextSelectionMenu";
import classes from "./App.module.css";

const App: React.FC<{}> = () => {
  const [isEditorExpanded, setIsEditorExpanded] = useState<Boolean>(false);

  const toggleEditorVisibility = () => {
    setIsEditorExpanded(!isEditorExpanded);
  };

  const containerClasses = classNames(classes.container, {
    [classes.containerExpanded]: isEditorExpanded,
  });

  const focusTextArea = () => {
    document.querySelector("textarea").focus();
  };

  const handleClickCopy = (selectedText: string) => {
    navigator.clipboard.writeText(selectedText);
  };

  const handleClickReply = (selectedText: string) => {
    const textarea = document.querySelector("textarea");
    textarea.value = selectedText;

    focusTextArea();

    // Trigger input event to mimic user keyboard input
    const inputEvent = new Event("input", { bubbles: true });
    textarea.dispatchEvent(inputEvent);
  };

  return (
    <>
      <div className={containerClasses}>
        <div className={classes.toggleIcon} onClick={toggleEditorVisibility}>
          {isEditorExpanded ? "Close" : "Open"}
        </div>
      </div>

      <TextSelectionMenu
        onClickCopy={handleClickCopy}
        onClickReply={handleClickReply}
        onClickImport={() => {}}
        onClickOpenNotebook={() => {}}
      />
    </>
  );
};

export default App;
