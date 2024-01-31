/** External */
import EditorJS from "@editorjs/editorjs";
import Header from "@editorjs/header";
import NestedList from "@editorjs/nested-list";
import CodeTool from "@editorjs/code";
import InlineCode from "@editorjs/inline-code";

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

export const getEditorInstance = () => {
  return new EditorJS({
    holder: "editorjs",
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

export const findParentConversationBlock = (currentElement: HTMLElement) => {
  if (!currentElement) return null;

  const targetAttribute = "data-testid";
  let element: HTMLElement | null = currentElement;
  while (element && element.tagName !== "HTML") {
    if (element.getAttribute(targetAttribute) !== null) {
      return element;
    }
    element = element.parentElement;
  }

  return null;
};

export const getQuestionForSelectedText = (currentElement: HTMLElement) => {
  const answerElement = findParentConversationBlock(currentElement);
  if (!answerElement) return null;

  let questionElement = answerElement.previousElementSibling;

  const questionConversationDivs = questionElement?.querySelectorAll(
    "div[data-message-author-role]"
  );

  if (!questionConversationDivs) return null;

  // loop through each questionConversationDivs and check the role..if the role is user
  // add it to the questionText and return it at the end

  const questionAuthorRole = questionConversationDivs[0]?.getAttribute(
    "data-message-author-role"
  );

  if (questionAuthorRole !== "user") return null;

  let questionText = "";
  questionConversationDivs.forEach((questionConversationDiv) => {
    const text = questionConversationDiv.textContent;
    questionText += questionText === "" ? text : `<br><br>${text}`;
  });

  return questionText.trim();
};

export const importParagraphAtTheEnd = (text: string, editor: EditorJS) => {
  let indexToInsertAt = editor.blocks.getBlocksCount() - 1;
  editor.blocks.insert(
    "paragraph",
    { text: text.trim() },
    null,
    indexToInsertAt
  );
};

export const importQuestionAtTheEnd = (
  text: string,
  editor: EditorJS,
  level: number = 4
) => {
  let indexToInsertAt = editor.blocks.getBlocksCount() - 1;

  const questionText = `<b>${text.trim()}</b>`;
  editor.blocks.insert(
    "header",
    { text: questionText, level },
    null,
    indexToInsertAt
  );
};

export const checkIfCtrlOrCmdHeldWithClick = (event: MouseEvent) => {
  return event.ctrlKey || event.metaKey;
};

export const checkIfSelectionInConversationSection = () => {
  const mainSection = document.querySelector(
    "div[role='presentation']"
  )?.firstElementChild;

  const parentElement = getSelectedTextOffsetParent();

  return mainSection.contains(parentElement);
};
