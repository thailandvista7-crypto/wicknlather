# Wick & Lather - Premium Handmade Soaps & Candles Ecommerce

A full-stack, production-ready ecommerce platform built with Next.js, TypeScript, MongoDB, Stripe, and PayPal.

## 🚀 Features

### Customer Features
- **Product Browsing**: Browse soaps and candles with filtering and search
- **Shopping Cart**: Add to cart, update quantities, remove items
- **Checkout**: Secure checkout with Stripe and PayPal integration
- **User Authentication**: Sign up, login, password reset
- **Order Management**: View order history, track orders, request refunds
- **User Dashboard**: Manage profile, view orders, track order status

### Admin Features
- **Products Management**: Add, edit, delete, and manage products
- **Orders Management**: View all orders, update order status, track payments
- **Refund Management**: Process refund requests with Stripe/PayPal integration
- **Users Management**: View and manage user accounts

### Technical Features
- **SEO Optimized**: Meta tags, structured data, sitemap, robots.txt
- **Responsive Design**: Mobile-first, beautiful UI with Tailwind CSS
- **Secure Payments**: Stripe Checkout and PayPal integration
- **Image Handling**: Cloudinary support for product images
- **Performance**: Fast loading, lazy loading, optimized images

## 📋 Prerequisites

- Node.js 18+ and npm/yarn
- MongoDB (local or MongoDB Atlas)
- Stripe account (for payments)
- PayPal account (optional, for PayPal payments)
- Google OAuth credentials (for Google sign-in)
- Facebook App ID (for Facebook sign-in)
- Cloudinary account (optional, for image uploads)

## 🛠️ Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd wicknlather
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env.local` file in the root directory:
   ```env
   # Database
   MONGODB_URI=mongodb://localhost:27017/wicknlather

   # JWT
   JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
   JWT_EXPIRE=7d

   # Stripe
   NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_your_stripe_publishable_key
   STRIPE_SECRET_KEY=sk_test_your_stripe_secret_key
   STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret

   # PayPal
   NEXT_PUBLIC_PAYPAL_CLIENT_ID=your_paypal_client_id
   PAYPAL_CLIENT_SECRET=your_paypal_client_secret
   PAYPAL_MODE=sandbox

   # Cloudinary (Optional)
   CLOUDINARY_CLOUD_NAME=your_cloud_name
   CLOUDINARY_API_KEY=your_api_key
   CLOUDINARY_API_SECRET=your_api_secret

   # App
   NEXT_PUBLIC_APP_URL=http://localhost:3000
   NODE_ENV=development

   # Admin
   ADMIN_EMAIL=admin@wicknlather.com
   ADMIN_PASSWORD=admin123
   ```

4. **Set up the database**
   - Make sure MongoDB is running locally, or use MongoDB Atlas
   - Update `MONGODB_URI` in `.env.local`

5. **Seed sample products**
   ```bash
   npx ts-node scripts/seed-products.ts
   ```

6. **Create admin user**
   ```bash
   npx ts-node scripts/create-admin.ts
   ```

7. **Run the development server**
   ```bash
   npm run dev
   ```

8. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🔐 Admin Access

After running the `create-admin.ts` script, you can login with:
- **Email**: `admin@wicknlather.com` (or your `ADMIN_EMAIL`)
- **Password**: `admin123` (or your `ADMIN_PASSWORD`)

Access the admin panel at `/admin` after logging in.

## 💳 Payment Setup

### Stripe
1. Create a Stripe account at [stripe.com](https://stripe.com)
2. Get your API keys from the Stripe Dashboard
3. Set up webhooks:
   - Webhook URL: `https://yourdomain.com/api/payments/stripe/webhook`
   - Events: `checkout.session.completed`
4. Add keys to `.env.local`

### PayPal
1. Create a PayPal Developer account
2. Create an app and get Client ID and Secret
3. Add keys to `.env.local`

## 📁 Project Structure

```
wicknlather/
├── app/                    # Next.js app directory
│   ├── api/               # API routes
│   ├── admin/             # Admin pages
│   ├── dashboard/         # User dashboard
│   ├── shop/              # Shop pages
│   ├── products/          # Product detail pages
│   └── ...                # Other pages
├── components/            # React components
├── lib/                   # Utility functions
├── models/                # MongoDB models
├── scripts/                # Seed scripts
├── store/                  # State management
└── public/                # Static files
```

## 🎨 Brand Colors

- **Primary Green**: `#6B8E23` (Olive green)
- **Cream**: `#F5F5DC` (Off-white/cream)
- **Amber**: `#D4A574` (Soft amber/beige)
- **Dark**: `#4A5D23` (Dark green)

## 📝 API Routes

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user

### Products
- `GET /api/products` - Get all products (with filters)
- `GET /api/products/[id]` - Get product by ID
- `GET /api/products/slug/[slug]` - Get product by slug

### Orders
- `GET /api/orders` - Get user orders
- `POST /api/orders` - Create new order

### Payments
- `POST /api/payments/stripe/create-checkout` - Create Stripe checkout
- `POST /api/payments/stripe/webhook` - Stripe webhook handler
- `POST /api/payments/paypal/create-order` - Create PayPal order
- `POST /api/payments/paypal/capture-order` - Capture PayPal payment

### Admin
- `GET /api/admin/products` - Get all products (admin)
- `POST /api/admin/products` - Create product
- `PUT /api/admin/products/[id]` - Update product
- `DELETE /api/admin/products/[id]` - Delete product
- `GET /api/admin/orders` - Get all orders (admin)
- `GET /api/admin/users` - Get all users (admin)

### Refunds
- `GET /api/refunds` - Get refunds
- `POST /api/refunds` - Create refund request
- `PUT /api/admin/refunds/[id]` - Update refund status (admin)

## 🚀 Deployment

### Vercel (Recommended)
1. Push your code to GitHub
2. Import project to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy!

### Other Platforms
- Ensure Node.js 18+ is supported
- Set all environment variables
- Build command: `npm run build`
- Start command: `npm start`

## 📄 License

This project is licensed under the MIT License.

## 🤝 Support

For support, email hello@wicknlather.com or open an issue in the repository.

---

Built with ❤️ for Wick & Lather
