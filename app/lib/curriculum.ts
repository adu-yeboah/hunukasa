

export type Lang = "twi" | "ewe" | "ga";

export type Unit = { label: string; goal: string; focus: string; lessons: string[] };
export type Section = { title: string; subtitle: string; units: Unit[] };
export type Course = { name: string; native: string; flag: string; sections: Section[] };

export const CURRICULUM: Record<Lang, Course> = {
  twi: {
    name: "Akan Twi",
    native: "Twi",
    flag: "gh",
    sections: [
      {
        title: "First Words",
        subtitle: "Mfitiaseɛ · A1 · greet, count & introduce yourself",
        units: [
          {
            label: "Greetings by Time",
            goal: "I can greet anyone by time of day",
            focus: "listening · ɛ & ɔ vowels · Maakye/Maaha/Maadwo",
            lessons: ["Maakye · Good Morning", "Maaha · Good Afternoon", "Maadwo · Good Evening", "Ɛte sɛn? · How Are You?", "Me ho yɛ · I Am Fine"],
          },
          {
            label: "Farewells & Respect",
            goal: "I can say goodbye and greet a group respectfully",
            focus: "plural Mo · respect register · Da yie",
            lessons: ["Da yie · Good Night", "Nante yie · Go Well", "Mo! · Greeting Many People", "Mo maakye · Good Morning (pl.)"],
          },
          {
            label: "Politeness",
            goal: "I can thank, apologise and accept",
            focus: "courtesy set · Medaase · Mepa wo kyɛw",
            lessons: ["Medaase · Thank You", "Mepa wo kyɛw · Please", "Yoo · Okay", "Kafra · Sorry"],
          },
          {
            label: "Numbers 0–10",
            goal: "I can count to ten",
            focus: "digits · listening for numbers",
            lessons: ["Hwee & Baako · 0 & 1", "Mmienu & Mmiɛnsa · 2 & 3", "Ɛnan & Mmiɛnu · 4 & 5", "Nsia kɔ Du · 6 to 10"],
          },
          {
            label: "People & Pronouns",
            goal: "I can name everyday people and use pronouns",
            focus: "me / wo / ɔ · yɛn / mo / wɔn",
            lessons: ["Me, Wo, Ɔ · I, You, He/She", "Yɛn, Mo, Wɔn · Us, You (pl.), Them", "Ɔbarima & Ɔbaa · Man & Woman", "Obi & Hwee · Someone & Nothing"],
          },
          {
            label: "Introduce Yourself",
            goal: "I can give my name and where I'm from",
            focus: "Wo din de sɛn? · Me din de… · Mefiri…",
            lessons: ["Wo din de sɛn? · Your Name?", "Me din de… · My Name Is…", "Mefiri… · I Am From…", "Ɛyɛ me anigyeɛ · Nice to Meet You"],
          },
        ],
      },
      {
        title: "All About Me",
        subtitle: "Me Ho · A1 · family, numbers, colour & health",
        units: [
          {
            label: "Family",
            goal: "I can talk about my family",
            focus: "kinship terms · possessive me",
            lessons: ["Me papa · My Father", "Me maame · My Mother", "Onua · Sibling", "Nana · Grandparent"],
          },
          {
            label: "Numbers 11–100",
            goal: "I can handle prices and quantities",
            focus: "aduonu…aduowɔtwe · ɔha · tens",
            lessons: ["Du baako & Du mmienu · 11 & 12", "Aduonu & Aduasa · 20 & 30", "Aduonum & Aduowɔtwe · 50 & 80", "Ɔha · 100 & Big Numbers"],
          },
          {
            label: "Colors & Size",
            goal: "I can describe things I see",
            focus: "adjectives · colour words · size",
            lessons: ["Tuntum & Fitaa · Black & White", "Kɔkɔɔ & Sika Kɔkɔɔ · Red & Gold", "Kɛseɛ & Ketewa · Big & Small", "Fɛfɛɛfɛ · Beautiful"],
          },
          {
            label: "Body & Health",
            goal: "I can say what hurts at the clinic",
            focus: "body nouns · Ɛyɛ me yaw",
            lessons: ["Ti, Ani, Ano · Head, Eye, Mouth", "Nsa & Nan · Hand & Foot", "Ɛyɛ me yaw · It Hurts", "Wɔ ayaresabea · At the Clinic"],
          },
        ],
      },
      {
        title: "Everyday Life",
        subtitle: "Asetena · A1 · food, market, home & your day",
        units: [
          {
            label: "Food & Eating",
            goal: "I can name staples and say what I want to eat",
            focus: "di / nom / kyɛ · Mepɛ sɛ medi",
            lessons: ["Banku & Fufu · Staples", "Nam & Nsuo · Meat & Water", "Di, Nom, Kyɛ · Eat, Drink, Share", "Me pɛ sɛ medi · I Want to Eat"],
          },
          {
            label: "At the Market",
            goal: "I can ask prices and buy things",
            focus: "Ɛboɔ sɛn? · tɔ · sika",
            lessons: ["Ɛboɔ sɛn? · How Much?", "Mepɛ sɛ metɔ… · I Want to Buy…", "Sika · Money & Cedis", "Tɔ & Tɔn · Buy & Sell"],
          },
          {
            label: "At Home",
            goal: "I can name things around the house",
            focus: "household nouns · dan & efie",
            lessons: ["Akonnwa & Pono · Chair & Table", "Mpa & Adaka · Bed & Box", "Dan & Efiɛ · Room & Home"],
          },
          {
            label: "Daily Actions",
            goal: "I can describe my daily routine",
            focus: "habitual verbs · sɔre / da / yɛ adwuma",
            lessons: ["Sɔre & Da · Wake & Sleep", "Duru & Twen · Arrive & Wait", "Kasa Twi · Speak Twi", "Yɛ Adwuma · Do Work"],
          },
          {
            label: "Time & Days",
            goal: "I can tell the day and the time",
            focus: "Kwesida…Memeneda · Bere bɛn?",
            lessons: ["Kwesida … Memeneda · The Week", "Anopa, Awia, Anwummerɛ · Times of Day", "Bere bɛn? · What Time?", "Ɛnnɛ, Ɛnnora, Ɔkyena · Today, Yesterday, Tomorrow"],
          },
        ],
      },
      {
        title: "Out in Town",
        subtitle: "Kurow Mu · A1 · places, directions & getting around",
        units: [
          {
            label: "Places",
            goal: "I can name key places in town",
            focus: "place nouns · proper nouns",
            lessons: ["Fiɛ, Sukuu, Asɔredan · Home, School, Church", "Ayaresabea · The Clinic", "Kwan & Kurow · Road & Town", "Accra & Kumasi · City Names"],
          },
          {
            label: "Directions & Movement",
            goal: "I can ask where things are and find my way",
            focus: "kɔ / ba · benkum & nifa · Ɛwɔ he?",
            lessons: ["Kɔ & Ba · Go & Come", "Benkum & Nifa · Left & Right", "Ɛwɔ he? · Where Is It?", "Twen & Hwɛ · Wait & Watch"],
          },
          {
            label: "Getting Around",
            goal: "I can use transport words like a local",
            focus: "loanwords · Bɔs, Taaksi, Keteke",
            lessons: ["Bɔs & Taaksi · Bus & Taxi", "Keteke · The Train", "Kwan bɛn? · Which Way?"],
          },
          {
            label: "Weather & Nature",
            goal: "I can talk about the weather around me",
            focus: "Osuo tɔ · Owia bɔ · nature nouns",
            lessons: ["Osuo tɔ · It Is Raining", "Owia bɔ · It Is Sunny", "Ewiem & Asaase · Sky & Earth", "Nnua & Aduaba · Trees & Fruit"],
          },
        ],
      },
      {
        title: "Talking in Patterns",
        subtitle: "Kasa Mu · A1→A2 · actions, questions & wishes",
        units: [
          {
            label: "Simple Actions",
            goal: "I can build simple present sentences",
            focus: "verb prefixes me- / wo- / ɔ- / yɛ-",
            lessons: ["Medi, Wodi, Ɔdi · I/You/He Eat", "Yɛdi, Modi, Wɔdi · We/You/They Eat", "Menom, Wonom · Drink Forms", "Mekasa, Wokasa · Speak Forms"],
          },
          {
            label: "Asking Questions",
            goal: "I can ask how, where, which and why",
            focus: "question words · Sɛn? He? Bɛn? Adɛn?",
            lessons: ["Sɛn? · How?", "He? · Where?", "Bɛn? · Which / What?", "Adɛn? · Why?"],
          },
          {
            label: "Likes & Wants",
            goal: "I can say what I want, like and don't want",
            focus: "Mepɛ… · Mempɛ… · Me dɔ…",
            lessons: ["Mepɛ… · I Want…", "Mempɛ… · I Don't Want…", "Me dɔ… · I Love / Like…", "Mepɛ sɛ… · I Want to…"],
          },
          {
            label: "Time Anchors",
            goal: "I can place events in time",
            focus: "Ɛnnɛ · Nnora · Ɔkyena · Da bi",
            lessons: ["Ɛnnɛ · Today & Now", "Nnora · Yesterday", "Ɔkyena & Da bi · Tomorrow & Someday"],
          },
        ],
      },
      {
        title: "Culture & Community",
        subtitle: "Amanneɛ · A2 · names, proverbs, festivals & sound",
        units: [
          {
            label: "Day Names",
            goal: "I know Ghanaian day names and their meanings",
            focus: "Kofi, Ama… · naming culture",
            lessons: ["Kofi & Ama · Day Names", "Kwabena & Akosua · More Day Names", "Me din de Kojo · Full Introductions"],
          },
          {
            label: "Proverbs & Wisdom",
            goal: "I can recognise famous Twi proverbs",
            focus: "proverbs · sankɔfa wisdom",
            lessons: ["Sɛ wo were fi na wosankɔfa a, yɛnkyi · Go Back for What You Forgot", "Ti koro nko agyina · One Head Holds No Council", "Obi nnim obrempon ahyɛase · Humble Beginnings", "Yɛn ara asaase ni · This Is Our Own Land"],
          },
          {
            label: "Festivals & Symbols",
            goal: "I can talk about Adae, Odwira, adinkra and kente",
            focus: "culture vocabulary · symbols",
            lessons: ["Adae & Akwasidae · Royal Days", "Adinkra · Symbols on Cloth", "Kente · Woven Stories", "Odwira · Purification Festival"],
          },
          {
            label: "Music & Play",
            goal: "I can talk about music and play",
            focus: "nnwom & asa · highlife",
            lessons: ["Nnwom & Asa · Song & Dance", "Highlife & Hiplife · Ghana's Sound", "Agorɔ · Play & Games"],
          },
        ],
      },
      {
        title: "Growth & Review",
        subtitle: "Nkɔsoɔ · A2 · work, feelings & mastery",
        units: [
          {
            label: "Work & Learning",
            goal: "I can talk about school and work",
            focus: "adwuma · kyerɛ & sua",
            lessons: ["Adwuma · Work & Jobs", "Ɔkyerɛkyerɛni · The Teacher", "Sukuu · School Life", "Kyerɛ & Sua · Teach & Learn"],
          },
          {
            label: "Feelings & Talk",
            goal: "I can share how I feel in conversation",
            focus: "me ho yɛ · anigyeɛ · anihaw",
            lessons: ["Ɛyɛ me anigyeɛ · I Am Happy", "Me ho yɛ · I Am Well", "Anihaw · Worry & Care", "Kasa kyerɛ me · Talk to Me"],
          },
          {
            label: "Nsɔhwɛ · Final Review",
            goal: "I can use everything together",
            focus: "mixed review · spaced recall",
            lessons: ["Nsɔhwɛ 1 · Review: Greetings & Numbers", "Nsɔhwɛ 2 · Review: Market & Food", "Nsɔhwɛ 3 · Review: Directions & Town", "Nsɔhwɛ 4 · Review: Proverbs & Culture"],
          },
        ],
      },
    ],
  },

  ewe: {
    name: "Eʋegbe",
    native: "Ewe",
    flag: "gh",
    sections: [
      {
        title: "First Words",
        subtitle: "Gɔmedede · A1 · greet, count & meet people",
        units: [
          {
            label: "Greetings by Time",
            goal: "I can greet anyone by time of day",
            focus: "listening · Ŋdi / Ŋdɔ / Ɣetrɔ · respect",
            lessons: ["Ŋdi · Good Morning", "Ŋdɔ · Good Afternoon", "Ɣetrɔ · Good Evening", "Ɛfoa! · Respect Greeting"],
          },
          {
            label: "Kind Words",
            goal: "I can thank and welcome people warmly",
            focus: "Akpe · courtesy set",
            lessons: ["Akpe na wò · Thank You", "Akpe kakɛ · Thanks a Lot", "Miawoe zɔ · Welcome Everyone", "Yoo · Alright"],
          },
          {
            label: "Meeting People",
            goal: "I can give my name and where I'm from",
            focus: "ŋkɔ · Nye ŋkɔ nye… · Mefi…",
            lessons: ["Ŋkɔwɔ ƒe ŋkɔ · Your Name", "Nye ŋkɔ nye… · My Name Is", "Mefi… · I Am From", "Dede · Yes Indeed"],
          },
          {
            label: "Numbers 1–10",
            goal: "I can count to ten",
            focus: "digits · Deka kɔ Ewo",
            lessons: ["Deka & Eve · 1 & 2", "Eto & Ene · 3 & 4", "Atɔ̃ & Ade · 5 & 6", "Adre kɔ Ewo · 7 to 10"],
          },
        ],
      },
      {
        title: "Everyday Life",
        subtitle: "Nye ƒe Agbe · A1 · family, food & your day",
        units: [
          {
            label: "Ƒome · Family",
            goal: "I can talk about my family",
            focus: "kinship terms · possessive nye",
            lessons: ["Fofo · Father", "Dada · Mother", "Nɔvi · Sibling", "Ƒome · The Whole Family"],
          },
          {
            label: "Nuɖuɖu · Food & Drink",
            goal: "I can name foods and drinks I like",
            focus: "akple · abolo · tsi · du & nu",
            lessons: ["Akple & Fufu · Staples", "Abolo · Bread & Tea", "Tsi · Water", "Du & Nu · Eat & Drink"],
          },
          {
            label: "Daily Actions",
            goal: "I can describe what I do each day",
            focus: "habitual verbs · yi / va / zɔ",
            lessons: ["Yi & Va · Go & Come", "Kpɔ & Se · See & Hear", "Dzo · Rise Early", "Zɔ · Walk & Travel"],
          },
          {
            label: "Days & Time",
            goal: "I can name the days of the week",
            focus: "Dzoɖa…Kɔsiɖa · days",
            lessons: ["Dzoɖa · Monday", "Blaɖa & Kuɖa · Tuesday & Wednesday", "Yawɖa & Fiɖa · Thursday & Friday", "Memleɖa & Kɔsiɖa · Weekend"],
          },
        ],
      },
      {
        title: "Around Me",
        subtitle: "Glime · A1 · places, money & real conversation",
        units: [
          {
            label: "Places & Money",
            goal: "I can name places and talk about money",
            focus: "xɔ · suku · du · ga · tsɔ & na",
            lessons: ["Xɔ, Suku, Du · Home, School, Town", "Ga · Money", "Tsɔ & Na · Take & Give"],
          },
          {
            label: "Conversation Skills",
            goal: "I can keep a small conversation going",
            focus: "repair phrases · Màgblɔ ɖe",
            lessons: ["Màgblɔ ɖe · Say It Again", "Eŋlɔ & Xlẽ · Write & Read", "Ðe màte ŋu…? · Can You…?", "Nyati aɖewo · Small Talk"],
          },
          {
            label: "Review · First Words",
            goal: "I can recall everything from Foundations",
            focus: "spaced recall · mixed drills",
            lessons: ["Nusɔsrɔ̃ · Review: Greetings", "Review: Numbers & Family", "Review: Days & Actions"],
          },
        ],
      },
      {
        title: "Culture & Heritage",
        subtitle: "A2 · festivals, respect & names",
        units: [
          {
            label: "Festivals & Heritage",
            goal: "I can talk about Ewe festivals and crafts",
            focus: "Hogbetsotso · Agbadza · culture",
            lessons: ["Hogbetsotso · The Great Ewe Festival", "Agbamevor · Ewe Kente Weaving", "Agbadza · Dance & Drumming", "Eʋe Dukɔ · Ewe Lands & People"],
          },
          {
            label: "Respect & Names",
            goal: "I can show respect the Ewe way",
            focus: "Ɛfoa · gratitude · ŋkɔ meanings",
            lessons: ["Ɛfoa! · Greeting Elders", "Akpe · A Culture of Thanks", "Ŋkɔ · Names & Their Meanings"],
          },
        ],
      },
      {
        title: "Final Review",
        subtitle: "A2 · mixed recall across the course",
        units: [
          {
            label: "Nusɔsrɔ̃ · Final Review",
            goal: "I can use everything together",
            focus: "mixed review · spaced recall",
            lessons: ["Final Review · Foundations", "Final Review · Culture & Talk"],
          },
        ],
      },
    ],
  },

  ga: {
    name: "Gã",
    native: "Ga",
    flag: "gh",
    sections: [
      {
        title: "First Words",
        subtitle: "A1 · greet, reply & count to five",
        units: [
          {
            label: "Greetings",
            goal: "I can greet and reply by time of day",
            focus: "Ojekoo → Ojemra · reply culture",
            lessons: ["Ojekoo → Ojemra · Good Morning", "Minaokoo · Good Afternoon", "Oshwiee · Good Evening", "Te oyɔɔ tɛŋŋ? · How Are You?", "Oyiwalaadɔŋŋ · Thank You"],
          },
          {
            label: "Politeness",
            goal: "I can apologise, insist and accept",
            focus: "Mɔlɔ · courtesy set",
            lessons: ["Mɔlɔ · Sorry & Excuse Me", "Oyiwalaadɔŋŋ pii · Thank You So Much", "Yoo · Alright"],
          },
          {
            label: "Numbers 1–5",
            goal: "I can count to five",
            focus: "digits · Ekome…Enumo",
            lessons: ["Ekome & Enyɔ · 1 & 2", "Etɛ · Three", "Enye & Enumo · 4 & 5"],
          },
          {
            label: "Weku · Family",
            goal: "I can talk about my family",
            focus: "kinship terms · weku",
            lessons: ["Nyɛ · Mother", "Tswa · Father", "Weku · The Family", "Weku mli · Family Members"],
          },
        ],
      },
      {
        title: "Everyday Life in Accra",
        subtitle: "A1 · food, places & festivals",
        units: [
          {
            label: "Yeli · Food",
            goal: "I can order and talk about Ga food",
            focus: "Kɔmi · kenkey · street food",
            lessons: ["Kɔmi · Kenkey, the Ga Staple", "Banku & Yɛ · With Tilapia", "Kelewele & Waakye · Street Favorites", "Yeli · Food & Eating"],
          },
          {
            label: "Ga Mashie · Old Accra",
            goal: "I can name landmarks of old Accra",
            focus: "Jamestown · Osu · Makola",
            lessons: ["Jamestown & Ussher Fort", "Osu · The High Street", "Makola Market", "Ga Mashie · Heart of Accra"],
          },
          {
            label: "Homowo · Festivals",
            goal: "I can talk about Homowo and its meaning",
            focus: "Kpokpoi · processions · durbar",
            lessons: ["Homowo · Hooting at Hunger", "Kpokpoi · Festival Food", "Processions & Durbar"],
          },
          {
            label: "Respect & Culture",
            goal: "I can greet elders and show respect",
            focus: "Ojemra · replies first",
            lessons: ["Ojemra · The Art of Replies", "Greetings Come First", "Oyiwalaadɔŋŋ · Living Thankfully"],
          },
        ],
      },
      {
        title: "Growing in Gã",
        subtitle: "A1→A2 · wider Accra, review & culture",
        units: [
          {
            label: "Accra & Beyond",
            goal: "I can name places and people of Greater Accra",
            focus: "Nii & Naa honorifics · city names",
            lessons: ["Tema · The Harbour City", "Madina & Adenta · Neighbourhoods", "Nii & Naa · Honorifics"],
          },
          {
            label: "Review & Strengthen",
            goal: "I can recall the whole course so far",
            focus: "spaced recall · mixed drills",
            lessons: ["Review: Greetings & Numbers", "Review: Family & Food", "Review: Festivals & Accra"],
          },
        ],
      },
    ],
  },
};
