import React from 'react';
import { PitchDeck } from '../types/deck';
import { SlideCanvas } from './SlideCanvas';

interface AllSlidesGridProps {
  deck: PitchDeck;
  onSelectSlide: (slideIndex: number) => void;
  onReturnToStage: () => void;
}

export const AllSlidesGrid: React.FC<AllSlidesGridProps> = ({
  deck,
  onSelectSlide,
  onReturnToStage,
}) => {
  return (
    <section className="w-full flex flex-col gap-5 mb-8">
      {/* Mosaic Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-display text-lg font-bold text-on-surface">
            Pitch Deck Mosaic: Complete 7-Slide Array
          </h2>
          <p className="text-xs text-on-surface-variant font-normal">
            Review presentation continuity, narrative pacing, and tactical delivery tiers at a glance.
          </p>
        </div>
        <button
          onClick={onReturnToStage}
          className="h-8 px-3 bg-secondary hover:bg-secondary-container text-white text-xs font-bold rounded flex items-center gap-1 shadow-sm transition-all active:scale-95"
        >
          <span className="material-symbols-outlined text-[16px]">fullscreen</span>
          <span>Return to Stage Editor</span>
        </button>
      </div>

      {/* 7-Slide Bento Grid Container */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
        {deck.slides.map((slide, index) => (
          <div
            key={slide.id}
            onClick={() => onSelectSlide(index + 1)}
            className="flex flex-col gap-1.5 cursor-pointer group"
          >
            <div className="flex items-center justify-between text-on-surface text-xs px-1">
              <span className="font-bold text-on-surface">
                Slide 0{slide.id} &bull; {slide.navTitle}
              </span>
              <span className="text-secondary font-bold group-hover:underline flex items-center gap-0.5 text-[11px]">
                <span>Edit</span>
                <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
              </span>
            </div>

            <div className="w-full aspect-[16/9] rounded-xl shadow-md overflow-hidden bg-surface-container-lowest ring-1 ring-[#C5C6CD]/30 group-hover:ring-2 group-hover:ring-secondary group-hover:shadow-lg transition-all relative">
              <SlideCanvas
                slide={slide}
                isEditing={false}
                showLayoutGuides={false}
                onUpdateSlide={() => {}}
                isThumbnail={true}
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
