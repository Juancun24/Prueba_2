
import React, { useState, useEffect } from 'react';
import { VideoItem, TRANSITION_VIDEO_URL } from '../../data/sections.config';

interface VideoModalProps {
  video: VideoItem;
  onClose: () => void;
}

const VideoModal: React.FC<VideoModalProps> = ({ video, onClose }) => {
  const [state, setState] = useState<'transition' | 'playing'>('transition');

  useEffect(() => {
    if (state === 'transition') {
      const timer = setTimeout(() => {
        setState('playing');
      }, 5000); // 5 seconds mandatory transition
      return () => clearTimeout(timer);
    }
  }, [state]);

  return (
    <div className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-md flex items-center justify-center p-4">
      <div className="relative w-full max-w-5xl aspect-video bg-[#121A2F] rounded-2xl border border-white/20 overflow-hidden shadow-[0_0_100px_rgba(31,182,255,0.2)]">
        
        {state === 'transition' ? (
          <div className="w-full h-full relative">
            <video autoPlay muted className="w-full h-full object-cover">
              <source src={TRANSITION_VIDEO_URL} type="video/mp4" />
            </video>
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/40">
              <div className="text-4xl font-agency text-[#1FB6FF] animate-pulse">ESTABLISHING_SECURE_LINK...</div>
              <div className="mt-4 w-64 h-1 bg-white/20 rounded-full overflow-hidden">
                <div className="h-full bg-[#1FB6FF] animate-[loading_5s_linear_forwards]"></div>
              </div>
            </div>
          </div>
        ) : (
          <div className="w-full h-full relative group">
            <video autoPlay controls className="w-full h-full object-cover">
              <source src={video.url} type="video/mp4" />
            </video>
            
            {/* Custom Overlay Controls (Visual only as native controls are simpler for prototyping) */}
            <div className="absolute top-4 left-4 font-agency text-[#1FB6FF] bg-black/40 px-3 py-1 rounded">
              FILE: {video.title}
            </div>
          </div>
        )}

        <button 
          onClick={onClose}
          className="absolute top-4 right-4 z-50 p-2 rounded-full bg-black/60 hover:bg-red-500/80 text-white transition-all"
        >
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
        </button>
      </div>

      <style>{`
        @keyframes loading {
          0% { width: 0%; }
          100% { width: 100%; }
        }
      `}</style>
    </div>
  );
};

export default VideoModal;
