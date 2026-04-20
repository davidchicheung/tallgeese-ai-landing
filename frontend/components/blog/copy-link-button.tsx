"use client";

import { useState } from "react";
import { Check, Link as LinkIcon } from "lucide-react";

export default function CopyLinkButton() {
  const [copied, setCopied] = useState(false);

  const handleClick = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // clipboard API unavailable; silently ignore
    }
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className="inline-flex items-center gap-2 hover:opacity-70 transition-opacity cursor-pointer"
      aria-label={copied ? "Link copied" : "Copy link to this post"}
    >
      {copied ? (
        <>
          <Check className="size-[1em]" aria-hidden />
          <span>Copied</span>
        </>
      ) : (
        <>
          <LinkIcon className="size-[1em]" aria-hidden />
          <span>Share</span>
        </>
      )}
    </button>
  );
}
