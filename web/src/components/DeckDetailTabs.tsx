"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Spread } from "@/data/spreads";
import { SubDeck } from "@/data/subdecks";
import DeckCardGallery from "./DeckCardGallery";

interface Props {
  deckSlug: string;
  deckName: string;
  subDecks: SubDeck[];
  introductionContent: string;
  relatedSpreads: Spread[];
}

const TABS = [
  { id: "cards", label: "卡牌展示" },
  { id: "intro", label: "套系介绍" },
  { id: "spreads", label: "适用牌阵" },
] as const;

type TabId = (typeof TABS)[number]["id"];

function SpreadList({ spreads }: { spreads: Spread[] }) {
  if (spreads.length === 0) {
    return (
      <p className="text-warm-400 text-sm text-center py-6">暂无牌阵</p>
    );
  }
  return (
    <ul className="space-y-3">
      {spreads.map((spread) => (
        <li key={spread.slug}>
          <Link
            href={`/spreads/${spread.slug}`}
            className="group flex items-center justify-between p-4 rounded-xl bg-cream-50 hover:bg-flame-50 border border-cream-200 hover:border-flame-200 transition-all"
          >
            <div className="min-w-0">
              <span className="font-medium text-warm-800 group-hover:text-flame-600 transition-colors text-sm">
                {spread.name}
              </span>
              <div className="flex items-center gap-3 mt-1">
                <span className="text-xs text-warm-400">
                  {spread.positionCount} 个位置 · {spread.category}
                </span>
              </div>
              <p className="text-xs text-warm-400 mt-1 line-clamp-1">
                {spread.recommendedQuestions[0]}
              </p>
            </div>
            <div className="flex items-center gap-1 text-warm-300 group-hover:text-flame-500 transition-colors flex-shrink-0 ml-3">
              <span className="text-xs hidden sm:block">抽卡</span>
              <ArrowRight size={14} />
            </div>
          </Link>
        </li>
      ))}
    </ul>
  );
}

export default function DeckDetailTabs({
  deckSlug,
  subDecks,
  introductionContent,
  relatedSpreads,
}: Props) {
  const [activeTab, setActiveTab] = useState<TabId>("cards");

  return (
    <div className="bg-white rounded-2xl border border-cream-200 shadow-sm overflow-hidden">
      {/* 主 Tab Bar */}
      <div className="flex border-b border-cream-200">
        {TABS.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex-1 py-3.5 text-sm font-medium transition-all relative ${
              activeTab === tab.id
                ? "text-flame-600"
                : "text-warm-400 hover:text-warm-600"
            }`}
          >
            {tab.label}
            {activeTab === tab.id && (
              <motion.div
                layoutId="deck-tab-underline"
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-flame"
              />
            )}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="p-6">
        <AnimatePresence mode="wait">
          {activeTab === "cards" && (
            <motion.div
              key="cards"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <DeckCardGallery subDecks={subDecks} />
            </motion.div>
          )}

          {activeTab === "intro" && (
            <motion.div
              key="intro"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <div
                className="prose-oh"
                dangerouslySetInnerHTML={{ __html: introductionContent }}
              />
            </motion.div>
          )}

          {activeTab === "spreads" && (
            <motion.div
              key="spreads"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <SpreadList spreads={relatedSpreads} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
