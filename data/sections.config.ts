
export interface VideoItem {
  id: string;
  title: string;
  url: string;
}

// EDIT HERE: TRANSITION_VIDEO_URL_5S
export const TRANSITION_VIDEO_URL = "https://www.pexels.com/es-es/video/proyeccion-digital-de-lineas-geometricas-abstractas-3129671/";

export const SECTIONS_DATA = {
  cdigital: {
    title: 'Cdigital',
    accent: '#2BFF88',
    // EDIT HERE: Cdigital videos[]
    videos: [
      { id: 'cd-1', title: 'Cyber Security Alpha', url: 'https://assets.mixkit.co/videos/preview/mixkit-data-center-server-room-with-blue-lights-2545-large.mp4' },
      { id: 'cd-2', title: 'Encrypted Flow', url: 'https://assets.mixkit.co/videos/preview/mixkit-abstract-technology-motion-background-with-lines-and-dots-43336-large.mp4' },
      { id: 'cd-3', title: 'Digital Fortress', url: 'https://assets.mixkit.co/videos/preview/mixkit-circuit-board-with-glowing-lines-443-large.mp4' },
    ]
  },
  notebook: {
    title: 'Notebook',
    accent: '#FF9F1C',
    // EDIT HERE: Notebook videos[]
    videos: [
      { id: 'nb-1', title: 'Data Archival', url: 'https://assets.mixkit.co/videos/preview/mixkit-abstract-animation-of-data-transmission-433-large.mp4' },
      { id: 'nb-2', title: 'Tactical Intel', url: 'https://assets.mixkit.co/videos/preview/mixkit-digital-numbers-and-data-on-a-blue-background-43407-large.mp4' },
      { id: 'nb-3', title: 'Neural Logs', url: 'https://assets.mixkit.co/videos/preview/mixkit-hands-typing-on-a-computer-keyboard-1250-large.mp4' },
    ]
  },
  gemini: {
    title: 'Gemini',
    accent: '#FF4D9D',
    // EDIT HERE: Gemini videos[]
    videos: [
      { id: 'gm-1', title: 'AI Synthesis', url: 'https://assets.mixkit.co/videos/preview/mixkit-digital-animation-of-a-human-head-formed-by-dots-43333-large.mp4' },
      { id: 'gm-2', title: 'Pattern Recognition', url: 'https://assets.mixkit.co/videos/preview/mixkit-particles-forming-a-brain-structure-43334-large.mp4' },
      { id: 'gm-3', title: 'Deep Logic', url: 'https://assets.mixkit.co/videos/preview/mixkit-abstract-background-with-glowing-dots-442-large.mp4' },
    ]
  }
};
