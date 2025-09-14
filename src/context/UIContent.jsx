import { createContext, useContext, useState } from "react";

const UiContext = createContext(null);

export function UiProvider({ children }) {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const openCart = () => setIsCartOpen(true);
  const closeCart = () => setIsCartOpen(false);
  const toggleCart = () => setIsCartOpen((v) => !v);

  return (
    <UiContext.Provider value={{ isCartOpen, openCart, closeCart, toggleCart }}>
      {children}
    </UiContext.Provider>
  );
}

export const useUi = () => {
  const ctx = useContext(UiContext);
  if (!ctx) throw new Error("useUi must be within provider");
  return ctx;
};
