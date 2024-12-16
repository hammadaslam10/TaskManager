import { configureStore } from "@reduxjs/toolkit";
import { taskmanagementApi } from "./features/taskmanagementApi";

export const store = configureStore({
  reducer: {
    [taskmanagementApi.reducerPath]: taskmanagementApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
        taskmanagementApi.middleware,
    ),
});

export default store;
