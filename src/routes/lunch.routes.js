/**
 * Lunch Routes
 */

import { Router } from 'express';

import * as LunchController from '../controllers/lunch.controller';

const routes = new Router();

routes.route('/').get(LunchController.getLunchMenu);

export default routes;
