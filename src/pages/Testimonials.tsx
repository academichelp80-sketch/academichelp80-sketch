import { useState } from "react";
import { useTranslation } from "@/hooks/useTranslation";
import { useLanguage } from "@/contexts/LanguageContext";
import { testimonialsData } from "@/data/testimonials";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import SEO from "@/components/SEO";
import { Star, Search, GraduationCap } from "lucide-react";

export default function Testimonials() {
  const t = useTranslation();
  const { language } = useLanguage();
  const [query, setQuery] = useState("");
  const testimonials = testimonialsData;

  const filtered = testimonials.filter((tt) =>
    query.length < 2 ||
    tt.name.toLowerCase().includes(query.toLowerCase()) ||
    tt.university.toLowerCase().includes(query.toLowerCase()) ||
    tt.contentEn.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[var(--bg-primary)]">
      <SEO title={`${t.nav.testimonials} — ${t.brand}`} description="56+ Indian scholars trust AcademicHelp for their research journey. Read their success stories." />
      <Navbar />
      <main className="pt-24">
        <section className="py-14 lg:py-20 bg-[var(--bg-secondary)]">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <p className="section-label mb-3">Success Stories</p>
            <h1 className="text-[var(--text-primary)] mb-3">What Scholars Say</h1>
            <p className="text-[var(--text-secondary)] text-[15px] max-w-lg">56+ Indian scholars trust AcademicHelp for their research journey.</p>
          </div>
        </section>

        <section className="py-12">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="flex flex-col sm:flex-row gap-4 mb-8 items-start sm:items-center justify-between">
              <div className="relative max-w-sm w-full">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--text-muted)]" />
                <input
                  value={query} onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search by name, university, or keyword..."
                  className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-[var(--border-medium)] bg-[var(--bg-card)] text-[var(--text-primary)] text-[14px] placeholder:text-[var(--text-muted)] focus:outline-none focus:border-[var(--accent)] transition-colors"
                />
              </div>
              <p className="text-[12px] font-mono text-[var(--text-muted)]">{filtered.length} of {testimonials.length} reviews</p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filtered.map((tt) => (
                <div key={tt.id} className="card-dark p-6 flex flex-col h-full">
                  <div className="flex gap-1 mb-3">
                    {Array.from({ length: tt.rating || 5 }).map((_, j) => (
                      <Star key={j} className="w-3.5 h-3.5 fill-[var(--accent)] text-[var(--accent)]" />
                    ))}
                  </div>
                  <p className="text-[14px] text-[var(--text-secondary)] leading-relaxed flex-1 mb-4">{language === "hi" && tt.contentHi ? tt.contentHi : tt.contentEn}</p>
                  <div className="flex items-center gap-3 pt-4 border-t border-[var(--border-subtle)]">
                    <div className="w-9 h-9 rounded-full bg-[var(--accent-soft)] flex items-center justify-center text-[var(--accent)] text-[11px] font-mono font-medium">{tt.name.split(" ").map(n => n[0]).join("").slice(0, 2)}</div>
                    <div>
                      <p className="text-[13px] font-semibold text-[var(--text-primary)]">{tt.name}</p>
                      <p className="text-[11px] text-[var(--text-muted)]">{tt.designation}</p>
                      <p className="text-[11px] text-[var(--accent)] flex items-center gap-1 mt-0.5"><GraduationCap className="w-3 h-3" />{tt.university}</p>
                    </div>
                  </div>
                </div>
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
