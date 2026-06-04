import { configureStore } from "@reduxjs/toolkit";
import toggleBar from "@/store/features/toggleSideBarSlice"


export const store = configureStore({
    reducer: {
        toggleSideBar:  toggleBar
    },
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;