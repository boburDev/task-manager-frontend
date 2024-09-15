import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { BrowserRouter } from "react-router-dom";

import ThemeContextWrapper from "./components/ThemeWrapper/ThemeWrapper";
import BackgroundColorWrapper from "./components/BackgroundColorWrapper/BackgroundColorWrapper";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ThemeContextWrapper>
      <BackgroundColorWrapper>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </BackgroundColorWrapper>
    </ThemeContextWrapper>
  </StrictMode>
);
