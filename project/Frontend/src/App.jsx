import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { CartProvider } from "./context/CartContext";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./auth/Login";
import Signup from "./auth/Signup";
import AddEditProduct from "./pages/AddEditProduct";
import ProductDetail from "./pages/ProductDetail";
import MyProducts from "./pages/MyProducts";
import CartPage from "./pages/CartPage";
import ProfilePage from "./pages/ProfilePage"; // ✅ Import ProfilePage

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/add" element={<AddEditProduct />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/my" element={<MyProducts />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/profile" element={<ProfilePage />} />{" "}
            {/* ✅ New profile route */}
          </Routes>
        </BrowserRouter>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
