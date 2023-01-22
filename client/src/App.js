import "./App.css";

import { Footer } from "./Components/Core/Footer/Footer";
import { Header } from "./Components/Core/Header/Header";
import { SearchBar } from "./Components/SearchBar/SearchBar";
import { Carousel } from "./Components/Carousel/Carousel";

function App() {
    return (
        <>
            <Header />
            <SearchBar />
            <Carousel />
            <main className="main"></main>

            <Footer />
        </>
    );
}

export default App;
