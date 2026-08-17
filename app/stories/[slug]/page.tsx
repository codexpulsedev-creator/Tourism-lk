import React from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { Clock, Calendar, ArrowLeft, Heart, Share2, Tag } from "lucide-react";
import { getTravelStoryBySlug, getTravelStories } from "@/lib/dataService";
import { formatDate } from "@/lib/utils";
import StoryCard from "@/components/ui/StoryCard";

interface StoryPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({
  params,
}: StoryPageProps): Promise<Metadata> {
  const { slug } = await params;
  const story = await getTravelStoryBySlug(slug);

  if (!story) {
    return { title: "Story Not Found — LankaExplore" };
  }

  return {
    title: `${story.title} — LankaExplore Stories`,
    description: story.excerpt,
    openGraph: {
      title: story.title,
      description: story.excerpt,
      images: [{ url: story.coverImage }],
    },
  };
}

export default async function TravelStoryDetailPage({ params }: StoryPageProps) {
  const { slug } = await params;
  const story = await getTravelStoryBySlug(slug);

  if (!story) {
    notFound();
  }

  const allStories = (await getTravelStories()) as any[];
  const relatedStories = allStories.filter((s: any) => s.slug !== slug).slice(0, 3);

  return (
    <article className="pt-28 pb-20 space-y-12">
      {/* Header Container */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <Link
          href="/stories"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-brandDark/60 hover:text-primary transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to all stories</span>
        </Link>

        <div className="flex items-center gap-2">
          <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-primary/10 text-primary">
            {story.category}
          </span>
        </div>

        <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold text-brandDark tracking-tight leading-tight">
          {story.title}
        </h1>

        <p className="text-base sm:text-xl text-brandDark/70 font-sans leading-relaxed">
          {story.excerpt}
        </p>

        {/* Author details */}
        <div className="flex items-center justify-between py-6 border-y border-brandDark/10">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full overflow-hidden relative bg-brandDark/10">
              <Image
                src={story.author.avatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=300&auto=format&fit=crop"}
                alt={story.author.name}
                fill
                className="object-cover"
              />
            </div>
            <div>
              <h4 className="font-serif font-bold text-sm sm:text-base text-brandDark">
                {story.author.name}
              </h4>
              <div className="flex items-center gap-2 text-xs text-brandDark/50">
                <span>{formatDate(story.publishedAt)}</span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" />
                  {story.readingTime}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Featured Cover Image */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative h-[55vh] min-h-[380px] rounded-3xl overflow-hidden shadow-card">
          <Image
            src={story.coverImage}
            alt={story.title}
            fill
            priority
            sizes="(max-width: 1200px) 100vw, 1200px"
            className="object-cover"
          />
        </div>
      </div>

      {/* Article Content */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="prose prose-lg prose-headings:font-serif prose-headings:text-brandDark text-brandDark/85 leading-relaxed space-y-6 text-base sm:text-lg">
          {story.content.split("\n\n").map((paragraph: string, idx: number) => (
            <p key={idx} className="leading-relaxed">
              {paragraph}
            </p>
          ))}
        </div>

        {/* Tags */}
        {story.tags && story.tags.length > 0 && (
          <div className="flex flex-wrap items-center gap-2 pt-10 mt-10 border-t border-brandDark/10">
            <Tag className="w-4 h-4 text-primary" />
            {story.tags.map((tag: string) => (
              <span
                key={tag}
                className="text-xs font-semibold px-3 py-1 rounded-full bg-brandBg border border-brandDark/10 text-brandDark/80"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Related Stories */}
      {relatedStories.length > 0 && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 border-t border-brandDark/10 space-y-8">
          <h3 className="font-serif text-3xl font-bold text-brandDark">
            More Travel Stories
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {relatedStories.map((s) => (
              <StoryCard key={s.slug} story={s} />
            ))}
          </div>
        </div>
      )}
    </article>
  );
}
