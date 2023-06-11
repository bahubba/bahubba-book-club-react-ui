interface Props {
  API_PATHS: { [key: string]: string };
}

const props: Props = {
  /* API Endpoints */
  API_PATHS: {
    ROOT_URL: process.env.REACT_APP_API_URL || 'http://127.0.0.1:8000',
    REGISTER: '/register',
    LOGIN: '/login'
  }
};

export default props;
