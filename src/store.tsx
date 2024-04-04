import { configureStore } from "@reduxjs/toolkit";

import userReducer from "./Slice/userSlice";
import carsReducer from "./Slice/carsSlice";

const store = configureStore({
    reducer: {
        user: userReducer,
        cars: carsReducer,
    },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
