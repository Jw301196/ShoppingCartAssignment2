import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useCart } from "../context/CartContext";

export default function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [qty, setQty] = useState(1);
  const [err, setErr] = useState(null);
  const { addToCart } = useCart();

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(`https://fakestoreapi.com/products/${id}`);
        if (!res.ok) throw new Error("Failed to fetch product");
        const data = await res.json();
        setProduct(data);
      } catch (e) {
        setErr(e.message);
      }
    })();
  }, [id]);

  if (err) return <div className="p-6 text-red-600">Error: {err}</div>;
  if (!product) return <div className="p-6">Loading product…</div>;

  return (
    <div className="max-w-5xl mx-auto p-4 grid grid-cols-1 md:grid-cols-2 gap-8">
      <img
        src={product.image}
        alt={product.title}
        className="h-72 object-contain mx-auto"
      />
      <div>
        <h1 className="text-2xl font-bold">{product.title}</h1>
        <p className="mt-2 text-gray-600">{product.description}</p>
        <div className="mt-4 text-2xl font-semibold">${product.price}</div>

        <div className="mt-6 flex items-center gap-3">
          <label htmlFor="qty" className="text-sm">
            Quantity
          </label>
          <input
            id="qty"
            type="number"
            min="1"
            className="w-20 border rounded px-2 py-1"
            value={qty}
            onChange={(e) => setQty(Math.max(1, Number(e.target.value)))}
          />
          <button
            onClick={() => addToCart(product, qty)}
            className="bg-indigo-600 text-white rounded-lg px-4 py-2 hover:bg-indigo-700"
          >
            Add to cart
          </button>
        </div>
      </div>
    </div>
  );
}
