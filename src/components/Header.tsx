import React, { useState } from 'react';
import { PitchDeck, WorkspaceView } from '../types/deck';
import { User } from 'firebase/auth';

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
  currentUser: User | null;
  onOpenLogin: () => void;
  onLogout: () => void;
  isFirestoreConnected: boolean;
  onPrintDeck?: () => void;
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
  currentUser,
  onOpenLogin,
  onLogout,
  isFirestoreConnected,
  onPrintDeck,
}) => {
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  return (
    <header className="fixed top-0 left-64 right-0 h-28 bg-surface-container-lowest/95 backdrop-blur-xl border-b border-[#C5C6CD]/25 shadow-[0_2px_12px_rgba(14,28,47,0.04)] z-40 select-none">
      {/* Top Header Row */}
      <div className="h-16 px-6 flex items-center justify-between border-b border-[#C5C6CD]/15">
        {/* Left Breadcrumb & Save Badges */}
        <div className="flex items-center gap-3 min-w-0">
          <div className="flex items-center gap-1.5 text-xs text-on-surface-variant font-medium min-w-0">
            <span className="font-bold text-on-surface whitespace-nowrap">Media Prima Omnia</span>
            <span className="material-symbols-outlined text-[14px] text-on-surface-variant">chevron_right</span>
            <span className="px-2.5 py-0.5 rounded-md bg-surface-container text-on-surface font-bold text-xs border border-[#C5C6CD]/25 truncate max-w-[260px] shadow-2xs">
              {activeDeck.campaignName}
            </span>
          </div>

          <div className="hidden xl:flex items-center gap-2">
            {currentUser && isFirestoreConnected ? (
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 text-[11px] font-bold flex items-center gap-1 border border-emerald-200 shadow-2xs">
                <span className="material-symbols-outlined text-[13px] text-emerald-600">cloud_done</span>
                Firestore Synced
              </span>
            ) : (
              <span className="px-2.5 py-0.5 rounded-full bg-surface-container-low text-on-surface text-[11px] font-medium flex items-center gap-1 border border-[#C5C6CD]/20 shadow-2xs">
                <span className="material-symbols-outlined text-[13px] text-secondary">cloud_done</span>
                Saved to LocalStorage
              </span>
            )}
            <span className="px-2.5 py-0.5 rounded-full bg-primary-fixed text-on-primary-fixed text-[11px] font-bold">
              7 Slides Ready
            </span>
          </div>
        </div>

        {/* Right Nav Tabs, Auto-Save, and Profile */}
        <div className="flex items-center gap-3.5">
          <nav className="hidden lg:flex items-center p-1 rounded-xl bg-surface-container gap-1 border border-[#C5C6CD]/20 shadow-inner">
            <button
              onClick={() => onSelectView('deck-library')}
              className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                currentView === 'deck-library'
                  ? 'bg-primary text-white shadow-xs'
                  : 'text-on-surface-variant hover:text-on-surface'
              }`}
            >
              Dashboard
            </button>
            <button
              onClick={() => onSelectView('input-generator')}
              className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                currentView === 'input-generator'
                  ? 'bg-primary text-white shadow-xs'
                  : 'text-on-surface-variant hover:text-on-surface'
              }`}
            >
              Input Generator Console
            </button>
            <button
              onClick={() => onSelectView('slide-studio')}
              className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                currentView === 'slide-studio'
                  ? 'bg-primary text-white shadow-xs'
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

          {/* Profile & Login / Logout Action Area */}
          <div className="relative flex items-center gap-2 pl-2 border-l border-[#C5C6CD]/30">
            {currentUser ? (
              <div className="flex items-center gap-2">
                <div
                  onClick={() => setShowProfileMenu(!showProfileMenu)}
                  className="flex items-center gap-2 cursor-pointer p-1 rounded-xl hover:bg-surface-container transition-all"
                  title="Klik untuk lihat profil dan pilihan log keluar"
                >
                  <div className="flex flex-col text-right hidden sm:flex">
                    <span className="text-xs font-bold text-on-surface leading-tight truncate max-w-[120px]">
                      {currentUser.displayName || 'Media Strategist'}
                    </span>
                    <span className="text-[10px] text-emerald-700 font-semibold leading-tight truncate max-w-[120px]">
                      Aktif &bull; Firestore
                    </span>
                  </div>
                  {currentUser.photoURL ? (
                    <img
                      src={currentUser.photoURL}
                      alt={currentUser.displayName || 'User'}
                      className="w-8 h-8 rounded-full border-2 border-secondary shadow-xs object-cover"
                      referrerPolicy="no-referrer"
                    />
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-bold text-xs shadow-xs">
                      {(currentUser.displayName || currentUser.email || 'U')[0].toUpperCase()}
                    </div>
                  )}
                  <span className="material-symbols-outlined text-[16px] text-on-surface-variant">
                    {showProfileMenu ? 'expand_less' : 'expand_more'}
                  </span>
                </div>

                {/* Direct Log Keluar Button */}
                <button
                  onClick={onLogout}
                  className="h-8 px-2.5 rounded-lg bg-surface-container hover:bg-red-50 hover:text-red-600 text-on-surface text-xs font-bold border border-[#C5C6CD]/30 flex items-center gap-1 transition-colors"
                  title="Log Keluar"
                >
                  <span className="material-symbols-outlined text-[15px]">logout</span>
                  <span className="hidden md:inline">Log Keluar</span>
                </button>
              </div>
            ) : (
              <button
                onClick={onOpenLogin}
                className="h-8 px-3 rounded-xl bg-secondary hover:bg-secondary-container text-white text-xs font-bold shadow-xs flex items-center gap-1.5 transition-all active:scale-95"
              >
                <span className="material-symbols-outlined text-[16px]">login</span>
                <span>Log Masuk</span>
              </button>
            )}

            {/* Profile Dropdown Menu */}
            {showProfileMenu && currentUser && (
              <div className="absolute right-0 top-12 w-60 p-2.5 rounded-2xl bg-surface-container-lowest border border-[#C5C6CD]/30 shadow-2xl z-50 flex flex-col gap-1.5 animate-fadeIn">
                <div className="p-2.5 rounded-xl bg-surface-container-low border border-[#C5C6CD]/20">
                  <div className="text-xs font-bold text-on-surface truncate">
                    {currentUser.displayName || 'Media Strategist'}
                  </div>
                  <div className="text-[11px] text-on-surface-variant truncate">
                    {currentUser.email}
                  </div>
                  <div className="mt-2 text-[10px] text-emerald-800 font-bold bg-emerald-50 px-2 py-0.5 rounded-full inline-flex items-center gap-1 border border-emerald-200">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-600"></span>
                    <span>Cloud Firestore Connected</span>
                  </div>
                </div>

                <button
                  onClick={() => {
                    setShowProfileMenu(false);
                    onLogout();
                  }}
                  className="w-full px-3 py-2 rounded-xl text-left text-xs font-bold text-red-600 hover:bg-red-50 flex items-center gap-2 transition-colors"
                >
                  <span className="material-symbols-outlined text-[16px]">logout</span>
                  <span>Log Keluar daripada Akaun</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Subheader Toolbar Row */}
      <div className="h-12 px-6 flex items-center justify-between bg-surface-container-low/70">
        <div className="flex items-center gap-2">
          {/* New Pitch Deck */}
          <button
            onClick={onNewDeck}
            className="h-8 px-3 bg-secondary hover:bg-secondary-container text-white rounded-lg text-xs font-bold flex items-center gap-1 shadow-xs transition-all active:scale-95"
          >
            <span className="material-symbols-outlined text-[16px]">add</span>
            <span>New Pitch Deck</span>
          </button>

          {/* Run AI Generator */}
          <button
            onClick={onRunAIGenerator}
            className="h-8 px-3 bg-primary-container text-white hover:bg-black rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all shadow-xs active:scale-95"
          >
            <span className="material-symbols-outlined text-[16px] text-tertiary-fixed">auto_awesome</span>
            <span>Run AI Generator</span>
          </button>

          {/* Pitch Deck Selector Dropdown */}
          <div className="relative flex items-center">
            <select
              value={activeDeck.id}
              onChange={(e) => onSelectDeck(e.target.value)}
              className="h-8 pl-3 pr-8 bg-surface-container-lowest text-on-surface text-xs font-semibold rounded-lg border border-[#C5C6CD]/30 appearance-none cursor-pointer focus:outline-none focus:ring-1 focus:ring-secondary max-w-[280px] truncate shadow-2xs"
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

        {/* Layout Guides, Presentation Mode, and Print */}
        <div className="flex items-center gap-1.5">
          <button
            onClick={onToggleLayoutGuides}
            className={`h-8 px-2.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors border shadow-2xs ${
              showLayoutGuides
                ? 'bg-secondary text-white border-secondary'
                : 'bg-surface-container-lowest hover:bg-surface-container text-on-surface border-[#C5C6CD]/30'
            }`}
            title="Toggle TV3 & TV9 Broadcast Safe Zone and 16:9 Alignment Grid"
          >
            <span className="material-symbols-outlined text-[16px]">tune</span>
            <span className="hidden sm:inline">Layout Guides</span>
          </button>

          {onPrintDeck && (
            <button
              onClick={onPrintDeck}
              className="h-8 px-2.5 bg-surface-container-lowest hover:bg-surface-container text-on-surface rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors border border-[#C5C6CD]/30 shadow-2xs"
              title="Cetak atau Muat Turun PDF Dek (Print / Export PDF)"
            >
              <span className="material-symbols-outlined text-[16px]">print</span>
              <span className="hidden sm:inline">Cetak / PDF</span>
            </button>
          )}

          <button
            onClick={onStartPresentation}
            className="h-8 px-3 bg-surface-container-lowest hover:bg-surface-container text-on-surface rounded-lg text-xs font-bold flex items-center gap-1.5 transition-colors border border-[#C5C6CD]/30 shadow-xs"
            title="Masuk Mod Pembentangan Skrin Penuh 16:9"
          >
            <span className="material-symbols-outlined text-[16px] text-secondary">present_to_all</span>
            <span>Presentation Mode</span>
          </button>
        </div>
      </div>
    </header>
  );
};
