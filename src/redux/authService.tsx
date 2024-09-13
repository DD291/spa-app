import { loginSuccess, logoutSuccess } from "./authSlice";
import { store } from "./store";


export const authService = {
    async login(userData:any){
        if (userData.userName.includes("user") && userData.password === "password")
        {
            store.dispatch(loginSuccess(userData))
            return "S200";
        }
        else {
            return "E400";
        }
    },
    async logout() {
        store.dispatch(logoutSuccess())
    }
}