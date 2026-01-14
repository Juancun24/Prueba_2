
import React, { useState } from 'react';
import AppShell from './components/Layout/AppShell';
import HomePage from './pages/Home/HomePage';
import SectionPage from './pages/Section/SectionPage';
import ProfilePage from './components/Profile/ProfilePage';
import ChatbotWidget from './components/ChatbotWidget/ChatbotWidget';

/** 
 * INTRO_VIDEO_MOCKUP: Video de inicio editable. 
 * Cambiar URL por archivo local si se desea (ej: './assets/intro.mp4')
 */
const INTRO_VIDEO_URL = "https://assets.mixkit.co/videos/preview/mixkit-electronic-circuit-board-close-up-1577-large.mp4";

const App: React.FC = () => {
  const [stage, setStage] = useState<'intro' | 'home'>('intro');
  const [currentRoute, setCurrentRoute] = useState<string>('home');

  const handleIntroEnd = () => setStage('home');

  // Vista de introducción tipo "boot sequence"
  if (stage === 'intro') {
    return (
      <div className="fixed inset-0 bg-black z-[9999] flex items-center justify-center font-agency">
        <video 
          autoPlay 
          muted 
          onEnded={handleIntroEnd}
          className="w-full h-full object-cover opacity-60"
        >
          <source src={INTRO_VIDEO_URL} type="video/mp4" />
        </video>
        <div className="absolute flex flex-col items-center">
            <div className="text-4xl text-[#00f2ff] animate-pulse mb-4">INITIALIZING_RIG_SYSTEMS...</div>
            <button 
              onClick={handleIntroEnd}
              className="px-8 py-3 border border-[#00f2ff]/30 text-[#00f2ff] hover:bg-[#00f2ff]/10 backdrop-blur transition-all"
            >
              SKIP_INITIALIZATION >>
            </button>
        </div>
      </div>
    );
  }

  const renderContent = () => {
    switch (currentRoute) {
      case 'home': return <HomePage onNavigate={setCurrentRoute} />;
      case 'cdigital': return <SectionPage sectionId="cdigital" />;
      case 'notebook': return <SectionPage sectionId="notebook" />;
      case 'gemini': return <SectionPage sectionId="gemini" />;
      case 'perfil': return <ProfilePage />;
      default: return <HomePage onNavigate={setCurrentRoute} />;
    }
  };

  return (
    <div className="transition-opacity duration-1000 opacity-100">
      <AppShell currentRoute={currentRoute} onNavigate={setCurrentRoute}>
        {renderContent()}
      </AppShell>
      <ChatbotWidget />
    </div>
  );
};

export default App;
