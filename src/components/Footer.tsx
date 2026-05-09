import { Link } from "react-router";
import { useTranslation } from "@/hooks/useTranslation";
import { Phone, Mail, MapPin } from "lucide-react";

export default function Footer() {
  const t = useTranslation();

  return (
    <footer className="border-t border-[var(--border-subtle)] bg-[var(--bg-secondary)]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-md bg-[var(--accent-soft)] flex items-center justify-center">
                <svg className="w-4 h-4 text-[var(--accent)]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/>
                </svg>
              </div>
              <span className="text-[13px] font-semibold tracking-[0.08em] text-[var(--text-primary)]">{t.brand}</span>
            </Link>
            <p className="text-[13px] text-[var(--text-muted)] leading-relaxed">
              India's premier research consultancy helping scholars achieve publication success.
            </p>
          </div>

          {/* Links */}
          <div>
            <p className="text-[11px] font-mono tracking-[0.15em] uppercase text-[var(--text-muted)] mb-4">Navigation</p>
            <ul className="space-y-2.5">
              {["Home", "Services", "Testimonials", "Blog", "Inquiry", "Payment"].map((label) => (
                <li key={label}>
                  <Link to={label === "Home" ? "/" : `/${label.toLowerCase()}`} className="text-[13px] text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors">{label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <p className="text-[11px] font-mono tracking-[0.15em] uppercase text-[var(--text-muted)] mb-4">Services</p>
            <ul className="space-y-2.5">
              {["Research Paper Writing", "Review Paper Writing", "Thesis Writing", "Methodology Design", "Peer Review", "Plagiarism Removal"].map((s) => (
                <li key={s}>
                  <Link to="/services" className="text-[13px] text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors">{s}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <p className="text-[11px] font-mono tracking-[0.15em] uppercase text-[var(--text-muted)] mb-4">Contact</p>
            <ul className="space-y-3">
              <li className="flex items-center gap-2.5 text-[13px] text-[var(--text-muted)]">
                <Phone className="w-3.5 h-3.5 text-[var(--accent)]" />
                <a href="tel:+919310604015" className="hover:text-[var(--text-primary)] transition-colors">+91 93106 04015</a>
              </li>
              <li className="flex items-center gap-2.5 text-[13px] text-[var(--text-muted)]">
                <Mail className="w-3.5 h-3.5 text-[var(--accent)]" />
                <a href="mailto:academichelp80@gmail.com" className="hover:text-[var(--text-primary)] transition-colors">academichelp80@gmail.com</a>
              </li>
              <li className="flex items-center gap-2.5 text-[13px] text-[var(--text-muted)]">
                <MapPin className="w-3.5 h-3.5 text-[var(--accent)]" /><span>India</span>
              </li>
            </ul>
            <a href="https://wa.me/919310604015" target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 mt-5 text-[12px] font-medium text-[#25D366] hover:text-[#1faa52] transition-colors">
              <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              WhatsApp
            </a>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-[var(--border-subtle)] flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="text-[11px] text-[var(--text-muted)]">{t.footer.copyright}</p>
          <div className="flex items-center gap-4">
            <span className="text-[11px] text-[var(--text-muted)]">Privacy</span>
            <span className="text-[11px] text-[var(--text-muted)]">Terms</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
