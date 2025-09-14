import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useReducer,
} from "react";
import { loadCart, saveCart } from "../utils/storage";

const CartContext = createContext(null);

const initialState = loadCart();

function reducer(state, action) {
  switch (action.type) {
    case "ADD": {
      const { product, qty = 1 } = action.payload;
      const id = String(product.id);
      const existing = state.items[id];
      const nextQty = (existing?.qty || 0) + qty;
      return { items: { ...state.items, [id]: { product, qty: nextQty } } };
    }
    case "REMOVE": {
      const id = String(action.payload.id);
      const { [id]: _, ...rest } = state.items;
      return { items: rest };
    }
    case "SET_QTY": {
      const { id, qty } = action.payload;
      const pid = String(id);
      if (qty <= 0) {
        const { [pid]: _, ...rest } = state.items;
        return { items: rest };
      }
      const item = state.items[pid];
      if (!item) return state;
      return { items: { ...state.items, [pid]: { ...item, qty } } };
    }
    case "CLEAR": {
      return { items: {} };
    }
    default:
      return state;
  }
}

export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    saveCart(state);
  }, [state]);

  const totalCount = useMemo(
    () => Object.values(state.items).reduce((acc, it) => acc + it.qty, 0),
    [state.items]
  );

  const totalPrice = useMemo(
    () =>
      Object.values(state.items)
        .reduce((acc, it) => acc + it.qty * (it.product.price ?? 0), 0)
        .toFixed(2),
    [state.items]
  );

  const api = useMemo(
    () => ({
      items: state.items,
      totalCount,
      totalPrice,
      addToCart: (product, qty = 1) =>
        dispatch({ type: "ADD", payload: { product, qty } }),
      removeFromCart: (id) => dispatch({ type: "REMOVE", payload: { id } }),
      setQty: (id, qty) => dispatch({ type: "SET_QTY", payload: { id, qty } }),
      clear: () => dispatch({ type: "CLEAR" }),
    }),
    [state, totalCount, totalPrice]
  );

  return <CartContext.Provider value={api}>{children}</CartContext.Provider>;
}

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be use within CartProvide");
  return ctx;
};
