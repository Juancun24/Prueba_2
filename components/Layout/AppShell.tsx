
import React from 'react';
import Sidebar from '../Sidebar/Sidebar';

interface AppShellProps {
  children: React.ReactNode;
  currentRoute: string;
  onNavigate: (route: string) => void;
}

const AppShell: React.FC<AppShellProps> = ({ children, currentRoute, onNavigate }) => {
  return (
    <div className="flex min-h-screen bg-[#030508] overflow-hidden text-[#00f2ff]">
      
      {/* HUD LOGO - Editable PNG */}
      <div className="fixed top-6 left-6 z-[60] flex items-center gap-4">
        <div className="w-12 h-12 bg-[#ff8a00] p-1 clip-path-polygon">
          {/* Reemplazar src con el path de tu logo real */}
          <img 
            src="https://github.com/Juancun24/Cun24/blob/816b6cc022c7465e60af49e6ef81ecf283686ad7/cunicono.png" 
            alt="Agency Logo" 
            className="w-full h-full object-contain brightness-0 invert" 
          />
        </div>
        <div className="hidden md:block">
          <div className="font-agency text-xl tracking-[0.2em] text-[#ff8a00] leading-none">CORE_ENGINE</div>
          <div className="font-agency text-[10px] text-[#00f2ff]/50">STRATEGIC_COMMAND_NODE</div>
        </div>
      </div>

      <Sidebar currentRoute={currentRoute} onNavigate={onNavigate} />
      
      <main className="flex-1 relative z-10 p-8 pt-24 ml-24 md:ml-32 transition-all overflow-y-auto max-h-screen">
        {/* Decorative corner elements */}
        <div className="fixed top-0 right-0 w-32 h-32 border-t border-r border-[#00f2ff]/10 pointer-events-none"></div>
        <div className="fixed bottom-0 left-0 w-32 h-32 border-b border-l border-[#00f2ff]/10 pointer-events-none ml-24 md:ml-32"></div>
        
        {children}
      </main>
    </div>
  );
};

export default AppShell;
