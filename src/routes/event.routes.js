import { Router } from "express";
import * as EventController from "../controllers/event.controller";

const router = new Router();

router.route("/").get(EventController.fetchEvents);
router.route("/:name").get(EventController.fetchBasedOnEventName);

export default router;
