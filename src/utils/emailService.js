export const sendOrderConfirmationEmail = async (order) => {
  if (!order) return { ok: false, message: "No order provided" };

  try {
    const payload = {
      to: "guest@smartcart.ai",
      subject: `SmartCart Order Confirmed - ${order.id}`,
      body: `Hello! Your order ${order.id} has been placed successfully. Total: ₹${order.total}. Status: ${order.status}.`,
    };

    console.info("Order confirmation email payload", payload);
    return { ok: true, message: "Confirmation email prepared locally." };
  } catch (error) {
    console.error("Email sending failed", error);
    return { ok: false, message: "Email service unavailable" };
  }
};
