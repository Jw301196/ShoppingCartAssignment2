import { useEffect, useMemo, useState } from "react";
import ProductCard from "../components/ProductCard";

function SkeletonCard() {
  return (
    <div className="bg-white rounded-2xl shadow p-4 animate-pulse">
      <div className="h-40 bg-gray-200 rounded" />
      <div className="mt-3 h-4 bg-gray-200 rounded w-3/4" />
      <div className="mt-2 h-4 bg-gray-200 rounded w-1/2" />
      <div className="mt-4 flex items-center justify-between">
        <div className="h-5 bg-gray-200 rounded w-16" />
        <div className="h-4 bg-gray-200 rounded w-14" />
      </div>
    </div>
  );
}

export default function Home() {
  const [products, setProducts] = useState(null);
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState("all");
  const [q, setQ] = useState("");
  const [err, setErr] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const [pr, cr] = await Promise.all([
          fetch("https://fakestoreapi.com/products"),
          fetch("https://fakestoreapi.com/products/categories"),
        ]);
        if (!pr.ok || !cr.ok) throw new Error("Failed to fetch data");
        setProducts(await pr.json());
        const cats = await cr.json();
        setCategories(cats);
      } catch (e) {
        setErr(e.message);
      }
    })();
  }, []);

  const filtered = useMemo(() => {
    if (!products) return [];
    const query = q.trim().toLowerCase();
    return products.filter((p) => {
      const catOk = category === "all" || p.category === category;
      const qOk = !query || p.title.toLowerCase().includes(query);
      return catOk && qOk;
    });
  }, [products, category, q]);

  if (err) return <div className="p-6 text-red-600">Error: {err}</div>;

  return (
    <div className="max-w-6xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Products</h1>

      {/* Controls */}
      <div className="mb-4 flex flex-col sm:flex-row gap-3">
        <input
          type="search"
          placeholder="Search products…"
          className="flex-1 border rounded-lg px-3 py-2"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          aria-label="Search products"
        />
        <select
          className="w-full sm:w-60 border rounded-lg px-3 py-2"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          aria-label="Filter by category"
        >
          <option value="all">All categories</option>
          {categories.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </div>

      {/* Grid */}
      {!products ? (
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      ) : (
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          {filtered.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
          {filtered.length === 0 && (
            <div className="col-span-full text-sm text-gray-600">
              No products match your search.
            </div>
          )}
        </div>
      )}
    </div>
  );
}
