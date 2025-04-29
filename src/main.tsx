import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./i18n.ts";
import "./index.css";
import "react-toastify/dist/ReactToastify.css";
import App from "./App.tsx";
import { Provider } from "react-redux";
import { store } from "./app/store.ts";
import { BrowserRouter } from "react-router-dom";
import { ContextProvider } from "./context/Context.tsx";


createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ContextProvider>
      <Provider store={store}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Provider>
    </ContextProvider>
  </StrictMode>
);
