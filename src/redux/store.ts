import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import { rootReducer } from './reducers';

export const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV === 'development',
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [],
      },
    }),
});

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
