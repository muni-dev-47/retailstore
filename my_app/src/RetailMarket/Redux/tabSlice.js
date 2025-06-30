import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    tabs: [],
    currentTab:""
}

const tabSlice = createSlice({
    name: "tabs",
    initialState: initialState,
    reducers: {

        addTab: (state, action) => {
            const path = action.payload.path;
            if (!state.tabs.some(val => val.path === path.path)) {
                state.tabs.push(path);
            }
            state.currentTab = path.path;
        }
        ,
        removeTab: (state, action) => {
            if (action.payload.path !== '/')
                state.tabs = state.tabs.filter(val => val.path !== action.payload.path)
            if (state.currentTab === action.payload.path) {
                state.currentTab = state.tabs[state.tabs.length - 1]?.path || '/'
                if (action.payload.navigate) {
                    action.payload.navigate(state.currentTab);
                }
            }
        },
        setCurrentTab: (state, action) => {
            state.currentTab = action.payload;
        }
    }
})

export const { addTab, removeTab, setCurrentTab } = tabSlice.actions;

export default tabSlice.reducer;