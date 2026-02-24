import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { THEMES, getThemesForDisplay } from "@/data/themes";
import ThemesPageClient from "@/components/ThemesPageClient";
import { CONTENT_CLASS } from "@/lib/site";

export default function ThemesPage() {
  return (
    <div className="min-h-screen bg-cream-50">
      {/* 仅面包屑冻结 */}
      <div className="sticky top-16 z-40 bg-gradient-hero py-2.5">
        <div className={CONTENT_CLASS}>
          <div className="flex items-center gap-2 text-white/70 text-sm flex-wrap">
            <Link href="/" className="hover:text-white transition-colors">首页</Link>
            <ChevronRight size={14} />
            <span className="text-white">专题疗愈</span>
          </div>
        </div>
      </div>
      <div className="bg-gradient-hero py-12">
        <div className={CONTENT_CLASS}>
          <h1 className="text-3xl md:text-4xl font-serif font-bold text-white mb-2">
            专题疗愈
          </h1>
          <p className="text-white/90 text-sm">
            按疗愈主题选择 · {THEMES.length} 个专题 · 对应牌阵与套系
          </p>
        </div>
      </div>

      <ThemesPageClient themes={getThemesForDisplay()} />
    </div>
  );
}
