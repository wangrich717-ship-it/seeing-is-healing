"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { ChevronRight } from "lucide-react";
import { useEffect, useState, Suspense } from "react";
import { getCustomSpread } from "@/lib/customSpread";
import CustomSpreadBuilder from "@/components/CustomSpreadBuilder";
import { CONTENT_CLASS } from "@/lib/site";

function EditContent() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id") ?? "";
  const [spread, setSpread] = useState<ReturnType<typeof getCustomSpread>>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (id) setSpread(getCustomSpread(id));
  }, [id]);

  if (!mounted) {
    return (
      <div className="min-h-screen bg-cream-50 flex items-center justify-center">
        <p className="text-warm-500">加载中…</p>
      </div>
    );
  }

  if (!id || !spread) {
    return (
      <div className="min-h-screen bg-cream-50 flex flex-col items-center justify-center gap-4">
        <p className="text-warm-600">未找到该牌阵</p>
        <Link href="/spreads/custom" className="text-flame-600 hover:underline">
          返回自定义牌阵
        </Link>
      </div>
    );
  }

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
            <span className="text-white">编辑：{spread.name}</span>
          </div>
        </div>
      </div>
      <div className="bg-gradient-hero py-12">
        <div className={CONTENT_CLASS}>
          <div className="inline-block bg-white/20 backdrop-blur-sm text-white/90 text-xs px-3 py-1 rounded-full mb-3">
            修改布局、套系或位置文字后保存
          </div>
          <h1 className="text-3xl md:text-4xl font-serif font-bold text-white">
            继续编辑牌阵
          </h1>
        </div>
      </div>

      <div className={`${CONTENT_CLASS} py-10`}>
        <CustomSpreadBuilder initialSpread={spread} />
      </div>
    </div>
  );
}

export default function EditCustomSpreadPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-cream-50 flex items-center justify-center">
          <p className="text-warm-500">加载中…</p>
        </div>
      }
    >
      <EditContent />
    </Suspense>
  );
}
