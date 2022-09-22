import axios from "axios"; // npm i axios
import CredentialsModel from "../Models/CredentialsModel";
import { authStore, loginAction, logoutAction } from "../Redux/AuthState";
import appConfig from "../Utils/Config";

class AuthService {

    public async login(credentials: CredentialsModel): Promise<void> {
        const response = await axios.post<{token: string}>(appConfig.loginUrl, credentials);
        const token = response.data.token;
        authStore.dispatch(loginAction(token));
    }

    public logout(): void {
        authStore.dispatch(logoutAction());
    }

}

const authService = new AuthService();

export default authService;
