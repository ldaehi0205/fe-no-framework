export const navigate = path => {
  // 브라우저 히스토리에 새로운 엔트리를 추가하고, URL을 변경
  history.pushState(null, '', path);
  // popstate 이벤트를 수동으로 트리거하여 라우터가 URL 변경을 감지
  window.dispatchEvent(new PopStateEvent('popstate'));
};

const onRoute = callback => {
  window.addEventListener('popstate', () => {
    callback(window.location.pathname);
  });
};

const getComponent = pathname => {
  const CATEGORY_PATHS = ['/', '/latest', '/dev', '/notice'];

  if (CATEGORY_PATHS.includes(pathname)) return 'post-table';
  if (pathname.includes('/post/')) return 'post-detail';
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
