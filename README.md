🛒 Smart Cart AI

A modern MERN stack e-commerce platform with an integrated AI-powered chatbot to help users search products, get recommendations, and shop smarter — built with React, Node.js, MongoDB, and Tailwind CSS.

🔗 Live Demo: https://smart-cart-ai-sand.vercel.app/


✨ Features


🏠 Clean, responsive Home page with product listings
🛍️ Add to cart, update quantity, remove items — full Cart management
💳 Smooth Checkout flow with order summary
🤖 AI Chatbot for product search, recommendations & customer support
🔐 User authentication (login/signup)
📱 Fully responsive design (mobile, tablet, desktop)
⚡ Fast, modern UI built with Tailwind CSS



🧰 Tech Stack

Frontend: React.js, Tailwind CSS, Vite/CRA
Backend: Node.js, Express.js
Database: MongoDB
AI Integration: OpenAI / AI Chatbot API
Deployment: Vercel (Frontend), Render/Railway (Backend, if applicable)


🚀 Getting Started

Prerequisites


Node.js (v18+)
MongoDB (local or Atlas)
npm or yarn


Installation

bash# Clone the repository
git clone https://github.com/<your-username>/smart-cart-ai.git
cd smart-cart-ai

# Install frontend dependencies
cd client
npm install

# Install backend dependencies
cd ../server
npm install

Environment Variables

Create a .env file in the server folder:

envMONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
OPENAI_API_KEY=your_openai_api_key
PORT=5000

Run the app

bash# Run backend
cd server
npm run dev

# Run frontend (in a new terminal)
cd client
npm start

The app will be available at http://localhost:3000


🌐 Live Deployment

🔗 https://smart-cart-ai-sand.vercel.app/


📂 Project Structure

smart-cart-ai/
├── client/          # React frontend
│   ├── src/
│   └── ...
├── server/          # Node.js + Express backend
│   ├── models/
│   ├── routes/
│   └── ...
├── screenshots/     # App screenshots for README
└── README.md


🤝 Contributing

Contributions, issues, and feature requests are welcome!
Feel free to check the issues page.


📄 License

This project is licensed under the MIT License.


👤 Author

Your Name
🔗 GitHub: @vivekkuchipudi84
🔗 LinkedIn: www.linkedin.com/in/vivek-kuchipudi-7a29a324b
