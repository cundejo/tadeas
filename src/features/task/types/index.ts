import { DateISOString } from '@/features/common';
import firebase from 'firebase/compat';
import Timestamp = firebase.firestore.Timestamp;

type TaskCore = {
  title: string;
  details?: string;
};

export type TaskDocument = TaskCore & {
  createdAt: Timestamp;
};

export type Task = TaskCore & {
  id: string;
  createdAt: DateISOString;
};
