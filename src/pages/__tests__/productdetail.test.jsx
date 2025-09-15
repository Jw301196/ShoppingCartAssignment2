import { render, screen, fireEvent } from "@testing-library/react";
import ProductDetail from "../ProductDetail";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { CartProvider } from "../../context/CartContext";
import { ToastProvider } from "../../components/Toast";

const product = {
  id: 5,
  title: "Fancy Hat",
  price: 12.5,
  description: "Nice",
  image: "x.png",
};

beforeEach(() => {
  global.fetch = jest.fn().mockResolvedValue({
    ok: true,
    json: async () => ({
      id: 5,
      title: "Fancy Hat",
      price: 12.5,
      description: "Nice",
      image: "x.png",
    }),
  });
});

afterEach(() => jest.restoreAllMocks());

test("shows toast after adding to cart", async () => {
  render(
    <CartProvider>
      <ToastProvider>
        <MemoryRouter initialEntries={["/product/5"]}>
          <Routes>
            <Route path="/product/:id" element={<ProductDetail />} />
          </Routes>
        </MemoryRouter>
      </ToastProvider>
    </CartProvider>
  );

  // waits product title
  expect(await screen.findByText(/Fancy Hat/)).toBeInTheDocument();

  const btn = screen.getByRole("button", { name: /add to cart/i });
  fireEvent.click(btn);

  // toast content
  expect(await screen.findByText(/added to cart/i)).toBeInTheDocument();

  expect(
    screen.getByRole("heading", { name: /fancy hat/i })
  ).toBeInTheDocument();

  expect(
    await screen.findByText(/1\s*\u00D7\s*Fancy Hat/i)
  ).toBeInTheDocument();
});
