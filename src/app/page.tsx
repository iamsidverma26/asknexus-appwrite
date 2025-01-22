import Image from "next/image";
import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import Header from "./components/Header";
import Footer from "./components/Footer";
import HeroSection from "./components/HeroSection";
import TopContributers from "./components/TopContributers";
import LatestQuestions from "./components/LatestQuestions";
const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <>
      <Header />
      <HeroSection />
      <LatestQuestions />
      <TopContributers />
      <Footer />
    </>
  );
}
