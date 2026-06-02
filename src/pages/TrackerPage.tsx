import Navbar from "../components/Navbar";
import { SunkCostTracker } from "../components/SunkCostTracker";
import Footer from "../components/Footer";

export default function TrackerPage() {
  return (
    <div className="min-h-screen bg-parchment">
      <Navbar />
      <SunkCostTracker />
      <Footer />
    </div>
  );
}
