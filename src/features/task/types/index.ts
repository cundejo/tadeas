import firebase from 'firebase/compat';
import { DateISOString } from '@/features/common';
import Timestamp = firebase.firestore.Timestamp;

type TaskCore = {
  title: string;
  details?: string;
};

export type TaskDocument = TaskCore & {
  createdAt: Timestamp;
  completedAt?: Timestamp;
};

export type Task = TaskCore & {
  id: string;
  createdAt: DateISOString;
  completedAt?: DateISOString;
};
