import { Api } from "@/services/axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";


interface UserProfileInfo {
    userId: string;
    email: string;
    firstName: string;
    lastName: string;
    dateOfBirth: string;
    avatar: string;
    nickName: string;
    aboutMe: string;
    isPublic: boolean;
}

const user: UserProfileInfo = {
    userId: "",
    email: "",
    firstName: "",
    lastName: "",
    dateOfBirth: "",
    avatar: "",
    nickName: "",
    aboutMe: "",
    isPublic: true
}


const initialState  = {
    user,
    error: null,
    loading: false,
}


const getProfile = createAsyncThunk(
    "user/profile",
    async (userId: string, { rejectWithValue }) => {
        try {
            const res = await Api.get(`/profile/${userId}`);
            return res.data
        } catch (error: any) {
            return rejectWithValue(error.response.data?.message ?? "Failed to get user profile data")
        }
    }
)

const profileSlice = createSlice({
    name: "profile",
    initialState,

    reducers: {
        setProfile: (state, { payload}: any) => {
            state.user = payload
            state.error = null
        }
    },
    extraReducers: (builder) => {
        builder
        .addCase()
    }
})