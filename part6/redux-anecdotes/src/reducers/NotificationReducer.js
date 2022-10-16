import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
  name: "notification",
  initialState: { message: undefined },
  reducers: {
    sentNotifications(state, action) {
      state.message = action.payload;
    },
    deleteNotifications(state) {
      state.message = undefined;
    },
  },
});

export default notificationSlice.reducer;
export const { sentNotifications, deleteNotifications } =
  notificationSlice.actions;
export const showNotifications = (message, time) => {
  let timeout = undefined;
  return (dispatch) => {
    dispatch(sentNotifications(message));
    if (timeout) {
      clearTimeout(timeout);
    }
    timeout = setTimeout(() => {
      dispatch(deleteNotifications());
    }, time * 1000);
  };
};
