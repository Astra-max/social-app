import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { AuthState } from "@/types";
import { error } from "console";


const initialState: AuthState = {
    user: {userId: "", token: null},
    loading: false,
    error: null,
}