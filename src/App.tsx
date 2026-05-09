import { Routes, Route } from "react-router";
import { ThemeProvider } from "./contexts/ThemeContext";
import { LanguageProvider } from "./contexts/LanguageContext";
import { TRPCProvider } from "@/providers/trpc";
import ScrollToTop from "@/components/ScrollToTop";
import Home from "./pages/Home";
import Services from "./pages/Services";
import Testimonials from "./pages/Testimonials";
import Blog from "./pages/Blog";
import BlogDetail from "./pages/BlogDetail";
import Inquiry from "./pages/Inquiry";
import Payment from "./pages/Payment";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";

export default function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <TRPCProvider>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/services" element={<Services />} />
            <Route path="/testimonials" element={<Testimonials />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:slug" element={<BlogDetail />} />
            <Route path="/inquiry" element={<Inquiry />} />
            <Route path="/payment" element={<Payment />} />
            <Route path="/login" element={<Login />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
          <ScrollToTop />
        </TRPCProvider>
      </LanguageProvider>
    </ThemeProvider>
  );
}
