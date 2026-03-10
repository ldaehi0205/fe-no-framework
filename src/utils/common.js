import { CATEGORY_PATHS } from '../../constant/routePath.js';

export const getCategoryFromPath = () => {
  const { pathname } = window.location;

  const categoryPath =
    CATEGORY_PATHS.find(
      path => pathname === path || pathname.startsWith(`${path}/`),
    ) || '';

  return categoryPath.startsWith('/') ? categoryPath.slice(1) : categoryPath;
};

export const errorBoundary = component => {
  if (!component) return null;
  component.innerHTML = `<div class='content-error'>에러가 발생했습니다.</div>`;
};
