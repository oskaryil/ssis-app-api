/**
 * This notation was generated by templates.
 * // -------------------------------------------------
 * @description
 * @file realtid.routes.js
 * @author: Oskar Yildiz <oskar> 2018-04-22T10:33:16+02:00
 * // -------------------------------------------------
 * Make sure this file is part of its proper namespace
 * and project before moving on.
 * // -------------------------------------------------
 * Code-tags conventionally should be used (See below) :
 * TODO - Something that someone need to do.
 * DOING - Self remind for what you are doing.
 * CONSIDER - Reminder to consider a change or addition.
 * BUG - The below section of a code cause a bug.
 * FIXME - The below section of code need to be fixed.
 * HACK - The below section of code is a workaround.
 * XXX - Any notation important enough to consider implementing.
 * CLARIFY - Very incomprehensible section of code below.
 *
 * Created by Oskar Yildiz <oskar> on 2018-04-22T10:33:16+02:00.
 * Last modified by oskar on 2018-04-22T10:33:17+02:00
 *
 */

/**
 * SL Realtid Routes
 */

import { Router } from 'express';
import validate from 'express-validation';

import * as RealtidController from '../controllers/realtid.controller';
import { authJwt } from '../services/auth';

const routes = new Router();

routes
  .route('/')
  .get(
    authJwt,
    validate(RealtidController.validation.getDepartures),
    RealtidController.getDeparturesForSite,
  );

export default routes;