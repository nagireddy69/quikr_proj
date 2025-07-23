import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";
import "./CartPage.css"; // optional if you want custom styling

const CartPage = () => {
  const { cartItems, removeFromCart, clearCart } = useCart();

  const getTotal = () =>
    cartItems.reduce((sum, item) => sum + item.price, 0).toFixed(2);

  const handleCheckout = () => {
    alert("Checkout successful!");
    clearCart();
  };

  return (
    <div className="cart-page">
      <h2>Your Cart</h2>
      {cartItems.length === 0 ? (
        <p>
          No items in cart. <Link to="/">Go Shopping</Link>
        </p>
      ) : (
        <>
          <div className="cart-items">
            {cartItems.map((item, index) => (
              <div key={index} className="cart-item">
                <img src={item.image} alt={item.name} className="cart-img" />
                <div className="cart-info">
                  <h4>{item.name}</h4>
                  <p>₹{item.price}</p>
                  <button onClick={() => removeFromCart(item._id)}>
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="cart-summary">
            <h3>Total: ₹{getTotal()}</h3>
            <button onClick={handleCheckout} className="checkout-btn">
              Checkout
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default CartPage;
