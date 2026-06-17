import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { AuthState, User } from "@/types";
import { Api } from "@/services/axios";
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
};

const initialState: AuthState = {
    user: defaultUser,
    loading: false,
    error: null,
    isAuthenticated: false,
    accessToken: null
};

interface LoginCreds {
    emailAddr: string;
    password: string;
}

export const loginUser = createAsyncThunk(
    "auth/login",
    async (loginCreds: LoginCreds, { rejectWithValue }) => {
        try {
            const response = await Api.post("/auth/login", loginCreds);
            return response.data; // { user, accessToken }
        } catch (error: any) {
            return rejectWithValue(
                error.response?.data?.message ?? "something went wrong"
            );
        }
    }
);

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        logout: (state) => {
            state.user = defaultUser;
            state.loading = false;
            state.error = null;
            state.isAuthenticated = false;
        },

        // 🔥 used after /auth/refresh
        setSession: (state, { payload }) => {
            state.user = payload.user;
            state.isAuthenticated = true;
        },
    },

    extraReducers: (builder) => {
        builder
            .addCase(loginUser.pending, (state) => {
                state.loading = true;
            })

            .addCase(loginUser.rejected, (state, action: any) => {
                state.loading = false;
                state.error = action.payload;
                state.isAuthenticated = false;
            })

            .addCase(loginUser.fulfilled, (state, action: any) => {
                state.loading = false;
                state.error = null;
                state.user = action.payload.user;
                state.isAuthenticated = true;
            });
    },
});

export const authSelector = ({ auth }: RootState) => auth;
export const { logout, setSession } = authSlice.actions;
export default authSlice.reducer;