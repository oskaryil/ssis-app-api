import { Router } from "express";
import * as TodoController from "../controllers/todo.controller";

const router = new Router();

router
  .route("/")
  .get(TodoController.fetchTodos)
  .post(TodoController.createTodo);

router
  .route("/:id")
  .delete(TodoController.deleteTodo)
  .patch(TodoController.updateTodo);

export default router;
