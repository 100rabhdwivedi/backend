import Todo from '../models/todo.model.js'

export const createTodo = async (req, res) => {

    try {
        const {title,description} = req.body || {}

        if (!title || !description) {
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            })
        }

        const todo = await Todo.create({title,description})

        return res.status(201).json({
            success: true,
            message: "Todo created",
            todo
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: "Internal Server Error" });
    }
}

export const getAllTodo = async (req, res) => {

    try {
        const todos = await Todo.find();
        return res.status(200).json({
            success: true,
            message: "All todos fetched",
            todos
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: "Internal Server Error" });
    }

};

export const updateTodo = async (req, res) => {
    try {
        const todoId = req.params.todoId;

        const {title,description} = req.body || {}

        if (!title || !description) {
            return res.status(400).json({
                success: false,
                message: "All fields are required to update"
            });
        }

        const todo = await Todo.findByIdAndUpdate(todoId, {title,description}, {new: true, runValidater: true})

        if (!todo) {
            return res.status(404).json({
                success: false,
                message: "Todo not found"
            })
        }

        return res.status(200).json({
            success: true,
            message: "Todo updated",
            todo
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: "Internal Server Error" });
    }

}

export const deleteTodo = async (req, res) => {
    try {
        const todoId = req.params.todoId;

        const todo = await Todo.findByIdAndDelete(todoId)

        if (!todo) {
            return res.status(404).json({
                success: false,
                message: "Todo not found"
            })
        }

        return res.status(200).json({
            success: true,
            message: "Todo deleted",
            todo
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: "Internal Server Error" });
    }
}