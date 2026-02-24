"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import Image from "next/image";
import { imageUrl } from "@/lib/imageUrl";
import Link from "next/link";
import { RotateCcw, Download, BookMarked, Sparkles, Pencil } from "lucide-react";
import { DECK_SUBDECKS } from "@/data/subdecks";
import { DECK_CARD_IMAGES, getBackImage } from "@/data/cards";
import {
  CustomSpread,
  CustomSpreadSnapshot,
  getSnapshot,
} from "@/lib/customSpread";
import { cn } from "@/lib/utils";

const CARD_W = 88;
const CARD_H = 124;

interface SlotState {
  index: number;
  x: number;
  y: number;
  imageUrl: string | null;
  flipped: boolean;
  backImage: string | null;
}

interface Props {
  spread: CustomSpread;
  initialSnapshot?: CustomSpreadSnapshot | null;
}

function getPool(deckSlug: string, subDeckId: string | undefined, drawnSoFar: string[]): string[] {
  const subDecks = DECK_SUBDECKS[deckSlug] ?? [];
  let pool: string[];
  if (subDeckId) {
    const sub = subDecks.find((s) => s.id === subDeckId);
    pool = sub ? sub.images : (DECK_CARD_IMAGES[deckSlug]?.cardImages ?? []);
  } else if (subDecks.length > 1) {
    pool = subDecks[0].images;
  } else if (subDecks.length === 1) {
    pool = subDecks[0].images;
  } else {
    pool = DECK_CARD_IMAGES[deckSlug]?.cardImages ?? [];
  }
  return pool.filter((img) => !drawnSoFar.includes(img));
}

export default function CustomSpreadPlayer({ spread, initialSnapshot }: Props) {
  const canvasRef = useRef<HTMLDivElement>(null);
  const [slots, setSlots] = useState<SlotState[]>(() => {
    const snapshotPositions = initialSnapshot?.positions ?? [];
    const drawnMap = new Map(
      snapshotPositions.filter((p): p is typeof p & { imageUrl: string } => !!p.imageUrl).map((p) => [p.index, p.imageUrl!])
    );
    return spread.positions.map((pos) => {
      const subDecks = DECK_SUBDECKS[pos.deckSlug] ?? [];
      const sub = pos.subDeckId ? subDecks.find((s) => s.id === pos.subDeckId) : subDecks[0];
      const backImage = sub?.backImage ?? getBackImage(pos.deckSlug);
      const snapPos = snapshotPositions.find((p) => p.index === pos.index);
      const imageUrl = drawnMap.get(pos.index) ?? snapPos?.imageUrl ?? null;
      return {
        index: pos.index,
        x: snapPos?.x ?? pos.x,
        y: snapPos?.y ?? pos.y,
        imageUrl: imageUrl ?? null,
        flipped: !!imageUrl,
        backImage,
      };
    });
  });
  const [lightboxSrc, setLightboxSrc] = useState<string | null>(null);

  const drawCard = useCallback(
    (positionIndex: number) => {
      const slot = slots[positionIndex];
      if (slot.flipped) {
        if (slot.imageUrl) setLightboxSrc(slot.imageUrl);
        return;
      }
      const pos = spread.positions[positionIndex];
      const drawnSoFar = slots.filter((s) => s.imageUrl).map((s) => s.imageUrl!);
      const pool = getPool(pos.deckSlug, pos.subDeckId, drawnSoFar);
      if (pool.length === 0) return;
      const randomImg = pool[Math.floor(Math.random() * pool.length)];
      setSlots((prev) =>
        prev.map((s) =>
          s.index === positionIndex
            ? { ...s, imageUrl: randomImg, flipped: true }
            : s
        )
      );
    },
    [slots, spread.positions]
  );

  const reset = useCallback(() => {
    setSlots((prev) =>
      prev.map((s) => {
        const pos = spread.positions[s.index];
        const subDecks = DECK_SUBDECKS[pos.deckSlug] ?? [];
        const sub = pos.subDeckId ? subDecks.find((x) => x.id === pos.subDeckId) : subDecks[0];
        return {
          ...s,
          imageUrl: null,
          flipped: false,
          backImage: sub?.backImage ?? getBackImage(pos.deckSlug),
        };
      })
    );
  }, [spread.positions]);

  const downloadCanvasAsImage = useCallback(async () => {
    if (!canvasRef.current) return;
    try {
      const { toPng } = await import("html-to-image");
      const dataUrl = await toPng(canvasRef.current, { pixelRatio: 2, backgroundColor: "#fefce8" });
      const a = document.createElement("a");
      a.href = dataUrl;
      a.download = `画布-${spread.name}-${Date.now()}.png`;
      a.click();
    } catch (e) {
      console.error(e);
      alert("下载失败，请稍后重试");
    }
  }, [spread.name]);

  const downloadDrawnResultAsImage = useCallback(async () => {
    if (!canvasRef.current) return;
    try {
      const { toPng } = await import("html-to-image");
      const dataUrl = await toPng(canvasRef.current, { pixelRatio: 2, backgroundColor: "#fefce8" });
      const a = document.createElement("a");
      a.href = dataUrl;
      a.download = `抽卡结果-${spread.name}-${Date.now()}.png`;
      a.click();
    } catch (e) {
      console.error(e);
      alert("下载失败，请稍后重试");
    }
  }, [spread.name]);

  const hasDrawnCards = slots.some((s) => s.imageUrl);

  return (
    <div className="space-y-4">
      <p className="text-sm text-warm-500">
        点击卡牌抽卡 · 翻开后可点击放大
      </p>
      <div
        ref={canvasRef}
        className="relative rounded-2xl border-2 border-dashed border-cream-300 bg-cream-50/50 w-full overflow-hidden"
        style={{ minHeight: 840, height: 840 }}
      >
        <div className="absolute left-3 top-3 z-20 flex flex-wrap gap-2">
          <button
            onClick={reset}
            className="inline-flex items-center gap-2 px-3 py-2 rounded-xl border border-cream-200 bg-white/95 text-warm-600 hover:bg-cream-50 text-sm"
          >
            <RotateCcw size={14} />
            重新抽卡
          </button>
          <Link
            href={`/spreads/custom/edit?id=${encodeURIComponent(spread.id)}`}
            className="inline-flex items-center gap-2 px-3 py-2 rounded-xl border border-cream-200 bg-white/95 text-warm-600 hover:bg-cream-50 text-sm"
          >
            <Pencil size={14} />
            编辑
          </Link>
          <button
            onClick={downloadCanvasAsImage}
            className="inline-flex items-center gap-2 px-3 py-2 rounded-xl border border-flame-200 bg-white/95 text-flame-600 hover:bg-flame-50 text-sm"
          >
            <Download size={14} />
            下载画布
          </button>
          <button
            onClick={downloadDrawnResultAsImage}
            disabled={!hasDrawnCards}
            className={cn(
              "inline-flex items-center gap-2 px-3 py-2 rounded-xl text-sm",
              hasDrawnCards
                ? "bg-gradient-flame text-white hover:opacity-95 border border-transparent"
                : "bg-cream-100 text-warm-400 cursor-not-allowed border border-cream-200"
            )}
          >
            <BookMarked size={14} />
            下载抽卡结果
          </button>
        </div>
        {slots.map((slot) => (
          <div
            key={slot.index}
            className="absolute flex flex-col items-center gap-1 select-none"
            style={{
              left: slot.x,
              top: slot.y,
              width: Math.max(CARD_W, 120),
              zIndex: 10,
            }}
          >
            <div
              className={cn(
                "relative w-[88px] h-[124px] rounded-xl overflow-hidden shadow-lg border-2 cursor-pointer transition-transform hover:scale-[1.02]",
                slot.flipped ? "border-gold-400" : "border-gold-200"
              )}
              onClick={() => drawCard(slot.index)}
            >
              {slot.flipped && slot.imageUrl ? (
                <Image
                  src={imageUrl(slot.imageUrl)}
                  alt={`位置 ${slot.index + 1}`}
                  fill
                  className="object-cover"
                  unoptimized
                  draggable={false}
                />
              ) : (
                <>
                  {slot.backImage && slot.backImage !== "/images/card-back-default.jpg" ? (
                    <Image
                      src={imageUrl(slot.backImage)}
                      alt="背面"
                      fill
                      className="object-cover"
                      unoptimized
                      draggable={false}
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-hero flex items-center justify-center">
                      <span className="text-white/60 text-xs font-serif">OH</span>
                    </div>
                  )}
                  <div className="absolute inset-0 flex items-center justify-center bg-black/10 hover:bg-black/20 transition-colors">
                    <Sparkles className="text-white/70" size={22} />
                  </div>
                </>
              )}
            </div>
            <span className="inline-flex justify-center bg-gradient-flame text-white rounded-full w-5 h-5 text-[10px] font-bold">
              {slot.index + 1}
            </span>
            <span className="w-full max-w-[120px] text-[10px] text-warm-700 text-center">
              {spread.positions.find((p) => p.index === slot.index)?.meaning ?? `位置 ${slot.index + 1}`}
            </span>
          </div>
        ))}
      </div>

      {lightboxSrc && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm"
          onClick={() => setLightboxSrc(null)}
        >
          <div
            className="relative w-[min(340px,85vw)] rounded-2xl overflow-hidden shadow-2xl ring-2 ring-gold-300/60"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={imageUrl(lightboxSrc)}
              alt="放大"
              width={340}
              height={480}
              className="w-full h-auto object-cover"
              unoptimized
            />
            <button
              className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/40 text-white hover:bg-black/60"
              onClick={() => setLightboxSrc(null)}
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
