import { createSlice } from "@reduxjs/toolkit";

const stackSlice = createSlice({
    name: "stack",
    initialState: {},
    reducers: {
        addStack: (state, action) => {
            const { section, key, value } = action.payload;
            state.stack[section] = { ...state.stack[section], [key]: value }
        },
        setStackForBackend: (state, action) => {
            return { ...action.payload.stack };
        },
        updateStack: (state, action) => {

        },
    }
})

export const { addStack, setStackForBackend, updateStack } = stackSlice.actions;

export default stackSlice.reducer;