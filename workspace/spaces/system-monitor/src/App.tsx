import "./theme.css";
import { SpaceRoot } from "@hatch/sdk/components";
import { Space } from "./actions";
import type { GetSystemMetricsResponse } from "./actions";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  Activity,
  Cpu,
  HardDrive,
  HeartPulse,
  MemoryStick,
  Network,
  RefreshCw,
  Server,
  Timer,
} from "lucide-react";
import {
  Area,
  AreaChart,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

type Metrics = GetSystemMetricsResponse;
type HistoryEntry = { ts: number; cpu: number; mem: number };

const REFRESH_INTERVAL = 30_000;
const MAX_HISTORY = 20;

function formatBytes(mb: number): string {
  if (mb >= 1024) return `${(mb / 1024).toFixed(1)} GB`;
  return `${mb.toFixed(1)} MB`;
}

function healthColor(health: string): string {
  if (health === "critical") return "var(--critical)";
  if (health === "warning") return "var(--warning)";
  return "var(--healthy)";
}

function healthLabel(health: string): string {
  if (health === "critical") return "Critical";
  if (health === "warning") return "Warning";
  return "Healthy";
}

function usageColor(pct: number): string {
  if (pct > 90) return "var(--critical)";
  if (pct > 70) return "var(--warning)";
  return "var(--accent)";
}

// ---------- Tiny reusable components ----------

function Panel({
  children,
  className = "",
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <div
      className={`animate-fade-in rounded-2xl border p-5 sm:p-6 ${className}`}
      style={{
        background: "var(--surface)",
        borderColor: "var(--border)",
        animationDelay: `${delay}ms`,
        boxShadow: "0 0 40px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.03)",
      }}
    >
      {children}
    </div>
  );
}

function SectionLabel({ icon: Icon, label }: { icon: React.ElementType; label: string }) {
  return (
    <div className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em]" style={{ color: "var(--dim)" }}>
      <Icon size={14} style={{ color: "var(--accent)" }} />
      {label}
    </div>
  );
}

function Bar({ percent, color }: { percent: number; color: string }) {
  return (
    <div
      className="h-2 w-full overflow-hidden rounded-full"
      style={{ background: "rgba(255,255,255,0.06)" }}
    >
      <div
        className="h-full rounded-full transition-all duration-700"
        style={{
          width: `${Math.min(percent, 100)}%`,
          background: `linear-gradient(90deg, ${color}, ${color}bb)`,
          boxShadow: `0 0 12px ${color}44`,
        }}
      />
    </div>
  );
}

function BigNumber({ value, unit, sub }: { value: string; unit?: string; sub?: string }) {
  return (
    <div>
      <div className="font-mono flex items-baseline gap-1">
        <span className="text-2xl font-bold sm:text-3xl" style={{ color: "var(--text)" }}>
          {value}
        </span>
        {unit && (
          <span className="text-sm font-medium" style={{ color: "var(--dim)" }}>
            {unit}
          </span>
        )}
      </div>
      {sub && (
        <div className="font-mono mt-0.5 text-xs" style={{ color: "var(--dim)" }}>
          {sub}
        </div>
      )}
    </div>
  );
}

// ---------- Chart tooltip ----------

function ChartTooltip({ active, payload, label }: { active?: boolean; payload?: Array<{ value: number; name: string; color: string }>; label?: string }) {
  if (!active || !payload?.length) return null;
  return (
    <div
      className="rounded-lg border px-3 py-2 text-xs shadow-lg"
      style={{
        background: "var(--surface-elevated)",
        borderColor: "var(--border)",
        color: "var(--text)",
      }}
    >
      <div className="font-mono mb-1 font-medium" style={{ color: "var(--dim)" }}>
        {label}
      </div>
      {payload.map((p) => (
        <div key={p.name} className="font-mono flex items-center gap-2">
          <span
            className="inline-block h-2 w-2 rounded-full"
            style={{ background: p.color }}
          />
          {p.name}: {p.value.toFixed(1)}%
        </div>
      ))}
    </div>
  );
}

// ---------- Sections ----------

function HealthBadge({ health }: { health: string }) {
  const color = healthColor(health);
  return (
    <div className="flex items-center gap-2.5">
      <div
        className="h-3 w-3 rounded-full"
        style={{
          background: color,
          boxShadow: `0 0 10px ${color}, 0 0 20px ${color}66`,
          animation: health !== "healthy" ? "pulse-glow 2s ease-in-out infinite" : undefined,
        }}
      />
      <span
        className="font-mono text-sm font-semibold uppercase tracking-wider"
        style={{ color }}
      >
        {healthLabel(health)}
      </span>
    </div>
  );
}

function CpuSection({ cpu, history }: { cpu: Metrics["cpu"]; history: HistoryEntry[] }) {
  const color = usageColor(cpu.usage_percent);
  const chartData = history.map((h, i) => ({
    name: `${(history.length - 1 - i) * 30}s`,
    cpu: h.cpu,
  })).reverse();

  return (
    <Panel delay={100}>
      <SectionLabel icon={Cpu} label="CPU" />
      <div className="flex flex-col gap-4">
        <div className="flex items-end justify-between">
          <BigNumber
            value={cpu.usage_percent.toFixed(1)}
            unit="%"
            sub={`${cpu.cpu_count} cores`}
          />
          <div className="font-mono text-right text-xs" style={{ color: "var(--dim)" }}>
            <div>1m: {cpu.load_1m.toFixed(2)}</div>
            <div>5m: {cpu.load_5m.toFixed(2)}</div>
            <div>15m: {cpu.load_15m.toFixed(2)}</div>
          </div>
        </div>
        <Bar percent={cpu.usage_percent} color={color} />
        {chartData.length > 1 && (
          <div className="h-24 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData} margin={{ top: 4, right: 0, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="cpuGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="var(--accent)" stopOpacity={0.3} />
                    <stop offset="100%" stopColor="var(--accent)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="name" hide />
                <YAxis domain={[0, 100]} hide />
                <Tooltip content={<ChartTooltip />} />
                <Area
                  type="monotone"
                  dataKey="cpu"
                  name="CPU"
                  stroke="var(--accent)"
                  strokeWidth={2}
                  fill="url(#cpuGrad)"
                  isAnimationActive={false}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        )}
      </div>
    </Panel>
  );
}

function MemorySection({ memory, history }: { memory: Metrics["memory"]; history: HistoryEntry[] }) {
  const color = usageColor(memory.usage_percent);
  const donutData = [
    { name: "Used", value: memory.used_gb, fill: "var(--accent)" },
    { name: "Cached", value: memory.cached_gb, fill: "var(--accent-dim)" },
    { name: "Buffers", value: memory.buffers_gb, fill: "rgba(20,184,166,0.25)" },
    { name: "Free", value: memory.free_gb, fill: "rgba(255,255,255,0.06)" },
  ];

  const memChartData = history.map((h, i) => ({
    name: `${(history.length - 1 - i) * 30}s`,
    mem: h.mem,
  })).reverse();

  return (
    <Panel delay={150}>
      <SectionLabel icon={MemoryStick} label="Memory" />
      <div className="flex flex-col gap-4">
        <div className="flex items-start justify-between">
          <BigNumber
            value={memory.used_gb.toFixed(1)}
            unit={`/ ${memory.total_gb.toFixed(1)} GB`}
            sub={`${memory.usage_percent.toFixed(1)}% used`}
          />
        </div>
        <Bar percent={memory.usage_percent} color={color} />

        <div className="flex items-center gap-4">
          <div className="h-28 w-28 flex-shrink-0">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={donutData}
                  innerRadius={32}
                  outerRadius={48}
                  paddingAngle={2}
                  dataKey="value"
                  strokeWidth={0}
                  isAnimationActive={false}
                >
                  {donutData.map((entry) => (
                    <Cell key={entry.name} fill={entry.fill} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="font-mono grid grid-cols-2 gap-x-4 gap-y-1 text-xs">
            <span style={{ color: "var(--accent)" }}>● Used</span>
            <span>{memory.used_gb.toFixed(2)} GB</span>
            <span style={{ color: "var(--accent-dim)" }}>● Cached</span>
            <span>{memory.cached_gb.toFixed(2)} GB</span>
            <span style={{ color: "rgba(20,184,166,0.4)" }}>● Buffers</span>
            <span>{memory.buffers_gb.toFixed(2)} GB</span>
            <span style={{ color: "var(--dim)" }}>● Free</span>
            <span>{memory.free_gb.toFixed(2)} GB</span>
          </div>
        </div>

        {memChartData.length > 1 && (
          <div className="h-20 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={memChartData} margin={{ top: 4, right: 0, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="memGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="var(--warning)" stopOpacity={0.3} />
                    <stop offset="100%" stopColor="var(--warning)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="name" hide />
                <YAxis domain={[0, 100]} hide />
                <Tooltip content={<ChartTooltip />} />
                <Area
                  type="monotone"
                  dataKey="mem"
                  name="Memory"
                  stroke="var(--warning)"
                  strokeWidth={2}
                  fill="url(#memGrad)"
                  isAnimationActive={false}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        )}
      </div>
    </Panel>
  );
}

function DiskSection({ disks }: { disks: Metrics["disks"] }) {
  return (
    <Panel delay={200}>
      <SectionLabel icon={HardDrive} label="Disk" />
      <div className="flex flex-col gap-4">
        {disks.map((d) => {
          const color = usageColor(d.usage_percent);
          return (
            <div key={d.mount}>
              <div className="mb-1.5 flex items-center justify-between">
                <span className="font-mono text-sm font-medium truncate max-w-[60%]">{d.mount}</span>
                <span className="font-mono text-sm" style={{ color }}>
                  {d.usage_percent}%
                </span>
              </div>
              <Bar percent={d.usage_percent} color={color} />
              <div className="font-mono mt-1 flex gap-3 text-xs" style={{ color: "var(--dim)" }}>
                <span>{d.used} / {d.size}</span>
                <span>{d.available} free</span>
              </div>
            </div>
          );
        })}
      </div>
    </Panel>
  );
}

function NetworkSection({ network }: { network: Metrics["network"] }) {
  return (
    <Panel delay={250}>
      <SectionLabel icon={Network} label="Network" />
      <div className="flex flex-col gap-3">
        {network.map((n) => (
          <div
            key={n.interface}
            className="flex items-center justify-between rounded-xl border px-4 py-3"
            style={{
              borderColor: "var(--border)",
              background: "var(--surface-elevated)",
            }}
          >
            <span className="font-mono text-sm font-medium">{n.interface}</span>
            <div className="font-mono flex gap-4 text-xs">
              <span>
                <span style={{ color: "var(--accent)" }}>↓</span>{" "}
                {formatBytes(n.rx_mb)}
              </span>
              <span>
                <span style={{ color: "var(--warning)" }}>↑</span>{" "}
                {formatBytes(n.tx_mb)}
              </span>
            </div>
          </div>
        ))}
      </div>
    </Panel>
  );
}

function ProcessTable({
  processes,
  title,
  icon: Icon,
  delay,
}: {
  processes: Metrics["top_cpu_processes"];
  title: string;
  icon: React.ElementType;
  delay: number;
}) {
  return (
    <Panel delay={delay}>
      <SectionLabel icon={Icon} label={title} />
      <div className="overflow-x-auto -mx-5 sm:-mx-6 px-5 sm:px-6">
        <table className="font-mono w-full text-xs">
          <thead>
            <tr style={{ color: "var(--dim)" }}>
              <th className="pb-2 text-left font-medium">PID</th>
              <th className="pb-2 text-left font-medium">USER</th>
              <th className="pb-2 text-right font-medium">CPU%</th>
              <th className="pb-2 text-right font-medium">MEM%</th>
              <th className="pb-2 text-left font-medium pl-4">COMMAND</th>
            </tr>
          </thead>
          <tbody>
            {processes.slice(0, 8).map((p, i) => (
              <tr
                key={`${p.pid}-${i}`}
                className="border-t"
                style={{ borderColor: "var(--border)" }}
              >
                <td className="py-1.5 tabular-nums">{p.pid}</td>
                <td className="py-1.5 truncate max-w-[60px]">{p.user}</td>
                <td
                  className="py-1.5 text-right tabular-nums"
                  style={{ color: p.cpu_percent > 50 ? "var(--critical)" : p.cpu_percent > 20 ? "var(--warning)" : "var(--text)" }}
                >
                  {p.cpu_percent.toFixed(1)}
                </td>
                <td
                  className="py-1.5 text-right tabular-nums"
                  style={{ color: p.mem_percent > 50 ? "var(--critical)" : p.mem_percent > 20 ? "var(--warning)" : "var(--text)" }}
                >
                  {p.mem_percent.toFixed(1)}
                </td>
                <td className="py-1.5 pl-4 truncate max-w-[200px] sm:max-w-[300px]" style={{ color: "var(--dim)" }}>
                  {p.command}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Panel>
  );
}

// ---------- Main App ----------

export default function App() {
  const [metrics, setMetrics] = useState<Metrics | null>(null);
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const [loading, setLoading] = useState(false);
  const [lastUpdate, setLastUpdate] = useState<Date | null>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const fetchMetrics = useCallback(async () => {
    setLoading(true);
    try {
      const data = await Space.getSystemMetrics({});
      setMetrics(data);
      setLastUpdate(new Date());
      setHistory((prev) => {
        const next = [...prev, { ts: Date.now(), cpu: data.cpu.usage_percent, mem: data.memory.usage_percent }];
        return next.slice(-MAX_HISTORY);
      });
    } catch {
      // silently fail — keep showing stale data
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void fetchMetrics();
    intervalRef.current = setInterval(() => void fetchMetrics(), REFRESH_INTERVAL);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [fetchMetrics]);

  return (
    <SpaceRoot
      style={{
        backgroundColor: "var(--bg)",
        backgroundImage:
          "radial-gradient(ellipse at 20% 0%, rgba(20,184,166,0.08) 0%, transparent 50%), radial-gradient(ellipse at 80% 100%, rgba(20,184,166,0.04) 0%, transparent 50%)",
      }}
    >
      <div className="mx-auto flex max-w-6xl flex-col gap-5 px-4 pb-10 pt-5 sm:gap-6 sm:px-6 sm:pt-6 md:px-8">
        {/* Header */}
        <header className="animate-fade-in flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="flex items-center gap-3">
              <Server size={20} style={{ color: "var(--accent)" }} />
              <h1 className="text-xl font-semibold tracking-tight sm:text-2xl">
                System Monitor
              </h1>
              {metrics && <HealthBadge health={metrics.health} />}
            </div>
            {metrics && (
              <div className="font-mono mt-1.5 flex flex-wrap items-center gap-3 text-xs" style={{ color: "var(--dim)" }}>
                <span className="flex items-center gap-1.5">
                  <Timer size={12} />
                  Uptime: {metrics.uptime_human}
                </span>
                {lastUpdate && (
                  <span>Updated: {lastUpdate.toLocaleTimeString()}</span>
                )}
              </div>
            )}
          </div>
          <button
            type="button"
            onClick={() => void fetchMetrics()}
            disabled={loading}
            className="inline-flex h-10 items-center gap-2 self-start rounded-xl border px-4 text-sm font-medium transition-all hover:border-[var(--accent)] hover:text-[var(--accent)] disabled:opacity-50"
            style={{
              background: "var(--surface)",
              borderColor: "var(--border)",
              color: "var(--text)",
            }}
          >
            <RefreshCw size={15} className={loading ? "animate-spin" : ""} />
            Refresh
          </button>
        </header>

        {metrics ? (
          <>
            {/* Top metric cards */}
            <div className="grid grid-cols-1 gap-5 sm:gap-6 md:grid-cols-2">
              <CpuSection cpu={metrics.cpu} history={history} />
              <MemorySection memory={metrics.memory} history={history} />
            </div>

            {/* Disk + Network */}
            <div className="grid grid-cols-1 gap-5 sm:gap-6 md:grid-cols-2">
              <DiskSection disks={metrics.disks} />
              <NetworkSection network={metrics.network} />
            </div>

            {/* Processes */}
            <div className="grid grid-cols-1 gap-5 sm:gap-6 lg:grid-cols-2">
              <ProcessTable
                processes={metrics.top_cpu_processes}
                title="Top Processes (CPU)"
                icon={Activity}
                delay={300}
              />
              <ProcessTable
                processes={metrics.top_mem_processes}
                title="Top Processes (Memory)"
                icon={HeartPulse}
                delay={350}
              />
            </div>
          </>
        ) : (
          <div className="flex h-64 items-center justify-center">
            <div className="flex items-center gap-3 text-sm" style={{ color: "var(--dim)" }}>
              <RefreshCw size={18} className="animate-spin" style={{ color: "var(--accent)" }} />
              Loading system metrics…
            </div>
          </div>
        )}
      </div>
    </SpaceRoot>
  );
}
