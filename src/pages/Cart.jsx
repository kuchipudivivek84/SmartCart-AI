import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../context/CartContext";

function Cart() {
  const navigate = useNavigate();

  const { cartItems, removeFromCart } =
    useContext(CartContext);

  const total = cartItems.reduce(
    (acc, item) =>
      acc + item.price * (item.quantity || 1),
    0
  );

  return (
    <div className="min-h-screen bg-gray-100 py-10">

      <div className="max-w-6xl mx-auto px-4">

        <h1 className="text-4xl font-bold mb-8">
          🛒 Shopping Cart
        </h1>

        {cartItems.length === 0 ? (
          <div className="bg-white rounded-xl shadow-lg p-10 text-center">

            <h2 className="text-3xl font-bold mb-4">
              Your Cart is Empty
            </h2>

            <p className="text-gray-500 mb-6">
              Looks like you haven't added anything yet.
            </p>

            <button
              onClick={() => navigate("/")}
              className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg"
            >
              Continue Shopping
            </button>

          </div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-8">

            {/* Cart Items */}

            <div className="lg:col-span-2">

              {cartItems.map((item, index) => (

                <div
                  key={item.id || item._id || index}
                  className="bg-white rounded-xl shadow-md p-5 mb-5 flex items-center justify-between"
                >

                  <div className="flex items-center gap-5">

                    <img
                      src={
                        item.thumbnail ||
                        item.image
                      }
                      alt={
                        item.title ||
                        item.name
                      }
                      className="w-28 h-28 object-cover rounded-lg"
                    />

                    <div>

                      <h2 className="text-xl font-bold">
                        {item.title ||
                          item.name}
                      </h2>

                      <p className="text-purple-600 font-bold mt-2">
                        ₹{item.price}
                      </p>

                      <p className="text-gray-500">
                        Quantity :
                        {" "}
                        {item.quantity || 1}
                      </p>

                      <p className="font-semibold mt-2">
                        Subtotal :
                        {" "}
                        ₹
                        {item.price *
                          (item.quantity || 1)}
                      </p>

                    </div>

                  </div>

                  <button
                    onClick={() =>
                      removeFromCart(
                        item.id || item._id
                      )
                    }
                    className="bg-red-500 hover:bg-red-600 text-white px-5 py-2 rounded-lg"
                  >
                    Remove
                  </button>

                </div>

              ))}

            </div>

            {/* Order Summary */}

            <div>

              <div className="bg-white rounded-xl shadow-lg p-6 sticky top-6">

                <h2 className="text-2xl font-bold mb-6">
                  Order Summary
                </h2>

                <div className="flex justify-between mb-4">

                  <span>
                    Items
                  </span>

                  <span>
                    {cartItems.length}
                  </span>

                </div>

                <div className="flex justify-between mb-4">

                  <span>
                    Delivery
                  </span>

                  <span className="text-green-600">
                    FREE
                  </span>

                </div>

                <hr className="my-4" />

                <div className="flex justify-between text-2xl font-bold">

                  <span>
                    Total
                  </span>

                  <span className="text-purple-700">
                    ₹{total}
                  </span>

                </div>

                <button
                  onClick={() =>
                    navigate("/checkout")
                  }
                  className="mt-8 w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg text-lg"
                >
                  Proceed to Checkout
                </button>

                <button
                  onClick={() =>
                    navigate("/")
                  }
                  className="mt-4 w-full border border-purple-600 text-purple-600 py-3 rounded-lg hover:bg-purple-50"
                >
                  Continue Shopping
                </button>

              </div>

            </div>

          </div>
        )}

      </div>

    </div>
  );
}

export default Cart;