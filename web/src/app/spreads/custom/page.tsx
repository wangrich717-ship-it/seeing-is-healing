"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { ChevronRight, Layers, PlusCircle, Upload } from "lucide-react";
import { getCustomSpreads, deleteCustomSpread, importSpreadFromCode, exportSpreadToCode } from "@/lib/customSpread";
import { CONTENT_CLASS } from "@/lib/site";
import { useState, useEffect, useRef, useCallback } from "react";

export default function CustomSpreadsListPage() {
  const router = useRouter();
  const [spreads, setSpreads] = useState<ReturnType<typeof getCustomSpreads>>([]);
  const [mounted, setMounted] = useState(false);
  const importInputRef = useRef<HTMLInputElement>(null);

  const refresh = useCallback(() => setSpreads(getCustomSpreads()), []);

  useEffect(() => {
    refresh();
    setMounted(true);
  }, [refresh]);

  const handleDelete = useCallback(
    (id: string, e: React.MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
      if (window.confirm("确定要删除这个牌阵吗？删除后无法恢复。")) {
        deleteCustomSpread(id);
        refresh();
      }
    },
    [refresh]
  );

  const handleImport = useCallback(() => {
    importInputRef.current?.click();
  }, []);

  const handleImportFile = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = () => {
        const imported = importSpreadFromCode(String(reader.result));
        if (imported) {
          refresh();
          router.push(`/spreads/custom/play?id=${encodeURIComponent(imported.id)}`);
        } else {
          alert("导入失败，请确认文件格式正确");
        }
      };
      reader.readAsText(file);
      e.target.value = "";
    },
    [refresh, router]
  );

  const handleDownloadSpreadFile = useCallback(
    (s: ReturnType<typeof getCustomSpreads>[number], e: React.MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
      const blob = new Blob([exportSpreadToCode(s)], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `牌阵-${s.name}-${s.id.slice(0, 8)}.json`;
      a.click();
      URL.revokeObjectURL(url);
    },
    []
  );

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
            <span className="text-white">自定义牌阵</span>
          </div>
        </div>
      </div>
      <div className="bg-gradient-hero py-12">
        <div className={CONTENT_CLASS}>
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
              <Layers size={28} className="text-white" />
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-serif font-bold text-white">自定义牌阵</h1>
              <p className="text-white/75 mt-1">创建并保存你的专属牌阵，支持自由布局与多套系混用</p>
            </div>
          </div>
        </div>
      </div>

      <div className={`${CONTENT_CLASS} py-10`}>
        <div className="rounded-xl bg-amber-50 border border-amber-200 px-4 py-3 text-sm text-warm-700 mb-6">
          <strong>说明：</strong>牌阵仅保存在浏览器本地缓存中，清理缓存后会丢失。建议在创建页使用「下载代码文件」保存为 .json 文件，之后可用下方「导入」恢复。
        </div>
        <div className="flex flex-wrap justify-end gap-3 mb-6">
          <button
            onClick={handleImport}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-cream-200 text-warm-600 hover:bg-cream-50"
          >
            <Upload size={18} />
            导入牌阵
          </button>
          <input
            ref={importInputRef}
            type="file"
            accept=".json,application/json"
            className="hidden"
            onChange={handleImportFile}
          />
          <button
            onClick={() => router.push("/spreads/custom/new")}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-flame text-white font-medium hover:opacity-95"
          >
            <PlusCircle size={20} />
            创建自定义牌阵
          </button>
        </div>

        {!mounted ? (
          <p className="text-warm-500 text-sm">加载中…</p>
        ) : spreads.length === 0 ? (
          <div className="text-center py-16 rounded-2xl border-2 border-dashed border-cream-300 bg-amber-50/50">
            <p className="text-warm-600 mb-4">还没有自定义牌阵</p>
            <p className="text-warm-500 text-sm mb-6">可自选张数、自由拖动位置，并为每个位置指定套系与子套</p>
            <button
              onClick={() => router.push("/spreads/custom/new")}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-flame text-white font-medium"
            >
              <PlusCircle size={18} />
              创建第一个
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {spreads.map((s) => (
              <div
                key={s.id}
                className="bg-white border border-cream-200 rounded-2xl p-5 hover:shadow-card-hover transition-all"
              >
                <h3 className="font-serif font-semibold text-warm-800 mb-2">{s.name}</h3>
                <p className="text-xs text-warm-400 mb-4">{s.positions.length} 张卡 · 本地保存</p>
                <div className="flex flex-wrap gap-2">
                  <Link
                    href={`/spreads/custom/play?id=${encodeURIComponent(s.id)}`}
                    className="inline-flex items-center justify-center px-3 py-1.5 rounded-lg text-sm font-medium bg-gradient-flame text-white hover:opacity-95 transition-opacity"
                  >
                    抽卡
                  </Link>
                  <Link
                    href={`/spreads/custom/edit?id=${encodeURIComponent(s.id)}`}
                    className="inline-flex items-center justify-center px-3 py-1.5 rounded-lg text-sm font-medium border border-cream-200 text-warm-600 hover:bg-cream-50 transition-colors"
                  >
                    编辑
                  </Link>
                  <button
                    type="button"
                    onClick={(e) => handleDownloadSpreadFile(s, e)}
                    className="inline-flex items-center justify-center px-3 py-1.5 rounded-lg text-sm font-medium border border-cream-200 text-warm-600 hover:bg-cream-50 transition-colors"
                  >
                    下载牌阵文件
                  </button>
                  <button
                    type="button"
                    onClick={(e) => handleDelete(s.id, e)}
                    className="inline-flex items-center justify-center px-3 py-1.5 rounded-lg text-sm font-medium border border-red-200 text-red-600 hover:bg-red-50 transition-colors"
                  >
                    删除
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
