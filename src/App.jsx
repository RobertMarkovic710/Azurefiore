import "./App.css";
import Hero from "./pageComponents/hero/Hero";
import About from "./pageComponents/about/About";
import Gallery from "./pageComponents/gallery/Gallery";
import Contact from "./pageComponents/contact/Contact";
import Footer from "./pageComponents/footer/Footer";
import ScrollToTop from "./components/scrollToTop/ScrollToTop";

function App() {
  return (
    <>
      <Hero />
      <About />
      <Gallery />
      <Contact />
      <Footer />
      <ScrollToTop />
    </>
  );
}

export default App;