import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { initializeDomainPersistence } from "@/state/bootstrap";
import { AppErrorBoundary } from "@/components/AppErrorBoundary";

try {
  initializeDomainPersistence();
} catch {
  // Persistence is optional for initial rendering; do not expose storage details.
  console.warn("[RE:ROOM] Local state could not be initialized; this session may not persist changes.");
}

const root = document.getElementById("root");
if (!root) throw new Error("Required app root element was not found.");

ReactDOM.createRoot(root).render(
  <React.StrictMode>
    <AppErrorBoundary>
      <App />
    </AppErrorBoundary>
  </React.StrictMode>,
);
