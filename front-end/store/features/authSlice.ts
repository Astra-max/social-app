import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { Api } from "@/services/axios";
import { RootState } from "../store";

export interface User {
  userId: string;
  userAvatar: string;
  nickName: string;
  aboutMe: string;
  fullName: string;
  DateOfBirth: string;
  isPublic: boolean;
  createdAt: string;
}

interface AuthState {
  user: User | null;
  loading: boolean;
  error: string | null;
  isAuthenticated: boolean;
}

const initialState: AuthState = {
  user: null,
  loading: false,
  error: null,
  isAuthenticated: false,
};

export const loginUser = createAsyncThunk(
  "auth/login",
  async (data: { email: string; password: string }, { rejectWithValue }) => {
    try {
      const res = await Api.post("/auth/login", data);

      return res.data.user;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || "Login failed");
    }
  }
);

export const logOutUser = createAsyncThunk(
  "auth/logout",
  async (_, { rejectWithValue }: any) => {
    try {
      const res = await Api.post("/auth/logout");

      return res.data;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || "Failed to logout user");
    }
  }
);

export const registerUser = createAsyncThunk(
  "auth/register",
  async (formData: FormData, { rejectWithValue }) => {
    try {
      const res = await Api.post("/auth/register", formData);

      return res.data.user;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || "Register failed");
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setSession: (state, action) => {
      state.user = action.payload.user;
      state.isAuthenticated = true;
    },

    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.error = null;
    },
  },

  extraReducers: (builder) => {
    builder

      // LOGIN
      .addCase(loginUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isAuthenticated = true;
        state.loading = false;
      })
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(loginUser.rejected, (state, action: any) => {
        state.loading = false;
        state.error = action.payload;
      })

      // REGISTER
      .addCase(registerUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isAuthenticated = true;
        state.loading = false;
      })
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(registerUser.rejected, (state, action: any) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Logout
      .addCase(logOutUser.fulfilled, (state) => {
        state.user = null;
        state.isAuthenticated = false;
      });
  },
});

export const authSelector = (state: RootState) => state.auth;
export const { setSession, logout } = authSlice.actions;
export default authSlice.reducer;