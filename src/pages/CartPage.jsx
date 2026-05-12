import Header from "../components/Header";
import { useCart } from "../context/CartContext";

const CartPage = () => {
  const {
    cart,
    increaseQty,
    decreaseQty,
    removeItem,
  } = useCart();

  const subtotal = cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const shipping = 10;

  return (
    <>
      <Header />

      <div className="p-5">
        <h1 className="text-3xl font-bold mb-5">
          Your Cart
        </h1>

        {cart.length === 0 ? (
          <h2>Cart is Empty</h2>
        ) : (
          <div className="grid md:grid-cols-3 gap-5">
            <div className="md:col-span-2">
              {cart.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center gap-4 border p-4 mb-4"
                >
                  <img
                    src={item.image}
                    className="h-24"
                  />

                  <div>
                    <h2>{item.title}</h2>

                    <p>${item.price}</p>

                    <div className="flex gap-3 mt-2">
                      <button
                        onClick={() =>
                          decreaseQty(item.id)
                        }
                        className="bg-gray-300 px-3"
                      >
                        -
                      </button>

                      <span>{item.quantity}</span>

                      <button
                        onClick={() =>
                          increaseQty(item.id)
                        }
                        className="bg-gray-300 px-3"
                      >
                        +
                      </button>
                    </div>

                    <button
                      onClick={() =>
                        removeItem(item.id)
                      }
                      className="text-red-500 mt-2"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="border p-5 h-fit">
              <h2 className="text-2xl font-bold">
                Order Summary
              </h2>

              <p className="mt-4">
                Subtotal: ${subtotal.toFixed(2)}
              </p>

              <p>Shipping: ${shipping}</p>

              <h3 className="font-bold mt-3">
                Total: $
                {(subtotal + shipping).toFixed(2)}
              </h3>

              <button className="bg-black text-white w-full py-3 mt-5 rounded">
                Proceed To Checkout
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default CartPage;