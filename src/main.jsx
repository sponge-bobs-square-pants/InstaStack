import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import ExampleComponent from "./Examples/Example.jsx";
import Example2 from "./Examples/Example2.jsx";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Example2 />
  </StrictMode>
);
