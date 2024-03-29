interface Props {
  API_PATHS: { [key: string]: string };
  REACTIVE_API_PATHS: { [key: string]: string };
  PAGE_SIZE: number;
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
    LOGOUT: '/logout',
    BOOK_CLUBS: '/v1/book-clubs',
    CREATE: '/create',
    UPDATE: '/update',
    BOOK_CLUBS_FOR_USER: '/all-for-user',
    BOOK_CLUB_BY_NAME: '/by-name',
    SEARCH: '/search',
    DISBAND: '/disband',
    DISBAND_BY_NAME: '/disband-by-name',
    STOCK_IMAGES: '/stock-images',
    MEMBERSHIPS: '/v1/memberships',
    ALL_MEMBERSHIPS: '/all',
    ROLE: '/role',
    MEMBERSHIP_REQUESTS: '/v1/membership-requests',
    REQUEST_MEMBERSHIP: '/request-membership',
    HAS_PENDING_REQUEST: '/has-pending-request',
    REQUESTS_FOR_BOOK_CLUB: '/all-for-club',
    REVIEW_MEMBERSHIP_REQUEST: '/review'
  },
  REACTIVE_API_PATHS: {
    ROOT_URL:
      process.env.REACT_APP_REACTIVE_API_URL || 'http://127.0.0.1:8001/api',
    NOTIFICATION: '/v1/notification'
  },
  PAGE_SIZE: 24
};

export default props;
