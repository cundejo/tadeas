import { isUndefined, negate, pickBy } from 'lodash';

export function removeUndefined<T extends object>(obj: T): T {
  return pickBy(obj, negate(isUndefined)!) as T;
}

export function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export const booleanSort = (booleanA?: boolean, booleanB?: boolean): number => {
  if (booleanA === booleanB) return 0;
  return booleanA ? -1 : 1;
};

export const stringSort = (objA: any, objB: any) => (attr: string) => objA[attr].localeCompare(objB[attr]);
