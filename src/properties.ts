interface Props {
  API_PATHS: { [key: string]: string };
  REACTIVE_API_PATHS: { [key: string]: string };
}

const props: Props = {
  /* API Endpoints */
  API_PATHS: {
    ROOT_URL: process.env.REACT_APP_API_URL || 'http://127.0.0.1:8000/api',
    AUTH: '/v1/auth',
    AUTHENTICATE: '/authenticate',
    REGISTER: '/register',
    LOGIN: '/login',
    REFRESH: '/refresh',
    LOGOUT: '/logout'
  },
  REACTIVE_API_PATHS: {
    ROOT_URL:
      process.env.REACT_APP_REACTIVE_API_URL || 'http://127.0.0.1:8001/api',
    NOTIFICATION: '/v1/notification'
  }
};

export default props;
