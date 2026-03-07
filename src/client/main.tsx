import React from "react";
import ReactDOM from "react-dom/client";
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
function App() {
  return (
    <div className="min-h-screen bg-gray-950 text-gray-100 flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-2">StreamKit</h1>
        <p className="text-gray-400">Your streaming command center. Let's build this.</p>
      </div>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
