import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    name: "",
    email: "",
    isLogin: true,
    isAdmin: true,
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        login: (state, action) => {
            // state.name = action.payload.name;
            // state.email = action.payload.email;
            state.isLogin = true;
            state.isAdmin = action.payload.isAdmin;
        },
        logout: (state) => {
            state.name = "";
            state.email = "";
            state.isLogin = false;
            state.isAdmin = false;
        },
    },
});

export default userSlice.reducer;
export const { login, logout } = userSlice.actions;
