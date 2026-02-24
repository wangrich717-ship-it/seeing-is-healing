export interface SubDeck {
  id: string;
  label: string;
  backImage?: string;
  images: string[];
}

function seq(base: string, start: number, end: number, pad = 0): string[] {
  return Array.from({ length: end - start + 1 }, (_, i) => {
    const n = start + i;
    return `${base}/${pad > 0 ? String(n).padStart(pad, "0") : n}.jpg`;
  });
}

export const DECK_SUBDECKS: Record<string, SubDeck[]> = {
  classic: [
    {
      id: "img",
      label: "图卡",
      backImage: "/images/decks/classic/back0.jpg",
      images: seq("/images/decks/classic/cards/img", 1, 88),
    },
    {
      id: "word",
      label: "字卡",
      backImage: "/images/decks/classic/back1.jpg",
      images: seq("/images/decks/classic/cards/word", 1, 89),
    },
  ],
  saga: [
    {
      id: "main",
      label: "故事卡",
      images: seq("/images/decks/saga/cards", 1, 55),
    },
  ],
  tale1001: [
    {
      id: "main",
      label: "故事卡",
      images: seq("/images/decks/tale1001/cards", 1, 55),
    },
  ],
  mythos: [
    {
      id: "main",
      label: "神话卡",
      images: seq("/images/decks/mythos/cards", 1, 55),
    },
  ],
  chinamyth: [
    {
      id: "main",
      label: "神话卡",
      images: seq("/images/decks/chinamyth/cards", 1, 55),
    },
  ],
  tahiti: [
    {
      id: "main",
      label: "图卡",
      images: seq("/images/decks/tahiti/cards", 1, 55),
    },
  ],
  healheart: [
    {
      id: "main",
      label: "疗心卡（全部）",
      images: [
        ...seq("/images/decks/healheart/cards", 1, 20, 3),
        "/images/decks/healheart/cards/21.jpg",
        ...seq("/images/decks/healheart/cards", 22, 40, 3),
        "/images/decks/healheart/cards/41.jpg",
        "/images/decks/healheart/cards/042.jpg",
      ],
    },
    {
      id: "shadow",
      label: "阴影组（22-42）",
      images: [
        ...seq("/images/decks/healheart/cards", 22, 40, 3),
        "/images/decks/healheart/cards/41.jpg",
        "/images/decks/healheart/cards/042.jpg",
      ],
    },
    {
      id: "nurture",
      label: "滋养组（1-21）",
      images: [
        ...seq("/images/decks/healheart/cards", 1, 20, 3),
        "/images/decks/healheart/cards/21.jpg",
      ],
    },
  ],
  cope: [
    {
      id: "main",
      label: "图卡",
      images: seq("/images/decks/cope/cards", 1, 88),
    },
  ],
  habitat: [
    {
      id: "main",
      label: "图卡",
      images: seq("/images/decks/habitat/cards", 1, 88),
    },
  ],
  cuisine: [
    {
      id: "main",
      label: "图卡",
      images: seq("/images/decks/cuisine/cards", 1, 58),
    },
  ],
  morena: [
    {
      id: "img",
      label: "图像卡",
      backImage: "/images/decks/morena/back0.jpg",
      images: seq("/images/decks/morena/cards/img", 1, 88),
    },
    {
      id: "track",
      label: "追踪卡",
      backImage: "/images/decks/morena/back1.jpg",
      images: seq("/images/decks/morena/cards/track", 1, 22),
    },
  ],
  ecco: [
    {
      id: "main",
      label: "抽象卡",
      images: seq("/images/decks/ecco/cards", 1, 99),
    },
  ],
  beauragard: [
    {
      id: "main",
      label: "图卡",
      images: seq("/images/decks/beauragard/cards", 1, 55),
    },
  ],
  orca: [
    {
      id: "main",
      label: "图卡",
      images: seq("/images/decks/orca/cards", 1, 55),
    },
  ],
  tandoo: [
    {
      id: "couple",
      label: "伴侣卡",
      backImage: "/images/decks/tandoo/back0.jpg",
      images: seq("/images/decks/tandoo/cards/couple", 1, 99),
    },
    {
      id: "sign",
      label: "路标卡",
      backImage: "/images/decks/tandoo/back1.jpg",
      images: seq("/images/decks/tandoo/cards/sign", 1, 44),
    },
  ],
  persona: [
    {
      id: "portrait",
      label: "人像卡",
      backImage: "/images/decks/persona/back0.jpg",
      images: seq("/images/decks/persona/cards/portrait", 1, 77),
    },
    {
      id: "interact",
      label: "互动卡",
      backImage: "/images/decks/persona/back1.jpg",
      images: seq("/images/decks/persona/cards/interact", 1, 33),
    },
  ],
  child: [
    {
      id: "portrait",
      label: "人像卡",
      backImage: "/images/decks/child/back0.jpg",
      images: seq("/images/decks/child/cards/portrait", 1, 77),
    },
    {
      id: "action",
      label: "情况卡",
      backImage: "/images/decks/child/back1.jpg",
      images: seq("/images/decks/child/cards/action", 1, 44),
    },
  ],
  resilio: [
    {
      id: "main",
      label: "复原主卡",
      backImage: "/images/decks/resilio/back0.jpg",
      images: seq("/images/decks/resilio/cards/main", 1, 99),
    },
    {
      id: "animal",
      label: "动物卡",
      backImage: "/images/decks/resilio/back1.jpg",
      images: seq("/images/decks/resilio/cards/animal", 1, 44),
    },
  ],
};
