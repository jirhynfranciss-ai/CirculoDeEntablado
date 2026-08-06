import { useState, type FormEvent } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { isSupabaseConfigured } from "../lib/supabase";
import { Drama, Lock, Mail, Loader2, ShieldAlert } from "lucide-react";

export default function AdminLogin() {
  const { signIn, user, loading } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  if (!loading && user) return <Navigate to="/admin/dashboard" replace />;

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    const { error: signInError } = await signIn(email, password);
    setSubmitting(false);
    if (signInError) setError(signInError);
    else navigate("/admin/dashboard");
  };

  return (
    <div className="min-h-screen bg-black velvet-bg flex items-center justify-center px-4 relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 h-[50vh] w-[60vw] bg-[radial-gradient(ellipse_at_top,rgba(219,0,0,0.2),transparent_65%)]" />

      <div className="relative w-full max-w-md">
        <div className="text-center mb-8">
          <span className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full border-2 border-[#db0000] text-[#db0000] spotlight-glow">
            <Drama size={30} />
          </span>
          <h1 className="font-display font-bold text-2xl text-white">
            Círculo de Entablado
          </h1>
          <p className="text-xs uppercase tracking-[0.3em] text-[#db0000] mt-1">
            Administrator Access
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="border border-[#970000]/40 bg-white/[0.03] rounded-sm p-8 space-y-5"
        >
          {!isSupabaseConfigured && (
            <div className="flex items-start gap-2 rounded-sm border border-[#d4af37]/40 bg-[#d4af37]/10 px-4 py-3 text-xs text-[#d4af37]">
              <ShieldAlert size={16} className="mt-0.5 shrink-0" />
              Supabase isn't connected yet. Add VITE_SUPABASE_URL and
              VITE_SUPABASE_ANON_KEY to enable live authentication.
            </div>
          )}

          <div>
            <label className="block text-xs uppercase tracking-widest text-white/60 mb-2">
              Email
            </label>
            <div className="relative">
              <Mail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/40" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-black/40 border border-white/15 focus:border-[#db0000] outline-none rounded-sm pl-10 pr-4 py-3 text-sm text-white transition-colors"
                placeholder="admin@cde.ustp.edu.ph"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs uppercase tracking-widest text-white/60 mb-2">
              Password
            </label>
            <div className="relative">
              <Lock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/40" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-black/40 border border-white/15 focus:border-[#db0000] outline-none rounded-sm pl-10 pr-4 py-3 text-sm text-white transition-colors"
                placeholder="••••••••"
              />
            </div>
          </div>

          {error && (
            <p className="text-sm text-red-400 bg-red-500/10 border border-red-500/30 rounded-sm px-3 py-2">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={submitting}
            className="w-full inline-flex items-center justify-center gap-2 rounded-sm bg-[#db0000] hover:bg-[#970000] transition-colors py-3 text-sm font-bold uppercase tracking-widest text-white disabled:opacity-60"
          >
            {submitting && <Loader2 size={16} className="animate-spin" />}
            {submitting ? "Signing in..." : "Sign In"}
          </button>

          <button
            type="button"
            onClick={() => navigate("/")}
            className="w-full text-center text-xs text-white/40 hover:text-white/70 transition-colors pt-1"
          >
            ← Back to public site
          </button>
        </form>
      </div>
    </div>
  );
}
