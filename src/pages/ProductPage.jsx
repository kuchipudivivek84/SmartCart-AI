import { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";

import API from "../Services/api";

import { CartContext } from "../context/CartContext";
import { WishlistContext } from "../context/WishlistContext";

function ProductPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { addToCart } = useContext(CartContext);
  const { addToWishlist } = useContext(WishlistContext);

  const [product, setProduct] = useState(null);

  const [loading, setLoading] = useState(true);

  const [selectedImage, setSelectedImage] =
    useState("");

  const [quantity, setQuantity] =
    useState(1);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const { data } = await API.get(
          `/products/${id}`
        );

        setProduct(data);

        setSelectedImage(
          data.thumbnail ||
            data.images?.[0]
        );

        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading)
    return (
      <h1 className="text-center mt-20 text-2xl">
        Loading...
      </h1>
    );

  if (!product)
    return (
      <h1 className="text-center mt-20 text-2xl">
        Product Not Found
      </h1>
    );

  return (
    <div className="bg-gray-100 min-h-screen">

      <div className="max-w-7xl mx-auto py-10 px-6">

        <div className="grid md:grid-cols-2 gap-10">

          {/* LEFT */}

          <div>

            <img
              src={selectedImage}
              alt={product.title}
              className="w-full h-125 object-contain bg-white rounded-xl shadow-lg"
            />

            <div className="flex gap-3 mt-5 overflow-x-auto">

              {product.images?.map(
                (img, index) => (
                  <img
                    key={index}
                    src={img}
                    alt=""
                    onClick={() =>
                      setSelectedImage(img)
                    }
                    className={`w-24 h-24 object-cover rounded-lg cursor-pointer border-2 ${
                      selectedImage === img
                        ? "border-purple-600"
                        : "border-gray-300"
                    }`}
                  />
                )
              )}

            </div>

          </div>

          {/* RIGHT */}

          <div>

            <h1 className="text-4xl font-bold">
              {product.title}
            </h1>

            <div className="flex items-center gap-3 mt-3">

              <span className="text-yellow-500 text-xl">
                ⭐ {product.rating}
              </span>

              <span className="text-green-600 font-semibold">
                {product.availabilityStatus}
              </span>

            </div>

            <h2 className="text-4xl text-purple-700 font-bold mt-6">

              ₹{product.price}

            </h2>

            <p className="text-red-500 mt-2">

              {product.discountPercentage}% OFF

            </p>

            <div className="mt-8 space-y-2">

              <p>

                <b>Brand :</b>{" "}

                {product.brand}

              </p>

              <p>

                <b>Category :</b>{" "}

                {product.category}

              </p>

              <p>

                <b>Stock :</b>{" "}

                {product.stock}

              </p>

              <p>

                <b>SKU :</b>{" "}

                {product.sku}

              </p>

              <p>

                <b>Warranty :</b>{" "}

                {product.warrantyInformation}

              </p>

              <p>

                <b>Shipping :</b>{" "}

                {product.shippingInformation}

              </p>

            </div>

            <div className="flex items-center gap-5 mt-8">

              <button
                onClick={() =>
                  quantity > 1 &&
                  setQuantity(
                    quantity - 1
                  )
                }
                className="bg-gray-300 px-4 py-2 rounded text-xl"
              >
                -
              </button>

              <span className="text-2xl font-bold">

                {quantity}

              </span>

              <button
                onClick={() =>
                  setQuantity(
                    quantity + 1
                  )
                }
                className="bg-gray-300 px-4 py-2 rounded text-xl"
              >
                +
              </button>

            </div>

            <div className="grid grid-cols-1 gap-4 mt-8">

              <button
                onClick={() =>
                  addToCart({
                    ...product,
                    quantity,
                  })
                }
                className="bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-lg text-lg font-semibold"
              >
                Add To Cart
              </button>

              <button
                onClick={() =>
                  addToWishlist(product)
                }
                className="bg-pink-500 hover:bg-pink-600 text-white py-3 rounded-lg text-lg font-semibold"
              >
                ❤️ Add To Wishlist
              </button>

              <button
                onClick={() => {
                  addToCart({
                    ...product,
                    quantity,
                  });

                  navigate("/checkout");
                }}
                className="bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg text-lg font-semibold"
              >
                Buy Now
              </button>

            </div>
                        {/* Description */}

            <div className="mt-12 bg-white p-6 rounded-xl shadow-lg">

              <h2 className="text-2xl font-bold mb-4">
                Product Description
              </h2>

              <p className="text-gray-700 leading-8">
                {product.description}
              </p>

            </div>

            {/* Specifications */}

            <div className="mt-8 bg-white p-6 rounded-xl shadow-lg">

              <h2 className="text-2xl font-bold mb-5">
                Specifications
              </h2>

              <table className="w-full border">

                <tbody>

                  <tr className="border">
                    <td className="p-3 font-semibold">
                      Brand
                    </td>
                    <td className="p-3">
                      {product.brand}
                    </td>
                  </tr>

                  <tr className="border">
                    <td className="p-3 font-semibold">
                      Category
                    </td>
                    <td className="p-3">
                      {product.category}
                    </td>
                  </tr>

                  <tr className="border">
                    <td className="p-3 font-semibold">
                      Weight
                    </td>
                    <td className="p-3">
                      {product.weight} g
                    </td>
                  </tr>

                  <tr className="border">
                    <td className="p-3 font-semibold">
                      Width
                    </td>
                    <td className="p-3">
                      {product.dimensions?.width}
                    </td>
                  </tr>

                  <tr className="border">
                    <td className="p-3 font-semibold">
                      Height
                    </td>
                    <td className="p-3">
                      {product.dimensions?.height}
                    </td>
                  </tr>

                  <tr className="border">
                    <td className="p-3 font-semibold">
                      Depth
                    </td>
                    <td className="p-3">
                      {product.dimensions?.depth}
                    </td>
                  </tr>

                  <tr className="border">
                    <td className="p-3 font-semibold">
                      Warranty
                    </td>
                    <td className="p-3">
                      {product.warrantyInformation}
                    </td>
                  </tr>

                  <tr className="border">
                    <td className="p-3 font-semibold">
                      Shipping
                    </td>
                    <td className="p-3">
                      {product.shippingInformation}
                    </td>
                  </tr>

                  <tr className="border">
                    <td className="p-3 font-semibold">
                      Return Policy
                    </td>
                    <td className="p-3">
                      {product.returnPolicy}
                    </td>
                  </tr>

                </tbody>

              </table>

            </div>

            {/* Reviews */}

            <div className="mt-8 bg-white p-6 rounded-xl shadow-lg">

              <h2 className="text-2xl font-bold mb-6">
                Customer Reviews
              </h2>

              {product.reviews?.length > 0 ? (

                product.reviews.map(
                  (review, index) => (

                    <div
                      key={index}
                      className="border-b py-5"
                    >

                      <div className="flex justify-between">

                        <h3 className="font-bold">

                          {review.reviewerName}

                        </h3>

                        <span className="text-yellow-500">

                          ⭐ {review.rating}

                        </span>

                      </div>

                      <p className="mt-2 text-gray-600">

                        {review.comment}

                      </p>

                      <small className="text-gray-400">

                        {new Date(
                          review.date
                        ).toLocaleDateString()}

                      </small>

                    </div>

                  )
                )

              ) : (

                <p>No Reviews Yet.</p>

              )}

            </div>

          </div>
        </div>

      </div>

    </div>

  );
}

export default ProductPage;