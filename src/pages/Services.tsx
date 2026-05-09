import { useEffect } from "react";
import { useTranslation } from "@/hooks/useTranslation";
import { useLanguage } from "@/contexts/LanguageContext";
import { servicesData } from "@/data/services";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import SEO from "@/components/SEO";
import { FileText, BookOpen, GraduationCap, Settings, Network, Eye, ShieldCheck, Globe, ArrowRight, CheckCircle2 } from "lucide-react";

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

export default function Services() {
  const t = useTranslation();
  const { language } = useLanguage();
  const services = servicesData;

  useEffect(() => { document.title = `${t.nav.services} — ${t.brand}`; }, [t]);

  return (
    <div className="min-h-screen bg-[var(--bg-primary)]">
      <SEO title={`${t.nav.services} — ${t.brand}`} description="Explore our comprehensive research consultancy services." />
      <Navbar />
      <main className="pt-24">
        <section className="py-14 lg:py-20 bg-[var(--bg-secondary)]">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <p className="section-label mb-3">Comprehensive Solutions</p>
            <h1 className="text-[var(--text-primary)] mb-3">Our Services</h1>
            <p className="text-[var(--text-secondary)] text-[15px] max-w-lg">End-to-end academic support for every stage of your research journey.</p>
          </div>
        </section>

        <section className="py-16">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="grid md:grid-cols-2 gap-4">
              {services.map((service) => (
                <div key={service.id} className="card-dark p-6 group">
                  <div className="flex items-start gap-5">
                    <div className="w-11 h-11 rounded-lg bg-[var(--accent-dim)] flex items-center justify-center text-[var(--accent)] shrink-0">
                      {serviceIcons[service.icon || "FileText"]}
                    </div>
                    <div>
                      <h2 className="font-sans text-[16px] font-semibold text-[var(--text-primary)] mb-2">{language === "hi" && service.titleHi ? service.titleHi : service.titleEn}</h2>
                      <p className="text-[13px] text-[var(--text-muted)] leading-relaxed mb-3">{language === "hi" && service.fullDescHi ? service.fullDescHi : service.fullDescEn}</p>
                      <a href="https://wa.me/919310604015" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-[12px] font-medium text-[var(--accent)] hover:underline">Get This Service <ArrowRight className="w-3 h-3" /></a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 bg-[var(--bg-secondary)]">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="text-center mb-8">
              <p className="section-label mb-2">Why AcademicHelp</p>
              <h2 className="text-[var(--text-primary)]">The AcademicHelp Advantage</h2>
            </div>
            <div className="grid md:grid-cols-3 gap-4">
              {[
                { title: "100% Customized", desc: "Every project crafted to match your research objectives and target journal requirements." },
                { title: "PhD Experts", desc: "Doctorate-qualified researchers with expertise across diverse academic disciplines." },
                { title: "Fully Confidential", desc: "Complete anonymity throughout the research and publication process." },
              ].map((item) => (
                <div key={item.title} className="card-dark p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <CheckCircle2 className="w-4 h-4 text-[var(--accent)]" />
                    <h3 className="font-sans text-[15px] font-semibold text-[var(--text-primary)]">{item.title}</h3>
                  </div>
                  <p className="text-[13px] text-[var(--text-muted)] leading-relaxed">{item.desc}</p>
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
