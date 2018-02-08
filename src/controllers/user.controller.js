/**
 * User controller
 */

import Joi from 'joi';
import HTTPStatus from 'http-status';
import request from 'superagent';

import { filteredBody } from '../utils/filteredBody';
import constants from '../config/constants';
import User from '../models/user.model';

export const validation = {
  create: {
    body: {
      password: Joi.string()
        .min(2)
        // .regex(/^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$/)
        .required(),
      username: Joi.string()
        .min(3)
        .max(20)
        .required(),
    },
  },
  updateInfo: {
    body: {
      name: Joi.string()
        .min(2)
        .regex(/[a-zA-Z]+/),
      class: Joi.string()
        .min(2)
        .regex(/[a-zA-Z0-9]+/),
    },
  },
};

/**
 * @api {post} /users/signup Create a user
 * @apiDescription Create a user
 * @apiName createUser
 * @apiGroup User
 *
 * @apiParam (Body) {String} password User password.
 * @apiParam (Body) {String} username User username.
 *
 * @apiSuccess {Number} status Status of the Request.
 * @apiSuccess {String} _id User _id.
 * @apiSuccess {String} token Authentication token.
 *
 * @apiSuccessExample Success-Response:
 *
 * HTTP/1.1 200 OK
 *
 * {
 *  _id: '123',
 *  token: 'JWT eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1OTBhMWI3ODAzMDI3N2NiNjQxM2JhZGUiLCJpYXQiOjE0OTM4MzQ2MTZ9.RSlMF6RRwAALZQRdfKrOZWnuHBk-mQNnRcCLJsc8zio',
 * }
 *
 * @apiErrorExample {json} Error
 *  HTTP/1.1 400 Bad Request
 *
 *  {
 *    email: 'email is required'
 *  }
 */
export async function create(req, res, next) {
  const body = filteredBody(req.body, constants.WHITELIST.users.create);
  try {
    let { res: { text } } = await request
      .post('https://api.ssis.nu/login/')
      .send({ user: body.username, pass: body.password });
    text = JSON.parse(text);
    if (text.result !== 'OK') {
      throw new Error('Login fail');
    }
    const userData = {
      ...body,
      email: `${body.username}@stockholmscience.se`,
    };
    const user = await User.create(userData);
    return res.status(HTTPStatus.CREATED).json(user.toAuthJSON());
  } catch (e) {
    e.status = HTTPStatus.BAD_REQUEST;
    return next(e);
  }
}

export const updateInfo = async (req, res, next) => {
  const body = filteredBody(req.body, constants.WHITELIST.users.updateInfo);
  try {
    const updatedUser = await User.findOneAndUpdate(
      { _id: req.user._id },
      {
        name: body.name,
        class: body.class,
      },
      { new: true },
    );
    return res
      .status(HTTPStatus.OK)
      .json({ message: 'Updated user', user: updatedUser.toJSON() });
  } catch (err) {
    err.status = HTTPStatus.BAD_REQUEST;
    return next(err);
  }
};
