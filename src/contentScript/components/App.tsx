/** External */
import React, { useState, useRef } from "react";
import classNames from "classnames";

/** Internal */
import Editor from "./Editor";
import classes from "./App.module.css";
import ArrowButton from "./ExpandButton/ArrowButton";
import TextSelectionMenu from "./TextSelectionMenu/TextSelectionMenu";
import {
  importParagraphAtTheEnd,
  importHeadingAtTheEnd,
} from "../modules/utils";

const App: React.FC<{}> = () => {
  const [isEditorVisible, setIsEditorVisible] = useState<boolean>(false);

  const editorRef = useRef(null);

  const toggleEditorVisibility = () => {
    setIsEditorVisible(!isEditorVisible);
  };

  const editorClasses = classNames(classes.editorContainer, {
    [classes.showEditor]: isEditorVisible,
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

  const handleClickImport = (selectedText: string) => {
    importParagraphAtTheEnd(selectedText, editorRef.current);
    setIsEditorVisible(true);
  };

  const handleClickImportWithQuestion = (
    questionText: string,
    selectedText: string
  ) => {
    if (questionText) importHeadingAtTheEnd(questionText, editorRef.current);
    importParagraphAtTheEnd(selectedText, editorRef.current);
    setIsEditorVisible(true);
  };

  return (
    <>
      <div className={editorClasses}>
        <Editor editorRef={editorRef} />
        <ArrowButton
          position="right"
          isOpen={isEditorVisible}
          onClick={toggleEditorVisibility}
        />
      </div>

      <TextSelectionMenu
        onClickCopy={handleClickCopy}
        onClickReply={handleClickReply}
        onClickImport={handleClickImport}
        onClickImportWithQuestion={handleClickImportWithQuestion}
        onClickOpenNotebook={() => setIsEditorVisible(true)}
      />
    </>
  );
};

export default App;
