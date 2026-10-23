import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Intro } from './components/Intro';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { AboutSection } from './components/AboutSection';
import { Work } from './components/Work';
import { AIProject } from './components/AIProject';
import { ContactSection } from './components/ContactSection';
import { ScrollToHash } from './components/ScrollToHash';
import { Footer } from './components/Footer';
import { WorkPage } from './pages/WorkPage';
import { ConnectXCase } from './pages/work/ConnectXCase';
import { TOLCase } from './pages/work/TOLCase';
import { VeggieGrillCase } from './pages/work/VeggieGrillCase';
import { AristotleCase } from './pages/work/AristotleCase';
import { PangeaCase } from './pages/work/PangeaCase';
import { PromotewallCase } from './pages/work/PromotewallCase';
import { WaveDivider } from './components/WaveDivider';
import './styles/case-study.css';

function HomePage() {
  const [introComplete, setIntroComplete] = useState(false);

  return (
    <>
      {!introComplete && (
        <Intro onComplete={() => setIntroComplete(true)} />
      )}
      <div className={`site-content${introComplete ? ' site-content--visible' : ''}`}>
        <Header />
        <main id="main" tabIndex={-1}>
          <Hero />
          <WaveDivider />
          <AboutSection />
          <WaveDivider />
          <Work />
          <WaveDivider />
          <AIProject />
          <ContactSection />
        </main>
      </div>
    </>
  );
}

function CaseStudyLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="site-content site-content--visible">
      <Header />
      <main id="main" tabIndex={-1}>
        {children}
      </main>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <ScrollToHash />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/work" element={<WorkPage />} />
        <Route path="/work/connectx" element={<CaseStudyLayout><ConnectXCase /></CaseStudyLayout>} />
        <Route path="/work/tol" element={<CaseStudyLayout><TOLCase /></CaseStudyLayout>} />
        <Route path="/work/veggie-grill" element={<CaseStudyLayout><VeggieGrillCase /></CaseStudyLayout>} />
        <Route path="/work/pangea" element={<CaseStudyLayout><PangeaCase /></CaseStudyLayout>} />
        <Route path="/work/aristotle" element={<CaseStudyLayout><AristotleCase /></CaseStudyLayout>} />
        <Route path="/work/promotewall" element={<CaseStudyLayout><PromotewallCase /></CaseStudyLayout>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
