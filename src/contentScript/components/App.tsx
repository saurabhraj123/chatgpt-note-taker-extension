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

  const handleClickCopy = (e: MouseEvent) => {
    console.log("Copy");
    e.stopPropagation();
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
        onClickImport={() => {}}
        onClickOpenNotebook={() => {}}
      />
    </>
  );
};

export default App;
