import Link from "next/link";
import { BookOpen, Layers, Map, MessageCircle, ArrowRight, Sparkles } from "lucide-react";
import { DECKS } from "@/data/decks";
import { SPREADS } from "@/data/spreads";
import { THEMES } from "@/data/themes";
import HeroCardMatrix from "@/components/HeroCardMatrix";
import ExploreOnboardingModal from "@/components/ExploreOnboardingModal";
import { CONTENT_CLASS } from "@/lib/site";

const features = [
  {
    icon: BookOpen,
    title: "套系百科",
    subtitle: `${DECKS.length} 套卡牌`,
    description: "从经典 OH 卡到伴侣卡、孩童卡、成年人像卡、复原卡、克服卡……每套卡牌的起源、理念与使用方法，一览无余。",
    href: "/decks",
    gradient: "from-flame-400 to-flame-600",
    bg: "bg-flame-50",
    border: "border-flame-200",
  },
  {
    icon: Layers,
    title: "牌阵中心",
    subtitle: `${SPREADS.length} 种牌阵`,
    description: "从单卡到多卡牌阵，点击即可抽卡，每个位置都有专属引导问题陪你深入探索。",
    href: "/spreads",
    gradient: "from-gold-400 to-gold-600",
    bg: "bg-gold-50",
    border: "border-gold-200",
  },
  {
    icon: Map,
    title: "专题疗愈",
    subtitle: `${THEMES.length} 个专题`,
    description: "从金钱丰盛、亲子内在小孩、创伤复原到关系亲密、职业决策，按主题探索适合的疗愈套系与牌阵。",
    href: "/themes",
    gradient: "from-flame-500 to-gold-500",
    bg: "bg-cream-100",
    border: "border-cream-300",
  },
  {
    icon: MessageCircle,
    title: "引导问题",
    subtitle: "学会提问",
    description: "为 OH 卡教练设计，按提问类型整理示例问题，帮助你在带领时学会如何发问、深化探索。",
    href: "/questions",
    gradient: "from-gold-500 to-flame-500",
    bg: "bg-gold-50",
    border: "border-gold-200",
  },
];

const FEATURED_DECK_SLUGS = ["classic", "tandoo", "child", "persona", "cope", "resilio"] as const;

export default function HomePage() {
  const featuredDecks = FEATURED_DECK_SLUGS.flatMap((slug) => {
    const d = DECKS.find((deck) => deck.slug === slug);
    return d ? [d] : [];
  });

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden min-h-[580px] flex items-center">
        <div className="absolute inset-0 bg-gradient-hero opacity-95" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_50%,rgba(255,255,255,0.12),transparent_55%)]" />
        <div className="absolute -top-20 -right-20 w-96 h-96 rounded-full bg-white/5" />

        <div className={`relative w-full ${CONTENT_CLASS} py-16 md:py-20`}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            {/* Left: Text */}
            <div>
              <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm text-white rounded-full px-4 py-1.5 text-sm mb-6">
                <Sparkles size={14} />
                <span>OH 卡 · 专业知识库</span>
              </div>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-serif font-bold text-white leading-tight mb-5 whitespace-nowrap">
                看见，<span className="text-gold-200">即疗愈</span>
              </h1>
              <p className="text-base md:text-lg text-white/85 leading-relaxed mb-8 max-w-md">
                一张卡片，一次相遇，一个关于自己的故事。<br />
                这里是 OH 卡教练与深度探索者的知识家园。
              </p>
              <div className="flex flex-wrap gap-3">
                <ExploreOnboardingModal />
                <Link
                  href="/decks"
                  className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm text-white font-medium px-6 py-3 rounded-xl hover:bg-white/30 transition-all border border-white/30"
                >
                  浏览套系百科
                </Link>
              </div>
            </div>

            {/* Right: Animated 4×4 Card Matrix */}
              <div className="hidden lg:flex justify-center">
              <div className="relative">
                {/* 心形光晕 */}
                <div
                  className="absolute inset-0 blur-2xl"
                  style={{
                    background: "radial-gradient(ellipse at center, rgba(255,255,255,0.18) 0%, transparent 70%)",
                  }}
                />
                <div className="relative">
                  <HeroCardMatrix />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Wave divider */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 80" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" className="w-full h-16">
            <path d="M0,40 C360,80 1080,0 1440,40 L1440,80 L0,80 Z" fill="#fdfaf5" />
          </svg>
        </div>
      </section>

      {/* OH 卡介绍 — 四大核心模块上方 */}
      <section className={`${CONTENT_CLASS} pt-16 pb-4`}>
        <div className="rounded-2xl border border-cream-200 bg-gradient-to-b from-white to-cream-50/50 p-6 md:p-8">
          <h2 className="text-xl md:text-2xl font-serif font-bold text-warm-800 mb-4 text-center">什么是 OH 卡？</h2>
          <p className="text-warm-600 leading-relaxed mb-3">
            OH 卡（OH Cards）由德国心理学家莫里茨·埃格迈尔与墨西哥艺术家埃利·拉曼于 1982 年共同创研，是一套无固定牌义、完全开放的心灵图卡。名称「OH」来自参与者看到卡牌组合时常发出的惊叹——「Oh！原来可以这样看。」
          </p>
          <p className="text-warm-600 leading-relaxed mb-3">
            它基于<strong>心理投射</strong>与<strong>潜意识呈现</strong>：面对模糊的图像或文字时，我们会不自觉地将自己的情绪、经历与想法投射其上。图卡多刺激右脑（直觉与情感），字卡多刺激左脑（理性与分析），二者结合促成直觉与理性的对话。
          </p>
          <p className="text-warm-600 leading-relaxed">
            核心理念是：无固定牌意、无对错输赢、无标准答案。OH 卡如同一面「心灵镜子」，帮助人们看见内在状态，是自我觉察与表达的媒介，广泛应用于自我探索、心理咨询、亲子互动与创意启发。
          </p>
        </div>
      </section>

      {/* Features Grid */}
      <section className={`${CONTENT_CLASS} py-20`}>
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-warm-800 mb-3">
            四大核心模块
          </h2>
          <p className="text-warm-500 text-lg">系统探索，深度自我疗愈</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {features.map((f) => {
            const Icon = f.icon;
            return (
              <Link
                key={f.href}
                href={f.href}
                className={`group ${f.bg} ${f.border} border rounded-2xl p-6 hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1`}
              >
                <div className="flex items-start gap-4">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${f.gradient} flex items-center justify-center flex-shrink-0 shadow-sm`}>
                    <Icon size={22} className="text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-1">
                      <h3 className="text-xl font-serif font-semibold text-warm-800">{f.title}</h3>
                      {/* 橙金渐变标签 */}
                      <span
                        className="text-xs px-2.5 py-0.5 rounded-full font-medium text-white"
                        style={{ background: "linear-gradient(to right, #f97316, #f59e0b)" }}
                      >
                        {f.subtitle}
                      </span>
                    </div>
                    <p className="text-warm-600 text-sm leading-relaxed">{f.description}</p>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Featured Decks */}
      <section className="bg-white py-20">
        <div className={CONTENT_CLASS}>
          <div className="flex items-center justify-between mb-10">
            <div>
              <h2 className="text-3xl font-serif font-bold text-warm-800 mb-2">精选套系</h2>
              <p className="text-warm-500">从经典到专题，每一套都有其独特的疗愈视角</p>
            </div>
            <Link
              href="/decks"
              className="hidden md:inline-flex items-center gap-1.5 text-flame-600 font-medium hover:text-flame-700 transition-colors"
            >
              查看全部 {DECKS.length} 套 <ArrowRight size={16} />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {featuredDecks.map((deck) => (
              <Link
                key={deck.slug}
                href={`/decks/${deck.slug}`}
                className="group bg-cream-50 border border-cream-200 rounded-2xl p-5 hover:shadow-card-hover hover:-translate-y-0.5 transition-all duration-200"
              >
                <div className="flex items-start gap-3 mb-3">
                  <div className="w-10 h-10 rounded-lg bg-gradient-flame flex items-center justify-center flex-shrink-0 text-white text-sm font-bold">
                    {deck.name.charAt(0)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-serif font-semibold text-warm-800 text-base leading-snug group-hover:text-flame-600 transition-colors">
                      {deck.name}
                    </h3>
                    {/* 橙金渐变标签 */}
                    <span
                      className="text-xs px-2 py-0.5 rounded-full mt-1 inline-block text-white font-medium"
                      style={{ background: "linear-gradient(to right, #f97316, #f59e0b)" }}
                    >
                      {deck.type}
                    </span>
                  </div>
                </div>
                <p className="text-warm-500 text-sm leading-relaxed line-clamp-2">{deck.description}</p>
                <div className="mt-3 text-xs text-warm-400">{deck.totalCards} 张</div>
              </Link>
            ))}
          </div>
          <div className="mt-6 text-center md:hidden">
            <Link
              href="/decks"
              className="inline-flex items-center gap-1.5 text-flame-600 font-medium hover:text-flame-700"
            >
              查看全部 {DECKS.length} 套 <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* OH 卡精神 */}
      <section className={`${CONTENT_CLASS} py-20`}>
        <div className="rounded-3xl bg-gradient-hero p-8 md:p-12 text-white text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(255,255,255,0.1),transparent_60%)]" />
          <div className="relative">
            <h2 className="text-2xl md:text-3xl font-serif font-bold mb-4">OH 卡精神</h2>
            <p className="text-white/80 mb-8 max-w-xl mx-auto">
              无固定牌意，无对错输赢，无标准答案。
              诠释权完全在使用者手中——同一张卡，在不同人眼中，意义皆可不同。
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {["尊重隐私", "尊重时间", "尊重想象", "尊重个体"].map((v) => (
                <div key={v} className="bg-white/15 backdrop-blur-sm rounded-xl py-3 px-4 font-medium text-sm">
                  {v}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
