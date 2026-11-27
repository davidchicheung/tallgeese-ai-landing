"use client";

import { useState } from "react";
import Image from "next/image";
import { Play } from "lucide-react";

type GridVideoPlayerProps = {
  id: string;
  title: string;
  // What a screen reader says for the play button.
  playLabel: string;
  thumbnail: string;
  thumbnailAlt: string;
  lqip?: string | null;
};

// A video card's picture, and its video once the card is clicked. YouTube's
// player is only loaded on that click, from its no-cookie address, so a visitor
// who plays nothing loads nothing from YouTube but the picture.
export default function GridVideoPlayer({
  id,
  title,
  playLabel,
  thumbnail,
  thumbnailAlt,
  lqip,
}: GridVideoPlayerProps) {
  const [playing, setPlaying] = useState(false);

  if (playing) {
    return (
      <iframe
        // The keyboard stays with the video the click started.
        ref={(frame) => frame?.focus()}
        className="absolute inset-0 size-full"
        src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0`}
        title={title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        // YouTube refuses to play for a page that doesn't say where it is.
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
      />
    );
  }

  return (
    <>
      <Image
        src={thumbnail}
        alt={thumbnailAlt}
        placeholder={lqip ? "blur" : undefined}
        blurDataURL={lqip || ""}
        fill
        sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
        className="object-cover"
        quality={100}
      />
      {/* The whole picture is the button, not only the round mark in its middle. */}
      <button
        type="button"
        onClick={() => setPlaying(true)}
        aria-label={playLabel}
        className="absolute inset-0 grid cursor-pointer place-items-center focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring"
      >
        <span className="grid size-15 place-items-center rounded-full bg-neutral-900/90 text-white shadow-lg shadow-black/20 transition-transform group-hover:scale-110 motion-reduce:transform-none">
          <Play aria-hidden="true" className="ml-0.5 size-5 fill-current" />
        </span>
      </button>
    </>
  );
}
