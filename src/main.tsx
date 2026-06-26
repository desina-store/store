import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router";
import "./index.css";
import { TRPCProvider } from "@/providers/trpc";
import { StoreProvider } from "@/hooks/useStore";
import App from "./App.tsx";

// Set RTL for Arabic
document.documentElement.dir = "rtl";
document.documentElement.lang = "ar";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <TRPCProvider>
        <StoreProvider>
          <App />
        </StoreProvider>
      </TRPCProvider>
    </BrowserRouter>
  </StrictMode>
);
