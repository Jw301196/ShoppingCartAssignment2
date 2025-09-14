import { render, screen, fireEvent } from "@testing-library/react";
import { CartProvider, useCart } from "../../context/CartContext";
import Cart from "../Cart";

function SeedCart({ children }) {
  const { addToCart } = useCart();
  // seed one item
  const product = { id: 1, title: "Test Product", price: 9.99, image: "x.png" };
  addToCart(product, 2);
  return children || null;
}

const renderWithCart = (ui) =>
  render(
    <CartProvider>
      <SeedCart />
      {ui}
    </CartProvider>
  );

describe("Cart page", () => {
  test("shows seeded item and total", async () => {
    renderWithCart(<Cart />);
    expect(await screen.findByText(/Test Product/i)).toBeInTheDocument();
    expect(screen.getByText(/Total:/i)).toBeInTheDocument();
    // 2 * 9.99 = 19.98
    expect(screen.getByText("$19.98")).toBeInTheDocument();
  });

  test("changing quantity updates total", async () => {
    renderWithCart(<Cart />);
    const qtyInput = await screen.findByLabelText("qty-1");
    fireEvent.change(qtyInput, { target: { value: "3" } });
    // 3 * 9.99 = 29.97
    expect(await screen.findByText("$29.97")).toBeInTheDocument();
  });

  test("remove item makes cart empty", async () => {
    renderWithCart(<Cart />);
    const removeBtn = await screen.findByText(/Remove/i);
    fireEvent.click(removeBtn);
    expect(await screen.findByText(/cart is empty/i)).toBeInTheDocument();
  });
});
