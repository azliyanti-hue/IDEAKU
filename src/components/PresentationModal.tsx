import React, { useState, useEffect } from 'react';
import { PitchDeck } from '../types/deck';
import { SlideCanvas } from './SlideCanvas';

interface PresentationModalProps {
  deck: PitchDeck;
  initialSlideIndex?: number;
  onClose: () => void;
}

export const PresentationModal: React.FC<PresentationModalProps> = ({
  deck,
  initialSlideIndex = 1,
  onClose,
}) => {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(initialSlideIndex);
  const [showSafeZone, setShowSafeZone] = useState(false);
  const [showNotes, setShowNotes] = useState(false);

  const totalSlides = deck.slides.length;
  const currentSlide = deck.slides[currentSlideIndex - 1] || deck.slides[0];

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowRight' || e.key === ' ' || e.key === 'PageDown') {
        setCurrentSlideIndex((prev) => (prev < totalSlides ? prev + 1 : 1));
      } else if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
        setCurrentSlideIndex((prev) => (prev > 1 ? prev - 1 : totalSlides));
      } else if (e.key === 'n' || e.key === 'N') {
        setShowNotes((prev) => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [totalSlides, onClose]);

  // Strategic talking points per slide
  const speakerNotes: Record<number, string> = {
    1: 'Hook the client early. Emphasize TV3 dominance in Malay households during prime festive preparation. Reiterate this is an exclusive tier proposal.',
    2: 'Highlight the 84% daytime viewing index. Address the threat of substitute drinks and show how WHI provides trusted maternal recipe authority.',
    3: 'Focus on Fiza Sabjahan & Uyaina Arshad credibility. Their on-air recommendation acts as an authentic personal endorsement to over 2.8M viewers.',
    4: 'Walk through the 360° touchpoints. The live cooking segment drives emotion; Aston banners drive immediate digital coupon/recipe downloads.',
    5: 'Walk through the 14.5M guaranteed impression table. Point out the blended CPM of RM 24.13 and the permanent studio takeover bonus entitlement.',
    6: 'Explain the 3-phase timing. Phase 1 primes the pantry; Phase 2 surges during Ramadan cooking; Phase 3 captures Syawal open house replenishment.',
    7: 'Recommend Package A at RM 350,000 for maximum market dominance. Remind client that Ramadan live cooking slots lock by the 15th of the month.',
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#0B1526] text-white flex flex-col justify-between overflow-hidden select-none animate-fadeIn">
      {/* Top Floating Presenter HUD */}
      <div className="h-14 px-6 flex items-center justify-between bg-black/40 backdrop-blur-md border-b border-white/10 z-20">
        <div className="flex items-center gap-3">
          <span className="w-2.5 h-2.5 rounded-full bg-secondary"></span>
          <span className="text-xs font-bold text-white tracking-wide truncate max-w-md">
            {deck.campaignName}
          </span>
          <span className="text-xs text-white/40">|</span>
          <span className="text-xs text-tertiary-fixed font-mono font-semibold">
            Slide {currentSlideIndex} of {totalSlides}
          </span>
        </div>

        <div className="flex items-center gap-2">
          {/* Notes Toggle */}
          <button
            onClick={() => setShowNotes(!showNotes)}
            className={`h-8 px-2.5 rounded text-xs font-semibold flex items-center gap-1.5 transition-colors ${
              showNotes ? 'bg-secondary text-white' : 'bg-white/10 hover:bg-white/20 text-white'
            }`}
            title="Toggle Strategist Talking Points (N)"
          >
            <span className="material-symbols-outlined text-[16px]">notes</span>
            <span className="hidden sm:inline">Speaker Notes</span>
          </button>

          {/* Safe Zone Toggle */}
          <button
            onClick={() => setShowSafeZone(!showSafeZone)}
            className={`h-8 px-2.5 rounded text-xs font-semibold flex items-center gap-1.5 transition-colors ${
              showSafeZone ? 'bg-secondary text-white' : 'bg-white/10 hover:bg-white/20 text-white'
            }`}
            title="Toggle 95% TV3 Safe Guides"
          >
            <span className="material-symbols-outlined text-[16px]">tune</span>
            <span className="hidden sm:inline">Safe Zone</span>
          </button>

          {/* Exit Presentation */}
          <button
            onClick={onClose}
            className="h-8 px-3 rounded bg-white/15 hover:bg-white/25 text-white text-xs font-bold flex items-center gap-1 transition-colors"
          >
            <span className="material-symbols-outlined text-[16px]">close</span>
            <span>Exit (ESC)</span>
          </button>
        </div>
      </div>

      {/* Main 16:9 Presentation Canvas Container */}
      <div className="flex-1 flex items-center justify-center p-4 md:p-8 relative">
        {/* Left Arrow Nav */}
        <button
          onClick={() => setCurrentSlideIndex((prev) => (prev > 1 ? prev - 1 : totalSlides))}
          className="absolute left-6 z-30 w-11 h-11 rounded-full bg-black/60 hover:bg-secondary text-white flex items-center justify-center shadow-lg transition-all active:scale-95 border border-white/15 backdrop-blur-sm"
          title="Previous Slide (ArrowLeft)"
        >
          <span className="material-symbols-outlined text-[24px]">chevron_left</span>
        </button>

        {/* 16:9 Slide Box */}
        <div className="w-full max-w-6xl aspect-[16/9] shadow-2xl rounded-xl overflow-hidden ring-1 ring-white/15 relative">
          <SlideCanvas
            slide={currentSlide}
            isEditing={false}
            showLayoutGuides={showSafeZone}
            onUpdateSlide={() => {}}
          />
        </div>

        {/* Right Arrow Nav */}
        <button
          onClick={() => setCurrentSlideIndex((prev) => (prev < totalSlides ? prev + 1 : 1))}
          className="absolute right-6 z-30 w-11 h-11 rounded-full bg-black/60 hover:bg-secondary text-white flex items-center justify-center shadow-lg transition-all active:scale-95 border border-white/15 backdrop-blur-sm"
          title="Next Slide (ArrowRight / Space)"
        >
          <span className="material-symbols-outlined text-[24px]">chevron_right</span>
        </button>
      </div>

      {/* Speaker Notes Drawer (if open) */}
      {showNotes && (
        <div className="bg-[#0E1C2F] border-t border-white/15 p-4 px-8 z-30 animate-fadeIn">
          <div className="max-w-4xl mx-auto flex items-start gap-3">
            <span className="material-symbols-outlined text-secondary text-[20px] shrink-0 mt-0.5">
              psychology
            </span>
            <div className="flex flex-col">
              <span className="text-[11px] uppercase font-bold text-tertiary-fixed tracking-wider">
                Media Strategist Pitch Notes &bull; Slide {currentSlideIndex}
              </span>
              <p className="text-xs text-white/90 leading-relaxed mt-0.5">
                {speakerNotes[currentSlideIndex] || 'Deliver value proposition with clarity and confidence.'}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Bottom Mini Slide Carousel Bar */}
      <div className="h-12 px-6 bg-black/60 backdrop-blur-md border-t border-white/10 flex items-center justify-between z-20">
        <div className="flex items-center gap-1.5 overflow-x-auto py-1">
          {deck.slides.map((s, idx) => {
            const num = idx + 1;
            const isCur = num === currentSlideIndex;
            return (
              <button
                key={s.id}
                onClick={() => setCurrentSlideIndex(num)}
                className={`h-7 px-2.5 rounded text-xs font-bold transition-all flex items-center gap-1 ${
                  isCur
                    ? 'bg-secondary text-white shadow-sm'
                    : 'bg-white/10 text-white/70 hover:bg-white/20'
                }`}
              >
                <span>0{num}</span>
                <span className="hidden md:inline font-normal truncate max-w-[100px]">
                  {s.navTitle}
                </span>
              </button>
            );
          })}
        </div>

        <span className="text-[11px] text-white/50 font-mono hidden sm:inline">
          Use &larr; / &rarr; keys to navigate
        </span>
      </div>
    </div>
  );
};
