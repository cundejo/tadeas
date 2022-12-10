import { isUndefined, negate, pickBy } from 'lodash';
import { DateISOString, Timestamp } from '@tadeas/types';

export function removeUndefined<T extends object>(obj: T): T {
  return pickBy(obj, negate(isUndefined)!) as T;
}

export const dateToFirestore = (date?: DateISOString): Timestamp | undefined => {
  if (!date) return undefined;
  // Firestore automatically convert Date in Timestamp on saving.
  return new Date(date) as unknown as Timestamp;
};
