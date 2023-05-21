import { configureStore } from '@reduxjs/toolkit';
import isCheckedReducer from './isCheckedSlice';
import searchResultsReducer from './searchResultsSlice';

const CategoryStore = configureStore({
  reducer: {
    isChecked: isCheckedReducer,
    searchResults: searchResultsReducer,
  },
});

export type RootState = ReturnType<typeof CategoryStore.getState>;
export type AppDispatch = typeof CategoryStore.dispatch;
export default CategoryStore;
