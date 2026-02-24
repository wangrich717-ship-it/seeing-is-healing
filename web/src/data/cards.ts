/**
 * 各套系卡片图片路径映射
 * 用于抽卡时随机选取展示
 */
export interface DeckCardImages {
  slug: string;
  /** 主要用于翻牌背面展示的图片（背面图/封面图） */
  backImage: string;
  /** 所有可抽取的卡片图片路径列表 */
  cardImages: string[];
}

function range(start: number, end: number): number[] {
  return Array.from({ length: end - start + 1 }, (_, i) => i + start);
}

function padded(n: number, digits = 1): string {
  return String(n).padStart(digits, "0");
}

export const DECK_CARD_IMAGES: Record<string, DeckCardImages> = {
  classic: {
    slug: "classic",
    backImage: "/images/decks/classic/back0.jpg",
    cardImages: [
      ...range(1, 88).map((n) => `/images/decks/classic/cards/img/${n}.jpg`),
      ...range(1, 89).map((n) => `/images/decks/classic/cards/word/${n}.jpg`),
    ],
  },
  saga: {
    slug: "saga",
    backImage: "/images/decks/saga/back.jpg",
    cardImages: range(1, 55).map((n) => `/images/decks/saga/cards/${n}.jpg`),
  },
  tale1001: {
    slug: "tale1001",
    backImage: "/images/decks/tale1001/back.jpg",
    cardImages: range(1, 55).map((n) => `/images/decks/tale1001/cards/${n}.jpg`),
  },
  mythos: {
    slug: "mythos",
    backImage: "/images/decks/mythos/back.jpg",
    cardImages: range(1, 55).map((n) => `/images/decks/mythos/cards/${n}.jpg`),
  },
  chinamyth: {
    slug: "chinamyth",
    backImage: "/images/decks/chinamyth/back.jpg",
    cardImages: range(1, 55).map((n) => `/images/decks/chinamyth/cards/${n}.jpg`),
  },
  tahiti: {
    slug: "tahiti",
    backImage: "/images/decks/tahiti/back.jpg",
    cardImages: range(1, 55).map((n) => `/images/decks/tahiti/cards/${n}.jpg`),
  },
  healheart: {
    slug: "healheart",
    backImage: "/images/decks/healheart/cards/001.jpg",
    cardImages: [
      ...range(1, 20).map((n) => `/images/decks/healheart/cards/${padded(n, 3)}.jpg`),
      ...range(21, 42).map((n) => `/images/decks/healheart/cards/${n === 21 ? "21" : n === 41 ? "41" : padded(n, 3)}.jpg`),
    ],
  },
  cope: {
    slug: "cope",
    backImage: "/images/decks/cope/back.jpg",
    cardImages: range(1, 88).map((n) => `/images/decks/cope/cards/${n}.jpg`),
  },
  habitat: {
    slug: "habitat",
    backImage: "/images/decks/habitat/back.jpg",
    cardImages: range(1, 88).map((n) => `/images/decks/habitat/cards/${n}.jpg`),
  },
  cuisine: {
    slug: "cuisine",
    backImage: "/images/decks/cuisine/cards/1.jpg",
    cardImages: range(1, 58).map((n) => `/images/decks/cuisine/cards/${n}.jpg`),
  },
  morena: {
    slug: "morena",
    backImage: "/images/decks/morena/back0.jpg",
    cardImages: [
      ...range(1, 88).map((n) => `/images/decks/morena/cards/img/${n}.jpg`),
      ...range(1, 22).map((n) => `/images/decks/morena/cards/track/${n}.jpg`),
    ],
  },
  ecco: {
    slug: "ecco",
    backImage: "/images/decks/ecco/back.jpg",
    cardImages: range(1, 55).map((n) => `/images/decks/ecco/cards/${n}.jpg`),
  },
  beauragard: {
    slug: "beauragard",
    backImage: "/images/decks/beauragard/back.jpg",
    cardImages: range(1, 55).map((n) => `/images/decks/beauragard/cards/${n}.jpg`),
  },
  orca: {
    slug: "orca",
    backImage: "/images/decks/orca/back.jpg",
    cardImages: range(1, 55).map((n) => `/images/decks/orca/cards/${n}.jpg`),
  },
  tandoo: {
    slug: "tandoo",
    backImage: "/images/decks/tandoo/back0.jpg",
    cardImages: [
      ...range(1, 99).map((n) => `/images/decks/tandoo/cards/couple/${n}.jpg`),
      ...range(1, 44).map((n) => `/images/decks/tandoo/cards/sign/${n}.jpg`),
    ],
  },
  persona: {
    slug: "persona",
    backImage: "/images/decks/persona/back0.jpg",
    cardImages: [
      ...range(1, 77).map((n) => `/images/decks/persona/cards/portrait/${n}.jpg`),
      ...range(1, 33).map((n) => `/images/decks/persona/cards/interact/${n}.jpg`),
    ],
  },
  child: {
    slug: "child",
    backImage: "/images/decks/child/back0.jpg",
    cardImages: [
      ...range(1, 77).map((n) => `/images/decks/child/cards/portrait/${n}.jpg`),
      ...range(1, 44).map((n) => `/images/decks/child/cards/action/${n}.jpg`),
    ],
  },
  resilio: {
    slug: "resilio",
    backImage: "/images/decks/resilio/back0.jpg",
    cardImages: [
      ...range(1, 99).map((n) => `/images/decks/resilio/cards/main/${n}.jpg`),
      ...range(1, 44).map((n) => `/images/decks/resilio/cards/animal/${n}.jpg`),
    ],
  },
};

/**
 * 从套系中随机抽取 n 张不重复的卡片图片
 */
export function drawCards(deckSlug: string, count: number = 1): string[] {
  const deckImages = DECK_CARD_IMAGES[deckSlug];
  if (!deckImages || deckImages.cardImages.length === 0) {
    return ["/images/card-back-default.jpg"];
  }
  const pool = [...deckImages.cardImages];
  const result: string[] = [];
  const drawCount = Math.min(count, pool.length);
  for (let i = 0; i < drawCount; i++) {
    const randomIndex = Math.floor(Math.random() * pool.length);
    result.push(pool[randomIndex]);
    pool.splice(randomIndex, 1);
  }
  return result;
}

export function getBackImage(deckSlug: string): string {
  return DECK_CARD_IMAGES[deckSlug]?.backImage ?? "/images/card-back-default.jpg";
}
