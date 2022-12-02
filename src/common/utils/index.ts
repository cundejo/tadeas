import { isUndefined, negate, pickBy } from 'lodash';

export function removeUndefined<T extends object>(obj: T): T {
  return pickBy(obj, negate(isUndefined)!) as T;
}

export function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function setLocalStorage(key: string, value: string) {
  try {
    window.localStorage.setItem(key, value);
  } catch (e) {
    console.log('Error setting item in local storage', e);
  }
}

export function getLocalStorage(key: string): string | null {
  try {
    return window.localStorage.getItem(key);
  } catch (e) {
    console.log('Error getting item from local storage', e);
    return null;
  }
}

export function removeLocalStorage(key: string) {
  try {
    return window.localStorage.removeItem(key);
  } catch (e) {
    console.log('Error removing item from local storage', e);
  }
}

const ENTITY_MAP: Record<string, string> = {
  '<': '&lt;',
  '>': '&gt;',
};

export function escapeHtml(str: string) {
  return String(str).replace(/[<>]/g, function (s) {
    return ENTITY_MAP[s];
  });
}
