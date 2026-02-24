"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { Spread, SPREAD_CATEGORIES } from "@/data/spreads";
import { cn } from "@/lib/utils";
import { CONTENT_CLASS } from "@/lib/site";

const categoryColors: Record<string, string> = {
  "经典核心":  "bg-flame-100 text-flame-700 border-flame-200",
  "叙事与创意":"bg-gold-100 text-gold-700 border-gold-200",
  "心灵疗愈":  "bg-orange-100 text-orange-700 border-orange-200",
  "自然与生活":"bg-amber-100 text-amber-700 border-amber-200",
  "人物与关系":"bg-yellow-100 text-yellow-700 border-yellow-200",
};

const ALL = "全部";

interface Props {
  spreads: Spread[];
}

export default function SpreadsPageClient({ spreads }: Props) {
  const categories = [ALL, ...SPREAD_CATEGORIES.filter((c) => spreads.some((s) => s.category === c))];
  const [active, setActive] = useState(ALL);

  const filtered = active === ALL ? spreads : spreads.filter((s) => s.category === active);

  const groups =
    active === ALL
      ? SPREAD_CATEGORIES.map((cat) => ({
          category: cat,
          spreads: spreads.filter((s) => s.category === cat),
        })).filter((g) => g.spreads.length > 0)
      : [{ category: active, spreads: filtered }];

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
                {cat === ALL ? `全部 (${spreads.length})` : cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Spread grid */}
      <div className={`${CONTENT_CLASS} py-10`}>
        <div className="space-y-10">
          {groups.map(({ category, spreads: groupSpreads }) => (
            <div key={category}>
              {active === ALL && (
                <div className="flex items-center gap-3 mb-5">
                  <span
                    className={cn(
                      "text-xs px-2.5 py-1 rounded-full border font-medium",
                      categoryColors[category] ?? "bg-gray-100 text-gray-600 border-gray-200"
                    )}
                  >
                    {category}
                  </span>
                  <span className="text-warm-400 text-sm">{groupSpreads.length} 种牌阵</span>
                </div>
              )}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {groupSpreads.map((spread) => (
                  <Link
                    key={spread.slug}
                    href={`/spreads/${spread.slug}`}
                    className="group bg-white border border-cream-200 rounded-2xl p-5 hover:shadow-card-hover hover:-translate-y-0.5 transition-all duration-200"
                  >
                    <div className="flex items-start justify-between gap-3 mb-3">
                      <div className="flex-1">
                        <h3 className="font-serif font-semibold text-warm-800 text-base group-hover:text-flame-600 transition-colors leading-snug mb-1.5">
                          {spread.name}
                        </h3>
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="text-xs bg-gradient-flame text-white px-2 py-0.5 rounded-full">
                            {spread.positionCount} 张卡
                          </span>
                          <span className="text-xs text-warm-400">
                            {spread.deckSlugs.length} 套系适用
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Position preview */}
                    <div className="flex gap-1.5 mb-3">
                      {spread.positions.map((pos) => (
                        <div
                          key={pos.index}
                          className="flex-1 bg-gradient-card border border-gold-100 rounded-lg px-1.5 py-2 text-center"
                        >
                          <div className="text-[10px] text-warm-400 leading-tight">{pos.meaning}</div>
                        </div>
                      ))}
                    </div>

                    <p className="text-warm-400 text-xs line-clamp-2">
                      {spread.recommendedQuestions[0]}
                    </p>
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
