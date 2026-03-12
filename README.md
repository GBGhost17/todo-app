# 📝 Todo App - Full Stack Authentication

Full-stack Todo application with JWT Authentication, built with Node.js, Express, PostgreSQL, Prisma ORM and Docker.

## ✨ Features

- 🔐 **Authentication**: JWT-based registration and login
- ✅ **CRUD Operations**: Create, read, update, delete todos
- 📊 **Statistics**: Dashboard to track progress
- 🔍 **Filtering**: Filter todos (All/Active/Completed)
- 🎨 **Modern UI**: Responsive, user-friendly interface
- 🔒 **Security**: Password hashing (bcrypt), protected routes
- 🐳 **Docker**: Fully containerized application

## 🛠️ Tech Stack

### Backend

- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **PostgreSQL** - Database
- **Prisma 7** - ORM with pg adapter
- **JWT** - Authentication
- **bcrypt.js** - Password hashing

### Frontend

- **Vanilla JavaScript** - No frameworks
- **HTML5/CSS3** - Modern UI
- **Fetch API** - HTTP requests

### DevOps

- **Docker** - Containerization
- **Docker Compose** - Multi-container orchestration

## 📋 Prerequisites

- Docker & Docker Compose
- Git

## 🚀 Quick Start

1. **Clone repository**

```bash
git clone https://github.com/GBGhost17/todo-app.git
cd todo-app
```

2. **Build and start containers**

```bash
docker compose up --build
```

3. **Access the application**

Open browser: `http://localhost:5000`

That's it! 🎉

## 🔧 Development

### First time setup

```bash
# Build images without cache
docker compose build --no-cache

# Start containers
docker compose up
```

### Daily workflow

```bash
# Start containers
docker compose up

# Stop containers (Ctrl+C or)
docker compose down
```

### Database migrations

```bash
# Create new migration
docker compose run app npx prisma migrate dev --name migration_name

# Generate Prisma Client
docker compose run app npx prisma generate

# View database
docker exec -it postgres-db psql -U postgres -d todoapp
```

### Logs

```bash
# View all logs
docker compose logs

# View specific service
docker compose logs app
docker compose logs db

# Follow logs
docker compose logs -f
```

## 📁 Project Structure

```
todo-app/
├── src/
│   ├── server.js              # Entry point
│   ├── prismaClient.js        # Prisma client with pg adapter
│   ├── routes/
│   │   ├── authRoutes.js      # Authentication endpoints
│   │   └── todoRoutes.js      # Todo CRUD endpoints
│   └── middleware/
│       └── authMiddleware.js  # JWT verification
├── prisma/
│   ├── schema.prisma          # Database schema
│   ├── migrations/            # Database migrations
│   └── prisma.config.ts       # Prisma configuration
├── public/
│   ├── index.html             # Main todo app
│   ├── login.html             # Login page
│   ├── register.html          # Register page
│   └── style.css              # Styles
├── Dockerfile                 # Docker image configuration
├── docker-compose.yaml        # Multi-container setup
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

## 📝 Database Schema (Prisma)

### User Model

```prisma
model User {
  id        Int      @id @default(autoincrement())
  username  String   @unique
  password  String
  todos     Todo[]
}
```

### Todo Model

```prisma
model Todo {
  id        Int     @id @default(autoincrement())
  task      String
  completed Boolean @default(false)
  userId    Int
  user      User    @relation(fields: [userId], references: [id])
}
```

## 🎯 Usage

1. Start the application: `docker compose up`
2. Access `http://localhost:5000`
3. Register a new account
4. Login
5. Start managing todos!

## 🐳 Docker Configuration

### Services

- **app**: Node.js application (port 5000)
- **db**: PostgreSQL 16 Alpine (port 5432)

### Environment Variables (in docker-compose.yaml)

- `DATABASE_URL`: PostgreSQL connection string
- `JWT_SECRET`: Secret key for JWT tokens
- `NODE_ENV`: Environment (development/production)
- `PORT`: Application port

### Volumes

- `postgres-data`: Persistent database storage
- `/app/node_modules`: Container node_modules (not synced)

## 🚀 Deployment

### Docker-based platforms:

- **Railway**: Direct Docker deployment
- **Render**: Docker support with PostgreSQL add-on
- **Fly.io**: Native Docker support
- **AWS ECS/EKS**: Container orchestration

### Required:

1. PostgreSQL database
2. Environment variables (DATABASE_URL, JWT_SECRET)
3. Docker/container support

## ⚙️ Configuration

### docker-compose.yaml

```yaml
services:
  app:
    build: .
    ports:
      - "5000:5000"
    environment:
      - DATABASE_URL=postgresql://user:pass@db:5432/dbname
      - JWT_SECRET=your_secret
    depends_on:
      - db

  db:
    image: postgres:16-alpine
    environment:
      - POSTGRES_USER=postgres
      - POSTGRES_PASSWORD=postgres
      - POSTGRES_DB=todoapp
```

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
