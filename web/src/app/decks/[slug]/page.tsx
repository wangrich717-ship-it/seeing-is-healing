import { notFound } from "next/navigation";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { DECKS, getDeckBySlug } from "@/data/decks";
import { SPREADS } from "@/data/spreads";
import { DECK_SUBDECKS } from "@/data/subdecks";
import DeckDetailTabs from "@/components/DeckDetailTabs";
import { CONTENT_CLASS } from "@/lib/site";

export async function generateStaticParams() {
  return DECKS.map((deck) => ({ slug: deck.slug }));
}

interface Props {
  params: Promise<{ slug: string }>;
}

export default async function DeckDetailPage({ params }: Props) {
  const { slug } = await params;
  const deck = getDeckBySlug(slug);
  if (!deck) return notFound();

  const relatedSpreads = SPREADS.filter((s) => s.deckSlugs.includes(slug));
  const subDecks = DECK_SUBDECKS[slug] ?? [];

  return (
    <div className="min-h-screen bg-cream-50">
      {/* 仅面包屑冻结 */}
      <div className="sticky top-16 z-40 bg-gradient-hero py-2.5">
        <div className={CONTENT_CLASS}>
          <div className="flex items-center gap-2 text-white/70 text-sm flex-wrap">
            <Link href="/" className="hover:text-white transition-colors">首页</Link>
            <ChevronRight size={14} />
            <Link href="/decks" className="hover:text-white transition-colors">套系百科</Link>
            <ChevronRight size={14} />
            <span className="text-white">{deck.name}</span>
          </div>
        </div>
      </div>
      <div className="bg-gradient-hero py-12">
        <div className={CONTENT_CLASS}>
          <div className="max-w-2xl">
            <div className="inline-block bg-white/20 backdrop-blur-sm text-white/90 text-xs px-3 py-1 rounded-full mb-3">
              {deck.category}
            </div>
            <h1 className="text-3xl md:text-4xl font-serif font-bold text-white mb-3">
              {deck.name}
            </h1>
            <p className="text-white/80 leading-relaxed">{deck.description}</p>
            <div className="flex items-center gap-4 mt-4 text-sm text-white/70">
              <span className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-gold-300 inline-block" />
                {deck.type}
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-gold-300 inline-block" />
                {deck.totalCards} 张
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-gold-300 inline-block" />
                {relatedSpreads.length} 种牌阵
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className={`${CONTENT_CLASS} py-8`}>
        <DeckDetailTabs
          deckSlug={slug}
          deckName={deck.name}
          subDecks={subDecks}
          introductionContent={deck.introductionContent}
          relatedSpreads={relatedSpreads}
        />
      </div>
    </div>
  );
}
