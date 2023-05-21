import { configureStore } from '@reduxjs/toolkit';
import isCheckedReducer from './isCheckedSlice';

const CategoryStore = configureStore({
  reducer: {
    isChecked: isCheckedReducer,
  },
});

export type RootState = ReturnType<typeof CategoryStore.getState>;
export type AppDispatch = typeof CategoryStore.dispatch;
export default CategoryStore;
