import { configureStore } from '@reduxjs/toolkit';
import listsReducer from '@/features/list/store/listsSlice';
import { useDispatch as useReduxDispatch } from 'react-redux';

export const store = configureStore({
  reducer: {
    lists: listsReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useDispatch: () => AppDispatch = useReduxDispatch;
