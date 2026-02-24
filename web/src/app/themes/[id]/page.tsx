import { notFound } from "next/navigation";
import Link from "next/link";
import { ChevronRight, Layers, BookOpen, ArrowRight } from "lucide-react";
import { THEMES, getThemeById } from "@/data/themes";
import { SPREADS } from "@/data/spreads";
import { DECKS } from "@/data/decks";
import { CONTENT_CLASS } from "@/lib/site";

export async function generateStaticParams() {
  return THEMES.map((t) => ({ id: t.id }));
}

interface Props {
  params: Promise<{ id: string }>;
}

export default async function ThemeDetailPage({ params }: Props) {
  const { id } = await params;
  const theme = getThemeById(id);
  if (!theme) return notFound();

  const relatedSpreads = theme.spreadSlugs
    .map((slug) => SPREADS.find((s) => s.slug === slug))
    .filter((s): s is NonNullable<typeof s> => s != null);
  const relatedDecks = theme.deckSlugs
    .map((slug) => DECKS.find((d) => d.slug === slug))
    .filter((d): d is NonNullable<typeof d> => d != null);

  return (
    <div className="min-h-screen bg-cream-50">
      {/* 仅面包屑冻结 */}
      <div className="sticky top-16 z-40 bg-gradient-hero py-2.5">
        <div className={CONTENT_CLASS}>
          <div className="flex items-center gap-2 text-white/70 text-sm flex-wrap">
            <Link href="/" className="hover:text-white transition-colors">首页</Link>
            <ChevronRight size={14} />
            <Link href="/themes" className="hover:text-white transition-colors">专题疗愈</Link>
            <ChevronRight size={14} />
            <span className="text-white">{theme.name}</span>
          </div>
        </div>
      </div>
      <div className="bg-gradient-hero py-12">
        <div className={CONTENT_CLASS}>
          <div className="inline-block bg-white/20 backdrop-blur-sm text-white/90 text-xs px-3 py-1 rounded-full mb-3">
            {theme.targetAudience ? `适用：${theme.targetAudience}` : "专题疗愈"}
          </div>
          <h1 className="text-3xl md:text-4xl font-serif font-bold text-white mb-2">
            {theme.name}
          </h1>
          <p className="text-white/85 text-sm">{theme.description}</p>
        </div>
      </div>

      <div className={`${CONTENT_CLASS} py-10 space-y-8`}>
        <div className="bg-white rounded-2xl border border-cream-200 shadow-sm p-6 md:p-8">
          <div
            className="prose-oh text-warm-700 leading-relaxed"
            dangerouslySetInnerHTML={{ __html: theme.introductionContent }}
          />
        </div>

        {relatedSpreads.length > 0 && (
          <div className="bg-white rounded-2xl border border-cream-200 shadow-sm p-6">
            <h2 className="text-lg font-serif font-semibold text-warm-800 mb-4 flex items-center gap-2">
              <Layers size={18} className="text-gold-500" />
              推荐牌阵
            </h2>
            <div className="flex flex-wrap gap-2">
              {relatedSpreads.map((s) => (
                <Link
                  key={s.slug}
                  href={`/spreads/${s.slug}`}
                  className="inline-flex items-center gap-1.5 text-sm bg-flame-50 hover:bg-gradient-flame hover:text-white text-flame-700 px-3 py-2 rounded-xl border border-flame-200 hover:border-transparent transition-all"
                >
                  {s.name}
                  <ArrowRight size={14} />
                </Link>
              ))}
            </div>
          </div>
        )}

        {relatedDecks.length > 0 && (
          <div className="bg-white rounded-2xl border border-cream-200 shadow-sm p-6">
            <h2 className="text-lg font-serif font-semibold text-warm-800 mb-4 flex items-center gap-2">
              <BookOpen size={18} className="text-gold-500" />
              适用套系
            </h2>
            <ul className="space-y-2">
              {relatedDecks.map((d) => (
                <li key={d.slug}>
                  <Link
                    href={`/decks/${d.slug}`}
                    className="text-warm-600 hover:text-flame-600 transition-colors underline-offset-2 hover:underline"
                  >
                    {d.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="text-center">
          <Link
            href="/themes"
            className="inline-flex items-center gap-2 text-flame-600 font-medium hover:text-flame-700"
          >
            <ChevronRight size={16} className="rotate-180" />
            返回专题疗愈
          </Link>
        </div>
      </div>
    </div>
  );
}
