import { useEffect } from "react";

interface SEOProps {
  title: string;
  description?: string;
  keywords?: string;
  ogImage?: string;
  ogType?: string;
}

export default function SEO({
  title,
  description = "AcademicHelp provides expert research consultancy for research papers, review papers, thesis writing, methodology design, conceptual framework, peer review, and plagiarism removal. Trusted by 56+ Indian scholars.",
  keywords = "research paper writing, AI tools for research, research publications, research Scopus, thesis writing, plagiarism removal, peer review, academic consultancy, SCI journals, UGC CARE",
  ogImage = "/images/hero-bg.jpg",
  ogType = "website",
}: SEOProps) {
  useEffect(() => {
    document.title = title;

    const setMeta = (name: string, content: string, property = false) => {
      const selector = property ? `meta[property="${name}"]` : `meta[name="${name}"]`;
      let meta = document.querySelector(selector) as HTMLMetaElement | null;
      if (!meta) {
        meta = document.createElement("meta");
        if (property) meta.setAttribute("property", name);
        else meta.name = name;
        document.head.appendChild(meta);
      }
      meta.content = content;
    };

    setMeta("description", description);
    setMeta("keywords", keywords);
    setMeta("og:title", title, true);
    setMeta("og:description", description, true);
    setMeta("og:type", ogType, true);
    setMeta("og:image", ogImage, true);
    setMeta("twitter:card", "summary_large_image", true);
    setMeta("twitter:title", title, true);
    setMeta("twitter:description", description, true);
    setMeta("twitter:image", ogImage, true);
    setMeta("author", "AcademicHelp");
    setMeta("robots", "index, follow");

    // Canonical link
    const canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!canonical) {
      const link = document.createElement("link");
      link.rel = "canonical";
      link.href = window.location.href;
      document.head.appendChild(link);
    } else {
      canonical.href = window.location.href;
    }
  }, [title, description, keywords, ogImage, ogType]);

  return null;
}
