import { render, screen, fireEvent } from "@testing-library/react";
import { CartProvider, useCart } from "../../context/CartContext";
import Cart from "../Cart";
import React from "react";

function Seed({ items = [] }) {
  const { addToCart } = useCart();
  const seededRef = React.useRef(false);

  React.useEffect(() => {
    if (seededRef.current) return;
    seededRef.current = true;
    items.forEach(({ product, qty }) => addToCart(product, qty));
  }, [items]);

  return null;
}

const P = (id, price = 9.99, title = "Item") => ({
  id,
  title,
  price,
  image: "x.png",
});

const renderWithCart = (seedItems = []) =>
  render(
    <CartProvider>
      {seedItems.length > 0 ? <Seed items={seedItems} /> : null}
      <Cart />
    </CartProvider>
  );

describe("Cart Page", () => {
  test("shows empty state with no items", () => {
    renderWithCart();
    expect(
      screen.getByRole("heading", { level: 1, name: /^your cart$/i })
    ).toBeInTheDocument();
    expect(screen.getByText(/cart is empty/i)).toBeInTheDocument();
  });

  test("changing quantity updates total", async () => {
    renderWithCart([{ product: P(1, 9.99), qty: 2 }]);
    const qty = await screen.findByLabelText("qty-1");
    fireEvent.change(qty, { target: { value: "3" } });
    expect(await screen.findByText("$29.97")).toBeInTheDocument();
  });

  test("remove item makes cart empty", async () => {
    renderWithCart([{ product: P(1, 10), qty: 1 }]);
    const remove = await screen.findByText(/remove/i);
    fireEvent.click(remove);
    expect(await screen.findByText(/cart is empty/i)).toBeInTheDocument();
  });

  test("clear cart empties everything", async () => {
    renderWithCart([
      { product: P(1, 5, "A"), qty: 2 },
      { product: P(2, 3, "B"), qty: 1 },
    ]);

    const clearBtn = await screen.findByRole("button", { name: /clear cart/i });
    fireEvent.click(clearBtn);

    expect(
      screen.getByRole("heading", { level: 1, name: /^your cart$/i })
    ).toBeInTheDocument();

    expect(
      screen.getByRole("heading", { level: 1, name: /^your cart$/i })
    ).toBeInTheDocument();

    expect(screen.queryByText("A")).not.toBeInTheDocument();
    expect(screen.queryByText("B")).not.toBeInTheDocument();

    expect(screen.queryByText(/Total:/i)).not.toBeInTheDocument();
  });
});
