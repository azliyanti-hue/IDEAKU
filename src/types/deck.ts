export type WorkspaceView = 'slide-studio' | 'input-generator' | 'deck-library' | 'rate-cards';

export interface SlideMetadata {
  targetAudience: string;
  primaryChannel: string;
  commercialWindow: string;
  code: string;
}

export interface CreativeCard {
  num: string;
  label: string;
  title: string;
  desc: string;
  foot: string;
}

export interface DeliverableRow {
  medium: string;
  entitlement: string;
  freq: string;
  target: string;
  reach: string;
}

export interface PhaseTimeline {
  weeks: string;
  name: string;
  desc: string;
}

export interface PackageTier {
  name: string;
  price: string;
  label: string;
  items: string[];
  estReach: string;
  isRecommended?: boolean;
}

export interface SlideData {
  id: number;
  type: 'title' | 'diagnostics' | 'program' | 'creative' | 'deliverables' | 'timeline' | 'commercial';
  navTitle: string;
  navSubtitle: string;
  badge?: string;
  kicker?: string;
  title: string;
  subtitle?: string;
  // Slide 1 Title
  metadata?: SlideMetadata;
  // Slide 2 Diagnostics
  col1Title?: string;
  col1Body?: string;
  col1Foot?: string;
  col2Metric?: string;
  col2MetricLabel?: string;
  col2Body?: string;
  col3Title?: string;
  col3Body?: string;
  col3Foot?: string;
  // Slide 3 Program Spotlight
  slotInfo?: string;
  programName?: string;
  programDesc?: string;
  monthlyReach?: string;
  channelShare?: string;
  stat1Label?: string;
  stat1Val?: string;
  stat2Label?: string;
  stat2Val?: string;
  stat3Label?: string;
  stat3Val?: string;
  hostName?: string;
  hostDesc?: string;
  // Slide 4 Creative
  cards?: CreativeCard[];
  // Slide 5 Deliverables
  grossImpressions?: string;
  table?: DeliverableRow[];
  valueEntitlement?: string;
  valueDesc?: string;
  // Slide 6 Timeline
  phase1?: PhaseTimeline;
  phase2?: PhaseTimeline;
  phase3?: PhaseTimeline;
  // Slide 7 Commercial
  tierA?: PackageTier;
  tierB?: PackageTier;
  tierC?: PackageTier;
}

export interface PitchDeck {
  id: string;
  ownerId?: string;
  clientName: string;
  campaignName: string;
  briefNotes: string;
  channel: string;
  slot: string;
  budgetTier: string;
  targetKpi: string;
  recommendedTier: string;
  grossImpressions: string;
  updatedAt: string;
  slides: SlideData[];
}
