import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { SPREADS } from "@/data/spreads";
import SpreadsPageClient from "@/components/SpreadsPageClient";
import { CONTENT_CLASS } from "@/lib/site";

export default function SpreadsPage() {
  return (
    <div className="min-h-screen bg-cream-50">
      {/* 仅面包屑冻结 */}
      <div className="sticky top-16 z-40 bg-gradient-hero py-2.5">
        <div className={CONTENT_CLASS}>
          <div className="flex items-center gap-2 text-white/70 text-sm flex-wrap">
            <Link href="/" className="hover:text-white transition-colors">首页</Link>
            <ChevronRight size={14} />
            <span className="text-white">牌阵中心</span>
          </div>
        </div>
      </div>
      {/* 橙色区域其余部分随页面滚动 */}
      <div className="bg-gradient-hero py-12">
        <div className={`${CONTENT_CLASS} flex flex-col sm:flex-row sm:items-start sm:justify-between gap-6`}>
          <div className="flex-shrink-0 min-w-0">
            <h1 className="text-3xl md:text-4xl font-serif font-bold text-white mb-2">
              牌阵中心
            </h1>
            <p className="text-white/90 text-sm">
              {SPREADS.length} 种牌阵 · 点击即可交互抽卡
            </p>
          </div>
          <Link
            href="/spreads/custom"
            className="flex-shrink-0 flex items-center gap-3 rounded-2xl bg-white/20 hover:bg-white/30 backdrop-blur-sm border border-white/30 px-5 py-3.5 transition-colors group"
          >
            <span className="font-semibold text-white group-hover:text-white">自定义牌阵</span>
            <ChevronRight size={20} className="text-white/90" />
          </Link>
        </div>
      </div>

      <SpreadsPageClient spreads={SPREADS} />
    </div>
  );
}
