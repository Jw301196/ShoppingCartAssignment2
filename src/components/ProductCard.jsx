import { Link } from "react-router-dom";

export default function ProductCard({ product }) {
  return (
    <div className="bg-white rounded-2xl shadow p-4 flex flex-col">
      <Link to={`/product/${product.id}`} className="flex-1 flex flex-col">
        <img
          src={product.image}
          alt={product.title}
          className="h-40 object-contain mx-auto"
        />
        <h3 className="mt-3 font-medium line-clamp-2">{product.title}</h3>
      </Link>
      <div className="mt-3 flex items-center justify-between">
        <span className="font-semibold">${product.price}</span>
        <Link
          to={`/product/${product.id}`}
          className="text-indigo-600 hover:underline"
        >
          Details
        </Link>
      </div>
    </div>
  );
}
