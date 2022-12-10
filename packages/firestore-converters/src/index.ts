import { isNil } from 'lodash';

export const add = (a: number, b: number) => {
  return a + b;
};

export const subtract = (a: number, b: number) => {
  if (isNil(a) || isNil(b)) return 0;
  return a - b;
};
