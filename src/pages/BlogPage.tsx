import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Clock, Calendar } from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { posts, type Category } from "../data/posts";

const categories: ("All" | Category)[] = [
  "All",
  "Burnout & Identity",
  "Career Transition",
  "Financial Security",
  "Neuroscience & Courage",
  "Longevity & Fitness",
  "AI & Productivity",
];

const categoryColor: Record<Category, string> = {
  "Burnout & Identity": "bg-ink text-parchment",
  "Career Transition": "bg-forest text-parchment",
  "Financial Security": "bg-forest-light text-forest",
  "Neuroscience & Courage": "bg-charcoal text-parchment",
  "Longevity & Fitness": "bg-forest-mid text-parchment",
  "AI & Productivity": "bg-muted/20 text-charcoal",
};

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, delay },
});

export default function BlogPage() {
  const [activeCategory, setActiveCategory] = useState<"All" | Category>("All");

  const featured = posts.find((p) => p.featured);
  const filtered =
    activeCategory === "All"
      ? posts.filter((p) => !p.featured)
      : posts.filter((p) => p.category === activeCategory && !p.featured);

  const allFiltered =
    activeCategory === "All"
      ? posts
      : posts.filter((p) => p.category === activeCategory);

  const showFeatured = activeCategory === "All" && featured;

  return (
    <div className="min-h-screen bg-parchment">
      <Navbar />

      {/* Header */}
      <section className="pt-32 pb-12 px-6 md:px-12 max-w-site mx-auto">
        <motion.p {...fadeUp(0.05)} className="eyebrow mb-4">
          The Crosswalk Journal
        </motion.p>
        <motion.h1
          {...fadeUp(0.1)}
          className="font-display text-4xl md:text-5xl text-ink leading-tight mb-4 max-w-2xl"
        >
          Honest writing for people
          <br />
          standing at the crosswalk.
        </motion.h1>
        <motion.p
          {...fadeUp(0.2)}
          className="font-body text-base md:text-lg text-charcoal max-w-xl"
        >
          On identity, fear, burnout, and what it actually takes to choose
          yourself — for healthcare professionals who are done pretending.
        </motion.p>
      </section>

      {/* Category filter */}
      <section className="px-6 md:px-12 max-w-site mx-auto pb-10">
        <motion.div
          {...fadeUp(0.25)}
          className="flex flex-wrap gap-2"
        >
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`font-body text-sm px-4 py-1.5 rounded-full border transition-all duration-200 ${
                activeCategory === cat
                  ? "bg-ink text-parchment border-ink"
                  : "bg-transparent text-muted border-border hover:border-ink hover:text-ink"
              }`}
            >
              {cat}
            </button>
          ))}
        </motion.div>
      </section>

      <div className="px-6 md:px-12 max-w-site mx-auto pb-24">
        {/* Featured post */}
        {showFeatured && featured && (
          <motion.div {...fadeUp(0.3)} className="mb-14">
            <Link
              to={`/blog/${featured.slug}`}
              className="group grid md:grid-cols-2 gap-0 bg-card rounded-sm overflow-hidden border border-border hover:border-forest transition-colors duration-300"
            >
              <div className="aspect-[4/3] md:aspect-auto overflow-hidden">
                <img
                  src={featured.image}
                  alt={featured.imageAlt}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </div>
              <div className="p-8 md:p-10 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-3 mb-5">
                    <span
                      className={`font-body text-xs font-medium px-3 py-1 rounded-full ${categoryColor[featured.category]}`}
                    >
                      {featured.category}
                    </span>
                    <span className="font-body text-xs text-muted uppercase tracking-wide">
                      Featured
                    </span>
                  </div>
                  <h2 className="font-display text-2xl md:text-3xl text-ink leading-snug mb-4 group-hover:text-forest transition-colors duration-200">
                    {featured.title}
                  </h2>
                  <p className="font-body text-sm md:text-base text-charcoal leading-relaxed line-clamp-3">
                    {featured.excerpt}
                  </p>
                </div>
                <div className="flex items-center justify-between mt-8">
                  <div className="flex items-center gap-4 text-muted">
                    <span className="flex items-center gap-1.5 font-body text-xs">
                      <Calendar size={12} />
                      {featured.date}
                    </span>
                    <span className="flex items-center gap-1.5 font-body text-xs">
                      <Clock size={12} />
                      {featured.readTime}
                    </span>
                  </div>
                  <span className="font-body text-sm font-medium text-forest flex items-center gap-1.5 group-hover:gap-3 transition-all duration-200">
                    Read <ArrowRight size={14} />
                  </span>
                </div>
              </div>
            </Link>
          </motion.div>
        )}

        {/* Article grid */}
        {(showFeatured ? filtered : allFiltered).length === 0 ? (
          <p className="font-body text-muted text-center py-16">
            No articles in this category yet.
          </p>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {(showFeatured ? filtered : allFiltered).map((post, i) => (
              <motion.div
                key={post.slug}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 * i }}
              >
                <Link
                  to={`/blog/${post.slug}`}
                  className="group flex flex-col bg-card rounded-sm overflow-hidden border border-border hover:border-forest transition-colors duration-300 h-full"
                >
                  <div className="aspect-[16/10] overflow-hidden">
                    <img
                      src={post.image}
                      alt={post.imageAlt}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                  </div>
                  <div className="p-6 flex flex-col flex-1">
                    <span
                      className={`self-start font-body text-xs font-medium px-3 py-1 rounded-full mb-4 ${categoryColor[post.category]}`}
                    >
                      {post.category}
                    </span>
                    <h3 className="font-display text-xl text-ink leading-snug mb-3 group-hover:text-forest transition-colors duration-200 flex-1">
                      {post.title}
                    </h3>
                    <p className="font-body text-sm text-charcoal leading-relaxed line-clamp-2 mb-5">
                      {post.excerpt}
                    </p>
                    <div className="flex items-center justify-between mt-auto">
                      <div className="flex items-center gap-3 text-muted">
                        <span className="flex items-center gap-1 font-body text-xs">
                          <Clock size={11} />
                          {post.readTime}
                        </span>
                      </div>
                      <span className="font-body text-xs font-medium text-forest flex items-center gap-1 group-hover:gap-2 transition-all duration-200">
                        Read <ArrowRight size={12} />
                      </span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}
