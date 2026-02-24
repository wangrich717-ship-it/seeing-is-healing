import Link from "next/link";
import { ChevronRight } from "lucide-react";
import CustomSpreadBuilder from "@/components/CustomSpreadBuilder";
import { CONTENT_CLASS } from "@/lib/site";

export default function NewCustomSpreadPage() {
  return (
    <div className="min-h-screen bg-cream-50">
      {/* 仅面包屑冻结 */}
      <div className="sticky top-16 z-40 bg-gradient-hero py-2.5">
        <div className={CONTENT_CLASS}>
          <div className="flex items-center gap-2 text-white/70 text-sm flex-wrap">
            <Link href="/" className="hover:text-white transition-colors">首页</Link>
            <ChevronRight size={14} />
            <Link href="/spreads" className="hover:text-white transition-colors">牌阵中心</Link>
            <ChevronRight size={14} />
            <Link href="/spreads/custom" className="hover:text-white transition-colors">自定义牌阵</Link>
            <ChevronRight size={14} />
            <span className="text-white">创建牌阵</span>
          </div>
        </div>
      </div>
      <div className="bg-gradient-hero py-12">
        <div className={CONTENT_CLASS}>
          <div className="inline-block bg-white/20 backdrop-blur-sm text-white/90 text-xs px-3 py-1 rounded-full mb-3">
            设置张数、在画布上拖动布置，并为每个位置选择套系
          </div>
          <h1 className="text-3xl md:text-4xl font-serif font-bold text-white">
            创建自定义牌阵
          </h1>
        </div>
      </div>

      <div className={`${CONTENT_CLASS} py-10`}>
        <CustomSpreadBuilder />
      </div>
    </div>
  );
}
