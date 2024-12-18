# Instagram Clone

This is a full-stack web application inspired by Instagram. The project is built with:
- **Backend**: Express.js and MongoDB
- **Frontend**: React.js, SCSS, Bootstrap, and Material-UI

> **Note:** This project is still incomplete and was originally created 3 years ago.

## Features
- [x] Seamless user authentication system with secure login functionality.
- [x] Intuitive user interface for browsing the feed, logging in, viewing individual posts, and creating posts.
- [x] Interactive post engagement with a like system integrated into the feed.
- [ ] Additional features and refinements are pending.

## Getting Started

### Prerequisites
- Node.js installed on your system.
- MongoDB connection URI.

### Installation Steps
1. Clone the repository:
   ```bash
   git clone https://github.com/sedky02/instagram-clone
   cd instagram-clone
   ```

2. Install dependencies:
   ```bash
   npm install
   npm run client-install
   ```

3. Create a `.env` file in the root directory with the following variables:
   ```env
   DB_URI=<your_mongo_db_uri>
   TOKEN_SECRET=<your_token_secret>
   PORT=5000
   ```

4. Start the application:
   ```bash
   npm run dev
   ```

## Scripts
- `npm install`: Installs server-side dependencies.
- `npm run client-install`: Installs client-side dependencies.
- `npm run client`: Starts the frontend in development mode.
- `npm run server`: Starts the backend in development mode.
- `npm run dev`: Starts both the backend and frontend in development mode.

## Technologies Used
- **Backend**: Node.js, Express.js, Mongoose, jsonwebtoken, multer, @hapi/joi
- **Frontend**: React.js, Redux, Axios, SCSS, Bootstrap, Material-UI

---

Feel free to contribute or provide feedback!
