import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import API from "../Services/api";

function CategoryPage() {
  const { category } = useParams();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategoryProducts = async () => {
      setLoading(true);

      try {
        const { data } = await API.get(`/products/category/${category}`);



        console.log("Category API:", data);

        let productList = [];

        if (Array.isArray(data)) {
          productList = data;
        } else if (Array.isArray(data.products)) {
          productList = data.products;
        } else if (Array.isArray(data.data)) {
          productList = data.data;
        }

        setProducts(productList);

      } catch (error) {
        console.log(error);

        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchCategoryProducts();
  }, [category]);

  return (
    <div className="min-h-screen bg-gray-50 p-6">

      <div className="max-w-7xl mx-auto">

        <div className="flex justify-between items-center mb-8">

          <div>
            <h1 className="text-3xl font-bold capitalize">
              {category?.replace(/-/g, " ")}
            </h1>

            <p className="text-gray-500 mt-2">
              Browse all {category} products.
            </p>
          </div>

          <Link
            to="/"
            className="bg-purple-600 text-white px-5 py-2 rounded-lg"
          >
            Back
          </Link>

        </div>

        {loading ? (

          <div className="text-center py-20">
            Loading Products...
          </div>

        ) : products.length === 0 ? (

          <div className="text-center py-20">
            No Products Found
          </div>

        ) : (

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">

            {products.map((product) => (

              <ProductCard
                key={product.id || product._id}
                item={product}
              />

            ))}

          </div>

        )}

      </div>

    </div>
  );
}

export default CategoryPage;