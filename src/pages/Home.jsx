import { useEffect, useState } from "react";

import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Category from "../components/Category";
import ChatBot from "../components/ChatBot";
import ProductCard from "../components/ProductCard";
import FilterSidebar from "../components/FilterSidebar";

import API from "../Services/api";

function Home() {
  const [products, setProducts] = useState([]);

  const [selectedBrand, setSelectedBrand] =
    useState("");

  const [sortBy, setSortBy] =
    useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await API.get("/products");

        setProducts(data.products || data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchProducts();
  }, []);

  // Filter Products
  let filteredProducts = [...products];

  if (selectedBrand) {
    filteredProducts =
      filteredProducts.filter(
        (item) =>
          item.brand === selectedBrand
      );
  }

  // Sorting
  if (sortBy === "low") {
    filteredProducts = [...filteredProducts].sort(
      (a, b) => a.price - b.price
    );
  }

  if (sortBy === "high") {
    filteredProducts = [...filteredProducts].sort(
      (a, b) => b.price - a.price
    );
  }

  if (sortBy === "rating") {
    filteredProducts = [...filteredProducts].sort(
      (a, b) => b.rating - a.rating
    );
  }

  return (
    <div className="bg-gray-100 min-h-screen">

      <Navbar />

      <Hero />

      <Category />

      <div className="mx-10 mt-10">

        <h1 className="text-3xl font-bold mb-8">
          Recommended For You
        </h1>

        <div className="flex gap-8">

          {/* Left Sidebar */}

          <div className="w-1/4">

            <FilterSidebar
              selectedBrand={selectedBrand}
              setSelectedBrand={setSelectedBrand}
              sortBy={sortBy}
              setSortBy={setSortBy}
            />

          </div>

          {/* Products */}

          <div className="w-3/4">

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

              {filteredProducts.map((item, index) => (
                <ProductCard
                  key={item?.id || item?.title || `${item?.brand || "product"}-${index}`}
                  item={item}
                />
              ))}

            </div>

          </div>

        </div>

      </div>

      <ChatBot />

    </div>
  );
}

export default Home;