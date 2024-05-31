import { configureStore } from "@reduxjs/toolkit";
import { loginApi } from "./services/api";

export const store = configureStore({
    reducer: {
        [loginApi.reducerPath]: loginApi.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(loginApi.middleware),
});
