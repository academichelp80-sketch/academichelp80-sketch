import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router";
import { useLanguage } from "@/contexts/LanguageContext";
import { translations, type Language } from "@/i18n/translations";
import { Menu, X, ChevronDown } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

export default function Navbar() {
  const { language, setLanguage, languages } = useLanguage();
  const location = useLocation();
  const t = translations[language];
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: t.nav.services, path: "/services" },
    { label: t.nav.testimonials, path: "/testimonials" },
    { label: t.nav.blog, path: "/blog" },
    { label: t.nav.inquiry, path: "/inquiry" },
    { label: t.nav.payment, path: "/payment" },
  ];

  const currentLang = languages.find(l => l.code === language);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[var(--bg-primary)]/80 backdrop-blur-xl border-b border-[var(--border-subtle)]"
          : "bg-transparent"
      }`}
    >
      <nav className="max-w-7xl mx-auto px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2.5 group shrink-0">
          <div className="w-7 h-7 rounded-md bg-[var(--accent)]/10 flex items-center justify-center">
            <svg className="w-4 h-4 text-[var(--accent)]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 2L2 7l10 5 10-5-10-5z"/>
              <path d="M2 17l10 5 10-5"/>
              <path d="M2 12l10 5 10-5"/>
            </svg>
          </div>
          <span className="text-[13px] font-semibold tracking-[0.08em] text-[var(--text-primary)]">
            {t.brand}
          </span>
        </Link>

        {/* Desktop Nav - Centered */}
        <div className="hidden lg:flex items-center gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`px-3.5 py-2 text-[13px] font-medium rounded-full transition-colors ${
                location.pathname === link.path
                  ? "text-[var(--accent)] bg-[var(--accent-dim)]"
                  : "text-[var(--text-muted)] hover:text-[var(--text-primary)]"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Right Side */}
        <div className="flex items-center gap-3">
          {/* Language */}
          <DropdownMenu>
            <DropdownMenuTrigger className="hidden md:flex items-center gap-1 px-3 py-1.5 text-[12px] font-medium text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors">
              {currentLang?.nativeName}
              <ChevronDown className="w-3 h-3" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="bg-[var(--bg-elevated)] border-[var(--border-subtle)] min-w-[160px]">
              {languages.map((lang) => (
                <DropdownMenuItem
                  key={lang.code}
                  onClick={() => setLanguage(lang.code as Language)}
                  className={`text-[12px] cursor-pointer ${
                    language === lang.code ? "text-[var(--accent)]" : "text-[var(--text-secondary)]"
                  }`}
                >
                  {lang.nativeName}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          {/* WhatsApp CTA */}
          <a
            href="https://wa.me/919310604015"
            target="_blank"
            rel="noopener noreferrer"
            className="pill-btn pill-btn-primary hidden md:inline-flex"
          >
            <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
            WhatsApp
          </a>

          {/* Mobile Menu */}
          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger className="lg:hidden p-2 text-[var(--text-muted)] hover:text-[var(--text-primary)]">
              <Menu className="w-5 h-5" />
            </SheetTrigger>
            <SheetContent side="right" className="w-72 bg-[var(--bg-secondary)] border-l border-[var(--border-subtle)] p-6">
              <div className="flex flex-col gap-1 mt-8">
                {[{ label: t.nav.home, path: "/" }, ...navLinks].map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    onClick={() => setMobileOpen(false)}
                    className={`px-4 py-3 text-[14px] font-medium rounded-lg transition-colors ${
                      location.pathname === link.path
                        ? "text-[var(--accent)] bg-[var(--accent-soft)]"
                        : "text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--accent-soft)]"
                    }`}
                  >
                    {link.label}
                  </Link>
                ))}
                <a
                  href="https://wa.me/919310604015"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 pill-btn pill-btn-primary justify-center"
                >
                  Connect on WhatsApp
                </a>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </header>
  );
}
