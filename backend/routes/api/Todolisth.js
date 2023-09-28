const { Router } = require("express");
const Todo = require("../../model/Todo");

const router = Router();

router.get("/taskdetail", async (req, res) => {
  try {
    const todoList = await Todo.find();
    if (!todoList) throw new Error("No Todo List found");
    res.status(200).json(todoList);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post("/create", async (req, res) => {
  const newTodo = new Todo(req.body);
  try {
    const todo = await newTodo.save();
    if (!todo) throw new Error("Something went wrong saving the Todo");
    res.status(200).json(todo);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.put("/update/:id", async (req, res) => {
  const updatedTodo = await Todo.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.json(updatedTodo);
});

router.delete("/delete/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const removed = await Todo.findByIdAndDelete(id);
    if (!removed) throw Error("Something went wrong ");
    res.status(200).json(removed);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
