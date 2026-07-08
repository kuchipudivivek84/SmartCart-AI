import { useMemo } from "react";
import { Link, useParams } from "react-router-dom";
import { getStoredOrders } from "../utils/orderStorage";

function TrackOrder() {
  const { orderId } = useParams();
  const orders = getStoredOrders();
  const order = orders.find((entry) => entry.id === orderId);

  const progress = useMemo(() => {
    if (!order) return 0;
    if (order.status === "Delivered") return 100;
    if (order.status === "Shipped") return 70;
    return 30;
  }, [order]);

  return (
    <div className="mx-auto max-w-5xl p-6">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Track Order</h1>
          <p className="text-sm text-gray-600">Monitor your order status in real time.</p>
        </div>
        <Link to="/order-history" className="rounded bg-purple-600 px-4 py-2 text-white">
          Order History
        </Link>
      </div>

      {!order ? (
        <div className="rounded bg-white p-8 text-center text-gray-600 shadow">
          No order found with that ID.
        </div>
      ) : (
        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-wide text-purple-600">Order {order.id}</p>
              <h2 className="text-2xl font-bold">{order.status}</h2>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-500">Payment</p>
              <p className="font-semibold">{order.paymentMethod}</p>
            </div>
          </div>

          <div className="mb-6 h-3 overflow-hidden rounded-full bg-gray-200">
            <div className="h-full rounded-full bg-green-500 transition-all" style={{ width: `${progress}%` }} />
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <h3 className="mb-2 font-semibold">Delivery Address</h3>
              <p className="text-sm text-gray-600">{order.address?.fullName}</p>
              <p className="text-sm text-gray-600">{order.address?.address}</p>
              <p className="text-sm text-gray-600">{order.address?.city} - {order.address?.pincode}</p>
            </div>
            <div>
              <h3 className="mb-2 font-semibold">Order Summary</h3>
              <p className="text-sm text-gray-600">Items: {order.items?.length || 0}</p>
              <p className="text-sm text-gray-600">Total: ₹{order.total}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default TrackOrder;
