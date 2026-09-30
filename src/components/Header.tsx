import React from 'react';
import { PitchDeck, WorkspaceView } from '../types/deck';

interface HeaderProps {
  currentView: WorkspaceView;
  onSelectView: (view: WorkspaceView) => void;
  decks: PitchDeck[];
  activeDeck: PitchDeck;
  onSelectDeck: (deckId: string) => void;
  onNewDeck: () => void;
  onRunAIGenerator: () => void;
  showLayoutGuides: boolean;
  onToggleLayoutGuides: () => void;
  onStartPresentation: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentView,
  onSelectView,
  decks,
  activeDeck,
  onSelectDeck,
  onNewDeck,
  onRunAIGenerator,
  showLayoutGuides,
  onToggleLayoutGuides,
  onStartPresentation,
}) => {
  return (
    <header className="fixed top-0 left-64 right-0 h-28 bg-surface-container-lowest/90 backdrop-blur-xl border-b border-[#C5C6CD]/25 shadow-[0_1px_8px_rgba(0,0,0,0.04)] z-40 select-none">
      {/* Top Header Row */}
      <div className="h-16 px-6 flex items-center justify-between border-b border-[#C5C6CD]/15">
        {/* Left Breadcrumb & Save Badges */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 text-xs text-on-surface-variant font-medium">
            <span className="font-semibold text-on-surface">Media Prima Omnia</span>
            <span className="material-symbols-outlined text-[14px]">chevron_right</span>
            <span className="px-2 py-0.5 rounded bg-surface-container text-on-surface font-semibold text-xs border border-[#C5C6CD]/25 truncate max-w-[280px]">
              {activeDeck.campaignName}
            </span>
          </div>

          <div className="hidden xl:flex items-center gap-2">
            <span className="px-2 py-0.5 rounded bg-surface-container-low text-on-surface text-[11px] font-medium flex items-center gap-1 border border-[#C5C6CD]/20">
              <span className="material-symbols-outlined text-[13px] text-secondary">cloud_done</span>
              Saved to LocalStorage
            </span>
            <span className="px-2 py-0.5 rounded bg-primary-fixed text-on-primary-fixed text-[11px] font-bold">
              7 Slides Ready
            </span>
          </div>
        </div>

        {/* Right Nav Tabs, Auto-Save, and Profile */}
        <div className="flex items-center gap-4">
          <nav className="hidden lg:flex items-center p-1 rounded-lg bg-surface-container gap-1 border border-[#C5C6CD]/20">
            <button
              onClick={() => onSelectView('deck-library')}
              className={`px-3 py-1 rounded text-xs font-semibold transition-colors ${
                currentView === 'deck-library'
                  ? 'bg-primary text-white shadow-sm'
                  : 'text-on-surface-variant hover:text-on-surface'
              }`}
            >
              Dashboard
            </button>
            <button
              onClick={() => onSelectView('input-generator')}
              className={`px-3 py-1 rounded text-xs font-semibold transition-colors ${
                currentView === 'input-generator'
                  ? 'bg-primary text-white shadow-sm'
                  : 'text-on-surface-variant hover:text-on-surface'
              }`}
            >
              Input Generator Console
            </button>
            <button
              onClick={() => onSelectView('slide-studio')}
              className={`px-3 py-1 rounded text-xs font-semibold transition-colors ${
                currentView === 'slide-studio'
                  ? 'bg-primary text-white shadow-sm'
                  : 'text-on-surface-variant hover:text-on-surface'
              }`}
            >
              Slide Studio
            </button>
          </nav>

          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-surface-container-low border border-[#C5C6CD]/20">
            <div className="w-2 h-2 rounded-full bg-secondary animate-ping"></div>
            <span className="text-[11px] font-bold text-on-surface">Auto-Save Active</span>
          </div>

          <div className="flex items-center gap-2 pl-1 border-l border-[#C5C6CD]/30">
            <div className="flex flex-col text-right hidden sm:flex">
              <span className="text-xs font-bold text-on-surface leading-tight">Farhan K.</span>
              <span className="text-[10px] text-on-surface-variant leading-tight">Senior Media Strategist</span>
            </div>
            <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white text-xs font-bold shadow-sm">
              <span className="material-symbols-outlined text-[18px]">person</span>
            </div>
          </div>
        </div>
      </div>

      {/* Subheader Toolbar Row */}
      <div className="h-12 px-6 flex items-center justify-between bg-surface-container-low/60">
        <div className="flex items-center gap-2">
          {/* New Pitch Deck */}
          <button
            onClick={onNewDeck}
            className="h-8 px-3 bg-secondary hover:bg-secondary-container text-white rounded text-xs font-bold flex items-center gap-1 shadow-sm transition-all active:scale-95"
          >
            <span className="material-symbols-outlined text-[16px]">add</span>
            <span>New Pitch Deck</span>
          </button>

          {/* Run AI Generator */}
          <button
            onClick={onRunAIGenerator}
            className="h-8 px-3 bg-primary-container text-white hover:bg-black rounded text-xs font-bold flex items-center gap-1.5 transition-all shadow-sm active:scale-95"
          >
            <span className="material-symbols-outlined text-[16px] text-tertiary-fixed">auto_awesome</span>
            <span>Run AI Generator</span>
          </button>

          {/* Pitch Deck Selector Dropdown */}
          <div className="relative flex items-center">
            <select
              value={activeDeck.id}
              onChange={(e) => onSelectDeck(e.target.value)}
              className="h-8 pl-3 pr-8 bg-surface-container-lowest text-on-surface text-xs font-semibold rounded border border-[#C5C6CD]/30 appearance-none cursor-pointer focus:outline-none focus:ring-1 focus:ring-secondary max-w-[280px] truncate"
            >
              {decks.map((deck) => (
                <option key={deck.id} value={deck.id}>
                  {deck.campaignName}
                </option>
              ))}
            </select>
            <span className="material-symbols-outlined text-[16px] text-on-surface-variant absolute right-2 pointer-events-none">
              unfold_more
            </span>
          </div>
        </div>

        {/* Layout Guides & Presentation Mode */}
        <div className="flex items-center gap-1.5">
          <button
            onClick={onToggleLayoutGuides}
            className={`h-8 px-3 rounded text-xs font-semibold flex items-center gap-1.5 transition-colors border ${
              showLayoutGuides
                ? 'bg-secondary text-white border-secondary'
                : 'bg-surface-container-lowest hover:bg-surface-container text-on-surface border-[#C5C6CD]/30'
            }`}
            title="Toggle TV3 Broadcast Safe Zone and 16:9 Alignment Grid"
          >
            <span className="material-symbols-outlined text-[16px]">tune</span>
            <span>Layout Guides</span>
          </button>

          <button
            onClick={onStartPresentation}
            className="h-8 px-3 bg-surface-container-lowest hover:bg-surface-container text-on-surface rounded text-xs font-bold flex items-center gap-1.5 transition-colors border border-[#C5C6CD]/30 shadow-sm"
            title="Enter Fullscreen 16:9 Presentation Mode"
          >
            <span className="material-symbols-outlined text-[16px] text-secondary">present_to_all</span>
            <span>Presentation Mode</span>
          </button>
        </div>
      </div>
    </header>
  );
};
