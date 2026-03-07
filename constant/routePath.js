const Home = '/';
const DEV = '/dev';
const NOTICE = '/notice';
const POST = '/post';

export const RoutePath = Object.freeze({
  home: Home,
  dev: DEV,
  notice: NOTICE,
  post: POST,
});

export const CATEGORY_PATHS = [RoutePath.dev, RoutePath.notice];

export const DISPLAY_POST_TABLE_PATHS = [RoutePath.home, ...CATEGORY_PATHS];
