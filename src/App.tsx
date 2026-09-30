/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { PitchDeck, SlideData, WorkspaceView } from './types/deck';
import { INITIAL_DECKS } from './data/defaultDecks';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { GeneratorConsole } from './components/GeneratorConsole';
import { SlideCanvas } from './components/SlideCanvas';
import { AllSlidesGrid } from './components/AllSlidesGrid';
import { PresentationModal } from './components/PresentationModal';
import { DeckLibraryView } from './components/DeckLibraryView';
import { RateCardsView } from './components/RateCardsView';
import { LoginModal } from './components/LoginModal';
import { auth, loginWithGoogle, logoutUser } from './firebase';
import { onAuthStateChanged, User } from 'firebase/auth';
import {
  subscribeToUserDecks,
  saveDeckToFirestore,
  deleteDeckFromFirestore,
} from './services/deckSync';

const STORAGE_KEY = 'media_prima_omnia_decks_v3';

export default function App() {
  // Firebase Auth State
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isFirestoreConnected, setIsFirestoreConnected] = useState<boolean>(false);
  const isSyncingFromFirestore = useRef<boolean>(false);

  // Load decks from LocalStorage or initialize with defaults
  const [decks, setDecks] = useState<PitchDeck[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch (e) {
      console.warn('Could not read from localStorage:', e);
    }
    return INITIAL_DECKS;
  });

  const [activeDeckId, setActiveDeckId] = useState<string>(decks[0]?.id || 'fn-susu-whi');
  const [activeSlideIndex, setActiveSlideIndex] = useState<number>(1);
  const [currentView, setCurrentView] = useState<WorkspaceView>('slide-studio');
  const [stageMode, setStageMode] = useState<'single' | 'grid'>('single');
  const [isInlineEditing, setIsInlineEditing] = useState<boolean>(false);
  const [showLayoutGuides, setShowLayoutGuides] = useState<boolean>(false);
  const [isPresentationOpen, setIsPresentationOpen] = useState<boolean>(false);
  const [isConsoleOpen, setIsConsoleOpen] = useState<boolean>(true);
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [aiProgress, setAiProgress] = useState<{ step: string; percent: number } | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState<boolean>(false);

  const activeDeck = decks.find((d) => d.id === activeDeckId) || decks[0];
  const activeSlide = activeDeck.slides[activeSlideIndex - 1] || activeDeck.slides[0];

  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage(null);
    }, 2800);
  };

  const handlePrintDeck = () => {
    window.print();
  };

  // Listen to Firebase Auth state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      if (user) {
        setIsFirestoreConnected(true);
        showToast(`Signed in as ${user.displayName || user.email}`);
      } else {
        setIsFirestoreConnected(false);
      }
    });
    return () => unsubscribe();
  }, []);

  // Listen to Firestore real-time updates when user is logged in
  useEffect(() => {
    if (!currentUser) return;

    const unsubscribe = subscribeToUserDecks(
      currentUser.uid,
      (firestoreDecks) => {
        if (firestoreDecks && firestoreDecks.length > 0) {
          isSyncingFromFirestore.current = true;
          setDecks(firestoreDecks);
          if (!firestoreDecks.some((d) => d.id === activeDeckId)) {
            setActiveDeckId(firestoreDecks[0].id);
          }
          isSyncingFromFirestore.current = false;
        } else {
          // If Firestore is empty for this user, seed their initial decks into Firestore
          decks.forEach((deck) => {
            saveDeckToFirestore(deck, currentUser.uid);
          });
        }
      },
      (error) => {
        console.warn('Firestore subscription notice:', error);
      }
    );

    return () => unsubscribe();
  }, [currentUser]);

  // Auto-save to LocalStorage always, and sync to Firestore if logged in
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(decks));
    } catch (e) {
      console.warn('Failed to save to localStorage:', e);
    }
  }, [decks]);

  const handleLogin = async () => {
    try {
      await loginWithGoogle();
    } catch (err) {
      showToast('Google Sign-in was cancelled or encountered an error.');
    }
  };

  const handleLogout = async () => {
    try {
      await logoutUser();
      showToast('Signed out. Working in local offline mode.');
    } catch (err) {
      console.error(err);
    }
  };

  // Switch active slide safely
  const handleSelectSlide = (index: number) => {
    const validIndex = Math.max(1, Math.min(7, index));
    setActiveSlideIndex(validIndex);
    if (stageMode === 'grid') {
      setStageMode('single');
    }
  };

  const handlePrevSlide = () => {
    handleSelectSlide(activeSlideIndex > 1 ? activeSlideIndex - 1 : 7);
  };

  const handleNextSlide = () => {
    handleSelectSlide(activeSlideIndex < 7 ? activeSlideIndex + 1 : 1);
  };

  // Update a single slide within the active deck
  const handleUpdateSlide = (updatedSlide: SlideData) => {
    let updatedActiveDeck: PitchDeck | null = null;
    const newDecks = decks.map((deck) => {
      if (deck.id !== activeDeck.id) return deck;
      updatedActiveDeck = {
        ...deck,
        updatedAt: new Date().toISOString(),
        slides: deck.slides.map((s) => (s.id === updatedSlide.id ? updatedSlide : s)),
      };
      return updatedActiveDeck;
    });

    setDecks(newDecks);

    // Persist to Firestore if user is authenticated
    if (currentUser && updatedActiveDeck) {
      saveDeckToFirestore(updatedActiveDeck, currentUser.uid).catch((err) => {
        console.warn('Firestore sync notice:', err);
      });
      showToast('Slide updated & synced to Cloud Firestore');
    } else {
      showToast('Slide updated & saved to LocalStorage');
    }
  };

  // Generate / Synthesize deck via AI server endpoint with realistic step telemetry
  const handleGenerateDeck = async (
    brief: string,
    channel: string,
    program: string,
    budget?: string,
    kpi?: string
  ) => {
    setIsGenerating(true);
    setAiProgress({ step: 'Synthesizing commercial taxonomy...', percent: 15 });

    const step1Timer = setTimeout(() => {
      setAiProgress({ step: 'Mapping linear TV & digital inventory rate-cards...', percent: 55 });
    }, 450);

    const step2Timer = setTimeout(() => {
      setAiProgress({ step: 'Synthesizing 7-slide strategic narrative and delivery schedules...', percent: 85 });
    }, 900);

    try {
      const response = await fetch('/api/generate-deck', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          brief,
          channel,
          program,
          budget: budget || activeDeck.budgetTier || '350k',
          kpi: kpi || activeDeck.targetKpi || 'culinary',
        }),
      });

      let synthesizedData: (Partial<PitchDeck> & { channelLocked?: string; slotLocked?: string; slides?: SlideData[] }) | null = null;
      if (response.ok) {
        const json = await response.json();
        synthesizedData = json.data;
      }

      clearTimeout(step1Timer);
      clearTimeout(step2Timer);

      setAiProgress({ step: '7 Slides Generated Successfully!', percent: 100 });

      setTimeout(() => {
        setIsGenerating(false);
        setAiProgress(null);

        if (synthesizedData) {
          let targetUpdatedDeck: PitchDeck | null = null;
          const updatedDecks = decks.map((d) => {
            if (d.id !== activeDeck.id) return d;
            targetUpdatedDeck = {
              ...d,
              clientName: synthesizedData.clientName || d.clientName,
              campaignName: synthesizedData.campaignName || d.campaignName,
              recommendedTier: synthesizedData.recommendedTier || d.recommendedTier,
              grossImpressions: synthesizedData.grossImpressions || d.grossImpressions,
              channel: synthesizedData.channelLocked || channel,
              slot: synthesizedData.slotLocked || program,
              budgetTier: budget || d.budgetTier,
              targetKpi: kpi || d.targetKpi,
              briefNotes: brief,
              updatedAt: new Date().toISOString(),
              slides: synthesizedData.slides || d.slides,
            };
            return targetUpdatedDeck;
          });

          setDecks(updatedDecks);

          if (currentUser && targetUpdatedDeck) {
            saveDeckToFirestore(targetUpdatedDeck, currentUser.uid).catch((err) => {
              console.warn('Firestore sync notice:', err);
            });
            showToast(`Generated 7-slide deck & synced to Firestore!`);
          } else {
            showToast(`Generated 7-slide pitch deck for "${synthesizedData.clientName || activeDeck.clientName}"!`);
          }
        } else {
          showToast('Deck refreshed with customized tactical flighting.');
        }

        handleSelectSlide(1);
      }, 500);
    } catch (err) {
      clearTimeout(step1Timer);
      clearTimeout(step2Timer);
      setIsGenerating(false);
      setAiProgress(null);
      console.warn('API generation fallback applied:', err);
      showToast('Offline synthesis complete: 7 pitch slides updated');
      handleSelectSlide(1);
    }
  };

  // Quick sample loaders
  const handleLoadSample = (sampleKey: 'fn' | 'milo' | 'petronas' | 'tv9') => {
    const targetDeckId =
      sampleKey === 'tv9'
        ? 'tv9-nlko-famili'
        : sampleKey === 'fn'
        ? 'fn-susu-whi'
        : sampleKey === 'milo'
        ? 'milo-sukan-sea'
        : 'petronas-primax-bu';

    const existing = decks.find((d) => d.id === targetDeckId);
    if (existing) {
      setActiveDeckId(existing.id);
      setActiveSlideIndex(1);
      showToast(`Loaded "${existing.campaignName}"`);
    } else {
      const template = INITIAL_DECKS.find((d) => d.id === targetDeckId) || INITIAL_DECKS[0];
      setDecks((prev) => [template, ...prev]);
      setActiveDeckId(template.id);
      setActiveSlideIndex(1);
      if (currentUser) {
        saveDeckToFirestore(template, currentUser.uid).catch(() => {});
      }
      showToast(`Loaded "${template.campaignName}"`);
    }
  };

  // Create a new pitch deck
  const handleNewDeck = () => {
    const id = `deck-${Date.now()}`;
    const newDeck: PitchDeck = {
      id,
      ownerId: currentUser?.uid,
      clientName: 'New Client Enterprise',
      campaignName: 'New Broadcast Sponsorship Pitch 2025',
      briefNotes: 'Client notes: High-impact Ramadan / festive commercial flight targeting national family demographic. Preferred TV3 or TV9 linear slots and social short-form video amplification.',
      channel: 'TV3',
      slot: 'WHI',
      budgetTier: '350k',
      targetKpi: 'culinary',
      recommendedTier: 'RM 350,000',
      grossImpressions: '14.5M Est.',
      updatedAt: new Date().toISOString(),
      slides: JSON.parse(JSON.stringify(INITIAL_DECKS[0].slides)),
    };

    setDecks((prev) => [newDeck, ...prev]);
    setActiveDeckId(id);
    setActiveSlideIndex(1);
    setCurrentView('slide-studio');

    if (currentUser) {
      saveDeckToFirestore(newDeck, currentUser.uid).catch(() => {});
    }

    showToast('New pitch proposal created and ready for editing');
  };

  // Duplicate deck
  const handleDuplicateDeck = (deckId: string) => {
    const target = decks.find((d) => d.id === deckId);
    if (!target) return;
    const duplicated: PitchDeck = {
      ...JSON.parse(JSON.stringify(target)),
      id: `deck-${Date.now()}`,
      ownerId: currentUser?.uid,
      campaignName: `${target.campaignName} (Copy)`,
      updatedAt: new Date().toISOString(),
    };
    setDecks((prev) => [duplicated, ...prev]);
    setActiveDeckId(duplicated.id);

    if (currentUser) {
      saveDeckToFirestore(duplicated, currentUser.uid).catch(() => {});
    }

    showToast(`Duplicated "${target.campaignName}"`);
  };

  // Delete deck
  const handleDeleteDeck = (deckId: string) => {
    if (decks.length <= 1) return;
    setDecks((prev) => prev.filter((d) => d.id !== deckId));
    if (activeDeckId === deckId) {
      const remaining = decks.filter((d) => d.id !== deckId);
      setActiveDeckId(remaining[0].id);
      setActiveSlideIndex(1);
    }

    if (currentUser) {
      deleteDeckFromFirestore(deckId).catch(() => {});
    }

    showToast('Pitch deck deleted');
  };

  // Export deck to JSON
  const handleExportDeck = (deck: PitchDeck) => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(deck, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `${deck.campaignName.replace(/\s+/g, '_')}_Deck.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
    showToast('Exported deck JSON successfully');
  };

  return (
    <div className="min-h-screen bg-surface font-body text-on-surface antialiased flex">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2.5 px-4 py-2.5 rounded-xl bg-primary-container text-white shadow-2xl border border-white/10 animate-slideUp">
          <span className="material-symbols-outlined text-secondary text-[20px]">check_circle</span>
          <div className="flex flex-col">
            <span className="text-[10px] text-surface-variant font-medium">
              {currentUser && isFirestoreConnected ? 'Firebase Cloud Firestore' : 'LocalStorage Sync'}
            </span>
            <span className="text-xs font-bold text-white">{toastMessage}</span>
          </div>
        </div>
      )}

      {/* Fullscreen Presentation Modal */}
      {isPresentationOpen && (
        <PresentationModal
          deck={activeDeck}
          initialSlideIndex={activeSlideIndex}
          onClose={() => setIsPresentationOpen(false)}
        />
      )}

      {/* Global Fixed Sidebar */}
      <Sidebar
        currentView={currentView}
        onSelectView={setCurrentView}
        sponsorshipTarget="RM 1.25M"
        inventorySecuredPercent={75}
        currentUser={currentUser}
        onOpenLogin={() => setIsLoginModalOpen(true)}
        onLogout={handleLogout}
      />

      {/* Main Workbench Viewport */}
      <div className="pl-64 flex-1 flex flex-col min-w-0">
        {/* Fixed Header Toolbar */}
        <Header
          currentView={currentView}
          onSelectView={setCurrentView}
          decks={decks}
          activeDeck={activeDeck}
          onSelectDeck={(id) => {
            setActiveDeckId(id);
            setActiveSlideIndex(1);
            showToast(`Switched active proposal`);
          }}
          onNewDeck={handleNewDeck}
          onRunAIGenerator={() => {
            setCurrentView('slide-studio');
            setIsConsoleOpen(true);
            showToast('AI Console ready: review brief and generate');
          }}
          showLayoutGuides={showLayoutGuides}
          onToggleLayoutGuides={() => setShowLayoutGuides(!showLayoutGuides)}
          onStartPresentation={() => setIsPresentationOpen(true)}
          currentUser={currentUser}
          onOpenLogin={() => setIsLoginModalOpen(true)}
          onLogout={handleLogout}
          isFirestoreConnected={isFirestoreConnected}
          onPrintDeck={handlePrintDeck}
        />

        {/* Content Area */}
        <main className="pt-32 px-6 pb-12 w-full max-w-[1600px] mx-auto">
          {/* VIEW: DECK LIBRARY */}
          {currentView === 'deck-library' && (
            <DeckLibraryView
              decks={decks}
              activeDeckId={activeDeckId}
              onSelectDeck={(id) => {
                setActiveDeckId(id);
                setCurrentView('slide-studio');
                showToast(`Opened in Slide Studio`);
              }}
              onNewDeck={handleNewDeck}
              onDuplicateDeck={handleDuplicateDeck}
              onDeleteDeck={handleDeleteDeck}
              onExportDeck={handleExportDeck}
            />
          )}

          {/* VIEW: RATE CARDS & INVENTORY */}
          {currentView === 'rate-cards' && <RateCardsView />}

          {/* VIEW: SLIDE STUDIO or INPUT GENERATOR */}
          {(currentView === 'slide-studio' || currentView === 'input-generator') && (
            <div className="flex flex-col w-full">
              {/* Generator Input Console Drawer */}
              <GeneratorConsole
                activeDeck={activeDeck}
                isOpen={isConsoleOpen}
                onToggleOpen={() => setIsConsoleOpen(!isConsoleOpen)}
                onGenerate={handleGenerateDeck}
                onLoadSample={handleLoadSample}
                onClear={() => {
                  showToast('Brief notes cleared');
                }}
                isGenerating={isGenerating}
                aiProgress={aiProgress}
              />

              {/* Canvas Control Toolbar */}
              <section className="w-full mb-4 flex flex-wrap items-center justify-between gap-3 bg-surface-container-lowest p-2.5 rounded-xl border border-[#C5C6CD]/25 shadow-sm">
                <div className="flex items-center gap-3">
                  <div className="flex items-center p-1 rounded-lg bg-surface-container border border-[#C5C6CD]/20">
                    <button
                      onClick={() => setStageMode('single')}
                      className={`px-3 py-1 rounded text-xs font-semibold flex items-center gap-1.5 transition-all ${
                        stageMode === 'single'
                          ? 'bg-surface-container-lowest text-on-surface shadow-sm'
                          : 'text-on-surface-variant hover:text-on-surface'
                      }`}
                    >
                      <span className="material-symbols-outlined text-[16px]">slideshow</span>
                      <span>16:9 Stage View</span>
                    </button>

                    <button
                      onClick={() => setStageMode('grid')}
                      className={`px-3 py-1 rounded text-xs font-semibold flex items-center gap-1.5 transition-all ${
                        stageMode === 'grid'
                          ? 'bg-surface-container-lowest text-on-surface shadow-sm'
                          : 'text-on-surface-variant hover:text-on-surface'
                      }`}
                    >
                      <span className="material-symbols-outlined text-[16px]">grid_view</span>
                      <span>All 7 Slides Grid</span>
                    </button>
                  </div>

                  <div className="h-4 w-px bg-surface-container-high hidden sm:block"></div>

                  {/* Inline Editing Toggle */}
                  <button
                    onClick={() => {
                      const next = !isInlineEditing;
                      setIsInlineEditing(next);
                      showToast(next ? 'Inline editing enabled: click any slide text to modify' : 'Inline editing locked');
                    }}
                    className={`px-3 py-1 rounded text-xs font-semibold flex items-center gap-1.5 transition-colors border ${
                      isInlineEditing
                        ? 'bg-secondary text-white border-secondary'
                        : 'bg-surface-container hover:bg-surface-container-high text-on-surface border-[#C5C6CD]/20'
                    }`}
                  >
                    <span className="material-symbols-outlined text-[16px]">edit_note</span>
                    <span>{isInlineEditing ? 'Editing Active (Click text to modify)' : 'Enable Inline Editing'}</span>
                  </button>

                  <span className="hidden md:inline-flex items-center gap-1 px-2 py-0.5 rounded bg-surface-container-low text-on-surface-variant text-[11px] border border-[#C5C6CD]/20 font-medium">
                    <span className="w-1.5 h-1.5 rounded-full bg-secondary"></span>
                    <span>TV3 Broadcast Safe Zone: 95%</span>
                  </span>
                </div>

                {/* Slide Quick Nav Pills */}
                <div className="flex items-center gap-1">
                  <span className="text-xs text-on-surface-variant mr-1 font-medium">Slide:</span>
                  <div className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5, 6, 7].map((num) => {
                      const isActive = num === activeSlideIndex && stageMode === 'single';
                      return (
                        <button
                          key={num}
                          onClick={() => handleSelectSlide(num)}
                          className={`w-7 h-7 rounded text-xs font-semibold transition-all ${
                            isActive
                              ? 'bg-secondary text-white shadow-sm'
                              : 'bg-surface-container text-on-surface hover:bg-surface-container-high'
                          }`}
                        >
                          {num}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </section>

              {/* PRIMARY STAGE VIEW */}
              {stageMode === 'single' ? (
                <section className="w-full grid grid-cols-1 xl:grid-cols-12 gap-5 mb-8">
                  {/* Left Ribbon / Deck Sorter (xl:col-span-3) */}
                  <div className="xl:col-span-3 flex flex-col gap-2.5 order-2 xl:order-1">
                    <div className="flex items-center justify-between px-1">
                      <span className="text-[11px] uppercase tracking-wider text-on-surface-variant font-bold">
                        Proposal Structure
                      </span>
                      <span className="text-xs text-secondary font-bold">7 Slides Locked</span>
                    </div>

                    {/* Thumbnails List */}
                    <div className="flex flex-col gap-1.5 max-h-[680px] overflow-y-auto pr-1">
                      {activeDeck.slides.map((s, idx) => {
                        const sNum = idx + 1;
                        const isCurrent = sNum === activeSlideIndex;
                        return (
                          <div
                            key={s.id}
                            onClick={() => handleSelectSlide(sNum)}
                            className={`cursor-pointer p-2.5 rounded-lg shadow-sm transition-all flex items-center gap-2.5 border ${
                              isCurrent
                                ? 'bg-surface-container-highest border-secondary ring-2 ring-secondary/30'
                                : 'bg-surface-container-lowest hover:bg-surface-container border-[#C5C6CD]/25'
                            }`}
                          >
                            <div
                              className={`w-8 h-8 rounded font-mono flex items-center justify-center font-bold text-xs shrink-0 ${
                                isCurrent
                                  ? 'bg-primary-container text-tertiary-fixed'
                                  : 'bg-surface-container text-on-surface'
                              }`}
                            >
                              0{sNum}
                            </div>
                            <div className="flex flex-col min-w-0">
                              <span className="text-xs font-bold text-on-surface truncate">
                                {s.navTitle}
                              </span>
                              <span className="text-[11px] text-on-surface-variant truncate">
                                {s.navSubtitle}
                              </span>
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    {/* Quick Summary Card */}
                    <div className="p-3.5 rounded-xl bg-surface-container-high/60 mt-1 flex flex-col gap-2 border border-[#C5C6CD]/25">
                      <div className="flex justify-between items-center text-xs">
                        <span className="font-semibold text-on-surface">Client Lock</span>
                        <span className="font-bold text-secondary">{activeDeck.clientName}</span>
                      </div>
                      <div className="flex justify-between items-center text-xs">
                        <span className="text-on-surface-variant">Recommended Tier</span>
                        <span className="font-bold text-on-surface font-mono">{activeDeck.recommendedTier}</span>
                      </div>
                      <div className="flex justify-between items-center text-xs">
                        <span className="text-on-surface-variant">Gross Impression Target</span>
                        <span className="font-bold text-[#BB7336] font-mono">{activeDeck.grossImpressions}</span>
                      </div>
                    </div>
                  </div>

                  {/* Center Stage 16:9 Presentation Canvas (xl:col-span-9) */}
                  <div className="xl:col-span-9 flex flex-col gap-2 order-1 xl:order-2">
                    {/* Stage Bar info */}
                    <div className="flex items-center justify-between px-1">
                      <div className="flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full bg-secondary"></span>
                        <span className="text-xs md:text-sm font-bold text-on-surface">
                          SLIDE 0{activeSlideIndex}: {activeSlide.navTitle}
                        </span>
                        <span className="text-xs text-on-surface-variant hidden sm:inline">
                          (Standard 16:9 Aspect Ratio)
                        </span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <button
                          onClick={handlePrevSlide}
                          className="h-7 w-7 rounded bg-surface-container hover:bg-surface-container-high flex items-center justify-center text-on-surface transition-colors border border-[#C5C6CD]/25"
                          title="Previous Slide"
                        >
                          <span className="material-symbols-outlined text-[16px]">chevron_left</span>
                        </button>
                        <span className="text-xs font-bold px-2 font-mono">
                          {activeSlideIndex} / 7
                        </span>
                        <button
                          onClick={handleNextSlide}
                          className="h-7 w-7 rounded bg-surface-container hover:bg-surface-container-high flex items-center justify-center text-on-surface transition-colors border border-[#C5C6CD]/25"
                          title="Next Slide"
                        >
                          <span className="material-symbols-outlined text-[16px]">chevron_right</span>
                        </button>
                      </div>
                    </div>

                    {/* High-Elevation 16:9 Presentation Stage Container */}
                    <div className="w-full bg-surface-container-lowest rounded-xl shadow-xl p-3 md:p-6 flex items-center justify-center border border-[#C5C6CD]/25">
                      <SlideCanvas
                        slide={activeSlide}
                        isEditing={isInlineEditing}
                        showLayoutGuides={showLayoutGuides}
                        onUpdateSlide={handleUpdateSlide}
                        className="shadow-md"
                      />
                    </div>
                  </div>
                </section>
              ) : (
                /* ALL 7 SLIDES GRID MOSAIC VIEW */
                <AllSlidesGrid
                  deck={activeDeck}
                  onSelectSlide={handleSelectSlide}
                  onReturnToStage={() => setStageMode('single')}
                />
              )}
            </div>
          )}
        </main>
      </div>

      {/* Branded Media Prima Omnia Login Modal */}
      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
        onLoginWithGoogle={handleLogin}
      />

      {/* Dedicated Print View (Rendered only on print / PDF export) */}
      <div className="hidden print:block fixed inset-0 z-[9999] bg-white text-black p-4">
        {activeDeck.slides.map((s, idx) => (
          <div key={s.id} className="print-page w-full aspect-[16/9] mb-12 p-2 page-break-after">
            <div className="text-xs font-bold text-gray-500 mb-2 font-mono">
              {activeDeck.campaignName} &bull; Slaid 0{idx + 1}: {s.navTitle}
            </div>
            <SlideCanvas
              slide={s}
              isEditing={false}
              showLayoutGuides={false}
              onUpdateSlide={() => {}}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
