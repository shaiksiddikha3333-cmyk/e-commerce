import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';
import { FiX } from 'react-icons/fi';

const MiniCart = () => {
  const { cart, getCartTotal, setIsMiniCartOpen, removeFromCart } = useCart();

  return (
    <div className="absolute right-0 top-14 w-96 bg-white rounded-lg shadow-xl z-50 border">
      <div className="p-4 max-h-96 overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-bold text-lg">Mini Cart</h3>
          <button onClick={() => setIsMiniCartOpen(false)}><FiX size={20}/></button>
        </div>
        
        {cart.length === 0? (
          <p className="text-gray-500 text-center py-8">Your cart is empty</p>
        ) : (
          <>
            {cart.map(item => (
              <div key={item.id} className="flex gap-3 mb-3 border-b pb-3">
                <img src={item.image} alt={item.title} className="w-16 h-16 object-contain"/>
                <div className="flex-1">
                  <p className="text-sm font-semibold line-clamp-1">{item.title}</p>
                  <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                  <p className="text-sm font-bold">${(item.price * item.quantity).toFixed(2)}</p>
                </div>
                <button onClick={() => removeFromCart(item.id)} className="text-red-500 text-xs">Remove</button>
              </div>
            ))}
            <div className="border-t pt-3 mt-3">
              <div className="flex justify-between font-bold mb-3">
                <span>Subtotal:</span>
                <span>${getCartTotal().toFixed(2)}</span>
              </div>
              <Link to="/cart" onClick={() => setIsMiniCartOpen(false)}>
                <button className="w-full bg-blue-600 text-white py-2 rounded-lg mb-2">View Cart</button>
              </Link>
              <button disabled={cart.length === 0} className="w-full bg-green-600 text-white py-2 rounded-lg disabled:bg-gray-400">
                Checkout
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
export default MiniCart;