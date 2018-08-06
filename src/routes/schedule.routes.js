/**
 * Schedule Routes
 */

import { Router } from "express";

import * as ScheduleController from "../controllers/schedule.controller";
import { authJwt } from "../services/auth";

const routes = new Router();

routes.route("/").get(authJwt, ScheduleController.getFullSchedule);
routes.route("/currentclass").get(authJwt, ScheduleController.getCurrentClass);

export default routes;
