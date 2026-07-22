"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import type { InstagramPost } from "@/lib/instagram";

export default function InstagramFeed() {
  const [posts, setPosts] = useState<InstagramPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/instagram")
      .then((r) => r.json())
      .then((data) => setPosts(data.posts ?? []))
      .catch((err) => {
        console.warn("[instagram-feed] fetch failed:", err);
        setPosts([]);
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="w-full mt-6">
        <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3">
          Instagram
        </h2>
        <div className="grid grid-cols-3 gap-1">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="aspect-square rounded-sm bg-secondary animate-pulse"
            />
          ))}
        </div>
      </div>
    );
  }

  if (posts.length === 0) return null;

  return (
    <div className="w-full mt-6">
        <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3">
          Instagram
        </h2>
        <div className="grid grid-cols-3 gap-1">
          {posts.map((post) => (
            <a
              key={post.id}
              href={post.permalink}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative aspect-square overflow-hidden rounded-sm bg-secondary"
          >
            <Image
              src={post.imageUrl}
              alt={post.caption || "Post do Instagram"}
              width={400}
              height={400}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
            {post.caption && (
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <p className="text-xs text-white leading-tight line-clamp-2">
                  {post.caption}
                </p>
              </div>
            )}
          </a>
        ))}
      </div>
    </div>
  );
}
