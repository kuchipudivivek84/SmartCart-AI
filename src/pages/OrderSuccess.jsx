import { Link, useSearchParams } from "react-router-dom";
import { getStoredOrders } from "../utils/orderStorage";
import { downloadInvoice } from "../utils/invoice";

function OrderSuccess() {
  const [searchParams] = useSearchParams();
  const orderId = searchParams.get("orderId");
  const order = getStoredOrders().find((entry) => entry.id === orderId);

  const handleDownload = () => {
    downloadInvoice(order);
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 p-6">
      <div className="w-full max-w-2xl rounded-2xl bg-white p-8 text-center shadow-lg">
        <h1 className="mb-4 text-4xl font-bold text-green-600">🎉 Order Placed Successfully</h1>
        <p className="mb-6 text-lg text-gray-600">Thank you for shopping with SmartCart. Your order is being processed.</p>

        {order && (
          <div className="mb-6 rounded-xl border border-gray-200 bg-gray-50 p-4 text-left text-sm text-gray-700">
            <p><span className="font-semibold">Order ID:</span> {order.id}</p>
            <p><span className="font-semibold">Payment:</span> {order.paymentMethod}</p>
            <p><span className="font-semibold">Total:</span> ₹{order.total}</p>
            <p><span className="font-semibold">Delivery:</span> {order.address?.address}, {order.address?.city}</p>
          </div>
        )}

        <div className="flex flex-wrap justify-center gap-3">
          <button onClick={handleDownload} className="rounded bg-purple-600 px-6 py-3 font-semibold text-white">Download Invoice</button>
          <Link to={`/track-order/${order?.id}`} className="rounded bg-gray-800 px-6 py-3 font-semibold text-white">Track Order</Link>
          <Link to="/order-history" className="rounded bg-gray-800 px-6 py-3 font-semibold text-white">View Order History</Link>
          <Link to="/" className="rounded bg-green-600 px-6 py-3 font-semibold text-white">Continue Shopping</Link>
        </div>
      </div>
    </div>
  );
}

export default OrderSuccess;