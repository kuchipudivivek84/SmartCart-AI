import { useContext } from "react";
import { WishlistContext } from "../context/WishlistContext";

function Wishlist() {
  const {
    wishlistItems,
    removeFromWishlist,
  } = useContext(WishlistContext);

  return (
    <div className="max-w-5xl mx-auto p-6">

      <h1 className="text-3xl font-bold mb-6">
        My Wishlist ❤️
      </h1>

      {wishlistItems.map((item) => (
        <div
          key={item._id}
          className="border p-4 mb-4 flex justify-between"
        >
          <div>
            <h2>{item.name}</h2>
            <p>₹{item.price}</p>
          </div>

          <button
            onClick={() =>
              removeFromWishlist(item._id)
            }
            className="bg-red-500 text-white px-3 py-1 rounded"
          >
            Remove
          </button>

        </div>
      ))}
    </div>
  );
}

export default Wishlist;