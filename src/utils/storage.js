export const KEY = "scart_v1";

const hasStorage = () => {
  try {
    const t = "__storage_test__";
    localStorage.setItem(t, "1");
    localStorage.removeItem(t);
    return true;
  } catch {
    return false;
  }
};

const isDev =
  typeof process !== "undefined" &&
  process.env &&
  process.env.NODE_ENV !== "production";

export const loadCart = () => {
  if (!hasStorage()) return { items: {} };
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? JSON.parse(raw) : { items: {} };
  } catch {
    return { items: {} };
  }
};

// Return boolean status for reaction
export const saveCart = (cart) => {
  if (!hasStorage()) return false;
  try {
    localStorage.setItem(KEY, JSON.stringify(cart));
    return true;
  } catch (err) {
    if (isDev) console.warn("[cart] persist failed", err);
    return false;
  }
};
