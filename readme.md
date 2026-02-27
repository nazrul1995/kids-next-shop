🦸 Hero Kidz BD – Full Stack eCommerce Platform

A modern full-stack eCommerce web application built with Next.js (App Router) featuring authentication, cart management, order processing, and invoice email functionality.

🌐 Live Site: https://hero-next-project.vercel.app/

🚀 Features

🔐 Google Authentication (NextAuth.js)

🛒 Shopping Cart System

📦 Order Creation & Storage

💰 Automatic Total Price Calculation

📧 Invoice Email Sending

🗄️ MongoDB Database Integration

⚡ Server Actions (Next.js 14)

🌍 Production Deployment on Vercel

🛠️ Tech Stack

Framework: Next.js 14 (App Router)

Authentication: NextAuth.js (Google Provider)

Database: MongoDB Atlas

Email Service: Nodemailer (SMTP)

Deployment: Vercel

Language: JavaScript

📂 Project Structure
app/
components/
lib/
  ├── dbConnect.js
  ├── authOptions.js
  ├── sendInvoiceEmail.js
actions/
  ├── cart.js
  ├── order.js
⚙️ Installation & Setup
1️⃣ Clone the Repository
git clone https://github.com/your-username/hero-next-project.git
cd hero-next-project
2️⃣ Install Dependencies
npm install
3️⃣ Create Environment Variables

Create a .env.local file in the root directory:

MONGODB_URI=your_mongodb_connection_string
DBNAME=your_database_name

GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret

NEXTAUTH_SECRET=your_random_secret

EMAIL_USER=your_email
EMAIL_PASS=your_email_app_password

⚠️ Important: Never commit your .env.local file.

4️⃣ Run Development Server
npm run dev

Open:

http://localhost:3000
🧾 Order & Invoice Flow

User logs in with Google

Adds products to cart

Creates order

Order is stored in MongoDB

Cart is cleared

Invoice email is sent automatically

All sensitive operations are handled securely via Server Actions.

🔐 Authentication

Authentication is powered by NextAuth.js with Google OAuth integration.

Session-based authentication ensures secure access to protected features.

🌍 Deployment

The application is deployed using Vercel.

To deploy manually:

vercel

Make sure to configure environment variables in:

Vercel → Project Settings → Environment Variables

📈 Future Improvements

💳 Stripe Payment Integration

📊 Admin Dashboard

📜 Order History Page

🧾 PDF Invoice Download

⭐ Product Reviews

🔒 Role-based Access Control

👨‍💻 Author

Nazrul Islam

GitHub: https://github.com/nazrul1995

Email: independentnazrul@gmail.com

📄 License

This project is licensed under the MIT License.