import { createSlice } from "@reduxjs/toolkit";
import { CarItem } from "../Interface/CarItems";

export interface CarState {
    carList: CarItem[];
    currentCar: CarItem | null;
}

const initialState: CarState = {
    carList: [],
    currentCar: null,
};

const carsSlice = createSlice({
    name: "cars",
    initialState,
    reducers: {
        addCars: (state, action) => {
            if (action.payload) {
                state.carList = action.payload;
            }
        },
        updateCurrentCar: (state, action) => {
            state.currentCar = action.payload;
        },
    },
});

export default carsSlice.reducer;
export const { addCars, updateCurrentCar } = carsSlice.actions;
