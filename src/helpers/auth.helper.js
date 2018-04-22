/**
 * This notation was generated by templates.
 * // -------------------------------------------------
 * @description Auth helper functions like createUser etc.
 * @file auth.helper.js
 * @author: Oskar Yildiz <oskar> 2018-02-16T14:23:40+01:00
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
 * Created by Oskar Yildiz <oskar> on 2018-02-16T14:23:40+01:00.
 * Last modified by oskar on 2018-02-16T14:23:40+01:00
 *
 */
import uuidv4 from 'uuid/v4';
import jwt from 'jsonwebtoken';
import request from 'superagent';

import User from '../models/user.model';
import formatSSISEmail from '../utils/email';
// import constants from '../config/constants';
import { tryCatch } from '../utils/asyncUtils';

const createToken = ({ userUUID, JWT_SECRET }) =>
  jwt.sign({ user_uuid: userUUID }, JWT_SECRET);

const toAuthJSON = ({ user, token }) => ({ ...user, token });
const setUser = async data => await User.query().insert(data);
const updateUserById = data => async userId =>
  await User.query()
    .patch(data)
    .where('id', userId)
    .returning('*');

const loginSSISAPI = async data => {
  let { res: { text } } = await request
    .post('https://api.ssis.nu/login/')
    .send({ user: data.username, pass: data.password });
  text = JSON.parse(text);
  if (text.result !== 'OK') {
    throw new Error('Login fail');
  }
  return true;
};

/**
 * @function createUser
 *
 * @description Creates a new user
 *
 * @param {Object} Takes an object with the username and password
 *
 * @returns {Object} The user object with token
 */
const createUser = ({ username, password }) =>
  tryCatch(async () => {
    await loginSSISAPI({ username, password });
    const email = formatSSISEmail(username);
    const userUUID = uuidv4();
    const user = await setUser({
      username,
      password,
      email,
      user_uuid: userUUID,
    });
    return user;
  })(err => {
    // TODO: Better error handling
    throw err;
  });

/**
 * @function updateUserInfo
 *
 * @description Updates the user with any chose information.
 *
 * @param   {Object} updateData Object with the data to be updated
 * @param   {String|Number} userId The id of the user
 *
 * @returns {[type]}            [description]
 */
const updateUserInfo = ({ updateData, userId }) =>
  tryCatch(async () => {
    const updatedUser = await updateUserById(updateData)(userId);
    return updatedUser[0];
  })(err => {
    // TODO: Better error handling
    throw err;
  });

export { createUser, updateUserInfo, createToken };