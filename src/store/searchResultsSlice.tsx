import { PayloadAction, createSlice } from '@reduxjs/toolkit';

type cocktailListType = {
  [key: string]: string;
};

const searchResultsSlice = createSlice({
  name: 'searchResults',
  initialState: null as cocktailListType[] | null,
  reducers: {
    setSearchResults: (
      state,
      action: PayloadAction<cocktailListType[] | null>
    ) => {
      return action.payload !== null ? action.payload : null;
    },
  },
});

export const { setSearchResults } = searchResultsSlice.actions;
export default searchResultsSlice.reducer;
