export interface GalleryItem {
  id: number;
  src: string;
  caption: string;
  date?: string;
  alt: string;
}

export interface RoastCard {
  id: number;
  title: string;
  icon: string;
  message: string;
}

export const birthdayConfig = {
  name: 'Akki',
  websiteTitle: 'AKKI — A Birthday Experience',
  tagline: 'A little chaos. A lot of memories. One unforgettable person.',

  hero: {
    eyebrow: 'THE MAIN CHARACTER OF TODAY',
    headline: 'HAPPY BIRTHDAY, AKKI.',
    subtext: 'Another year older. Another year wiser. Still absolutely impossible to handle. ❤️',
    subtitle: 'Today, the world celebrates you. I just happen to have the embarrassing memories.',
  },

  roastCards: [
    { id: 1, title: 'AGE UPDATE', icon: '🎂', message: "Congratulations! You've unlocked another year of life. Your maturity level is still under investigation." },
    { id: 2, title: 'ATTITUDE AWARD', icon: '👑', message: "Your confidence deserves its own award. Your arguments deserve their own courtroom." },
    { id: 3, title: 'DRAMA QUEEN', icon: '🎭', message: "If overreacting were an Olympic sport, you'd return home with gold. Literally. It matches this website." },
    { id: 4, title: 'SECRET KEEPER', icon: '🤫', message: "Family memories are safe with you… unless we need material for birthday roasting." },
    { id: 5, title: 'FAVORITE TROUBLEMAKER', icon: '😈', message: "You're equal parts headache, laughter, and unforgettable memories. Mostly laughter. Usually." },
    { id: 6, title: 'COUSIN PRIVILEGE', icon: '🤝', message: "I can roast you all day because I'm family. Outsiders must submit a written application." },
  ] as RoastCard[],

  gallery: [
    { id: 1,  src: '/images/WhatsApp%20Image%202026-10-11%20at%205.55.37%20PM.jpeg',       caption: 'The beginning of another legendary memory.', alt: 'Memory 1' },
    { id: 2,  src: '/images/WhatsApp%20Image%202026-10-11%20at%205.55.37%20PM%20(1).jpeg', caption: 'Zero planning. Maximum chaos.', alt: 'Memory 2' },
    { id: 3,  src: '/images/WhatsApp%20Image%202026-10-11%20at%205.55.38%20PM.jpeg',       caption: 'Evidence that we can actually behave sometimes.', alt: 'Memory 3' },
    { id: 4,  src: '/images/WhatsApp%20Image%202026-10-11%20at%205.55.38%20PM%20(1).jpeg', caption: 'A memory worth keeping forever.', alt: 'Memory 4' },
    { id: 5,  src: '/images/WhatsApp%20Image%202026-10-11%20at%205.55.38%20PM%20(2).jpeg', caption: 'Our family deserves a documentary.', alt: 'Memory 5' },
    { id: 6,  src: '/images/WhatsApp%20Image%202026-10-11%20at%205.55.39%20PM.jpeg',       caption: 'More memories loading…', alt: 'Memory 6' },
    { id: 7,  src: '/images/WhatsApp%20Image%202026-10-11%20at%205.55.39%20PM%20(1).jpeg', caption: 'Absolute chaos. Peak vibes.', alt: 'Memory 7' },
    { id: 8,  src: '/images/WhatsApp%20Image%202026-10-11%20at%205.55.39%20PM%20(2).jpeg', caption: 'No context needed. None available.', alt: 'Memory 8' },
    { id: 9,  src: '/images/WhatsApp%20Image%202026-10-11%20at%205.55.40%20PM.jpeg',       caption: 'The iconic one. No notes.', alt: 'Memory 9' },
    { id: 10, src: '/images/WhatsApp%20Image%202026-10-11%20at%205.55.40%20PM%20(1).jpeg', caption: 'Slay era. Fully confirmed.', alt: 'Memory 10' },
    { id: 11, src: '/images/WhatsApp%20Image%202026-10-11%20at%205.55.40%20PM%20(2).jpeg', caption: 'Main character behaviour.', alt: 'Memory 11' },
    { id: 12, src: '/images/WhatsApp%20Image%202026-10-11%20at%205.55.40%20PM%20(3).jpeg', caption: 'This one hits different. Always.', alt: 'Memory 12' },
    { id: 13, src: '/images/WhatsApp%20Image%202026-10-11%20at%205.55.41%20PM.jpeg',       caption: 'Genuinely unexplainable. Love it.', alt: 'Memory 13' },
    { id: 14, src: '/images/WhatsApp%20Image%202026-10-11%20at%205.55.41%20PM%20(1).jpeg', caption: 'We were NOT okay. Peak memories.', alt: 'Memory 14' },
    { id: 15, src: '/images/WhatsApp%20Image%202026-10-11%20at%205.55.41%20PM%20(2).jpeg', caption: 'Iconic duo. No notes.', alt: 'Memory 15' },
    { id: 16, src: '/images/WhatsApp%20Image%202026-10-11%20at%205.55.42%20PM.jpeg',       caption: 'Laugh now, explain never.', alt: 'Memory 16' },
    { id: 17, src: '/images/WhatsApp%20Image%202026-10-11%20at%205.55.42%20PM%20(1).jpeg', caption: 'The vibe was immaculate.', alt: 'Memory 17' },
    { id: 18, src: '/images/WhatsApp%20Image%202026-10-11%20at%205.55.42%20PM%20(2).jpeg', caption: 'This lives in my heart rent free.', alt: 'Memory 18' },
    { id: 19, src: '/images/WhatsApp%20Image%202026-10-11%20at%205.55.43%20PM.jpeg',       caption: 'The glow up is real.', alt: 'Memory 19' },
    { id: 20, src: '/images/WhatsApp%20Image%202026-10-11%20at%205.55.43%20PM%20(1).jpeg', caption: 'Two weirdos having the time of their lives.', alt: 'Memory 20' },
    { id: 21, src: '/images/WhatsApp%20Image%202026-10-11%20at%205.55.43%20PM%20(2).jpeg', caption: 'Actually obsessed with this one.', alt: 'Memory 21' },
    { id: 22, src: '/images/WhatsApp%20Image%202026-10-11%20at%205.55.43%20PM%20(3).jpeg', caption: 'Drama not needed but deeply appreciated.', alt: 'Memory 22' },
    { id: 23, src: '/images/WhatsApp%20Image%202026-10-11%20at%205.55.44%20PM.jpeg',       caption: 'Certified moment. Undefeated.', alt: 'Memory 23' },
    { id: 24, src: '/images/WhatsApp%20Image%202026-10-11%20at%205.55.44%20PM%20(1).jpeg', caption: 'The way I love this human.', alt: 'Memory 24' },
    { id: 25, src: '/images/WhatsApp%20Image%202026-10-11%20at%205.55.44%20PM%20(2).jpeg', caption: 'Peak happiness. Undefeated.', alt: 'Memory 25' },
    { id: 26, src: '/images/WhatsApp%20Image%202026-10-11%20at%205.55.45%20PM.jpeg',       caption: 'Made with love, chaos, and snacks.', alt: 'Memory 26' },
  ] as GalleryItem[],

  letter: {
    salutation: 'Dear Akki,',
    body: `Happy Birthday to one of my favorite people to annoy! ❤️\n\nHonestly, having you as my cousin means life comes with extra laughter, random conversations, silly arguments, unforgettable memories, and just the right amount of family drama.\n\nI may tease you, roast you, and occasionally act like annoying you is my full-time job… but behind all those jokes, I'm genuinely grateful to have you in my life.\n\nYou are someone who makes ordinary moments memorable. Whether we're laughing about something completely ridiculous or simply spending time together, those little moments become memories I'll always cherish.\n\nOn your birthday, I wish you endless happiness, good health, success, confidence, beautiful opportunities, and the courage to chase every dream that matters to you.\n\nMay this new chapter bring you people who appreciate you, moments that make you smile, adventures worth remembering, and a thousand reasons to feel proud of yourself.\n\nKeep shining in your own way. Keep laughing loudly. Keep being wonderfully, ridiculously YOU.\n\nAnd please remember: no matter how old you get, I will always reserve the right to annoy you. That's a lifelong cousin subscription. No cancellation allowed. 😂❤️\n\nHappy Birthday once again, Akki.\n\nThank you for being part of my story. Here's to more laughter, more adventures, more memories, and many more birthdays to celebrate together.`,
    signoff: 'With lots of love, a little teasing, and a lifetime supply of cousin privileges,',
    signature: 'YOUR FAVORITE ANNOYING COUSIN ❤️',
    postLetterLine: 'THE ROASTING ENDS HERE. THE LOVE NEVER DOES.',
  },

  wishes: [
    'May happiness find you in the smallest, most unexpected moments.',
    'May your hard work open doors you once only dreamed about.',
    'May your future be brighter than every birthday candle.',
    'May you always have people who make you feel loved and understood.',
    'May your laughter remain loud and your worries become lighter.',
    'May you collect adventures, achievements, and beautiful memories.',
    'May this year surprise you in the best possible ways.',
    'And may you always have a cousin who annoys you for free.',
  ],

  finale: {
    line1: 'ONE LAST THING, AKKI…',
    line2: 'THE WORLD GOT LUCKY THE DAY YOU WERE BORN.',
    body: 'I hope this year gives you more reasons to laugh, more courage to dream, more opportunities to grow, and more beautiful moments than you can count.',
    headline: 'HAPPY BIRTHDAY, AKKI. ❤️',
    tagline: "Stay iconic. Stay happy. Stay a little annoying. It wouldn't be the same without you.",
    signature: 'Made with love, memories, and a questionable amount of cousin-level teasing. Just for you. ✨',
  },
};
