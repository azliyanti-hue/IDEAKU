import React from 'react';
import { SlideData } from '../types/deck';

interface SlideCanvasProps {
  slide: SlideData;
  isEditing: boolean;
  showLayoutGuides: boolean;
  onUpdateSlide: (updatedSlide: SlideData) => void;
  className?: string;
  isThumbnail?: boolean;
}

export const SlideCanvas: React.FC<SlideCanvasProps> = ({
  slide,
  isEditing,
  showLayoutGuides,
  onUpdateSlide,
  className = '',
  isThumbnail = false,
}) => {
  // Helper to update text property
  const handleTextChange = (field: keyof SlideData, value: string) => {
    onUpdateSlide({
      ...slide,
      [field]: value,
    });
  };

  const handleMetadataChange = (field: keyof NonNullable<SlideData['metadata']>, value: string) => {
    if (!slide.metadata) return;
    onUpdateSlide({
      ...slide,
      metadata: {
        ...slide.metadata,
        [field]: value,
      },
    });
  };

  const editableClass = isEditing && !isThumbnail
    ? 'outline-dashed outline-1 outline-secondary cursor-text hover:bg-black/5 rounded px-1 -mx-1 transition-all'
    : '';

  // Render individual slide templates
  return (
    <div
      className={`w-full aspect-[16/9] rounded-lg relative overflow-hidden select-text transition-all ${className} ${
        isThumbnail ? 'text-[65%]' : ''
      }`}
    >
      {/* Broadcast Safe Zone 95% Overlay Guide */}
      {showLayoutGuides && !isThumbnail && (
        <div className="absolute inset-[2.5%] pointer-events-none z-30 border-2 border-dashed border-red-500/50 rounded flex flex-col justify-between p-2">
          <div className="flex justify-between items-center text-[10px] font-mono text-red-500 font-bold bg-white/70 px-1 rounded backdrop-blur-sm self-start">
            TV3 Safe Action Zone (95%)
          </div>
          <div className="flex justify-between items-center text-[10px] font-mono text-red-500 font-bold bg-white/70 px-1 rounded backdrop-blur-sm self-end">
            16:9 Broadcast Safe
          </div>
        </div>
      )}

      {/* ============================================================ */}
      {/* SLIDE 1: Title & Hero Concept Hook */}
      {/* ============================================================ */}
      {slide.type === 'title' && (
        <div className="w-full h-full p-6 md:p-10 flex flex-col justify-between bg-primary-container text-white relative overflow-hidden">
          {/* Decorative Backdrops */}
          <div className="absolute -right-20 -bottom-20 w-96 h-96 rounded-full bg-secondary/15 blur-3xl pointer-events-none"></div>
          <div className="absolute right-12 top-10 w-48 h-48 rounded-full bg-amber-500/10 blur-2xl pointer-events-none"></div>

          {/* Top Header Row */}
          <div className="flex items-center justify-between z-10">
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded bg-secondary flex items-center justify-center text-white font-bold text-xs shadow-sm">
                M
              </div>
              <div className="flex flex-col">
                <span className="text-xs font-bold tracking-wider text-surface uppercase leading-tight">
                  Media Prima Omnia
                </span>
                <span className="text-[10px] text-on-primary-container leading-tight">
                  Linear TV &amp; Digital Integration Strategy
                </span>
              </div>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="px-2.5 py-1 rounded bg-secondary text-white text-[10px] font-bold tracking-wider uppercase shadow-sm">
                {slide.badge || 'Broadcast Sponsorship'}
              </span>
              <span className="px-2.5 py-1 rounded bg-white/10 backdrop-blur-md text-white text-[10px] font-medium border border-white/15">
                Exclusive Proposal
              </span>
            </div>
          </div>

          {/* Core Center Hook */}
          <div className="my-auto z-10 flex flex-col gap-2.5 max-w-4xl">
            <div className="inline-flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-tertiary-fixed animate-ping"></span>
              <span
                contentEditable={isEditing}
                suppressContentEditableWarning
                onBlur={(e) => handleTextChange('kicker', e.currentTarget.textContent || '')}
                className={`px-2 py-0.5 rounded bg-tertiary-container text-[#BB7336] text-[10px] font-bold uppercase tracking-wider ${editableClass}`}
              >
                {slide.kicker || 'Hero Concept Hook'}
              </span>
            </div>
            <h1
              contentEditable={isEditing}
              suppressContentEditableWarning
              onBlur={(e) => handleTextChange('title', e.currentTarget.textContent || '')}
              className={`font-display font-extrabold text-white leading-tight tracking-tight text-2xl md:text-3xl lg:text-[40px] ${editableClass}`}
            >
              {slide.title}
            </h1>
            <p
              contentEditable={isEditing}
              suppressContentEditableWarning
              onBlur={(e) => handleTextChange('subtitle', e.currentTarget.textContent || '')}
              className={`text-sm md:text-base text-surface-variant font-normal leading-relaxed max-w-3xl ${editableClass}`}
            >
              {slide.subtitle}
            </p>
          </div>

          {/* Bottom Metadata Footer */}
          <div className="pt-3 border-t border-white/15 flex flex-wrap items-center justify-between gap-3 z-10">
            <div className="flex items-center gap-6 flex-wrap">
              <div className="flex flex-col">
                <span className="text-[10px] text-on-primary-container uppercase font-semibold">
                  Target Audience
                </span>
                <span
                  contentEditable={isEditing}
                  suppressContentEditableWarning
                  onBlur={(e) => handleMetadataChange('targetAudience', e.currentTarget.textContent || '')}
                  className={`text-xs font-semibold text-white ${editableClass}`}
                >
                  {slide.metadata?.targetAudience || 'Malay Homemakers 25–45 & MHI Decision Makers'}
                </span>
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] text-on-primary-container uppercase font-semibold">
                  Primary Channel
                </span>
                <span
                  contentEditable={isEditing}
                  suppressContentEditableWarning
                  onBlur={(e) => handleMetadataChange('primaryChannel', e.currentTarget.textContent || '')}
                  className={`text-xs font-semibold text-white ${editableClass}`}
                >
                  {slide.metadata?.primaryChannel || 'TV3 (Wanita Hari Ini) + Omnia Network'}
                </span>
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] text-on-primary-container uppercase font-semibold">
                  Commercial Window
                </span>
                <span
                  contentEditable={isEditing}
                  suppressContentEditableWarning
                  onBlur={(e) => handleMetadataChange('commercialWindow', e.currentTarget.textContent || '')}
                  className={`text-xs font-semibold text-secondary-fixed ${editableClass}`}
                >
                  {slide.metadata?.commercialWindow || 'Q1-Q2 (Pre-Ramadan to Syawal 2025)'}
                </span>
              </div>
            </div>
            <div className="flex items-center gap-1.5 text-xs text-white font-mono">
              <span className="material-symbols-outlined text-secondary text-[20px]">verified</span>
              <span>CODE: {slide.metadata?.code || 'MP-WHI-FN25'}</span>
            </div>
          </div>
        </div>
      )}

      {/* ============================================================ */}
      {/* SLIDE 2: Strategic Diagnostics */}
      {/* ============================================================ */}
      {slide.type === 'diagnostics' && (
        <div className="w-full h-full p-6 md:p-10 flex flex-col justify-between bg-surface-container-lowest text-on-surface relative overflow-hidden">
          {/* Top Banner */}
          <div className="flex items-center justify-between border-b border-surface-container pb-2.5">
            <div>
              <span className="text-[10px] font-bold text-secondary uppercase tracking-wider block">
                {slide.kicker || 'Slide 02: Strategic Diagnostics'}
              </span>
              <h2
                contentEditable={isEditing}
                suppressContentEditableWarning
                onBlur={(e) => handleTextChange('title', e.currentTarget.textContent || '')}
                className={`font-display text-xl md:text-2xl font-bold text-on-surface ${editableClass}`}
              >
                {slide.title}
              </h2>
            </div>
            <span className="px-2.5 py-1 rounded bg-surface-container text-on-surface-variant text-[11px] font-medium border border-[#C5C6CD]/25">
              Omnia Intelligence Unit
            </span>
          </div>

          {/* 3-Column Diagnostic Bento */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 my-auto">
            {/* Col 1 */}
            <div className="p-4 rounded-xl bg-surface-container-low flex flex-col justify-between shadow-sm border border-[#C5C6CD]/20">
              <div>
                <div className="flex items-center gap-1.5 text-secondary mb-2">
                  <span className="material-symbols-outlined text-[20px]">crisis_alert</span>
                  <span className="text-xs font-bold uppercase">{slide.col1Title || 'The Strategic Hurdle'}</span>
                </div>
                <p
                  contentEditable={isEditing}
                  suppressContentEditableWarning
                  onBlur={(e) => handleTextChange('col1Body', e.currentTarget.textContent || '')}
                  className={`text-xs md:text-[13px] text-on-surface leading-relaxed ${editableClass}`}
                >
                  {slide.col1Body || 'Modernizing culinary perception while defending market share against substitutes.'}
                </p>
              </div>
              <div className="mt-3 p-2 rounded bg-surface-container text-on-surface-variant text-[11px] font-medium">
                {slide.col1Foot || 'Risk: Brand inertia in millennial home kitchens.'}
              </div>
            </div>

            {/* Col 2: Big Metric */}
            <div className="p-4 rounded-xl bg-primary-container text-white flex flex-col justify-between shadow-md border border-white/10">
              <div>
                <div className="flex items-center gap-1.5 text-tertiary-fixed mb-1">
                  <span className="material-symbols-outlined text-[20px]">query_stats</span>
                  <span className="text-xs font-bold uppercase">Audience Reality</span>
                </div>
                <div
                  contentEditable={isEditing}
                  suppressContentEditableWarning
                  onBlur={(e) => handleTextChange('col2Metric', e.currentTarget.textContent || '')}
                  className={`font-display text-4xl md:text-5xl font-black text-secondary my-1 leading-none ${editableClass}`}
                >
                  {slide.col2Metric || '84%'}
                </div>
                <span className="text-[11px] text-surface-variant font-medium block">
                  {slide.col2MetricLabel || 'Malay Household Daytime Index'}
                </span>
              </div>
              <p
                contentEditable={isEditing}
                suppressContentEditableWarning
                onBlur={(e) => handleTextChange('col2Body', e.currentTarget.textContent || '')}
                className={`text-xs text-on-primary-container mt-2.5 leading-relaxed ${editableClass}`}
              >
                {slide.col2Body || 'Homemakers actively rely on TV3 daytime broadcasts during festive planning windows for recipe credibility and brand trust.'}
              </p>
            </div>

            {/* Col 3: The Solution */}
            <div className="p-4 rounded-xl bg-surface-container-high flex flex-col justify-between shadow-sm border border-[#C5C6CD]/20">
              <div>
                <div className="flex items-center gap-1.5 text-on-surface mb-2">
                  <span className="material-symbols-outlined text-[20px]">lightbulb</span>
                  <span className="text-xs font-bold uppercase">{slide.col3Title || 'The Omnia Solution'}</span>
                </div>
                <p
                  contentEditable={isEditing}
                  suppressContentEditableWarning
                  onBlur={(e) => handleTextChange('col3Body', e.currentTarget.textContent || '')}
                  className={`text-xs md:text-[13px] text-on-surface leading-relaxed ${editableClass}`}
                >
                  {slide.col3Body || 'Seamless live culinary integration within flagship slot, synchronized with bite-sized shortform TikTok & SirapLimau recipes.'}
                </p>
              </div>
              <div className="mt-3 p-2 rounded bg-surface-container-lowest text-secondary text-[11px] font-bold">
                {slide.col3Foot || 'Result: Uncontested daytime share of voice.'}
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between text-on-surface-variant text-[11px] pt-2 border-t border-surface-container font-medium">
            <span>Source: Nielsen Linear TV Audience Measurement (TAM) 2024 / Omnia Consumer Survey</span>
            <span>Commercial Recommendation: Live Integrated Format</span>
          </div>
        </div>
      )}

      {/* ============================================================ */}
      {/* SLIDE 3: Program Spotlight */}
      {/* ============================================================ */}
      {slide.type === 'program' && (
        <div className="w-full h-full p-6 md:p-10 flex flex-col justify-between bg-surface-container-lowest text-on-surface relative overflow-hidden">
          {/* Top Banner */}
          <div className="flex items-center justify-between border-b border-surface-container pb-2.5">
            <div>
              <span className="text-[10px] font-bold text-secondary uppercase tracking-wider block">
                {slide.kicker || 'Slide 03: Inventory Anchor'}
              </span>
              <h2
                contentEditable={isEditing}
                suppressContentEditableWarning
                onBlur={(e) => handleTextChange('title', e.currentTarget.textContent || '')}
                className={`font-display text-xl md:text-2xl font-bold text-on-surface ${editableClass}`}
              >
                {slide.title}
              </h2>
            </div>
            <span className="px-2.5 py-1 rounded bg-secondary text-white text-[10px] font-bold uppercase tracking-wider shadow-sm">
              #1 Daytime Talkshow
            </span>
          </div>

          {/* 2-Panel Card UI */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-3.5 my-auto items-stretch">
            {/* Left Card */}
            <div className="lg:col-span-5 rounded-xl bg-primary-container text-white p-4 flex flex-col justify-between relative shadow-md border border-white/10">
              <div className="flex justify-between items-start z-10">
                <span className="px-2 py-0.5 rounded bg-white/15 backdrop-blur-md text-white text-[10px] font-mono">
                  {slide.slotInfo || 'LIVE MON - FRI | 12:00 PM - 1:00 PM'}
                </span>
                <div className="w-7 h-7 rounded-full bg-secondary flex items-center justify-center text-white">
                  <span className="material-symbols-outlined text-[16px]">tv</span>
                </div>
              </div>

              <div className="my-3 flex flex-col gap-1 z-10">
                <span className="text-[10px] text-tertiary-fixed font-bold uppercase">TV3 Live Studio Anchor</span>
                <div
                  contentEditable={isEditing}
                  suppressContentEditableWarning
                  onBlur={(e) => handleTextChange('programName', e.currentTarget.textContent || '')}
                  className={`font-display text-lg md:text-xl font-extrabold text-white leading-tight ${editableClass}`}
                >
                  {slide.programName || 'Wanita Hari Ini (WHI)'}
                </div>
                <p className="text-xs text-on-primary-container leading-relaxed">
                  {slide.programDesc || 'Malaysia’s undisputed culinary & lifestyle daytime powerhouse for over two decades.'}
                </p>
              </div>

              <div className="p-2.5 rounded-lg bg-white/10 backdrop-blur-md flex items-center justify-between z-10 border border-white/10">
                <div>
                  <span className="text-[10px] text-surface-variant block">Monthly Reach</span>
                  <span className="text-xs md:text-sm font-bold text-white">{slide.monthlyReach || '2.8 Million Viewers'}</span>
                </div>
                <div className="text-right">
                  <span className="text-[10px] text-surface-variant block">Channel Dominance</span>
                  <span className="text-xs md:text-sm font-bold text-secondary">{slide.channelShare || '62% Share'}</span>
                </div>
              </div>
            </div>

            {/* Right Card */}
            <div className="lg:col-span-7 flex flex-col justify-between gap-2.5">
              {/* Demographic Metrics */}
              <div className="grid grid-cols-3 gap-2">
                <div className="p-2.5 rounded-lg bg-surface-container-low text-center border border-[#C5C6CD]/20">
                  <span className="text-[10px] text-on-surface-variant block">{slide.stat1Label || 'Audience Gender'}</span>
                  <span className="text-sm md:text-base font-bold text-secondary font-display">{slide.stat1Val || '72% Female'}</span>
                </div>
                <div className="p-2.5 rounded-lg bg-surface-container-low text-center border border-[#C5C6CD]/20">
                  <span className="text-[10px] text-on-surface-variant block">{slide.stat2Label || 'Core Demographic'}</span>
                  <span className="text-sm md:text-base font-bold text-on-surface font-display">{slide.stat2Val || 'Malay P25-49'}</span>
                </div>
                <div className="p-2.5 rounded-lg bg-surface-container-low text-center border border-[#C5C6CD]/20">
                  <span className="text-[10px] text-on-surface-variant block">{slide.stat3Label || 'Household Income'}</span>
                  <span className="text-sm md:text-base font-bold text-on-surface font-display">{slide.stat3Val || 'MHI RM3k-RM7k'}</span>
                </div>
              </div>

              {/* Host Endorsement */}
              <div className="p-3.5 rounded-xl bg-surface-container flex items-center gap-3 border border-[#C5C6CD]/20">
                <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white shrink-0 font-bold">
                  <span className="material-symbols-outlined text-[20px]">record_voice_over</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] text-secondary font-bold uppercase">Credible Household Tastemakers</span>
                  <span
                    contentEditable={isEditing}
                    suppressContentEditableWarning
                    onBlur={(e) => handleTextChange('hostName', e.currentTarget.textContent || '')}
                    className={`text-xs md:text-sm font-bold text-on-surface ${editableClass}`}
                  >
                    {slide.hostName || 'Fiza Sabjahan & Uyaina Arshad'}
                  </span>
                  <p className="text-[11px] text-on-surface-variant leading-relaxed mt-0.5">
                    {slide.hostDesc || 'Beloved maternal figures trusted by Malay households for authentic pantry recommendations, festive meal preparation, and lifestyle guidance.'}
                  </p>
                </div>
              </div>

              {/* Specs */}
              <div className="p-2 rounded-lg bg-surface-container-low flex items-center justify-between text-on-surface text-[11px] border border-[#C5C6CD]/20">
                <span className="flex items-center gap-1">
                  <span className="material-symbols-outlined text-[14px] text-secondary">schedule</span> Mon - Fri 12:00 - 13:00
                </span>
                <span className="flex items-center gap-1">
                  <span className="material-symbols-outlined text-[14px] text-secondary">wifi_tethering</span> Simulcast Tonton Live
                </span>
                <span className="flex items-center gap-1">
                  <span className="material-symbols-outlined text-[14px] text-secondary">campaign</span> In-show Aston Compatible
                </span>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between text-on-surface-variant text-[11px] pt-2 border-t border-surface-container font-medium">
            <span>Strategic Value: High brand halo in warm daytime context</span>
            <span>Commercial Status: Prime Inventory Reserved</span>
          </div>
        </div>
      )}

      {/* ============================================================ */}
      {/* SLIDE 4: Creative Integrations */}
      {/* ============================================================ */}
      {slide.type === 'creative' && (
        <div className="w-full h-full p-6 md:p-10 flex flex-col justify-between bg-surface-container-lowest text-on-surface relative overflow-hidden">
          {/* Top Banner */}
          <div className="flex items-center justify-between border-b border-surface-container pb-2.5">
            <div>
              <span className="text-[10px] font-bold text-secondary uppercase tracking-wider block">
                {slide.kicker || 'Slide 04: The Creative Concept'}
              </span>
              <h2
                contentEditable={isEditing}
                suppressContentEditableWarning
                onBlur={(e) => handleTextChange('title', e.currentTarget.textContent || '')}
                className={`font-display text-xl md:text-2xl font-bold text-on-surface ${editableClass}`}
              >
                {slide.title}
              </h2>
            </div>
            <span className="px-2.5 py-1 rounded bg-tertiary-container text-[#BB7336] text-[10px] font-bold uppercase">
              360° Studio Takeover
            </span>
          </div>

          {/* 4 Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 my-auto">
            {slide.cards?.map((card, idx) => {
              const isDark = idx === 3;
              return (
                <div
                  key={idx}
                  className={`p-3.5 rounded-xl flex flex-col justify-between shadow-sm border ${
                    isDark
                      ? 'bg-primary-container text-white border-white/10'
                      : 'bg-surface-container-low text-on-surface border-[#C5C6CD]/25'
                  }`}
                >
                  <div>
                    <div
                      className={`w-7 h-7 rounded flex items-center justify-center font-bold text-xs mb-2 ${
                        isDark ? 'bg-secondary text-white' : idx === 0 ? 'bg-secondary text-white' : 'bg-primary text-white'
                      }`}
                    >
                      {card.num}
                    </div>
                    <span
                      className={`text-[10px] font-bold uppercase block ${
                        isDark ? 'text-tertiary-fixed' : 'text-secondary'
                      }`}
                    >
                      {card.label}
                    </span>
                    <h3
                      className={`text-xs md:text-[13px] font-bold mt-1 ${
                        isDark ? 'text-white' : 'text-on-surface'
                      }`}
                    >
                      {card.title}
                    </h3>
                    <p
                      className={`text-[11px] mt-1.5 leading-relaxed ${
                        isDark ? 'text-on-primary-container' : 'text-on-surface-variant'
                      }`}
                    >
                      {card.desc}
                    </p>
                  </div>
                  <div
                    className={`mt-2.5 pt-1.5 border-t text-[11px] font-semibold ${
                      isDark ? 'border-white/15 text-tertiary-fixed' : 'border-[#C5C6CD]/25 text-on-surface'
                    }`}
                  >
                    {card.foot}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between text-on-surface-variant text-[11px] pt-2 border-t border-surface-container font-medium">
            <span>Execution Hook: High-emotion family recipe nostalgia during Ramadan cooking hours</span>
            <span>Co-branded Tagline: &apos;Resipi Kasih Ibu Bersama F&amp;N&apos;</span>
          </div>
        </div>
      )}

      {/* ============================================================ */}
      {/* SLIDE 5: Tactical Deliverables */}
      {/* ============================================================ */}
      {slide.type === 'deliverables' && (
        <div className="w-full h-full p-6 md:p-10 flex flex-col justify-between bg-surface-container-lowest text-on-surface relative overflow-hidden">
          {/* Top Banner */}
          <div className="flex items-center justify-between border-b border-surface-container pb-2.5">
            <div>
              <span className="text-[10px] font-bold text-secondary uppercase tracking-wider block">
                {slide.kicker || 'Slide 05: Inventory Schedule'}
              </span>
              <h2
                contentEditable={isEditing}
                suppressContentEditableWarning
                onBlur={(e) => handleTextChange('title', e.currentTarget.textContent || '')}
                className={`font-display text-xl md:text-2xl font-bold text-on-surface ${editableClass}`}
              >
                {slide.title}
              </h2>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="px-2 py-0.5 rounded bg-surface-container text-on-surface text-[11px] font-medium">
                Total Gross Reach:
              </span>
              <span className="px-2.5 py-1 rounded bg-secondary text-white text-[11px] font-bold shadow-sm">
                {slide.grossImpressions || '14.5M Impressions'}
              </span>
            </div>
          </div>

          {/* Deliverables Table */}
          <div className="my-auto flex flex-col gap-2.5">
            <div className="overflow-x-auto rounded-lg border border-[#C5C6CD]/25">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="bg-surface-container-low text-on-surface-variant text-[10px] font-bold uppercase border-b border-[#C5C6CD]/25">
                    <th className="py-2 px-3">Channel / Medium</th>
                    <th className="py-2 px-3">Tactical Entitlement</th>
                    <th className="py-2 px-3">Frequency</th>
                    <th className="py-2 px-3">Audience Targeting</th>
                    <th className="py-2 px-3 text-right">Est. Impressions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#C5C6CD]/20 text-[11px]">
                  {slide.table?.map((row, idx) => (
                    <tr key={idx} className="hover:bg-surface-container/50">
                      <td className="py-2 px-3 font-semibold text-on-surface">{row.medium}</td>
                      <td className="py-2 px-3 text-on-surface">{row.entitlement}</td>
                      <td className="py-2 px-3 font-medium text-on-surface-variant">{row.freq}</td>
                      <td className="py-2 px-3 text-on-surface-variant">{row.target}</td>
                      <td className="py-2 px-3 font-bold text-right text-secondary font-mono">{row.reach}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Metric Highlight Banner */}
            <div className="p-2.5 rounded-lg bg-surface-container-high/60 flex flex-wrap items-center justify-between gap-2 border border-[#C5C6CD]/25">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-secondary text-[22px]">workspace_premium</span>
                <div className="flex flex-col">
                  <span className="text-xs font-bold text-on-surface">
                    {slide.valueEntitlement || 'Value Entitlement: F&N Studio Kitchen Takeover'}
                  </span>
                  <span className="text-[11px] text-on-surface-variant">
                    {slide.valueDesc || 'Permanent physical logo visibility throughout full 6-week Ramadan broadcast cycle.'}
                  </span>
                </div>
              </div>
              <span className="px-2.5 py-1 rounded bg-surface-container-lowest text-on-surface text-[10px] font-bold shadow-sm border border-[#C5C6CD]/25">
                Over-delivery: +18% Bonus Reach
              </span>
            </div>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between text-on-surface-variant text-[11px] pt-2 border-t border-surface-container font-medium">
            <span>Delivery Verification: Post-Campaign Nielsen TAM &amp; Meta/TikTok Analytics Log</span>
            <span>Guaranteed CPM: RM 24.13 Blended Net</span>
          </div>
        </div>
      )}

      {/* ============================================================ */}
      {/* SLIDE 6: 3-Phase Timeline */}
      {/* ============================================================ */}
      {slide.type === 'timeline' && (
        <div className="w-full h-full p-6 md:p-10 flex flex-col justify-between bg-surface-container-lowest text-on-surface relative overflow-hidden">
          {/* Top Banner */}
          <div className="flex items-center justify-between border-b border-surface-container pb-2.5">
            <div>
              <span className="text-[10px] font-bold text-secondary uppercase tracking-wider block">
                {slide.kicker || 'Slide 06: Execution Roadmap'}
              </span>
              <h2
                contentEditable={isEditing}
                suppressContentEditableWarning
                onBlur={(e) => handleTextChange('title', e.currentTarget.textContent || '')}
                className={`font-display text-xl md:text-2xl font-bold text-on-surface ${editableClass}`}
              >
                {slide.title}
              </h2>
            </div>
            <span className="px-2.5 py-1 rounded bg-surface-container text-on-surface-variant text-[11px] font-medium border border-[#C5C6CD]/25">
              8-Week Coordinated Surge
            </span>
          </div>

          {/* 3-Phase Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 my-auto">
            {/* Phase 1 */}
            <div className="p-4 rounded-xl bg-surface-container-low flex flex-col justify-between shadow-sm border border-[#C5C6CD]/25">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="px-2 py-0.5 rounded bg-surface-container-highest text-on-surface text-[10px] font-bold font-mono">
                    {slide.phase1?.weeks || 'WEEKS 1 - 2'}
                  </span>
                  <span className="text-[10px] text-on-surface-variant font-medium">Pre-Ramadan</span>
                </div>
                <h3 className="text-xs md:text-sm font-bold text-on-surface mb-1">
                  {slide.phase1?.name || 'Phase 1: Teaser & Flavor Discovery'}
                </h3>
                <p className="text-[11px] text-on-surface-variant leading-relaxed">
                  {slide.phase1?.desc || 'Build anticipation with WHI host teaser announcements, recipe e-book countdowns, and early pantry stocking.'}
                </p>
              </div>
              <div className="mt-3 pt-2 border-t border-[#C5C6CD]/25 flex flex-col gap-1 text-[10px] text-on-surface">
                <span className="flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-secondary"></span> 2x WHI Announcement Spots
                </span>
                <span className="flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-secondary"></span> SirapLimau Festive Guide Live
                </span>
              </div>
            </div>

            {/* Phase 2 (Peak Surge) */}
            <div className="p-4 rounded-xl bg-primary-container text-white flex flex-col justify-between shadow-md border border-white/10">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="px-2 py-0.5 rounded bg-secondary text-white text-[10px] font-bold font-mono shadow-sm">
                    {slide.phase2?.weeks || 'WEEKS 3 - 6'}
                  </span>
                  <span className="text-[10px] text-tertiary-fixed font-bold tracking-wider">PEAK SURGE</span>
                </div>
                <h3 className="text-xs md:text-sm font-bold text-white mb-1">
                  {slide.phase2?.name || 'Phase 2: Ramadan Live Kitchen Surge'}
                </h3>
                <p className="text-[11px] text-on-primary-container leading-relaxed">
                  {slide.phase2?.desc || 'Peak culinary momentum with twice-weekly live "Dapur Kasih" cooking demos on WHI and daily Aston banners.'}
                </p>
              </div>
              <div className="mt-3 pt-2 border-t border-white/15 flex flex-col gap-1 text-[10px] text-white">
                <span className="flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-secondary"></span> 8x Live WHI Demo Segments
                </span>
                <span className="flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-secondary"></span> 40x Live Aston In-Show Overlays
                </span>
              </div>
            </div>

            {/* Phase 3 */}
            <div className="p-4 rounded-xl bg-surface-container-low flex flex-col justify-between shadow-sm border border-[#C5C6CD]/25">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="px-2 py-0.5 rounded bg-surface-container-highest text-on-surface text-[10px] font-bold font-mono">
                    {slide.phase3?.weeks || 'WEEKS 7 - 8'}
                  </span>
                  <span className="text-[10px] text-on-surface-variant font-medium">Syawal &amp; Raya</span>
                </div>
                <h3 className="text-xs md:text-sm font-bold text-on-surface mb-1">
                  {slide.phase3?.name || 'Phase 3: Syawal Open House Specials'}
                </h3>
                <p className="text-[11px] text-on-surface-variant leading-relaxed">
                  {slide.phase3?.desc || 'Shift focus to Raya cookies, open-house dessert platters, and festive drinks replenishment.'}
                </p>
              </div>
              <div className="mt-3 pt-2 border-t border-[#C5C6CD]/25 flex flex-col gap-1 text-[10px] text-on-surface">
                <span className="flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-secondary"></span> 2x Raya Finale Live Segments
                </span>
                <span className="flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-secondary"></span> TikTok Shoppable Retargeting
                </span>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between text-on-surface-variant text-[11px] pt-2 border-t border-surface-container font-medium">
            <span>Timeline Synchronization: Broadcast airings aligned directly with peak supermarket retail hours</span>
            <span>Flight Window: Ramadan 1446H</span>
          </div>
        </div>
      )}

      {/* ============================================================ */}
      {/* SLIDE 7: Commercial Packages */}
      {/* ============================================================ */}
      {slide.type === 'commercial' && (
        <div className="w-full h-full p-6 md:p-10 flex flex-col justify-between bg-surface-container-lowest text-on-surface relative overflow-hidden">
          {/* Top Banner */}
          <div className="flex items-center justify-between border-b border-surface-container pb-2.5">
            <div>
              <span className="text-[10px] font-bold text-secondary uppercase tracking-wider block">
                {slide.kicker || 'Slide 07: Commercial Offer'}
              </span>
              <h2
                contentEditable={isEditing}
                suppressContentEditableWarning
                onBlur={(e) => handleTextChange('title', e.currentTarget.textContent || '')}
                className={`font-display text-xl md:text-2xl font-bold text-on-surface ${editableClass}`}
              >
                {slide.title}
              </h2>
            </div>
            <span className="px-2.5 py-1 rounded bg-surface-container text-on-surface-variant text-[11px] font-medium border border-[#C5C6CD]/25">
              Valid for 14 Days
            </span>
          </div>

          {/* 3 Tier Pricing Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 my-auto items-stretch">
            {/* Package B */}
            <div className="p-3.5 rounded-xl bg-surface-container-low flex flex-col justify-between shadow-sm border border-[#C5C6CD]/25">
              <div>
                <span className="text-[10px] font-bold text-on-surface-variant uppercase">Package B</span>
                <h3 className="text-xs md:text-[13px] font-bold text-on-surface mt-0.5">
                  {slide.tierB?.name || 'Core TV3 Broadcast Dominance'}
                </h3>
                <div className="my-2">
                  <span className="font-display text-xl md:text-2xl font-black text-on-surface block font-mono">
                    {slide.tierB?.price || 'RM 220,000'}
                  </span>
                  <span className="text-[10px] text-on-surface-variant font-medium">Linear TV Centric</span>
                </div>
                <ul className="flex flex-col gap-1 text-[11px] text-on-surface-variant">
                  {slide.tierB?.items?.map((item, idx) => (
                    <li key={idx} className="flex items-center gap-1.5">
                      <span className="material-symbols-outlined text-[14px] text-on-surface">check</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-3 p-1.5 rounded bg-surface-container text-center text-[10px] font-semibold text-on-surface">
                {slide.tierB?.estReach || 'Est. Reach: 8.8M Impressions'}
              </div>
            </div>

            {/* Package A (Recommended / Featured) */}
            <div className="p-4 rounded-xl bg-primary-container text-white flex flex-col justify-between shadow-xl relative scale-[1.03] border-2 border-secondary">
              <div className="absolute -top-3 right-4 px-2 py-0.5 rounded bg-secondary text-white text-[10px] font-bold uppercase tracking-wider shadow">
                Recommended Tier
              </div>
              <div>
                <span className="text-[10px] font-bold text-tertiary-fixed uppercase">Package A (Complete)</span>
                <h3 className="text-xs md:text-[13px] font-bold text-white mt-0.5">
                  {slide.tierA?.name || 'Full 360° Broadcast & Digital Impact'}
                </h3>
                <div className="my-2">
                  <span className="font-display text-2xl md:text-3xl font-black text-secondary block font-mono">
                    {slide.tierA?.price || 'RM 350,000'}
                  </span>
                  <span className="text-[10px] text-on-primary-container font-medium">Complete Omnichannel Solution</span>
                </div>
                <ul className="flex flex-col gap-1 text-[11px] text-surface-variant">
                  {slide.tierA?.items?.map((item, idx) => (
                    <li key={idx} className="flex items-center gap-1.5">
                      <span className="material-symbols-outlined text-[14px] text-secondary">check_circle</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-3 p-1.5 rounded bg-secondary text-white text-center text-[10px] font-bold shadow-sm">
                {slide.tierA?.estReach || 'Max Reach: 14.5M Impressions (+18% Overdelivery)'}
              </div>
            </div>

            {/* Package C */}
            <div className="p-3.5 rounded-xl bg-surface-container-low flex flex-col justify-between shadow-sm border border-[#C5C6CD]/25">
              <div>
                <span className="text-[10px] font-bold text-on-surface-variant uppercase">Package C</span>
                <h3 className="text-xs md:text-[13px] font-bold text-on-surface mt-0.5">
                  {slide.tierC?.name || 'Digital & Social Amplification'}
                </h3>
                <div className="my-2">
                  <span className="font-display text-xl md:text-2xl font-black text-on-surface block font-mono">
                    {slide.tierC?.price || 'RM 140,000'}
                  </span>
                  <span className="text-[10px] text-on-surface-variant font-medium">Social &amp; Editorial Focus</span>
                </div>
                <ul className="flex flex-col gap-1 text-[11px] text-on-surface-variant">
                  {slide.tierC?.items?.map((item, idx) => (
                    <li key={idx} className="flex items-center gap-1.5">
                      <span className="material-symbols-outlined text-[14px] text-on-surface">check</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-3 p-1.5 rounded bg-surface-container text-center text-[10px] font-semibold text-on-surface">
                {slide.tierC?.estReach || 'Est. Reach: 4.8M Impressions'}
              </div>
            </div>
          </div>

          {/* Action strip */}
          <div className="p-2.5 rounded-lg bg-surface-container flex flex-wrap items-center justify-between gap-2 border border-[#C5C6CD]/25">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-full bg-secondary flex items-center justify-center text-white shrink-0">
                <span className="material-symbols-outlined text-[16px]">verified_user</span>
              </div>
              <div className="flex flex-col">
                <span className="text-xs font-bold text-on-surface">Action Required: Slot Reservation Lock</span>
                <span className="text-[10px] text-on-surface-variant">
                  Confirm booking with Media Prima Omnia Commercial Strategist by 15th of the month to guarantee live slots.
                </span>
              </div>
            </div>
            <button
              onClick={() => alert(`Confirmed booking reservation for ${slide.tierA?.price || 'RM 350,000'} tier!`)}
              className="h-7 px-3 bg-primary-container text-white hover:bg-black text-[11px] font-bold rounded shadow-sm transition-all"
            >
              Confirm Slot Booking
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
