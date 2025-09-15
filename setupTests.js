import "@testing-library/jest-dom";
import "whatwg-fetch";

import { TextEncoder, TextDecoder } from "node:util";
global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;

// new memory for each test
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
afterEach(() => window.localStorage.clear());
