import { configureStore } from '@reduxjs/toolkit';
import coordinatesReducer from './coordinatesSlice';

const store = configureStore({
  reducer: {
    coordinates: coordinatesReducer,
    // 다른 슬라이스들도 추가할 수 있음
  },
});

export type RootState = ReturnType<typeof store.getState>;
export { store };
