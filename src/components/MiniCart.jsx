const MiniCart = ({ cartItems, onClose }) => {
  return (
    <div className="fixed right-0 top-0 h-full w-80 bg-white shadow-lg p-4 overflow-y-auto">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Cart</h2>
        <button onClick={onClose} className="text-gray-500 hover:text-black">X</button>
      </div>

      {cartItems?.length === 0 ? (
        <p className="text-gray-500">Your cart is empty</p>
      ) : (
        cartItems?.map((item) => (
          <div key={item.id} className="border-b py-2">
            <p>{item.name}</p>
            <p className="text-sm text-gray-600">₹{item.price}</p>
          </div>
        ))
      )}
    </div>
  );
};

export default MiniCart;