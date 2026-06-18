import { createSlice } from "@reduxjs/toolkit";

interface ToggleType {
    toggle: boolean;
}

const initialState: ToggleType = {
    toggle: false,
}

const toggleSideBarSlice = createSlice({
    name: "toggleSideBar",
    initialState,
    reducers: {
        setToggle: (state) => {
            state.toggle = !state.toggle
        }
    }
})

export const { setToggle } = toggleSideBarSlice.actions;
export default toggleSideBarSlice.reducer;