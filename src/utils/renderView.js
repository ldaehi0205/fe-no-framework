import {
  RoutePath,
  DISPLAY_POST_TABLE_PATHS,
} from '../../constant/routePath.js';

const onRoute = callback => {
  window.addEventListener('popstate', () => {
    callback(window.location.pathname);
  });
};

const getComponent = pathname => {
  if (DISPLAY_POST_TABLE_PATHS.includes(pathname)) return 'post-table';
  if (pathname.startsWith(`${RoutePath.post}/`)) return 'post-detail';
  return null;
};

const changeView = pathname => {
  const content = document.querySelector('.post-content');
  const component = getComponent(pathname);
  if (!content || !component) return;

  content.replaceChildren(document.createElement(component));
};

changeView(window.location.pathname);
onRoute(changeView);
