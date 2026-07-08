const ORDERS_KEY = "smartcart_orders";
const ADDRESSES_KEY = "smartcart_addresses";

export const getStoredAddresses = () => {
  if (typeof window === "undefined") return [];

  try {
    const stored = localStorage.getItem(ADDRESSES_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error("Failed to read addresses", error);
    return [];
  }
};

export const saveAddresses = (addresses) => {
  if (typeof window === "undefined") return;
  localStorage.setItem(ADDRESSES_KEY, JSON.stringify(addresses));
};

export const addAddress = (address) => {
  const addresses = getStoredAddresses();
  const nextAddress = {
    id: Date.now().toString(),
    ...address,
    createdAt: new Date().toISOString(),
  };

  saveAddresses([...addresses, nextAddress]);
  return nextAddress;
};

export const updateAddress = (id, updates) => {
  const addresses = getStoredAddresses();
  const nextAddresses = addresses.map((address) =>
    address.id === id ? { ...address, ...updates } : address
  );

  saveAddresses(nextAddresses);
  return nextAddresses;
};

export const deleteAddress = (id) => {
  const addresses = getStoredAddresses();
  const nextAddresses = addresses.filter((address) => address.id !== id);
  saveAddresses(nextAddresses);
  return nextAddresses;
};

export const getStoredOrders = () => {
  if (typeof window === "undefined") return [];

  try {
    const stored = localStorage.getItem(ORDERS_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error("Failed to read orders", error);
    return [];
  }
};

export const saveOrders = (orders) => {
  if (typeof window === "undefined") return;
  localStorage.setItem(ORDERS_KEY, JSON.stringify(orders));
};

export const persistOrder = (order) => {
  const orders = getStoredOrders();
  const nextOrders = [order, ...orders.filter((item) => item.id !== order.id)];
  saveOrders(nextOrders);
  return order;
};

export const createOrderRecord = ({ items, total, address, paymentMethod, paymentStatus = "Pending" }) => ({
  id: `ORD-${Date.now()}`,
  items,
  total,
  address,
  paymentMethod,
  paymentStatus,
  status: paymentStatus === "Paid" ? "Confirmed" : "Pending",
  createdAt: new Date().toISOString(),
});
