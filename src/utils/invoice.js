export const downloadInvoice = (order) => {
  if (!order) return;

  const content = [
    "SmartCart Invoice",
    "=================",
    `Order ID: ${order.id}`,
    `Customer: ${order.address?.fullName || "Guest"}`,
    `Phone: ${order.address?.phone || "N/A"}`,
    `Address: ${order.address?.address || ""}, ${order.address?.city || ""}`,
    `Payment: ${order.paymentMethod}`,
    `Total: ₹${order.total}`,
    `Status: ${order.status}`,
    "Thank you for shopping with SmartCart!",
  ].join("\n");

  const blob = new Blob([content], { type: "text/plain;charset=utf-8" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = `${order.id || "invoice"}.txt`;
  link.click();
  URL.revokeObjectURL(link.href);
};
