import "./theme.css";
import { SpaceRoot } from "@hatch/sdk/components";
import { Space } from "./actions";
import type { GetSystemMetricsResponse, GetHistoryResponse } from "./actions";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  Activity,
  Clock,
  Cpu,
  HardDrive,
  HeartPulse,
  MemoryStick,
  Network,
  RefreshCw,
  Server,
  Timer,
  TrendingUp,
} from "lucide-react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  Cell,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

type Metrics = GetSystemMetricsResponse;
type HistoryPoint = GetHistoryResponse["points"][number];

const REFRESH_INTERVAL = 30_000;
const TIME_RANGES = [
  { label: "1h", hours: 1 },
  { label: "6h", hours: 6 },
  { label: "24h", hours: 24 },
] as const;

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

function formatTime(ts: number, rangeHours: number): string {
  const d = new Date(ts);
  if (rangeHours <= 1) {
    return d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" });
  }
  if (rangeHours <= 6) {
    return d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  }
  return d.toLocaleString([], { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" });
}

function formatNetBytes(bytes: number): string {
  if (bytes >= 1024 * 1024 * 1024) return `${(bytes / (1024 * 1024 * 1024)).toFixed(1)} GB`;
  if (bytes >= 1024 * 1024) return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  if (bytes >= 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${bytes} B`;
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

// ---------- Time Range Toggle ----------

function TimeRangeToggle({
  selected,
  onChange,
}: {
  selected: number;
  onChange: (hours: number) => void;
}) {
  return (
    <div
      className="inline-flex rounded-xl border p-1"
      style={{ borderColor: "var(--border)", background: "var(--surface-elevated)" }}
    >
      {TIME_RANGES.map((r) => (
        <button
          key={r.hours}
          type="button"
          onClick={() => onChange(r.hours)}
          className="font-mono rounded-lg px-3 py-1.5 text-xs font-semibold transition-all"
          style={{
            background: selected === r.hours ? "var(--accent)" : "transparent",
            color: selected === r.hours ? "var(--bg)" : "var(--dim)",
          }}
        >
          {r.label}
        </button>
      ))}
    </div>
  );
}

// ---------- Chart Tooltips ----------

function HistoryTooltip({
  active,
  payload,
  rangeHours,
}: {
  active?: boolean;
  payload?: Array<{ value: number; name: string; color: string; dataKey: string; payload?: Record<string, number> }>;
  label?: string;
  rangeHours: number;
}) {
  if (!active || !payload?.length) return null;
  const ts = payload[0]?.payload?.ts;
  return (
    <div
      className="rounded-lg border px-3 py-2 text-xs shadow-lg"
      style={{
        background: "var(--surface-elevated)",
        borderColor: "var(--border)",
        color: "var(--text)",
      }}
    >
      {ts && (
        <div className="font-mono mb-1.5 font-medium" style={{ color: "var(--dim)" }}>
          {formatTime(ts, rangeHours)}
        </div>
      )}
      {payload.map((p) => (
        <div key={p.dataKey} className="font-mono flex items-center gap-2">
          <span
            className="inline-block h-2 w-2 rounded-full"
            style={{ background: p.color }}
          />
          <span style={{ color: "var(--dim)" }}>{p.name}:</span>
          <span className="font-semibold">
            {p.dataKey === "net_rx" || p.dataKey === "net_tx"
              ? formatNetBytes(p.value)
              : `${p.value.toFixed(1)}%`}
          </span>
        </div>
      ))}
    </div>
  );
}


// ---------- Live Sections ----------

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

function CpuCard({ cpu }: { cpu: Metrics["cpu"] }) {
  const color = usageColor(cpu.usage_percent);
  return (
    <Panel delay={100}>
      <SectionLabel icon={Cpu} label="CPU" />
      <div className="flex flex-col gap-3">
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
      </div>
    </Panel>
  );
}

function MemoryCard({ memory }: { memory: Metrics["memory"] }) {
  const color = usageColor(memory.usage_percent);
  const donutData = [
    { name: "Used", value: memory.used_gb, fill: "var(--accent)" },
    { name: "Cached", value: memory.cached_gb, fill: "var(--accent-dim)" },
    { name: "Buffers", value: memory.buffers_gb, fill: "rgba(20,184,166,0.25)" },
    { name: "Free", value: memory.free_gb, fill: "rgba(255,255,255,0.06)" },
  ];

  return (
    <Panel delay={150}>
      <SectionLabel icon={MemoryStick} label="Memory" />
      <div className="flex flex-col gap-3">
        <div className="flex items-start justify-between">
          <BigNumber
            value={memory.used_gb.toFixed(1)}
            unit={`/ ${memory.total_gb.toFixed(1)} GB`}
            sub={`${memory.usage_percent.toFixed(1)}% used`}
          />
        </div>
        <Bar percent={memory.usage_percent} color={color} />
        <div className="flex items-center gap-4">
          <div className="h-24 w-24 flex-shrink-0">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={donutData}
                  innerRadius={28}
                  outerRadius={42}
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

// ---------- Historical Charts ----------

function HistoryCpuMemChart({
  points,
  rangeHours,
}: {
  points: HistoryPoint[];
  rangeHours: number;
}) {
  if (points.length < 2) return null;

  return (
    <Panel delay={400} className="col-span-full">
      <SectionLabel icon={TrendingUp} label="CPU & Memory Over Time" />
      <div className="h-56 w-full sm:h-64">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={points} margin={{ top: 8, right: 8, left: -10, bottom: 0 }}>
            <defs>
              <linearGradient id="histCpuGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#14b8a6" stopOpacity={0.3} />
                <stop offset="100%" stopColor="#14b8a6" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="histMemGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#f59e0b" stopOpacity={0.3} />
                <stop offset="100%" stopColor="#f59e0b" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
            <XAxis
              dataKey="ts"
              tickFormatter={(v: number) => formatTime(v, rangeHours)}
              stroke="var(--dim)"
              tick={{ fontSize: 10, fontFamily: "var(--font-mono)" }}
              axisLine={{ stroke: "var(--border)" }}
              tickLine={false}
              minTickGap={40}
            />
            <YAxis
              domain={[0, 100]}
              stroke="var(--dim)"
              tick={{ fontSize: 10, fontFamily: "var(--font-mono)" }}
              axisLine={{ stroke: "var(--border)" }}
              tickLine={false}
              tickFormatter={(v: number) => `${v}%`}
            />
            <Tooltip content={<HistoryTooltip rangeHours={rangeHours} />} />
            <Legend
              wrapperStyle={{ fontSize: 11, fontFamily: "var(--font-mono)", color: "var(--dim)" }}
            />
            <Area
              type="monotone"
              dataKey="cpu"
              name="CPU"
              stroke="#14b8a6"
              strokeWidth={2}
              fill="url(#histCpuGrad)"
              isAnimationActive={false}
            />
            <Area
              type="monotone"
              dataKey="mem"
              name="Memory"
              stroke="#f59e0b"
              strokeWidth={2}
              fill="url(#histMemGrad)"
              isAnimationActive={false}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </Panel>
  );
}

function HistoryLoadChart({
  points,
  rangeHours,
}: {
  points: HistoryPoint[];
  rangeHours: number;
}) {
  if (points.length < 2) return null;

  return (
    <Panel delay={450}>
      <SectionLabel icon={Activity} label="Load Average" />
      <div className="h-44 w-full sm:h-52">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={points} margin={{ top: 8, right: 8, left: -10, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
            <XAxis
              dataKey="ts"
              tickFormatter={(v: number) => formatTime(v, rangeHours)}
              stroke="var(--dim)"
              tick={{ fontSize: 10, fontFamily: "var(--font-mono)" }}
              axisLine={{ stroke: "var(--border)" }}
              tickLine={false}
              minTickGap={40}
            />
            <YAxis
              stroke="var(--dim)"
              tick={{ fontSize: 10, fontFamily: "var(--font-mono)" }}
              axisLine={{ stroke: "var(--border)" }}
              tickLine={false}
            />
            <Tooltip content={<HistoryTooltip rangeHours={rangeHours} />} />
            <Legend
              wrapperStyle={{ fontSize: 11, fontFamily: "var(--font-mono)", color: "var(--dim)" }}
            />
            <Line
              type="monotone"
              dataKey="load_1m"
              name="1m"
              stroke="#14b8a6"
              strokeWidth={2}
              dot={false}
              isAnimationActive={false}
            />
            <Line
              type="monotone"
              dataKey="load_5m"
              name="5m"
              stroke="#f59e0b"
              strokeWidth={2}
              dot={false}
              isAnimationActive={false}
            />
            <Line
              type="monotone"
              dataKey="load_15m"
              name="15m"
              stroke="#ef4444"
              strokeWidth={2}
              dot={false}
              isAnimationActive={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </Panel>
  );
}

function HistoryDiskChart({
  points,
  rangeHours,
}: {
  points: HistoryPoint[];
  rangeHours: number;
}) {
  if (points.length < 2) return null;

  return (
    <Panel delay={500}>
      <SectionLabel icon={HardDrive} label="Disk Usage Over Time" />
      <div className="h-44 w-full sm:h-52">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={points} margin={{ top: 8, right: 8, left: -10, bottom: 0 }}>
            <defs>
              <linearGradient id="histDiskGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#a855f7" stopOpacity={0.3} />
                <stop offset="100%" stopColor="#a855f7" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
            <XAxis
              dataKey="ts"
              tickFormatter={(v: number) => formatTime(v, rangeHours)}
              stroke="var(--dim)"
              tick={{ fontSize: 10, fontFamily: "var(--font-mono)" }}
              axisLine={{ stroke: "var(--border)" }}
              tickLine={false}
              minTickGap={40}
            />
            <YAxis
              domain={[0, 100]}
              stroke="var(--dim)"
              tick={{ fontSize: 10, fontFamily: "var(--font-mono)" }}
              axisLine={{ stroke: "var(--border)" }}
              tickLine={false}
              tickFormatter={(v: number) => `${v}%`}
            />
            <Tooltip content={<HistoryTooltip rangeHours={rangeHours} />} />
            <Area
              type="monotone"
              dataKey="disk"
              name="Disk"
              stroke="#a855f7"
              strokeWidth={2}
              fill="url(#histDiskGrad)"
              isAnimationActive={false}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </Panel>
  );
}

function HistoryNetworkChart({
  points,
  rangeHours,
}: {
  points: HistoryPoint[];
  rangeHours: number;
}) {
  if (points.length < 2) return null;

  // Compute deltas between consecutive points for throughput
  const deltas = points.slice(1).map((p, i) => {
    const prev = points[i];
    const dtSec = (p.ts - prev.ts) / 1000;
    const rxRate = dtSec > 0 ? (p.net_rx - prev.net_rx) / dtSec : 0;
    const txRate = dtSec > 0 ? (p.net_tx - prev.net_tx) / dtSec : 0;
    return {
      ts: p.ts,
      rx_rate: Math.max(0, rxRate),
      tx_rate: Math.max(0, txRate),
    };
  });

  if (deltas.length < 2) return null;

  return (
    <Panel delay={550} className="col-span-full">
      <SectionLabel icon={Network} label="Network Throughput" />
      <div className="h-44 w-full sm:h-52">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={deltas} margin={{ top: 8, right: 8, left: -10, bottom: 0 }}>
            <defs>
              <linearGradient id="histRxGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#14b8a6" stopOpacity={0.3} />
                <stop offset="100%" stopColor="#14b8a6" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="histTxGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#f59e0b" stopOpacity={0.3} />
                <stop offset="100%" stopColor="#f59e0b" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
            <XAxis
              dataKey="ts"
              tickFormatter={(v: number) => formatTime(v, rangeHours)}
              stroke="var(--dim)"
              tick={{ fontSize: 10, fontFamily: "var(--font-mono)" }}
              axisLine={{ stroke: "var(--border)" }}
              tickLine={false}
              minTickGap={40}
            />
            <YAxis
              stroke="var(--dim)"
              tick={{ fontSize: 10, fontFamily: "var(--font-mono)" }}
              axisLine={{ stroke: "var(--border)" }}
              tickLine={false}
              tickFormatter={(v: number) => formatNetBytes(v) + "/s"}
            />
            <Tooltip
              content={({ active, payload }) => {
                if (!active || !payload?.length) return null;
                const ts = (payload[0]?.payload as Record<string, number> | undefined)?.ts;
                return (
                  <div
                    className="rounded-lg border px-3 py-2 text-xs shadow-lg"
                    style={{
                      background: "var(--surface-elevated)",
                      borderColor: "var(--border)",
                      color: "var(--text)",
                    }}
                  >
                    {ts && (
                      <div className="font-mono mb-1.5 font-medium" style={{ color: "var(--dim)" }}>
                        {formatTime(ts, rangeHours)}
                      </div>
                    )}
                    {payload.map((p, idx) => (
                      <div key={idx} className="font-mono flex items-center gap-2">
                        <span className="inline-block h-2 w-2 rounded-full" style={{ background: p.color }} />
                        <span style={{ color: "var(--dim)" }}>{p.name}:</span>
                        <span className="font-semibold">{formatNetBytes(Number(p.value ?? 0))}/s</span>
                      </div>
                    ))}
                  </div>
                );
              }}
            />
            <Legend
              wrapperStyle={{ fontSize: 11, fontFamily: "var(--font-mono)", color: "var(--dim)" }}
            />
            <Area
              type="monotone"
              dataKey="rx_rate"
              name="↓ RX"
              stroke="#14b8a6"
              strokeWidth={2}
              fill="url(#histRxGrad)"
              isAnimationActive={false}
            />
            <Area
              type="monotone"
              dataKey="tx_rate"
              name="↑ TX"
              stroke="#f59e0b"
              strokeWidth={2}
              fill="url(#histTxGrad)"
              isAnimationActive={false}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </Panel>
  );
}

// ---------- No Data State ----------

function NoHistoryData() {
  return (
    <Panel delay={400} className="col-span-full">
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <Clock size={32} style={{ color: "var(--dim)", opacity: 0.5 }} />
        <p className="mt-3 text-sm font-medium" style={{ color: "var(--dim)" }}>
          Collecting historical data...
        </p>
        <p className="font-mono mt-1 text-xs" style={{ color: "var(--dim)", opacity: 0.7 }}>
          Charts will appear as data points accumulate. Samples every 30 seconds.
        </p>
      </div>
    </Panel>
  );
}

// ---------- Main App ----------

export default function App() {
  const [metrics, setMetrics] = useState<Metrics | null>(null);
  const [historyPoints, setHistoryPoints] = useState<HistoryPoint[]>([]);
  const [rangeHours, setRangeHours] = useState(1);
  const [loading, setLoading] = useState(false);
  const [lastUpdate, setLastUpdate] = useState<Date | null>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const fetchMetrics = useCallback(async () => {
    setLoading(true);
    try {
      const [metricsData, historyData] = await Promise.all([
        Space.getSystemMetrics({}),
        Space.getHistory({ range_hours: rangeHours }),
      ]);
      setMetrics(metricsData);
      setHistoryPoints(historyData.points);
      setLastUpdate(new Date());
    } catch {
      // silently fail, keep showing stale data
    } finally {
      setLoading(false);
    }
  }, [rangeHours]);

  // Fetch on mount and every 30s
  useEffect(() => {
    void fetchMetrics();
    intervalRef.current = setInterval(() => void fetchMetrics(), REFRESH_INTERVAL);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [fetchMetrics]);

  // Refetch when range changes
  const handleRangeChange = useCallback((hours: number) => {
    setRangeHours(hours);
  }, []);

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
          <div className="flex items-center gap-3 self-start">
            <TimeRangeToggle selected={rangeHours} onChange={handleRangeChange} />
            <button
              type="button"
              onClick={() => void fetchMetrics()}
              disabled={loading}
              className="inline-flex h-10 items-center gap-2 rounded-xl border px-4 text-sm font-medium transition-all hover:border-[var(--accent)] hover:text-[var(--accent)] disabled:opacity-50"
              style={{
                background: "var(--surface)",
                borderColor: "var(--border)",
                color: "var(--text)",
              }}
            >
              <RefreshCw size={15} className={loading ? "animate-spin" : ""} />
              Refresh
            </button>
          </div>
        </header>

        {metrics ? (
          <>
            {/* Live metric cards */}
            <div className="grid grid-cols-1 gap-5 sm:gap-6 md:grid-cols-2">
              <CpuCard cpu={metrics.cpu} />
              <MemoryCard memory={metrics.memory} />
            </div>

            {/* Historical Charts */}
            <div className="grid grid-cols-1 gap-5 sm:gap-6">
              {historyPoints.length >= 2 ? (
                <>
                  <HistoryCpuMemChart points={historyPoints} rangeHours={rangeHours} />
                  <div className="grid grid-cols-1 gap-5 sm:gap-6 md:grid-cols-2">
                    <HistoryLoadChart points={historyPoints} rangeHours={rangeHours} />
                    <HistoryDiskChart points={historyPoints} rangeHours={rangeHours} />
                  </div>
                  <HistoryNetworkChart points={historyPoints} rangeHours={rangeHours} />
                </>
              ) : (
                <NoHistoryData />
              )}
            </div>

            {/* Disk + Network live */}
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
              Loading system metrics...
            </div>
          </div>
        )}
      </div>
    </SpaceRoot>
  );
}
