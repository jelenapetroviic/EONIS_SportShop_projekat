import { userRequest } from "../requestMethods";
import { loginFailure, loginStart, loginSuccess } from "./userRedux"

export const login = async (dispatchEvent, user) => {

    dispatch(loginStart());

    try {
        const res = await userRequest.post("/auth/login/", user);
        dispatch(loginSuccess(res.data));
    } catch (error) {
        dispatch(loginFailure())
    }
}