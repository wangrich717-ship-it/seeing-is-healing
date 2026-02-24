"use client";

import { useState } from "react";
import Link from "next/link";
import { MessageCircle, ChevronRight } from "lucide-react";
import { QUESTION_SECTIONS, QUESTIONS } from "@/data/questions";
import { CONTENT_CLASS } from "@/lib/site";
import { SPREADS } from "@/data/spreads";
import { cn } from "@/lib/utils";

const spreadSlugToName: Record<string, string> = Object.fromEntries(
  SPREADS.map((s) => [s.slug, s.name])
);

export default function GuidingQuestionsPage() {
  const [selectedTypeId, setSelectedTypeId] = useState<string | null>(null);
  const [expandedSectionId, setExpandedSectionId] = useState<string | null>(null);

  const filteredSections =
    selectedTypeId === null
      ? QUESTION_SECTIONS
      : QUESTION_SECTIONS.filter((s) => s.id === selectedTypeId);

  return (
    <div className="min-h-screen bg-cream-50">
      {/* 仅面包屑冻结 */}
      <div className="sticky top-16 z-40 bg-gradient-hero py-2.5">
        <div className={CONTENT_CLASS}>
          <div className="flex items-center gap-2 text-white/70 text-sm flex-wrap">
            <Link href="/" className="hover:text-white transition-colors">首页</Link>
            <ChevronRight size={14} />
            <span className="text-white">引导问题</span>
          </div>
        </div>
      </div>
      <div className="bg-gradient-hero py-12">
        <div className={CONTENT_CLASS}>
          <h1 className="text-3xl md:text-4xl font-serif font-bold text-white mb-2">
            引导问题
          </h1>
          <p className="text-white/90 text-sm max-w-2xl">
            为 OH 卡教练设计：按「提问类型」整理示例问题，帮助你在带领时学会如何发问、何时深化，让探索更安全、更有效。
          </p>
        </div>
      </div>

      {/* Sticky 筛选项：与牌阵中心、套系百科一致 */}
      <div className="sticky z-20 bg-white shadow-sm" style={{ top: "calc(4rem + 2.5rem)" }}>
        <div className={CONTENT_CLASS}>
          <div className="flex items-center gap-2 overflow-x-auto py-3 scrollbar-hide">
            <button
              type="button"
              onClick={() => setSelectedTypeId(null)}
              className={cn(
                "flex-shrink-0 text-sm px-4 py-1.5 rounded-full border transition-all duration-200 font-medium",
                selectedTypeId === null
                  ? "text-white border-transparent shadow-sm"
                  : "bg-white text-warm-500 border-warm-200 hover:border-flame-300 hover:text-flame-600"
              )}
              style={
                selectedTypeId === null
                  ? { background: "linear-gradient(to right, #f97316, #f59e0b)" }
                  : undefined
              }
            >
              全部 ({QUESTIONS.length})
            </button>
            {QUESTION_SECTIONS.map((section) => (
              <button
                key={section.id}
                type="button"
                onClick={() => {
                  setSelectedTypeId(section.id);
                  setExpandedSectionId(section.id);
                }}
                className={cn(
                  "flex-shrink-0 text-sm px-4 py-1.5 rounded-full border transition-all duration-200 font-medium",
                  selectedTypeId === section.id
                    ? "text-white border-transparent shadow-sm"
                    : "bg-white text-warm-500 border-warm-200 hover:border-flame-300 hover:text-flame-600"
                )}
                style={
                  selectedTypeId === section.id
                    ? { background: "linear-gradient(to right, #f97316, #f59e0b)" }
                    : undefined
                }
              >
                {section.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className={`${CONTENT_CLASS} py-8`}>

        {/* 按类型分块展示 */}
        {filteredSections.length === 0 ? (
          <div className="bg-white rounded-2xl border border-cream-200 p-12 text-center">
            <MessageCircle size={32} className="text-warm-200 mx-auto mb-3" />
            <p className="text-warm-400 text-sm">暂无该类型问题</p>
          </div>
        ) : (
          <div className="space-y-6">
            {filteredSections.map((section) => {
              const isExpanded =
                expandedSectionId === section.id || selectedTypeId === section.id;
              return (
                <section
                  key={section.id}
                  className="bg-white rounded-2xl border border-cream-200 overflow-hidden"
                >
                  <button
                    type="button"
                    onClick={() =>
                      setExpandedSectionId(
                        expandedSectionId === section.id ? null : section.id
                      )
                    }
                    className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left hover:bg-cream-50/50 transition-colors lg:cursor-default"
                  >
                    <div className="flex-1 min-w-0">
                      <h2 className="text-lg font-serif font-semibold text-warm-800">
                        {section.name}
                      </h2>
                      <p className="text-sm text-warm-500 mt-0.5 line-clamp-2">
                        {section.intro}
                      </p>
                    </div>
                    <span className="flex-shrink-0 text-sm text-warm-400">
                      {section.questions.length} 个问题
                    </span>
                    <ChevronRight
                      size={18}
                      className={`flex-shrink-0 text-warm-400 lg:hidden transition-transform ${
                        isExpanded ? "rotate-90" : ""
                      }`}
                    />
                  </button>
                  <div
                    className={`border-t border-cream-100 ${
                      isExpanded ? "block" : "hidden lg:block"
                    }`}
                  >
                    <ul className="divide-y divide-cream-100">
                      {section.questions.map((q) => (
                        <li key={q.id} className="px-5 py-3 hover:bg-cream-50/50">
                          <p className="text-warm-800 text-sm leading-relaxed">
                            {q.content}
                          </p>
                          {q.spreadSlug && (
                            <Link
                              href={`/spreads/${q.spreadSlug}`}
                              className="inline-block mt-1.5 text-xs text-flame-600 hover:text-flame-700"
                            >
                              → {spreadSlugToName[q.spreadSlug] ?? q.spreadSlug}
                            </Link>
                          )}
                        </li>
                      ))}
                    </ul>
                  </div>
                </section>
              );
            })}
          </div>
        )}

        <p className="mt-8 text-center text-sm text-warm-400">
          共 {QUESTIONS.length} 个引导问题，按 {QUESTION_SECTIONS.length} 种提问类型整理
        </p>
      </div>
    </div>
  );
}
