"use client";

import { useState, useCallback } from "react";
import Image from "next/image";
import { imageUrl } from "@/lib/imageUrl";
import { motion, AnimatePresence } from "framer-motion";
import { RotateCcw, ChevronDown, ChevronUp, Sparkles } from "lucide-react";
import { Spread } from "@/data/spreads";
import { DECK_CARD_IMAGES, getBackImage } from "@/data/cards";
import { DECKS } from "@/data/decks";
import { DECK_SUBDECKS } from "@/data/subdecks";
import { cn } from "@/lib/utils";

interface DrawnCard {
  position: number;
  imageUrl: string | null;
  backImage: string | null;
  flipped: boolean;
}

interface Props {
  spread: Spread;
  /** 隐藏组件内部的引导问题区块（由外层页面自行展示时使用） */
  hideQuestions?: boolean;
}

export default function CardDrawer({ spread, hideQuestions = false }: Props) {
  const availableDecks = DECKS.filter((d) => spread.deckSlugs.includes(d.slug));
  const [selectedDeckSlug, setSelectedDeckSlug] = useState(
    availableDecks.length > 0 ? availableDecks[0].slug : ""
  );
  const defaultBack = getBackImage(availableDecks.length > 0 ? availableDecks[0].slug : "");

  const buildInitialCards = useCallback((deckSlug: string) => {
    const subDecks = DECK_SUBDECKS[deckSlug] ?? [];
    return spread.positions.map((p) => {
      const sub = p.subDeckId ? subDecks.find((s) => s.id === p.subDeckId) : null;
      const back = sub?.backImage ?? getBackImage(deckSlug);
      return { position: p.index, imageUrl: null, backImage: back, flipped: false };
    });
  }, [spread.positions]);

  const [cards, setCards] = useState<DrawnCard[]>(() => buildInitialCards(availableDecks[0]?.slug ?? ""));
  const [showQuestions, setShowQuestions] = useState(false);
  const [lightboxSrc, setLightboxSrc] = useState<string | null>(null);
  const allFlipped = cards.every((c) => c.flipped);

  const drawCard = useCallback(
    (positionIndex: number) => {
      if (cards[positionIndex].flipped) return;

      const position = spread.positions[positionIndex];
      const drawnSoFar = cards.filter((c) => c.imageUrl).map((c) => c.imageUrl);

      // 若该位置指定了 subDeckId，从对应子套抽；否则：多子套套系仅用第一个子套（图卡/主卡），不混用字卡等
      const subDecks = DECK_SUBDECKS[selectedDeckSlug] ?? [];
      let pool: string[];
      if (position?.subDeckId) {
        const sub = subDecks.find((s) => s.id === position.subDeckId);
        pool = sub ? sub.images : (DECK_CARD_IMAGES[selectedDeckSlug]?.cardImages ?? []);
      } else if (subDecks.length > 1) {
        // 经典 OH：仅图卡；morena：仅图像卡；tandoo：仅伴侣卡；persona/child：仅人像卡；resilio：仅复原主卡
        pool = subDecks[0].images;
      } else if (subDecks.length === 1) {
        pool = subDecks[0].images;
      } else {
        pool = DECK_CARD_IMAGES[selectedDeckSlug]?.cardImages ?? [];
      }

      const available = pool.filter((img) => !drawnSoFar.includes(img));
      if (available.length === 0) return;

      const randomImg = available[Math.floor(Math.random() * available.length)];

      setCards((prev) =>
        prev.map((c) =>
          c.position === positionIndex ? { ...c, imageUrl: randomImg, flipped: true } : c
        )
      );

      if (cards.filter((c) => c.flipped).length === cards.length - 1) {
        setTimeout(() => setShowQuestions(true), 800);
      }
    },
    [selectedDeckSlug, cards, spread.positions]
  );

  const reset = useCallback(() => {
    setCards(buildInitialCards(selectedDeckSlug));
    setShowQuestions(false);
  }, [buildInitialCards, selectedDeckSlug]);

  return (
    <div className="space-y-6">
      {/* Deck selector */}
      {availableDecks.length > 1 && (
        <div>
          <label className="text-sm font-medium text-warm-600 mb-2 block">选择套系</label>
          <div className="flex flex-wrap gap-2">
            {availableDecks.map((deck) => (
              <button
                key={deck.slug}
                onClick={() => {
                  setSelectedDeckSlug(deck.slug);
                  setCards(buildInitialCards(deck.slug));
                  setShowQuestions(false);
                }}
                className={cn(
                  "text-sm px-3 py-1.5 rounded-lg border transition-all",
                  selectedDeckSlug === deck.slug
                    ? "bg-gradient-flame text-white border-transparent shadow-sm"
                    : "bg-white text-warm-600 border-warm-200 hover:border-flame-300"
                )}
              >
                {deck.name}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Instruction */}
      <p className="text-sm text-warm-500 text-center">
        {cards.every((c) => !c.flipped)
          ? "点击下方卡牌，开始抽卡探索 ✦"
          : allFlipped
          ? "所有卡牌已翻开，展开引导问题深入探索 ✦"
          : "继续点击翻开其他卡牌 ✦"}
      </p>

      {/* Cards grid */}
      <div
        className={cn(
          "flex flex-wrap justify-center gap-6 md:gap-8",
          spread.positionCount === 1 && "justify-center",
          spread.positionCount === 2 && "justify-center",
          spread.positionCount >= 3 && "justify-center"
        )}
      >
        {spread.positions.map((position) => {
          const card = cards[position.index];
          const isFlipped = card?.flipped ?? false;

          return (
            <div key={position.index} className="flex flex-col items-center gap-2">
              {/* Card */}
              <div className="card-flip-container">
                <div
                  className={cn(
                    "card-flip-inner relative w-[88px] h-[124px] md:w-[104px] md:h-[146px] cursor-pointer",
                    isFlipped ? "flipped" : ""
                  )}
                  onClick={() => {
                    if (isFlipped && card?.imageUrl) {
                      setLightboxSrc(card.imageUrl);
                    } else {
                      drawCard(position.index);
                    }
                  }}
                >
                  {/* Card back */}
                  <div className="card-face absolute inset-0">
                    <div className="w-full h-full rounded-xl overflow-hidden shadow-card-glow ring-2 ring-gold-300/50">
                      {card?.backImage && card.backImage !== "/images/card-back-default.jpg" ? (
                        <Image
                          src={imageUrl(card.backImage)}
                          alt="卡牌背面"
                          fill
                          className="object-cover"
                          unoptimized
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-hero flex items-center justify-center">
                          <span className="text-white/60 text-sm font-serif">OH</span>
                        </div>
                      )}
                      {/* Pulse animation */}
                      {!isFlipped && (
                        <motion.div
                          className="absolute inset-0 rounded-xl bg-white/20"
                          animate={{ opacity: [0, 0.3, 0] }}
                          transition={{ duration: 2, repeat: Infinity }}
                        />
                      )}
                    </div>
                  </div>

                  {/* Card front */}
                  <div className="card-back-face absolute inset-0">
                    <div className="w-full h-full rounded-xl overflow-hidden shadow-card-hover ring-2 ring-gold-400/60">
                      {card?.imageUrl ? (
                        <CardImage src={imageUrl(card.imageUrl)} alt={`位置${position.index + 1}`} />
                      ) : (
                        <div className="w-full h-full bg-gradient-flame flex items-center justify-center">
                          <Sparkles className="text-white/50" size={24} />
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Position label — below card */}
              <div className="text-center max-w-[104px]">
                <span className="inline-flex items-center justify-center bg-gradient-flame text-white rounded-full w-5 h-5 text-[10px] font-bold mb-1">
                  {position.index + 1}
                </span>
                <p className="text-xs text-warm-500 leading-tight">{position.meaning}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Reset button */}
      <div className="flex justify-center">
        <button
          onClick={reset}
          className="inline-flex items-center gap-2 text-sm text-warm-400 hover:text-flame-600 transition-colors py-2 px-4 rounded-lg hover:bg-flame-50"
        >
          <RotateCcw size={14} />
          重新抽卡
        </button>
      </div>

      {/* Lightbox overlay */}
      <AnimatePresence>
        {lightboxSrc && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm"
            onClick={() => setLightboxSrc(null)}
          >
            <motion.div
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.85, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 28 }}
              className="relative w-[min(340px,85vw)] rounded-2xl overflow-hidden shadow-2xl ring-2 ring-gold-300/60"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={imageUrl(lightboxSrc)}
                alt="卡牌放大"
                width={340}
                height={480}
                className="w-full h-auto object-cover"
                unoptimized
              />
              <button
                className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/40 text-white/90 hover:bg-black/60 transition-colors flex items-center justify-center text-sm font-medium"
                onClick={() => setLightboxSrc(null)}
              >
                ✕
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Guided questions */}
      <AnimatePresence>
        {!hideQuestions && (allFlipped || showQuestions) && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="mt-4"
          >
            <div className="bg-gradient-card border border-gold-200 rounded-2xl overflow-hidden">
              <button
                className="w-full flex items-center justify-between px-5 py-4 hover:bg-gold-50/50 transition-colors"
                onClick={() => setShowQuestions((v) => !v)}
              >
                <div className="flex items-center gap-2">
                  <Sparkles size={16} className="text-gold-500" />
                  <span className="font-medium text-warm-700">引导问题</span>
                  <span className="text-xs text-warm-400">({spread.recommendedQuestions.length} 个)</span>
                </div>
                {showQuestions ? (
                  <ChevronUp size={16} className="text-warm-400" />
                ) : (
                  <ChevronDown size={16} className="text-warm-400" />
                )}
              </button>

              {showQuestions && (
                <motion.div
                  initial={{ height: 0 }}
                  animate={{ height: "auto" }}
                  className="px-5 pb-5"
                >
                  <ol className="space-y-3">
                    {spread.recommendedQuestions.map((q, i) => (
                      <li key={i} className="flex gap-3">
                        <span className="flex-shrink-0 w-6 h-6 rounded-full bg-gradient-flame text-white text-xs font-bold flex items-center justify-center mt-0.5">
                          {i + 1}
                        </span>
                        <p className="text-warm-700 text-sm leading-relaxed">{q}</p>
                      </li>
                    ))}
                  </ol>
                </motion.div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function CardImage({ src, alt }: { src: string; alt: string }) {
  const [error, setError] = useState(false);

  if (error) {
    return (
      <div className="w-full h-full bg-gradient-flame flex flex-col items-center justify-center gap-2">
        <Sparkles className="text-white/50" size={24} />
        <span className="text-white/50 text-xs">卡片图像</span>
      </div>
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      fill
      className="object-cover"
      unoptimized
      onError={() => setError(true)}
    />
  );
}
