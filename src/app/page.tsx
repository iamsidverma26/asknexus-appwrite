import "./globals.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import HeroSection from "./components/HeroSection";
import TopContributers from "./components/TopContributers";
import LatestQuestions from "./components/LatestQuestions";
import Community from "./components/Community";

export default function Home() {
  return (
    <>
      <Header />
      <HeroSection />
      <div className="md:flex md:justify-evenly">
        <div className="md:w-3/5">
          <h1 className="text-white text-2xl p-3">Latest Questions</h1>
          <div className="p-4">
            <LatestQuestions />
          </div>
        </div>
        <div className="md:w-2/5">
          <h1 className="text-white text-2xl p-3">Top Contributers</h1>
          <div className="p-4">
            <TopContributers />
          </div>
        </div>
      </div>
      <div className="flex justify-center items-center p-10">
        <Community />
      </div>
      <Footer />
    </>
  );
}
