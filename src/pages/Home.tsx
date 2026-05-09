import { useEffect, useRef } from "react";
import { Link } from "react-router";
import { useTranslation } from "@/hooks/useTranslation";
import { useLanguage } from "@/contexts/LanguageContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import SEO from "@/components/SEO";
import { servicesData } from "@/data/services";
import { testimonialsData } from "@/data/testimonials";
import { blogPostsData } from "@/data/blogs";
import {
  ArrowRight, FileText, BookOpen, GraduationCap, Settings,
  Network, Eye, ShieldCheck, Globe, Star,
  TrendingUp, CheckCircle2
} from "lucide-react";
import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function AnimatedCounter({ end, suffix = "" }: { end: number; suffix?: string }) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.3 });
  return (
    <span ref={ref} className="font-mono text-3xl md:text-4xl font-medium text-[var(--accent)] tabular-nums">
      {inView ? <CountUp end={end} duration={2} suffix={suffix} separator="," /> : "0"}
    </span>
  );
}

const serviceIcons: Record<string, React.ReactNode> = {
  FileText: <FileText className="w-5 h-5" />,
  BookOpen: <BookOpen className="w-5 h-5" />,
  GraduationCap: <GraduationCap className="w-5 h-5" />,
  Settings: <Settings className="w-5 h-5" />,
  Network: <Network className="w-5 h-5" />,
  Eye: <Eye className="w-5 h-5" />,
  ShieldCheck: <ShieldCheck className="w-5 h-5" />,
  Globe: <Globe className="w-5 h-5" />,
};

const journalLogos = ["SCI", "Scopus", "Web of Science", "UGC CARE", "ABDC", "IEEE"];

export default function Home() {
  const t = useTranslation();
  const { language } = useLanguage();
  const services = servicesData;
  const featuredTestimonials = testimonialsData.filter(t => t.featured === 1).slice(0, 3);
  const featuredBlogs = blogPostsData.slice(0, 3);

  const heroRef = useRef<HTMLDivElement>(null);
  const servicesRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const testimonialsRef = useRef<HTMLDivElement>(null);
  const blogRef = useRef<HTMLDivElement>(null);
  const processRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const heroEls = heroRef.current?.querySelectorAll(".hero-anim");
    if (heroEls) {
      gsap.fromTo(heroEls, { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, stagger: 0.12, ease: "power3.out", delay: 0.2 });
    }
    const sections = [
      { ref: servicesRef, selector: ".service-card" },
      { ref: statsRef, selector: ".stat-item" },
      { ref: testimonialsRef, selector: ".testimonial-card" },
      { ref: blogRef, selector: ".blog-card" },
      { ref: processRef, selector: ".process-step" },
    ];
    const triggers: ScrollTrigger[] = [];
    sections.forEach(({ ref, selector }) => {
      if (!ref.current) return;
      const items = ref.current.querySelectorAll(selector);
      const tween = gsap.fromTo(items, { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, stagger: 0.08, ease: "power2.out",
          scrollTrigger: { trigger: ref.current, start: "top 85%", toggleActions: "play none none none" } });
      if (tween.scrollTrigger) triggers.push(tween.scrollTrigger);
    });
    return () => { triggers.forEach(st => st.kill()); };
  }, [t, language]);

  return (
    <div className="min-h-screen bg-[var(--bg-primary)]">
      <SEO title={`${t.brand} — ${t.tagline}`} description={t.seo.description} keywords={t.seo.keywords} />
      <Navbar />

      {/* ========== HERO ========== */}
      <section ref={heroRef} className="relative pt-28 pb-16 lg:pt-36 lg:pb-24 overflow-hidden bg-[var(--bg-secondary)]">
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "radial-gradient(circle at 1px 1px, #051747 0.5px, transparent 0)", backgroundSize: "32px 32px" }} />
        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div className="space-y-7">
              <div className="space-y-4">
                <p className="hero-anim section-label">Research Consultancy</p>
                <h1 className="hero-anim text-[var(--text-primary)]">
                  Redefining <em className="italic text-[var(--accent)]">Academic</em> Research
                </h1>
                <p className="hero-anim text-[var(--text-secondary)] text-[15px] leading-relaxed max-w-md">
                  Expert guidance for scholars pursuing publication in SCI, Scopus, Web of Science, and UGC CARE indexed journals.
                </p>
              </div>
              <div className="hero-anim flex flex-wrap gap-3">
                <Link to="/inquiry" className="pill-btn pill-btn-primary">Get Started<ArrowRight className="w-3.5 h-3.5" /></Link>
                <Link to="/services" className="pill-btn pill-btn-outline">Our Services</Link>
              </div>
              <div className="hero-anim pt-3">
                <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-[var(--text-muted)] mb-2">Published In</p>
                <div className="flex flex-wrap gap-x-5 gap-y-1.5">
                  {journalLogos.map((logo) => (
                    <span key={logo} className="text-[12px] font-mono text-[var(--text-muted)]">{logo}</span>
                  ))}
                </div>
              </div>
            </div>
            <div className="hero-anim relative">
              <div className="rounded-2xl overflow-hidden border border-[var(--border-subtle)] shadow-lg shadow-[#051747]/5">
                <img src="/images/hero-scientific.jpg" alt="Scientific research" className="w-full h-auto object-cover" />
              </div>
              <div className="absolute -bottom-4 -left-4 card-elevated p-4">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-[var(--accent-soft)] flex items-center justify-center">
                    <TrendingUp className="w-4 h-4 text-[var(--accent)]" />
                  </div>
                  <div>
                    <div className="font-mono text-lg font-medium text-[var(--text-primary)]">98%</div>
                    <div className="text-[10px] text-[var(--text-muted)]">Success Rate</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========== STATS ========== */}
      <section ref={statsRef} className="py-12 border-y border-[var(--border-subtle)]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { label: "PAPERS PUBLISHED", value: 2500, suffix: "+" },
              { label: "SCHOLARS HELPED", value: 56, suffix: "+" },
              { label: "JOURNALS COVERED", value: 180, suffix: "+" },
              { label: "SATISFACTION", value: 98, suffix: "%" },
            ].map((stat) => (
              <div key={stat.label} className="stat-item text-center">
                <p className="text-[10px] font-mono tracking-[0.15em] text-[var(--text-muted)] mb-2">{stat.label}</p>
                <AnimatedCounter end={stat.value} suffix={stat.suffix} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========== SERVICES ========== */}
      <section ref={servicesRef} className="py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4 mb-10">
            <div className="space-y-2">
              <p className="section-label">What We Offer</p>
              <h2 className="text-[var(--text-primary)]">Our Services</h2>
            </div>
            <p className="text-[var(--text-secondary)] text-[14px] max-w-sm">End-to-end academic support for every stage of your research.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {services.map((service) => (
              <Link key={service.id} to="/services" className="service-card card-dark p-5 group hover:border-[var(--border-medium)] transition-all">
                <div className="flex items-start justify-between mb-4">
                  <div className="w-9 h-9 rounded-lg bg-[var(--accent-dim)] flex items-center justify-center text-[var(--accent)]">{serviceIcons[service.icon || "FileText"]}</div>
                  <ArrowRight className="w-4 h-4 text-[var(--text-muted)] group-hover:text-[var(--accent)] transition-colors" />
                </div>
                <h3 className="font-sans text-[15px] font-semibold text-[var(--text-primary)] mb-1.5">{language === "hi" && service.titleHi ? service.titleHi : service.titleEn}</h3>
                <p className="text-[12px] text-[var(--text-muted)] leading-relaxed line-clamp-2">{language === "hi" && service.shortDescHi ? service.shortDescHi : service.shortDescEn}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ========== ABOUT ========== */}
      <section className="py-20 lg:py-28 bg-[var(--bg-secondary)]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div className="rounded-2xl overflow-hidden border border-[var(--border-subtle)] shadow-lg shadow-[#051747]/5">
              <img src="/images/research-lab.jpg" alt="Research laboratory" className="w-full h-auto object-cover" />
            </div>
            <div className="space-y-5">
              <p className="section-label">Why AcademicHelp</p>
              <h2 className="text-[var(--text-primary)]">Trusted in <em className="italic text-[var(--accent)]">Research Excellence</em></h2>
              <p className="text-[var(--text-secondary)] text-[14px] leading-relaxed">
                India's premier research consultancy. Our PhD-qualified experts ensure every paper meets the highest standards of top-tier academic journals.
              </p>
              <div className="grid grid-cols-2 gap-4 pt-2">
                {[
                  { label: "SCI Journals", desc: "Science Citation Index" },
                  { label: "Scopus", desc: "Indexed Publications" },
                  { label: "UGC CARE", desc: "Approved Journals" },
                  { label: "ABDC", desc: "Ranked Journals" },
                ].map((item) => (
                  <div key={item.label} className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-[var(--accent)] mt-0.5 shrink-0" />
                    <div>
                      <div className="text-[13px] font-semibold text-[var(--text-primary)]">{item.label}</div>
                      <div className="text-[11px] text-[var(--text-muted)]">{item.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========== TESTIMONIALS ========== */}
      <section ref={testimonialsRef} className="py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4 mb-10">
            <div className="space-y-2">
              <p className="section-label">Testimonials</p>
              <h2 className="text-[var(--text-primary)]">What Scholars Say</h2>
            </div>
            <Link to="/testimonials" className="pill-btn pill-btn-outline self-start">View All<ArrowRight className="w-3.5 h-3.5" /></Link>
          </div>
          <div className="grid md:grid-cols-3 gap-4">
            {featuredTestimonials.map((test) => (
              <div key={test.id} className="testimonial-card card-dark p-6">
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: test.rating || 5 }).map((_, j) => (
                    <Star key={j} className="w-3.5 h-3.5 fill-[var(--accent)] text-[var(--accent)]" />
                  ))}
                </div>
                <p className="text-[14px] text-[var(--text-secondary)] leading-relaxed mb-5">{language === "hi" && test.contentHi ? test.contentHi : test.contentEn}</p>
                <div className="flex items-center gap-3 pt-4 border-t border-[var(--border-subtle)]">
                  <div className="w-9 h-9 rounded-full bg-[var(--accent-soft)] flex items-center justify-center text-[var(--accent)] text-[11px] font-mono font-medium">{test.name.split(" ").map(n => n[0]).join("").slice(0, 2)}</div>
                  <div>
                    <p className="text-[13px] font-semibold text-[var(--text-primary)]">{test.name}</p>
                    <p className="text-[11px] text-[var(--text-muted)]">{test.designation}, {test.university}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========== BLOG ========== */}
      <section ref={blogRef} className="py-20 lg:py-28 bg-[var(--bg-secondary)]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4 mb-10">
            <div className="space-y-2">
              <p className="section-label">Knowledge Hub</p>
              <h2 className="text-[var(--text-primary)]">Latest Insights</h2>
            </div>
            <Link to="/blog" className="pill-btn pill-btn-outline self-start">All Articles<ArrowRight className="w-3.5 h-3.5" /></Link>
          </div>
          <div className="grid md:grid-cols-3 gap-5">
            {featuredBlogs.map((blog) => (
              <Link to={`/blog/${blog.slug}`} key={blog.id} className="blog-card group block">
                <div className="rounded-xl overflow-hidden mb-4 border border-[var(--border-subtle)] shadow-sm">
                  <img src={blog.image || "/images/blog-ai-tools.jpg"} alt={blog.titleEn} className="w-full aspect-[3/2] object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="space-y-1.5">
                  <div className="flex items-center gap-3">
                    <span className="text-[10px] font-mono text-[var(--accent)] bg-[var(--accent-dim)] px-2 py-0.5 rounded">{blog.category}</span>
                    <span className="text-[11px] text-[var(--text-muted)]">{blog.readTime} min</span>
                  </div>
                  <h3 className="font-sans text-[15px] font-semibold text-[var(--text-primary)] group-hover:text-[var(--accent)] transition-colors line-clamp-2">{language === "hi" && blog.titleHi ? blog.titleHi : blog.titleEn}</h3>
                  <p className="text-[12px] text-[var(--text-muted)] line-clamp-2">{language === "hi" && blog.excerptHi ? blog.excerptHi : blog.excerptEn}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ========== HOW IT WORKS ========== */}
      <section ref={processRef} className="py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-12 space-y-2">
            <p className="section-label">Process</p>
            <h2 className="text-[var(--text-primary)]">How It Works</h2>
          </div>
          <div className="grid md:grid-cols-4 gap-8 relative">
            <div className="hidden md:block absolute top-8 left-[12.5%] right-[12.5%] h-px bg-[var(--border-subtle)]" />
            {[
              { step: "01", title: "Submit Details", desc: "Share your research title, objectives, and methodology via our form or WhatsApp." },
              { step: "02", title: "Expert Assigned", desc: "We match you with a PhD-qualified expert in your research domain." },
              { step: "03", title: "Receive Work", desc: "Get your publication-ready manuscript delivered on schedule." },
              { step: "04", title: "Get Published", desc: "Submit to your target journal with confidence and achieve success." },
            ].map((item) => (
              <div key={item.step} className="process-step text-center relative">
                <div className="w-16 h-16 mx-auto rounded-full bg-[var(--bg-card)] border border-[var(--border-subtle)] flex items-center justify-center mb-4 relative z-10 shadow-sm">
                  <span className="font-mono text-sm font-medium text-[var(--accent)]">{item.step}</span>
                </div>
                <h3 className="font-sans text-[15px] font-semibold text-[var(--text-primary)] mb-1.5">{item.title}</h3>
                <p className="text-[12px] text-[var(--text-muted)] leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========== CTA ========== */}
      <section className="py-20 lg:py-28 bg-[var(--bg-secondary)]">
        <div className="max-w-3xl mx-auto px-6 lg:px-8 text-center">
          <div className="card-elevated p-10 lg:p-14">
            <h2 className="text-[var(--text-primary)] mb-3">Ready to <em className="italic text-[var(--accent)]">Publish</em>?</h2>
            <p className="text-[var(--text-secondary)] text-[14px] mb-8 max-w-md mx-auto">Let our experts guide you from manuscript to publication in top-tier journals.</p>
            <div className="flex flex-wrap justify-center gap-3">
              <Link to="/inquiry" className="pill-btn pill-btn-primary">Start Your Inquiry<ArrowRight className="w-3.5 h-3.5" /></Link>
              <a href="https://wa.me/919310604015" target="_blank" rel="noopener noreferrer" className="pill-btn pill-btn-outline">WhatsApp Us</a>
            </div>
          </div>
        </div>
      </section>

      <Footer />
      <WhatsAppButton />
    </div>
  );
}
