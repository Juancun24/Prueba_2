
import React, { useState } from 'react';

interface TagsManagerProps {
  activeTags: string[];
  archivedTags: string[];
  onChange: (active: string[], archived: string[]) => void;
}

const TagsManager: React.FC<TagsManagerProps> = ({ activeTags, archivedTags, onChange }) => {
  const [newTag, setNewTag] = useState('');

  const addTag = () => {
    if (newTag.trim()) {
      onChange([...activeTags, newTag.trim()], archivedTags);
      setNewTag('');
    }
  };

  const removeTag = (tag: string, list: 'active' | 'archived') => {
    if (list === 'active') {
      onChange(activeTags.filter(t => t !== tag), archivedTags);
    } else {
      onChange(activeTags, archivedTags.filter(t => t !== tag));
    }
  };

  const moveTag = (tag: string, from: 'active' | 'archived') => {
    if (from === 'active') {
      onChange(activeTags.filter(t => t !== tag), [...archivedTags, tag]);
    } else {
      onChange([...activeTags, tag], archivedTags.filter(t => t !== tag));
    }
  };

  // Simple native DND
  const handleDragStart = (e: React.DragEvent, tag: string, list: 'active' | 'archived') => {
    e.dataTransfer.setData('tag', tag);
    e.dataTransfer.setData('from', list);
  };

  const handleDrop = (e: React.DragEvent, to: 'active' | 'archived') => {
    const tag = e.dataTransfer.getData('tag');
    const from = e.dataTransfer.getData('from') as 'active' | 'archived';
    
    if (from !== to) {
      moveTag(tag, from);
    }
  };

  return (
    <div className="space-y-6">
      <div className="p-6 bg-[#121A2F]/40 backdrop-blur rounded-2xl border border-white/5">
        <div className="flex items-center justify-between mb-4">
          <label className="text-[10px] text-[#9AA4C7] font-agency uppercase">Skills & Specializations</label>
          <div className="flex gap-2">
            <input 
              value={newTag}
              onChange={e => setNewTag(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && addTag()}
              placeholder="Add skill..."
              className="bg-black/40 border border-white/10 rounded px-3 py-1 text-xs outline-none focus:border-[#9B6BFF]"
            />
            <button onClick={addTag} className="w-8 h-8 rounded-full bg-[#9B6BFF] text-black flex items-center justify-center">+</button>
          </div>
        </div>

        <div className="space-y-4">
          <div 
            onDragOver={e => e.preventDefault()}
            onDrop={e => handleDrop(e, 'active')}
            className="min-h-[80px] p-4 bg-black/20 rounded-xl border-2 border-dashed border-white/5"
          >
            <p className="text-[10px] text-[#9B6BFF] font-agency mb-2">ACTIVE_SPECIALTIES</p>
            <div className="flex flex-wrap gap-2">
              {activeTags.map(tag => (
                <div 
                  key={tag}
                  draggable
                  onDragStart={e => handleDragStart(e, tag, 'active')}
                  className="group flex items-center gap-2 bg-[#9B6BFF]/20 text-[#9B6BFF] border border-[#9B6BFF]/40 px-3 py-1 rounded-full text-xs cursor-move hover:bg-[#9B6BFF]/30 transition-all"
                >
                  <span>{tag}</span>
                  <button onClick={() => removeTag(tag, 'active')} className="hover:text-white">×</button>
                </div>
              ))}
              {activeTags.length === 0 && <span className="text-white/20 text-xs italic">Drop tags here...</span>}
            </div>
          </div>

          <div 
            onDragOver={e => e.preventDefault()}
            onDrop={e => handleDrop(e, 'archived')}
            className="min-h-[80px] p-4 bg-black/20 rounded-xl border-2 border-dashed border-white/5"
          >
            <p className="text-[10px] text-gray-500 font-agency mb-2">ARCHIVED_MODULES</p>
            <div className="flex flex-wrap gap-2">
              {archivedTags.map(tag => (
                <div 
                  key={tag}
                  draggable
                  onDragStart={e => handleDragStart(e, tag, 'archived')}
                  className="group flex items-center gap-2 bg-gray-500/10 text-gray-500 border border-gray-500/20 px-3 py-1 rounded-full text-xs cursor-move hover:bg-gray-500/20 transition-all"
                >
                  <span>{tag}</span>
                  <button onClick={() => removeTag(tag, 'archived')} className="hover:text-white">×</button>
                </div>
              ))}
              {archivedTags.length === 0 && <span className="text-white/20 text-xs italic">Drop tags here...</span>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TagsManager;
