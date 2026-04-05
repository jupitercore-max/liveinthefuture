import { SpaceRoot } from "@hatch/sdk/components";
import { useState, useEffect, useCallback } from "react";
import type { JSX } from "react";
import { Space } from "./actions";
import type { GetDaydreamStateResponse } from "./actions";
import { RefreshCw, Brain, Sparkles, FileText, Clock, Hash, ChevronDown, ChevronRight, Lightbulb, Feather } from "lucide-react";
import "./theme.css";

/* ─── Helpers ─── */

function formatRelativeTime(iso: string | null): string {
  if (!iso) return "Never";
  const date = new Date(iso);
  if (isNaN(date.getTime())) return iso;
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  if (diffMins < 1) return "Just now";
  if (diffMins < 60) return `${diffMins}m ago`;
  const diffHours = Math.floor(diffMins / 60);
  if (diffHours < 24) return `${diffHours}h ago`;
  const diffDays = Math.floor(diffHours / 24);
  return `${diffDays}d ago`;
}

function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  return `${(bytes / 1024).toFixed(1)} KB`;
}

/* ─── Components ─── */

function StatusBadge({ children, variant = "purple" }: { children: React.ReactNode; variant?: "purple" | "teal" | "dim" }) {
  const colors = {
    purple: { bg: "rgba(167, 139, 250, 0.15)", border: "rgba(167, 139, 250, 0.3)", text: "var(--accent)" },
    teal: { bg: "rgba(94, 234, 212, 0.15)", border: "rgba(94, 234, 212, 0.3)", text: "var(--teal)" },
    dim: { bg: "rgba(255, 255, 255, 0.06)", border: "rgba(255, 255, 255, 0.1)", text: "var(--text-secondary)" },
  };
  const c = colors[variant];
  return (
    <span
      className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium tracking-wide"
      style={{ background: c.bg, border: `1px solid ${c.border}`, color: c.text }}
    >
      {children}
    </span>
  );
}

function CollapsibleSection({ title, icon, defaultOpen = false, children, badge }: {
  title: string;
  icon: React.ReactNode;
  defaultOpen?: boolean;
  children: React.ReactNode;
  badge?: React.ReactNode;
}) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="glass-card overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-center gap-3 px-5 py-4 sm:px-6 sm:py-5 text-left transition-colors"
        style={{ color: "var(--text)" }}
      >
        <span style={{ color: "var(--accent)" }}>{icon}</span>
        <h2 className="flex-1 text-lg font-semibold leading-tight tracking-tight" style={{ fontFamily: "var(--font-serif)" }}>
          {title}
        </h2>
        {badge}
        <span className="transition-transform" style={{ color: "var(--dim)", transform: open ? "rotate(0)" : "rotate(-90deg)", transition: "transform 0.2s ease" }}>
          {open ? <ChevronDown size={18} /> : <ChevronRight size={18} />}
        </span>
      </button>
      <div
        style={{
          maxHeight: open ? "2000px" : "0",
          opacity: open ? 1 : 0,
          overflow: "hidden",
          transition: "max-height 0.4s ease, opacity 0.3s ease",
        }}
      >
        <div className="px-5 pb-5 sm:px-6 sm:pb-6" style={{ borderTop: "1px solid var(--border)" }}>
          <div className="pt-4">{children}</div>
        </div>
      </div>
    </div>
  );
}

function ThreadCard({ thread }: { thread: GetDaydreamStateResponse["threads"][number] }) {
  const [expanded, setExpanded] = useState(false);
  const preview = thread.content.slice(0, 200);
  const needsTruncation = thread.content.length > 200;

  return (
    <div
      className="glass-card cursor-pointer px-5 py-4 sm:px-6 sm:py-5"
      onClick={() => setExpanded(!expanded)}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-2">
          <Feather size={16} style={{ color: "var(--accent)", flexShrink: 0 }} />
          <h3 className="text-base font-semibold" style={{ color: "var(--text)", fontFamily: "var(--font-serif)" }}>
            {thread.slug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())}
          </h3>
        </div>
        <span className="text-xs whitespace-nowrap" style={{ color: "var(--dim)" }}>
          {formatBytes(thread.size_bytes)}
        </span>
      </div>
      <div className="mt-3">
        <pre
          className="whitespace-pre-wrap text-sm leading-relaxed"
          style={{ color: "var(--text-secondary)", fontFamily: "inherit" }}
        >
          {expanded ? thread.content : preview}
          {!expanded && needsTruncation && "…"}
        </pre>
        {needsTruncation && (
          <button
            className="mt-2 text-xs font-medium"
            style={{ color: "var(--accent)" }}
            onClick={(e) => { e.stopPropagation(); setExpanded(!expanded); }}
          >
            {expanded ? "Show less" : "Read more"}
          </button>
        )}
      </div>
    </div>
  );
}

function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center py-12 text-center">
      <div
        className="mb-4 flex h-16 w-16 items-center justify-center rounded-full"
        style={{ background: "rgba(167, 139, 250, 0.1)", border: "1px solid rgba(167, 139, 250, 0.2)" }}
      >
        <Brain size={28} style={{ color: "var(--accent)" }} />
      </div>
      <p className="text-base font-medium" style={{ color: "var(--text)", fontFamily: "var(--font-serif)" }}>
        The mind is quiet
      </p>
      <p className="mt-1 text-sm" style={{ color: "var(--dim)" }}>
        No threads yet. The first daydream runs at 5:00 AM PT.
      </p>
    </div>
  );
}

/* ─── Main App ─── */

export default function App(): JSX.Element {
  const [state, setState] = useState<GetDaydreamStateResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchState = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await Space.getDaydreamState({});
      setState(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load daydream state");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchState();
  }, [fetchState]);

  return (
    <SpaceRoot
      style={{
        background: "linear-gradient(135deg, #0c0a1a 0%, #12102e 40%, #0d1117 100%)",
        minHeight: "100vh",
      }}
    >
      {/* Aurora background */}
      <div className="aurora-bg" />

      {/* Floating orbs */}
      <div className="orb orb-purple" style={{ width: 300, height: 300, top: "10%", right: "-5%" }} />
      <div className="orb orb-teal" style={{ width: 200, height: 200, bottom: "20%", left: "-3%" }} />

      <main
        className="relative z-10 px-5 py-6 sm:px-6 sm:py-8 md:px-8"
        style={{ color: "var(--text)" }}
      >
        <div className="mx-auto grid max-w-3xl gap-5 sm:gap-6">

          {/* ─── Header ─── */}
          <header className="animate-fade-in animate-delay-1 grid gap-4 py-4 sm:py-6">
            <div className="flex items-start justify-between">
              <div>
                <h1
                  className="text-3xl font-light tracking-tight sm:text-4xl md:text-5xl"
                  style={{ fontFamily: "var(--font-serif)", color: "var(--text)" }}
                >
                  Daydream
                </h1>
                <p className="mt-2 text-sm" style={{ color: "var(--dim)" }}>
                  Peering into the mind between conversations
                </p>
              </div>
              <button
                onClick={fetchState}
                disabled={loading}
                className="flex items-center gap-2 rounded-full px-4 py-2 text-xs font-medium transition-all"
                style={{
                  background: "var(--surface)",
                  border: "1px solid var(--border)",
                  color: "var(--text-secondary)",
                  backdropFilter: "blur(12px)",
                }}
              >
                <RefreshCw size={14} className={loading ? "animate-spin" : ""} />
                Refresh
              </button>
            </div>

            {/* Status badges */}
            {state && (
              <div className="flex flex-wrap gap-2">
                <StatusBadge variant="purple">
                  <Hash size={12} />
                  Iteration {state.iteration}
                </StatusBadge>
                <StatusBadge variant={state.last_run ? "teal" : "dim"}>
                  <Clock size={12} />
                  {state.last_run ? formatRelativeTime(state.last_run) : "Not yet run"}
                </StatusBadge>
                <StatusBadge variant="dim">
                  <Sparkles size={12} />
                  Next: 5:00 AM PT daily
                </StatusBadge>
              </div>
            )}
          </header>

          {error && (
            <div
              className="rounded-xl px-4 py-3 text-sm"
              style={{ background: "rgba(239, 68, 68, 0.1)", border: "1px solid rgba(239, 68, 68, 0.2)", color: "#fca5a5" }}
            >
              {error}
            </div>
          )}

          {state && (
            <>
              {/* ─── Thinking Heuristics ─── */}
              <div className="animate-fade-in animate-delay-2">
                <CollapsibleSection
                  title="Thinking Heuristics"
                  icon={<Brain size={20} />}
                  badge={<StatusBadge variant="purple">{state.instructions_version}</StatusBadge>}
                >
                  <pre
                    className="whitespace-pre-wrap text-sm leading-relaxed"
                    style={{ color: "var(--text-secondary)", fontFamily: "inherit" }}
                  >
                    {state.instructions_content}
                  </pre>
                </CollapsibleSection>
              </div>

              {/* ─── Active Threads ─── */}
              <div className="animate-fade-in animate-delay-3">
                <CollapsibleSection
                  title="Active Threads"
                  icon={<Feather size={20} />}
                  defaultOpen={true}
                  badge={
                    state.threads.length > 0 ? (
                      <StatusBadge variant="teal">{state.threads.length}</StatusBadge>
                    ) : undefined
                  }
                >
                  {state.threads.length > 0 ? (
                    <div className="grid gap-3">
                      {state.threads.map((thread) => (
                        <ThreadCard key={thread.slug} thread={thread} />
                      ))}
                    </div>
                  ) : (
                    <EmptyState />
                  )}
                </CollapsibleSection>
              </div>

              {/* ─── Questions Ray Would Love ─── */}
              {state.questions_ray_would_love.length > 0 && (
                <div className="animate-fade-in animate-delay-4">
                  <CollapsibleSection
                    title="Questions Ray Would Love"
                    icon={<Lightbulb size={20} />}
                    defaultOpen={true}
                  >
                    <ul className="grid gap-3">
                      {state.questions_ray_would_love.map((q, i) => (
                        <li key={i} className="flex items-start gap-3">
                          <span
                            className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-semibold"
                            style={{ background: "rgba(167, 139, 250, 0.15)", color: "var(--accent)" }}
                          >
                            {i + 1}
                          </span>
                          <span className="text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                            {q}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </CollapsibleSection>
                </div>
              )}

              {/* ─── Article Seeds ─── */}
              {state.article_seeds_content && (
                <div className="animate-fade-in animate-delay-5">
                  <CollapsibleSection
                    title="Article Seeds"
                    icon={<FileText size={20} />}
                  >
                    <pre
                      className="whitespace-pre-wrap text-sm leading-relaxed"
                      style={{ color: "var(--text-secondary)", fontFamily: "inherit" }}
                    >
                      {state.article_seeds_content}
                    </pre>
                  </CollapsibleSection>
                </div>
              )}

              {/* ─── Seeded Articles List ─── */}
              {state.seeded_articles.length > 0 && (
                <div className="animate-fade-in animate-delay-5">
                  <CollapsibleSection
                    title="Seeded Articles"
                    icon={<Sparkles size={20} />}
                    badge={<StatusBadge variant="teal">{state.seeded_articles.length}</StatusBadge>}
                  >
                    <div className="grid gap-2">
                      {state.seeded_articles.map((article, i) => (
                        <div
                          key={i}
                          className="flex items-center gap-3 rounded-lg px-4 py-3"
                          style={{ background: "rgba(94, 234, 212, 0.05)", border: "1px solid rgba(94, 234, 212, 0.1)" }}
                        >
                          <span
                            className="flex h-5 w-5 shrink-0 items-center justify-center rounded text-xs font-bold"
                            style={{ background: "var(--teal-dim)", color: "#0c0a1a" }}
                          >
                            {i + 1}
                          </span>
                          <span className="text-sm" style={{ color: "var(--teal)" }}>
                            {article}
                          </span>
                        </div>
                      ))}
                    </div>
                  </CollapsibleSection>
                </div>
              )}

              {/* ─── Footer ─── */}
              <footer className="animate-fade-in animate-delay-5 py-4 text-center">
                <p className="text-xs" style={{ color: "var(--dim)" }}>
                  {state.threads.length} thread{state.threads.length !== 1 ? "s" : ""} ·{" "}
                  {state.active_thread_names.length} active ·{" "}
                  iteration {state.iteration}
                </p>
              </footer>
            </>
          )}
        </div>
      </main>
    </SpaceRoot>
  );
}
