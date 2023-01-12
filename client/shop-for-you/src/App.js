import { BrowserRouter } from "react-router-dom";
import "./App.css";
import { MainWrapper } from "./components/Components/MainWrapper/MainWrapper";

function App() {
    return (
        <BrowserRouter>
            <MainWrapper />
        </BrowserRouter>
    );
}

export default App;
