import Link from "next/link";
import { CONTENT_CLASS } from "@/lib/site";

export default function Footer() {
  return (
    <footer className="bg-warm-900 text-warm-300 py-12 mt-20">
      <div className={CONTENT_CLASS}>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-7 h-7 rounded-full bg-gradient-flame flex items-center justify-center">
                <span className="text-white text-xs font-bold">OH</span>
              </div>
              <span className="font-serif text-white font-semibold">看见，即疗愈</span>
            </div>
            <p className="text-sm leading-relaxed text-warm-400 max-w-sm">
              OH 卡知识库 · 专为 OH 卡教练与重度用户打造。
              在这里，你可以探索每一套卡牌、尝试各种牌阵、深入研究引导问题，
              让图像成为通往内在的桥梁。
            </p>
          </div>
          <div>
            <h4 className="text-white font-medium mb-3 text-sm">探索</h4>
            <ul className="space-y-2 text-sm">
              {[
                { href: "/decks", label: "套系百科" },
                { href: "/spreads", label: "牌阵中心" },
                { href: "/themes", label: "主题图谱" },
                { href: "/questions", label: "引导问题" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-warm-400 hover:text-gold-400 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-white font-medium mb-3 text-sm">OH 卡精神</h4>
            <ul className="space-y-2 text-sm text-warm-400">
              <li>尊重隐私</li>
              <li>尊重时间</li>
              <li>尊重想象</li>
              <li>尊重个体</li>
            </ul>
          </div>
        </div>
        <div className="border-t border-warm-800 mt-8 pt-6 text-xs text-warm-500 text-center">
          OH 卡为非占卜工具，仅用于自我探索与心理成长辅助。如有心理健康需求，请寻求专业支持。
        </div>
      </div>
    </footer>
  );
}
