import HTTPStatus from 'http-status';

import { getMenu } from '../services/eatery';

export const getLunchMenu = async (req, res, next) => {
  try {
    const menu = await getMenu();
    return res.status(HTTPStatus.OK).json(menu);
  } catch (err) {
    err.status = HTTPStatus.BAD_REQUEST;
    return next(err);
  }
};
