# KeyPulse

KeyPulse is a secure and elegant password manager designed to store, manage, and protect your digital credentials. Built with a modern tech stack, it offers a sleek user interface, robust AES-256 encryption, and seamless JWT-based authentication to safeguard your digital life.

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [Usage](#usage)
- [Security](#security)
- [Contributing](#contributing)
- [License](#license)

## Features

- **Secure Password Storage**: Save, edit, and delete passwords with AES-256-CBC encryption.
- **User Authentication**: Register and log in using JWT-based authentication.
- **Dynamic Page Titles**: Unique browser tab titles (e.g., `KeyPulse - Login`) for each page, powered by React Helmet Async.
- **Intuitive UI**: Fixed navbar with links to Home, Password Vault, About, Contact, and a static Settings placeholder.
- **Non-Fixed Headers**: Consistent, animated headers on Login, Register, Manager, Home, About, and Contact pages, featuring the KeyPulse logo and tagline.
- **Password Vault**: View, copy, and manage credentials in a responsive table with clipboard functionality.
- **Toast Notifications**: Real-time feedback for user actions via React Toastify.
- **Responsive Design**: Tailwind CSS ensures a seamless experience across devices.

## Tech Stack

### Frontend
- **React**: Component-based UI with React Router for navigation.
- **Tailwind CSS**: Utility-first styling for a modern, responsive design.
- **Framer Motion**: Smooth animations for navbar, headers, and page elements.
- **React Toastify**: Notification system for user feedback.
- **React Helmet Async**: Dynamic `<title>` tags for improved SEO and user experience.

### Backend
- **Node.js with Express**: RESTful API server for handling requests.
- **MongoDB Atlas**: Cloud-hosted NoSQL database for storing user data and passwords.
- **Bcrypt**: Password hashing for secure user credential storage.
- **JSON Web Tokens (JWT)**: Secure authentication for protected routes.
- **Crypto**: AES-256-CBC encryption for password security.

### Other
- **UUID**: Generates unique identifiers for password entries.
- **Express Validator**: Sanitizes and validates user inputs.
- **Express Rate Limit**: Throttles API requests to enhance security.

## Installation

### Prerequisites
- **Node.js**: Version 16+ (v20 LTS recommended).
- **MongoDB Atlas**: Account for cloud database hosting.
- **Git**: For version control.

### Backend Setup
1. Navigate to the `backend` directory:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in `backend` with the following configuration:
   ```plaintext
   MONGO_URI=mongodb+srv://<username>:<password>@cluster0.tskxf80.mongodb.net/keypulse?retryWrites=true&w=majority
   DB_NAME=keypulse
   PORT=3000
   JWT_SECRET=your_jwt_secret_key_12345_change_this
   ENCRYPTION_KEY=7e8f9a0b1c2d3e4f5a6b7c8d9e0f123456789abcdef0123456789abcdef01234
   ```
   - Replace `<username>:<password>` with your MongoDB Atlas credentials.
   - Ensure `ENCRYPTION_KEY` is a 64-character hexadecimal string. Generate one using:
     ```bash
     node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
     ```
4. Start the backend server:
   ```bash
   node server.js
   ```
   - Confirm: `Server running on http://localhost:3000`.

### Frontend Setup
1. Navigate to the `frontend` directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the frontend development server:
   ```bash
   npm run dev
   ```
   - Access the app at `http://localhost:5173` (or Vite’s default port).

## Usage

1. **Register**: Visit `/register` to create an account with a username and password.
2. **Login**: Use `/login` to authenticate and access the Password Vault.
3. **Manage Passwords**:
   - Navigate to `/manager`.
   - Add a password (site, username, password; each must be 4+ characters).
   - Edit or delete existing passwords.
   - Copy credentials to the clipboard with a single click.
4. **Navigation**:
   - Use the fixed navbar to access:
     - **Home** (`/`): Welcome page with links to login or register.
     - **Password Vault** (`/manager`): Credential management interface.
     - **About** (`/about`): Overview of the KeyPulse project.
     - **Contact** (`/contact`): Support contact information.
     - **Settings**: Static placeholder (non-functional).
5. **Verify Page Titles**:
   - Check browser tab titles for each route:
     - `/`: `KeyPulse - Home`
     - `/login`: `KeyPulse - Login`
     - `/register`: `KeyPulse - Register`
     - `/manager`: `KeyPulse - Password Vault`
     - `/about`: `KeyPulse - About`
     - `/contact`: `KeyPulse - Contact`

## Security

- **Encryption**: Passwords are encrypted with AES-256-CBC using a 32-byte key and random initialization vectors (IVs).
- **Authentication**: JWTs secure API routes; bcrypt hashes user passwords for storage.
- **Input Validation**: Express Validator sanitizes inputs to prevent injection attacks.
- **Rate Limiting**: Express Rate Limit prevents brute-force attacks on API endpoints.
- **Best Practices**:
  - Regularly update your MongoDB Atlas password.
  - Keep the `.env` file secure and untracked by adding it to `.gitignore`.
  - Use a strong `JWT_SECRET` and `ENCRYPTION_KEY`.
  - Monitor backend logs for unauthorized access attempts.

## Contributing

Contributions are welcome to enhance KeyPulse! To contribute:
1. Fork the repository at [https://github.com/xenon1919/KeyPulse](https://github.com/xenon1919/KeyPulse).
2. Create a feature branch:
   ```bash
   git checkout -b feature/YourFeature
   ```
3. Commit your changes:
   ```bash
   git commit -m 'Add YourFeature'
   ```
4. Push to the branch:
   ```bash
   git push origin feature/YourFeature
   ```
5. Open a Pull Request on [https://github.com/xenon1919/KeyPulse](https://github.com/xenon1919/KeyPulse).

Please follow the [Code of Conduct](CODE_OF_CONDUCT.md) and ensure all tests pass before submitting.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

**KeyPulse**: Secure your digital life with elegance.
