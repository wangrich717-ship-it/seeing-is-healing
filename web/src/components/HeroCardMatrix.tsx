"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

// 只使用 OH卡图卡
const POOL = Array.from({ length: 88 }, (_, i) => `/images/decks/classic/cards/img/${i + 1}.jpg`);

function shuffle(arr: string[]): string[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function pick12(): string[] {
  return shuffle(POOL).slice(0, 12);
}

function CardImg({ src }: { src: string }) {
  const [err, setErr] = useState(false);
  if (err) {
    return (
      <div className="w-full h-full bg-gradient-to-br from-flame-500/60 to-gold-400/60" />
    );
  }
  return (
    <Image
      src={src}
      alt="OH 卡"
      fill
      className="object-cover"
      unoptimized
      onError={() => setErr(true)}
    />
  );
}

export default function HeroCardMatrix() {
  // 初始给空数组，避免服务端与客户端随机值不同导致 hydration 错误
  const [cards, setCards] = useState<string[]>([]);
  const [gen, setGen] = useState(0);

  useEffect(() => {
    // 客户端挂载后才填入随机卡片
    setCards(pick12());
    const t = setInterval(() => {
      setCards(pick12());
      setGen((g) => g + 1);
    }, 3000);
    return () => clearInterval(t);
  }, []);

  return (
    // 心形裁剪容器（原 296×324，×1.8 = 533×583）
    <div
      style={{
        width: 533,
        height: 466,
        clipPath:
          "path('M 266 75 C 266 38 203 6 126 29 C 47 52 11 130 11 182 C 11 328 266 458 266 458 C 266 458 522 328 522 182 C 522 130 486 52 407 29 C 329 6 266 38 266 75 Z')",
        overflow: "hidden",
      }}
    >
      {/* 卡牌网格 4列 × 3行 */}
      <div className="grid grid-cols-4 gap-1 p-1 w-full h-full">
        <AnimatePresence mode="wait">
          {cards.map((src, i) => (
            <motion.div
              key={`${gen}-${i}`}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.4, delay: i * 0.02, ease: "easeOut" }}
              className="relative rounded-sm overflow-hidden"
              style={{ aspectRatio: "2/3" }}
            >
              <CardImg src={src} />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
