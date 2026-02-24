"use client";

import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { Theme } from "@/data/themes";
import { cn } from "@/lib/utils";
import { CONTENT_CLASS } from "@/lib/site";

interface Props {
  themes: Theme[];
}

export default function ThemesPageClient({ themes }: Props) {
  return (
    <div className={`${CONTENT_CLASS} py-10`}>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {themes.map((theme) => (
          <Link
            key={theme.id}
            href={`/themes/${theme.id}`}
            className={cn(
              "block rounded-2xl border border-amber-200 p-5 transition-all duration-200",
              "bg-amber-50",
              "hover:shadow-card-hover hover:-translate-y-0.5"
            )}
          >
              <h3 className="font-serif font-semibold text-warm-800 text-lg mb-2">
                {theme.name}
              </h3>
              <p className="text-warm-500 text-sm leading-relaxed mb-2">
                {theme.description}
              </p>
              {theme.targetAudience && (
                <p className="text-warm-400 text-xs">适用：{theme.targetAudience}</p>
              )}
              <span className="inline-flex items-center gap-1 mt-3 text-flame-600 text-sm font-medium">
                了解详情
                <ChevronRight size={14} />
              </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
