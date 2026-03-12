
import express from 'express'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import prisma from '../prismaClient.js'

const router = express.Router()

// register a new user endpoint /auth/register
router.post('/register', async (req, res) => {
    const {username, password} = req.body
    
    if (!username || !password) {
        return res.status(400).json({ message: 'Username and password are required' })
    }
    
    const hashedPassword = bcrypt.hashSync(password, 8)
    
    try {
        const user = await prisma.user.create({
            data: {
                username,
                password: hashedPassword
            }
        })

        // nowthat  we have a user, I want to add their first todo for them
        const defaultTodo = `Hello, Add your first todo!`
        await prisma.todo.create({
            data: {
                task: defaultTodo,
                userId: user.id
            }
        })

        // create a token
        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '24h' })
        res.status(201).json({ message: 'User registered successfully', token })
    } catch(err) {
        console.log(err.message)
        if (err.message.includes('UNIQUE')) {
            return res.status(409).json({ message: 'Username already exists' })
        }
        res.status(503).json({ message: 'Server error' })
    }
})

router.post('/login', async (req, res) => {
    const { username, password } = req.body

    if (!username || !password) {
        return res.status(400).json({ message: 'Username and password are required' })
    }

    try {
        const user = await prisma.user.findUnique({
            where: {
                username: username
            }
        })

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