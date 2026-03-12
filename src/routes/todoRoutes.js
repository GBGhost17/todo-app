
import { Router } from 'express'
import prisma from '../prismaClient.js'

const router = Router()

// Get all todos for logged-in user
router.get('/', async (req, res) => {
    try {
        const todos = await prisma.todo.findMany({
            where: {
                userId: req.userId
            }
        })
        res.json(todos)
    } catch (error) {
        console.log(error.message)
        res.status(503).json({ message: 'Server error' })
    }
})

// Create a new todo
router.post('/', async (req, res) => {
    const { task } = req.body

    if (!task) {
        return res.status(400).json({ message: 'Task is required' })
    }

    try {
        const todo = await prisma.todo.create({
            data: {
                task,
                userId: req.userId
            }
        })
        res.status(201).json({ todo })
    } catch (error) {
        console.log(error.message)
        res.status(503).json({ message: 'Server error' })
    }
})

// Update a todo
router.put('/:id', async (req, res) => {
    const { id } = req.params
    const { task, completed } = req.body

    try {
        // Check if todo belongs to user
        const todo = await prisma.todo.findFirst({
            where: {
                id: parseInt(id),
                userId: req.userId
            }
        })

        if (!todo) {
            return res.status(404).json({ message: 'Todo not found' })
        }

        // Build update data object
        const updateData = {}
        if (task !== undefined) {
            updateData.task = task
        }
        if (completed !== undefined) {
            updateData.completed = !!completed
        }

        if (Object.keys(updateData).length === 0) {
            return res.status(400).json({ message: 'No fields to update' })
        }

        // Update todo
        const updatedTodo = await prisma.todo.update({
            where: {
                id: parseInt(id)
            },
            data: updateData
        })

        res.json(updatedTodo)
    } catch (error) {
        console.log(error.message)
        res.status(503).json({ message: 'Server error' })
    }
})

// Delete a todo
router.delete('/:id', async (req, res) => {
    const { id } = req.params

    try {
        // Check if todo belongs to user
        const todo = await prisma.todo.findFirst({
            where: {
                id: parseInt(id),
                userId: req.userId
            }
        })

        if (!todo) {
            return res.status(404).json({ message: 'Todo not found' })
        }

        // Delete todo
        await prisma.todo.delete({
            where: {
                id: parseInt(id)
            }
        })

        res.json({ message: 'Todo deleted successfully' })
    } catch (error) {
        console.log(error.message)
        res.status(503).json({ message: 'Server error' })
    }
})

export default router