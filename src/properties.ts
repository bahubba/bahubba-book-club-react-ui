interface Props {
  API_PATHS: { [key: string]: string };
}

const props: Props = {
  /* API Endpoints */
  API_PATHS: {
    ROOT_URL: process.env.REACT_APP_API_URL || 'http://127.0.0.1:8000/api/v1',
    AUTH: '/auth',
    AUTHENTICATE: '/authenticate',
    REGISTER: '/register',
    LOGIN: '/login',
    REFRESH: '/refresh'
  }
};

export default props;
