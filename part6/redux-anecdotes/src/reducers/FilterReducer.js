const { createSlice } = require("@reduxjs/toolkit");

const filterSlice = createSlice({
  name: "filter",
  initialState: "",
  reducers: {
    setFilter(state, action) {
      state = action.payload;
      return state;
    },
  },
});

export default filterSlice.reducer;
export const { setFilter } = filterSlice.actions;
