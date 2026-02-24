"use client";

import Image from "next/image";
import { useState } from "react";
import { Sparkles } from "lucide-react";

interface Props {
  src: string;
  alt: string;
  className?: string;
}

export default function CardPreview({ src, alt, className }: Props) {
  const [error, setError] = useState(false);

  if (error) {
    return (
      <div className={`flex items-center justify-center bg-gradient-to-br from-flame-100 to-gold-100 ${className}`}>
        <Sparkles size={20} className="text-flame-400" />
      </div>
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      fill
      className="object-cover"
      unoptimized
      onError={() => setError(true)}
    />
  );
}
