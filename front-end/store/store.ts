import { configureStore } from "@reduxjs/toolkit";
import toggleBarSlice from "@/store/features/toggleSideBarSlice"
import authSlice from "@/store/features/authSlice"


export const store = configureStore({
    reducer: {
        auth: authSlice,
        toggleSideBar:  toggleBarSlice,
    },
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;