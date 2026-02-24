"use client";

import React, { useState, useRef, useCallback, useEffect } from "react";
import Image from "next/image";
import { imageUrl } from "@/lib/imageUrl";
import { useRouter } from "next/navigation";
import { Save, Settings2, GripVertical, Download, Pencil, PlusCircle, Trash2 } from "lucide-react";
import { DECKS } from "@/data/decks";
import { DECK_SUBDECKS } from "@/data/subdecks";
import { getBackImage } from "@/data/cards";
import {
  CustomSpread,
  CustomSpreadPosition,
  createNewCustomSpread,
  saveCustomSpread,
  exportSpreadToCode,
} from "@/lib/customSpread";
import { cn } from "@/lib/utils";

const CARD_W = 88;
const CARD_H = 124;

interface Props {
  /** 编辑已有牌阵时传入 */
  initialSpread?: CustomSpread | null;
}

export default function CustomSpreadBuilder({ initialSpread }: Props) {
  const router = useRouter();
  const canvasRef = useRef<HTMLDivElement>(null);
  const [step, setStep] = useState<1 | 2>(initialSpread ? 2 : 1);
  const [name, setName] = useState(initialSpread?.name ?? "");
  const [positionCount, setPositionCount] = useState(initialSpread?.positions.length ?? 3);
  const [spread, setSpread] = useState<CustomSpread | null>(() => {
    if (initialSpread) return initialSpread;
    return null;
  });
  const [draggingIndex, setDraggingIndex] = useState<number | null>(null);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [slotMenuIndex, setSlotMenuIndex] = useState<number | null>(null);
  const [editingMeaningIndex, setEditingMeaningIndex] = useState<number | null>(null);
  const [canvasScale, setCanvasScale] = useState(1);

  const goToCanvas = useCallback(() => {
    if (!name.trim()) return;
    if (spread) {
      setStep(2);
      return;
    }
    const newSpread = createNewCustomSpread(name.trim(), positionCount);
    setSpread(newSpread);
    setStep(2);
  }, [name, positionCount, spread]);

  const updatePosition = useCallback((index: number, upd: Partial<CustomSpreadPosition>) => {
    setSpread((prev) => {
      if (!prev) return prev;
      const positions = prev.positions.map((p) =>
        p.index === index ? { ...p, ...upd } : p
      );
      return { ...prev, positions };
    });
  }, []);

  const handleSlotMouseDown = useCallback(
    (e: React.MouseEvent, index: number) => {
      if (slotMenuIndex !== null) return;
      e.preventDefault();
      const pos = spread?.positions.find((p) => p.index === index);
      if (!pos || !canvasRef.current) return;
      const rect = canvasRef.current.getBoundingClientRect();
      setDragOffset({ x: e.clientX - rect.left - pos.x, y: e.clientY - rect.top - pos.y });
      setDraggingIndex(index);
    },
    [spread, slotMenuIndex]
  );

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (draggingIndex === null || !canvasRef.current || !spread) return;
      const rect = canvasRef.current.getBoundingClientRect();
      let x = e.clientX - rect.left - dragOffset.x;
      let y = e.clientY - rect.top - dragOffset.y;
      x = Math.max(0, Math.min(rect.width - CARD_W, x));
      y = Math.max(0, Math.min(rect.height - CARD_H, y));
      updatePosition(draggingIndex, { x, y });
    },
    [draggingIndex, dragOffset, spread, updatePosition]
  );

  const handleMouseUp = useCallback(() => {
    setDraggingIndex(null);
  }, []);

  useEffect(() => {
    if (step !== 2) return;
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [step, handleMouseMove, handleMouseUp]);

  const handleSave = useCallback(() => {
    if (!spread) return;
    saveCustomSpread(spread);
    router.push(`/spreads/custom/play?id=${encodeURIComponent(spread.id)}`);
  }, [spread, router]);

  const handleDownloadCode = useCallback(() => {
    if (!spread) return;
    const blob = new Blob([exportSpreadToCode(spread)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `牌阵-${spread.name}-${spread.id.slice(0, 8)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  }, [spread]);

  const addPosition = useCallback(() => {
    setSpread((prev) => {
      if (!prev || prev.positions.length >= 12) return prev;
      const i = prev.positions.length;
      const newPos: CustomSpreadPosition = {
        index: i,
        meaning: `位置 ${i + 1}`,
        deckSlug: "classic",
        subDeckId: "img",
        x: 120 + (i % 4) * 120,
        y: 100 + Math.floor(i / 4) * 160,
      };
      return { ...prev, positions: [...prev.positions, newPos] };
    });
  }, []);

  const removePosition = useCallback((index: number) => {
    setSpread((prev) => {
      if (!prev || prev.positions.length <= 1) return prev;
      const next = prev.positions
        .filter((p) => p.index !== index)
        .map((p, i) => ({ ...p, index: i }));
      return { ...prev, positions: next };
    });
    setEditingMeaningIndex(null);
    if (slotMenuIndex === index) setSlotMenuIndex(null);
  }, [slotMenuIndex]);

  const syncNameToSpread = useCallback((newName: string) => {
    setName(newName);
    setSpread((prev) => (prev ? { ...prev, name: newName } : prev));
  }, []);

  if (step === 1) {
    return (
      <div className="max-w-md mx-auto space-y-6">
        <div>
          <label className="block text-sm font-medium text-warm-600 mb-2">牌阵名称</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="例如：我的三卡阵"
            className="w-full px-4 py-2.5 rounded-xl border border-cream-200 bg-white text-warm-800 placeholder:text-warm-300 focus:outline-none focus:ring-2 focus:ring-flame-400"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-warm-600 mb-2">抽取卡牌数量</label>
          <select
            value={positionCount}
            onChange={(e) => setPositionCount(Number(e.target.value))}
            className="w-full px-4 py-2.5 rounded-xl border border-cream-200 bg-white text-warm-800 focus:outline-none focus:ring-2 focus:ring-flame-400"
          >
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((n) => (
              <option key={n} value={n}>
                {n} 张
              </option>
            ))}
          </select>
        </div>
        <button
          onClick={goToCanvas}
          className="w-full py-3 rounded-xl bg-gradient-flame text-white font-medium hover:opacity-95 transition-opacity"
        >
          下一步：布置画布
        </button>
      </div>
    );
  }

  if (!spread) return null;

  return (
    <div className="space-y-4">
      <div className="rounded-xl bg-amber-50 border border-amber-200 px-4 py-3 text-sm text-warm-700">
        <strong>提示：</strong>创建的牌阵仅保存在浏览器本地缓存中，清理缓存后会丢失。建议使用画布左上角「下载代码文件」保存到本地。
      </div>
      <p className="text-sm text-warm-500">
        拖动卡牌调整位置 · 点击齿轮为每个位置选择套系与子套 · 点击编辑图标修改位置文字
      </p>
      <div className="flex flex-wrap items-center gap-4 mb-2">
        <div>
          <label className="text-xs text-warm-500 mr-2">牌阵名称</label>
          <input
            type="text"
            value={name}
            onChange={(e) => syncNameToSpread(e.target.value)}
            placeholder="例如：我的三卡阵"
            className="px-3 py-1.5 rounded-lg border border-cream-200 bg-white text-warm-800 text-sm w-48 focus:outline-none focus:ring-2 focus:ring-flame-400"
          />
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs text-warm-500">整体缩放</span>
          {[0.8, 1, 1.2].map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => setCanvasScale(s)}
              className={cn(
                "px-2.5 py-1 rounded-lg text-sm",
                canvasScale === s
                  ? "bg-flame-500 text-white"
                  : "border border-cream-200 text-warm-600 hover:bg-cream-50"
              )}
            >
              {s * 100}%
            </button>
          ))}
        </div>
        {spread.positions.length < 12 && (
          <button
            type="button"
            onClick={addPosition}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-cream-200 text-warm-600 hover:bg-cream-50 text-sm"
          >
            <PlusCircle size={16} />
            添加卡位
          </button>
        )}
      </div>
      <div
        ref={canvasRef}
        className="relative rounded-2xl border-2 border-dashed border-cream-300 bg-cream-50/50 w-full overflow-hidden"
        style={{ minHeight: 840, height: 840 }}
      >
        <div className="absolute left-3 top-3 z-20 flex flex-wrap gap-2">
          <button
            onClick={handleSave}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-flame text-white font-medium hover:opacity-95 text-sm"
          >
            <Save size={16} />
            {initialSpread ? "保存修改，去抽卡" : "创建完成，去抽卡"}
          </button>
          <button
            onClick={handleDownloadCode}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-amber-200 bg-white/90 text-amber-700 hover:bg-amber-50 text-sm"
          >
            <Download size={16} />
            下载代码文件
          </button>
        </div>
        <div
          className="absolute left-0 top-0 w-full h-full origin-top-left"
          style={{ transform: `scale(${canvasScale})` }}
        >
        {spread.positions.map((pos) => {
          const subDecks = DECK_SUBDECKS[pos.deckSlug] ?? [];
          const sub = pos.subDeckId
            ? subDecks.find((s) => s.id === pos.subDeckId)
            : subDecks[0];
          const backImage = sub?.backImage ?? getBackImage(pos.deckSlug);
          const deck = DECKS.find((d) => d.slug === pos.deckSlug);
          const isMenuOpen = slotMenuIndex === pos.index;

          return (
            <div
              key={pos.index}
              className="absolute flex flex-col items-center gap-1 select-none"
              style={{
                left: pos.x,
                top: pos.y,
                width: Math.max(CARD_W, 120),
                zIndex: draggingIndex === pos.index ? 30 : 10,
              }}
            >
              <div
                className="relative w-[88px] h-[124px] rounded-xl overflow-hidden shadow-lg border-2 border-gold-200 cursor-move flex items-center justify-center bg-white"
                onMouseDown={(e) => handleSlotMouseDown(e, pos.index)}
              >
                {backImage && backImage !== "/images/card-back-default.jpg" ? (
                  <Image
                    src={imageUrl(backImage)}
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
                <div className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 hover:opacity-100 transition-opacity pointer-events-none">
                  <GripVertical className="text-white" size={20} />
                </div>
              </div>
              <div className="flex items-center gap-1">
                <span className="inline-flex justify-center bg-gradient-flame text-white rounded-full w-5 h-5 text-[10px] font-bold flex-shrink-0">
                  {pos.index + 1}
                </span>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setSlotMenuIndex(slotMenuIndex === pos.index ? null : pos.index);
                  }}
                  className="p-1 rounded-lg bg-white border border-cream-200 hover:bg-flame-50 text-warm-600 flex-shrink-0"
                  title="选择套系"
                >
                  <Settings2 size={14} />
                </button>
                {spread.positions.length > 1 && (
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      removePosition(pos.index);
                    }}
                    className="p-1 rounded-lg bg-white border border-cream-200 hover:bg-red-50 text-red-500 flex-shrink-0"
                    title="删除此卡位"
                  >
                    <Trash2 size={14} />
                  </button>
                )}
              </div>
              {editingMeaningIndex === pos.index ? (
                <input
                  type="text"
                  defaultValue={pos.meaning ?? ""}
                  autoFocus
                  onClick={(e) => e.stopPropagation()}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      updatePosition(pos.index, { meaning: (e.target as HTMLInputElement).value });
                      setEditingMeaningIndex(null);
                    }
                  }}
                  onBlur={(e) => {
                    updatePosition(pos.index, { meaning: e.target.value });
                    setEditingMeaningIndex(null);
                  }}
                  className="w-full max-w-[120px] text-[10px] px-1.5 py-0.5 rounded border border-cream-200 bg-white text-warm-700 focus:outline-none focus:ring-1 focus:ring-flame-400 break-words"
                  placeholder="位置说明"
                />
              ) : (
                <div className="flex items-start gap-1 w-full max-w-[120px] min-h-[20px]">
                  <span className="text-[10px] text-warm-700 break-words flex-1 min-w-0 text-left leading-tight">
                    {pos.meaning?.trim() || `位置 ${pos.index + 1}`}
                  </span>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setEditingMeaningIndex(pos.index);
                    }}
                    className="p-0.5 rounded hover:bg-cream-100 text-warm-500 flex-shrink-0"
                    title="编辑文字"
                  >
                    <Pencil size={12} />
                  </button>
                </div>
              )}
              {isMenuOpen && (
                <>
                  <div
                    className="fixed inset-0 z-40"
                    onClick={() => setSlotMenuIndex(null)}
                  />
                  <div className="absolute left-0 top-full mt-2 z-50 w-64 rounded-xl border border-cream-200 bg-white shadow-xl p-3 space-y-3">
                    <div>
                      <label className="text-xs text-warm-500">套系</label>
                      <select
                        value={pos.deckSlug}
                        onChange={(e) => {
                          const slug = e.target.value;
                          const subs = DECK_SUBDECKS[slug] ?? [];
                          updatePosition(pos.index, {
                            deckSlug: slug,
                            subDeckId: subs[0]?.id,
                          });
                        }}
                        className="mt-0.5 w-full text-sm px-2 py-1.5 rounded-lg border border-cream-200"
                      >
                        {DECKS.map((d) => (
                          <option key={d.slug} value={d.slug}>
                            {d.name}
                          </option>
                        ))}
                      </select>
                    </div>
                    {(DECK_SUBDECKS[pos.deckSlug] ?? []).length > 1 && (
                      <div>
                        <label className="text-xs text-warm-500">子套</label>
                        <select
                          value={pos.subDeckId ?? ""}
                          onChange={(e) =>
                            updatePosition(pos.index, { subDeckId: e.target.value || undefined })
                          }
                          className="mt-0.5 w-full text-sm px-2 py-1.5 rounded-lg border border-cream-200"
                        >
                          {(DECK_SUBDECKS[pos.deckSlug] ?? []).map((s) => (
                            <option key={s.id} value={s.id}>
                              {s.label}
                            </option>
                          ))}
                        </select>
                      </div>
                    )}
                    <p className="text-xs text-warm-400">
                      {deck?.name}
                      {subDecks.length > 1 && sub ? ` · ${sub.label}` : ""}
                    </p>
                  </div>
                </>
              )}
            </div>
          );
        })}
        </div>
      </div>
    </div>
  );
}
