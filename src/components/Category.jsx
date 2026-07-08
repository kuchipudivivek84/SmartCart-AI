import { useNavigate } from "react-router-dom";

function Category() {
  const navigate = useNavigate();

  const categories = [
    "smartphones",
    "laptops",
    "fragrances",
    "skincare",
    "groceries",
    "home-decoration",
    "furniture",
    "tops",
    "womens-dresses",
    "mens-shirts",
    "mens-shoes",
    "womens-shoes",
    "womens-bags",
    "womens-jewellery",
    "sunglasses",
    "automotive",
    "motorcycle",
    "lighting"
  ];

  return (
    <div className="max-w-7xl mx-auto mt-10">
      <h2 className="text-3xl font-bold mb-6">
        Shop By Categories
      </h2>

      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-5">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() =>
              navigate(`/category/${category}`)
            }
            className="bg-white border rounded-lg shadow hover:bg-purple-600 hover:text-white transition p-5 font-semibold capitalize"
          >
            {category.replace(/-/g, " ")}
          </button>
        ))}
      </div>
    </div>
  );
}

export default Category;