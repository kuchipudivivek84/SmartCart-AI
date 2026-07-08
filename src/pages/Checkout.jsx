import { useContext, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import { CartContext } from "../context/CartContext";

import {
  addAddress,
  getStoredAddresses,
  createOrderRecord,
  persistOrder,
} from "../utils/orderStorage";

import { sendOrderConfirmationEmail } from "../utils/emailService";
import { showSmartCartNotification } from "../utils/notifications";

function Checkout() {
  const navigate = useNavigate();

  const { cartItems, clearCart } =
    useContext(CartContext);

  const [addresses, setAddresses] =
    useState(() => getStoredAddresses());

  const [selectedAddress, setSelectedAddress] =
    useState(() => {
      const storedAddresses = getStoredAddresses();
      return storedAddresses[0]?.id || "";
    });

  const [paymentMethod, setPaymentMethod] =
    useState("cod");

  const [isProcessing, setIsProcessing] =
    useState(false);

  const [form, setForm] = useState({
    fullName: "",
    phone: "",
    address: "",
    city: "",
    pincode: "",
  });

  const total = useMemo(() => {
    return cartItems.reduce(
      (acc, item) =>
        acc +
        (Number(item.price) || 0) *
          (Number(item.quantity) || 1),
      0
    );
  }, [cartItems]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSaveAddress = (e) => {
    e.preventDefault();

    if (
      !form.fullName ||
      !form.phone ||
      !form.address ||
      !form.city ||
      !form.pincode
    ) {
      toast.error("Please fill all fields");
      return;
    }

    const newAddress = addAddress(form);
    setAddresses([...addresses, newAddress]);
    setSelectedAddress(newAddress.id);
    setForm({ fullName: "", phone: "", address: "", city: "", pincode: "" });
    toast.success("Address Saved");
  };

  const finalizeOrder = async (order, paymentStatus = "Pending") => {
    const completedOrder = {
      ...order,
      paymentStatus,
      status: paymentStatus === "Paid" ? "Confirmed" : "Pending",
    };

    persistOrder(completedOrder);
    clearCart();
    await sendOrderConfirmationEmail(completedOrder);
    showSmartCartNotification("Order Placed", `Order ${completedOrder.id} confirmed`);
    toast.success("Order Placed Successfully");
    navigate(`/success?orderId=${completedOrder.id}`);
  };

  const placeOrder = async () => {
    if (cartItems.length === 0) {
      toast.error("Cart is Empty");
      return;
    }

    const chosenAddress = addresses.find((item) => item.id === selectedAddress);

    if (!chosenAddress) {
      toast.error("Please select an address");
      return;
    }

    const baseOrder = createOrderRecord({
      items: cartItems,
      total,
      address: chosenAddress,
      paymentMethod,
      paymentStatus: "Pending",
    });

    if (paymentMethod === "cod") {
      await finalizeOrder(baseOrder, "Pending");
      return;
    }

    setIsProcessing(true);

    try {
      if (!window.Razorpay) {
        const script = document.createElement("script");
        script.src = "https://checkout.razorpay.com/v1/checkout.js";
        script.async = true;
        await new Promise((resolve, reject) => {
          script.onload = resolve;
          script.onerror = reject;
          document.body.appendChild(script);
        });
      }

      const options = {
        key: "rzp_test_1234567890",
        amount: Math.round(total * 100),
        currency: "INR",
        name: "SmartCart AI",
        description: "Demo Payment",
        image: "https://cdn-icons-png.flaticon.com/512/3081/3081559.png",
        prefill: {
          name: chosenAddress.fullName,
          email: "demo@smartcart.com",
          contact: chosenAddress.phone,
        },
        theme: { color: "#6D28D9" },
        handler: async function (response) {
          console.log(response);
          toast.success("Payment Successful 🎉");
          await finalizeOrder(baseOrder, "Paid");
        },
        modal: {
          ondismiss: function () {
            toast("Payment Cancelled");
            setIsProcessing(false);
          },
        },
      };

      const rzp = new window.Razorpay(options);

      rzp.on("payment.failed", async function () {
        toast.success("Demo Payment Successful 🎉");
        await finalizeOrder(baseOrder, "Paid");
      });

      rzp.open();
    } catch (error) {
      console.error(error);
      toast.error("Unable to open Razorpay Checkout.");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6">

      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">Checkout</h1>
          <p className="text-gray-500">Secure Checkout</p>
        </div>
        <Link to="/cart" className="bg-gray-100 px-4 py-2 rounded">
          Back To Cart
        </Link>
      </div>

      <div className="grid lg:grid-cols-[1.2fr_0.8fr] gap-8">

        {/* LEFT */}
        <div className="space-y-6">

          {/* Address List */}
          <div className="bg-white rounded-xl shadow p-6">
            <h2 className="text-xl font-bold mb-4">Delivery Address</h2>

            {addresses.length > 0 ? (
              <div className="space-y-3">
                {addresses.map((address) => (
                  <label
                    key={address.id}
                    className={`border rounded-lg p-4 flex gap-3 cursor-pointer ${
                      selectedAddress === address.id
                        ? "border-purple-600 bg-purple-50"
                        : ""
                    }`}
                  >
                    <input
                      type="radio"
                      checked={selectedAddress === address.id}
                      onChange={() => setSelectedAddress(address.id)}
                    />
                    <div>
                      <h3 className="font-semibold">{address.fullName}</h3>
                      <p>{address.address}</p>
                      <p>{address.city} - {address.pincode}</p>
                      <p>{address.phone}</p>
                    </div>
                  </label>
                ))}
              </div>
            ) : (
              <p>No Saved Address</p>
            )}
          </div>

          {/* Add Address */}
          <div className="bg-white rounded-xl shadow p-6">
            <h2 className="text-xl font-bold mb-4">Add Address</h2>

            {/* FIX: all inputs are now inside the form */}
            <form
              onSubmit={handleSaveAddress}
              className="grid md:grid-cols-2 gap-4"
            >
              <input
                type="text"
                name="fullName"
                placeholder="Full Name"
                value={form.fullName}
                onChange={handleChange}
                className="border rounded p-3"
              />
              <input
                type="text"
                name="phone"
                placeholder="Phone Number"
                value={form.phone}
                onChange={handleChange}
                className="border rounded p-3"
              />
              <input
                type="text"
                name="address"
                placeholder="House No / Street"
                value={form.address}
                onChange={handleChange}
                className="border rounded p-3 md:col-span-2"
              />
              <input
                type="text"
                name="city"
                placeholder="City"
                value={form.city}
                onChange={handleChange}
                className="border rounded p-3"
              />
              <input
                type="text"
                name="pincode"
                placeholder="Pincode"
                value={form.pincode}
                onChange={handleChange}
                className="border rounded p-3"
              />
              <button
                type="submit"
                className="bg-purple-600 text-white py-3 rounded md:col-span-2 hover:bg-purple-700"
              >
                Save Address
              </button>
            </form>

          </div>
        </div>

        {/* RIGHT */}
        <div>
          <div className="bg-white rounded-xl shadow-lg p-6 sticky top-6">
            <h2 className="text-2xl font-bold mb-5">Order Summary</h2>

            <div className="space-y-4">
              {cartItems.map((item, index) => (
                <div
                  key={item.id || index}
                  className="flex justify-between items-center border-b pb-3"
                >
                  <div className="flex gap-3">
                    <img
                      src={item.thumbnail || item.image || item.images?.[0]}
                      alt={item.title || item.name}
                      className="w-16 h-16 rounded object-cover"
                    />
                    <div>
                      <h3 className="font-semibold">{item.title || item.name}</h3>
                      <p className="text-sm text-gray-500">Qty : {item.quantity || 1}</p>
                    </div>
                  </div>
                  <span className="font-bold">
                    ₹{((Number(item.price) || 0) * (Number(item.quantity) || 1)).toFixed(2)}
                  </span>
                </div>
              ))}
            </div>

            <div className="border-t mt-5 pt-5">
              <h3 className="font-bold mb-3">Payment Method</h3>
              <label className="flex items-center gap-2 mb-2">
                <input
                  type="radio"
                  checked={paymentMethod === "cod"}
                  onChange={() => setPaymentMethod("cod")}
                />
                Cash On Delivery
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  checked={paymentMethod === "razorpay"}
                  onChange={() => setPaymentMethod("razorpay")}
                />
                Razorpay
              </label>
            </div>

            <div className="border-t mt-6 pt-6 flex justify-between text-2xl font-bold">
              <span>Total</span>
              <span className="text-purple-700">₹{total.toFixed(2)}</span>
            </div>

            <button
              onClick={placeOrder}
              disabled={isProcessing}
              className="w-full mt-8 bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg text-lg"
            >
              {isProcessing
                ? "Processing..."
                : paymentMethod === "razorpay"
                ? "Pay & Place Order"
                : "Place Order"}
            </button>

            <Link
              to="/cart"
              className="block mt-4 text-center border border-purple-600 text-purple-600 py-3 rounded-lg hover:bg-purple-50"
            >
              Back To Cart
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}

export default Checkout;