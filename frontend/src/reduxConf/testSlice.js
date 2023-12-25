import { createSlice } from "@reduxjs/toolkit";

const testSlice = createSlice({
  name: "test",
  initialState: {
    testDetail: null,
    savedAnswer: null,
    userAnswer: null,
    isFetching: false,
    success: false,
  },
  reducer: {
    getTestStart: (state) => {
      state.test.isFetching = true;
    },
    getTestSuccess: (state, action) => {
      state.test.testDetail = action.payload;
      state.test.isFetching = false;
      state.test.success = true;
    },
    getTestError: (state) => {
      state.test.isFetching = false;
      state.test.testDetail = null;
      state.test.success = false;
    },
    cleanTest: (state) => {
      state.test.testDetail = null;
      state.test.userAnswer = null;
      state.test.isFetching = false;
      state.test.success = false;
    },
    syncAnswerStart: (state) => {
      state.isFetching = true;
    },
    syncAnswerSuccess: (state, action) => {
      state.isFetching = false;
      state.test.savedAnswer = action.payload;
      state.test.success = true;
    },
    syncAnswerFail: (state) => {
      state.isFetching = false;
      state.test.savedAnswer = null;
      state.test.success = false;
    },
  },
});
export const {
  getTestStart,
  getTestSuccess,
  getTestError,
  cleanTest,
  syncAnswerStart,
  syncAnswerSuccess,
  syncAnswerFail,
} = testSlice.actions;
export default testSlice.reducer;
