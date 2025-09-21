import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";
import AppContextProvider from "./components/Context/AppContext.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import CartContextProvider from "./components/Context/CartContext.tsx";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <AppContextProvider>
          <CartContextProvider>
            <App />
          </CartContextProvider>
        </AppContextProvider>
      </QueryClientProvider>
    </BrowserRouter>
  </StrictMode>
);
