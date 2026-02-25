"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, X } from "lucide-react";

interface QuestionsPanelProps {
  questions: string[];
}

export default function QuestionsPanel({ questions }: QuestionsPanelProps) {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const listContent = (
    <>
      <div className="flex items-center gap-2 mb-4">
        <Sparkles size={14} className="text-gold-500" />
        <h3 className="text-sm font-semibold text-warm-700">引导问题</h3>
        <span className="text-xs text-warm-400">({questions.length})</span>
      </div>
      <ol className="space-y-3">
        {questions.map((q, i) => (
          <li key={i} className="flex gap-2.5">
            <span className="flex-shrink-0 w-5 h-5 rounded-full bg-gradient-flame text-white text-[10px] font-bold flex items-center justify-center mt-0.5">
              {i + 1}
            </span>
            <p className="text-warm-600 text-sm leading-relaxed">{q}</p>
          </li>
        ))}
      </ol>
    </>
  );

  return (
    <>
      {/* 大屏：固定侧边栏 */}
      <div className="hidden lg:block flex-1 min-w-0 bg-white rounded-2xl border border-cream-200 shadow-sm p-5 sticky top-6">
        {listContent}
      </div>

      {/* 小屏：仅显示触发按钮 */}
      <div className="lg:hidden flex-shrink-0 w-full flex justify-end">
        <button
          type="button"
          onClick={() => setDrawerOpen(true)}
          className="inline-flex items-center gap-2 text-sm font-medium text-warm-700 bg-white border border-cream-200 rounded-xl px-4 py-2.5 shadow-sm hover:bg-cream-50 hover:border-flame-200 transition-colors"
        >
          <Sparkles size={16} className="text-gold-500" />
          引导问题 ({questions.length})
        </button>
      </div>

      {/* 小屏：底部抽屉弹窗 */}
      <AnimatePresence>
        {drawerOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-40 lg:hidden"
              onClick={() => setDrawerOpen(false)}
              aria-hidden="true"
            />
            <motion.aside
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 28, stiffness: 300 }}
              className="fixed left-0 right-0 bottom-0 z-50 max-h-[85vh] bg-white rounded-t-2xl border border-b-0 border-cream-200 shadow-xl flex flex-col lg:hidden"
              role="dialog"
              aria-label="引导问题"
            >
              <div className="flex items-center justify-between p-4 border-b border-cream-200 flex-shrink-0">
                <h3 className="text-base font-semibold text-warm-800">引导问题</h3>
                <button
                  type="button"
                  onClick={() => setDrawerOpen(false)}
                  className="p-2 rounded-lg text-warm-500 hover:bg-cream-100 hover:text-warm-700 transition-colors"
                  aria-label="关闭"
                >
                  <X size={20} />
                </button>
              </div>
              <div className="flex-1 overflow-y-auto p-5 min-h-0">
                {listContent}
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
