import { Footer } from "../common/Footer/Footer";
import { Header } from "../common/Header/Header";
import { Welcome } from "../common/Welcome/Welcome";

export const MainWrapper = () => {
  return (
    <>
      <Header />
      <main id="main">
        <Welcome />
      </main>
      <Footer />
    </>
  );
};
