import { createSlice } from '@reduxjs/toolkit';
import { LOCAL_STORAGE_EMAIL_FOR_SIGNING, removeLocalStorage, setLocalStorage } from '@/common';

export interface AuthSliceState {
  emailForSigning?: string;
}

const initialState: AuthSliceState = {
  emailForSigning: undefined,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setEmailForSigning(state, action) {
      setLocalStorage(LOCAL_STORAGE_EMAIL_FOR_SIGNING, action.payload);
      state.emailForSigning = action.payload;
    },

    removeEmailForSigning(state) {
      removeLocalStorage(LOCAL_STORAGE_EMAIL_FOR_SIGNING);
      state.emailForSigning = undefined;
    },
  },
});

export default authSlice.reducer;

export const { setEmailForSigning, removeEmailForSigning } = authSlice.actions;
