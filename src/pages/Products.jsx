import axios from "axios";
import { useEffect, useState } from "react";
import Header from "../components/Header";
import ProductCard from "../components/ProductCard";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [filtered, setFiltered] = useState([]);

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [sort, setSort] = useState("");

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("https://fakestoreapi.com/products")
      .then((res) => {
        setProducts(res.data);
        setFiltered(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    let updated = [...products];

    if (search) {
      updated = updated.filter((item) =>
        item.title
          .toLowerCase()
          .includes(search.toLowerCase())
      );
    }

    if (category) {
      updated = updated.filter(
        (item) => item.category === category
      );
    }

    if (sort === "low-high") {
      updated.sort((a, b) => a.price - b.price);
    }

    if (sort === "high-low") {
      updated.sort((a, b) => b.price - a.price);
    }

    if (sort === "a-z") {
      updated.sort((a, b) =>
        a.title.localeCompare(b.title)
      );
    }

    if (sort === "z-a") {
      updated.sort((a, b) =>
        b.title.localeCompare(a.title)
      );
    }

    setFiltered(updated);
  }, [search, category, sort, products]);

  const categories = [
    ...new Set(products.map((item) => item.category)),
  ];

  if (loading) {
    return <h1 className="text-center mt-10">Loading...</h1>;
  }

  return (
    <>
      <Header />

      <div className="p-5">
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <input
            type="text"
            placeholder="Search products..."
            className="border p-2 rounded"
            onChange={(e) => setSearch(e.target.value)}
          />

          <select
            className="border p-2 rounded"
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="">All Categories</option>

            {categories.map((cat) => (
              <option key={cat}>{cat}</option>
            ))}
          </select>

          <select
            className="border p-2 rounded"
            onChange={(e) => setSort(e.target.value)}
          >
            <option value="">Sort</option>
            <option value="low-high">
              Price Low to High
            </option>
            <option value="high-low">
              Price High to Low
            </option>
            <option value="a-z">Title A-Z</option>
            <option value="z-a">Title Z-A</option>
          </select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
          {filtered.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default Products;