import { isUndefined, negate, pickBy } from 'lodash';

export function removeUndefined<Type>(obj: Type): Type {
  return pickBy(obj, negate(isUndefined)!) as Type;
}
