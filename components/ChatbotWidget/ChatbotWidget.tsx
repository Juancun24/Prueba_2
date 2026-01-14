
import React, { useState } from 'react';

const ChatbotWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const socials = [
    { name: 'X', icon: '𝕏', link: 'https://x.com' },
    { name: 'IG', icon: '📸', link: 'https://instagram.com' },
    { name: 'DC', icon: '👾', link: 'https://discord.com' }
  ];

  return (
    <div className="fixed bottom-8 right-8 z-[200] flex flex-col items-center gap-4">
      
      {/* Social Bar (Horizontal o Vertical) */}
      <div className={`flex flex-col gap-3 transition-all duration-500 overflow-hidden ${isOpen ? 'h-48 opacity-100' : 'h-0 opacity-0'}`}>
        {socials.map((s, i) => (
          <a
            key={i}
            href={s.link}
            target="_blank"
            rel="noopener noreferrer"
            className="w-12 h-12 rounded bg-black/80 border border-[#ff8a00]/30 flex items-center justify-center text-xl hover:bg-[#ff8a00] hover:text-black transition-all shadow-[0_0_10px_rgba(255,138,0,0.2)]"
          >
            {s.icon}
          </a>
        ))}
      </div>

      {/* Main Toggle Button */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="relative w-16 h-16 group"
      >
        {/* Diegetic Frame */}
        <div className="absolute inset-0 rounded-lg border-2 border-[#00f2ff]/40 bg-black/40 backdrop-blur group-hover:rotate-45 transition-transform duration-500"></div>
        <div className="absolute inset-0 flex items-center justify-center">
            <div className={`w-8 h-8 transition-all duration-300 ${isOpen ? 'rotate-90' : 'rotate-0'}`}>
                <svg className="text-[#00f2ff] w-full h-full" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                </svg>
            </div>
        </div>
        
        {/* Active Pulse */}
        <div className="absolute -top-1 -right-1 w-3 h-3 bg-[#ff8a00] rounded-full animate-ping"></div>
        
        <div className="absolute -left-28 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 bg-black/90 text-[#00f2ff] font-agency text-[10px] px-2 py-1 border border-[#00f2ff]/30 pointer-events-none transition-opacity whitespace-nowrap">
          SYSTEM_ACCESS_TERMINAL
        </div>
      </button>
    </div>
  );
};

export default ChatbotWidget;
