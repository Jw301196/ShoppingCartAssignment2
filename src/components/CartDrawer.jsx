import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useUi } from "../context/UIContent";

export default function CartDrawer() {
  const { isCartOpen, closeCart } = useUi();
  const { items, totalPrice, setQty, removeFromCart, clear } = useCart();
  const list = Object.values(items);

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 bg-black/40 transition-opacity ${
          isCartOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
        onClick={closeCart}
      />
      {/* Panel */}
      <aside
        className={`fixed right-0 top-0 h-screen w-80 max-w-[90vw] bg-white shadow-2xl transition-transform duration-300
        ${isCartOpen ? "translate-x-0" : "translate-x-full"}`}
        aria-label="Mini cart"
      >
        <div className="p-4 border-b flex items-center justify-between">
          <h2 className="text-lg font-semibold">Your Cart</h2>
          <button
            onClick={closeCart}
            aria-label="Close cart"
            className="text-gray-500 hover:text-gray-800"
          >
            ✕
          </button>
        </div>

        <div className="p-4 overflow-y-auto h-[calc(100vh-8rem)]">
          {list.length === 0 ? (
            <p className="text-sm text-gray-600">Your cart is empty.</p>
          ) : (
            <div className="space-y-4">
              {list.map(({ product, qty }) => (
                <div key={product.id} className="flex gap-3">
                  <img
                    src={product.image}
                    alt={product.title}
                    className="w-14 h-14 object-contain border rounded"
                  />
                  <div className="flex-1">
                    <div className="text-sm font-medium line-clamp-2">
                      {product.title}
                    </div>
                    <div className="text-xs text-gray-500">
                      ${product.price} each
                    </div>
                    <div className="mt-2 flex items-center gap-2">
                      <input
                        type="number"
                        min="1"
                        aria-label={`qty-${product.id}`}
                        className="w-16 border rounded px-2 py-1 text-sm"
                        value={qty}
                        onChange={(e) =>
                          setQty(
                            product.id,
                            Math.max(1, Number(e.target.value))
                          )
                        }
                      />
                      <button
                        className="text-xs text-red-600 hover:underline"
                        onClick={() => removeFromCart(product.id)}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="p-4 border-t">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm text-gray-600">Total</span>
            <span className="text-base font-semibold">${totalPrice}</span>
          </div>
          <div className="flex gap-2">
            <button
              onClick={clear}
              className="flex-1 border rounded-lg px-3 py-2 text-sm"
            >
              Clear
            </button>
            <Link
              to="/cart"
              onClick={closeCart}
              className="flex-1 bg-indigo-600 text-white rounded-lg px-3 py-2 text-center text-sm hover:bg-indigo-700"
            >
              Go to cart
            </Link>
          </div>
        </div>
      </aside>
    </>
  );
}
