import { Footer } from "../common/Footer/Footer";
import { Header } from "../common/Header/Header";
import { Router } from "../Router/Router";

export const MainWrapper = () => {
    return (
        <>
            <Header />
            <main id="main">
                <Router />
            </main>
            <Footer />
        </>
    );
};
