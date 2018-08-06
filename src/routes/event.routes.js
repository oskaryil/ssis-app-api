import { Router } from "express";
import * as EventController from "../controllers/event.controller";
import { authJwt } from "../services/auth";

const router = new Router();

router.route("/").get(authJwt, EventController.fetchEvents);
router.route("/:name").get(authJwt, EventController.fetchBasedOnEventName);

export default router;
