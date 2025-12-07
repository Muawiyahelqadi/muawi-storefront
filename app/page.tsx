import HeroBanner from "@/components/heroBanner/HeroBanner";
import Features from "@/components/features/Features";
import About from "@/components/about/About";
import Services from "@/components/services/Services";
import Appointment from "@/components/appointment/Appointment";

export default function Home() {
  return (
    <main className="pt-18">
      <HeroBanner />
      <Features />
      <About />
      <Services />
      <Appointment />
    </main>
  );
}
