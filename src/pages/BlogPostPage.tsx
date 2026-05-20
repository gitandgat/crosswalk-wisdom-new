import { useParams, Link, Navigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Clock, Calendar } from "lucide-react";
import ReactMarkdown from "react-markdown";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { posts, type Category } from "../data/posts";

const categoryColor: Record<Category, string> = {
  "Burnout & Identity": "bg-ink text-parchment",
  "Career Transition": "bg-forest text-parchment",
  "Financial Security": "bg-forest-light text-forest",
  "Neuroscience & Courage": "bg-charcoal text-parchment",
  "Longevity & Fitness": "bg-forest-mid text-parchment",
  "AI & Productivity": "bg-muted/20 text-charcoal",
};

export default function BlogPostPage() {
  const { slug } = useParams();
  const post = posts.find((p) => p.slug === slug);

  if (!post) return <Navigate to="/blog" replace />;

  const related = posts
    .filter((p) => p.slug !== post.slug && p.category === post.category)
    .slice(0, 2);

  return (
    <div className="min-h-screen bg-parchment">
      <Navbar />

      {/* Hero image */}
      <div className="w-full h-[45vh] md:h-[55vh] overflow-hidden">
        <motion.img
          initial={{ scale: 1.05, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.9 }}
          src={post.image}
          alt={post.imageAlt}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Article */}
      <article className="max-w-2xl mx-auto px-6 py-14 md:py-20">
        {/* Back */}
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-10"
        >
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 font-body text-sm text-muted hover:text-forest transition-colors"
          >
            <ArrowLeft size={14} />
            All articles
          </Link>
        </motion.div>

        {/* Meta */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex flex-wrap items-center gap-3 mb-6"
        >
          <span
            className={`font-body text-xs font-medium px-3 py-1 rounded-full ${categoryColor[post.category]}`}
          >
            {post.category}
          </span>
          <span className="flex items-center gap-1.5 font-body text-xs text-muted">
            <Calendar size={12} />
            {post.date}
          </span>
          <span className="flex items-center gap-1.5 font-body text-xs text-muted">
            <Clock size={12} />
            {post.readTime}
          </span>
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="font-display text-3xl md:text-4xl lg:text-5xl text-ink leading-tight mb-10"
        >
          {post.title}
        </motion.h1>

        {/* Divider */}
        <div className="h-px bg-border mb-10" />

        {/* Markdown content */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.25 }}
          className="prose-crosswalk"
        >
          <ReactMarkdown
            components={{
              h2: ({ children }) => (
                <h2 className="font-display text-2xl md:text-3xl text-ink leading-snug mt-10 mb-4">
                  {children}
                </h2>
              ),
              h3: ({ children }) => (
                <h3 className="font-display text-xl text-ink leading-snug mt-8 mb-3">
                  {children}
                </h3>
              ),
              p: ({ children }) => (
                <p className="font-body text-base md:text-lg text-charcoal leading-relaxed mb-5">
                  {children}
                </p>
              ),
              ul: ({ children }) => (
                <ul className="space-y-2 mb-5 pl-0">{children}</ul>
              ),
              ol: ({ children }) => (
                <ol className="space-y-2 mb-5 pl-0 list-none counter-reset-[item]">{children}</ol>
              ),
              li: ({ children }) => (
                <li className="flex items-start gap-3 font-body text-base md:text-lg text-charcoal leading-relaxed">
                  <span className="text-forest mt-1.5 flex-shrink-0 font-medium">→</span>
                  <span>{children}</span>
                </li>
              ),
              blockquote: ({ children }) => (
                <blockquote className="border-l-4 border-forest pl-6 py-1 my-6">
                  <div className="font-display text-xl md:text-2xl text-ink leading-snug italic">
                    {children}
                  </div>
                </blockquote>
              ),
              strong: ({ children }) => (
                <strong className="font-semibold text-ink">{children}</strong>
              ),
              em: ({ children }) => (
                <em className="italic text-charcoal">{children}</em>
              ),
              table: ({ children }) => (
                <div className="overflow-x-auto my-6">
                  <table className="w-full font-body text-sm border-collapse">
                    {children}
                  </table>
                </div>
              ),
              thead: ({ children }) => (
                <thead className="bg-forest-light">{children}</thead>
              ),
              th: ({ children }) => (
                <th className="text-left px-4 py-2.5 font-semibold text-forest text-xs uppercase tracking-wide border-b border-border">
                  {children}
                </th>
              ),
              td: ({ children }) => (
                <td className="px-4 py-2.5 text-charcoal border-b border-border/50">
                  {children}
                </td>
              ),
              hr: () => <hr className="border-border my-8" />,
            }}
          >
            {post.content}
          </ReactMarkdown>
        </motion.div>

        {/* Author card */}
        <div className="mt-16 p-6 md:p-8 bg-forest-light rounded-sm border border-forest/20">
          <p className="eyebrow mb-3">Written by</p>
          <p className="font-display text-xl text-ink mb-2">Sahawat Nilwatcharamanee</p>
          <p className="font-body text-sm text-charcoal leading-relaxed mb-5">
            Healthcare professional turned coach. Founder of Crosswalk Wisdom.
            I help burned-out clinicians figure out who they are beyond their
            title — and find the courage to cross.
          </p>
          <div className="flex flex-wrap gap-3">
            <a
              href="https://fear-audit.vercel.app"
              target="_blank"
              rel="noopener noreferrer"
              className="font-body text-sm font-medium px-5 py-2.5 bg-forest text-parchment rounded-sm hover:bg-forest-mid transition-colors"
            >
              Take the Fear Audit →
            </a>
            <Link
              to="/start"
              className="font-body text-sm font-medium px-5 py-2.5 bg-transparent text-forest border border-forest rounded-sm hover:bg-forest hover:text-parchment transition-colors"
            >
              Join the community
            </Link>
          </div>
        </div>
      </article>

      {/* Related articles */}
      {related.length > 0 && (
        <section className="max-w-site mx-auto px-6 md:px-12 pb-24">
          <div className="h-px bg-border mb-12" />
          <p className="eyebrow mb-6">More from {post.category}</p>
          <div className="grid md:grid-cols-2 gap-6">
            {related.map((r) => (
              <Link
                key={r.slug}
                to={`/blog/${r.slug}`}
                className="group flex gap-5 items-start"
              >
                <div className="w-24 h-20 flex-shrink-0 overflow-hidden rounded-sm">
                  <img
                    src={r.image}
                    alt={r.imageAlt}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div>
                  <p className="font-display text-base text-ink leading-snug mb-1.5 group-hover:text-forest transition-colors">
                    {r.title}
                  </p>
                  <p className="font-body text-xs text-muted flex items-center gap-1.5">
                    <Clock size={11} />
                    {r.readTime}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      <Footer />
    </div>
  );
}
