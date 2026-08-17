import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Clock, Heart, ArrowRight } from "lucide-react";
import { formatDate } from "@/lib/utils";

export interface StoryCardProps {
  story: {
    _id?: string;
    title: string;
    slug: string;
    excerpt: string;
    coverImage: string;
    author: {
      name: string;
      avatar?: string;
      bio?: string;
    };
    category: string;
    readingTime: string;
    publishedAt: string | Date;
    likesCount?: number;
  };
  featured?: boolean;
}

export default function StoryCard({ story, featured = false }: StoryCardProps) {
  const { title, slug, excerpt, coverImage, author, category, readingTime, publishedAt, likesCount } =
    story;

  if (featured) {
    return (
      <div className="group rounded-3xl overflow-hidden bg-white border border-brandDark/8 shadow-subtle hover:shadow-cardHover transition-all duration-300 grid grid-cols-1 lg:grid-cols-12 gap-0">
        <div className="relative h-72 lg:h-full lg:col-span-7 overflow-hidden bg-brandDark/10">
          <Image
            src={coverImage}
            alt={title}
            fill
            sizes="(max-width: 1024px) 100vw, 60vw"
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          />
          <div className="absolute top-5 left-5">
            <span className="px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-white/90 backdrop-blur-md text-primary shadow-sm">
              {category}
            </span>
          </div>
        </div>

        <div className="p-8 lg:p-10 lg:col-span-5 flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            <div className="flex items-center gap-3 text-xs text-brandDark/60">
              <span>{formatDate(publishedAt)}</span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" />
                {readingTime}
              </span>
            </div>

            <h3 className="font-serif text-2xl lg:text-3xl font-bold text-brandDark group-hover:text-primary transition-colors leading-tight">
              <Link href={`/stories/${slug}`}>{title}</Link>
            </h3>

            <p className="text-sm text-brandDark/70 line-clamp-3 leading-relaxed">
              {excerpt}
            </p>
          </div>

          <div className="pt-6 border-t border-brandDark/8 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full overflow-hidden relative bg-brandDark/10">
                <Image
                  src={author.avatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=300&auto=format&fit=crop"}
                  alt={author.name}
                  fill
                  className="object-cover"
                />
              </div>
              <span className="text-xs font-semibold text-brandDark">{author.name}</span>
            </div>

            <Link
              href={`/stories/${slug}`}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-primary group-hover:text-primary-dark uppercase tracking-wider"
            >
              <span>Read Story</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="group rounded-2xl overflow-hidden bg-white border border-brandDark/8 shadow-subtle hover:shadow-cardHover transition-all duration-300 flex flex-col h-full">
      <div className="relative h-48 w-full overflow-hidden bg-brandDark/10">
        <Image
          src={coverImage}
          alt={title}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />
        <div className="absolute top-3 left-3">
          <span className="px-2.5 py-1 rounded-full text-[11px] font-semibold bg-white/90 backdrop-blur-md text-primary shadow-sm">
            {category}
          </span>
        </div>
      </div>

      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-[11px] text-brandDark/50">
            <span>{formatDate(publishedAt)}</span>
            <span>•</span>
            <span>{readingTime}</span>
          </div>

          <h3 className="font-serif text-lg font-bold text-brandDark group-hover:text-primary transition-colors line-clamp-2 leading-snug">
            <Link href={`/stories/${slug}`}>{title}</Link>
          </h3>

          <p className="text-xs text-brandDark/70 line-clamp-2 leading-relaxed">
            {excerpt}
          </p>
        </div>

        <div className="pt-3 border-t border-brandDark/8 flex items-center justify-between text-xs">
          <span className="font-medium text-brandDark/70 truncate max-w-[120px]">
            {author.name}
          </span>

          <Link
            href={`/stories/${slug}`}
            className="font-bold text-primary hover:text-primary-dark uppercase tracking-wider flex items-center gap-1 text-[11px]"
          >
            <span>Read</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
