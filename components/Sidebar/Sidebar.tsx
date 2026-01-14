
import React from 'react';
import { sidebarConfig } from './sidebar.config';
import { SECTION_COLORS } from '../../theme/tokens';

interface SidebarProps {
  currentRoute: string;
  onNavigate: (route: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ currentRoute, onNavigate }) => {
  return (
    <aside className="fixed left-6 top-1/2 -translate-y-1/2 z-50 flex flex-col items-center gap-4 p-3 rounded-xl bg-[#030508]/60 backdrop-blur-md border border-[#00f2ff]/20 shadow-[0_0_20px_rgba(0,242,255,0.1)]">
      
      {sidebarConfig.map((item) => {
        const isActive = currentRoute === item.id;
        const sectionColor = SECTION_COLORS[item.id] || '#00f2ff';

        return (
          <button
            key={item.id}
            onClick={() => onNavigate(item.id)}
            aria-label={item.label}
            style={{ 
              color: isActive ? sectionColor : 'rgba(0, 242, 255, 0.4)',
              borderColor: isActive ? sectionColor : 'transparent'
            }}
            className={`group relative p-3 rounded border transition-all duration-300 hover:bg-white/5`}
          >
            <div className="w-6 h-6">{item.icon}</div>
            
            {/* Tooltip con look HUD */}
            <span className="absolute left-16 opacity-0 group-hover:opacity-100 pointer-events-none px-3 py-1 bg-black border border-[#00f2ff]/20 font-agency text-xs whitespace-nowrap translate-x-2 group-hover:translate-x-0 transition-all">
              {item.label}
            </span>

            {/* Indicator Dot */}
            {isActive && (
              <div 
                className="absolute right-[-8px] top-1/2 -translate-y-1/2 w-1 h-4 rounded-full"
                style={{ backgroundColor: sectionColor, boxShadow: `0 0 10px ${sectionColor}` }}
              ></div>
            )}
          </button>
        );
      })}
    </aside>
  );
};

export default Sidebar;
