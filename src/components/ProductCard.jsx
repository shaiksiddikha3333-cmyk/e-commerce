import { useCart } from "../context/CartContext";

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();

  return (
    <div className="border rounded-lg p-4 shadow">
      <img
        src={product.image}
        alt={product.title}
        className="h-48 w-full object-contain"
      />

      <h2 className="font-semibold mt-3">
        {product.title}
      </h2>

      <p className="text-green-600 font-bold mt-2">
        ${product.price}
      </p>

      <button
        onClick={() => addToCart(product)}
        className="bg-blue-500 text-white px-4 py-2 rounded mt-3 w-full"
      >
        Add To Cart
      </button>
    </div>
  );
};

export default ProductCard;