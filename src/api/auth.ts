import axios from 'axios';
import _ from 'lodash';

import props from '../properties';
import { Registration } from '../interfaces';

export const register = async (registration: Registration) => {
  // Build the req URL
  const reqURL = `${props.API_PATHS.ROOT_URL}${props.API_PATHS.AUTH}${props.API_PATHS.REGISTER}`;

  // Try sending the request
  try {
    const rsp = await axios.post(reqURL, registration);
    if (_.isEqual(200, rsp.status)) {
      // Toast/snackbar success message
    }
    return rsp;
  } catch (err) {
    // If error, log and bubble up
    console.error(`${reqURL} error`, err);
    throw new Error(_.get(err, 'message'));
  }
};
