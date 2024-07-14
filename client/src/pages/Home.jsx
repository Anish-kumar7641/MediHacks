import Header from '../components/Header/Header';
import HeroSection from '../components/HeroSection/HeroSection';
import AboutStrip from '../components/AboutStrip/AboutStrip';
import ServicesSection from '../components/Service/ServiceSection/ServiceSection';
import Technology from '../components/Technology/Technology';
import Footer from '../components/Footer/Footer';

function Home() {
  return (
    <div className="home">
      <Header />
      <HeroSection />
      <AboutStrip/>
      <ServicesSection/>
      <Technology/>
      <Footer/>
    </div>
  );
}

export default Home;