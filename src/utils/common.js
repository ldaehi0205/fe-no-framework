import { CATEGORY_PATHS } from '../../constant/routePath.js';

export const getCategoryFromPath = () => {
  const { pathname } = window.location;
  return (
    CATEGORY_PATHS.find(
      path => pathname === path || pathname.startsWith(`${path}/`),
    ) || ''
  );
};

export const errorBoundary = component => {
  if (!component) return null;
  component.innerHTML = `<div class='content-error'>에러가 발생했습니다.</div>`;
};
