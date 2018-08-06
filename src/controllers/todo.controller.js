import Todo from "../models/todo.model";
import Event from "../models/event.model";

const eventTypes = {
  CREATE_TODO: "create_todo",
  DELETE_TODO: "delete_todo",
  UPDATE_TODO: "update_todo",
  MARKED_AS_DONE: "marked_as_done",
  MARKED_AS_UNDONE: "marked_as_undone",
  UPDATE_TODO_TITLE: "update_todo_title",
  UPDATE_TODO_DUE_DATE: "update_todo_due_date",
};

/**
 * @function createTodo
 *
 * @description
 * DOING: Should create a Todo and an Event upon request
 *
 */
const createTodo = async (req, res, next) => {
  try {
    const { title, dueDate } = req.body;

    const newTodo = new Todo();
    const newEvent = new Event({ name: eventTypes.CREATE_TODO });

    newTodo.title = title;
    newTodo.dueDate = dueDate;
    newTodo.createdBy = req.user.id;
    await newTodo.save();
    await newEvent.save();

    res.status(201).json({ message: "Todo created", todo: newTodo });
  } catch (err) {
    return next(err);
  }
};

/**
 * @function deleteTodo
 *
 * @description
 * DOING: Should delete a todo by its _id received in request params
 *
 */
const deleteTodo = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deletedTodo = await Todo.findOneAndDelete({ _id: id });
    if (deletedTodo) {
      const newEvent = new Event({ name: eventTypes.DELETE_TODO });
      await newEvent.save();
      res.status(200).json({
        message: `Todo with id ${id} has been deleted`,
        deletedTodo,
      });
    } else {
      throw new Error("A todo with that id could not be found");
    }
  } catch (err) {
    return next(err);
  }
};

/**
 * @function updateTodo
 *
 * @description
 * DOING: Should update a single todo
 *
 */
const updateTodo = async (req, res, next) => {
  try {
    const { id } = req.params;
    const newTodoData = req.body;
    const isMarkedAsDone = newTodoData.done === "true";
    const updatedTodo = await Todo.findOneAndUpdate({ _id: id }, newTodoData, {
      new: true,
    });
    if (updatedTodo) {
      if (newTodoData.title) {
        const newUpdateTitleEvent = new Event({
          name: eventTypes.UPDATE_TODO_TITLE,
        });
        await newUpdateTitleEvent.save();
      }
      if (newTodoData.dueDate) {
        const newUpdateDueDateEvent = new Event({
          name: eventTypes.UPDATE_TODO_DUE_DATE,
        });
        await newUpdateDueDateEvent.save();
      }

      if (
        Object.property.hasOwnProperty.call(newTodoData, "done") &&
        isMarkedAsDone
      ) {
        const newMarkedAsDoneEvent = new Event({
          name: eventTypes.MARKED_AS_DONE,
        });
        await newMarkedAsDoneEvent.save();
      } else if (
        Object.prototype.hasOwnProperty.call(newTodoData, "done") &&
        !isMarkedAsDone
      ) {
        const newMarkedAsUndoneEvent = new Event({
          name: eventTypes.MARKED_AS_UNDONE,
        });
        await newMarkedAsUndoneEvent.save();
      }

      if (
        Object.property.hasOwnProperty.call(newTodoData, "title") ||
        Object.property.hasOwnProperty.call(newTodoData, "done")
      ) {
        const newUpdateEvent = new Event({ name: eventTypes.UPDATE_TODO });
        await newUpdateEvent.save();
      }
      res.status(200).json({
        message: `Todo with id ${id} has been updated`,
        updatedTodo,
      });
    } else {
      throw new Error("A todo with that id could not be found");
    }
  } catch (err) {
    return next(err);
  }
};

/**
 * @function fetchTodos
 *
 * @description
 * DOING: Should fetch all todos
 *
 */
const fetchTodos = async (req, res, next) => {
  try {
    const todos = await Todo.find();
    res.status(200).json(todos);
  } catch (err) {
    return next(err);
  }
};

const fetchTodosByUser = async (req, res, next) => {
  try {
    const todos = await Todo.find({ createdBy: req.user.id });
    res.status(200).json(todos);
  } catch (err) {
    return next(err);
  }
};

export { createTodo, deleteTodo, updateTodo, fetchTodos, fetchTodosByUser };
