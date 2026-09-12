"use client";

import { useState } from "react";
import { Copy, Check } from "lucide-react";

interface CopyButtonProps {
  textToCopy: string;
  label?: string;
  className?: string;
}

export default function CopyButton({
  textToCopy,
  label = "Copy",
  className = "",
}: CopyButtonProps) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    if (copied) return;
    await navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <button
      type="button"
      onClick={handleCopy}
      className={[
        "border border-white/10 hover:border-amber-400/40",
        "text-neutral-300 hover:text-amber-400",
        "text-xs px-3 py-1.5 rounded-lg",
        "flex items-center gap-1.5 transition",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {copied ? (
        <>
          <Check size={13} strokeWidth={2.5} />
          <span>Copied!</span>
        </>
      ) : (
        <>
          <Copy size={13} strokeWidth={2} />
          <span>{label}</span>
        </>
      )}
    </button>
  );
}
