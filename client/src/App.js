import './App.css';
import AboutStrip from './components/AboutStrip/AboutStrip';
import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';
import HeroSection from './components/HeroSection/HeroSection';
import ServicesSection from './components/Service/ServiceSection/ServiceSection';
import Technology from './components/Technology/Technology';

function App() {
  return (
    <div className="App">
      <Header />
      <HeroSection />
      <AboutStrip/>
      <ServicesSection/>
      <Technology/>
      <Footer/>
    </div>
  );
}

export default App;
