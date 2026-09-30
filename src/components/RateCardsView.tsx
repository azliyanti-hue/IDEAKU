import React, { useState } from 'react';

interface RateItem {
  channel: string;
  slot: string;
  airtime: string;
  format: string;
  rateMYR: number;
  avgRating: string;
  demographic: string;
}

const INVENTORY_RATE_CARDS: RateItem[] = [
  { channel: 'TV3', slot: 'Wanita Hari Ini (WHI)', airtime: 'Mon - Fri 12:00 PM - 1:00 PM', format: 'Live Cooking 5-Min Integration', rateMYR: 18000, avgRating: '3.8 TVR', demographic: 'Malay Female 25-49' },
  { channel: 'TV3', slot: 'Wanita Hari Ini (WHI)', airtime: 'Mon - Fri 12:00 PM - 1:00 PM', format: 'In-Show Aston Commercial (10s)', rateMYR: 3500, avgRating: '3.8 TVR', demographic: 'Malay Daytime Homemakers' },
  { channel: 'TV3', slot: 'Malaysia Hari Ini (MHI)', airtime: 'Mon - Fri 7:00 AM - 8:30 AM', format: 'Live Morning Interview / Demo (7-Min)', rateMYR: 19500, avgRating: '3.2 TVR', demographic: 'Urban Families & Working Adults' },
  { channel: 'TV3', slot: 'Malaysia Hari Ini (MHI)', airtime: 'Mon - Fri 7:00 AM - 8:30 AM', format: 'Aston Commercial Overlay (10s)', rateMYR: 3200, avgRating: '3.2 TVR', demographic: 'Morning Commuters' },
  { channel: 'TV3', slot: 'Buletin Utama', airtime: 'Daily 8:00 PM - 9:00 PM', format: 'Opening / Closing Title Billboard (15s)', rateMYR: 28000, avgRating: '8.4 TVR', demographic: 'National P25-54 Decision Makers' },
  { channel: 'TV3', slot: 'Buletin Utama', airtime: 'Daily 8:00 PM - 9:00 PM', format: 'First-in-Break 30s Commercial Spot', rateMYR: 22000, avgRating: '8.4 TVR', demographic: 'National Mass Audience' },
  { channel: 'TV3', slot: 'Melodi', airtime: 'Sunday 12:30 PM - 2:00 PM', format: 'In-Show Host Segment Mention (3-Min)', rateMYR: 24000, avgRating: '6.1 TVR', demographic: 'Youth & Young Families P15-39' },
  { channel: 'TV9', slot: 'Keluarga Kita', airtime: 'Mon - Thu 6:00 PM - 7:00 PM', format: 'Co-Branded Vignette (60s)', rateMYR: 8500, avgRating: '2.1 TVR', demographic: 'Family & Children Cohort' },
  { channel: '8TV', slot: 'Mandarin News', airtime: 'Daily 8:00 PM - 9:00 PM', format: 'Prime 30s Commercial Spot', rateMYR: 14000, avgRating: '4.2 TVR', demographic: 'Chinese Urban High-Income' },
  { channel: 'Tonton', slot: 'Live Stream Video', airtime: '24/7 Digital Simulcast', format: 'Non-Skippable Pre-Roll (15s)', rateMYR: 35, avgRating: '92% VTR', demographic: 'Mobile Connected Streamers' },
  { channel: 'SirapLimau', slot: 'Food & Parenting Portal', airtime: 'Always On Digital Editorial', format: 'Sponsored Recipe Advertorial + Social Post', rateMYR: 12000, avgRating: '150k PV', demographic: 'Modern Malay Parents 25-40' },
  { channel: 'Audio+ / Hot FM', slot: 'Bekpes Hot (Morning Drive)', airtime: 'Mon - Fri 6:00 AM - 10:00 AM', format: 'Live On-Air Announcer Mention (45s)', rateMYR: 4500, avgRating: '3.8M Cume', demographic: 'Daily Motorists & Commuters' }
];

export const RateCardsView: React.FC = () => {
  const [filterChannel, setFilterChannel] = useState('ALL');
  const [calcBudget, setCalcBudget] = useState(350000);
  const [linearRatio, setLinearRatio] = useState(70); // 70% linear, 30% digital

  const filteredRates = filterChannel === 'ALL'
    ? INVENTORY_RATE_CARDS
    : INVENTORY_RATE_CARDS.filter((r) => r.channel.includes(filterChannel));

  // Dynamic calculations
  const linearSpend = calcBudget * (linearRatio / 100);
  const digitalSpend = calcBudget * (1 - linearRatio / 100);
  const estLinearGRP = Math.round((linearSpend / 2400));
  const estDigitalImpressions = Math.round((digitalSpend / 0.024)); // approx RM 24 CPM
  const estLinearReach = Math.round(estLinearGRP * 45000);
  const totalGrossReach = estLinearReach + estDigitalImpressions;
  const blendedCPM = ((calcBudget / totalGrossReach) * 1000).toFixed(2);

  return (
    <div className="w-full flex flex-col gap-6 animate-fadeIn pb-12">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 bg-surface-container-lowest p-6 rounded-xl border border-[#C5C6CD]/25 shadow-sm">
        <div>
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-secondary text-[24px]">receipt_long</span>
            <h1 className="font-display text-xl font-bold text-on-surface">
              Media Prima Omnia Rate Cards &amp; Inventory Master
            </h1>
          </div>
          <p className="text-xs text-on-surface-variant mt-1">
            Authoritative benchmark rate cards for linear TV (TV3, TV9, 8TV), digital portals (SirapLimau, Seismik), streaming (Tonton), and radio (Audio+).
          </p>
        </div>

        {/* Channel Filters */}
        <div className="flex items-center gap-1.5 p-1 rounded-lg bg-surface-container border border-[#C5C6CD]/20">
          {['ALL', 'TV3', 'TV9', '8TV', 'Tonton', 'SirapLimau', 'Audio+'].map((ch) => (
            <button
              key={ch}
              onClick={() => setFilterChannel(ch)}
              className={`px-3 py-1 rounded text-xs font-semibold transition-colors ${
                filterChannel === ch
                  ? 'bg-secondary text-white shadow-sm'
                  : 'text-on-surface-variant hover:text-on-surface'
              }`}
            >
              {ch}
            </button>
          ))}
        </div>
      </div>

      {/* Interactive CPM & Flight Allocation Calculator */}
      <div className="p-5 rounded-xl bg-primary-container text-white border border-white/10 shadow-md">
        <div className="flex items-center justify-between mb-4 border-b border-white/10 pb-3">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-secondary text-[22px]">calculate</span>
            <span className="font-display text-sm font-bold text-white">
              Omnichannel Campaign Flight &amp; GRP Synthesizer
            </span>
          </div>
          <span className="text-xs text-tertiary-fixed font-mono font-semibold">
            Blended CPM: RM {blendedCPM}
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
          <div>
            <label className="text-[10px] text-surface-variant uppercase font-bold block mb-1">
              Campaign Budget (MYR)
            </label>
            <div className="relative">
              <span className="absolute left-3 top-2 text-xs font-bold text-on-surface-variant">RM</span>
              <input
                type="number"
                step="10000"
                value={calcBudget}
                onChange={(e) => setCalcBudget(Number(e.target.value) || 0)}
                className="w-full h-9 pl-9 pr-3 rounded bg-white text-black text-xs font-bold font-mono focus:outline-none focus:ring-2 focus:ring-secondary"
              />
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center text-[10px] text-surface-variant uppercase font-bold mb-1">
              <span>Linear TV / Digital Split</span>
              <span className="text-tertiary-fixed font-mono">{linearRatio}% TV / {100 - linearRatio}% Digital</span>
            </div>
            <input
              type="range"
              min="30"
              max="90"
              value={linearRatio}
              onChange={(e) => setLinearRatio(Number(e.target.value))}
              className="w-full accent-secondary cursor-pointer"
            />
          </div>

          <div className="p-3 rounded-lg bg-white/10 border border-white/10">
            <span className="text-[10px] text-surface-variant uppercase block">Est. Linear TV GRP</span>
            <span className="font-display text-xl font-bold text-secondary font-mono">
              {estLinearGRP} GRPs
            </span>
            <span className="text-[10px] text-white/70 block mt-0.5">
              ~{(estLinearReach / 1000000).toFixed(1)}M Linear Viewers
            </span>
          </div>

          <div className="p-3 rounded-lg bg-white/10 border border-white/10">
            <span className="text-[10px] text-surface-variant uppercase block">Est. Gross Impressions</span>
            <span className="font-display text-xl font-bold text-tertiary-fixed font-mono">
              {(totalGrossReach / 1000000).toFixed(1)}M Total Reach
            </span>
            <span className="text-[10px] text-white/70 block mt-0.5">
              Across TV3 + Digital Echo
            </span>
          </div>
        </div>
      </div>

      {/* Rate Cards Table */}
      <div className="bg-surface-container-lowest rounded-xl border border-[#C5C6CD]/25 shadow-sm overflow-hidden">
        <div className="px-6 py-3 bg-surface-container-low border-b border-[#C5C6CD]/20 flex items-center justify-between">
          <span className="text-xs font-bold text-on-surface uppercase tracking-wider">
            Active Inventory Rates (Q1-Q2 2025 Standard Commercial)
          </span>
          <span className="text-xs text-on-surface-variant font-medium">
            Showing {filteredRates.length} Inventory Slots
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="bg-surface-container text-on-surface-variant text-[10px] font-bold uppercase border-b border-[#C5C6CD]/20">
                <th className="py-2.5 px-4">Channel</th>
                <th className="py-2.5 px-4">Flagship Program / Property</th>
                <th className="py-2.5 px-4">Airtime / Slot</th>
                <th className="py-2.5 px-4">Commercial Format</th>
                <th className="py-2.5 px-4">Audience Benchmark</th>
                <th className="py-2.5 px-4 text-right">Published Rate (MYR)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#C5C6CD]/20 text-[11px]">
              {filteredRates.map((r, idx) => (
                <tr key={idx} className="hover:bg-surface-container/60 transition-colors">
                  <td className="py-3 px-4 font-bold text-on-surface">
                    <span className="px-2 py-0.5 rounded bg-surface-container text-xs font-bold">
                      {r.channel}
                    </span>
                  </td>
                  <td className="py-3 px-4 font-bold text-on-surface">{r.slot}</td>
                  <td className="py-3 px-4 text-on-surface-variant">{r.airtime}</td>
                  <td className="py-3 px-4 font-medium text-secondary">{r.format}</td>
                  <td className="py-3 px-4 text-on-surface-variant">
                    <span className="font-bold text-on-surface mr-1">{r.avgRating}</span>
                    <span>({r.demographic})</span>
                  </td>
                  <td className="py-3 px-4 font-bold text-right font-mono text-xs text-on-surface">
                    {r.rateMYR > 100 ? `RM ${r.rateMYR.toLocaleString()}` : `RM ${r.rateMYR} CPM`}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
