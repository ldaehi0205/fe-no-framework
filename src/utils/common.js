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

const escapeHtml = str => {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;');
};

const deepEscape = obj => {
  if (Array.isArray(obj)) return obj.map(deepEscape);
  return Object.fromEntries(
    Object.entries(obj).map(([k, v]) => {
      if (typeof v === 'string') return [k, escapeHtml(v)];
      if (v && typeof v === 'object') return [k, deepEscape(v)];
      return [k, v];
    }),
  );
};

export const createEscapeHtml = fn => data => fn(deepEscape(data));
