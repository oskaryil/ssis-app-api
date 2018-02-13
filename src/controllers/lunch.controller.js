import HTTPStatus from 'http-status';

import { redisClient } from '../config/database';
import { getMenu } from '../services/eatery';

// eslint-disable-next-line
Date.prototype.getWeek = function() {
  const onejan = new Date(this.getFullYear(), 0, 1);
  return Math.ceil(((this - onejan) / 86400000 + onejan.getDay() + 1) / 7);
};

const LUNCH_MENU = `lunch_menu_week_${new Date().getWeek()}`;

export const getLunchMenu = async (req, res, next) => {
  try {
    redisClient.get(LUNCH_MENU, async (err, result) => {
      if (result) {
        return res.status(HTTPStatus.OK).json(JSON.parse(result));
      }
      const menu = await getMenu();
      redisClient.setex(LUNCH_MENU, 86400, JSON.stringify(menu));
      return res.status(HTTPStatus.OK).json(menu);
    });
  } catch (err) {
    err.status = HTTPStatus.BAD_REQUEST;
    return next(err);
  }
};
