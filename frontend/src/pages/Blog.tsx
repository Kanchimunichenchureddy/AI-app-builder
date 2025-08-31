/*import { useMemo } from "react";
import { SEO } from "@/components/SEO";
import { Link } from "react-router-dom";

type Post = {
  id: number;
  title: string;
  slug: string;
  date: string;
  excerpt: string;
};

const posts: Post[] = [
  {
    id: 1,
    title: "Introducing AI‑Customizable Modules",
    slug: "introducing-ai-modules",
    date: "2025-08-01",
    excerpt: "Preview, tweak, and integrate production‑ready blocks like auth, dashboards, and job boards.",
  },
  {
    id: 2,
    title: "JWT Auth in Minutes",
    slug: "jwt-auth-in-minutes",
    date: "2025-08-05",
    excerpt: "Add secure JWT auth and protected routes to your app with minimal setup.",
  },
];

export default function Blog() {
  const jsonLd = useMemo(() => ({
    "@context": "https://schema.org",
    "@type": "Blog",
    name: "AI App Builder Blog",
    url: "/blog",
    blogPost: posts.map((p) => ({
      "@type": "BlogPosting",
      headline: p.title,
      datePublished: p.date,
      url: `/blog#${p.slug}`,
    })),
  }), []);

  return (
    <main>
      <SEO
        title="Blog – AI App Builder"
        description="Updates, guides, and tips on modular app building, JWT auth, and AI customization."
        canonical="/blog"
      />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <section className="container mx-auto py-12">
        <h1 className="text-4xl md:text-5xl font-bold">AI App Builder Blog</h1>
        <div className="mt-8 grid gap-6 md:grid-cols-2">
          {posts.map((post) => (
            <article key={post.id} id={post.slug} className="glass rounded-lg p-6 shadow">
              <h2 className="text-2xl font-semibold">{post.title}</h2>
              <p className="mt-2 text-muted-foreground">{post.excerpt}</p>
              <div className="mt-4 text-sm text-muted-foreground">{new Date(post.date).toLocaleDateString()}</div>
              <div className="mt-4">
                <Link to={`#${post.slug}`} className="story-link">Read more</Link>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}*/
