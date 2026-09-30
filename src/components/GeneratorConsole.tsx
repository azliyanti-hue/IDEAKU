import React, { useState } from 'react';
import { PitchDeck } from '../types/deck';

interface GeneratorConsoleProps {
  activeDeck: PitchDeck;
  isOpen: boolean;
  onToggleOpen: () => void;
  onGenerate: (brief: string, channel: string, program: string) => Promise<void>;
  onLoadSample: (sampleKey: 'fn' | 'milo' | 'petronas' | 'tv9') => void;
  onClear: () => void;
  isGenerating: boolean;
  aiProgress: { step: string; percent: number } | null;
}

export const GeneratorConsole: React.FC<GeneratorConsoleProps> = ({
  activeDeck,
  isOpen,
  onToggleOpen,
  onGenerate,
  onLoadSample,
  onClear,
  isGenerating,
  aiProgress,
}) => {
  const [briefInput, setBriefInput] = useState(activeDeck.briefNotes);
  const [channel, setChannel] = useState(activeDeck.channel || 'TV3');
  const [selectedSlotOption, setSelectedSlotOption] = useState<string>(() => {
    // If the active deck slot is custom or matches one of known values
    return activeDeck.slot || 'WHI';
  });
  const [customNewProgram, setCustomNewProgram] = useState('');
  const [validationError, setValidationError] = useState(false);

  // Sync when activeDeck changes
  React.useEffect(() => {
    setBriefInput(activeDeck.briefNotes);
    setChannel(activeDeck.channel || 'TV3');
    
    // Check if activeDeck.slot is in standard list, otherwise set to NEW_PROGRAM
    const standardKeys = [
      'WHI', 'MHI', 'BU', 'Melodi', 'Nona',
      'NLKO', 'BeritaTV9', 'KeluargaKita', 'DramaSantaiTV9', 'KapsulFamili'
    ];
    if (standardKeys.includes(activeDeck.slot)) {
      setSelectedSlotOption(activeDeck.slot);
    } else if (activeDeck.slot) {
      setSelectedSlotOption('NEW_PROGRAM');
      setCustomNewProgram(activeDeck.slot);
    } else {
      setSelectedSlotOption('WHI');
    }
  }, [activeDeck]);

  // When channel changes, smart default the slot if appropriate
  const handleChannelChange = (newChannel: string) => {
    setChannel(newChannel);
    if (newChannel === 'TV9' && !selectedSlotOption.startsWith('NLKO') && !selectedSlotOption.startsWith('BeritaTV9') && selectedSlotOption !== 'NEW_PROGRAM') {
      setSelectedSlotOption('NLKO');
    } else if (newChannel === 'TV3' && (selectedSlotOption.startsWith('NLKO') || selectedSlotOption.startsWith('BeritaTV9'))) {
      setSelectedSlotOption('WHI');
    }
  };

  const getEffectiveProgramName = () => {
    if (selectedSlotOption === 'NEW_PROGRAM') {
      return customNewProgram.trim() || 'New Program';
    }
    const slotNames: Record<string, string> = {
      WHI: 'Wanita Hari Ini (WHI)',
      MHI: 'Malaysia Hari Ini (MHI)',
      BU: 'Buletin Utama (BU)',
      Melodi: 'Melodi',
      Nona: 'Nona',
      NLKO: 'Nasi Lemak Kopi O (TV9)',
      BeritaTV9: 'Berita TV9',
      KeluargaKita: 'Keluarga Kita (TV9)',
      DramaSantaiTV9: 'Drama Santai TV9',
      KapsulFamili: 'Kapsul Famili (TV9)',
    };
    return slotNames[selectedSlotOption] || selectedSlotOption;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!briefInput.trim()) {
      setValidationError(true);
      return;
    }
    setValidationError(false);
    const effectiveProgram = getEffectiveProgramName();
    onGenerate(briefInput, channel, effectiveProgram);
  };

  const handleSampleClick = (key: 'fn' | 'milo' | 'petronas' | 'tv9') => {
    setValidationError(false);
    onLoadSample(key);
  };

  const handleClearClick = () => {
    setBriefInput('');
    setCustomNewProgram('');
    setValidationError(false);
    onClear();
  };

  return (
    <section className="w-full mb-5">
      <div className="w-full bg-surface-container-lowest rounded-xl shadow-sm border border-[#C5C6CD]/25 overflow-hidden transition-all duration-300">
        {/* Drawer Header Bar */}
        <div className="px-6 py-2.5 bg-surface-container-low flex flex-wrap items-center justify-between gap-3 border-b border-[#C5C6CD]/20">
          <div className="flex items-center gap-3">
            <div className="w-7 h-7 rounded bg-secondary flex items-center justify-center text-white shadow-sm">
              <span className="material-symbols-outlined text-[16px]">smart_toy</span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-bold text-on-surface">Generator Input Console</span>
                <span className="px-2 py-0.5 rounded-full bg-surface-container-highest text-on-surface-variant text-[10px] font-bold uppercase tracking-wider">
                  PRD v3.1 Engine
                </span>
              </div>
              <p className="text-xs text-on-surface-variant font-normal">
                Inject client brief, select linear TV property &amp; flagship slot, and synthesize pitch-ready 16:9 slides.
              </p>
            </div>
          </div>

          {/* Quick Sample Presets & Drawer Toggle */}
          <div className="flex items-center gap-1.5 flex-wrap">
            <button
              type="button"
              onClick={() => handleSampleClick('fn')}
              className="h-8 px-2.5 bg-surface-container hover:bg-surface-container-high text-on-surface text-xs font-semibold rounded border border-[#C5C6CD]/25 transition-colors flex items-center gap-1 active:scale-95"
            >
              <span className="material-symbols-outlined text-[14px] text-secondary">local_drink</span>
              <span>F&amp;N Susu (WHI)</span>
            </button>

            <button
              type="button"
              onClick={() => handleSampleClick('tv9')}
              className="h-8 px-2.5 bg-secondary-fixed text-on-secondary-fixed hover:bg-secondary/20 text-xs font-bold rounded border border-secondary/30 transition-colors flex items-center gap-1 active:scale-95 shadow-xs"
            >
              <span className="material-symbols-outlined text-[14px] text-secondary">family_restroom</span>
              <span>TV9 Famili Sample</span>
            </button>

            <button
              type="button"
              onClick={() => handleSampleClick('milo')}
              className="h-8 px-2.5 bg-surface-container hover:bg-surface-container-high text-on-surface text-xs font-semibold rounded border border-[#C5C6CD]/25 transition-colors flex items-center gap-1 active:scale-95"
            >
              <span className="material-symbols-outlined text-[14px] text-amber-600">sports_soccer</span>
              <span>Milo (MHI)</span>
            </button>

            <button
              type="button"
              onClick={() => handleSampleClick('petronas')}
              className="h-8 px-2.5 bg-surface-container hover:bg-surface-container-high text-on-surface text-xs font-semibold rounded border border-[#C5C6CD]/25 transition-colors flex items-center gap-1 active:scale-95"
            >
              <span className="material-symbols-outlined text-[14px] text-teal-600">local_gas_station</span>
              <span>Petronas (BU)</span>
            </button>

            <button
              type="button"
              onClick={handleClearClick}
              className="h-8 px-2.5 bg-surface-container-lowest hover:bg-surface-container text-on-surface-variant text-xs font-medium rounded border border-[#C5C6CD]/25 transition-colors"
            >
              Clear
            </button>

            <button
              type="button"
              onClick={onToggleOpen}
              className="h-8 w-8 flex items-center justify-center rounded bg-surface-container text-on-surface hover:bg-surface-container-high border border-[#C5C6CD]/25 transition-colors"
              title={isOpen ? 'Collapse Console Drawer' : 'Expand Console Drawer'}
            >
              <span className="material-symbols-outlined text-[18px]">
                {isOpen ? 'expand_less' : 'expand_more'}
              </span>
            </button>
          </div>
        </div>

        {/* Drawer Body Content */}
        {isOpen && (
          <form onSubmit={handleSubmit} className="p-5 transition-all duration-300">
            {/* Validation Alert */}
            {validationError && (
              <div className="mb-3.5 p-2.5 rounded-lg bg-error-container text-on-error-container flex items-center justify-between border border-red-300">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[18px]">error</span>
                  <span className="text-xs font-bold">
                    Please provide unstructured campaign notes or select a sample brief before synthesizing slides.
                  </span>
                </div>
                <button
                  type="button"
                  className="hover:opacity-70"
                  onClick={() => setValidationError(false)}
                >
                  <span className="material-symbols-outlined text-[16px]">close</span>
                </button>
              </div>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
              {/* Textarea Brief */}
              <div className="lg:col-span-7 flex flex-col gap-1.5">
                <label className="text-xs font-bold text-on-surface flex items-center justify-between">
                  <span>Unstructured Client Notes &amp; Commercial Brief</span>
                  <span className="text-[11px] text-on-surface-variant font-medium">Auto-parser ready</span>
                </label>
                <textarea
                  value={briefInput}
                  onChange={(e) => {
                    setBriefInput(e.target.value);
                    if (validationError) setValidationError(false);
                  }}
                  className="w-full p-3 bg-surface-container-low text-on-surface text-xs font-normal rounded-lg resize-none focus:outline-none focus:bg-surface-container-lowest focus:ring-1 focus:ring-secondary border border-[#C5C6CD]/30 shadow-inner"
                  placeholder="Paste client brief, brand guidelines, target audience, budget indications, or unstructured sales notes..."
                  rows={5}
                />
              </div>

              {/* Simplified Channel & Flagship Slot Tuning Controls */}
              <div className="lg:col-span-5 flex flex-col justify-between gap-3">
                <div className="flex flex-col gap-2.5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {/* Primary Channel */}
                    <div className="flex flex-col gap-1">
                      <label className="text-[10px] font-bold text-on-surface-variant uppercase tracking-wider">
                        Primary Channel
                      </label>
                      <div className="relative">
                        <select
                          value={channel}
                          onChange={(e) => handleChannelChange(e.target.value)}
                          className="w-full h-9 pl-2.5 pr-6 bg-surface-container-low text-on-surface text-xs font-semibold rounded border border-[#C5C6CD]/30 focus:outline-none focus:ring-1 focus:ring-secondary appearance-none cursor-pointer"
                        >
                          <option value="TV3">TV3 (Flagship Broadcast)</option>
                          <option value="TV9">TV9 (Youth &amp; Family)</option>
                          <option value="8TV">8TV (Chinese Urban Anchor)</option>
                          <option value="Omnia-360">Omnia 360° Multi-network</option>
                        </select>
                        <span className="material-symbols-outlined text-[16px] text-on-surface-variant absolute right-2 top-2.5 pointer-events-none">
                          expand_more
                        </span>
                      </div>
                    </div>

                    {/* Flagship Slot (with TV9 & New Program) */}
                    <div className="flex flex-col gap-1">
                      <div className="flex items-center justify-between">
                        <label className="text-[10px] font-bold text-on-surface-variant uppercase tracking-wider">
                          Flagship Slot
                        </label>
                        {selectedSlotOption === 'NEW_PROGRAM' && (
                          <span className="text-[10px] text-secondary font-bold">Custom Show</span>
                        )}
                      </div>
                      <div className="relative">
                        <select
                          value={selectedSlotOption}
                          onChange={(e) => setSelectedSlotOption(e.target.value)}
                          className="w-full h-9 pl-2.5 pr-6 bg-surface-container-low text-on-surface text-xs font-semibold rounded border border-[#C5C6CD]/30 focus:outline-none focus:ring-1 focus:ring-secondary appearance-none cursor-pointer"
                        >
                          {/* TV9 Flagship Slots */}
                          <optgroup label="TV9 Flagship Programs">
                            <option value="NLKO">Nasi Lemak Kopi O (TV9) - 8:30 AM</option>
                            <option value="BeritaTV9">Berita TV9 - 7:00 PM</option>
                            <option value="KeluargaKita">Keluarga Kita (TV9) - 6:00 PM</option>
                            <option value="DramaSantaiTV9">Drama Santai TV9 - 8:30 PM</option>
                            <option value="KapsulFamili">Kapsul Famili (TV9) - 1:00 PM</option>
                          </optgroup>

                          {/* TV3 Flagship Slots */}
                          <optgroup label="TV3 Flagship Programs">
                            <option value="WHI">Wanita Hari Ini (WHI) - 12:00 PM</option>
                            <option value="MHI">Malaysia Hari Ini (MHI) - 7:00 AM</option>
                            <option value="BU">Buletin Utama (BU) - 8:00 PM</option>
                            <option value="Melodi">Melodi - Sunday 12:30 PM</option>
                            <option value="Nona">Nona - Sunday 2:00 PM</option>
                          </optgroup>

                          {/* Custom New Program */}
                          <optgroup label="Custom / Pilot Slot">
                            <option value="NEW_PROGRAM">+ New Program (Custom)...</option>
                          </optgroup>
                        </select>
                        <span className="material-symbols-outlined text-[16px] text-on-surface-variant absolute right-2 top-2.5 pointer-events-none">
                          expand_more
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* New Program Input field when '+ New Program (Custom)...' is selected */}
                  {selectedSlotOption === 'NEW_PROGRAM' && (
                    <div className="p-2.5 rounded-lg bg-surface-container-low border border-secondary/40 flex flex-col gap-1 animate-fadeIn">
                      <label className="text-[10px] font-bold text-secondary uppercase flex items-center gap-1">
                        <span className="material-symbols-outlined text-[14px]">add_circle</span>
                        <span>Enter New Program Title &amp; Airtime</span>
                      </label>
                      <input
                        type="text"
                        value={customNewProgram}
                        onChange={(e) => setCustomNewProgram(e.target.value)}
                        placeholder="e.g. Dapur Ramadan TV9, Borak Santai, etc."
                        className="w-full h-8 px-2.5 bg-surface-container-lowest text-on-surface text-xs font-semibold rounded border border-[#C5C6CD]/30 focus:outline-none focus:ring-1 focus:ring-secondary"
                        autoFocus
                      />
                    </div>
                  )}
                </div>

                {/* Action Button */}
                <div className="flex items-center gap-2 pt-1">
                  <button
                    type="submit"
                    disabled={isGenerating}
                    className="flex-1 h-10 px-4 bg-secondary hover:bg-secondary-container text-white text-xs font-bold rounded shadow-md transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:pointer-events-none active:scale-[0.98]"
                  >
                    <span className="material-symbols-outlined text-[18px]">auto_awesome</span>
                    <span>Generate 7-Slide Deck</span>
                    <span className="px-1.5 py-0.5 rounded bg-primary-container text-tertiary-fixed text-[10px] font-mono">
                      &lt; 2s AI Engine
                    </span>
                  </button>
                </div>
              </div>
            </div>

            {/* AI Synthesis Progress Bar */}
            {isGenerating && aiProgress && (
              <div className="mt-4 p-3.5 rounded-lg bg-primary-container text-white border border-[#C5C6CD]/20 shadow-md animate-fadeIn">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full bg-secondary animate-ping"></div>
                    <span className="text-xs font-bold text-surface">{aiProgress.step}</span>
                  </div>
                  <span className="text-xs text-tertiary-fixed font-mono font-bold">
                    {aiProgress.percent}%
                  </span>
                </div>
                <div className="w-full h-2 rounded-full bg-white/20 overflow-hidden">
                  <div
                    className="h-full bg-secondary transition-all duration-300 rounded-full"
                    style={{ width: `${aiProgress.percent}%` }}
                  ></div>
                </div>
              </div>
            )}
          </form>
        )}
      </div>
    </section>
  );
};
