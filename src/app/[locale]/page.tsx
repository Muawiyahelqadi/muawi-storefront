import HeroBanner from "@/src/components/heroBanner/HeroBanner";
import Features from "@/src/components/features/Features";
import About from "@/src/components/about/About";
import Services from "@/src/components/services/Services";
import Appointment from "@/src/components/appointment/Appointment";

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
