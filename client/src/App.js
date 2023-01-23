import "./App.css";

import { AuthProvider } from "./Contexts/AuthContext";
import { MainWrapper } from "./Components/components/MainWrapper/MainWrapper";

function App() {
    

    return (
        <AuthProvider>
            <MainWrapper />
        </AuthProvider>
    );
}

export default App;
