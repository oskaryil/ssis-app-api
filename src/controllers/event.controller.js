import Event from "../models/event.model";

/**
 * @function fetchEvents
 *
 * @description
 * DOING: Should fetch all events
 *
 */
const fetchEvents = async (req, res, next) => {
  try {
    const events = await Event.find();
    res.status(200).json(events);
  } catch (err) {
    return next(err);
  }
};

/**
 * @function fetchBasedOnEventName
 *
 * @description
 * DOING: Should fetch events based on the name requested
 *
 */
const fetchBasedOnEventName = async (req, res, next) => {
  try {
    const eventName = req.params.name;
    const events = await Event.find({ name: eventName });
    res
      .status(200)
      .json({ message: `Fetched events with the name ${eventName}`, events });
  } catch (err) {
    return next(err);
  }
};

export { fetchEvents, fetchBasedOnEventName };
