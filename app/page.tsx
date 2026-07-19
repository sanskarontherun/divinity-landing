import Hero from "@/components/Hero";
import Problem from "@/components/Problem";
import Philosophy from "@/components/Philosophy";
import Features from "@/components/Features";
import Founder from "@/components/Founder";
import SignupCTA from "@/components/SignupCTA";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main>
      <Hero />
      <hr className="rule" />
      <Problem />
      <Philosophy />
      <Features />
      <hr className="rule" />
      <Founder />
      <SignupCTA />
      <Footer />
    </main>
  );
}
