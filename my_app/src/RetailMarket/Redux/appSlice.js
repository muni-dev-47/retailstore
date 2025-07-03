import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const postSalesStatement = createAsyncThunk(
    "bill/postSalesStatement",
    async (statement, { rejectWithValue }) => {
        try {
            const response = await axios.post("http://localhost:5000/api/postSales", statement);
            return response.data;
        } catch (err) {
            return rejectWithValue(err.response?.data || "Something went wrong");
        }
    }
);

export const putSalesStatement = createAsyncThunk(
    "bill/putSalesStatement",
    async (statement, { rejectWithValue }) => {
        try {
            const response = await axios.put("http://localhost:5000/api/putSales", statement);
            return response.data;
        } catch (err) {
            return rejectWithValue(err.response?.data || "Something went wrong");
        }
    }
);


const initialState = {
    salesStatements: [],
    billDetails: { billItems: {}, cusName: {}, date: {}, paymentType: {} },
    billItem: {}
};


const billSlice = createSlice({
    name: 'bill',
    initialState,
    reducers: {
        setInitialState: (state, action) => {
            state.salesStatements = [...action.payload.initialState];
        },

        addItem: (state, action) => {
            const { id, key, value } = action.payload.item;
            state.billItem[id] = { ...state.billItem[id], [key]: value };
        },
        addBillItem: (state, action) => {
            if (!state.billDetails.billItems[action.payload.id]) {
                state.billDetails.billItems[action.payload.id] = [];
            }
            // let index = 0;
            // index = state.billDetails.billItems[action.payload.id].findIndex(val => (val.itemName === state.billItem[action.payload.id].itemName) && (val.itemPrice === state.billItem[action.payload.id].itemPrice));
            // if (index != -1) {
            //     state.billDetails.billItems[action.payload.id][index].itemCount =  new Number(state.billDetails.billItems[action.payload.id][index].itemCount) + new Number(state.billItem[action.payload.id].itemCount);
            //     delete state.billItem[action.payload.id];
            // }
            // else 
            if (state.billItem[action.payload.id] && state.billItem[action.payload.id]) {
                state.billDetails.billItems[action.payload.id].push(state.billItem[action.payload.id]);
                delete state.billItem[action.payload.id];
            } else {
                alert("Please fill")
            }
        },
        setCustomer: (state, action) => {
            const { id, customer } = action.payload;
            state.billDetails.cusName[id] = { customer };
        },
        setDate: (state, action) => {
            const { id, date } = action.payload;
            state.billDetails.date[id] = { date: date ? date : new Date().toISOString().split("T")[0] };
        },
        setUpdateBillItems: (state, action) => {
            const { id, index, key, value } = action.payload;
            console.log(Number(value))
            if (Number(value) !== 0) {
                state.billDetails.billItems[id][index] = { ...state.billDetails.billItems[id][index], [key]: value };
            } else {
                state.billDetails.billItems[id].splice(index, 1);
            }
        },
        deleteItem: (state, action) => {
            const { id, index } = action.payload;
            state.billDetails.billItems[id].splice(index, 1);
        },
        deleteBillItems: (state, action) => {
            const { id } = action.payload;
            delete state.billDetails.billItems[id];
            delete state.billDetails.cusName[id];
            delete state.billDetails.date[id];
            delete state.billDetails.paymentType[id];
        },
        setPaymentType: (state, action) => {
            const { id, paymentType } = action.payload;
            state.billDetails.paymentType[id] = { paymentType };
        },
        setSalesStatement: (state, action) => {
            const { id } = action.payload;
            state.salesStatements.push({ id: id, bill: state.billDetails.billItems[id], cusName: state.billDetails.cusName[id]?.customer || "retailer", date: state.billDetails.date[id]?.date || new Date().toISOString().split("T")[0], paymentType: state.billDetails.paymentType[id]?.paymentType || "Credit" });
            delete state.billDetails.billItems[id];
            delete state.billDetails?.cusName[id];
            delete state.billDetails?.date[id];
            delete state.billDetails?.paymentType[id];
        },
        updateSales: (state, action) => {
            const { id, bill, customer, paymentType, date } = action.payload;
            state.billDetails.billItems[id] = bill;
            state.billDetails.cusName[id] = { customer };
            state.billDetails.date[id] = { date };
            state.billDetails.paymentType[id] = { paymentType };
        },
        setUpdateBill: (state, action) => {
            const { id } = action.payload;
            const index = state.salesStatements.findIndex(val => val.id === id);
            state.salesStatements[index].bill = state.billDetails.billItems[id];
            state.salesStatements[index].cusName = state.billDetails.cusName[id]?.customer || "retailer";
            state.salesStatements[index].date = state.billDetails.date[id]?.date || new Date().toISOString().split("T")[0];
            state.salesStatements[index].paymentType = state.billDetails.paymentType[id]?.paymentType || "Credit";
            delete state.billDetails?.billItems[id];
            delete state.billDetails?.cusName[id];
            delete state.billDetails?.date[id];
            delete state.billDetails?.paymentType[id];
        }
    }
})

export const { updateSales, deleteBillItems, setInitialState, addBillItem, setUpdateBill, addItem, setCustomer, setDate, setUpdateBillItems, deleteItem, setPaymentType, setSalesStatement } = billSlice.actions;

export default billSlice.reducer;