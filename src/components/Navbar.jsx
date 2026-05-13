import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { FiShoppingCart } from 'react-icons/fi';
import MiniCart from './MiniCart';

const Navbar = () => {
  const { getCartCount, isMiniCartOpen, toggleMiniCart } = useCart();

  return (
    <header className="bg-white shadow-md sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-blue-600">ReactMart</Link>
        
        <nav className="hidden md:flex gap-6">
          <Link to="/" className="hover:text-blue-600">Home</Link>
          <Link to="/cart" className="hover:text-blue-600">Cart</Link>
        </nav>

        <div className="relative">
          <button onClick={toggleMiniCart} className="relative">
            <FiShoppingCart size={24} />
            {getCartCount() > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {getCartCount()}
              </span>
            )}
          </button>
          {isMiniCartOpen && <MiniCart />}
        </div>
      </div>
    </header>
  );
};
export default Navbar;