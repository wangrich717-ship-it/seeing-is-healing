"use client";

import { useState } from "react";
import { X, ArrowRight, ChevronLeft, Sparkles } from "lucide-react";
import { THEMES, getThemeById } from "@/data/themes";
import { getSpreadBySlug } from "@/data/spreads";
import CardDrawer from "@/components/CardDrawer";
import { cn } from "@/lib/utils";

type Step = "theme" | "spread" | "explore";

export default function ExploreOnboardingModal() {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState<Step>("theme");
  const [selectedThemeId, setSelectedThemeId] = useState<string | null>(null);
  const [selectedSpreadSlug, setSelectedSpreadSlug] = useState<string | null>(null);

  const theme = selectedThemeId ? getThemeById(selectedThemeId) : null;
  const spread = selectedSpreadSlug ? getSpreadBySlug(selectedSpreadSlug) : null;

  const openModal = () => {
    setStep("theme");
    setSelectedThemeId(null);
    setSelectedSpreadSlug(null);
    setOpen(true);
  };

  const closeModal = () => {
    setOpen(false);
  };

  const onSelectTheme = (id: string) => {
    setSelectedThemeId(id);
    setStep("spread");
  };

  const onSelectSpread = (slug: string) => {
    setSelectedSpreadSlug(slug);
    setStep("explore");
  };

  const backToTheme = () => {
    setSelectedThemeId(null);
    setSelectedSpreadSlug(null);
    setStep("theme");
  };

  const backToSpread = () => {
    setSelectedSpreadSlug(null);
    setStep("spread");
  };

  if (!open) {
    return (
      <button
        type="button"
        onClick={openModal}
        className="inline-flex items-center gap-2 bg-white text-flame-600 font-semibold px-6 py-3 rounded-xl hover:bg-gold-50 transition-all shadow-golden hover:shadow-card-hover"
      >
        立即探索
        <ArrowRight size={16} />
      </button>
    );
  }

  const themeList = THEMES;
  const spreadList = theme
    ? theme.spreadSlugs
        .map((slug) => getSpreadBySlug(slug))
        .filter((s): s is NonNullable<typeof s> => s != null)
    : [];

  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="absolute inset-0 bg-black/50" aria-hidden onClick={closeModal} />
        {/* 统一尺寸：抽卡步为 max-w-4xl(56rem)，整体按 1.3 倍 ≈ 72.8rem */}
        <div
          className="relative bg-white rounded-2xl shadow-xl flex flex-col max-h-[90vh] w-full max-w-[72.8rem]"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex-shrink-0 flex items-center justify-between px-5 py-4 border-b border-cream-200">
            <div className="flex items-center gap-3">
              {step !== "theme" && (
                <button
                  type="button"
                  onClick={step === "spread" ? backToTheme : backToSpread}
                  className="p-1.5 rounded-lg text-warm-500 hover:bg-cream-100 hover:text-warm-700"
                  aria-label="上一步"
                >
                  <ChevronLeft size={20} />
                </button>
              )}
              <h2 className="text-lg font-serif font-semibold text-warm-800">
                {step === "theme" && "选择专题"}
                {step === "spread" && theme && `选择牌阵 · ${theme.name}`}
                {step === "explore" && spread && spread.name}
              </h2>
            </div>
            <button
              type="button"
              onClick={closeModal}
              className="p-2 rounded-lg text-warm-500 hover:bg-cream-100 hover:text-warm-700"
              aria-label="关闭"
            >
              <X size={20} />
            </button>
          </div>

          {/* Body */}
          <div className="flex-1 overflow-y-auto min-h-0">
            {step === "theme" && (
              <div className="p-5 space-y-3">
                <p className="text-sm text-warm-500 mb-4">从专题疗愈中选择一个方向，再选牌阵开始探索。</p>
                {themeList.map((t) => (
                  <button
                    key={t.id}
                    type="button"
                    onClick={() => onSelectTheme(t.id)}
                    className="w-full text-left rounded-xl border border-cream-200 bg-cream-50/50 hover:bg-cream-100 hover:border-cream-300 p-4 transition-all"
                  >
                    <span className="font-medium text-warm-800 block">{t.name}</span>
                    <span className="text-sm text-warm-500 mt-0.5 block">{t.description}</span>
                  </button>
                ))}
              </div>
            )}

            {step === "spread" && theme && (
              <div className="p-5 space-y-3">
                <p className="text-sm text-warm-500 mb-4">选择该专题下的一个牌阵进行抽卡。</p>
                {spreadList.map((s) => (
                  <button
                    key={s.slug}
                    type="button"
                    onClick={() => onSelectSpread(s.slug)}
                    className="w-full text-left rounded-xl border border-cream-200 bg-cream-50/50 hover:bg-cream-100 hover:border-cream-300 px-4 py-3 transition-all flex items-center justify-between gap-3"
                  >
                    <span className="font-medium text-warm-800">{s.name}</span>
                    <span className="text-xs text-warm-400 flex-shrink-0">{s.positionCount} 张卡</span>
                  </button>
                ))}
              </div>
            )}

            {step === "explore" && spread && (
              <div className="p-5 md:p-6 space-y-6">
                {/* 牌阵说明 */}
                <div className="rounded-xl border border-gold-200 bg-gradient-to-b from-gold-50/50 to-white p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Sparkles size={14} className="text-gold-500" />
                    <span className="text-xs font-semibold text-warm-600 uppercase tracking-wide">牌阵说明</span>
                  </div>
                  <div
                    className="text-warm-700 text-sm leading-relaxed prose prose-sm max-w-none"
                    dangerouslySetInnerHTML={{ __html: spread.introductionContent }}
                  />
                </div>

                {/* 抽卡 + 引导问题 */}
                <div className="flex flex-col lg:flex-row gap-5 items-start">
                  <div className="flex-[4] min-w-0 w-full bg-cream-50/50 rounded-2xl border border-cream-200 p-5 md:p-6">
                    <h3 className="text-lg font-serif font-semibold text-warm-800 mb-4 text-center">抽卡探索</h3>
                    <CardDrawer spread={spread} hideQuestions />
                  </div>
                  <div className="flex-1 min-w-0 w-full lg:max-w-[220px] bg-white rounded-2xl border border-cream-200 p-4">
                    <div className="flex items-center gap-2 mb-3">
                      <Sparkles size={14} className="text-gold-500" />
                      <h3 className="text-sm font-semibold text-warm-700">引导问题</h3>
                      <span className="text-xs text-warm-400">({spread.recommendedQuestions.length})</span>
                    </div>
                    <ol className="space-y-2.5">
                      {spread.recommendedQuestions.map((q, i) => (
                        <li key={i} className="flex gap-2">
                          <span className="flex-shrink-0 w-5 h-5 rounded-full bg-gradient-flame text-white text-[10px] font-bold flex items-center justify-center mt-0.5">
                            {i + 1}
                          </span>
                          <p className="text-warm-600 text-sm leading-relaxed">{q}</p>
                        </li>
                      ))}
                    </ol>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
