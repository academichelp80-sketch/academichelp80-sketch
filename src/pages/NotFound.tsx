import { Link } from "react-router";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { Home, ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[var(--bg-primary)]">
      <SEO title="Page Not Found — AcademicHelp" />
      <Navbar />
      <main className="pt-24 flex items-center justify-center min-h-[60vh]">
        <div className="text-center space-y-6 max-w-md mx-auto px-6">
          <div className="font-mono text-[100px] font-medium text-[var(--accent)] opacity-20 leading-none select-none">404</div>
          <div className="space-y-2 -mt-8">
            <h1 className="text-[var(--text-primary)]">Page Not Found</h1>
            <p className="text-[var(--text-secondary)] text-[14px]">The page you are looking for does not exist or has been moved.</p>
          </div>
          <div className="flex flex-wrap justify-center gap-3 pt-4">
            <Link to="/" className="pill-btn pill-btn-primary">
              <Home className="w-3.5 h-3.5" />Back to Home
            </Link>
            <Link to="/inquiry" className="pill-btn pill-btn-outline">
              <ArrowLeft className="w-3.5 h-3.5" />Send Inquiry
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
