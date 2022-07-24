import { useContext, useState } from "react";
import { Alert } from "react-native";
import AuthContent from "../components/Auth/AuthContent";
import LoadingOverlay from "../components/ui/LoadingOverlay";
import { AuthContext } from "../store/auth-context";
import { loginUser } from "../util/auth";

function LoginScreen() {
    let [isAuthenticating, setIsAuthenticating] = useState(false);
    const authCtx = useContext(AuthContext);

    let loginHandler = async ({ email, password }) => {
        setIsAuthenticating(true);
        try {
            const token = await loginUser(email, password);
            authCtx.authenticate(token);
        } catch (error) {
            Alert.alert(
                "Athentication Failed",
                "Could not log you in. Please, try again later!"
            );
            setIsAuthenticating(false);
        }
    };

    if (isAuthenticating) {
        return <LoadingOverlay message="Logging in..." />;
    }

    return <AuthContent isLogin onAuthenticate={loginHandler} />;
}

export default LoginScreen;
