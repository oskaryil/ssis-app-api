import HTTPStatus from 'http-status';
import request from 'superagent';

/**
 * Function for getting the current class relative to the current time
 */
export const getCurrentClass = async (req, res, next) => {
  try {
    let { res: { text } } = await request.get(
      `https://api.ssis.nu/cal/?room=${req.user.class}`,
    );
    text = JSON.parse(text);
    const schedule = text;
    schedule.push({
      start_time: '17:00',
      end_time: '18:00',
      subject: 'Svenska 3',
    });
    const now = new Date().getTime();
    let currentClass;
    for (let i = 0; i < schedule.length; i++) {
      const nowDate = new Date();
      const date = `${nowDate.getFullYear()}-0${nowDate.getMonth() +
        1}-0${nowDate.getDate()}`;
      let start = Date.parse(`${date} ${schedule[i].start_time}`);
      let end = Date.parse(`${date} ${schedule[i].end_time}`);
      if (start > end) {
        // check if start comes before end
        const temp = start; // if so, assume it's across midnight
        start = end; // and swap the dates
        end = temp;
      }
      if (now < end && now > start) {
        currentClass = schedule[i];
        break;
      } else {
        // else if (now + 30 * 60 > start) {
        //   currentClass = schedule[i];
        //   break;
        // }
        currentClass = {};
      }
    }
    return res.status(HTTPStatus.OK).json(currentClass);
  } catch (err) {
    err.status = HTTPStatus.BAD_REQUEST;
    next(err);
  }
};
