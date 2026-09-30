import { PitchDeck } from '../types/deck';

export const INITIAL_DECKS: PitchDeck[] = [
  {
    id: 'tv9-nlko-famili',
    clientName: 'Dutch Lady Malaysia',
    campaignName: 'TV9 Nasi Lemak Kopi O & Keluarga Kita Sponsorship',
    briefNotes: 'Client: Dutch Lady / Yeo\'s. Goal: Drive wholesome family nutrition and weekend morning breakfast bonding. Target: Young Malay families with children (P20-40) and active kids. Preferred channel: TV9. Slot: Nasi Lemak Kopi O (NLKO) Weekend Morning & Keluarga Kita 6:00 PM. Key message: Ceria & Sihat Bersama TV9.',
    channel: 'TV9',
    slot: 'NLKO',
    budgetTier: '220k',
    targetKpi: 'family',
    recommendedTier: 'RM 220,000',
    grossImpressions: '9.8M Est.',
    updatedAt: new Date().toISOString(),
    slides: [
      {
        id: 1,
        type: 'title',
        navTitle: 'Title & Concept Hook',
        navSubtitle: 'Ceria Famili Bersama TV9',
        badge: 'TV9 Family Broadcast Sponsorship',
        kicker: 'Family & Morning Nutrition Hook',
        title: 'Ceria & Sihat: Kempen Sarapan Famili Bersama Nasi Lemak Kopi O TV9',
        subtitle: 'A dedicated family broadcast sponsorship bridging weekend morning talk show authority on NLKO with evening prime family co-viewing on TV9.',
        metadata: {
          targetAudience: 'Young Malay Families, Parents 22–42 & Schooling Children',
          primaryChannel: 'TV9 (Nasi Lemak Kopi O & Keluarga Kita)',
          commercialWindow: 'Q1-Q2 (School Term & Festive Season 2025)',
          code: 'MP-TV9-DUTCH25'
        }
      },
      {
        id: 2,
        type: 'diagnostics',
        navTitle: 'Strategic Challenge',
        navSubtitle: 'Family Co-Viewing & Nutrition',
        kicker: 'Slide 02: Strategic Diagnostics',
        title: 'Capturing High-Affinity Family Moments on TV9',
        col1Title: 'The Strategic Hurdle',
        col1Body: 'Reaching young millennial parents during relaxed home leisure hours where dietary choices for children are actively formed and co-decided.',
        col1Foot: 'Risk: Fragmented attention across multiple isolated mobile devices.',
        col2Metric: '78%',
        col2MetricLabel: 'TV9 Family Co-Viewing Index',
        col2Body: 'TV9 commands one of the highest parent-child simultaneous screen viewing ratios in Malaysian free-to-air broadcast television.',
        col3Title: 'The Omnia Solution',
        col3Body: 'Engaging host live product demonstrations on Nasi Lemak Kopi O paired with branded family animation capsules during TV9 kids/family animation blocks.',
        col3Foot: 'Result: High brand affection and immediate grocery basket inclusion.'
      },
      {
        id: 3,
        type: 'program',
        navTitle: 'Program Spotlight: NLKO',
        navSubtitle: 'Nasi Lemak Kopi O (TV9)',
        kicker: 'Slide 03: Inventory Anchor',
        title: 'Program Spotlight: Nasi Lemak Kopi O (TV9)',
        slotInfo: 'LIVE SAT - SUN | 8:30 AM - 10:30 AM',
        programName: 'Nasi Lemak Kopi O (TV9)',
        programDesc: 'TV9’s signature weekend morning family magazine talkshow delivering heartwarming lifestyle, cooking, and community conversations.',
        monthlyReach: '2.1 Million Viewers',
        channelShare: '54% Weekend Morning Share',
        stat1Label: 'Audience Cohort',
        stat1Val: '81% Family Unit',
        stat2Label: 'Core Demographic',
        stat2Val: 'Parents & Kids P18-45',
        stat3Label: 'Household Income',
        stat3Val: 'MHI RM3.5k - RM7.5k',
        hostName: 'Fizo Omar & Fatin Hamimah',
        hostDesc: 'Warm, approachable hosts who connect naturally with Malaysian families, sharing relatable parenting moments, breakfast recipes, and healthy living tips.'
      },
      {
        id: 4,
        type: 'creative',
        navTitle: 'Creative Integrations',
        navSubtitle: 'NLKO Kitchen & Host Tastings',
        kicker: 'Slide 04: The Creative Concept',
        title: "Creative Idea: 'Dapur Ceria NLKO' Family Integration",
        cards: [
          {
            num: '1',
            label: 'Weekend Live Cooking',
            title: 'NLKO Breakfast Demo Segment',
            desc: '6-minute live morning cooking demo where guest nutritionists craft easy breakfast recipes with hosts on set.',
            foot: '10 Dedicated Live Segments'
          },
          {
            num: '2',
            label: 'In-Show Lower Thirds',
            title: 'Keluarga Sihat Aston Banners',
            desc: 'High-visibility animated lower-third Astons with QR code leading to family contest and nutritional recipe e-book.',
            foot: '50x Aston Commercial Overlays'
          },
          {
            num: '3',
            label: 'Evening Family Vignette',
            title: '60s "Kapsul Famili TV9"',
            desc: 'Heartwarming 60-second co-branded capsules broadcast before prime family drama slots spotlighting wholesome daily habits.',
            foot: '24x Prime Vignette Airings'
          },
          {
            num: '4',
            label: 'Digital Family Hub',
            title: 'SirapLimau Family Content Hub',
            desc: 'Parenting articles and bite-sized family breakfast video reels distributed across SirapLimau and TV9 social channels.',
            foot: '6 Branded Reels + 2 Articles'
          }
        ]
      },
      {
        id: 5,
        type: 'deliverables',
        navTitle: 'Tactical Deliverables',
        navSubtitle: 'TV9 Inventory & 9.8M Reach',
        kicker: 'Slide 05: Inventory Schedule',
        title: 'Tactical Deliverables & Guaranteed Impressions',
        grossImpressions: '9.8M Impressions',
        table: [
          { medium: 'TV9 Linear (NLKO Live)', entitlement: '6-Minute Live Morning Cooking & Tasting Demo', freq: '10 Episodes', target: 'National Family Cohort', reach: '3,800,000' },
          { medium: 'TV9 Linear (NLKO)', entitlement: 'In-Show Aston Commercial Overlays (10s)', freq: '50 Overlays', target: 'Weekend Family Viewers', reach: '3,200,000' },
          { medium: 'TV9 Prime Access', entitlement: '60-Second "Kapsul Famili" Story Vignettes', freq: '24 Airings', target: 'Evening Family Co-Viewers', reach: '1,800,000' },
          { medium: 'Digital (SirapLimau / TV9 Social)', entitlement: 'Sponsored Family Parenting Articles & Reels', freq: '6 Video Reels', target: 'Young Parents P20-38', reach: '1,000,000' }
        ],
        valueEntitlement: 'NLKO Breakfast Set Branding Takeover',
        valueDesc: 'Custom product placement on the host coffee table and kitchen demo counter for the entire 8-week flight.'
      },
      {
        id: 6,
        type: 'timeline',
        navTitle: '3-Phase Flight Timeline',
        navSubtitle: 'Weekend Morning Momentum',
        kicker: 'Slide 06: Execution Roadmap',
        title: '3-Phase Family Campaign Flighting on TV9',
        phase1: {
          weeks: 'WEEKS 1 - 2',
          name: 'Phase 1: Morning Routine Discovery',
          desc: 'Kick off with host teasers on NLKO, family breakfast trivia, and SirapLimau editorial launch on healthy childhood morning habits.'
        },
        phase2: {
          weeks: 'WEEKS 3 - 6',
          name: 'Phase 2: Live Kitchen & Contest Surge',
          desc: 'Twice-weekly live breakfast demos, viewer recipe contest callouts on air, and daily Aston popups driving supermarket retail purchase.'
        },
        phase3: {
          weeks: 'WEEKS 7 - 8',
          name: 'Phase 3: Family Celebration Finale',
          desc: 'Announcement of contest winning family live in NLKO studio with special hamper presentation and festive school holiday push.'
        }
      },
      {
        id: 7,
        type: 'commercial',
        navTitle: 'Commercial Packages',
        navSubtitle: 'TV9 Value Packages & CTA',
        kicker: 'Slide 07: Commercial Offer',
        title: 'Investment Packages & Commercial Reservation',
        tierA: {
          name: 'Package A (Full Family 360°)',
          price: 'RM 220,000',
          label: 'Complete NLKO & Prime Family Surge',
          isRecommended: true,
          items: [
            '10x Live NLKO Breakfast Segments (6-Min)',
            '50x Aston In-Show Commercial Overlays',
            '24x "Kapsul Famili" 60s Vignettes',
            '6x Social Reels + 2x SirapLimau Articles',
            'Permanent NLKO Studio Coffee Table Placement'
          ],
          estReach: 'Max Reach: 9.8M Impressions (+15% Overdelivery)'
        },
        tierB: {
          name: 'Package B (NLKO Focus)',
          price: 'RM 150,000',
          label: 'Weekend Live Show Dominance',
          items: [
            '8x Live NLKO Breakfast Segments',
            '35x Aston In-Show Overlays',
            'NLKO Host Table Placements',
            'No Prime Vignette Production'
          ],
          estReach: 'Est. Reach: 6.4M Impressions'
        },
        tierC: {
          name: 'Package C (Vignettes & Digital)',
          price: 'RM 95,000',
          label: 'Brand Storytelling & Social',
          items: [
            '16x "Kapsul Famili" 60s Vignettes',
            '20x Aston Banners on TV9',
            '4x Social Reels (TikTok & IG)',
            '1x SirapLimau Sponsored Article'
          ],
          estReach: 'Est. Reach: 3.5M Impressions'
        }
      }
    ]
  },
  {
    id: 'fn-susu-whi',
    clientName: 'F&N Susu',
    campaignName: 'F&N Susu - WHI Sponsorship Pitch',
    briefNotes: 'Client: F&N Magnolia / Sweetened Condensed Milk. Goal: Reinforce culinary authority and Ramadan/Hari Raya morning prep. Target: Malay moms aged 25-45, household decision-makers. Preferred slot: Wanita Hari Ini (TV3) 12:00 PM slot + digital amplification on SirapLimau & Seismik. Budget guide: RM 350,000. Key message: Resipi Kasih Ibu Bersama F&N.',
    channel: 'TV3',
    slot: 'WHI',
    budgetTier: '350k',
    targetKpi: 'culinary',
    recommendedTier: 'RM 350,000',
    grossImpressions: '14.5M Est.',
    updatedAt: new Date().toISOString(),
    slides: [
      {
        id: 1,
        type: 'title',
        navTitle: 'Title & Concept Hook',
        navSubtitle: 'Ramadan & Raya Bersama F&N',
        badge: 'Broadcast Sponsorship',
        kicker: 'Hero Concept Hook',
        title: 'Resipi Kasih, Rasa Tradisi: Ramadan & Raya Bersama F&N Susu',
        subtitle: 'A 360° Broadcast & Digital Sponsorship Proposal for TV3 Wanita Hari Ini (WHI) to cement culinary dominance during prime festive prep.',
        metadata: {
          targetAudience: 'Malay Homemakers 25–45 & MHI Decision Makers',
          primaryChannel: 'TV3 (Wanita Hari Ini) + Omnia Network',
          commercialWindow: 'Q1-Q2 (Pre-Ramadan to Syawal 2025)',
          code: 'MP-WHI-FN25'
        }
      },
      {
        id: 2,
        type: 'diagnostics',
        navTitle: 'Strategic Challenge',
        navSubtitle: 'Dairy Modernization & Audience',
        kicker: 'Slide 02: Strategic Diagnostics',
        title: 'Client Challenge & Market Alignment',
        col1Title: 'The Strategic Hurdle',
        col1Body: 'Modernizing dairy culinary perception while defending traditional festive condensed & evaporated milk share against aggressive Ready-To-Drink (RTD) dairy substitutes.',
        col1Foot: 'Risk: Brand inertia in millennial home kitchens.',
        col2Metric: '84%',
        col2MetricLabel: 'Malay Household Daytime Index',
        col2Body: 'Malay homemakers actively rely on TV3 daytime broadcasts during festive planning windows for recipe credibility and brand trust.',
        col3Title: 'The Omnia Solution',
        col3Body: 'Seamless live culinary integration within Wanita Hari Ini (WHI), synchronized with bite-sized shortform TikTok & SirapLimau digital recipes that drive immediate supermarket cart action.',
        col3Foot: 'Result: Uncontested daytime share of voice.'
      },
      {
        id: 3,
        type: 'program',
        navTitle: 'Program Spotlight: WHI',
        navSubtitle: 'Wanita Hari Ini & Host Chemistry',
        kicker: 'Slide 03: Inventory Anchor',
        title: 'Program Spotlight: Wanita Hari Ini (WHI)',
        slotInfo: 'LIVE MON - FRI | 12:00 PM - 1:00 PM',
        programName: 'Wanita Hari Ini (WHI)',
        programDesc: 'Malaysia’s undisputed culinary & lifestyle daytime powerhouse for over two decades.',
        monthlyReach: '2.8 Million Viewers',
        channelShare: '62% Share',
        stat1Label: 'Audience Gender',
        stat1Val: '72% Female',
        stat2Label: 'Core Demographic',
        stat2Val: 'Malay P25-49',
        stat3Label: 'Household Income',
        stat3Val: 'MHI RM3k-RM7k',
        hostName: 'Fiza Sabjahan & Uyaina Arshad',
        hostDesc: 'Beloved maternal figures trusted by Malay households for authentic pantry recommendations, festive meal preparation, and everyday lifestyle guidance.'
      },
      {
        id: 4,
        type: 'creative',
        navTitle: 'Creative Integrations',
        navSubtitle: 'Dapur Kasih & Aston Overlays',
        kicker: 'Slide 04: The Creative Concept',
        title: "Creative Idea: 'Dapur Kasih F&N' Integration",
        cards: [
          {
            num: '1',
            label: 'Live Studio Cooking',
            title: '5-Min Live Demo Segment',
            desc: 'Celebrity guest chefs execute signature dessert & savoury recipes live in studio using F&N Susu Sejat & Pekat with hosts tasting on camera.',
            foot: '12 Dedicated Live Segments'
          },
          {
            num: '2',
            label: 'In-Show Graphic Popups',
            title: 'Aston Banners + QR Code',
            desc: 'High-visibility lower-third commercial Astons during peak talk segments driving instant scan-to-download for festive recipe e-book.',
            foot: '60x Aston Commercial Overlays'
          },
          {
            num: '3',
            label: 'Physical Studio Presence',
            title: 'Kitchen Set Branding',
            desc: 'Custom branded kitchen counter display, host aprons with F&N emblem, and stylized pantry shelf product placements across the 6-week flight.',
            foot: 'Permanent Studio Visibility'
          },
          {
            num: '4',
            label: 'Digital Amplification',
            title: 'SirapLimau & TikTok Echo',
            desc: 'Short-form snackable clips distributed across TV3 Malaysia TikTok, SirapLimau, and Seismik with direct shoppable links.',
            foot: '8 Branded Reels + 2 Articles'
          }
        ]
      },
      {
        id: 5,
        type: 'deliverables',
        navTitle: 'Tactical Deliverables',
        navSubtitle: 'Touchpoint Inventory & 14.5M Reach',
        kicker: 'Slide 05: Inventory Schedule',
        title: 'Tactical Deliverables & Guaranteed Impressions',
        grossImpressions: '14.5M Impressions',
        table: [
          { medium: 'TV3 Linear Live', entitlement: "5-Minute Live Cooking Segment ('Dapur Kasih')", freq: '12 Episodes', target: 'National Malay P25-49', reach: '5,400,000' },
          { medium: 'TV3 Linear Live', entitlement: 'In-Show Aston Commercial Overlays (10s each)', freq: '60 Overlays', target: 'WHI High-attention Live Viewers', reach: '4,800,000' },
          { medium: 'Digital (SirapLimau / Seismik)', entitlement: 'Branded Culinary Recipe Articles with Shoppable CTAs', freq: '2 Advertorials', target: 'Young Malay Families & Foodies', reach: '1,200,000' },
          { medium: 'Social (TV3 TikTok & IG)', entitlement: 'Culinary Highlights Reels & Host Shoutouts', freq: '8 Video Assets', target: 'Digital Mobile Audience 18-35', reach: '3,100,000' }
        ],
        valueEntitlement: 'Value Entitlement: F&N Studio Kitchen Takeover',
        valueDesc: 'Permanent physical logo visibility throughout full 6-week Ramadan broadcast cycle.'
      },
      {
        id: 6,
        type: 'timeline',
        navTitle: '3-Phase Flight Timeline',
        navSubtitle: 'Teaser > Ramadan > Syawal Surge',
        kicker: 'Slide 06: Execution Roadmap',
        title: '3-Phase Campaign Timeline & Flighting',
        phase1: {
          weeks: 'WEEKS 1 - 2',
          name: 'Phase 1: Teaser & Flavor Discovery',
          desc: 'Build anticipation with WHI host teaser announcements, recipe e-book countdowns, and social reels encouraging early pantry stocking for Ramadan.'
        },
        phase2: {
          weeks: 'WEEKS 3 - 6',
          name: 'Phase 2: Ramadan Live Kitchen Surge',
          desc: 'Peak culinary momentum with twice-weekly live "Dapur Kasih" cooking demos on WHI, daily Aston pop-up banners, and interactive audience recipe contests.'
        },
        phase3: {
          weeks: 'WEEKS 7 - 8',
          name: 'Phase 3: Syawal Open House Specials',
          desc: 'Shift focus to Raya cookies, open-house dessert platters, and festive drinks. Retail drive encouraging replenishment during peak open house visits.'
        }
      },
      {
        id: 7,
        type: 'commercial',
        navTitle: 'Commercial Packages',
        navSubtitle: 'Tier Comparisons & Booking CTA',
        kicker: 'Slide 07: Commercial Offer',
        title: 'Investment Packages & Next Steps',
        tierA: {
          name: 'Package A (Complete)',
          price: 'RM 350,000',
          label: 'Full 360° Broadcast & Digital Impact',
          isRecommended: true,
          items: [
            '12x Live WHI Demo Segments (Celebrity Chef)',
            '60x Aston Commercial Overlays',
            'Full Studio Takeover & Branded Aprons',
            '8x Social Reels + 2x SirapLimau Articles'
          ],
          estReach: 'Max Reach: 14.5M Impressions (+18% Overdelivery)'
        },
        tierB: {
          name: 'Package B',
          price: 'RM 220,000',
          label: 'Core TV3 Broadcast Dominance',
          items: [
            '8x Live WHI Demo Segments',
            '35x Aston In-Show Overlays',
            'TV3 Studio Counter Placements',
            'No Digital Omnia Amplification'
          ],
          estReach: 'Est. Reach: 8.8M Impressions'
        },
        tierC: {
          name: 'Package C',
          price: 'RM 140,000',
          label: 'Digital & Social Amplification',
          items: [
            '4x WHI Guest Appearances',
            '15x Aston Banners',
            '4x Social Reels (TikTok & IG)',
            '1x SirapLimau Sponsored Article'
          ],
          estReach: 'Est. Reach: 4.8M Impressions'
        }
      }
    ]
  },
  {
    id: 'milo-sukan-sea',
    clientName: 'Milo Malaysia',
    campaignName: 'Milo - TV3 Sukan Sea Mega Package',
    briefNotes: 'Client: Milo (Nestle Malaysia). Goal: Reignite "Tenaga Untuk Juara" school term and morning breakfast campaign. Target: Active families, parents aged 28-50 with schooling children. Slot: Malaysia Hari Ini (MHI) 7:00 AM breakfast live crosses + Hot FM morning drive shoutouts + Audio+ podcast sponsorship. Budget: RM 450,000. Key message: Sarapan Bertenaga Bersama Milo.',
    channel: 'Omnia-360',
    slot: 'MHI',
    budgetTier: '350k',
    targetKpi: 'breakfast',
    recommendedTier: 'RM 450,000',
    grossImpressions: '18.2M Est.',
    updatedAt: new Date().toISOString(),
    slides: [
      {
        id: 1,
        type: 'title',
        navTitle: 'Title & Concept Hook',
        navSubtitle: 'Sarapan Juara Bersama Milo & MHI',
        badge: 'Multi-Network Broadcast Sponsorship',
        kicker: 'Morning Energy Anchor Hook',
        title: 'Sarapan Juara: Kempen Tenaga Pagi Bersama Milo & Malaysia Hari Ini (MHI)',
        subtitle: 'A high-impact 360° breakfast dominance flight across TV3 MHI, Hot FM morning drive, and Audio+ to champion active Malaysian families.',
        metadata: {
          targetAudience: 'Active Families & Parents 28–50 with Schooling Children',
          primaryChannel: 'TV3 (Malaysia Hari Ini) + Hot FM + Audio+',
          commercialWindow: 'Q1-Q2 (Back to School & Sea Games Surge 2025)',
          code: 'MP-MHI-MILO25'
        }
      },
      {
        id: 2,
        type: 'diagnostics',
        navTitle: 'Strategic Challenge',
        navSubtitle: 'Morning Energy & Active Living',
        kicker: 'Slide 02: Strategic Diagnostics',
        title: 'Defending Breakfast Leadership & Energy Perception',
        col1Title: 'The Strategic Hurdle',
        col1Body: 'Reigniting emotional urgency around balanced morning breakfast nutrition while defending chocolate malt dominance against RTD smoothies and fast-food morning bundles.',
        col1Foot: 'Risk: Morning meal skipping among urban school-going youths.',
        col2Metric: '89%',
        col2MetricLabel: 'Morning Family Breakfast Reach',
        col2Body: '7:00 AM - 8:30 AM is peak simultaneous viewing & listening time for parents and children gearing up for school and morning commute.',
        col3Title: 'The Omnia Solution',
        col3Body: 'Simultaneous high-energy live crosses on Malaysia Hari Ini (MHI) combined with Hot FM "Bekpes Hot" radio shoutouts and TikTok quick-breakfast hacks.',
        col3Foot: 'Outcome: Uncontested early-morning breakfast top-of-mind dominance.'
      },
      {
        id: 3,
        type: 'program',
        navTitle: 'Program Spotlight: MHI',
        navSubtitle: 'Malaysia Hari Ini & Host Synergy',
        kicker: 'Slide 03: Inventory Anchor',
        title: 'Program Spotlight: Malaysia Hari Ini (MHI)',
        slotInfo: 'LIVE MON - FRI | 7:00 AM - 8:30 AM',
        programName: 'Malaysia Hari Ini (MHI)',
        programDesc: 'Malaysia’s undisputed early-morning wake-up talkshow and national agenda setter for over two decades.',
        monthlyReach: '3.4 Million Viewers',
        channelShare: '68% Morning Share',
        stat1Label: 'Household Audience',
        stat1Val: '76% Family Cohort',
        stat2Label: 'Core Demographic',
        stat2Val: 'Parents aged 28-49',
        stat3Label: 'Household Income',
        stat3Val: 'MHI RM4.5k - RM9k',
        hostName: 'Ahmad Fedtri Yahya & Anim Ezati',
        hostDesc: 'Authoritative, energizing morning hosts deeply trusted by Malaysian families for wholesome lifestyle advice, community updates, and morning motivation.'
      },
      {
        id: 4,
        type: 'creative',
        navTitle: 'Creative Integrations',
        navSubtitle: 'Breakfast Zone & Radio Crosses',
        kicker: 'Slide 04: The Creative Concept',
        title: "Creative Idea: 'Stesen Tenaga Juara Milo' Integration",
        cards: [
          {
            num: '1',
            label: 'Live Studio Morning Cross',
            title: '7-Min Energy Breakfast Segment',
            desc: 'Live studio prep of quick nutritious Milo breakfast combos with sports nutritionists and guest champion student athletes.',
            foot: '14 Dedicated Live Segments'
          },
          {
            num: '2',
            label: 'In-Show Lower Thirds',
            title: 'Aston Popups + QR Scanner',
            desc: 'Dynamic lower-third commercial Astons during peak traffic and weather updates driving instant scan-to-claim for school breakfast kits.',
            foot: '75x Aston Commercial Overlays'
          },
          {
            num: '3',
            label: 'Radio Simulcast Synergy',
            title: 'Hot FM "Bekpes Hot" Live Crosstalk',
            desc: 'Synchronized on-air radio mentions with Khairy Jamaluddin & Johan delivering genuine endorsement of Milo breakfast fuel.',
            foot: '30 On-air Radio Mentions'
          },
          {
            num: '4',
            label: 'Social & Youth Digital Echo',
            title: 'TikTok School Champion Challenge',
            desc: 'Engaging short-form energy routine reels on TV3 Malaysia TikTok and SirapLimau family health editorial guides.',
            foot: '10 Branded Reels + 3 Articles'
          }
        ]
      },
      {
        id: 5,
        type: 'deliverables',
        navTitle: 'Tactical Deliverables',
        navSubtitle: 'Inventory & 18.2M Reach',
        kicker: 'Slide 05: Inventory Schedule',
        title: 'Tactical Deliverables & Guaranteed Reach',
        grossImpressions: '18.2M Impressions',
        table: [
          { medium: 'TV3 Linear Live (MHI)', entitlement: 'Live Studio Cooking & Nutrition Demo', freq: '14 Episodes', target: 'National Family Cohort', reach: '6,200,000' },
          { medium: 'TV3 Linear Live (MHI)', entitlement: 'In-Show Aston Popups (10s duration)', freq: '75 Overlays', target: 'Prime Morning Live Viewers', reach: '5,800,000' },
          { medium: 'Audio+ / Hot FM', entitlement: 'Morning Drive "Bekpes Hot" Live Crosstalk', freq: '30 Mentions', target: 'Morning Commuters & Parents', reach: '3,400,000' },
          { medium: 'Digital (SirapLimau / Seismik)', entitlement: 'Nutritious Breakfast Recipes & School Hacks', freq: '3 Articles', target: 'Millennial Parents & Homemakers', reach: '1,300,000' },
          { medium: 'Social (TV3 TikTok & IG)', entitlement: 'Breakfast Energy Challenge Video Highlights', freq: '10 Reels', target: 'Youth & Active Families 18-40', reach: '1,500,000' }
        ],
        valueEntitlement: 'MHI Studio Kitchen & Breakfast Bar Full Takeover',
        valueDesc: 'Permanent customized Milo dispenser station on set throughout full 8-week campaign duration.'
      },
      {
        id: 6,
        type: 'timeline',
        navTitle: '3-Phase Flight Timeline',
        navSubtitle: 'Back to School > Sports Surge',
        kicker: 'Slide 06: Execution Roadmap',
        title: '3-Phase Coordinated Morning Flighting',
        phase1: {
          weeks: 'WEEKS 1 - 2',
          name: 'Phase 1: Back to School Awakening',
          desc: 'Drive morning routine preparation with host teasers, school hydration tips, and early breakfast awareness on MHI & Hot FM.'
        },
        phase2: {
          weeks: 'WEEKS 3 - 6',
          name: 'Phase 2: Peak Energy Kitchen Surge',
          desc: 'Bi-weekly live cooking crossovers, daily morning Aston popups, and athlete nutrition tips leading into school term sports events.'
        },
        phase3: {
          weeks: 'WEEKS 7 - 8',
          name: 'Phase 3: National Youth Sports Climax',
          desc: 'Celebration of school sports champions with host giveaways, live weekend outdoor OB crosses, and retail coupon conversion.'
        }
      },
      {
        id: 7,
        type: 'commercial',
        navTitle: 'Commercial Packages',
        navSubtitle: 'Tier Comparisons & CTA',
        kicker: 'Slide 07: Commercial Offer',
        title: 'Investment Packages & Commercial Reservation',
        tierA: {
          name: 'Package A (Recommended)',
          price: 'RM 450,000',
          label: 'Full 360° Broadcast, Radio & Digital Surge',
          isRecommended: true,
          items: [
            '14x Live MHI Breakfast Segments',
            '75x Aston In-Show Overlays',
            '30x Hot FM Morning Drive Mentions',
            '10x Social Video Reels & 3x SirapLimau Articles',
            'Permanent Studio Breakfast Bar Takeover'
          ],
          estReach: '18.2M Impressions (+20% Overdelivery)'
        },
        tierB: {
          name: 'Package B',
          price: 'RM 280,000',
          label: 'Linear TV Priority',
          items: [
            '10x Live MHI Breakfast Segments',
            '45x Aston In-Show Overlays',
            'MHI Breakfast Bar Placements',
            'No Radio or Digital Inclusion'
          ],
          estReach: '10.5M Impressions'
        },
        tierC: {
          name: 'Package C',
          price: 'RM 160,000',
          label: 'Radio & Digital Amplification',
          items: [
            '4x MHI Guest Appearances',
            '20x Hot FM Crosstalks',
            '5x Social Video Reels',
            '1x SirapLimau Sponsored Article'
          ],
          estReach: '5.2M Impressions'
        }
      }
    ]
  },
  {
    id: 'petronas-primax-bu',
    clientName: 'Petronas Primax',
    campaignName: 'Petronas Primax - Buletin Utama Anchor 2025',
    briefNotes: 'Client: Petronas Dagangan Berhad. Objective: Establish Primax 97 Pro-Drive as the premier high-performance fuel for urban drivers. Slot: Prime News Buletin Utama (8:00 PM) Title Sponsorship + BH Online Leaderboard takeover. Budget: RM 550,000.',
    channel: 'TV3',
    slot: 'BU',
    budgetTier: '350k',
    targetKpi: 'reach',
    recommendedTier: 'RM 550,000',
    grossImpressions: '21.4M Est.',
    updatedAt: new Date().toISOString(),
    slides: [
      {
        id: 1,
        type: 'title',
        navTitle: 'Title & Concept Hook',
        navSubtitle: 'Buletin Utama Flagship Anchor',
        badge: 'Prime Broadcast Title Sponsorship',
        kicker: 'Prime Time Authority Hook',
        title: 'Kuasa & Ketepatan: Penajaan Utama Buletin Utama Petronas Primax',
        subtitle: 'Strategic prime time flagship news sponsorship positioning Petronas Primax 97 with Pro-Drive as the fuel of choice for Malaysian motorists.',
        metadata: {
          targetAudience: 'Urban Drivers, P25-54 Decision Makers & Fleet Owners',
          primaryChannel: 'TV3 (Buletin Utama 8:00 PM) + Omnia Network',
          commercialWindow: 'Q1-Q2 (Pre-Ramadan to Syawal 2025)',
          code: 'MP-BU-PETRONAS25'
        }
      },
      {
        id: 2,
        type: 'diagnostics',
        navTitle: 'Strategic Challenge',
        navSubtitle: 'Prime News Gravitas & Market Trust',
        kicker: 'Slide 02: Strategic Diagnostics',
        title: 'Market Dynamics & Prime Time Authority',
        col1Title: 'The Strategic Hurdle',
        col1Body: 'Reinforcing premium fuel performance differentiation in an era of fuel subsidy restructuring and heightened consumer value scrutiny.',
        col1Foot: 'Risk: Brand switching to entry-tier alternatives.',
        col2Metric: '92%',
        col2MetricLabel: 'National Prime News Reach',
        col2Body: 'Buletin Utama remains the single highest-rated nightly news broadcast in Malaysia, delivering unmatched corporate gravitas.',
        col3Title: 'The Omnia Solution',
        col3Body: 'Title sponsorship of nightly Buletin Utama with integrated opening/closing billboards, animated time checks, and digital coverage.',
        col3Foot: 'Result: Unquestioned market authority and maximum brand trust.'
      },
      {
        id: 3,
        type: 'program',
        navTitle: 'Program Spotlight: BU',
        navSubtitle: 'Buletin Utama 8PM Anchor',
        kicker: 'Slide 03: Inventory Anchor',
        title: 'Program Spotlight: Buletin Utama (8:00 PM)',
        slotInfo: 'LIVE DAILY | 8:00 PM - 9:00 PM',
        programName: 'Buletin Utama TV3',
        programDesc: 'Malaysia’s flagship prime time news broadcast commanding unrivaled national authority and mass simultaneous viewership.',
        monthlyReach: '4.9 Million Viewers',
        channelShare: '74% Prime News Share',
        stat1Label: 'Audience Demographics',
        stat1Val: '58% Male / 42% Female',
        stat2Label: 'Core Demographic',
        stat2Val: 'National P25-59',
        stat3Label: 'Household Income',
        stat3Val: 'MHI RM5k-RM15k+',
        hostName: 'Mior Abdul Malek & Norliza Mohd Zain',
        hostDesc: 'Distinguished news anchors respected across both corporate and general public spheres for balanced, authoritative journalism.'
      },
      {
        id: 4,
        type: 'creative',
        navTitle: 'Creative Integrations',
        navSubtitle: 'Opening Billboards & Time Checks',
        kicker: 'Slide 04: The Creative Concept',
        title: "Creative Idea: 'Kuasa Prestasi Primax' Integration",
        cards: [
          { num: '1', label: 'Opening & Closing Billboard', title: '15s High-Gloss 3D Billboards', desc: 'Seamless title sponsorship sequence with cinematic 3D engine animation and crystal clear sonic branding.', foot: '60 Prime Broadcast Billboards' },
          { num: '2', label: 'In-Show News Aston', title: 'Traffic & Weather Segment Aston', desc: 'Custom lower-third co-branded graphics during nightly balik kampung traffic updates with travel safety tips.', foot: '45x Premium Prime Astons' },
          { num: '3', label: 'Commercial Break Top Spot', title: 'First-in-Break 30s Commercials', desc: 'First position ad break placement following headline teasers for maximum retention and viewer attention.', foot: '30x Prime Break Anchors' },
          { num: '4', label: 'Digital Livestream & BH Online', title: 'Berita Harian & Tonton Stream', desc: 'Pre-roll video ads on Tonton Live Stream and synchronized high-impact leaderboard banners on BH Online.', foot: '2.5M Guaranteed Impressions' }
        ]
      },
      {
        id: 5,
        type: 'deliverables',
        navTitle: 'Tactical Deliverables',
        navSubtitle: 'Prime Inventory & 21.4M Reach',
        kicker: 'Slide 05: Inventory Schedule',
        title: 'Tactical Deliverables & Guaranteed Reach',
        grossImpressions: '21.4M Impressions',
        table: [
          { medium: 'TV3 Buletin Utama (Linear)', entitlement: 'Title Sponsorship Opening & Closing Billboards (15s)', freq: '60 Spots', target: 'National P25-54 Decision Makers', reach: '8,800,000' },
          { medium: 'TV3 Buletin Utama (Linear)', entitlement: 'First-in-Break Commercial 30s Spot', freq: '30 Spots', target: 'Prime Time Urban Motorists', reach: '6,200,000' },
          { medium: 'TV3 Buletin Utama (Linear)', entitlement: 'Traffic / Weather Co-Branded Aston Banner', freq: '45 Overlays', target: 'Active Daily Commuters', reach: '3,400,000' },
          { medium: 'Digital (BH Online & Tonton)', entitlement: 'Tonton News Livestream Pre-Roll & Leaderboard', freq: 'Daily Flight', target: 'Mobile Digital News Readers', reach: '3,000,000' }
        ],
        valueEntitlement: 'Exclusive Prime Time Fuel Anchor Status',
        valueDesc: 'Category exclusivity across all Buletin Utama commercial breaks for duration of the contract.'
      },
      {
        id: 6,
        type: 'timeline',
        navTitle: '3-Phase Flight Timeline',
        navSubtitle: 'Balik Kampung Surge Flighting',
        kicker: 'Slide 06: Execution Roadmap',
        title: '3-Phase Prime Time Flighting & Festive Travel Surge',
        phase1: { weeks: 'WEEKS 1 - 2', name: 'Phase 1: Pre-Holiday Vehicle Readiness', desc: 'Opening billboard campaign with fuel economy reminders and Mesra rewards promotions before holiday travel.' },
        phase2: { weeks: 'WEEKS 3 - 6', name: 'Phase 2: Peak Balik Kampung Traffic Anchor', desc: 'Daily live traffic Aston overlays and prime news break dominance during highest highway congestion periods.' },
        phase3: { weeks: 'WEEKS 7 - 8', name: 'Phase 3: Post-Holiday Loyalty Retention', desc: 'Re-engagement messaging spotlighting engine health maintenance and cashback redemption through Setel app.' }
      },
      {
        id: 7,
        type: 'commercial',
        navTitle: 'Commercial Packages',
        navSubtitle: 'Title Sponsorship Investment',
        kicker: 'Slide 07: Commercial Offer',
        title: 'Investment Packages & Commercial Reservation',
        tierA: {
          name: 'Package A (Title Dominance)',
          price: 'RM 550,000',
          label: 'Flagship News 360° Dominance',
          isRecommended: true,
          items: [
            '60x Opening/Closing Billboards (15s)',
            '30x First-in-Break Commercial 30s Spots',
            '45x Traffic & Weather In-Show Astons',
            'Tonton News Livestream Exclusivity',
            'BH Online Digital Leaderboard Takeover'
          ],
          estReach: '21.4M Impressions (+22% Overdelivery)'
        },
        tierB: {
          name: 'Package B',
          price: 'RM 380,000',
          label: 'Core Broadcast News Package',
          items: [
            '40x Opening/Closing Billboards (15s)',
            '20x First-in-Break Commercial 30s Spots',
            '25x Traffic & Weather In-Show Astons',
            'No Digital Leaderboards'
          ],
          estReach: '14.2M Impressions'
        },
        tierC: {
          name: 'Package C',
          price: 'RM 220,000',
          label: 'In-Show News Integration Only',
          items: [
            '20x Opening Billboards (15s)',
            '20x In-Show News Astons',
            'BH Online Pre-roll Video Ads'
          ],
          estReach: '7.8M Impressions'
        }
      }
    ]
  }
];
