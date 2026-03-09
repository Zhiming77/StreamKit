import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

/**
 * 🎯 STEP 0 — This is your starting point.
 *
 * Right now it just renders "StreamKit is alive!"
 * Once you verify this works, move to Step 1 (types).
 *
 * In Step 3, you'll replace this with a proper App component
 * that has a Sidebar, Header, and routed views.
 */
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

