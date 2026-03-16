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

export const formatTimestamp = timestamp => {
  const date = new Date(timestamp);
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();

  return `${year}-${month}-${day}`;
};

export const equalNumbers = (...args) => {
  if (args.length === 0) return false;
  return args.every(num => Number(num) === Number(args[0]));
};

export const escapeText = str => {
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
      if (typeof v === 'string') return [k, escapeText(v)];
      if (v && typeof v === 'object') return [k, deepEscape(v)];
      return [k, v];
    }),
  );
};

export const createEscapeText = fn => data => fn(deepEscape(data));
