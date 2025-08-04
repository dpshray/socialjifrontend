import {createSlice, PayloadAction} from "@reduxjs/toolkit";

interface UserData {
    id: string;
    email: string;
    role: string;
}

interface AuthState {
    user: UserData | null;
    token: string | null;
    isAuthenticated: boolean;
    loading: boolean;
    error: string | null;
    role: string;
}


const getInitialState = (): AuthState => ({
    user: null,
    isAuthenticated: false,
    token: typeof window !== "undefined" ? localStorage.getItem("_at") : null,
    loading: false,
    error: null,
    role: typeof window !== "undefined" ? localStorage.getItem("_role")?.toLowerCase() || "" : "",
});

const authSlice = createSlice({
    name: "auth",
    initialState: getInitialState(),
    reducers: {
        loginSuccess: (state, action: PayloadAction<{ token: string; role: string }>) => {
            state.isAuthenticated = true;
            state.loading = false;
            state.error = null;
            state.role = action.payload.role;
            state.token = action.payload.token;
            localStorage.setItem("_at", action.payload.token);
            const role = action.payload.role.toLowerCase();
            localStorage.setItem("_role", role);
        },
        logout: (state) => {
            state.isAuthenticated = false;
            state.user = null;
            state.loading = false;
            state.error = null;
            state.role = "";
            state.token = null;
            localStorage.removeItem("_at");
            localStorage.removeItem("_role");
        },
    },
});

export const {logout, loginSuccess} = authSlice.actions;
export default authSlice.reducer;
