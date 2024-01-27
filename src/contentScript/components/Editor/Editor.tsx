/** External */
import React, { useEffect } from "react";
import EditorJS from "@editorjs/editorjs";
import Header from "@editorjs/header";
import NestedList from "@editorjs/nested-list";
import CodeTool from "@editorjs/code";
import InlineCode from "@editorjs/inline-code";

/** Internal */
import classes from "./Editor.module.css";

const Editor = () => {
  useEffect(() => {
    initializeEditor();
  }, []);

  const initializeEditor = () => {
    new EditorJS({
      holder: "editorjs",

      /**
       * Available Tools list.
       * Pass Tool's class or Settings object for each Tool you want to use
       */
      tools: {
        header: Header,
        list: {
          class: NestedList,
          inlineToolbar: true,
          config: {
            defaultStyle: "unordered",
          },
        },
        code: CodeTool,
        inlineCode: {
          class: InlineCode,
          shortcut: "CMD+SHIFT+M",
        },
      },
      placeholder: "Let's remember only what's important",
    });
  };

  return (
    <div className={classes.container}>
      <div className={classes.header}>Notes</div>
      <div id="editorjs" className={classes.editorjs} />
    </div>
  );
};

export default Editor;
