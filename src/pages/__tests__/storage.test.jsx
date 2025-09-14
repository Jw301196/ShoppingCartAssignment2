import { loadCart, saveCart } from "../../utils/storage";

let store;

beforeEach(() => {
  store = {};
  Object.defineProperty(window, "localStorage", {
    configurable: true,
    value: {
      getItem: (k) => (k in store ? store[k] : null),
      setItem: (k, v) => {
        store[k] = String(v);
      },
      removeItem: (k) => {
        delete store[k];
      },
      clear: () => {
        store = {};
      },
    },
  });
});

afterEach(() => {
  window.localStorage.clear();
});

test("saveCart then loadCart roundtrip", () => {
  const cart = { items: { 1: { product: { id: 1, price: 9.99 }, qty: 2 } } };
  expect(saveCart(cart)).toBe(true);
  expect(loadCart()).toEqual(cart);
});

test("loadCart returns empty cart if none saved", () => {
  window.localStorage.clear();
  expect(loadCart()).toEqual({ items: {} });
});
