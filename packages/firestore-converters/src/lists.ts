import { List, ListDocument } from '@tadeas/types';
import { removeUndefined } from './utils';

export const listFromFirestore = (list: ListDocument & { id: string }): List => {
  const { ...unchanged } = list;
  return {
    ...unchanged,
  };
};

export const listToFirestore = (list: List): ListDocument => {
  const { id, ...unchanged } = list;
  return removeUndefined({
    ...unchanged,
  } as ListDocument);
};
