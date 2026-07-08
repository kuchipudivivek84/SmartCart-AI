import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { WishlistContext } from "../context/WishlistContext";
import toast from "react-hot-toast";

function ProductCard({ item }) {
  const navigate = useNavigate();

  const { addToCart } = useContext(CartContext);
  const { addToWishlist } = useContext(WishlistContext);

  const handleCart = (e) => {
    e.stopPropagation();
    addToCart(item);
    toast.success("Added to Cart");
  };

  const handleWishlist = (e) => {
    e.stopPropagation();
    addToWishlist(item);
    toast.success("Added to Wishlist");
  };

  return (
    <div
      onClick={() => navigate(`/product/${item.id}`)}
      className="bg-white rounded-xl shadow-md hover:shadow-xl transition duration-300 cursor-pointer overflow-hidden"
    >
      <img
        src={item.thumbnail}
        alt={item.title}
        className="w-full h-56 object-cover"
      />

      <div className="p-4">
        <h2 className="font-bold text-lg line-clamp-2">
          {item.title}
        </h2>

        <p className="text-gray-500 text-sm mt-2">
          {item.brand}
        </p>

        <div className="flex justify-between items-center mt-3">
          <span className="text-purple-700 text-xl font-bold">
            ₹{item.price}
          </span>

          <span className="text-yellow-500">
            ⭐ {item.rating}
          </span>
        </div>

        <button
          onClick={handleCart}
          className="w-full mt-4 bg-purple-600 hover:bg-purple-700 text-white py-2 rounded-lg"
        >
          Add To Cart
        </button>

        <button
          onClick={handleWishlist}
          className="w-full mt-2 bg-pink-500 hover:bg-pink-600 text-white py-2 rounded-lg"
        >
          ❤️ Add To Wishlist
        </button>
      </div>
    </div>
  );
}

export default ProductCard;