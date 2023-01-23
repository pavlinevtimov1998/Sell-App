import "./App.css";

import { Footer } from "./Components/Core/Footer/Footer";
import { Header } from "./Components/Core/Header/Header";
import { SearchBar } from "./Components/SearchBar/SearchBar";
import { Categories } from "./Components/Categories/Categories";

function App() {
    return (
        <>
            <Header />
            <SearchBar />
            <Categories />

            <main className="main"></main>

            <Footer />
        </>
    );
}

export default App;
