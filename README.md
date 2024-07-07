# Scatch E-Commerce Website

Welcome to Scatch, a unique and interactive e-commerce platform where users can buy products, chat with admin support, and enjoy a seamless shopping experience. The admin has the ability to manage products and view insightful sales graphs.

## Features

### User Features
- **Account Management**: Users can create an account and log in to access the platform.
- **Browse Products**: Users can browse a variety of products on the products page.
- **Add to Cart**: Users can add products to their cart for purchase.
- **Checkout**: Users can make payments through Stripe from the cart.
- **Chat with Admin**: Users can directly chat with admin support via web sockets.

### Admin Features
- **Product Management**: Admin can add new products to the catalog.
- **Sales Analytics**: Admin can view graphs showing products sold.
- **Customer Support**: Admin can chat directly with users to provide support.

## Technology Stack

- **Frontend**: HTML, CSS (Tailwind CSS), JavaScript, EJS
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Authentication**: JSON Web Token (JWT)
- **Payment Integration**: Stripe
- **Real-time Communication**: Socket.IO

## Getting Started

### Prerequisites

Make sure you have the following installed:
- Node.js
- MongoDB

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-github-username/scatch-ecommerce.git
   cd scatch-ecommerce
   Install dependencies

2.Copy code
npm install
Set up environment variables

4. Create a .env file in the root directory and add the following:

env
Copy code
PORT=3000
MONGODB_URI=mongodb://localhost:27017/scatch
JWT_SECRET=your_jwt_secret
STRIPE_SECRET_KEY=your_stripe_secret_key
Run the application

4. Copy code
npm start
The application should now be running on http://localhost:3000.
