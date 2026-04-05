import "./theme.css";
import { useEffect, useMemo, useState, useCallback } from "react";
import { SpaceRoot } from "@hatch/sdk/components";
import {
  Clock,
  Zap,
  Timer,
  CalendarDays,
  CalendarClock,
  Activity,
  CheckCircle2,
  XCircle,
  RefreshCw,
} from "lucide-react";
import { Space } from "./actions";
import type { GetCronJobsResponse } from "./actions";

type CronJob = GetCronJobsResponse["jobs"][number];

/* ─── Cadence Config ─── */
const CADENCE_META: Record<
  string,
  { label: string; icon: typeof Clock; color: string }
> = {
  minutely: { label: "Minutely", icon: Zap, color: "var(--warning)" },
  hourly: { label: "Hourly", icon: Timer, color: "var(--accent)" },
  daily: { label: "Daily", icon: CalendarDays, color: "#6366f1" },
  weekly: { label: "Weekly", icon: CalendarClock, color: "#8b5cf6" },
};

const CADENCE_ORDER = ["minutely", "hourly", "daily", "weekly"];

/* ─── Timeline helpers ─── */
function getTimelineHour(job: CronJob): number | null {
  if (job.schedule_time) {
    const raw = job.schedule_time;
    if (typeof raw === "string" && raw.includes(":")) {
      return parseInt(raw.split(":")[0], 10);
    }
    const num = Number(raw);
    if (!isNaN(num)) return Math.floor(num / 3600);
  }
  if (job.schedule_every) {
    const m = job.schedule_every.match(/(\d+)([smhd])/);
    if (m) {
      const unit = m[2];
      if (unit === "h" || unit === "d") return null; // spans multiple hours
      return null;
    }
  }
  return null;
}

/* ─── Components ─── */

function StatCard({
  label,
  value,
  color,
  icon: Icon,
}: {
  label: string;
  value: number;
  color: string;
  icon: typeof Activity;
}) {
  return (
    <div
      style={{
        background: "var(--surface)",
        border: "1px solid var(--border)",
        borderRadius: "var(--radius)",
        padding: "16px 20px",
        display: "flex",
        alignItems: "center",
        gap: 14,
      }}
    >
      <div
        style={{
          width: 40,
          height: 40,
          borderRadius: 10,
          background: `color-mix(in srgb, ${color} 15%, transparent)`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
        }}
      >
        <Icon size={20} style={{ color }} />
      </div>
      <div>
        <div
          style={{
            fontSize: 24,
            fontWeight: 700,
            fontFamily: "var(--font-display)",
            lineHeight: 1.1,
            color,
          }}
        >
          {value}
        </div>
        <div
          style={{
            fontSize: 13,
            color: "var(--dim)",
            marginTop: 2,
          }}
        >
          {label}
        </div>
      </div>
    </div>
  );
}

function TimelineStrip({ jobs }: { jobs: CronJob[] }) {
  const hourBuckets = useMemo(() => {
    const buckets: Map<number, CronJob[]> = new Map();
    for (const job of jobs) {
      if (!job.enabled) continue;
      const h = getTimelineHour(job);
      if (h !== null) {
        const existing = buckets.get(h) || [];
        existing.push(job);
        buckets.set(h, existing);
      }
    }
    return buckets;
  }, [jobs]);

  const maxCount = Math.max(1, ...Array.from(hourBuckets.values()).map((b) => b.length));

  return (
    <div
      style={{
        background: "var(--surface)",
        border: "1px solid var(--border)",
        borderRadius: "var(--radius)",
        padding: "16px 20px",
        marginBottom: 0,
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 8,
          marginBottom: 12,
        }}
      >
        <Clock size={14} style={{ color: "var(--dim)" }} />
        <span
          style={{
            fontSize: 13,
            fontWeight: 600,
            color: "var(--dim)",
            textTransform: "uppercase",
            letterSpacing: "0.05em",
            fontFamily: "var(--font-display)",
          }}
        >
          24h Fire Timeline (UTC)
        </span>
      </div>
      <div
        style={{
          display: "flex",
          gap: 2,
          alignItems: "flex-end",
          height: 56,
        }}
      >
        {Array.from({ length: 24 }, (_, h) => {
          const count = hourBuckets.get(h)?.length || 0;
          const height = count > 0 ? 12 + (count / maxCount) * 40 : 4;
          const names = hourBuckets.get(h)?.map((j) => j.id).join(", ") || "";
          return (
            <div
              key={h}
              title={count > 0 ? `${h}:00 UTC — ${count} job${count > 1 ? "s" : ""}: ${names}` : `${h}:00 UTC`}
              style={{
                flex: 1,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 3,
              }}
            >
              <div
                style={{
                  width: "100%",
                  maxWidth: 24,
                  height,
                  borderRadius: 3,
                  background:
                    count > 0
                      ? `color-mix(in srgb, var(--accent) ${40 + (count / maxCount) * 60}%, transparent)`
                      : "var(--border)",
                  transition: "height 0.3s ease",
                }}
              />
              {h % 6 === 0 && (
                <span
                  style={{
                    fontSize: 9,
                    color: "var(--dim)",
                    fontFamily: "var(--font-mono)",
                    fontWeight: 500,
                  }}
                >
                  {h.toString().padStart(2, "0")}
                </span>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

function ModeBadge({ mode }: { mode: string }) {
  const isHeartbeat = mode === "heartbeat";
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 4,
        fontSize: 11,
        fontWeight: 600,
        fontFamily: "var(--font-mono)",
        padding: "3px 8px",
        borderRadius: 6,
        background: isHeartbeat ? "var(--accent-dim)" : "var(--warning-dim)",
        color: isHeartbeat ? "var(--accent)" : "var(--warning)",
        textTransform: "uppercase",
        letterSpacing: "0.04em",
      }}
    >
      {isHeartbeat ? <Activity size={10} /> : <Zap size={10} />}
      {mode}
    </span>
  );
}

function StatusDot({ enabled }: { enabled: boolean }) {
  return (
    <span
      className={enabled ? "pulse-dot" : ""}
      style={{
        display: "inline-block",
        width: 8,
        height: 8,
        borderRadius: "50%",
        background: enabled ? "var(--accent)" : "var(--disabled)",
        boxShadow: enabled ? "0 0 8px var(--accent)" : "none",
        flexShrink: 0,
      }}
    />
  );
}

function JobCard({ job, index }: { job: CronJob; index: number }) {
  return (
    <div
      className="animate-card"
      style={{
        background: "var(--surface)",
        border: `1px solid ${job.enabled ? "var(--border)" : "var(--border)"}`,
        borderLeft: `3px solid ${job.enabled ? "var(--accent)" : "var(--disabled)"}`,
        borderRadius: "var(--radius)",
        padding: "14px 18px",
        animationDelay: `${index * 30}ms`,
        transition: "background 0.15s ease",
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLElement).style.background = "var(--surface-hover)";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.background = "var(--surface)";
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 10,
          marginBottom: 8,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 10, minWidth: 0 }}>
          <StatusDot enabled={job.enabled} />
          <span
            style={{
              fontFamily: "var(--font-mono)",
              fontWeight: 600,
              fontSize: 14,
              color: job.enabled ? "var(--text)" : "var(--dim)",
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {job.id}
          </span>
        </div>
        <ModeBadge mode={job.mode} />
      </div>
      <div
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: 12,
          color: "var(--dim)",
          marginBottom: job.body_preview ? 8 : 0,
        }}
      >
        {job.schedule_display}
      </div>
      {job.body_preview && (
        <div
          style={{
            fontSize: 12,
            color: "var(--dim)",
            lineHeight: 1.5,
            opacity: 0.75,
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}
        >
          {job.body_preview}
        </div>
      )}
    </div>
  );
}

function CadenceSection({
  cadence,
  jobs,
  startIndex,
}: {
  cadence: string;
  jobs: CronJob[];
  startIndex: number;
}) {
  const meta = CADENCE_META[cadence] || {
    label: cadence,
    icon: Clock,
    color: "var(--dim)",
  };
  const Icon = meta.icon;
  const activeCount = jobs.filter((j) => j.enabled).length;

  return (
    <div style={{ marginBottom: 32 }}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 10,
          marginBottom: 14,
          paddingBottom: 8,
          borderBottom: "1px solid var(--border)",
        }}
      >
        <div
          style={{
            width: 30,
            height: 30,
            borderRadius: 8,
            background: `color-mix(in srgb, ${meta.color} 15%, transparent)`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Icon size={16} style={{ color: meta.color }} />
        </div>
        <span
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 700,
            fontSize: 18,
          }}
        >
          {meta.label}
        </span>
        <span
          style={{
            fontSize: 13,
            color: "var(--dim)",
            fontFamily: "var(--font-mono)",
          }}
        >
          {activeCount}/{jobs.length} active
        </span>
      </div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
          gap: 10,
        }}
      >
        {jobs.map((job, i) => (
          <JobCard key={job.id} job={job} index={startIndex + i} />
        ))}
      </div>
    </div>
  );
}

/* ─── Main App ─── */

export default function App() {
  const [data, setData] = useState<GetCronJobsResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await Space.getCronJobs({});
      setData(res);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to load cron jobs");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const grouped = useMemo(() => {
    if (!data) return [];
    const groups: { cadence: string; jobs: CronJob[] }[] = [];
    for (const cadence of CADENCE_ORDER) {
      const jobs = data.jobs.filter((j) => j.cadence_group === cadence);
      if (jobs.length > 0) groups.push({ cadence, jobs });
    }
    return groups;
  }, [data]);

  return (
    <SpaceRoot
      style={{
        backgroundColor: "var(--bg)",
        backgroundImage:
          "radial-gradient(ellipse at 20% 0%, rgba(34,197,94,0.06) 0%, transparent 50%), radial-gradient(ellipse at 80% 5%, rgba(99,102,241,0.05) 0%, transparent 40%)",
      }}
    >
      <div
        style={{
          maxWidth: 960,
          margin: "0 auto",
          padding: "24px 20px 48px",
        }}
      >
        {/* Header */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: 24,
            flexWrap: "wrap",
            gap: 12,
          }}
        >
          <div>
            <h1
              style={{
                margin: 0,
                fontFamily: "var(--font-display)",
                fontWeight: 700,
                fontSize: 28,
                letterSpacing: "-0.02em",
                lineHeight: 1.2,
              }}
            >
              Cron Dashboard
            </h1>
            <p
              style={{
                margin: "4px 0 0",
                fontSize: 14,
                color: "var(--dim)",
              }}
            >
              {data
                ? `${data.total} scheduled jobs across ${grouped.length} cadences`
                : "Loading scheduled jobs…"}
            </p>
          </div>
          <button
            onClick={load}
            disabled={loading}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 6,
              padding: "8px 14px",
              borderRadius: 10,
              border: "1px solid var(--border)",
              background: "var(--surface)",
              color: "var(--dim)",
              cursor: loading ? "wait" : "pointer",
              fontSize: 13,
              fontFamily: "var(--font-body)",
              fontWeight: 500,
              transition: "all 0.15s ease",
            }}
          >
            <RefreshCw
              size={14}
              style={{
                animation: loading ? "spin 1s linear infinite" : "none",
              }}
            />
            Refresh
          </button>
        </div>

        {error && (
          <div
            style={{
              background: "var(--error)",
              color: "#fff",
              padding: "12px 16px",
              borderRadius: "var(--radius)",
              marginBottom: 20,
              fontSize: 14,
            }}
          >
            {error}
          </div>
        )}

        {data && (
          <>
            {/* Stats Row */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
                gap: 10,
                marginBottom: 20,
              }}
            >
              <StatCard
                label="Total Jobs"
                value={data.total}
                color="var(--text)"
                icon={Clock}
              />
              <StatCard
                label="Active"
                value={data.active}
                color="var(--accent)"
                icon={CheckCircle2}
              />
              <StatCard
                label="Disabled"
                value={data.disabled}
                color="var(--disabled)"
                icon={XCircle}
              />
            </div>

            {/* Timeline */}
            <div style={{ marginBottom: 28 }}>
              <TimelineStrip jobs={data.jobs} />
            </div>

            {/* Cadence Groups */}
            {(() => {
              let runningIndex = 0;
              return grouped.map(({ cadence, jobs }) => {
                const si = runningIndex;
                runningIndex += jobs.length;
                return (
                  <CadenceSection
                    key={cadence}
                    cadence={cadence}
                    jobs={jobs}
                    startIndex={si}
                  />
                );
              });
            })()}
          </>
        )}

        {!data && !error && (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              padding: "80px 0",
              color: "var(--dim)",
              fontSize: 14,
            }}
          >
            <RefreshCw
              size={20}
              style={{ animation: "spin 1s linear infinite", marginRight: 8 }}
            />
            Loading cron jobs…
          </div>
        )}
      </div>
    </SpaceRoot>
  );
}
