import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import CartDrawer from "../../components/CartDrawer";
import { CartProvider, useCart } from "../../context/CartContext";
import { UiProvider, useUi } from "../../context/UIContent";

function Seed({ open = false, items = [] }) {
  const { addToCart } = useCart();
  const { openCart, closeCart } = useUi();
  const seededRef = React.useRef(false);

  React.useEffect(() => {
    if (seededRef.current) return;
    seededRef.current = true;

    items.forEach(({ product, qty }) => addToCart(product, qty));
    open ? openCart() : closeCart();
  }, [items, open]);

  return null;
}

const P = (id, price = 9.99, title = "Item") => ({
  id,
  title,
  price,
  image: "x.png",
});

const renderDrawer = (options = {}) =>
  render(
    <MemoryRouter>
      <CartProvider>
        <UiProvider>
          <Seed {...options} />
          <CartDrawer />
        </UiProvider>
      </CartProvider>
    </MemoryRouter>
  );

test("drawer toggles open/closed classes", async () => {
  const { rerender } = renderDrawer({ open: false });
  expect(screen.getByLabelText("Mini cart").className).toMatch(
    /translate-x-full/
  );

  rerender(
    <MemoryRouter>
      <CartProvider>
        <UiProvider>
          <Seed open />
          <CartDrawer />
        </UiProvider>
      </CartProvider>
    </MemoryRouter>
  );
});

test("qty change inside drawer updates total", async () => {
  renderDrawer({
    open: true,
    items: [{ product: P(1, 10, "Drawer Item"), qty: 1 }],
  });
  expect(await screen.findByText(/Drawer Item/)).toBeInTheDocument();
  expect(screen.getByText("$10.00")).toBeInTheDocument();
  const qty = screen.getByLabelText("qty-1");
  fireEvent.change(qty, { target: { value: "3" } });
  expect(await screen.findByText("$30.00")).toBeInTheDocument();
});
