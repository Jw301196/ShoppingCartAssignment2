import { useCart } from "../context/CartContext";

export default function Cart() {
  const { items, totalPrice, setQty, removeFromCart, clear } = useCart();
  const list = Object.values(items);

  if (list.length === 0) {
    return (
      <div className="max-w-4xl mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Your Cart</h1>
        <p>Your cart is empty.</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Your Cart</h1>
      <div className="bg-white rounded-2xl shadow divide-y">
        {list.map(({ product, qty }) => (
          <div key={product.id} className="p-4 flex items-center gap-4">
            <img
              src={product.image}
              alt={product.title}
              className="w-16 h-16 object-contain"
            />
            <div className="flex-1">
              <div className="font-medium">{product.title}</div>
              <div className="text-sm text-gray-600">${product.price} each</div>
            </div>
            <div className="flex items-center gap-2">
              <input
                aria-label={`qty-${product.id}`}
                type="number"
                min="1"
                className="w-20 border rounded px-2 py-1"
                value={qty}
                onChange={(e) =>
                  setQty(product.id, Math.max(1, Number(e.target.value)))
                }
              />
              <button
                className="text-red-600 hover:underline"
                onClick={() => removeFromCart(product.id)}
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 flex items-center justify-between">
        <button onClick={clear} className="text-gray-600 hover:underline">
          Clear cart
        </button>
        <div className="text-xl">
          Total: <span className="font-semibold">${totalPrice}</span>
        </div>
      </div>
    </div>
  );
}
