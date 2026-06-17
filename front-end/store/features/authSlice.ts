import { createSlice, createAsyncThunk, Action } from "@reduxjs/toolkit";
import { AuthState, User } from "@/types";
import Api from "@/services/axios";
import { RootState } from "../store";


const defaultUser: User = {
    userId: "",
    userAvatar: "",
    nickName: "",
    aboutMe: "",
    fullName: "",
    DateOfBirth: "",
    isPublic: true,
    createdAt: "",
}


const initialState: AuthState = {
    user: defaultUser,
    accessToken: null,
    loading: false,
    error: null,
}

interface LoginCreds {
    emailAddr: string;
    password: string;
}


export const loginUser = createAsyncThunk(
    "auth/login",
    async (loginCreds: LoginCreds, { rejectWithValue }) => {
        try {
            const response: any = await Api.post("/auth/login", loginCreds);
            return response.data
        } catch (error: any) {
            return rejectWithValue(
                error.response?.data?.message ?? "something went wrong"
        )
        }
    }
)

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        logout: (state) => {
            state.error = null;
            state.loading = false;
            state.accessToken = null;
            state.user = defaultUser
        },
        setAccessToken: (state, { payload }) => {
            state.accessToken = payload
        }
    },
    extraReducers(builder) {
        builder
        .addCase(loginUser.pending, (state) => {
            state.loading = true;
        })
        .addCase(loginUser.rejected, (state, { payload }: any) => {
            state.loading = false;
            state.error = payload;
        })
        .addCase(loginUser.fulfilled, (state, { payload }: any) => {
            state.loading = false;
            state.error = null;
            state.accessToken = payload.accessToken;
            state.user = payload.user;
        })
    },
})

export const authSelector = ({ auth }: RootState) => auth;
export const { logout, setAccessToken } = authSlice.actions;
export default authSlice.reducer;