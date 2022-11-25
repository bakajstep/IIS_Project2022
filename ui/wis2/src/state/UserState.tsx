import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    user: null,
};

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setLogin: (state, action: any) => {
            state.user = action.payload.user;
        },
        setLogout: (state) => {
            state.user = null;
        },
        /*
        setPost: (state, action) => {
            const updatedPosts = state.posts.map((post) => {
                if (post._id === action.payload.post._id) return action.payload.post;
                return post;
            });
            state.posts = updatedPosts;
        },*/
    },
});

export const { setLogin, setLogout} =
    authSlice.actions;
export default authSlice.reducer;