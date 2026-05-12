import { createContext, useContext, useState, useEffect } from 'react';
import toast from 'react-hot-toast';

const CartContext = createContext();
export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem('cart');
    return saved? JSON.parse(saved) : [];
  });
  const [isMiniCartOpen, setIsMiniCartOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product) => {
    setCart(prev => {
      const exists = prev.find(item => item.id === product.id);
      if (exists) {
        toast.success('Quantity updated');
        return prev.map(item => item.id === product.id? {...item, quantity: item.quantity + 1 } : item);
      }
      toast.success('Added to cart');
      return [...prev, {...product, quantity: 1 }];
    });
  };

  const removeFromCart = (id) => {
    setCart(prev => prev.filter(item => item.id!== id));
    toast.success('Removed from cart');
  };

  const updateQuantity = (id, quantity) => {
    if (quantity < 1) { removeFromCart(id); return; }
    setCart(prev => prev.map(item => item.id === id? {...item, quantity } : item));
  };

  const clearCart = () => setCart([]);
  const getCartTotal = () => cart.reduce((total, item) => total + item.price * item.quantity, 0);
  const getCartCount = () => cart.reduce((count, item) => count + item.quantity, 0);
  const toggleMiniCart = () => setIsMiniCartOpen(!isMiniCartOpen);

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQuantity, clearCart, getCartTotal, getCartCount, isMiniCartOpen, toggleMiniCart, setIsMiniCartOpen }}>
      {children}
    </CartContext.Provider>
  );
};