import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const postStackStatement = createAsyncThunk(
    "bill/postSalesStatement",
    async (statement, { rejectWithValue }) => {
        try {
            const response = await axios.post("http://localhost:5000/api/postStacks", statement);
        } catch (err) {
            return rejectWithValue(err.response?.data || "Something went wrong");
        }
    }
);

export const putStackStatement = createAsyncThunk(
    "bill/putSalesStatement",
    async (statement, { rejectWithValue }) => {
        try {
            console.log(statement)
            const response = await axios.put("http://localhost:5000/api/putStacks", statement);
        } catch (err) {
            return rejectWithValue(err.response?.data || "Something went wrong");
        }
    }
);

const initialState = {
    stacks: [],
    section: { section: {} },
    stack: {}
}

const stackSlice = createSlice({
    name: "stack",
    initialState,
    reducers: {
        addStack: (state, action) => {
            const { section, key, value } = action.payload;
            state.stack[section] = { ...state.stack[section], [key]: value }
        },
        setStackForBackend: (state, action) => {
            state.stacks = [...action.payload.stacks];
        },
        updateStack: (state, action) => {
            const { section, key, value, index } = action.payload;
            if (Number(value)) {
                state.section.section[section][index] = { ...state.section.section[section][index], [key]: value };
            } else {
                state.section.section[section].splice(index, 1);
            }
        },
        updateStackList: (state, action) => {
            const { index, section } = action.payload;
            state.stacks[index].section.stacks = state.section.section[section];
            delete state.section.section[section];
        },
        deleteStackItem: (state, action) => {
            const { section, index } = action.payload;
            state.section.section[section].splice(index, 1);
        },
        updateStackItems: (state, action) => {
            const { index } = action.payload;
            console.log(state.stacks[index])
            const sectionName = state.stacks[index].section.sectionName;
            const stacks = state.stacks[index].section.stacks;
            state.section.section[sectionName] = stacks;
        },
        addStackInStore: (state, action) => {
            const { section } = action.payload;
            if (!state.section.section[section]) state.section.section[section] = [];
            let index = 0;
            index = state.section.section[section]?.findIndex(val => (val.itemName === state.stack[section].itemName) && (val.itemPrice === state.stack[section].itemPrice))
            if (index != -1) {
                state.section.section[section][index].itemCount = new Number(state.section.section[section][index].itemCount) + new Number(state.stack[section].itemCount);
            } else {
                state.section.section[section].push({ ...state.stack[section] })
            }
            delete state.stack[section]
        },
        addAllStackInSection: (state, action) => {
            const { section, date, sectionName } = action.payload;
            state.stacks.push({ section: { stacks: state.section.section[section], date, sectionName } })
            delete state.section.section[section]
            delete state?.stack?.[section]
        },
        deleteSectionAllItems: (state, action) => {
            const { section } = action.payload;
            delete state.section.section[section];
            delete state.stack[section];
        },
        deleteAllStacks: (state) => {
            return {
                stacks: [],
                section: { section: {} },
                stack: {}
            }
        }
    }
})

export const { addStack, updateStackList, deleteAllStacks,deleteSectionAllItems, updateStackItems, setStackForBackend, deleteStackItem, updateStack, addStackInStore, addAllStackInSection } = stackSlice.actions;

export default stackSlice.reducer;