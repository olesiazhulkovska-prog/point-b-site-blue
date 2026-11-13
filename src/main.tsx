import "./effects";
import React from "react";
import { createRoot } from "react-dom/client";
import { App } from "./components/App";
import { yv as captureUtm } from "./utils/utm";

captureUtm();
createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
