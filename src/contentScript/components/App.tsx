/** External */
import React, { useState } from "react";
import classNames from "classnames";

/** Internal */
import classes from "./App.module.css";

const App: React.FC<{}> = () => {
  const [isEditorExpanded, setIsEditorExpanded] = useState<Boolean>(false);

  const toggleEditorVisibility = () => {
    setIsEditorExpanded(!isEditorExpanded);
  };

  const containerClasses = classNames(classes.container, {
    [classes.containerExpanded]: isEditorExpanded,
  });

  return (
    <div className={containerClasses}>
      <div className={classes.toggleIcon} onClick={toggleEditorVisibility}>
        {isEditorExpanded ? "Close" : "Open"}
      </div>

      <div>Editor</div>
    </div>
  );
};

export default App;
