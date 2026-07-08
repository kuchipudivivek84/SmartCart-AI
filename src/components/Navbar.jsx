import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../Services/api";

import { CartContext } from "../context/CartContext";
import { WishlistContext } from "../context/WishlistContext";
import { DarkModeContext } from "../context/DarkModeContext";

import {
  FaShoppingCart,
  FaUser,
  FaSearch,
  FaHeart,
  FaSun,
  FaMoon,
} from "react-icons/fa";


function Navbar() {
  const navigate = useNavigate();

  const [keyword, setKeyword] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  const user = JSON.parse(
    localStorage.getItem("user")
  );

  const { cartItems } =
    useContext(CartContext);

  const { wishlistItems } =
    useContext(WishlistContext);

  const { darkMode, toggleDarkMode } = useContext(DarkModeContext);



  // Search Products
  const searchProducts = async (value) => {
    setKeyword(value);

    if (!value.trim()) {
      setSuggestions([]);
      return;
    }

    try {
      const { data } = await API.get(`/products/search?keyword=${value}`);
      const nextSuggestions = Array.isArray(data) ? data : data?.products || data?.results || [];
      setSuggestions(nextSuggestions);
    } catch (error) {
      console.error("Search failed", error);
      setSuggestions([]);
    }
  };

  // Search Button
  const searchHandler = () => {
    if (!keyword.trim()) return;

    navigate(`/?search=${keyword}`);
  };

  // Select Product
  const selectSuggestion = (product) => {
    setKeyword(
      product.title || product.name
    );

    setSuggestions([]);

    navigate(
      `/product/${product.id}`
    );
  };

  // Logout
  const logoutHandler = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/login");

    window.location.reload();
  };

  return (
    <nav className={`${darkMode ? "bg-gray-800" : "bg-linear-to-r from-purple-700 to-indigo-900"} text-white px-6 py-4 shadow-lg`}>
      <div className="flex justify-between items-center">

        {/* Logo */}
        <Link
          to="/"
          className="text-2xl font-bold"
        >
          SmartCart
        </Link>

        {/* Search */}
        <div className="relative w-1/2">

          <div className="flex">
            <input
              type="text"
              placeholder="Search Products..."
              value={keyword}
              onChange={(e) =>
                searchProducts(
                  e.target.value
                )
              }
              className="w-full p-2 rounded-l text-black outline-none"
            />

            <button
              onClick={searchHandler}
              className="bg-black px-4 rounded-r"
            >
              <FaSearch />
            </button>
          </div>

          {/* Suggestions */}
          {Array.isArray(suggestions) && suggestions.length > 0 && (
            <div className="absolute bg-white text-black w-full rounded shadow-lg mt-1 z-50 max-h-96 overflow-y-auto">
              {suggestions.map((product, index) => {
                const productKey = product?.id || product?.name || `${product?.title || "product"}-${index}`;
                return (
                  <div
                    key={productKey}
                    onClick={() => selectSuggestion(product)}
                    className="p-3 border-b cursor-pointer hover:bg-gray-100 flex items-center gap-3"
                  >

                    <img
                      src={
                        product.thumbnail ||
                        product.image
                      }
                      alt={
                        product.title ||
                        product.name
                      }
                      className="w-12 h-12 object-cover rounded"
                    />

                    <div>
                      <div className="font-semibold">
                        {product.title ||
                          product.name}
                      </div>

                      <div className="text-sm text-gray-500">
                        ₹{product.price}
                      </div>
                    </div>

                  </div>
                );
              })}
            </div>
          )}

        </div>

        {/* Right Side */}
        <div className="flex items-center gap-6">

          {/* Dark Mode Toggle */}
          <button
            onClick={toggleDarkMode}
            className="text-xl transition hover:scale-110"
          >
            {darkMode ? <FaSun /> : <FaMoon />}
          </button>

          {/* Wishlist */}
          <Link
            to="/wishlist"
            className="relative"
          >
            <FaHeart size={22} />

            <span className="absolute -top-2 -right-2 bg-red-500 text-xs px-1 rounded-full">
              {wishlistItems?.length || 0}
            </span>
          </Link>

          {/* Cart */}
          <Link
            to="/cart"
            className="relative"
          >
            <FaShoppingCart size={22} />

            <span className="absolute -top-2 -right-2 bg-yellow-400 text-black text-xs px-1 rounded-full">
              {cartItems?.length || 0}
            </span>
          </Link>

          {/* User */}
          {user ? (
            <div className="flex items-center gap-3">

              <span className="font-medium">
                👤 {user.name}
              </span>

              <button
                onClick={logoutHandler}
                className="bg-red-500 px-3 py-1 rounded hover:bg-red-600"
              >
                Logout
              </button>

            </div>
          ) : (
            <Link to="/login">
              <FaUser size={22} />
            </Link>
          )}

        </div>

      </div>
    </nav>
  );
}

export default Navbar;