/** External */
import React, { useState } from "react";
import classNames from "classnames";

/** Internal */
import classes from "./App.module.css";
import ArrowButton from "./ExpandButton/ArrowButton";
import TextSelectionMenu from "./TextSelectionMenu/TextSelectionMenu";

const App: React.FC<{}> = () => {
  const [isEditorExpanded, setIsEditorExpanded] = useState<boolean>(false);

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
        <ArrowButton
          position="right"
          isOpen={isEditorExpanded}
          onClick={toggleEditorVisibility}
        />
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
