import { createContext, useContext, useState, useCallback, type ReactNode } from "react";

interface StoreContextType {
  cartCount: number;
  setCartCount: (count: number) => void;
  sessionId: string;
  addToCart: (productId: number) => void;
  refreshCart: () => void;
}

const StoreContext = createContext<StoreContextType | null>(null);

function getOrCreateSessionId(): string {
  let sessionId = localStorage.getItem("desinahub_session");
  if (!sessionId) {
    sessionId = "sess_" + Math.random().toString(36).substring(2) + Date.now().toString(36);
    localStorage.setItem("desinahub_session", sessionId);
  }
  return sessionId;
}

export function StoreProvider({ children }: { children: ReactNode }) {
  const [cartCount, setCartCount] = useState(0);
  const sessionId = getOrCreateSessionId();

  const refreshCart = useCallback(() => {
    // Will be connected to tRPC
  }, []);

  const addToCart = useCallback((productId: number) => {
    // Will be connected to tRPC
    console.log("Add to cart:", productId);
  }, []);

  return (
    <StoreContext.Provider value={{ cartCount, setCartCount, sessionId, addToCart, refreshCart }}>
      {children}
    </StoreContext.Provider>
  );
}

export function useStore() {
  const context = useContext(StoreContext);
  if (!context) throw new Error("useStore must be used within StoreProvider");
  return context;
}
