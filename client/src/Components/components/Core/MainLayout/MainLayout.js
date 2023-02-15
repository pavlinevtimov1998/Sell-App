import { Header } from "../Header/Header";
import { Footer } from "../Footer/Footer";

export const MainLayout = ({ children }) => {
    return (
        <>
            <Header />

            <div
                style={{
                    paddingTop: "80px",
                    minHeight: "80vh",
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
