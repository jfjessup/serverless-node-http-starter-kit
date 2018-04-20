const moment = require('moment');

export class TimeUtils {
  static getCurrentISOString = () => moment().utc().format('YYYY-MM-DD[T]HH:mm:ss[Z]');

  static isValidIsoString = stamp => moment(stamp, 'YYYY-MM-DDTHH:mm:ss', true).isValid();
}
