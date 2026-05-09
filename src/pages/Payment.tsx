import { useState, useRef, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import SEO from "@/components/SEO";
import { jsPDF } from "jspdf";
import {
  QrCode, Copy, CheckCircle2, Download, ArrowLeft,
  CreditCard, User, Mail, FileText, IndianRupee,
  CalendarDays, Hash, Phone, ShieldCheck, Clock,
  MessageCircle, AlertCircle, Check, Printer, Send,
  ChevronRight, Banknote, Smartphone, ExternalLink
} from "lucide-react";

interface PaymentForm {
  name: string;
  email: string;
  phone: string;
  service: string;
  amount: string;
  transactionId: string;
}

type Step = "form" | "pay" | "pending" | "receipt";

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

const UPI_ID = "Mejustrana@ybl";
const WHATSAPP_NUMBER = "919310604015";

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
  const [step, setStep] = useState<Step>("form");
  const [form, setForm] = useState<PaymentForm>({
    name: "", email: "", phone: "", service: "", amount: "", transactionId: "",
  });
  const [copied, setCopied] = useState(false);
  const [receiptNo] = useState(() => `AH-${Date.now().toString(36).toUpperCase()}`);
  const [submitTime, setSubmitTime] = useState<string>("");
  const receiptRef = useRef<HTMLDivElement>(null);

  // Load pending payment from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem("academichelp_pending_payment");
    if (saved) {
      const parsed = JSON.parse(saved);
      setForm(parsed.form);
      setSubmitTime(parsed.submitTime);
      if (parsed.status === "pending") {
        setStep("pending");
      }
    }
  }, []);

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
    navigator.clipboard.writeText(UPI_ID);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const openUpiApp = () => {
    // Try to open a UPI app with pay intent
    const upiUrl = `upi://pay?pa=${UPI_ID}&pn=AcademicHelp&am=${form.amount}&cu=INR&tn=${encodeURIComponent(form.service)}`;
    window.location.href = upiUrl;
  };

  const handlePaymentDone = () => {
    if (!form.transactionId.trim()) return;
    const now = new Date().toLocaleString("en-IN");
    setSubmitTime(now);

    // Save to localStorage
    localStorage.setItem("academichelp_pending_payment", JSON.stringify({
      form,
      submitTime: now,
      status: "pending",
      receiptNo,
    }));

    // Send WhatsApp to admin
    const adminMessage = `*New Payment Submission - AcademicHelp*

*Customer Details:*
Name: ${form.name}
Email: ${form.email || "N/A"}
Phone: ${form.phone || "N/A"}

*Service:* ${form.service}
*Amount:* Rs. ${parseFloat(form.amount).toLocaleString("en-IN")}/-
*Transaction ID:* ${form.transactionId.toUpperCase()}
*Receipt No:* ${receiptNo}
*Submitted:* ${now}

Please verify and confirm payment received.`;

    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(adminMessage)}`, "_blank");
    setStep("pending");
    window.scrollTo(0, 0);
  };

  const handleAdminApproved = () => {
    // Update localStorage
    localStorage.setItem("academichelp_pending_payment", JSON.stringify({
      form,
      submitTime,
      status: "approved",
      receiptNo,
    }));
    setStep("receipt");
    window.scrollTo(0, 0);
  };

  const generatePDF = () => {
    const doc = new jsPDF("p", "mm", "a4");
    const pageW = 210;
    let y = 0;

    // === HEADER BAND ===
    doc.setFillColor(5, 23, 71);
    doc.rect(0, 0, pageW, 52, "F");

    // Subtle accent line
    doc.setFillColor(8, 31, 98);
    doc.rect(0, 52, pageW, 3, "F");

    // Logo
    doc.setFillColor(255, 255, 255);
    doc.circle(28, 24, 13, "F");
    doc.setTextColor(5, 23, 71);
    doc.setFontSize(16);
    doc.setFont("helvetica", "bold");
    doc.text("A", 25.5, 28.5);

    // Brand name
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(24);
    doc.setFont("helvetica", "bold");
    doc.text("ACADEMICHELP", 46, 22);

    doc.setFontSize(9);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(180, 195, 220);
    doc.text("Advanced Research & Publication Support", 46, 30);
    doc.text("academichelp80@gmail.com  |  +91 93106 04015", 46, 36);

    // Receipt label
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(11);
    doc.setFont("helvetica", "bold");
    doc.text("PAYMENT RECEIPT", pageW - 20, 18, { align: "right" });
    doc.setFontSize(9);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(180, 195, 220);
    doc.text(`Receipt No: ${receiptNo}`, pageW - 20, 26, { align: "right" });
    doc.text(`Date: ${new Date().toLocaleDateString("en-IN")}`, pageW - 20, 32, { align: "right" });
    doc.text(`Time: ${new Date().toLocaleTimeString("en-IN")}`, pageW - 20, 38, { align: "right" });

    // === CUSTOMER DETAILS ===
    y = 68;
    doc.setTextColor(5, 23, 71);
    doc.setFontSize(13);
    doc.setFont("helvetica", "bold");
    doc.text("Customer Details", 20, y);
    doc.setDrawColor(5, 23, 71);
    doc.setLineWidth(0.5);
    doc.line(20, y + 3, pageW - 20, y + 3);

    y += 12;
    doc.setFontSize(10);
    const details: [string, string][] = [
      ["Name:", form.name],
      ["Email:", form.email || "N/A"],
      ["Phone:", form.phone || "N/A"],
      ["Service:", form.service],
      ["Transaction ID:", form.transactionId.toUpperCase()],
      ["Payment Date:", submitTime || new Date().toLocaleDateString("en-IN")],
    ];
    details.forEach(([label, value]) => {
      doc.setFont("helvetica", "bold");
      doc.setTextColor(83, 95, 128);
      doc.text(label, 20, y);
      doc.setFont("helvetica", "normal");
      doc.setTextColor(5, 23, 71);
      doc.text(String(value), 65, y);
      y += 7;
    });

    // === AMOUNT BOX ===
    y += 6;
    doc.setFillColor(248, 249, 252);
    doc.roundedRect(15, y - 5, pageW - 30, 46, 3, 3, "F");
    doc.setDrawColor(5, 23, 71);
    doc.setLineWidth(0.3);
    doc.line(20, y + 3, pageW - 20, y + 3);

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

    y += 10;
    doc.setFontSize(15);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(5, 23, 71);
    doc.text("Total Amount:", 20, y);
    doc.text(`Rs. ${parseFloat(form.amount).toLocaleString("en-IN")}/-`, pageW - 20, y, { align: "right" });

    y += 6;
    doc.setFontSize(8);
    doc.setFont("helvetica", "italic");
    doc.setTextColor(83, 95, 128);
    doc.text(`(${numberToWords(parseFloat(form.amount))})`, pageW - 20, y, { align: "right" });

    // === PAID STAMP ===
    y += 22;
    doc.setDrawColor(34, 139, 34);
    doc.setLineWidth(2);
    doc.ellipse(pageW / 2, y, 24, 11, "S");
    doc.setTextColor(34, 139, 34);
    doc.setFontSize(16);
    doc.setFont("helvetica", "bold");
    doc.text("PAID", pageW / 2, y + 1.5, { align: "center" });

    // === PAYMENT METHOD ===
    y += 22;
    doc.setFontSize(12);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(5, 23, 71);
    doc.text("Payment Method", 20, y);
    doc.setDrawColor(5, 23, 71);
    doc.setLineWidth(0.3);
    doc.line(20, y + 3, pageW - 20, y + 3);

    y += 12;
    doc.setFontSize(10);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(83, 95, 128);
    doc.text("UPI ID:", 20, y);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(5, 23, 71);
    doc.text(UPI_ID, 50, y);

    y += 7;
    doc.setFont("helvetica", "bold");
    doc.setTextColor(83, 95, 128);
    doc.text("Mode:", 20, y);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(5, 23, 71);
    doc.text("UPI (PhonePe / GPay / Paytm)", 50, y);

    y += 7;
    doc.setFont("helvetica", "bold");
    doc.setTextColor(83, 95, 128);
    doc.text("Verified By:", 20, y);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(5, 23, 71);
    doc.text("AcademicHelp Admin via WhatsApp", 50, y);

    // === FOOTER ===
    y = 268;
    doc.setDrawColor(200, 205, 215);
    doc.setLineWidth(0.2);
    doc.line(20, y, pageW - 20, y);

    y += 7;
    doc.setFontSize(8);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(120, 130, 150);
    doc.text("Thank you for choosing AcademicHelp for your research journey!", pageW / 2, y, { align: "center" });
    y += 5;
    doc.text("This is a computer-generated receipt. No physical signature required.", pageW / 2, y, { align: "center" });
    y += 5;
    doc.setFont("helvetica", "italic");
    doc.text("For queries: academichelp80@gmail.com | WhatsApp: +91 93106 04015", pageW / 2, y, { align: "center" });

    doc.save(`AcademicHelp-Receipt-${receiptNo}.pdf`);
  };

  const shareReceiptOnWhatsApp = () => {
    const text = `*Payment Receipt - AcademicHelp*

Receipt No: ${receiptNo}
Name: ${form.name}
Service: ${form.service}
Amount: Rs. ${parseFloat(form.amount).toLocaleString("en-IN")}/-
Transaction ID: ${form.transactionId.toUpperCase()}
Status: PAID

Thank you for your business!`;
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`, "_blank");
  };

  const startNewPayment = () => {
    localStorage.removeItem("academichelp_pending_payment");
    setForm({ name: "", email: "", phone: "", service: "", amount: "", transactionId: "" });
    setStep("form");
  };

  return (
    <div className="min-h-screen bg-[var(--bg-primary)]">
      <SEO title="Payment — AcademicHelp" description="Secure UPI payment with instant receipt" />
      <Navbar />
      <main className="pt-24 pb-16">

        {/* ===================== STEP 1: PAYMENT FORM ===================== */}
        {step === "form" && (
          <div className="max-w-lg mx-auto px-6 lg:px-8">
            {/* Header */}
            <div className="text-center mb-8">
              <div className="w-14 h-14 mx-auto rounded-xl bg-[var(--accent-soft)] flex items-center justify-center text-[var(--accent)] mb-4">
                <CreditCard className="w-6 h-6" />
              </div>
              <h1 className="text-2xl font-bold text-[var(--text-primary)] mb-2">Payment</h1>
              <p className="text-[var(--text-secondary)] text-[14px]">Fill in your details to proceed with secure UPI payment</p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="card-elevated p-6 md:p-8 space-y-5">
              {/* Name */}
              <div>
                <label className="flex items-center gap-1.5 text-[12px] font-semibold text-[var(--text-primary)] mb-1.5">
                  <User className="w-3.5 h-3.5 text-[var(--text-muted)]" /> Full Name *
                </label>
                <input
                  name="name" value={form.name} onChange={handleChange} required
                  className="w-full px-3.5 py-2.5 rounded-lg border border-[var(--border-medium)] bg-[var(--bg-card)] text-[var(--text-primary)] text-[14px] placeholder:text-[var(--text-muted)] focus:outline-none focus:border-[var(--accent)] focus:ring-1 focus:ring-[var(--accent)]/20 transition-all"
                  placeholder="Enter your full name"
                />
              </div>

              {/* Email & Phone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="flex items-center gap-1.5 text-[12px] font-semibold text-[var(--text-primary)] mb-1.5">
                    <Mail className="w-3.5 h-3.5 text-[var(--text-muted)]" /> Email
                  </label>
                  <input
                    name="email" value={form.email} onChange={handleChange} type="email"
                    className="w-full px-3.5 py-2.5 rounded-lg border border-[var(--border-medium)] bg-[var(--bg-card)] text-[var(--text-primary)] text-[14px] placeholder:text-[var(--text-muted)] focus:outline-none focus:border-[var(--accent)] focus:ring-1 focus:ring-[var(--accent)]/20 transition-all"
                    placeholder="your@email.com"
                  />
                </div>
                <div>
                  <label className="flex items-center gap-1.5 text-[12px] font-semibold text-[var(--text-primary)] mb-1.5">
                    <Phone className="w-3.5 h-3.5 text-[var(--text-muted)]" /> Phone
                  </label>
                  <input
                    name="phone" value={form.phone} onChange={handleChange}
                    className="w-full px-3.5 py-2.5 rounded-lg border border-[var(--border-medium)] bg-[var(--bg-card)] text-[var(--text-primary)] text-[14px] placeholder:text-[var(--text-muted)] focus:outline-none focus:border-[var(--accent)] focus:ring-1 focus:ring-[var(--accent)]/20 transition-all"
                    placeholder="+91 98765 43210"
                  />
                </div>
              </div>

              {/* Service */}
              <div>
                <label className="flex items-center gap-1.5 text-[12px] font-semibold text-[var(--text-primary)] mb-1.5">
                  <FileText className="w-3.5 h-3.5 text-[var(--text-muted)]" /> Select Service *
                </label>
                <select
                  name="service" value={form.service} onChange={handleChange} required
                  className="w-full px-3.5 py-2.5 rounded-lg border border-[var(--border-medium)] bg-[var(--bg-card)] text-[var(--text-primary)] text-[14px] focus:outline-none focus:border-[var(--accent)] focus:ring-1 focus:ring-[var(--accent)]/20 transition-all"
                >
                  <option value="">-- Choose a service --</option>
                  {services.map((s) => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>

              {/* Amount */}
              <div>
                <label className="flex items-center gap-1.5 text-[12px] font-semibold text-[var(--text-primary)] mb-1.5">
                  <IndianRupee className="w-3.5 h-3.5 text-[var(--text-muted)]" /> Amount (Rs.) *
                </label>
                <input
                  name="amount" value={form.amount} onChange={handleChange} required type="number" min="1"
                  className="w-full px-3.5 py-2.5 rounded-lg border border-[var(--border-medium)] bg-[var(--bg-card)] text-[var(--text-primary)] text-[14px] placeholder:text-[var(--text-muted)] focus:outline-none focus:border-[var(--accent)] focus:ring-1 focus:ring-[var(--accent)]/20 transition-all"
                  placeholder="Enter amount in Rupees"
                />
              </div>

              {/* Submit */}
              <button type="submit" className="w-full pill-btn pill-btn-primary justify-center mt-2 gap-2">
                Proceed to Payment <ChevronRight className="w-4 h-4" />
              </button>

              {/* Security badge */}
              <div className="flex items-center justify-center gap-2 pt-2">
                <ShieldCheck className="w-3.5 h-3.5 text-green-600" />
                <span className="text-[11px] text-[var(--text-muted)]">Secure UPI Payment via PhonePe / GPay / Paytm</span>
              </div>
            </form>

            {/* Info cards */}
            <div className="grid grid-cols-3 gap-3 mt-6">
              <div className="card-elevated p-3 text-center">
                <Smartphone className="w-5 h-5 text-[var(--accent)] mx-auto mb-1.5" />
                <p className="text-[10px] font-medium text-[var(--text-primary)]">Scan QR</p>
                <p className="text-[9px] text-[var(--text-muted)]">Any UPI App</p>
              </div>
              <div className="card-elevated p-3 text-center">
                <MessageCircle className="w-5 h-5 text-[var(--accent)] mx-auto mb-1.5" />
                <p className="text-[10px] font-medium text-[var(--text-primary)]">WhatsApp</p>
                <p className="text-[9px] text-[var(--text-muted)]">Admin Verify</p>
              </div>
              <div className="card-elevated p-3 text-center">
                <CheckCircle2 className="w-5 h-5 text-[var(--accent)] mx-auto mb-1.5" />
                <p className="text-[10px] font-medium text-[var(--text-primary)]">Get Receipt</p>
                <p className="text-[9px] text-[var(--text-muted)]">PDF Download</p>
              </div>
            </div>
          </div>
        )}

        {/* ===================== STEP 2: UPI PAYMENT ===================== */}
        {step === "pay" && (
          <div className="max-w-md mx-auto px-6 lg:px-8">
            <button onClick={() => setStep("form")} className="flex items-center gap-1.5 text-[12px] text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors mb-6">
              <ArrowLeft className="w-3.5 h-3.5" /> Back to Form
            </button>

            {/* Order Summary */}
            <div className="card-elevated p-5 mb-5">
              <h3 className="font-sans text-[14px] font-semibold text-[var(--text-primary)] mb-3 flex items-center gap-2">
                <FileText className="w-4 h-4 text-[var(--accent)]" /> Order Summary
              </h3>
              <div className="space-y-2 text-[13px]">
                <div className="flex justify-between">
                  <span className="text-[var(--text-muted)]">Name</span>
                  <span className="text-[var(--text-primary)] font-medium">{form.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[var(--text-muted)]">Service</span>
                  <span className="text-[var(--text-primary)] text-right max-w-[200px]">{form.service}</span>
                </div>
                <div className="pt-2 border-t border-[var(--border-subtle)] flex justify-between items-center">
                  <span className="text-[var(--text-muted)]">Amount to Pay</span>
                  <span className="text-[var(--accent)] font-bold text-[20px]">Rs. {parseFloat(form.amount || "0").toLocaleString("en-IN")}/-</span>
                </div>
              </div>
            </div>

            {/* UPI QR Code */}
            <div className="card-elevated p-6 text-center mb-5">
              <div className="flex items-center justify-center gap-2 mb-1">
                <QrCode className="w-4 h-4 text-[var(--accent)]" />
                <h3 className="font-sans text-[15px] font-semibold text-[var(--text-primary)]">Scan to Pay</h3>
              </div>
              <p className="text-[11px] text-[var(--text-muted)] mb-4">Open PhonePe, GPay, Paytm or any UPI app</p>

              {/* QR Image */}
              <div className="w-56 h-56 mx-auto rounded-xl overflow-hidden border-2 border-[var(--border-medium)] mb-4 bg-white">
                <img src="/images/upi-qr-phonepe.png" alt="UPI QR Code - PhonePe" className="w-full h-full object-contain" />
              </div>

              <p className="text-[10px] text-[var(--text-muted)] mb-4">ABHISHEK RANA | PhonePe Merchant</p>

              {/* UPI ID Box */}
              <div className="bg-[var(--bg-secondary)] rounded-lg p-3 flex items-center justify-between">
                <div className="text-left">
                  <p className="text-[10px] text-[var(--text-muted)]">UPI ID</p>
                  <p className="text-[14px] font-mono font-bold text-[var(--text-primary)] tracking-wide">{UPI_ID}</p>
                </div>
                <button onClick={copyUpiId}
                  className="flex items-center gap-1 px-3 py-1.5 rounded-md bg-[var(--accent)] text-white text-[11px] font-medium hover:opacity-90 transition-opacity">
                  {copied ? <><Check className="w-3 h-3" /> Copied</> : <><Copy className="w-3 h-3" /> Copy</>}
                </button>
              </div>

              {/* Pay via App button */}
              <button onClick={openUpiApp}
                className="w-full mt-3 flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg border border-[var(--accent)] text-[var(--accent)] text-[12px] font-medium hover:bg-[var(--accent-soft)] transition-colors">
                <ExternalLink className="w-3.5 h-3.5" /> Pay Directly via UPI App
              </button>
            </div>

            {/* Transaction ID Input */}
            <div className="card-elevated p-5 mb-5">
              <h3 className="font-sans text-[14px] font-semibold text-[var(--text-primary)] mb-2 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-green-600" /> Confirm Your Payment
              </h3>
              <p className="text-[12px] text-[var(--text-muted)] mb-3">
                After completing the UPI payment, enter your 12-digit UPI Transaction ID / UTR Number below:
              </p>
              <input
                name="transactionId"
                value={form.transactionId}
                onChange={handleChange}
                className="w-full px-3.5 py-2.5 rounded-lg border border-[var(--border-medium)] bg-[var(--bg-card)] text-[var(--text-primary)] text-[14px] font-mono placeholder:text-[var(--text-muted)] focus:outline-none focus:border-[var(--accent)] focus:ring-1 focus:ring-[var(--accent)]/20 transition-all mb-3"
                placeholder="e.g. T250509123456789 or UTR Number"
              />
              <button
                onClick={handlePaymentDone}
                disabled={!form.transactionId.trim()}
                className="w-full pill-btn pill-btn-primary justify-center disabled:opacity-50 disabled:cursor-not-allowed gap-2"
              >
                <Send className="w-4 h-4" /> I Have Paid - Notify Admin via WhatsApp
              </button>
              <p className="text-[10px] text-[var(--text-muted)] text-center mt-2">
                This will open WhatsApp to notify our admin for verification.
              </p>
            </div>
          </div>
        )}

        {/* ===================== STEP 3: PENDING APPROVAL ===================== */}
        {step === "pending" && (
          <div className="max-w-lg mx-auto px-6 lg:px-8">
            {/* Back button */}
            <button onClick={() => setStep("pay")} className="flex items-center gap-1.5 text-[12px] text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors mb-6">
              <ArrowLeft className="w-3.5 h-3.5" /> Back
            </button>

            {/* Status Card */}
            <div className="card-elevated p-6 md:p-8 text-center mb-5">
              {/* Animated pending icon */}
              <div className="w-20 h-20 mx-auto rounded-full bg-amber-50 flex items-center justify-center mb-5 border-2 border-amber-200">
                <Clock className="w-9 h-9 text-amber-600 animate-pulse" />
              </div>

              <h2 className="text-xl font-bold text-[var(--text-primary)] mb-2">Payment Submitted</h2>
              <p className="text-[14px] text-[var(--text-secondary)] mb-4">
                Your payment is pending admin verification. We have notified the admin via WhatsApp.
              </p>

              {/* Status timeline */}
              <div className="flex items-center justify-center gap-1 mb-6">
                <span className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-green-50 text-green-700 text-[11px] font-semibold border border-green-200">
                  <Check className="w-3 h-3" /> Paid
                </span>
                <ChevronRight className="w-4 h-4 text-[var(--text-muted)]" />
                <span className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-amber-50 text-amber-700 text-[11px] font-semibold border border-amber-200 animate-pulse">
                  <Clock className="w-3 h-3" /> Verifying
                </span>
                <ChevronRight className="w-4 h-4 text-[var(--text-muted)]" />
                <span className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-gray-100 text-gray-500 text-[11px] font-medium border border-gray-200">
                  Receipt
                </span>
              </div>

              {/* Submission details */}
              <div className="bg-[var(--bg-secondary)] rounded-lg p-4 text-left mb-5">
                <h4 className="text-[12px] font-semibold text-[var(--text-primary)] mb-3 flex items-center gap-1.5">
                  <FileText className="w-3.5 h-3.5 text-[var(--accent)]" /> Submission Details
                </h4>
                <div className="space-y-2 text-[12px]">
                  <div className="flex justify-between">
                    <span className="text-[var(--text-muted)]">Receipt No</span>
                    <span className="font-mono text-[var(--text-primary)]">{receiptNo}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[var(--text-muted)]">Name</span>
                    <span className="text-[var(--text-primary)]">{form.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[var(--text-muted)]">Service</span>
                    <span className="text-[var(--text-primary)] text-right max-w-[200px]">{form.service}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[var(--text-muted)]">Amount</span>
                    <span className="font-semibold text-[var(--accent)]">Rs. {parseFloat(form.amount || "0").toLocaleString("en-IN")}/-</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[var(--text-muted)]">Transaction ID</span>
                    <span className="font-mono text-[var(--text-primary)]">{form.transactionId.toUpperCase()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[var(--text-muted)]">Submitted</span>
                    <span className="text-[var(--text-primary)]">{submitTime}</span>
                  </div>
                </div>
              </div>

              {/* What happens next */}
              <div className="text-left mb-5">
                <h4 className="text-[12px] font-semibold text-[var(--text-primary)] mb-2 flex items-center gap-1.5">
                  <AlertCircle className="w-3.5 h-3.5 text-[var(--accent)]" /> What happens next?
                </h4>
                <ol className="space-y-2 text-[12px] text-[var(--text-secondary)]">
                  <li className="flex items-start gap-2">
                    <span className="w-5 h-5 rounded-full bg-[var(--accent-soft)] text-[var(--accent)] flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">1</span>
                    Admin will verify your UPI payment
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-5 h-5 rounded-full bg-[var(--accent-soft)] text-[var(--accent)] flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">2</span>
                    You will receive a confirmation on WhatsApp
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-5 h-5 rounded-full bg-[var(--accent-soft)] text-[var(--accent)] flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">3</span>
                    Click "Generate Receipt" below to download your bill
                  </li>
                </ol>
              </div>

              {/* Divider */}
              <div className="border-t border-dashed border-[var(--border-medium)] my-5" />

              {/* Generate Receipt Button */}
              <button
                onClick={handleAdminApproved}
                className="w-full pill-btn pill-btn-primary justify-center gap-2 mb-3"
              >
                <CheckCircle2 className="w-4 h-4" /> Admin Confirmed - Generate Receipt
              </button>
              <p className="text-[10px] text-[var(--text-muted)]">
                Click this button once admin confirms your payment on WhatsApp
              </p>
            </div>

            {/* Need help */}
            <div className="card-elevated p-4 text-center">
              <p className="text-[12px] text-[var(--text-secondary)] mb-2">Need help with your payment?</p>
              <a
                href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(`Hi, I need help with my payment. Receipt No: ${receiptNo}`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-[12px] font-medium text-green-600 hover:text-green-700 transition-colors"
              >
                <MessageCircle className="w-3.5 h-3.5" /> Chat on WhatsApp
              </a>
            </div>
          </div>
        )}

        {/* ===================== STEP 4: RECEIPT ===================== */}
        {step === "receipt" && (
          <div className="max-w-2xl mx-auto px-6 lg:px-8">
            {/* Success Banner */}
            <div className="text-center mb-6">
              <div className="w-14 h-14 mx-auto rounded-full bg-green-50 flex items-center justify-center mb-3 border-2 border-green-200">
                <CheckCircle2 className="w-7 h-7 text-green-600" />
              </div>
              <h2 className="text-xl font-bold text-[var(--text-primary)] mb-1">Payment Verified!</h2>
              <p className="text-[13px] text-[var(--text-secondary)]">Your payment has been confirmed by the admin</p>
            </div>

            {/* Receipt Card */}
            <div ref={receiptRef} className="card-elevated overflow-hidden">
              {/* Receipt Header */}
              <div className="bg-[#051747] px-6 py-6 text-white">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 rounded-full bg-white flex items-center justify-center text-[#051747] font-bold text-[18px]">A</div>
                    <div>
                      <h3 className="font-bold text-[17px] tracking-wide">ACADEMICHELP</h3>
                      <p className="text-[10px] text-white/60">Advanced Research & Publication Support</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="inline-block text-[10px] bg-white/15 px-3 py-1 rounded font-semibold tracking-wider">RECEIPT</span>
                    <p className="text-[10px] text-white/50 mt-1.5 font-mono">{receiptNo}</p>
                  </div>
                </div>
              </div>

              {/* Receipt Body */}
              <div className="p-6">
                {/* Date & Status */}
                <div className="flex items-center justify-between mb-6 pb-4 border-b border-[var(--border-subtle)]">
                  <div>
                    <p className="text-[10px] text-[var(--text-muted)] uppercase tracking-wider">Receipt Date</p>
                    <p className="text-[13px] font-semibold text-[var(--text-primary)] flex items-center gap-1.5 mt-0.5">
                      <CalendarDays className="w-3.5 h-3.5 text-[var(--accent)]" />
                      {new Date().toLocaleDateString("en-IN")}
                    </p>
                  </div>
                  <div className="text-right">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-green-50 text-green-700 text-[11px] font-bold border border-green-200">
                      <Check className="w-3 h-3" /> PAID
                    </span>
                  </div>
                </div>

                {/* Customer Info */}
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between text-[13px]">
                    <span className="text-[var(--text-muted)]">Customer Name</span>
                    <span className="font-semibold text-[var(--text-primary)]">{form.name}</span>
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
                    <span className="text-[var(--text-primary)] text-right max-w-[250px] font-medium">{form.service}</span>
                  </div>
                  <div className="flex justify-between text-[13px]">
                    <span className="text-[var(--text-muted)]">Transaction ID</span>
                    <span className="font-mono text-[var(--text-primary)] bg-gray-100 px-2 py-0.5 rounded text-[12px]">{form.transactionId.toUpperCase()}</span>
                  </div>
                  <div className="flex justify-between text-[13px]">
                    <span className="text-[var(--text-muted)]">Payment Mode</span>
                    <span className="text-[var(--text-primary)]">UPI (PhonePe / GPay / Paytm)</span>
                  </div>
                  <div className="flex justify-between text-[13px]">
                    <span className="text-[var(--text-muted)]">UPI ID Paid To</span>
                    <span className="font-mono text-[var(--accent)] font-semibold">{UPI_ID}</span>
                  </div>
                  <div className="flex justify-between text-[13px]">
                    <span className="text-[var(--text-muted)]">Verified By</span>
                    <span className="text-green-700 font-medium">Admin via WhatsApp</span>
                  </div>
                </div>

                {/* Amount Box */}
                <div className="bg-[var(--bg-secondary)] rounded-xl p-5 mb-6">
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-[13px] text-[var(--text-muted)]">Service Charges</span>
                    <span className="text-[13px] font-medium text-[var(--text-primary)]">Rs. {parseFloat(form.amount).toLocaleString("en-IN")}/-</span>
                  </div>
                  <div className="pt-3 border-t-2 border-[var(--border-medium)] flex justify-between items-center">
                    <span className="text-[15px] font-bold text-[var(--text-primary)]">Total Amount Paid</span>
                    <div className="text-right">
                      <span className="text-[22px] font-bold text-[var(--accent)]">Rs. {parseFloat(form.amount).toLocaleString("en-IN")}/-</span>
                      <p className="text-[10px] text-[var(--text-muted)] italic mt-0.5">({numberToWords(parseFloat(form.amount))})</p>
                    </div>
                  </div>
                </div>

                {/* Authorized Stamp */}
                <div className="flex justify-center mb-5">
                  <div className="border-2 border-green-600 rounded-lg px-6 py-3 text-center">
                    <CheckCircle2 className="w-5 h-5 text-green-600 mx-auto mb-1" />
                    <p className="text-[11px] font-bold text-green-700">PAYMENT VERIFIED</p>
                    <p className="text-[9px] text-green-600">Admin Approved via WhatsApp</p>
                  </div>
                </div>

                {/* Footer */}
                <div className="text-center pt-4 border-t border-[var(--border-subtle)]">
                  <p className="text-[12px] text-[var(--text-primary)] font-medium mb-1">Thank you for choosing AcademicHelp!</p>
                  <p className="text-[10px] text-[var(--text-muted)]">This is a computer-generated receipt.</p>
                  <p className="text-[9px] text-[var(--text-muted)] mt-1">
                    For queries: academichelp80@gmail.com | WhatsApp: +91 93106 04015
                  </p>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 mt-6">
              <button onClick={generatePDF} className="flex-1 pill-btn pill-btn-primary justify-center gap-2">
                <Download className="w-4 h-4" /> Download Receipt (PDF)
              </button>
              <button onClick={shareReceiptOnWhatsApp} className="flex-1 pill-btn pill-btn-outline justify-center gap-2">
                <MessageCircle className="w-4 h-4" /> Share on WhatsApp
              </button>
            </div>

            <button onClick={startNewPayment} className="w-full mt-4 text-[12px] text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors flex items-center justify-center gap-1">
              <Banknote className="w-3.5 h-3.5" /> Make Another Payment
            </button>
          </div>
        )}
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
}
