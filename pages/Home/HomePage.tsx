
import React from 'react';
import { SECTIONS_DATA } from '../../data/sections.config';

interface HomePageProps {
  onNavigate: (route: string) => void;
}

const HomePage: React.FC<HomePageProps> = ({ onNavigate }) => {
  const cards = [
    { id: 'cdigital', ...SECTIONS_DATA.cdigital },
    { id: 'notebook', ...SECTIONS_DATA.notebook },
    { id: 'gemini', ...SECTIONS_DATA.gemini },
  ];

  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] gap-20">
      
      {/* Header Centrado */}
      <header className="text-center space-y-6">
        <h1 className="text-7xl font-agency text-[#ff8a00] drop-shadow-[0_0_15px_rgba(255,138,0,0.5)] tracking-[0.3em]">
          SYSTEM_NODES
        </h1>
        <div className="w-48 h-[2px] bg-gradient-to-r from-transparent via-[#ff8a00] to-transparent mx-auto"></div>
        <p className="text-[#00f2ff]/60 max-w-xl mx-auto font-light leading-relaxed tracking-widest uppercase text-xs">
          Select operational module to link neural rig interface. 
          Authorized access required for encrypted sub-layers.
        </p>
      </header>

      {/* Cards con Hover Iluminado */}
      <div className="flex flex-wrap justify-center gap-10">
        {cards.map((card) => (
          <button
            key={card.id}
            onClick={() => onNavigate(card.id)}
            className="group relative w-60 h-80 transition-all duration-500 hover:-translate-y-2"
          >
            <div 
              className="absolute inset-0 bg-black/40 border border-[#00f2ff]/10 rounded-lg overflow-hidden transition-all duration-300 group-hover:border-[var(--accent)]"
              style={{ '--accent': card.accent } as any}
            >
              {/* Background pattern */}
              <div className="absolute inset-0 opacity-5 group-hover:opacity-10 transition-opacity">
                <div className="w-full h-full bg-[radial-gradient(circle,var(--accent)_1px,transparent_1px)] bg-[length:10px_10px]" style={{'--accent': card.accent} as any}></div>
              </div>

              <div className="relative h-full flex flex-col items-center justify-center p-6 text-center">
                <div 
                  className="mb-8 text-[var(--accent)] group-hover:scale-110 transition-transform duration-500"
                  style={{ '--accent': card.accent } as any}
                >
                   <svg className="w-16 h-16 drop-shadow-[0_0_10px_currentColor]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
                   </svg>
                </div>
                
                <h2 className="text-2xl font-agency text-white group-hover:text-[var(--accent)] transition-colors" style={{'--accent': card.accent} as any}>
                  {card.title}
                </h2>
                <div className="text-[10px] text-[#00f2ff]/40 mt-4 tracking-tighter">NODE_ID: 0x{card.id.toUpperCase()}</div>
              </div>

              {/* Hover Glow Layer */}
              <div 
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{ background: `radial-gradient(circle at center, ${card.accent}22 0%, transparent 70%)` }}
              ></div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default HomePage;
