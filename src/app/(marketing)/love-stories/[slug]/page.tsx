import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import { pageMetadata } from "@/lib/metadata";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { Chip } from "@/components/ui/Chip";
import { CtaBand } from "@/components/sections/CtaBand";
import { JsonLd, breadcrumbSchema } from "@/components/seo/JsonLd";
import { CONTENT_FLAGS } from "@/lib/site";
import { LOVE_STORIES, getLoveStoryBySlug } from "@/content/copy";

/**
 * Love-story gallery -- CONDITIONAL, data-driven. Renders a rights-cleared
 * couple gallery from LOVE_STORIES (src/content/copy.ts) when
 * loveStoriesHaveRights is on; 404s when the flag is off or the slug is unknown,
 * so no faked gallery ships. Galleries are proof surfaces, not core SEO pages,
 * so they are noindex and never listed in the sitemap. Adding a gallery is a
 * one-place data edit: add to LOVE_STORIES (with gallery image paths) and flip
 * loveStoriesHaveRights.
 */

export function generateStaticParams() {
  if (!CONTENT_FLAGS.loveStoriesHaveRights) return [];
  return LOVE_STORIES.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata(props: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await props.params;
  const story = CONTENT_FLAGS.loveStoriesHaveRights
    ? getLoveStoryBySlug(slug)
    : undefined;
  return pageMetadata({
    title: story
      ? `${story.couple}, A Friend Led Wedding | Let's Get Wed`
      : "Love story not found | Let's Get Wed",
    description: story
      ? `${story.couple} were married by the person who knows them best. See their friend led ceremony.`
      : "This love story could not be found.",
    path: `/love-stories/${slug}`,
    noindex: true,
  });
}

export default async function LoveStoryPage(props: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await props.params;

  if (!CONTENT_FLAGS.loveStoriesHaveRights) {
    notFound();
  }
  const story = getLoveStoryBySlug(slug);
  if (!story) {
    notFound();
  }

  const gallery = story.gallery ?? [];

  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Reviews", path: "/reviews" },
          { name: story.couple, path: `/love-stories/${story.slug}` },
        ])}
      />

      <Section space="page-top" spaceBottom="main">
        <Container>
          <Chip variant="loud" className="mb-[var(--space-4)]">
            Love Story
          </Chip>
          <h1 style={{ margin: 0, color: "var(--color-grape)" }}>{story.couple}</h1>
          {story.caption && (
            <p
              className="text-large"
              style={{ color: "var(--color-grape-soft)", marginTop: "var(--space-5)", maxWidth: "52ch" }}
            >
              {story.caption}
            </p>
          )}

          {gallery.length > 0 && (
            <div className="mt-[var(--space-7)] grid grid-cols-1 gap-[var(--space-4)] sm:grid-cols-2">
              {gallery.map((img, i) => (
                <div
                  key={img.src}
                  className="relative overflow-hidden"
                  style={{
                    aspectRatio: "3 / 2",
                    borderRadius: "var(--radius-main)",
                  }}
                >
                  <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    sizes="(max-width: 768px) 100vw, 600px"
                    priority={i === 0}
                    style={{ objectFit: "cover" }}
                  />
                </div>
              ))}
            </div>
          )}
        </Container>
      </Section>

      <CtaBand
        theme="coral"
        heading="Write Your Own Story"
        body="Have the person who knows you best lead your ceremony, with the legals fully handled."
        primaryLabel="Book Now"
        primaryHref="/book"
        secondary={{ label: "See more stories", href: "/reviews" }}
      />
    </>
  );
}
