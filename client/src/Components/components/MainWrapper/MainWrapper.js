import { AuthProvider } from "../../../Contexts/AuthContext";
import { AppRouter } from "../Router/Router";

export const MainWrapper = () => {
    return (
        <AuthProvider>

            <AppRouter />
        
        </AuthProvider>
    );
};
