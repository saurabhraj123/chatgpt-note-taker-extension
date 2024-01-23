/** External */
import React from "react";
import ReactDOM from "react-dom/client";

/** Internal */
import App from "./components";

const rootDiv = document.createElement("div");
document.body.appendChild(rootDiv);

const root = ReactDOM.createRoot(rootDiv);
root.render(<App />);
