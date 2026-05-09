import { useState, useRef } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import SEO from "@/components/SEO";
import { jsPDF } from "jspdf";
import {
  QrCode, Copy, CheckCircle2, Download, ArrowLeft,
  CreditCard, User, Mail, FileText, IndianRupee,
  CalendarDays, Hash, Phone, ShieldCheck
} from "lucide-react";

interface PaymentForm {
  name: string;
  email: string;
  phone: string;
  service: string;
  amount: string;
  transactionId: string;
}

const services = [
  "Research Paper Writing",
  "Review Paper Writing",
  "Thesis & Dissertation Writing",
  "Research Methodology Design",
  "Conceptual Framework Development",
  "Peer Review & Paper Improvement",
  "Plagiarism & AI Detection Removal",
  "Journal Publication Support",
];

function numberToWords(num: number): string {
  const ones = ["", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine"];
  const teens = ["Ten", "Eleven", "Twelve", "Thirteen", "Fourteen", "Fifteen", "Sixteen", "Seventeen", "Eighteen", "Nineteen"];
  const tens = ["", "", "Twenty", "Thirty", "Forty", "Fifty", "Sixty", "Seventy", "Eighty", "Ninety"];
  const scales = ["", "Thousand", "Lakh", "Crore"];

  if (num === 0) return "Zero";

  function convert(n: number): string {
    if (n < 10) return ones[n];
    if (n < 20) return teens[n - 10];
    if (n < 100) return tens[Math.floor(n / 10)] + (n % 10 ? " " + ones[n % 10] : "");
    if (n < 1000) return ones[Math.floor(n / 100)] + " Hundred" + (n % 100 ? " " + convert(n % 100) : "");
    return "";
  }

  function indianFormat(n: number): string {
    if (n === 0) return "";
    const parts: string[] = [];
    let scaleIdx = 0;

    while (n > 0) {
      let chunk: number;
      if (scaleIdx === 0) {
        chunk = n % 1000;
        n = Math.floor(n / 1000);
      } else {
        chunk = n % 100;
        n = Math.floor(n / 100);
      }
      if (chunk > 0) {
        const words = convert(chunk);
        parts.unshift(words + (scales[scaleIdx] ? " " + scales[scaleIdx] : ""));
      }
      scaleIdx++;
    }
    return parts.join(" ");
  }

  return indianFormat(num) + " Only";
}

export default function Payment() {
  const [step, setStep] = useState<"form" | "pay" | "confirm" | "receipt">("form");
  const [form, setForm] = useState<PaymentForm>({
    name: "", email: "", phone: "", service: "", amount: "", transactionId: "",
  });
  const [copied, setCopied] = useState(false);
  const [receiptNo] = useState(() => `AH-${Date.now().toString(36).toUpperCase()}`);
  const receiptRef = useRef<HTMLDivElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.service || !form.amount) return;
    setStep("pay");
    window.scrollTo(0, 0);
  };

  const copyUpiId = () => {
    navigator.clipboard.writeText("Mejustrana@ybl");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePaymentDone = () => {
    if (!form.transactionId.trim()) return;
    setStep("confirm");
    setTimeout(() => {
      setStep("receipt");
      window.scrollTo(0, 0);
    }, 1500);
  };

  const generatePDF = () => {
    const doc = new jsPDF("p", "mm", "a4");
    const pageW = 210;
    let y = 0;

    // Header band
    doc.setFillColor(5, 23, 71);
    doc.rect(0, 0, pageW, 50, "F");

    // Logo circle
    doc.setFillColor(255, 255, 255);
    doc.circle(30, 22, 12, "F");
    doc.setTextColor(5, 23, 71);
    doc.setFontSize(14);
    doc.setFont("helvetica", "bold");
    doc.text("A", 28, 26);

    // Brand
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(22);
    doc.setFont("helvetica", "bold");
    doc.text("ACADEMICHELP", 48, 20);

    doc.setFontSize(9);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(180, 195, 220);
    doc.text("Research Consultancy Services", 48, 28);
    doc.text("academichelp80@gmail.com  |  +91 93106 04015", 48, 34);

    // Receipt title
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(10);
    doc.setFont("helvetica", "bold");
    doc.text("PAYMENT RECEIPT", pageW - 20, 20, { align: "right" });
    doc.setFontSize(9);
    doc.setFont("helvetica", "normal");
    doc.text(`Receipt No: ${receiptNo}`, pageW - 20, 28, { align: "right" });
    doc.text(`Date: ${new Date().toLocaleDateString("en-IN")}`, pageW - 20, 34, { align: "right" });

    // White section
    y = 60;
    doc.setTextColor(5, 23, 71);
    doc.setFontSize(13);
    doc.setFont("helvetica", "bold");
    doc.text("Customer Details", 20, y);
    doc.setDrawColor(5, 23, 71);
    doc.setLineWidth(0.4);
    doc.line(20, y + 2, pageW - 20, y + 2);

    y += 12;
    doc.setFontSize(10);
    const details = [
      ["Name:", form.name],
      ["Email:", form.email || "N/A"],
      ["Phone:", form.phone || "N/A"],
      ["Service:", form.service],
      ["Transaction ID:", form.transactionId.toUpperCase()],
      ["Payment Date:", new Date().toLocaleDateString("en-IN")],
    ];
    details.forEach(([label, value]) => {
      doc.setFont("helvetica", "bold");
      doc.setTextColor(83, 95, 128);
      doc.text(label, 20, y);
      doc.setFont("helvetica", "normal");
      doc.setTextColor(5, 23, 71);
      doc.text(String(value), 70, y);
      y += 7;
    });

    // Amount section
    y += 8;
    doc.setFillColor(248, 249, 252);
    doc.rect(15, y - 6, pageW - 30, 42, "F");
    doc.setDrawColor(5, 23, 71);
    doc.setLineWidth(0.3);
    doc.line(20, y + 2, pageW - 20, y + 2);

    doc.setFontSize(12);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(5, 23, 71);
    doc.text("Amount Details", 20, y);

    y += 12;
    doc.setFontSize(10);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(83, 95, 128);
    doc.text("Service Charges:", 20, y);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(5, 23, 71);
    doc.text(`Rs. ${parseFloat(form.amount).toLocaleString("en-IN")}/-`, pageW - 20, y, { align: "right" });

    y += 8;
    doc.setFontSize(14);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(5, 23, 71);
    doc.text("Total Amount:", 20, y);
    doc.text(`Rs. ${parseFloat(form.amount).toLocaleString("en-IN")}/-`, pageW - 20, y, { align: "right" });

    y += 6;
    doc.setFontSize(8);
    doc.setFont("helvetica", "italic");
    doc.setTextColor(83, 95, 128);
    doc.text(`(${numberToWords(parseFloat(form.amount))})`, pageW - 20, y, { align: "right" });

    // Paid stamp
    y += 18;
    doc.setDrawColor(34, 139, 34);
    doc.setLineWidth(1.5);
    doc.ellipse(pageW / 2, y, 22, 10, "S");
    doc.setTextColor(34, 139, 34);
    doc.setFontSize(14);
    doc.setFont("helvetica", "bold");
    doc.text("PAID", pageW / 2, y + 1, { align: "center" });

    // Payment method
    y += 18;
    doc.setFontSize(10);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(5, 23, 71);
    doc.text("Payment Method", 20, y);
    doc.line(20, y + 2, pageW - 20, y + 2);

    y += 10;
    doc.setFont("helvetica", "normal");
    doc.setTextColor(83, 95, 128);
    doc.text("UPI ID:", 20, y);
    doc.setTextColor(5, 23, 71);
    doc.text("Mejustrana@ybl", 50, y);

    y += 7;
    doc.setTextColor(83, 95, 128);
    doc.text("Mode:", 20, y);
    doc.setTextColor(5, 23, 71);
    doc.text("UPI (PhonePe / GPay / Paytm)", 50, y);

    // Footer
    y = 270;
    doc.setDrawColor(200, 205, 215);
    doc.setLineWidth(0.2);
    doc.line(20, y, pageW - 20, y);

    y += 6;
    doc.setFontSize(8);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(120, 130, 150);
    doc.text("Thank you for choosing AcademicHelp!", pageW / 2, y, { align: "center" });
    y += 5;
    doc.text("This is a computer-generated receipt. No signature required.", pageW / 2, y, { align: "center" });

    doc.save(`AcademicHelp-Receipt-${receiptNo}.pdf`);
  };

  const shareOnWhatsApp = () => {
    const text = `Hello AcademicHelp!\n\nI have completed my payment.\n\nName: ${form.name}\nService: ${form.service}\nAmount: Rs. ${form.amount}\nTransaction ID: ${form.transactionId}\nReceipt No: ${receiptNo}\n\nPlease confirm my payment.`;
    window.open(`https://wa.me/919310604015?text=${encodeURIComponent(text)}`, "_blank");
  };

  return (
    <div className="min-h-screen bg-[var(--bg-primary)]">
      <SEO title="Payment — AcademicHelp" description="Make UPI payment and get instant receipt" />
      <Navbar />
      <main className="pt-24 pb-16">

        {/* === STEP 1: PAYMENT FORM === */}
        {step === "form" && (
          <div className="max-w-lg mx-auto px-6 lg:px-8">
            <div className="text-center mb-8">
              <div className="w-14 h-14 mx-auto rounded-xl bg-[var(--accent-soft)] flex items-center justify-center text-[var(--accent)] mb-4">
                <CreditCard className="w-6 h-6" />
              </div>
              <h1 className="text-[var(--text-primary)] mb-2">Payment</h1>
              <p className="text-[var(--text-secondary)] text-[14px]">Fill in your details to proceed with UPI payment</p>
            </div>

            <form onSubmit={handleSubmit} className="card-elevated p-6 md:p-8 space-y-4">
              <div>
                <label className="flex items-center gap-1.5 text-[12px] font-medium text-[var(--text-primary)] mb-1.5">
                  <User className="w-3.5 h-3.5 text-[var(--text-muted)]" />Full Name *
                </label>
                <input name="name" value={form.name} onChange={handleChange} required
                  className="w-full px-3.5 py-2.5 rounded-lg border border-[var(--border-medium)] bg-[var(--bg-card)] text-[var(--text-primary)] text-[14px] placeholder:text-[var(--text-muted)] focus:outline-none focus:border-[var(--accent)] transition-colors"
                  placeholder="Enter your full name" />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="flex items-center gap-1.5 text-[12px] font-medium text-[var(--text-primary)] mb-1.5">
                    <Mail className="w-3.5 h-3.5 text-[var(--text-muted)]" />Email
                  </label>
                  <input name="email" value={form.email} onChange={handleChange} type="email"
                    className="w-full px-3.5 py-2.5 rounded-lg border border-[var(--border-medium)] bg-[var(--bg-card)] text-[var(--text-primary)] text-[14px] placeholder:text-[var(--text-muted)] focus:outline-none focus:border-[var(--accent)] transition-colors"
                    placeholder="your@email.com" />
                </div>
                <div>
                  <label className="flex items-center gap-1.5 text-[12px] font-medium text-[var(--text-primary)] mb-1.5">
                    <Phone className="w-3.5 h-3.5 text-[var(--text-muted)]" />Phone
                  </label>
                  <input name="phone" value={form.phone} onChange={handleChange}
                    className="w-full px-3.5 py-2.5 rounded-lg border border-[var(--border-medium)] bg-[var(--bg-card)] text-[var(--text-primary)] text-[14px] placeholder:text-[var(--text-muted)] focus:outline-none focus:border-[var(--accent)] transition-colors"
                    placeholder="+91 98765 43210" />
                </div>
              </div>

              <div>
                <label className="flex items-center gap-1.5 text-[12px] font-medium text-[var(--text-primary)] mb-1.5">
                  <FileText className="w-3.5 h-3.5 text-[var(--text-muted)]" />Service *
                </label>
                <select name="service" value={form.service} onChange={handleChange} required
                  className="w-full px-3.5 py-2.5 rounded-lg border border-[var(--border-medium)] bg-[var(--bg-card)] text-[var(--text-primary)] text-[14px] focus:outline-none focus:border-[var(--accent)] transition-colors">
                  <option value="">Select a service</option>
                  {services.map((s) => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>

              <div>
                <label className="flex items-center gap-1.5 text-[12px] font-medium text-[var(--text-primary)] mb-1.5">
                  <IndianRupee className="w-3.5 h-3.5 text-[var(--text-muted)]" />Amount (Rs.) *
                </label>
                <input name="amount" value={form.amount} onChange={handleChange} required type="number" min="1"
                  className="w-full px-3.5 py-2.5 rounded-lg border border-[var(--border-medium)] bg-[var(--bg-card)] text-[var(--text-primary)] text-[14px] placeholder:text-[var(--text-muted)] focus:outline-none focus:border-[var(--accent)] transition-colors"
                  placeholder="Enter amount in Rupees" />
              </div>

              <button type="submit" className="w-full pill-btn pill-btn-primary justify-center mt-2">
                Proceed to Payment <ArrowLeft className="w-3.5 h-3.5 rotate-180" />
              </button>

              <div className="flex items-center justify-center gap-2 pt-2">
                <ShieldCheck className="w-3.5 h-3.5 text-green-600" />
                <span className="text-[11px] text-[var(--text-muted)]">Secure UPI Payment via PhonePe / GPay / Paytm</span>
              </div>
            </form>
          </div>
        )}

        {/* === STEP 2: UPI PAYMENT === */}
        {step === "pay" && (
          <div className="max-w-md mx-auto px-6 lg:px-8">
            <button onClick={() => setStep("form")} className="flex items-center gap-1.5 text-[12px] text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors mb-6">
              <ArrowLeft className="w-3.5 h-3.5" /> Back
            </button>

            {/* Order Summary */}
            <div className="card-elevated p-5 mb-5">
              <h3 className="font-sans text-[14px] font-semibold text-[var(--text-primary)] mb-3 flex items-center gap-2">
                <FileText className="w-4 h-4 text-[var(--accent)]" /> Order Summary
              </h3>
              <div className="space-y-2 text-[13px]">
                <div className="flex justify-between"><span className="text-[var(--text-muted)]">Name</span><span className="text-[var(--text-primary)] font-medium">{form.name}</span></div>
                <div className="flex justify-between"><span className="text-[var(--text-muted)]">Service</span><span className="text-[var(--text-primary)] text-right max-w-[200px]">{form.service}</span></div>
                <div className="pt-2 border-t border-[var(--border-subtle)] flex justify-between items-center">
                  <span className="text-[var(--text-muted)]">Amount</span>
                  <span className="text-[var(--accent)] font-semibold text-[18px]">Rs. {parseFloat(form.amount || "0").toLocaleString("en-IN")}/-</span>
                </div>
              </div>
            </div>

            {/* UPI QR Code */}
            <div className="card-elevated p-6 text-center mb-5">
              <div className="flex items-center justify-center gap-2 mb-1">
                <QrCode className="w-4 h-4 text-[var(--accent)]" />
                <h3 className="font-sans text-[15px] font-semibold text-[var(--text-primary)]">Scan to Pay</h3>
              </div>
              <p className="text-[11px] text-[var(--text-muted)] mb-4">Open PhonePe, GPay, or Paytm and scan</p>

              <div className="w-56 h-56 mx-auto rounded-xl overflow-hidden border-2 border-[var(--border-medium)] mb-4">
                <img src="/images/upi-qr-code.jpg" alt="UPI QR Code" className="w-full h-full object-cover" />
              </div>

              <p className="text-[10px] text-[var(--text-muted)] mb-4">ABHISHEK RANA | PhonePe Accepted</p>

              {/* UPI ID */}
              <div className="bg-[var(--bg-secondary)] rounded-lg p-3 flex items-center justify-between">
                <div className="text-left">
                  <p className="text-[10px] text-[var(--text-muted)]">UPI ID</p>
                  <p className="text-[14px] font-mono font-semibold text-[var(--text-primary)]">Mejustrana@ybl</p>
                </div>
                <button onClick={copyUpiId}
                  className="flex items-center gap-1 px-3 py-1.5 rounded-md bg-[var(--accent)] text-white text-[11px] font-medium hover:opacity-90 transition-opacity">
                  {copied ? <><CheckCircle2 className="w-3 h-3" />Copied</> : <><Copy className="w-3 h-3" />Copy</>}
                </button>
              </div>
            </div>

            {/* Transaction ID Input */}
            <div className="card-elevated p-5 mb-5">
              <h3 className="font-sans text-[14px] font-semibold text-[var(--text-primary)] mb-3 flex items-center gap-2">
                <Hash className="w-4 h-4 text-[var(--accent)]" /> Confirm Payment
              </h3>
              <p className="text-[12px] text-[var(--text-muted)] mb-3">After completing the UPI payment, enter your Transaction ID below:</p>
              <input
                name="transactionId"
                value={form.transactionId}
                onChange={handleChange}
                className="w-full px-3.5 py-2.5 rounded-lg border border-[var(--border-medium)] bg-[var(--bg-card)] text-[var(--text-primary)] text-[14px] font-mono placeholder:text-[var(--text-muted)] focus:outline-none focus:border-[var(--accent)] transition-colors mb-3"
                placeholder="e.g. T250509123456789"
              />
              <button
                onClick={handlePaymentDone}
                disabled={!form.transactionId.trim()}
                className="w-full pill-btn pill-btn-primary justify-center disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <CheckCircle2 className="w-4 h-4" /> I Have Paid - Generate Receipt
              </button>
            </div>
          </div>
        )}

        {/* === STEP 3: CONFIRMING === */}
        {step === "confirm" && (
          <div className="max-w-md mx-auto px-6 lg:px-8 text-center py-20">
            <div className="w-16 h-16 mx-auto rounded-full bg-green-50 flex items-center justify-center mb-4 animate-pulse">
              <CheckCircle2 className="w-8 h-8 text-green-600" />
            </div>
            <h2 className="text-[var(--text-primary)] mb-2">Verifying Payment...</h2>
            <p className="text-[var(--text-secondary)] text-[14px]">Generating your receipt</p>
          </div>
        )}

        {/* === STEP 4: RECEIPT === */}
        {step === "receipt" && (
          <div className="max-w-2xl mx-auto px-6 lg:px-8">
            <div ref={receiptRef} className="card-elevated overflow-hidden">
              {/* Receipt Header */}
              <div className="bg-[#051747] px-6 py-6 text-white">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-[#051747] font-bold text-[16px]">A</div>
                    <div>
                      <h3 className="font-semibold text-[16px]">ACADEMICHELP</h3>
                      <p className="text-[10px] text-white/60">Research Consultancy Services</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] bg-white/10 px-2 py-1 rounded">RECEIPT</span>
                    <p className="text-[10px] text-white/60 mt-1">{receiptNo}</p>
                  </div>
                </div>
              </div>

              {/* Receipt Body */}
              <div className="p-6">
                <div className="flex items-center justify-between mb-6 pb-4 border-b border-[var(--border-subtle)]">
                  <div>
                    <p className="text-[10px] text-[var(--text-muted)]">Receipt Date</p>
                    <p className="text-[13px] font-medium text-[var(--text-primary)] flex items-center gap-1">
                      <CalendarDays className="w-3.5 h-3.5" />{new Date().toLocaleDateString("en-IN")}
                    </p>
                  </div>
                  <div className="text-right">
                    <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-green-50 text-green-700 text-[11px] font-semibold border border-green-200">
                      <CheckCircle2 className="w-3 h-3" /> PAID
                    </span>
                  </div>
                </div>

                <div className="space-y-3 mb-6">
                  <div className="flex justify-between text-[13px]">
                    <span className="text-[var(--text-muted)]">Customer</span>
                    <span className="font-medium text-[var(--text-primary)]">{form.name}</span>
                  </div>
                  {form.email && (
                    <div className="flex justify-between text-[13px]">
                      <span className="text-[var(--text-muted)]">Email</span>
                      <span className="text-[var(--text-primary)]">{form.email}</span>
                    </div>
                  )}
                  {form.phone && (
                    <div className="flex justify-between text-[13px]">
                      <span className="text-[var(--text-muted)]">Phone</span>
                      <span className="text-[var(--text-primary)]">{form.phone}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-[13px]">
                    <span className="text-[var(--text-muted)]">Service</span>
                    <span className="text-[var(--text-primary)] text-right max-w-[250px]">{form.service}</span>
                  </div>
                  <div className="flex justify-between text-[13px]">
                    <span className="text-[var(--text-muted)]">Transaction ID</span>
                    <span className="font-mono text-[var(--text-primary)]">{form.transactionId.toUpperCase()}</span>
                  </div>
                  <div className="flex justify-between text-[13px]">
                    <span className="text-[var(--text-muted)]">Payment Mode</span>
                    <span className="text-[var(--text-primary)]">UPI (PhonePe / GPay / Paytm)</span>
                  </div>
                  <div className="flex justify-between text-[13px]">
                    <span className="text-[var(--text-muted)]">UPI ID</span>
                    <span className="font-mono text-[var(--accent)]">Mejustrana@ybl</span>
                  </div>
                </div>

                {/* Amount Box */}
                <div className="bg-[var(--bg-secondary)] rounded-xl p-4 mb-6">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-[13px] text-[var(--text-muted)]">Service Charges</span>
                    <span className="text-[13px] font-medium text-[var(--text-primary)]">Rs. {parseFloat(form.amount).toLocaleString("en-IN")}/-</span>
                  </div>
                  <div className="pt-3 border-t border-[var(--border-medium)] flex justify-between items-center">
                    <span className="text-[14px] font-semibold text-[var(--text-primary)]">Total Amount</span>
                    <div className="text-right">
                      <span className="text-[20px] font-bold text-[var(--accent)]">Rs. {parseFloat(form.amount).toLocaleString("en-IN")}/-</span>
                      <p className="text-[10px] text-[var(--text-muted)] italic">({numberToWords(parseFloat(form.amount))})</p>
                    </div>
                  </div>
                </div>

                {/* Footer */}
                <div className="text-center pt-4 border-t border-[var(--border-subtle)]">
                  <p className="text-[11px] text-[var(--text-muted)] mb-1">Thank you for choosing AcademicHelp!</p>
                  <p className="text-[10px] text-[var(--text-muted)]">This is a computer-generated receipt.</p>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 mt-6">
              <button onClick={generatePDF} className="flex-1 pill-btn pill-btn-primary justify-center">
                <Download className="w-4 h-4" /> Download Receipt (PDF)
              </button>
              <button onClick={shareOnWhatsApp} className="flex-1 pill-btn pill-btn-outline justify-center">
                Share on WhatsApp
              </button>
            </div>

            <button onClick={() => setStep("form")} className="w-full mt-4 text-[12px] text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors">
              Make Another Payment
            </button>
          </div>
        )}
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
}
