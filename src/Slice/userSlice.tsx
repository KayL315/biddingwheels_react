import { createSlice } from "@reduxjs/toolkit";

export interface UserSliceInterface {
    user_id: number | undefined;
    role: string;
    isLogin: boolean;
    isAdmin: boolean;
}

// const initialState: UserSliceInterface = {
//     user_id: undefined,
//     role: "normal", // admin
//     isLogin: true,
//     isAdmin: false,
// };

const initialState: UserSliceInterface = {
    user_id: 13,
    role: "",
    isLogin: false,
    isAdmin: false,
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        login: (state, action) => {
            state.user_id = action.payload.user_id;
            state.role = action.payload.role;
            state.isLogin = true;
            state.isAdmin = action.payload.user_role === "admin" ? true : false;
        },
        logout: (state) => {
            state.user_id = undefined;
            state.role = "";
            state.isLogin = false;
            state.isAdmin = false;
        },
    },
});

export default userSlice.reducer;
export const { login, logout } = userSlice.actions;
