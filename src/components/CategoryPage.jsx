import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import API from "../Services/api";
import ProductCard from "../components/ProductCard";

function CategoryPage() {
  const { category } = useParams();

  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchCategoryProducts = async () => {
      try {
        const { data } = await API.get(
          `/products/category/${category}`
        );

        setProducts(data.products);
      } catch (error) {
        console.log(error);
      }
    };

    fetchCategoryProducts();
  }, [category]);

  return (
    <div className="max-w-7xl mx-auto p-6">

      <h1 className="text-3xl font-bold mb-6 capitalize">
        {category.replace(/-/g, " ")}
      </h1>

      <div className="grid md:grid-cols-4 gap-6">
        {products.map((item) => (
          <ProductCard
            key={item.id}
            item={item}
          />
        ))}
      </div>

    </div>
  );
}

export default CategoryPage;