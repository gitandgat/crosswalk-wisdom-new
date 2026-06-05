import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import MirrorSection from "./components/MirrorSection";
import IdentityCageSection from "./components/IdentityCageSection";
import YellowVestSection from "./components/YellowVestSection";
import BeliefsSection from "./components/BeliefsSection";
import ProductSection from "./components/ProductSection";
import ManifestoSection from "./components/ManifestoSection";
import CTASection from "./components/CTASection";
import Footer from "./components/Footer";
import StartPage from "./pages/StartPage";
import ThankYouPage from "./pages/ThankYouPage";
import WaitlistPage from "./pages/WaitlistPage";
import WaitlistThanksPage from "./pages/WaitlistThanksPage";
import ApplyPage from "./pages/ApplyPage";
import ApplyThanksPage from "./pages/ApplyThanksPage";
import CoursePage from "./pages/CoursePage";
import BlogPage from "./pages/BlogPage";
import BlogPostPage from "./pages/BlogPostPage";
import WorkWithMePage from "./pages/WorkWithMePage";
import AssessmentPage from "./pages/AssessmentPage";
import ImgHubPage from "./pages/ImgHubPage";
import ImgPivotPage from "./pages/ImgPivotPage";
import ImgIdentityPage from "./pages/ImgIdentityPage";
import ImgMapPage from "./pages/ImgMapPage";
import ImgPlaybookPage from "./pages/ImgPlaybookPage";
import ImgAdvisorPage from "./pages/ImgAdvisorPage";
import ImgCalculatorPage from "./pages/ImgCalculatorPage";
import ImgPivotChallengePage from "./pages/ImgPivotChallengePage";
import PhilosophyPage from "./pages/PhilosophyPage";
import TrackerPage from "./pages/TrackerPage";
// import FearAuditWrapper from "./pages/FearAuditWrapper";

function HomePage() {
  return (
    <div className="min-h-screen bg-parchment">
      <Navbar />
      <HeroSection />
      <MirrorSection />
      <IdentityCageSection />
      <YellowVestSection />
      <BeliefsSection />
      <ProductSection />
      <ManifestoSection />
      <CTASection />
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/start" element={<StartPage />} />
        <Route path="/start/welcome" element={<ThankYouPage />} />
        <Route path="/waitlist" element={<WaitlistPage />} />
        <Route path="/waitlist/thanks" element={<WaitlistThanksPage />} />
        <Route path="/apply" element={<ApplyPage />} />
        <Route path="/apply/thanks" element={<ApplyThanksPage />} />
        <Route path="/course" element={<CoursePage />} />
        <Route path="/blog" element={<BlogPage />} />
        <Route path="/blog/:slug" element={<BlogPostPage />} />
        <Route path="/philosophy" element={<PhilosophyPage />} />
        <Route path="/work-with-me" element={<WorkWithMePage />} />
        <Route path="/assessment" element={<AssessmentPage />} />
        <Route path="/img" element={<ImgHubPage />} />
        <Route path="/img/pivot" element={<ImgPivotPage />} />
        <Route path="/img/identity" element={<ImgIdentityPage />} />
        <Route path="/img/map" element={<ImgMapPage />} />
        <Route path="/img/playbook" element={<ImgPlaybookPage />} />
        <Route path="/img/advisor" element={<ImgAdvisorPage />} />
        <Route path="/img/calculator" element={<ImgCalculatorPage />} />
        <Route path="/imgpivot" element={<ImgPivotChallengePage />} />
        <Route path="/tracker" element={<TrackerPage />} />
        {/* <Route path="/fear-audit/*" element={<FearAuditWrapper />} /> */}
      </Routes>
    </BrowserRouter>
  );
}
