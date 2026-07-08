import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { getStoredOrders } from "../utils/orderStorage";
import { downloadInvoice } from "../utils/invoice";

function OrderHistory() {
  const [orders] = useState(() => getStoredOrders());

  const summary = useMemo(() => orders.length, [orders]);

  return (
    <div className="mx-auto max-w-6xl p-6">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Order History</h1>
          <p className="text-sm text-gray-600">{summary} orders tracked locally</p>
        </div>
        <Link to="/" className="rounded bg-purple-600 px-4 py-2 text-white">
          Continue Shopping
        </Link>
      </div>

      {orders.length === 0 ? (
        <div className="rounded border border-dashed border-gray-300 bg-gray-50 p-8 text-center text-gray-600">
          No orders yet. Complete a checkout to see your history here.
        </div>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <div key={order.id} className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
              <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
                <div>
                  <p className="font-semibold">{order.id}</p>
                  <p className="text-sm text-gray-500">{new Date(order.createdAt).toLocaleString()}</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold">₹{order.total}</p>
                  <p className="text-sm text-green-600">{order.status}</p>
                </div>
              </div>

              <div className="mb-4 flex flex-wrap gap-2">
                <Link to={`/track-order/${order.id}`} className="rounded bg-blue-600 px-3 py-1.5 text-sm font-semibold text-white">
                  Track Order
                </Link>
                <button onClick={() => downloadInvoice(order)} className="rounded bg-purple-600 px-3 py-1.5 text-sm font-semibold text-white">
                  Download Invoice
                </button>
              </div>

              <div className="grid gap-3 md:grid-cols-2">
                <div>
                  <p className="text-sm font-semibold text-gray-700">Items</p>
                  <ul className="mt-1 text-sm text-gray-600">
                    {order.items.map((item) => (
                      <li key={`${order.id}-${item._id}`}>
                        • {item.name} — ₹{item.price}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-700">Delivery</p>
                  <p className="text-sm text-gray-600">{order.address?.fullName}</p>
                  <p className="text-sm text-gray-600">{order.address?.address}</p>
                  <p className="text-sm text-gray-600">{order.address?.city} • {order.address?.phone}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default OrderHistory;
