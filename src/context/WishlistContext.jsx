/* eslint-disable react-refresh/only-export-components */
import { createContext, useState } from "react";

export const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
  const [wishlistItems, setWishlistItems] = useState(
    JSON.parse(
      localStorage.getItem("wishlist")
    ) || []
  );

  const addToWishlist = (product) => {
    const exists = wishlistItems.find(
      (item) =>
        (item.id || item._id) ===
        (product.id || product._id)
    );

    if (exists) return;

    const updated = [
      ...wishlistItems,
      product,
    ];

    setWishlistItems(updated);

    localStorage.setItem(
      "wishlist",
      JSON.stringify(updated)
    );
  };

  const removeFromWishlist = (id) => {
    const updated = wishlistItems.filter(
      (item) =>
        (item.id || item._id) !== id
    );

    setWishlistItems(updated);

    localStorage.setItem(
      "wishlist",
      JSON.stringify(updated)
    );
  };

  return (
    <WishlistContext.Provider
      value={{
        wishlistItems,
        addToWishlist,
        removeFromWishlist,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};