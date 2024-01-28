/** External */
import React, { useEffect } from "react";

/** Internal */
import { getEditorInstance } from "../../modules/utils";
import classes from "./Editor.module.css";

const Editor = ({ editorRef }) => {
  useEffect(() => {
    const editor = getEditorInstance();
    editorRef.current = editor;
  }, []);

  return (
    <div className={classes.container}>
      <div className={classes.header}>Notes</div>
      <div id="editorjs" className={classes.editorjs} />
    </div>
  );
};

export default Editor;
