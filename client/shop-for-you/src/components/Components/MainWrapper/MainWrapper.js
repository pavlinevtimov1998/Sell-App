import { Footer } from "../common/Footer/Footer";
import { Header } from "../common/Header/Header";
import { AppRouter } from "../Router/Router";

export const MainWrapper = () => {
    return (
        <>
            <Header />
            <main id="main">

                <AppRouter />
                
            </main>
            <Footer />
        </>
    );
};
