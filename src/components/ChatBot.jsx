import { useState, useEffect, useRef, useContext } from "react";
import { Link } from "react-router-dom";
import { sendMessage } from "../Services/chatAPI";
import { CartContext } from "../context/CartContext";
import { FaRobot, FaMicrophone, FaPaperPlane } from "react-icons/fa";

function ChatBot() {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const { addToCart } = useContext(CartContext);
  const [messages, setMessages] = useState([
    {
      sender: "bot",
      text: "👋 Hello! I'm SmartCart AI.\n\nI can:\n\n• Recommend products\n• Build custom setups (Gaming, Coding, Office under ₹50,000)\n• Compare products\n• Help you choose the best deals\n• Answer shopping questions",
      products: [],
    },
  ]);

  const messagesEndRef = useRef(null);

  const handleAddBundleToCart = (bundle) => {
    bundle.forEach((product) => {
      addToCart(product);
    });
    alert(`Added ${bundle.length} items to cart!`);
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages]);

  const startVoice = () => {
    if (!("webkitSpeechRecognition" in window)) {
      alert("Voice Search is not supported.");
      return;
    }

    const recognition = new window.webkitSpeechRecognition();
    recognition.lang = "en-IN";
    recognition.start();

    recognition.onresult = (event) => {
      setMessage(event.results[0][0].transcript);
    };
  };

  const handleSend = async (event) => {
    event.preventDefault();

    if (!message.trim()) return;

    const userMessage = {
      sender: "user",
      text: message,
    };

    setMessages((prev) => [...prev, userMessage]);
    setLoading(true);

    try {
      const response = await sendMessage(message);

      setMessages((prev) => [
        ...prev,
        {
          sender: "bot",
          text: response.reply,
          products: response.products || [],
          recommendedProduct: response.recommendedProduct || null,
          bundle: response.bundle || null,
          isBundle: response.isBundle || false,
        },
      ]);
    } catch (error) {
      console.log(error);

      setMessages((prev) => [
        ...prev,
        {
          sender: "bot",
          text: "❌ Sorry! AI is currently unavailable.",
          products: [],
        },
      ]);
    } finally {
      setLoading(false);
      setMessage("");
    }
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="flex items-center gap-2 rounded-full bg-blue-600 px-4 py-3 text-sm font-semibold text-white shadow-lg transition hover:bg-blue-700"
      >
        <FaRobot />
        {open ? "Close Chat" : "Ask SmartCart AI"}
      </button>

      {open && (
        <div className="mt-3 w-80 max-w-[90vw] overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-2xl">
          <div className="flex items-center justify-between bg-blue-600 px-4 py-3 text-white">
            <div>
              <p className="font-semibold">SmartCart AI</p>
              <p className="text-xs text-blue-100">Online now</p>
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="text-xl font-bold"
            >
              ×
            </button>
          </div>

          <div className="flex h-72 flex-col gap-2 overflow-y-auto bg-gray-50 p-3">
            {messages.map((msg, index) => (
              <div
                key={`${msg.sender}-${index}`}
                className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl px-3 py-2 text-sm ${
                    msg.sender === "user"
                      ? "bg-blue-600 text-white"
                      : "bg-white text-gray-800 shadow"
                  }`}
                >
                  <p className="whitespace-pre-line">{msg.text}</p>
                  {msg.isBundle && msg.bundle ? (
                    <div className="mt-3 rounded-lg border-2 border-green-400 bg-green-50 p-3">
                      <p className="mb-2 text-xs font-bold text-green-800">🎯 COMPLETE SETUP</p>
                      <div className="space-y-2">
                        {msg.bundle.map((product, idx) => (
                          <div key={`${product.id}-${idx}`} className="flex items-center justify-between text-xs">
                            <span className="font-semibold text-gray-800">{product.title.substring(0, 20)}...</span>
                            <span className="text-green-700 font-bold">₹{product.price}</span>
                          </div>
                        ))}
                      </div>
                      <div className="mt-2 border-t border-green-200 pt-2">
                        <p className="font-bold text-green-800">Total: ₹{msg.bundle.reduce((sum, p) => sum + p.price, 0)}</p>
                      </div>
                      <button
                        onClick={() => handleAddBundleToCart(msg.bundle)}
                        className="mt-2 w-full rounded-lg bg-green-600 px-3 py-2 text-xs font-bold text-white hover:bg-green-700"
                      >
                        🛒 Add All to Cart
                      </button>
                    </div>
                  ) : (
                    <>
                      {msg.recommendedProduct && (
                        <div className="mt-2 rounded border border-amber-200 bg-amber-50 px-2 py-2 text-xs text-amber-800">
                          🎯 Best match: <span className="font-semibold">{msg.recommendedProduct.title}</span>
                        </div>
                      )}
                      {msg.products?.length > 0 && (
                        <div className="mt-2 space-y-2">
                          {msg.products.map((product, productIndex) => (
                            <Link
                              key={`${product.id || product.title}-${productIndex}`}
                              to={`/product/${product.id}`}
                              className="block rounded-lg border border-gray-200 bg-gray-50 p-2 transition hover:border-blue-500 hover:bg-white"
                            >
                              <div className="flex items-center gap-2">
                                <img
                                  src={product.thumbnail || product.images?.[0]}
                                  alt={product.title}
                                  className="h-10 w-10 rounded object-cover"
                                />
                                <div className="min-w-0 flex-1">
                                  <p className="truncate text-xs font-semibold text-gray-800">{product.title}</p>
                                  <div className="flex items-center justify-between text-[11px] text-gray-600">
                                    <span>₹{product.price}</span>
                                    <span>⭐ {product.rating}</span>
                                  </div>
                                </div>
                              </div>
                            </Link>
                          ))}
                        </div>
                      )}
                    </>
                  )}
                </div>
              </div>
            ))}

            {loading && (
              <div className="flex justify-start">
                <div className="rounded-2xl bg-white px-3 py-2 text-sm text-gray-600 shadow">
                  Typing...
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          <form onSubmit={handleSend} className="flex items-center gap-2 border-t border-gray-200 bg-white p-2">
            <input
              type="text"
              value={message}
              onChange={(event) => setMessage(event.target.value)}
              placeholder="Ask about products..."
              className="flex-1 rounded-full border border-gray-300 px-3 py-2 text-sm outline-none focus:border-blue-500"
            />
            <button
              type="button"
              onClick={startVoice}
              className="rounded-full bg-gray-100 p-2 text-gray-600 transition hover:bg-gray-200"
            >
              <FaMicrophone />
            </button>
            <button
              type="submit"
              disabled={loading}
              className="rounded-full bg-blue-600 p-2 text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-blue-300"
            >
              <FaPaperPlane />
            </button>
          </form>
        </div>
      )}
    </div>
  );
}

export default ChatBot;