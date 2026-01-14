
import React, { useState } from 'react';
import { SECTIONS_DATA, VideoItem } from '../../data/sections.config';
import VideoModal from '../../components/VideoModal/VideoModal';

interface SectionPageProps {
  sectionId: keyof typeof SECTIONS_DATA;
}

const SectionPage: React.FC<SectionPageProps> = ({ sectionId }) => {
  const data = SECTIONS_DATA[sectionId];
  const [activeIdx, setActiveIdx] = useState(0);
  const [selectedVideo, setSelectedVideo] = useState<VideoItem | null>(null);
  
  // Estado para el foro funcional
  const [messages, setMessages] = useState([
    { user: 'Kestrel', msg: 'The encryption on node NB-2 is softening.', time: '2m ago' },
    { user: 'Archer', msg: 'Confirmed. Redirecting compute power to Gemini core.', time: '14m ago' }
  ]);
  const [inputMsg, setInputMsg] = useState('');

  const rotate = (dir: number) => {
    setActiveIdx((prev) => (prev + dir + data.videos.length) % data.videos.length);
  };

  const handleSendMessage = () => {
    if (!inputMsg.trim()) return;
    setMessages([{ user: 'OPERATIVE_01', msg: inputMsg, time: 'Just now' }, ...messages]);
    setInputMsg('');
  };

  return (
    <div className="flex flex-col gap-12 pb-20 max-w-6xl mx-auto">
      
      {/* Header Centrado con Espacio */}
      <header className="text-center space-y-4 mb-8">
        <h1 className="text-6xl font-agency tracking-[0.2em]" style={{ color: data.accent, textShadow: `0 0 20px ${data.accent}44` }}>
          {data.title}_COMMAND
        </h1>
        <div className="w-32 h-1 bg-white/10 mx-auto rounded-full overflow-hidden">
            <div className="h-full bg-[var(--accent)] animate-[loading_3s_infinite]" style={{ '--accent': data.accent } as any}></div>
        </div>
        <p className="text-[#00f2ff]/40 text-xs tracking-widest uppercase">Operational Stream Active // Secure Tunnel 009</p>
      </header>

      {/* Carrusel con Video Previews */}
      <div className="relative h-[400px] flex items-center justify-center perspective-1000 select-none">
        {data.videos.map((video, idx) => {
          const offset = idx - activeIdx;
          const absOffset = Math.abs(offset);
          const isCenter = offset === 0;
          
          let opacity = 1 - absOffset * 0.5;
          let zIndex = 10 - absOffset;

          if (absOffset > 1) opacity = 0;

          return (
            <div
              key={video.id}
              onClick={() => isCenter && setSelectedVideo(video)}
              className={`absolute w-[450px] h-[260px] transition-all duration-700 rounded border border-white/10 overflow-hidden cursor-pointer group
                ${isCenter ? 'z-30 hover:scale-110 shadow-[0_0_40px_rgba(0,0,0,0.5)]' : 'z-10'}`}
              style={{
                transform: `translateX(${offset * 80}%) scale(${1 - absOffset * 0.2}) rotateY(${offset * -15}deg)`,
                opacity,
                zIndex,
                boxShadow: isCenter ? `0 0 30px ${data.accent}33` : 'none',
                borderColor: isCenter ? data.accent : 'rgba(255,255,255,0.1)'
              }}
            >
              {/* VIDEO PREVIEW VISIBLE */}
              <video 
                muted 
                loop 
                autoPlay 
                playsInline
                className="w-full h-full object-cover grayscale-[0.5] group-hover:grayscale-0 transition-all duration-500"
              >
                <source src={video.url} type="video/mp4" />
              </video>
              
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent flex flex-col justify-end p-4">
                <div className="font-agency text-white text-lg tracking-wider opacity-0 group-hover:opacity-100 transition-opacity translate-y-2 group-hover:translate-y-0 duration-300">
                  {video.title}
                </div>
              </div>

              {/* Hover Illumination Overlay */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-20 bg-[var(--accent)] transition-opacity" style={{'--accent': data.accent} as any}></div>
            </div>
          );
        })}

        <button onClick={() => rotate(-1)} className="absolute left-0 z-40 p-3 text-[#ff8a00] hover:scale-125 transition-transform">
          <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 19l-7-7 7-7" /></svg>
        </button>
        <button onClick={() => rotate(1)} className="absolute right-0 z-40 p-3 text-[#ff8a00] hover:scale-125 transition-transform">
          <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" /></svg>
        </button>
      </div>

      {/* Foro Funcional y Más Tecnología */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="p-6 bg-black/40 backdrop-blur rounded-lg border border-[#00f2ff]/10">
            <h2 className="text-2xl font-agency mb-6 text-[#00f2ff] flex items-center gap-3">
              <span className="w-2 h-2 bg-[#00f2ff] animate-ping rounded-full"></span>
              LIVE_INTEL_STREAM
            </h2>
            
            <div className="space-y-6 max-h-60 overflow-y-auto pr-4 scrollbar-tech">
              {messages.map((comment, i) => (
                <div key={i} className="flex gap-4 animate-in fade-in slide-in-from-left-2">
                  <div className="w-10 h-10 rounded bg-[#121A2F] border border-[#00f2ff]/20 flex items-center justify-center font-agency text-xs shrink-0">
                    {comment.user[0]}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-agency text-xs text-[#ff8a00]">{comment.user}</span>
                      <span className="text-[9px] text-white/20 uppercase">{comment.time}</span>
                    </div>
                    <p className="text-sm text-[#00f2ff]/70 bg-white/5 p-3 rounded border-l-2 border-[#00f2ff]/30">
                      {comment.msg}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 flex gap-3">
              <input 
                type="text" 
                value={inputMsg}
                onChange={(e) => setInputMsg(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder="TRANSMIT_SECURE_PACKET..." 
                className="flex-1 bg-black/60 border border-[#00f2ff]/20 rounded px-4 py-2 focus:border-[#00f2ff] outline-none text-sm text-[#00f2ff]"
              />
              <button 
                onClick={handleSendMessage}
                className="px-6 py-2 bg-[#ff8a00] text-black font-agency text-sm rounded hover:brightness-110 active:scale-95 transition-all shadow-[0_0_15px_rgba(255,138,0,0.3)]"
              >
                SEND_ENCRYPTED
              </button>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-[#121A2F]/80 p-6 rounded-lg border border-[#00f2ff]/20 relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-2 opacity-20"><svg className="w-12 h-12" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" /></svg></div>
            <h2 className="text-xl font-agency mb-4 text-white">RIG_DIAGNOSTICS</h2>
            <div className="space-y-4 text-[10px] font-agency text-[#00f2ff]/60">
                <div className="flex justify-between"><span>CPU_USAGE</span><span>44%</span></div>
                <div className="w-full h-1 bg-white/5 rounded-full"><div className="w-[44%] h-full bg-[#00f2ff]"></div></div>
                <div className="flex justify-between"><span>NEURAL_SYNC</span><span>98.2%</span></div>
                <div className="w-full h-1 bg-white/5 rounded-full"><div className="w-[98%] h-full bg-[#ff8a00]"></div></div>
            </div>
            <button className="w-full mt-6 py-2 border border-[#ff8a00]/40 text-[#ff8a00] font-agency text-xs hover:bg-[#ff8a00]/10 transition-all">
              RUN_CALIBRATION
            </button>
          </div>
        </div>
      </div>

      {selectedVideo && (
        <VideoModal 
          video={selectedVideo} 
          onClose={() => setSelectedVideo(null)} 
        />
      )}
      
      <style>{`
        @keyframes loading {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(300%); }
        }
      `}</style>
    </div>
  );
};

export default SectionPage;
