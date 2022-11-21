import { configureStore } from '@reduxjs/toolkit';
import listsReducer from '@/features/list/store/listsSlice';
import authReducer from '@/features/auth/store/authSlice';
import { useDispatch as useReduxDispatch } from 'react-redux';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    lists: listsReducer,
  },
  devTools: false,
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useDispatch: () => AppDispatch = useReduxDispatch;
