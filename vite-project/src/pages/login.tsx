import React from "react";
import ReactDOM from "react-dom/client";

import { BrowserRouter, Link } from "react-router"

import App from "./app";

const root = document.getElementById("root");

ReactDOM.createRoot(root).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
)
