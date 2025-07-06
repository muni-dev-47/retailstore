import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const login = createAsyncThunk(
    "auth/login",
    async (formData, { rejectWithValue }) => {
        try {
            const res = await axios.post("http://localhost:5000/api/login", formData);

            const { token, user } = res.data;

            localStorage.setItem("token", token);
            localStorage.setItem("user", JSON.stringify(user));

            return { token, user };
        } catch (err) {
            const message = err.response?.data?.message || "Login failed";
            return rejectWithValue(message);
        }
    }
);


export const signup = createAsyncThunk(
    "signup",
    async (statement, { rejectWithValue }) => {
        try {
            const res = await axios.post("http://localhost:5000/api/signup", statement);

            const { token, user } = res.data;

            localStorage.setItem("token", token);
            localStorage.setItem("user", JSON.stringify(user));

            return { token, user };
        } catch (err) {
            return rejectWithValue(err.response.data.message);
        }
    }
);

export const googleLogin = createAsyncThunk(
    "login",
    async (statement, { rejectWithValue }) => {
        try {
            const res = await axios.post("http://localhost:5000/api/google-login", statement);

            const { token, user } = res.data;

            localStorage.setItem("token", token);
            localStorage.setItem("user", JSON.stringify(user));

            return { token, user };

        } catch (err) {
            return rejectWithValue(err.response.data.message);
        }
    }
);


const initialState = {
    userInput: {}
}


const userSlice = createSlice({
    name: "users",
    initialState,
    reducers: {
        userFormData: (state, action) => {
            const { key, value } = action.payload;
            state.userInput = { ...state.userInput, [key]: value };
        },
        deleteInputData: (state, action) => {
            state.userInput = {};
        }
    }
})


export const { userFormData, deleteInputData } = userSlice.actions;
export default userSlice.reducer;