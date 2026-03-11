# 📝 Todo App - Full Stack Authentication

Full-stack Todo application with JWT Authentication, built with Node.js, Express, SQLite and Vanilla JavaScript.

## ✨ Features

- 🔐 **Authentication**: JWT-based registration and login
- ✅ **CRUD Operations**: Create, read, update, delete todos
- 📊 **Statistics**: Dashboard to track progress
- 🔍 **Filtering**: Filter todos (All/Active/Completed)
- 🎨 **Modern UI**: Responsive, user-friendly interface
- 🔒 **Security**: Password hashing (bcrypt), protected routes

## 🛠️ Tech Stack

### Backend

- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **SQLite** - Database (node:sqlite)
- **JWT** - Authentication
- **bcrypt.js** - Password hashing

### Frontend

- **Vanilla JavaScript** - No frameworks
- **HTML5/CSS3** - Modern UI
- **Fetch API** - HTTP requests

## 📋 Prerequisites

- Node.js 20.x or higher (required for `node:sqlite` support)
- npm or yarn

## 🚀 Installation

1. **Clone repository**

```bash
git clone <your-repo-url>
cd Chapter_3
```

2. **Install dependencies**

```bash
npm install
```

3. **Setup environment variables**

Create a `.env` file in the root directory:

```env
JWT_SECRET=your_super_secret_key_here_minimum_32_characters
PORT=5000
```

⚠️ **IMPORTANT**: Change `JWT_SECRET` to a complex random string!

4. **Start development server**

```bash
npm run dev
```

Server will run at: `http://localhost:5000`

## 📁 Project Structure

```
Chapter_3/
├── src/
│   ├── server.js              # Entry point
│   ├── db.js                  # Database configuration
│   ├── routes/
│   │   ├── authRoutes.js      # Authentication endpoints
│   │   └── todoRoutes.js      # Todo CRUD endpoints
│   └── middleware/
│       └── authMiddleware.js  # JWT verification
├── public/
│   ├── index.html             # Main todo app
│   ├── login.html             # Login page
│   ├── register.html          # Register page
│   └── style.css              # Styles
├── .env                       # Environment variables (not in git)
├── package.json
└── README.md
```

## 🔌 API Endpoints

### Authentication

- `POST /auth/register` - Register new user
- `POST /auth/login` - User login

### Todos (Authentication Required)

- `GET /todos` - Get all todos
- `POST /todos` - Create new todo
- `PUT /todos/:id` - Update todo
- `DELETE /todos/:id` - Delete todo

## 🧪 Testing

Use `todo-app.rest` file with VS Code extension **REST Client**:

1. Register/login to get token
2. Copy token to `@token` variable
3. Run test endpoints

## 🔒 Security Features

- ✅ Password hashing with bcrypt (salt rounds: 8)
- ✅ JWT token with expiration (24h)
- ✅ Protected routes with middleware
- ✅ User data isolation
- ✅ HTML escaping to prevent XSS

## 📝 Database Schema

### Users Table

```sql
CREATE TABLE users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT UNIQUE,
    password TEXT
)
```

### Todos Table

```sql
CREATE TABLE todos (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER,
    task TEXT,
    completed BOOLEAN DEFAULT 0,
    FOREIGN KEY(user_id) REFERENCES users(id)
)
```

## 🎯 Usage

1. Access `http://localhost:5000`
2. Register a new account
3. Login
4. Start managing todos!


## 🚀 Deployment

### Required Environment Variables:

- `JWT_SECRET` - Secret key for JWT
- `PORT` - Port number (default: 5000)

### Platforms:

- Heroku
- Render
- Railway
- Fly.io

## 🤝 Contributing

Contributions, issues and feature requests are welcome!

## 📄 License

MIT

## 👨‍💻 Author

Pham Gia Bao

- GitHub: [@GBGhost17](https://github.com/GBGhost17)

## 🙏 Acknowledgments

- Express.js documentation
- JWT best practices
- SQLite documentation
