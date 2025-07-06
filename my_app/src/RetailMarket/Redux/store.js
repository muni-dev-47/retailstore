import { configureStore } from "@reduxjs/toolkit";
import tabSlice from "./tabSlice";
import billSlice from "./appSlice";
import stackSlice from "./stackSlice";
import userSlice from "./userSlice";
export const store = configureStore({
    reducer: {
        tab: tabSlice,
        bill: billSlice,
        stack: stackSlice,
        user: userSlice
    }
})