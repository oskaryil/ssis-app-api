import { Router } from "express";
import { authJwt } from "../services/auth";

import * as TodoController from "../controllers/todo.controller";

const router = new Router();

router
  .route("/")
  .get(authJwt, TodoController.fetchTodosByUser)
  .post(authJwt, TodoController.createTodo);

router
  .route("/:id")
  .delete(authJwt, TodoController.deleteTodo)
  .patch(authJwt, TodoController.updateTodo);

export default router;
