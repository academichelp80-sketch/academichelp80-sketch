import { useState } from "react";
import { useNavigate, Link } from "react-router";
import { trpc } from "@/providers/trpc";
import { useAuth } from "@/hooks/useAuth";
import { LogIn, User, Lock, ArrowLeft } from "lucide-react";

export default function Login() {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const loginMutation = trpc.auth.login.useMutation({
    onSuccess: () => { window.location.href = "/"; },
    onError: (err) => { setError(err.message); },
  });

  if (isAuthenticated) { navigate("/"); return null; }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!username.trim() || !password.trim()) return;
    loginMutation.mutate({ username: username.trim(), password: password.trim() });
  };

  return (
    <div className="min-h-screen bg-[var(--bg-primary)] flex items-center justify-center px-6">
      <div className="w-full max-w-sm">
        <Link to="/" className="inline-flex items-center gap-1.5 text-[11px] font-mono tracking-wider uppercase text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors mb-8">
          <ArrowLeft className="w-3.5 h-3.5" />Back to Home
        </Link>

        <div className="card-elevated p-8">
          <div className="text-center mb-6">
            <div className="w-10 h-10 mx-auto flex items-center justify-center rounded-lg bg-[var(--accent-dim)] text-[var(--accent)] mb-3">
              <LogIn className="w-5 h-5" />
            </div>
            <h1 className="text-[var(--text-primary)] text-xl">Admin Login</h1>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <label className="flex items-center gap-1.5 text-[11px] font-mono tracking-wider uppercase text-[var(--text-muted)]">
                <User className="w-3 h-3" />Username
              </label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                autoComplete="username"
                className="w-full px-4 py-3 bg-[var(--bg-primary)] border border-[var(--border-subtle)] rounded-xl text-[13px] text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent)]/30 transition-colors"
                placeholder="admin"
              />
            </div>

            <div className="space-y-1.5">
              <label className="flex items-center gap-1.5 text-[11px] font-mono tracking-wider uppercase text-[var(--text-muted)]">
                <Lock className="w-3 h-3" />Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
                className="w-full px-4 py-3 bg-[var(--bg-primary)] border border-[var(--border-subtle)] rounded-xl text-[13px] text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent)]/30 transition-colors"
                placeholder="••••••"
              />
            </div>

            {error && <p className="text-[12px] text-red-400">{error}</p>}

            <button
              type="submit"
              disabled={loginMutation.isPending}
              className="w-full flex items-center justify-center gap-2 bg-[var(--accent)] text-[var(--bg-primary)] text-[12px] font-semibold tracking-wider uppercase px-6 py-3 rounded-full hover:brightness-110 transition-all disabled:opacity-50"
            >
              {loginMutation.isPending ? "Logging in..." : "Log In"}
            </button>
          </form>

          <p className="text-[11px] font-mono text-[var(--text-muted)] mt-5 text-center">
            Default: admin / 123456
          </p>
        </div>
      </div>
    </div>
  );
}
