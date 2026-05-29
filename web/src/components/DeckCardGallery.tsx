"use client";

import { useState, useCallback } from "react";
import Image from "next/image";
import { SubDeck } from "@/data/subdecks";
import { imageUrl } from "@/lib/imageUrl";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

interface DeckCardGalleryProps {
  subDecks: SubDeck[];
}

export default function DeckCardGallery({ subDecks }: DeckCardGalleryProps) {
  const [activeSubDeck, setActiveSubDeck] = useState(0);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [failedImages, setFailedImages] = useState<Set<string>>(new Set());

  const current = subDecks[activeSubDeck];
  const images = current.images;

  const openLightbox = useCallback((index: number) => {
    setLightboxIndex(index);
  }, []);

  const closeLightbox = useCallback(() => {
    setLightboxIndex(null);
  }, []);

  const goPrev = useCallback(() => {
    setLightboxIndex((i) => (i !== null ? (i - 1 + images.length) % images.length : null));
  }, [images.length]);

  const goNext = useCallback(() => {
    setLightboxIndex((i) => (i !== null ? (i + 1) % images.length : null));
  }, [images.length]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "ArrowLeft") goPrev();
      else if (e.key === "ArrowRight") goNext();
      else if (e.key === "Escape") closeLightbox();
    },
    [goPrev, goNext, closeLightbox]
  );

  const handleImageError = useCallback((src: string) => {
    setFailedImages((prev) => new Set(prev).add(src));
  }, []);

  return (
    <div className="w-full">
      {/* 二级胶囊切换：仅多子套时显示 */}
      {subDecks.length > 1 && (
        <div className="flex gap-1 p-1 bg-cream-100 rounded-xl mb-5">
          {subDecks.map((sd, idx) => (
            <button
              key={sd.id}
              onClick={() => setActiveSubDeck(idx)}
              className={`flex-1 py-1.5 text-xs font-medium rounded-lg transition-all ${
                idx === activeSubDeck
                  ? "bg-gradient-to-r from-flame-500 to-gold-500 text-white shadow-sm"
                  : "text-warm-500 hover:text-warm-700"
              }`}
            >
              {sd.label}
              <span className={`ml-1 ${idx === activeSubDeck ? "text-white/80" : "text-warm-400"}`}>
                ({sd.images.length})
              </span>
            </button>
          ))}
        </div>
      )}

      {/* 卡牌数量说明 */}
      <p className="text-xs text-gray-400 mb-4">
        共 <span className="font-semibold text-flame-500">{images.length}</span> 张，点击可放大查看
      </p>

      {/* 10 列网格 */}
      <div className="grid grid-cols-5 sm:grid-cols-8 md:grid-cols-10 gap-2">
        {images.map((src, idx) => (
          <button
            key={`${current.id}-${idx}`}
            onClick={() => openLightbox(idx)}
            className="group relative aspect-[3/4] rounded overflow-hidden bg-orange-50 cursor-pointer hover:ring-2 hover:ring-flame-400 hover:scale-105 transition-transform"
          >
            {failedImages.has(src) ? (
              <div className="w-full h-full flex items-center justify-center text-gray-300 text-lg">
                ✦
              </div>
            ) : (
              <Image
                src={imageUrl(src)}
                alt={`${current.label} ${idx + 1}`}
                fill
                sizes="(max-width:640px) 20vw,(max-width:768px) 12vw,10vw"
                className="object-cover"
                unoptimized
                onError={() => handleImageError(src)}
              />
            )}
          </button>
        ))}
      </div>

      {/* 灯箱 */}
      {lightboxIndex !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
          onClick={closeLightbox}
          onKeyDown={handleKeyDown}
          tabIndex={0}
          role="dialog"
          aria-modal="true"
        >
          {/* 关闭 */}
          <button
            className="absolute top-4 right-4 text-white/80 hover:text-white z-10"
            onClick={closeLightbox}
          >
            <X size={28} />
          </button>

          {/* 上一张 */}
          <button
            className="absolute left-4 text-white/80 hover:text-white z-10 p-2 rounded-full bg-black/30 hover:bg-black/50"
            onClick={(e) => { e.stopPropagation(); goPrev(); }}
          >
            <ChevronLeft size={32} />
          </button>

          {/* 图片主体 */}
          <div
            className="relative max-w-[80vw] max-h-[85vh] aspect-[3/4]"
            style={{ height: "min(85vh, 80vw * 4 / 3)" }}
            onClick={(e) => e.stopPropagation()}
          >
            {failedImages.has(images[lightboxIndex]) ? (
              <div className="w-full h-full flex items-center justify-center bg-gray-800 rounded-xl text-white/40 text-4xl">
                ✦
              </div>
            ) : (
              <Image
                src={imageUrl(images[lightboxIndex])}
                alt={`${current.label} ${lightboxIndex + 1}`}
                fill
                sizes="80vw"
                className="object-contain rounded-xl"
                unoptimized
                onError={() => handleImageError(images[lightboxIndex])}
              />
            )}
          </div>

          {/* 下一张 */}
          <button
            className="absolute right-4 text-white/80 hover:text-white z-10 p-2 rounded-full bg-black/30 hover:bg-black/50"
            onClick={(e) => { e.stopPropagation(); goNext(); }}
          >
            <ChevronRight size={32} />
          </button>

          {/* 页码 */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white/60 text-sm">
            {lightboxIndex + 1} / {images.length}
          </div>
        </div>
      )}
    </div>
  );
}
