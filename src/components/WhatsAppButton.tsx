import { useState } from "react";
import { MessageCircle, X } from "lucide-react";

const quickActions = [
  { label: "Research Paper", msg: "Hello!%20I%20need%20help%20with%20my%20research%20paper." },
  { label: "Thesis Help", msg: "Hello!%20I%20need%20help%20with%20my%20thesis." },
  { label: "General Query", msg: "Hello!%20I%20have%20a%20question." },
];

export default function WhatsAppButton() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-2">
      {isOpen && (
        <div className="flex flex-col gap-1.5 mb-1 animate-in slide-in-from-bottom-2">
          {quickActions.map((action) => (
            <a
              key={action.label}
              href={`https://wa.me/919310604015?text=${action.msg}`}
              target="_blank" rel="noopener noreferrer"
              className="px-4 py-2.5 bg-[var(--bg-elevated)] border border-[var(--border-subtle)] text-[var(--text-secondary)] rounded-xl text-[12px] font-medium hover:text-[var(--accent)] hover:border-[var(--accent)]/30 transition-all whitespace-nowrap shadow-lg"
            >
              {action.label}
            </a>
          ))}
        </div>
      )}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-center w-12 h-12 rounded-full bg-[#25D366] text-white shadow-lg hover:bg-[#1faa52] transition-all hover:scale-105"
        aria-label="WhatsApp"
      >
        {isOpen ? <X className="w-5 h-5" /> : <MessageCircle className="w-5 h-5" />}
      </button>
    </div>
  );
}
