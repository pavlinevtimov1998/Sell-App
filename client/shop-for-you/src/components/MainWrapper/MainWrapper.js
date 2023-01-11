import { Footer } from "../common/Footer/Footer";
import { Header } from "../common/Header/Header";
import { HomePage } from "../Pages/HomePage/HomePage";

export const MainWrapper = () => {
    return (
        <>
            <Header />
            <main id="main">
                <HomePage />
            </main>
            <Footer />
        </>
    );
};
