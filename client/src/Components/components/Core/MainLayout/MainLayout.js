import { Header } from "../Header/Header";
import { Footer } from "../Footer/Footer";

export const MainLayout = ({ children }) => {
    return (
        <>
            <Header />

            <div
                style={{
                    minHeight: "100vh",
                    maxWidth: "1250px",
                    margin: "auto",
                }}
            >

                {children}
            
            </div>

            <Footer />
        </>
    );
};
