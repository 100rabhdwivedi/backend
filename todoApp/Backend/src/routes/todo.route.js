import express from 'express'
import { createTodo, deleteTodo, getAllTodo, updateTodo } from '../controllers/todo.controller.js'
import isAuthenticated from '../middleware/isAuthenticated.middleware.js'

const router = express.Router()

router.post('/',isAuthenticated,createTodo)
router.get('/',getAllTodo)
router.put('/:todoId',isAuthenticated,updateTodo)
router.delete('/:todoId',isAuthenticated,deleteTodo)

export default router