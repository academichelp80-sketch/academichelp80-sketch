import { useState } from "react";
import { Link } from "react-router";
import { useTranslation } from "@/hooks/useTranslation";
import { useLanguage } from "@/contexts/LanguageContext";
import { blogPostsData } from "@/data/blogs";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import SEO from "@/components/SEO";
import { Clock, Search, Tag } from "lucide-react";

export default function Blog() {
  const t = useTranslation();
  const { language } = useLanguage();
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  const posts = blogPostsData;
  const categories = ["All", ...new Set(posts.map(p => p.category))];
  const filtered = posts.filter((p) => {
    const matchesSearch = query.length < 2 || p.titleEn.toLowerCase().includes(query.toLowerCase()) || p.excerptEn.toLowerCase().includes(query.toLowerCase());
    const matchesCat = activeCategory === "All" || p.category === activeCategory;
    return matchesSearch && matchesCat;
  });

  return (
    <div className="min-h-screen bg-[var(--bg-primary)]">
      <SEO title={`${t.nav.blog} — ${t.brand}`} description="Expert articles on research paper writing, journal publication, AI tools, and academic methodology." />
      <Navbar />
      <main className="pt-24">
        <section className="py-14 lg:py-20 bg-[var(--bg-secondary)]">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <p className="section-label mb-3">Knowledge Hub</p>
            <h1 className="text-[var(--text-primary)] mb-3">Research Insights</h1>
            <p className="text-[var(--text-secondary)] text-[15px] max-w-lg">Expert articles to help you navigate the world of academic publishing.</p>
          </div>
        </section>

        <section className="py-12">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="flex flex-col sm:flex-row gap-4 mb-6 items-start sm:items-center justify-between">
              <div className="relative max-w-sm w-full">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--text-muted)]" />
                <input value={query} onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search articles..."
                  className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-[var(--border-medium)] bg-[var(--bg-card)] text-[var(--text-primary)] text-[14px] placeholder:text-[var(--text-muted)] focus:outline-none focus:border-[var(--accent)] transition-colors" />
              </div>
              <p className="text-[12px] font-mono text-[var(--text-muted)]">{filtered.length} articles</p>
            </div>

            <div className="flex flex-wrap gap-2 mb-8">
              {categories.map((cat) => (
                <button key={cat} onClick={() => setActiveCategory(cat)}
                  className={`text-[11px] font-mono px-3 py-1.5 rounded-md border transition-all ${activeCategory === cat ? "bg-[var(--accent)] text-white border-[var(--accent)]" : "bg-transparent text-[var(--text-secondary)] border-[var(--border-medium)] hover:border-[var(--accent)] hover:text-[var(--accent)]"}`}>
                  {cat}
                </button>
              ))}
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
              {filtered.map((post) => (
                <Link to={`/blog/${post.slug}`} key={post.id} className="group block">
                  <div className="card-dark overflow-hidden h-full flex flex-col">
                    <div className="aspect-[3/2] overflow-hidden">
                      <img src={post.image || "/images/blog-ai-tools.jpg"} alt={post.titleEn} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    </div>
                    <div className="p-5 flex flex-col flex-1">
                      <div className="flex items-center gap-2 mb-3">
                        <span className="text-[10px] font-mono text-[var(--accent)] bg-[var(--accent-dim)] px-2 py-0.5 rounded">{post.category}</span>
                        <span className="text-[11px] text-[var(--text-muted)] flex items-center gap-1"><Clock className="w-3 h-3" />{post.readTime} min</span>
                      </div>
                      <h3 className="font-sans text-[15px] font-semibold text-[var(--text-primary)] group-hover:text-[var(--accent)] transition-colors line-clamp-2 mb-2 flex-1">{language === "hi" && post.titleHi ? post.titleHi : post.titleEn}</h3>
                      <p className="text-[12px] text-[var(--text-muted)] line-clamp-2 mb-3">{language === "hi" && post.excerptHi ? post.excerptHi : post.excerptEn}</p>
                      <div className="flex flex-wrap gap-1.5 pt-3 border-t border-[var(--border-subtle)]">
                        {post.tags.split(",").slice(0, 3).map((tag) => (
                          <span key={tag} className="text-[10px] text-[var(--text-muted)] flex items-center gap-0.5"><Tag className="w-2.5 h-2.5" />{tag.trim()}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
}
