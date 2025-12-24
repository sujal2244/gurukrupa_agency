# Gurukrupa Agency

Gurukrupa Agency is a specialized management application built with **Next.js 15**, designed to handle billing, client management, and stock tracking. The application provides a complete dashboard for managing business operations, including automated invoice generation and secure user authentication.

## 🚀 Features

* **Secure Authentication**: User sign-in and sign-up functionality using `bcrypt` for password hashing and `jsonwebtoken` (JWT) for secure sessions.
* **Comprehensive Dashboard**: A centralized hub with quick access to Bill, Orders, Billing History, Payment, Stock, and Clients management.
* **Billing Management**:
* Create and track detailed invoices with unique invoice numbers.
* Manage itemized lists within bills including quantity, rates, and tax calculations.
* Filter bills by client, ID, month/year, date (today), or payment status (paid/unpaid).


* **Client Database**: Store and manage client information, including addresses, phone numbers, and GST details.
* **Stock Tracking**: Monitor inventory levels for different items.
* **PDF Invoice Generation**: Export and print professional invoices using `jspdf` and `html2pdf.js`.

## 🛠️ Tech Stack

* **Frontend**: React 19, Next.js 15 (App Router), Tailwind CSS 4.
* **Backend**: Next.js API Routes.
* **Database**: MongoDB with Mongoose ODM.
* **Libraries**:
* `axios`: For handling API requests.
* `mongoose`: For data modeling.
* `react-icons`: For dashboard iconography.
* `uuid`: For unique identifier generation.



## 📋 Prerequisites

Before you begin, ensure you have the following installed:

* [Node.js](https://nodejs.org/) (Latest LTS recommended)
* [MongoDB](https://www.mongodb.com/) (Local or Atlas instance)

## 🔧 Installation & Setup

1. **Clone the repository**:
```bash
git clone <repository-url>
cd gurukrupa_agency

```


2. **Install dependencies**:
```bash
npm install

```


3. **Environment Variables**:
Create a `.env` file in the root directory and add your MongoDB connection string:
```env
MONGO_URI=your_mongodb_connection_string

```


4. **Run the development server**:
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev

```


5. **Access the application**:
Open [http://localhost:3000](https://www.google.com/search?q=http://localhost:3000) in your browser.

## 📁 Project Structure

* `src/app/api/`: Contains backend API endpoints for authentication, billing, and client management.
* `src/models/`: Mongoose schemas for `Bill`, `Client`, `Item`, and `User`.
* `src/lib/`: Database connection logic and utility functions.
* `src/app/dashboard/`: UI pages for various agency management modules.
* `public/`: Static assets like the Gurukrupa logo.

## 📜 Scripts

* `npm run dev`: Starts the development server.
* `npm run build`: Creates an optimized production build.
* `npm run start`: Starts the production server.
* `npm run lint`: Runs ESLint to check for code quality issues.