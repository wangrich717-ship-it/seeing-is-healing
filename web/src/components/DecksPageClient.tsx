"use client";

import { useState } from "react";
import Link from "next/link";
import { CardDeck, DECK_CATEGORIES } from "@/data/decks";
import { cn } from "@/lib/utils";
import { CONTENT_CLASS } from "@/lib/site";

const categoryMeta: Record<string, { dot: string; bg: string; border: string; desc: string }> = {
  "经典核心":   { dot: "bg-flame-500",  bg: "bg-flame-50",  border: "border-flame-200",  desc: "OH 卡的起点与基石" },
  "叙事与创意": { dot: "bg-gold-500",   bg: "bg-gold-50",   border: "border-gold-200",   desc: "故事、神话与创意叙事" },
  "心灵疗愈":   { dot: "bg-orange-500", bg: "bg-orange-50", border: "border-orange-200", desc: "情绪、创伤与心理成长" },
  "自然与生活": { dot: "bg-amber-500",  bg: "bg-amber-50",  border: "border-amber-200",  desc: "自然、生活与主题联想" },
  "人物与关系": { dot: "bg-gold-400",   bg: "bg-gold-50",   border: "border-gold-200",   desc: "人像、关系与角色探索" },
};

const ALL = "全部";

interface Props {
  decks: CardDeck[];
}

export default function DecksPageClient({ decks }: Props) {
  const categories = [ALL, ...DECK_CATEGORIES.filter((c) => decks.some((d) => d.category === c))];
  const [active, setActive] = useState(ALL);

  const filtered = active === ALL ? decks : decks.filter((d) => d.category === active);

  // Group by category for display (within filtered set)
  const groups =
    active === ALL
      ? DECK_CATEGORIES.map((cat) => ({
          category: cat,
          decks: decks.filter((d) => d.category === cat),
        })).filter((g) => g.decks.length > 0)
      : [{ category: active, decks: filtered }];

  return (
    <div>
      {/* Sticky tab bar */}
      <div className="sticky z-20 bg-white shadow-sm" style={{ top: "calc(4rem + 2.5rem)" }}>
        <div className={CONTENT_CLASS}>
          <div className="flex items-center gap-2 overflow-x-auto py-3 scrollbar-hide">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActive(cat)}
                className={cn(
                  "flex-shrink-0 text-sm px-4 py-1.5 rounded-full border transition-all duration-200 font-medium",
                  active === cat
                    ? "text-white border-transparent shadow-sm"
                    : "bg-white text-warm-500 border-warm-200 hover:border-flame-300 hover:text-flame-600"
                )}
                style={
                  active === cat
                    ? { background: "linear-gradient(to right, #f97316, #f59e0b)" }
                    : undefined
                }
              >
                {cat === ALL ? `全部 (${decks.length})` : cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Deck grid */}
      <div className={`${CONTENT_CLASS} py-10`}>
        <div className="space-y-10">
          {groups.map(({ category, decks: groupDecks }) => (
            <div key={category}>
              {active === ALL && (
                <div className="flex items-center gap-3 mb-2">
                  <div className={`w-3 h-3 rounded-full ${categoryMeta[category]?.dot ?? "bg-gray-400"}`} />
                  <h2 className="text-xl font-serif font-semibold text-warm-800">{category}</h2>
                  <span className="text-warm-400 text-sm">({groupDecks.length} 套)</span>
                </div>
              )}
              {active === ALL && categoryMeta[category]?.desc && (
                <p className="text-warm-400 text-sm mb-5 ml-6">{categoryMeta[category].desc}</p>
              )}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {groupDecks.map((deck) => (
                  <Link
                    key={deck.slug}
                    href={`/decks/${deck.slug}`}
                    className={cn(
                      "group rounded-2xl border p-5 hover:shadow-card-hover hover:-translate-y-0.5 transition-all duration-200",
                      categoryMeta[deck.category]?.bg ?? "bg-white",
                      categoryMeta[deck.category]?.border ?? "border-cream-200"
                    )}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex-1 min-w-0">
                        <h3 className="font-serif font-semibold text-warm-800 text-base mb-1 group-hover:text-flame-600 transition-colors leading-snug">
                          {deck.name}
                        </h3>
                        <div className="flex items-center gap-2 mb-2">
                          <span
                            className="text-xs px-2 py-0.5 rounded-full font-medium text-white"
                            style={{ background: "linear-gradient(to right, #f97316, #f59e0b)" }}
                          >
                            {deck.type}
                          </span>
                          <span className="text-xs text-warm-400">{deck.totalCards} 张</span>
                        </div>
                        <p className="text-warm-500 text-sm leading-relaxed line-clamp-3">{deck.description}</p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
