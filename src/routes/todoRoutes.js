
import { Router } from 'express'
import db from '../db.js'

const router = Router()

// Get all todos for logged-in user
router.get('/', (req, res) => {
    try {
        const getTodos = db.prepare('SELECT * FROM todos WHERE user_id = ?')
        const todos = getTodos.all(req.userId)
        res.json(todos)
    } catch (error) {
        console.log(error.message)
        res.status(503).json({ message: 'Server error' })
    }
})

// Create a new todo
router.post('/', (req, res) => {
    const { task } = req.body

    if (!task) {
        return res.status(400).json({ message: 'Task is required' })
    }

    try {
        const insertTodo = db.prepare('INSERT INTO todos (user_id, task) VALUES (?, ?)')
        const result = insertTodo.run(req.userId, task)
        res.status(201).json({ 
            id: result.lastInsertRowid, 
            user_id: req.userId, 
            task, 
            completed: 0 
        })
    } catch (error) {
        console.log(error.message)
        res.status(503).json({ message: 'Server error' })
    }
})

// Update a todo
router.put('/:id', (req, res) => {
    const { id } = req.params
    const { task, completed } = req.body

    try {
        // Check if todo belongs to user
        const getTodo = db.prepare('SELECT * FROM todos WHERE id = ? AND user_id = ?')
        const todo = getTodo.get(id, req.userId)

        if (!todo) {
            return res.status(404).json({ message: 'Todo not found' })
        }

        // Update todo
        let updateQuery = []
        let params = []

        if (task !== undefined) {
            updateQuery.push('task = ?')
            params.push(task)
        }

        if (completed !== undefined) {
            updateQuery.push('completed = ?')
            params.push(completed ? 1 : 0)
        }

        if (updateQuery.length === 0) {
            return res.status(400).json({ message: 'No fields to update' })
        }

        params.push(id, req.userId)
        const updateTodo = db.prepare(`UPDATE todos SET ${updateQuery.join(', ')} WHERE id = ? AND user_id = ?`)
        updateTodo.run(...params)

        // Get updated todo
        const updatedTodo = getTodo.get(id, req.userId)
        res.json(updatedTodo)
    } catch (error) {
        console.log(error.message)
        res.status(503).json({ message: 'Server error' })
    }
})

// Delete a todo
router.delete('/:id', (req, res) => {
    const { id } = req.params

    try {
        // Check if todo belongs to user
        const getTodo = db.prepare('SELECT * FROM todos WHERE id = ? AND user_id = ?')
        const todo = getTodo.get(id, req.userId)

        if (!todo) {
            return res.status(404).json({ message: 'Todo not found' })
        }

        // Delete todo
        const deleteTodo = db.prepare('DELETE FROM todos WHERE id = ? AND user_id = ?')
        deleteTodo.run(id, req.userId)

        res.json({ message: 'Todo deleted successfully' })
    } catch (error) {
        console.log(error.message)
        res.status(503).json({ message: 'Server error' })
    }
})

export default router