import { createSlice } from "@reduxjs/toolkit";
import { CarItem } from "../Interface/CarItems";

const initialState: CarItem[] = [];

const carsSlice = createSlice({
    name: "cars",
    initialState,
    reducers: {
        addCars: (state, action) => {
            if (state.length === 0) {
                state.push(...action.payload);
            }
        },
    },
});

export default carsSlice.reducer;
export const { addCars } = carsSlice.actions;
