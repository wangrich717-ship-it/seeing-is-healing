import { notFound } from "next/navigation";
import Link from "next/link";
import { ChevronRight, Sparkles } from "lucide-react";
import { SPREADS, getSpreadBySlug } from "@/data/spreads";
import CardDrawer from "@/components/CardDrawer";
import QuestionsPanel from "@/components/QuestionsPanel";
import { CONTENT_CLASS } from "@/lib/site";

export async function generateStaticParams() {
  return SPREADS.map((s) => ({ slug: s.slug }));
}

interface Props {
  params: Promise<{ slug: string }>;
}

export default async function SpreadDetailPage({ params }: Props) {
  const { slug } = await params;
  const spread = getSpreadBySlug(slug);
  if (!spread) return notFound();

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
            <span className="text-white">{spread.name}</span>
          </div>
        </div>
      </div>
      {/* 橙色区域其余部分随页面滚动 */}
      <div className="bg-gradient-hero py-12">
        <div className={CONTENT_CLASS}>
          <div className="flex flex-col md:flex-row md:items-start md:gap-12">
            <div className="flex-shrink-0 md:w-72">
              <div className="inline-block bg-white/20 backdrop-blur-sm text-white/90 text-xs px-3 py-1 rounded-full mb-3">
                {spread.category} · {spread.positionCount} 张卡
              </div>
              <h1 className="text-3xl md:text-4xl font-serif font-bold text-white">
                {spread.name}
              </h1>
            </div>
            <div className="mt-6 md:mt-8 flex-1 bg-white/10 backdrop-blur-sm rounded-2xl px-5 py-4 border border-white/20">
              <div className="flex items-center gap-2 mb-2">
                <Sparkles size={14} className="text-white/70" />
                <span className="text-white/80 text-xs font-semibold uppercase tracking-wide">牌阵说明</span>
              </div>
              <div
                className="text-white/85 text-sm leading-relaxed"
                dangerouslySetInnerHTML={{ __html: spread.introductionContent }}
              />
            </div>
          </div>
        </div>
      </div>

      <div className={`${CONTENT_CLASS} py-8 space-y-6`}>

        {/* 抽卡 + 引导问题：小屏纵向+抽屉，大屏 8:2 侧栏 */}
        <div className="flex flex-col lg:flex-row gap-5 items-start">
          {/* 抽卡探索 */}
          <div className="flex-[4] min-w-0 w-full bg-white rounded-2xl border border-cream-200 shadow-sm p-6 md:p-8">
            <h2 className="text-xl font-serif font-semibold text-warm-800 mb-6 text-center">
              抽卡探索
            </h2>
            <CardDrawer spread={spread} hideQuestions />
          </div>

          {/* 引导问题：大屏固定侧栏，小屏为触发按钮 + 侧边抽屉 */}
          <div className="w-full lg:w-auto lg:flex-1 lg:min-w-0 flex flex-col items-end lg:items-stretch">
            <QuestionsPanel questions={spread.recommendedQuestions} />
          </div>
        </div>

      </div>
    </div>
  );
}
