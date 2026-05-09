import { useState, useEffect, useRef } from "react";
import { useTranslation } from "@/hooks/useTranslation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import SEO from "@/components/SEO";
import { CreditCard, User, IndianRupee, Download, CheckCircle2, ShieldCheck, Zap } from "lucide-react";
import jsPDF from "jspdf";

interface PaymentData {
  userName: string;
  amount: string;
  razorpayPaymentId: string;
  razorpayOrderId: string;
  date: string;
}

export default function Payment() {
  const t = useTranslation();
  const [userName, setUserName] = useState("");
  const [amount, setAmount] = useState("");
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [paymentData, setPaymentData] = useState<PaymentData | null>(null);
  const billRef = useRef<HTMLDivElement>(null);

  useEffect(() => { document.title = `${t.nav.payment} — ${t.brand}`; }, [t]);

  const handlePayment = () => {
    if (!userName.trim() || !amount.trim()) return;
    const amt = parseFloat(amount);
    if (isNaN(amt) || amt <= 0) return;

    setTimeout(() => {
      const data: PaymentData = {
        userName,
        amount,
        razorpayPaymentId: `PAY_${Date.now()}`,
        razorpayOrderId: `ORD_${Date.now()}`,
        date: new Date().toISOString(),
      };
      setPaymentData(data);
      setPaymentSuccess(true);
    }, 600);
  };

  const generateBill = () => {
    if (!paymentData) return;
    const doc = new jsPDF();
    const date = new Date(paymentData.date);
    const formattedDate = date.toLocaleDateString("en-IN", { day: "2-digit", month: "long", year: "numeric" });

    doc.setFillColor(5, 23, 71);
    doc.rect(0, 0, 210, 42, "F");
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(20);
    doc.setFont("helvetica", "bold");
    doc.text("ACADEMICHELP", 105, 18, { align: "center" });
    doc.setFontSize(9);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(200, 210, 230);
    doc.text("Research Consultancy Services", 105, 26, { align: "center" });
    doc.setTextColor(255, 255, 255);
    doc.text("+91 93106 04015  |  academichelp80@gmail.com", 105, 34, { align: "center" });

    doc.setTextColor(5, 23, 71);
    doc.setFontSize(15);
    doc.setFont("helvetica", "bold");
    doc.text("PAYMENT RECEIPT", 105, 56, { align: "center" });
    doc.setDrawColor(5, 23, 71);
    doc.setLineWidth(0.3);
    doc.line(20, 62, 190, 62);

    doc.setFontSize(10);
    let y = 72;
    const lh = 8;
    const row = (label: string, value: string) => {
      doc.setFont("helvetica", "bold");
      doc.setTextColor(83, 95, 128);
      doc.text(label, 20, y);
      doc.setFont("helvetica", "normal");
      doc.setTextColor(5, 23, 71);
      doc.text(value, 80, y);
      y += lh;
    };
    row("Receipt No:", paymentData.razorpayPaymentId);
    row("Date:", formattedDate);
    row("Order ID:", paymentData.razorpayOrderId);
    y += 3;
    doc.setDrawColor(30, 41, 59);
    doc.line(20, y - 3, 190, y - 3);
    y += 5;
    row("Billed To:", paymentData.userName);
    row("Service:", "Research Consultancy");
    y += 3;
    doc.setDrawColor(30, 41, 59);
    doc.line(20, y - 3, 190, y - 3);
    y += 8;

    doc.setFont("helvetica", "bold");
    doc.setFontSize(13);
    doc.setTextColor(5, 23, 71);
    doc.text("Total Amount:", 130, y);
    doc.setTextColor(8, 31, 98);
    doc.text(`Rs. ${parseFloat(paymentData.amount).toLocaleString("en-IN")}/-`, 190, y, { align: "right" });
    y += 10;
    doc.setFontSize(8);
    doc.setTextColor(83, 95, 128);
    doc.setFont("helvetica", "italic");
    doc.text(`(${numberToWords(parseFloat(paymentData.amount))} Only)`, 190, y, { align: "right" });
    y += 15;

    doc.setFillColor(5, 23, 71);
    doc.roundedRect(85, y - 5, 40, 10, 3, 3, "F");
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(10);
    doc.setFont("helvetica", "bold");
    doc.text("PAID", 105, y + 1, { align: "center" });
    y += 25;

    doc.setTextColor(83, 95, 128);
    doc.setFontSize(8);
    doc.setFont("helvetica", "normal");
    doc.text("Thank you for choosing AcademicHelp!", 105, y, { align: "center" });
    y += 5;
    doc.text("For queries: +91 93106 04015", 105, y, { align: "center" });
    y += 5;
    doc.text("This is a computer generated receipt.", 105, y, { align: "center" });

    doc.save(`AcademicHelp_Receipt_${paymentData.razorpayPaymentId}.pdf`);
  };

  function numberToWords(num: number): string {
    const ones = ["", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine"];
    const teens = ["Ten", "Eleven", "Twelve", "Thirteen", "Fourteen", "Fifteen", "Sixteen", "Seventeen", "Eighteen", "Nineteen"];
    const tens = ["", "", "Twenty", "Thirty", "Forty", "Fifty", "Sixty", "Seventy", "Eighty", "Ninety"];
    if (num === 0) return "Zero";
    if (num < 10) return ones[num];
    if (num < 20) return teens[num - 10];
    if (num < 100) return tens[Math.floor(num / 10)] + (num % 10 ? " " + ones[num % 10] : "");
    if (num < 1000) return ones[Math.floor(num / 100)] + " Hundred" + (num % 100 ? " and " + numberToWords(num % 100) : "");
    if (num < 100000) return numberToWords(Math.floor(num / 1000)) + " Thousand" + (num % 1000 ? " " + numberToWords(num % 1000) : "");
    if (num < 10000000) return numberToWords(Math.floor(num / 100000)) + " Lakh" + (num % 100000 ? " " + numberToWords(num % 100000) : "");
    return numberToWords(Math.floor(num / 10000000)) + " Crore" + (num % 10000000 ? " " + numberToWords(num % 10000000) : "");
  }

  return (
    <div className="min-h-screen bg-[var(--bg-primary)]">
      <SEO title={`${t.nav.payment} — ${t.brand}`} description="Make a secure payment for your research services." />
      <Navbar />
      <main className="pt-24 pb-20">
        {/* Hero */}
        <section className="py-16 lg:py-20">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <p className="section-label mb-4">Secure Payment</p>
            <h1 className="text-[var(--text-primary)] mb-4">Make Payment</h1>
            <p className="text-[var(--text-secondary)] text-[15px] max-w-lg">
              Secure payment for your research services with instant receipt.
            </p>
          </div>
        </section>

        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Left */}
            <div className="space-y-6 lg:sticky lg:top-24">
              <div className="space-y-4">
                <h2 className="font-sans text-[18px] font-semibold text-[var(--text-primary)]">Payment Features</h2>
                <div className="space-y-4">
                  {[
                    { icon: <ShieldCheck className="w-4 h-4" />, text: "Secure Razorpay payment gateway" },
                    { icon: <Zap className="w-4 h-4" />, text: "Automatic PDF bill generation" },
                    { icon: <CreditCard className="w-4 h-4" />, text: "UPI, Cards, Net Banking accepted" },
                    { icon: <CheckCircle2 className="w-4 h-4" />, text: "Instant payment confirmation" },
                  ].map((feat, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-[var(--accent-dim)] flex items-center justify-center text-[var(--accent)]">{feat.icon}</div>
                      <span className="text-[13px] text-[var(--text-secondary)]">{feat.text}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right */}
            <div>
              {paymentSuccess && paymentData ? (
                <div className="space-y-5">
                  <div className="card-elevated p-6 text-center space-y-3">
                    <div className="w-12 h-12 mx-auto flex items-center justify-center rounded-full bg-[#25D366]/10 text-[#25D366]">
                      <CheckCircle2 className="w-6 h-6" />
                    </div>
                    <h2 className="font-sans text-[18px] font-semibold text-[var(--text-primary)]">{t.payment.success}</h2>
                    <p className="text-[12px] font-mono text-[var(--text-muted)]">{paymentData.razorpayPaymentId}</p>
                  </div>

                  <div ref={billRef} className="card-dark p-8">
                    <div className="text-center space-y-2 mb-6">
                      <h3 className="font-mono text-lg font-medium text-[var(--accent)]">ACADEMICHELP</h3>
                      <p className="text-[10px] text-[var(--text-muted)]">Research Consultancy Services</p>
                      <div className="w-16 h-px bg-[var(--border-subtle)] mx-auto" />
                      <p className="text-[10px] font-mono tracking-wider text-[var(--text-muted)] uppercase">Receipt</p>
                    </div>
                    <div className="space-y-2 text-[13px]">
                      <div className="flex justify-between"><span className="text-[var(--text-muted)]">Receipt No</span><span className="font-mono text-[var(--text-primary)]">{paymentData.razorpayPaymentId}</span></div>
                      <div className="flex justify-between"><span className="text-[var(--text-muted)]">Date</span><span className="text-[var(--text-primary)]">{new Date(paymentData.date).toLocaleDateString("en-IN")}</span></div>
                      <div className="h-px bg-[var(--border-subtle)] my-3" />
                      <div className="flex justify-between"><span className="text-[var(--text-muted)]">Billed To</span><span className="text-[var(--text-primary)]">{paymentData.userName}</span></div>
                      <div className="h-px bg-[var(--border-subtle)] my-3" />
                      <div className="flex justify-between items-center pt-2">
                        <span className="text-[var(--text-primary)]">Total</span>
                        <span className="font-mono text-xl font-medium text-[var(--accent)]">Rs. {parseFloat(paymentData.amount).toLocaleString("en-IN")}/-</span>
                      </div>
                      <div className="flex justify-center mt-4">
                        <span className="inline-flex items-center gap-1.5 bg-[#25D366]/10 text-[#25D366] text-[11px] font-semibold px-3 py-1 rounded-full">
                          <CheckCircle2 className="w-3 h-3" />PAID
                        </span>
                      </div>
                    </div>
                  </div>

                  <button onClick={generateBill}
                    className="w-full flex items-center justify-center gap-2 bg-[var(--accent)] text-[var(--bg-primary)] text-[12px] font-semibold tracking-wider uppercase px-6 py-3.5 rounded-full hover:brightness-110 transition-all">
                    <Download className="w-4 h-4" />{t.payment.downloadBill}
                  </button>
                  <button onClick={() => { setPaymentSuccess(false); setPaymentData(null); setUserName(""); setAmount(""); }}
                    className="w-full text-[12px] text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors">
                    Make another payment
                  </button>
                </div>
              ) : (
                <div className="card-elevated p-8 space-y-5">
                  <div className="text-center mb-2">
                    <div className="w-12 h-12 mx-auto flex items-center justify-center rounded-xl bg-[var(--accent-dim)] text-[var(--accent)] mb-3">
                      <CreditCard className="w-6 h-6" />
                    </div>
                    <h2 className="font-sans text-[16px] font-semibold text-[var(--text-primary)]">Payment Details</h2>
                  </div>
                  <div className="space-y-1.5">
                    <label className="flex items-center gap-1.5 text-[11px] font-mono tracking-wider uppercase text-[var(--text-muted)]"><User className="w-3 h-3" />Your Name *</label>
                    <input type="text" value={userName} onChange={(e) => setUserName(e.target.value)}
                      className="w-full px-4 py-3 bg-[var(--bg-primary)] border border-[var(--border-subtle)] rounded-xl text-[13px] text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent)]/30 transition-colors" placeholder="Full name" />
                  </div>
                  <div className="space-y-1.5">
                    <label className="flex items-center gap-1.5 text-[11px] font-mono tracking-wider uppercase text-[var(--text-muted)]"><IndianRupee className="w-3 h-3" />Amount (INR) *</label>
                    <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)}
                      className="w-full px-4 py-3 bg-[var(--bg-primary)] border border-[var(--border-subtle)] rounded-xl text-[13px] text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent)]/30 transition-colors" placeholder="Enter amount" min="1" />
                  </div>
                  <button onClick={handlePayment} disabled={!userName.trim() || !amount.trim()}
                    className="w-full flex items-center justify-center gap-2 bg-[var(--accent)] text-[var(--bg-primary)] text-[12px] font-semibold tracking-wider uppercase px-6 py-3.5 rounded-full hover:brightness-110 transition-all disabled:opacity-40 disabled:cursor-not-allowed">
                    <CreditCard className="w-4 h-4" />{t.payment.pay}
                  </button>
                  <p className="text-[10px] text-[var(--text-muted)] text-center">Demo mode: Any name and amount generates a test receipt.</p>
                </div>
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
