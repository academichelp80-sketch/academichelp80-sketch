import { useState, useEffect } from "react";
import { useTranslation } from "@/hooks/useTranslation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import SEO from "@/components/SEO";
import { Send, User, Mail, Phone, FileText, Target, FlaskConical, CheckCircle2, ArrowRight } from "lucide-react";

export default function Inquiry() {
  const t = useTranslation();
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", title: "", objectives: "", methodology: "" });
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => { document.title = `${t.nav.inquiry} — ${t.brand}`; }, [t]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const message = `*Research Inquiry from AcademicHelp*%0A%0A` +
      `*Name:* ${formData.name}%0A` +
      `*Email:* ${formData.email || "N/A"}%0A` +
      `*Phone:* ${formData.phone || "N/A"}%0A%0A` +
      `*Research Title:*%0A${formData.title}%0A%0A` +
      `*Objectives:*%0A${formData.objectives || "N/A"}%0A%0A` +
      `*Methodology:*%0A${formData.methodology || "N/A"}`;
    window.open(`https://wa.me/919310604015?text=${message}`, "_blank");
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-[var(--bg-primary)]">
      <SEO title={`${t.nav.inquiry} — ${t.brand}`} description="Send your research inquiry. Share your title, objectives, and methodology." />
      <Navbar />
      <main className="pt-24 pb-20">
        {/* Hero */}
        <section className="py-16 lg:py-20">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <p className="section-label mb-4">Start Your Journey</p>
            <h1 className="text-[var(--text-primary)] mb-4">Send Your Inquiry</h1>
            <p className="text-[var(--text-secondary)] text-[15px] max-w-lg">
              Share your research details. We will connect on WhatsApp within 24 hours.
            </p>
          </div>
        </section>

        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Left */}
            <div className="space-y-6 lg:sticky lg:top-24">
              <div className="space-y-4">
                <h2 className="font-sans text-[18px] font-semibold text-[var(--text-primary)]">How It Works</h2>
                <div className="space-y-4">
                  {[
                    { icon: <FileText className="w-4 h-4" />, text: "Fill in your research details" },
                    { icon: <Send className="w-4 h-4" />, text: "Click Send via WhatsApp" },
                    { icon: <ArrowRight className="w-4 h-4" />, text: "Connect with our expert" },
                    { icon: <CheckCircle2 className="w-4 h-4" />, text: "Get personalized guidance" },
                  ].map((step, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-[var(--accent-dim)] flex items-center justify-center text-[var(--accent)]">{step.icon}</div>
                      <span className="text-[13px] text-[var(--text-secondary)]">{step.text}</span>
                    </div>
                  ))}
                </div>
              </div>
              <a href="https://wa.me/919310604015" target="_blank" rel="noopener noreferrer" className="pill-btn pill-btn-primary inline-flex">
                <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                Quick Connect on WhatsApp
              </a>
            </div>

            {/* Right - Form */}
            <div>
              {submitted ? (
                <div className="card-elevated p-8 text-center space-y-4">
                  <div className="w-12 h-12 mx-auto flex items-center justify-center rounded-full bg-[#25D366]/10 text-[#25D366]">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <h2 className="font-sans text-[18px] font-semibold text-[var(--text-primary)]">Inquiry Sent!</h2>
                  <p className="text-[13px] text-[var(--text-muted)]">We will connect with you on WhatsApp shortly.</p>
                  <button onClick={() => { setSubmitted(false); setFormData({ name: "", email: "", phone: "", title: "", objectives: "", methodology: "" }); }}
                    className="text-[12px] text-[var(--accent)] hover:underline">Send another</button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="card-elevated p-8 space-y-5">
                  <div className="grid md:grid-cols-2 gap-5">
                    <div className="space-y-1.5">
                      <label className="flex items-center gap-1.5 text-[11px] font-mono tracking-wider uppercase text-[var(--text-muted)]"><User className="w-3 h-3" />Name *</label>
                      <input type="text" name="name" required value={formData.name} onChange={handleChange}
                        className="w-full px-4 py-3 bg-[var(--bg-primary)] border border-[var(--border-subtle)] rounded-xl text-[13px] text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent)]/30 transition-colors" placeholder="Dr. Your Name" />
                    </div>
                    <div className="space-y-1.5">
                      <label className="flex items-center gap-1.5 text-[11px] font-mono tracking-wider uppercase text-[var(--text-muted)]"><Mail className="w-3 h-3" />Email</label>
                      <input type="email" name="email" value={formData.email} onChange={handleChange}
                        className="w-full px-4 py-3 bg-[var(--bg-primary)] border border-[var(--border-subtle)] rounded-xl text-[13px] text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent)]/30 transition-colors" placeholder="your@email.com" />
                    </div>
                  </div>
                  <div className="space-y-1.5">
                    <label className="flex items-center gap-1.5 text-[11px] font-mono tracking-wider uppercase text-[var(--text-muted)]"><Phone className="w-3 h-3" />Phone</label>
                    <input type="tel" name="phone" value={formData.phone} onChange={handleChange}
                      className="w-full px-4 py-3 bg-[var(--bg-primary)] border border-[var(--border-subtle)] rounded-xl text-[13px] text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent)]/30 transition-colors" placeholder="+91 98765 43210" />
                  </div>
                  <div className="space-y-1.5">
                    <label className="flex items-center gap-1.5 text-[11px] font-mono tracking-wider uppercase text-[var(--text-muted)]"><FileText className="w-3 h-3" />Research Title *</label>
                    <input type="text" name="title" required value={formData.title} onChange={handleChange}
                      className="w-full px-4 py-3 bg-[var(--bg-primary)] border border-[var(--border-subtle)] rounded-xl text-[13px] text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent)]/30 transition-colors" placeholder="Your research title" />
                  </div>
                  <div className="space-y-1.5">
                    <label className="flex items-center gap-1.5 text-[11px] font-mono tracking-wider uppercase text-[var(--text-muted)]"><Target className="w-3 h-3" />Proposed Objectives</label>
                    <textarea name="objectives" rows={3} value={formData.objectives} onChange={handleChange}
                      className="w-full px-4 py-3 bg-[var(--bg-primary)] border border-[var(--border-subtle)] rounded-xl text-[13px] text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent)]/30 transition-colors resize-none" placeholder="Describe your objectives" />
                  </div>
                  <div className="space-y-1.5">
                    <label className="flex items-center gap-1.5 text-[11px] font-mono tracking-wider uppercase text-[var(--text-muted)]"><FlaskConical className="w-3 h-3" />Proposed Methodology</label>
                    <textarea name="methodology" rows={3} value={formData.methodology} onChange={handleChange}
                      className="w-full px-4 py-3 bg-[var(--bg-primary)] border border-[var(--border-subtle)] rounded-xl text-[13px] text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent)]/30 transition-colors resize-none" placeholder="Describe your methodology" />
                  </div>
                  <button type="submit" className="w-full flex items-center justify-center gap-2 bg-[#25D366] text-white text-[12px] font-semibold tracking-wider uppercase px-6 py-3.5 rounded-full hover:bg-[#1faa52] transition-all">
                    <Send className="w-3.5 h-3.5" />Send via WhatsApp
                  </button>
                  <p className="text-[10px] text-[var(--text-muted)] text-center">Your inquiry goes directly to our WhatsApp (+91 93106 04015)</p>
                </form>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
}
