import { useEffect } from "react";
import { useParams, Link } from "react-router";
import { blogPostsData } from "@/data/blogs";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import SEO from "@/components/SEO";
import { ArrowLeft, Clock, Tag, Calendar, MessageCircle } from "lucide-react";

export default function BlogDetail() {
  const { slug } = useParams<{ slug: string }>();
  const blog = blogPostsData.find(b => b.slug === slug);
  const related = blogPostsData.filter(b => b.slug !== slug).slice(0, 3);

  useEffect(() => {
    if (blog) document.title = `${blog.titleEn} — AcademicHelp`;
    window.scrollTo(0, 0);
  }, [blog]);

  if (!blog) return <div className="min-h-screen bg-[var(--bg-primary)] flex items-center justify-center"><p className="text-[var(--text-muted)]">Article not found</p></div>;

  const tags = blog.tags?.split(",") || [];

  return (
    <div className="min-h-screen bg-[var(--bg-primary)]">
      <SEO title={`${blog.titleEn} — AcademicHelp`} description={blog.excerptEn} />
      <Navbar />
      <main className="pt-24 pb-16">
        {blog.image && (
          <div className="relative h-[35vh] min-h-[250px] overflow-hidden">
            <img src={blog.image} alt={blog.titleEn} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-primary)] via-[var(--bg-primary)]/50 to-transparent" />
          </div>
        )}

        <article className="max-w-3xl mx-auto px-6 lg:px-8 -mt-16 relative">
          <div className="card-elevated p-8 md:p-10">
            <Link to="/blog" className="inline-flex items-center gap-1.5 text-[11px] font-mono tracking-wider uppercase text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors mb-6">
              <ArrowLeft className="w-3.5 h-3.5" />Back
            </Link>

            <div className="flex flex-wrap items-center gap-3 mb-5">
              <span className="text-[10px] font-mono text-[var(--accent)] bg-[var(--accent-dim)] px-2 py-0.5 rounded">{blog.category}</span>
              <span className="flex items-center gap-1 text-[11px] text-[var(--text-muted)]"><Clock className="w-3 h-3" />{blog.readTime} min</span>
              {blog.createdAt && <span className="flex items-center gap-1 text-[11px] text-[var(--text-muted)]"><Calendar className="w-3 h-3" />{new Date(blog.createdAt).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}</span>}
            </div>

            <h1 className="text-[var(--text-primary)] mb-8">{blog.titleEn}</h1>

            <div className="prose max-w-none">
              <p className="text-[15px] text-[var(--text-secondary)] leading-[1.85] whitespace-pre-line">{blog.contentEn}</p>
            </div>

            {tags.length > 0 && (
              <div className="mt-8 pt-6 border-t border-[var(--border-subtle)] flex items-center gap-2 flex-wrap">
                <Tag className="w-3.5 h-3.5 text-[var(--text-muted)]" />
                {tags.map(tag => (
                  <span key={tag} className="text-[10px] font-mono text-[var(--text-muted)] bg-[var(--bg-card)] px-2 py-1 rounded border border-[var(--border-subtle)]">{tag.trim()}</span>
                ))}
              </div>
            )}
          </div>

          {/* CTA */}
          <div className="mt-8 card-elevated p-8 text-center">
            <MessageCircle className="w-8 h-8 text-[var(--accent)] mx-auto mb-3" />
            <h3 className="font-sans text-[18px] font-semibold text-[var(--text-primary)] mb-2">Need help with this topic?</h3>
            <p className="text-[13px] text-[var(--text-muted)] mb-5">Our experts are ready to assist you.</p>
            <a href={`https://wa.me/919310604015?text=Hello!%20I%20read%20your%20article%20on%20${encodeURIComponent(blog.titleEn)}%20and%20need%20help.`}
              target="_blank" rel="noopener noreferrer" className="pill-btn pill-btn-primary">
              <MessageCircle className="w-3.5 h-3.5" />Chat on WhatsApp
            </a>
          </div>
        </article>

        {related.length > 0 && (
          <section className="max-w-7xl mx-auto px-6 lg:px-8 mt-16">
            <h2 className="text-[var(--text-primary)] mb-8">Related Articles</h2>
            <div className="grid md:grid-cols-3 gap-5">
              {related.map(b => (
                <Link key={b.id} to={`/blog/${b.slug}`} className="group block">
                  <div className="rounded-xl overflow-hidden mb-3 border border-[var(--border-subtle)]">
                    <img src={b.image || "/images/blog-ai-tools.jpg"} alt={b.titleEn} className="w-full aspect-[3/2] object-cover group-hover:scale-105 transition-transform" />
                  </div>
                  <h3 className="font-sans text-[14px] font-semibold text-[var(--text-primary)] group-hover:text-[var(--accent)] transition-colors line-clamp-2">{b.titleEn}</h3>
                </Link>
              ))}
            </div>
          </section>
        )}
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
}
