import { Header } from "../Header/Header";
import { Footer } from "../Footer/Footer";

export const MainLayout = ({ children }) => {
    return (
        <>
            <Header />

            <div style={{ minHeight: "100vh" }}>
                
                {children}
                
            </div>

            <Footer />
        </>
    );
};
