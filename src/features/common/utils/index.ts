import { isUndefined, negate, pickBy } from 'lodash';

export function removeUndefined<T extends object>(obj: T): T {
  return pickBy(obj, negate(isUndefined)!) as T;
}

export function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
