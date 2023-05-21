import { configureStore } from '@reduxjs/toolkit';
import coordinatesReducer from './coordinatesSlice';
import isCheckedReducer from './isCheckedSlice';
import searchResultsReducer from './searchResultsSlice';

const store = configureStore({
  reducer: {
    coordinates: coordinatesReducer,
    // 다른 슬라이스들도 추가할 수 있음
    isChecked: isCheckedReducer,
    searchResults: searchResultsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export { store };
