import { Provider } from "@/components/ui/provider";
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider>
      <BrowserRouter>
        <div className="bg-sky-50">
          <h1 className="bg-sky-50">Heading</h1>
        </div>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
