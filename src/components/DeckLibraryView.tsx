import React from 'react';
import { PitchDeck } from '../types/deck';
import { SlideCanvas } from './SlideCanvas';

interface DeckLibraryViewProps {
  decks: PitchDeck[];
  activeDeckId: string;
  onSelectDeck: (deckId: string) => void;
  onNewDeck: () => void;
  onDuplicateDeck: (deckId: string) => void;
  onDeleteDeck: (deckId: string) => void;
  onExportDeck: (deck: PitchDeck) => void;
}

export const DeckLibraryView: React.FC<DeckLibraryViewProps> = ({
  decks,
  activeDeckId,
  onSelectDeck,
  onNewDeck,
  onDuplicateDeck,
  onDeleteDeck,
  onExportDeck,
}) => {
  return (
    <div className="w-full flex flex-col gap-6 animate-fadeIn pb-12">
      {/* Title & Actions */}
      <div className="flex flex-wrap items-center justify-between gap-4 bg-surface-container-lowest p-6 rounded-xl border border-[#C5C6CD]/25 shadow-sm">
        <div>
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-secondary text-[24px]">space_dashboard</span>
            <h1 className="font-display text-xl font-bold text-on-surface">
              Pitch Deck Library &amp; Executive Vault
            </h1>
          </div>
          <p className="text-xs text-on-surface-variant mt-1">
            Browse, manage, and duplicate client pitch proposals across linear broadcast channels and digital properties.
          </p>
        </div>

        <button
          onClick={onNewDeck}
          className="h-9 px-4 bg-secondary hover:bg-secondary-container text-white text-xs font-bold rounded-lg shadow-sm flex items-center gap-1.5 transition-all active:scale-95"
        >
          <span className="material-symbols-outlined text-[18px]">add</span>
          <span>Create New Pitch Deck</span>
        </button>
      </div>

      {/* Decks Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {decks.map((deck) => {
          const isActive = deck.id === activeDeckId;
          const slide1 = deck.slides[0] || null;

          return (
            <div
              key={deck.id}
              className={`flex flex-col justify-between bg-surface-container-lowest rounded-xl border transition-all shadow-sm overflow-hidden ${
                isActive
                  ? 'border-secondary ring-2 ring-secondary/30'
                  : 'border-[#C5C6CD]/25 hover:border-secondary/60 hover:shadow-md'
              }`}
            >
              <div>
                {/* 16:9 Thumbnail Header */}
                <div
                  onClick={() => onSelectDeck(deck.id)}
                  className="w-full aspect-[16/9] cursor-pointer bg-surface-container-low overflow-hidden relative group"
                >
                  {slide1 && (
                    <SlideCanvas
                      slide={slide1}
                      isEditing={false}
                      showLayoutGuides={false}
                      onUpdateSlide={() => {}}
                      isThumbnail={true}
                    />
                  )}
                  <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <span className="px-3 py-1.5 rounded-lg bg-black/80 text-white text-xs font-bold backdrop-blur-sm flex items-center gap-1">
                      <span className="material-symbols-outlined text-[16px]">edit</span>
                      <span>Open in Studio</span>
                    </span>
                  </div>
                </div>

                {/* Metadata Body */}
                <div className="p-4 flex flex-col gap-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold text-secondary uppercase tracking-wider">
                      {deck.channel} &bull; {deck.slot}
                    </span>
                    {isActive && (
                      <span className="px-2 py-0.5 rounded-full bg-secondary text-white text-[10px] font-bold">
                        Active In Studio
                      </span>
                    )}
                  </div>

                  <h3 className="font-display font-bold text-sm text-on-surface line-clamp-1">
                    {deck.campaignName}
                  </h3>

                  <p className="text-[11px] text-on-surface-variant line-clamp-2 leading-relaxed">
                    {deck.briefNotes}
                  </p>

                  <div className="grid grid-cols-2 gap-2 mt-2 pt-2 border-t border-[#C5C6CD]/20 text-[11px]">
                    <div>
                      <span className="text-on-surface-variant block text-[10px]">Recommended</span>
                      <span className="font-bold text-on-surface font-mono">{deck.recommendedTier}</span>
                    </div>
                    <div className="text-right">
                      <span className="text-on-surface-variant block text-[10px]">Gross Impressions</span>
                      <span className="font-bold text-secondary font-mono">{deck.grossImpressions}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Bar Footer */}
              <div className="p-3 bg-surface-container-low/60 border-t border-[#C5C6CD]/20 flex items-center justify-between gap-1">
                <button
                  onClick={() => onSelectDeck(deck.id)}
                  className="px-2.5 py-1 rounded bg-primary-container text-white text-xs font-semibold hover:bg-black transition-colors"
                >
                  Edit Deck
                </button>

                <div className="flex items-center gap-1">
                  <button
                    onClick={() => onDuplicateDeck(deck.id)}
                    className="p-1 rounded text-on-surface-variant hover:text-on-surface hover:bg-surface-container"
                    title="Duplicate Deck"
                  >
                    <span className="material-symbols-outlined text-[18px]">content_copy</span>
                  </button>

                  <button
                    onClick={() => onExportDeck(deck)}
                    className="p-1 rounded text-on-surface-variant hover:text-on-surface hover:bg-surface-container"
                    title="Export Deck JSON"
                  >
                    <span className="material-symbols-outlined text-[18px]">download</span>
                  </button>

                  {decks.length > 1 && (
                    <button
                      onClick={() => onDeleteDeck(deck.id)}
                      className="p-1 rounded text-on-surface-variant hover:text-red-600 hover:bg-red-50"
                      title="Delete Deck"
                    >
                      <span className="material-symbols-outlined text-[18px]">delete</span>
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
