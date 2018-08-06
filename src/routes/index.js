/**
 * API Routes
 */

import { Router } from "express";
import HTTPStatus from "http-status";

import UserRoutes from "./user.routes";
import ProductRoutes from "./product.routes";
import LunchRoutes from "./lunch.routes";
import ScheduleRoutes from "./schedule.routes";
import OrderRoutes from "./order.routes";
import PostRoutes from "./post.routes";
import SeedRoutes from "./seed.routes";
import RealtidRoutes from "./realtid.routes";
import TodoRoutes from "./todo.routes";
import EventRoutes from "./event.routes";

import APIError from "../services/error";

// Middlewares
import logErrorService from "../services/log";

const routes = new Router();

const isDev = process.env.NODE_ENV === "development";
const isTest = process.env.NODE_ENV === "test";

routes.use("/users", UserRoutes);
routes.use("/posts", PostRoutes);
routes.use("/products", ProductRoutes);
routes.use("/orders", OrderRoutes);
routes.use("/lunch", LunchRoutes);
routes.use("/schedule", ScheduleRoutes);
routes.use("/realtid", RealtidRoutes);
routes.use("/todo", TodoRoutes);
routes.use("/events", EventRoutes);

if (isDev || isTest) {
  routes.use("/seeds", SeedRoutes);
}

routes.all("*", (req, res, next) =>
  next(new APIError("Not Found!", HTTPStatus.NOT_FOUND, true)),
);
routes.use(logErrorService);

export default routes;
