
import React, { useState, useEffect } from 'react';
import { loadProfile, saveProfile } from '../../services/storage';
import { DEFAULT_PROFILE } from '../../data/profile.defaults';
import TagsManager from './TagsManager';

const ProfilePage: React.FC = () => {
  const [profile, setProfile] = useState(DEFAULT_PROFILE);
  const [isSaved, setIsSaved] = useState(false);
  const [photoPreview, setPhotoPreview] = useState(profile.photo);

  useEffect(() => {
    const data = loadProfile();
    if (data) {
      setProfile(data);
      setPhotoPreview(data.photo);
    }
  }, []);

  const handleSave = () => {
    saveProfile(profile);
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64 = reader.result as string;
        setPhotoPreview(base64);
        setProfile(prev => ({ ...prev, photo: base64 }));
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-10 space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <header className="flex items-center justify-between border-b border-white/10 pb-6">
        <h1 className="text-4xl font-agency text-[#9B6BFF]">OPERATIVE_DOSSIER</h1>
        <div className="flex gap-4">
          <button 
            onClick={() => {
              setProfile(DEFAULT_PROFILE);
              setPhotoPreview(DEFAULT_PROFILE.photo);
            }}
            className="px-4 py-2 border border-white/20 rounded font-agency hover:bg-white/5 transition-all"
          >
            RESET_DEFAULTS
          </button>
          <button 
            onClick={handleSave}
            className="px-6 py-2 bg-[#9B6BFF] text-white rounded font-agency shadow-[0_0_20px_rgba(155,107,255,0.4)] hover:scale-105 active:scale-95 transition-all"
          >
            {isSaved ? 'DOSSIER_UPDATED' : 'SAVE_CHANGES'}
          </button>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Photo and Identity */}
        <div className="space-y-6">
          <div className="relative group">
            <div className="w-full aspect-square rounded-2xl overflow-hidden border-2 border-[#9B6BFF] shadow-2xl relative">
              <img src={photoPreview} className="w-full h-full object-cover" alt="Profile" />
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity cursor-pointer">
                <label className="cursor-pointer text-xs font-agency tracking-widest">
                  UPLOAD_NEW_ID
                  <input type="file" className="hidden" onChange={handlePhotoChange} accept="image/*" />
                </label>
              </div>
            </div>
            <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-[#9B6BFF] rounded-full flex items-center justify-center text-black">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" /></svg>
            </div>
          </div>
          
          <div className="p-4 bg-[#121A2F]/40 backdrop-blur rounded-xl border border-white/5 space-y-4">
            <div>
              <label className="text-[10px] text-[#9AA4C7] font-agency uppercase">Full Name (Req)</label>
              <input 
                value={profile.name} 
                onChange={e => setProfile({...profile, name: e.target.value})}
                className="w-full bg-black/40 border border-white/10 rounded px-3 py-2 mt-1 outline-none focus:border-[#9B6BFF]"
              />
              {!profile.name && <p className="text-[9px] text-red-400 mt-1">Identification required.</p>}
            </div>
            <div>
              <label className="text-[10px] text-[#9AA4C7] font-agency uppercase">Alias</label>
              <input 
                value={profile.alias}
                onChange={e => setProfile({...profile, alias: e.target.value})}
                className="w-full bg-black/40 border border-white/10 rounded px-3 py-2 mt-1 outline-none focus:border-[#9B6BFF]"
              />
            </div>
          </div>
        </div>

        {/* Bio and Tags */}
        <div className="md:col-span-2 space-y-6">
          <div className="p-6 bg-[#121A2F]/40 backdrop-blur rounded-2xl border border-white/5">
            <label className="text-[10px] text-[#9AA4C7] font-agency uppercase mb-2 block">Operative Bio</label>
            <textarea 
              value={profile.bio}
              onChange={e => setProfile({...profile, bio: e.target.value})}
              rows={4}
              className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-[#9B6BFF] resize-none"
              placeholder="Operational background..."
            />
          </div>

          <TagsManager 
            activeTags={profile.activeTags} 
            archivedTags={profile.archivedTags}
            onChange={(active, archived) => setProfile({...profile, activeTags: active, archivedTags: archived})}
          />
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
