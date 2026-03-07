import { RoutePath } from '../../constant/routePath.js';

export const navigate = path => {
  // 브라우저 히스토리에 새로운 엔트리를 추가하고, URL을 변경
  history.pushState(null, '', path);
  // popstate 이벤트를 수동으로 트리거하여 라우터가 URL 변경을 감지
  window.dispatchEvent(new PopStateEvent('popstate'));
};

export const goToPostDetail = postId => {
  navigate(`${RoutePath.post}/${postId}`);
};
