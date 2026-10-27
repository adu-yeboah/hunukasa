/* Asante Twi course tree — web mirror of the verified spec in
   TWI_COURSE_CONTENT.md. Backbone: FSI Twi Basic Course (public domain);
   every unit cites its source. Units marked authored:false have their FSI
   content pinned but exercises not yet written (community authoring). */

export type Vocab = { term: string; gloss: string };

export type CourseUnit = {
  id: string; // twi-<stage>-<unit>
  name: string;
  fsi: string;
  authored: boolean;
  words: Vocab[];
  lessonNames?: string[]; // defaults to the standard arc
};

export type CourseStage = {
  id: number;
  title: string;
  subtitle: string;
  fsi: string;
  units: CourseUnit[];
};

export const STANDARD_ARC = ["Listening", "Meaning Match", "Build It", "Use & Culture", "Say It & Mix"];

export const lessonCount = (u: { lessonNames?: string[] }) => u.lessonNames?.length ?? STANDARD_ARC.length;

/* authored vocab — sourced from the FSI student text (book pages cited) */
const W = (term: string, gloss: string): Vocab => ({ term, gloss });

const GREETINGS: Vocab[] = [
  W("Mã akyé", "Good morning"),
  W("Yaa nùà", "Hello! (reply to a greeting)"),
  W("nùà", "brother, sister"),
  W("Wò hó tẹ sétî?", "How are you?"),
  W("Mɛ hó yɛ", "I'm fine"),
  W("na", "and, but"),
  W("õṣɔ", "also, too"),
  W("Ofíe tẹ sɛ̀n?", "How is everything at home?"),
  W("Ofíe dɛɛ bokɔɔ", "Everything is fine at home"),
  W("ofíe", "home, house"),
  W("dɛɛ", "to be in a state of"),
  W("bokɔɔ", "soft; fine"),
  W("Medaase", "Thank you"),
];

const LETTERS: Vocab[] = [
  W("ɛ", "open e — like e in bed"),
  W("ɔ", "open o — like o in law"),
  W("a", "like a in father"),
  W("e", "like e in they"),
  W("i", "like i in feet"),
  W("o", "like o in note"),
  W("u", "like u in flute"),
  W("ky", "like ky in skew"),
  W("gy", "like j in jí of jog"),
  W("tw", "t + w glide, as in Twe"),
  W("ny", "like ny in canyon"),
  W("dw", "d + w glide, as in Dwen"),
];

export const STAGES: CourseStage[] = [
  {
    id: 0,
    title: "Sounds of Twi",
    subtitle: "Train your ear and voice before your eyes",
    fsi: "FSI U1, pp. 1–13",
    units: [
      {
        id: "twi-0-0",
        name: "Tone & Meaning",
        fsi: "FSI U1 p.11",
        authored: true,
        words: [
          W("sísí", "a bear (high-high)"),
          W("sisì", "to cheat (low-low)"),
          W("owuo", "death"),
          W("òwù", "thread"),
        ],
      },
      {
        id: "twi-0-1",
        name: "Letters & Harmony",
        fsi: "FSI U1 pp. 1–10",
        authored: true,
        words: LETTERS,
      },
    ],
  },
  {
    id: 1,
    title: "First Words",
    subtitle: "Greetings, introductions, taking leave",
    fsi: "FSI U2 pp. 14–23 · U20 pp. 192–201",
    units: [
      { id: "twi-1-0", name: "Greetings", fsi: "FSI U2 pp. 14–15", authored: true, words: GREETINGS },
      { id: "twi-1-1", name: "Introducing Yourself", fsi: "FSI U20 p.192", authored: false, words: [] },
      { id: "twi-1-2", name: "How Are You?", fsi: "FSI U2 pp. 16–23", authored: false, words: [] },
      { id: "twi-1-3", name: "Taking Leave", fsi: "FSI U20 p.193", authored: false, words: [] },
    ],
  },
  {
    id: 2,
    title: "Speaking Twi",
    subtitle: "Say what you mean, ask what you need",
    fsi: "FSI U3–U5, pp. 24–47",
    units: [
      { id: "twi-2-0", name: "Do You Speak Twi?", fsi: "FSI U3 p.24", authored: false, words: [] },
      { id: "twi-2-1", name: "How Do You Say…?", fsi: "FSI U4 p.32", authored: false, words: [] },
      { id: "twi-2-2", name: "At the Office", fsi: "FSI U5 p.40", authored: false, words: [] },
      { id: "twi-2-3", name: "Tomorrow & The Future", fsi: "FSI U5 p.43", authored: false, words: [] },
    ],
  },
  {
    id: 3,
    title: "Food & Market",
    subtitle: "Fufu, fish, prices and directions",
    fsi: "FSI U6 p.48 · U7 p.60 · U13 p.117 · U17 p.160",
    units: [
      { id: "twi-3-0", name: "Fufu & Food", fsi: "FSI U6 p.48", authored: false, words: [] },
      { id: "twi-3-1", name: "Buying Fish", fsi: "FSI U7 p.60", authored: false, words: [] },
      { id: "twi-3-2", name: "How Much Is This?", fsi: "FSI U13 p.117", authored: false, words: [] },
      { id: "twi-3-3", name: "Numbers & Money", fsi: "FSI U13 p.116", authored: false, words: [] },
      { id: "twi-3-4", name: "Colors", fsi: "FSI U13 p.118", authored: false, words: [] },
      { id: "twi-3-5", name: "To the Market", fsi: "FSI U17 p.160", authored: false, words: [] },
    ],
  },
  {
    id: 4,
    title: "Daily Life",
    subtitle: "Health, meals, time and keeping in touch",
    fsi: "FSI U8 p.70 · U9 p.79 · U12 p.107 · U14 p.130",
    units: [
      { id: "twi-4-0", name: "At the Doctor's", fsi: "FSI U8 p.70", authored: false, words: [] },
      { id: "twi-4-1", name: "Have You Eaten?", fsi: "FSI U9 p.79", authored: false, words: [] },
      { id: "twi-4-2", name: "What Time Is It?", fsi: "FSI U12 p.107", authored: false, words: [] },
      { id: "twi-4-3", name: "Days of the Week", fsi: "FSI U11 p.103", authored: false, words: [] },
      { id: "twi-4-4", name: "On the Phone", fsi: "FSI U14 p.130", authored: false, words: [] },
      { id: "twi-4-5", name: "Yesterday & Today", fsi: "FSI U10 p.88", authored: false, words: [] },
    ],
  },
  {
    id: 5,
    title: "Getting Around",
    subtitle: "Travel, buses and finding your way",
    fsi: "FSI U10 p.88 · U15 p.140 · U16 p.151",
    units: [
      { id: "twi-5-0", name: "I Went to Accra", fsi: "FSI U10 p.88", authored: false, words: [] },
      { id: "twi-5-1", name: "The Bus", fsi: "FSI U15 p.140", authored: false, words: [] },
      { id: "twi-5-2", name: "The Filling Station", fsi: "FSI U16 p.151", authored: false, words: [] },
      { id: "twi-5-3", name: "Finding the Way", fsi: "FSI U17 p.160", authored: false, words: [] },
    ],
  },
  {
    id: 6,
    title: "People & Culture",
    subtitle: "Day names, farms, weather — and graduation",
    fsi: "FSI U11 p.97 · U18 p.172 · U19 p.182",
    units: [
      { id: "twi-6-0", name: "An Interview & Day Names", fsi: "FSI U11 pp. 97–105", authored: false, words: [] },
      { id: "twi-6-1", name: "The Cocoa Farm", fsi: "FSI U18 p.172", authored: false, words: [] },
      { id: "twi-6-2", name: "Weather & Plans", fsi: "FSI U19 p.182", authored: false, words: [] },
      { id: "twi-6-3", name: "Graduation Review", fsi: "FSI U2–U19 recap", authored: false, words: [] },
    ],
  },
];

export const ALL_UNITS = STAGES.flatMap((s) => s.units.map((u) => ({ ...u, stage: s })));
export const TOTAL_LESSONS = ALL_UNITS.reduce((n, u) => n + lessonCount(u), 0);

export function unitWords(unitId: string): Vocab[] {
  return ALL_UNITS.find((u) => u.id === unitId)?.words ?? [];
}

export function unitById(id: string) {
  return ALL_UNITS.find((u) => u.id === id);
}

export function lessonsOf(unitId: string): string[] {
  const u = ALL_UNITS.find((x) => x.id === unitId);
  if (!u) return [];
  return u.lessonNames ?? STANDARD_ARC;
}
