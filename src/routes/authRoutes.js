
import express from 'express'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import db from '../db.js'

const router = express.Router()

// register a new user endpoint /auth/register
router.post('/register', (req, res) => {
    const {username, password} = req.body
    
    if (!username || !password) {
        return res.status(400).json({ message: 'Username and password are required' })
    }
    
    const hashedPassword = bcrypt.hashSync(password, 8)
    
    try {
        const insertUser = db.prepare(`INSERT INTO users (username, password) VALUES (?, ?)`)
        const result = insertUser.run(username, hashedPassword)

        // now we have a user, I want to add their first todo for them
        const defaultTodo = `Hello, Add your first todo!`
        const insertTodo = db.prepare(`INSERT INTO todos (user_id, task) VALUES (?, ?)`)
        insertTodo.run(result.lastInsertRowid, defaultTodo)

        // create a token
        const token = jwt.sign({ id: result.lastInsertRowid }, process.env.JWT_SECRET, { expiresIn: '24h' })
        res.status(201).json({ message: 'User registered successfully', token })
    } catch(err) {
        console.log(err.message)
        if (err.message.includes('UNIQUE')) {
            return res.status(409).json({ message: 'Username already exists' })
        }
        res.status(503).json({ message: 'Server error' })
    }
})

router.post('/login', (req, res) => {
    const { username, password } = req.body

    if (!username || !password) {
        return res.status(400).json({ message: 'Username and password are required' })
    }

    try {
        const getUser = db.prepare('SELECT * FROM users WHERE username = ?')
        const user = getUser.get(username)

        if(!user) { 
            return res.status(404).json({ message: "User not found" })
        }

        // Verify password
        const isPasswordValid = bcrypt.compareSync(password, user.password)
        if (!isPasswordValid) {
            return res.status(401).json({ message: "Invalid password" })
        }

        // Create token
        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '24h' })
        res.json({ message: 'Login successful', token })
    } catch (error) {
        console.log(error.message)
        res.status(503).json({ message: 'Server error' })
    }
})

export default router   