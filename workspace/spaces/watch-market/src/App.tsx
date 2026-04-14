import "./theme.css";
import { SpaceRoot } from "@hatch/sdk/components";
import { useState, useEffect, useMemo, useCallback } from "react";
import {
  Space,
  type GetAnalyticsResponse,
  type GetListingsResponse,
  type GetWatchlistResponse,
} from "./actions";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
  ScatterChart, Scatter, CartesianGrid,
  PieChart, Pie,
} from "recharts";
import {
  Eye, TrendingUp, DollarSign, Package, Search, Filter,
  Target, Clock, AlertTriangle, ExternalLink, ChevronDown,
} from "lucide-react";

type Tab = "dashboard" | "listings" | "watchlist";


const PIE_COLORS = [
  "#c9a96e", "#7eb8da", "#e07b6e", "#8ac78a", "#c78ad0",
  "#daa06d", "#6ea8e0", "#e0c46e", "#6ee0b8", "#e06eb8",
];

function formatPrice(price: number | null): string {
  if (!price) return "—";
  return `$${price.toLocaleString("en-US", { maximumFractionDigits: 0 })}`;
}

function formatDate(d: string): string {
  if (!d) return "—";
  try {
    return new Date(d + "T00:00:00").toLocaleDateString("en-US", { month: "short", day: "numeric" });
  } catch {
    return d;
  }
}

function StatCard({ label, value, icon, delay }: {
  label: string; value: string; icon: React.ReactNode; delay: number;
}) {
  return (
    <div className={`surface-card p-4 sm:p-5 animate-fade-in stagger-${delay}`} style={{ opacity: 0 }}>
      <div className="flex items-center gap-3 mb-2">
        <div className="p-2 rounded-lg" style={{ background: "var(--accent-dim)" }}>
          {icon}
        </div>
        <span className="text-sm" style={{ color: "var(--dim)" }}>{label}</span>
      </div>
      <div className="text-2xl sm:text-3xl font-semibold" style={{ fontFamily: "var(--font-display)" }}>
        {value}
      </div>
    </div>
  );
}

function BrandBar({ analytics }: { analytics: GetAnalyticsResponse }) {
  const data = useMemo(() =>
    analytics.brands.slice(0, 10).map((b) => ({
      name: b.brand,
      count: b.count,
      avgPrice: b.avg_price || 0,
    })),
  [analytics.brands]);

  return (
    <div className="surface-card p-4 sm:p-5">
      <h3 className="text-lg font-semibold mb-4" style={{ fontFamily: "var(--font-display)" }}>
        Brand Distribution
      </h3>
      <ResponsiveContainer width="100%" height={280}>
        <BarChart data={data} layout="vertical" margin={{ left: 10, right: 20 }}>
          <CartesianGrid strokeDasharray="3 3" horizontal={false} />
          <XAxis type="number" tick={{ fill: "#6a6a7a", fontSize: 12 }} />
          <YAxis type="category" dataKey="name" width={100} tick={{ fill: "#e8e6e0", fontSize: 12 }} />
          <Tooltip
            contentStyle={{ background: "#1a1a24", border: "1px solid #252530", borderRadius: 8, color: "#e8e6e0" }}
            formatter={(value: unknown) => [String(value), "Listings"]}
          />
          <Bar dataKey="count" radius={[0, 4, 4, 0]} fill="#c9a96e" fillOpacity={0.85} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

function PriceScatter({ analytics }: { analytics: GetAnalyticsResponse }) {
  // Group by brand for a price-by-brand scatter (more useful than date axis with limited data)
  const data = useMemo(() => {
    const brandMap: Record<string, number[]> = {};
    analytics.scatter.forEach((s) => {
      if (!brandMap[s.brand]) brandMap[s.brand] = [];
      brandMap[s.brand].push(s.price);
    });
    // Sort brands by count descending, take top 12
    const sorted = Object.entries(brandMap)
      .sort((a, b) => b[1].length - a[1].length)
      .slice(0, 12);
    // Flatten for scatter: x = brand index, y = price
    const points: { brandIdx: number; brand: string; price: number; ref: string; model: string }[] = [];
    sorted.forEach(([brand], idx) => {
      analytics.scatter
        .filter((s) => s.brand === brand)
        .forEach((s) => {
          points.push({ brandIdx: idx, brand, price: s.price, ref: s.reference, model: s.model });
        });
    });
    return { points, brands: sorted.map(([b]) => b) };
  }, [analytics.scatter]);

  return (
    <div className="surface-card p-4 sm:p-5">
      <h3 className="text-lg font-semibold mb-4" style={{ fontFamily: "var(--font-display)" }}>
        Price Distribution by Brand
      </h3>
      <div className="flex flex-wrap gap-2 mb-3">
        {data.brands.slice(0, 6).map((b) => (
          <span key={b} className="text-xs px-2 py-1 rounded-full" style={{
            background: "var(--accent-dim)", color: "var(--accent)",
          }}>{b}</span>
        ))}
      </div>
      <ResponsiveContainer width="100%" height={280}>
        <ScatterChart margin={{ left: 10, right: 20, bottom: 30 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#252530" />
          <XAxis
            type="number" dataKey="brandIdx"
            domain={[-0.5, data.brands.length - 0.5]}
            ticks={data.brands.map((_, i) => i)}
            tickFormatter={(v) => data.brands[v] || ""}
            tick={{ fill: "#e8e6e0", fontSize: 10 }}
            angle={-35}
            textAnchor="end"
            interval={0}
          />
          <YAxis
            type="number" dataKey="price" domain={[0, "auto"]}
            tickFormatter={(v) => v >= 1000 ? `$${(v / 1000).toFixed(0)}k` : `$${v}`}
            tick={{ fill: "#6a6a7a", fontSize: 11 }}
          />
          <Tooltip
            contentStyle={{ background: "#1a1a24", border: "1px solid #252530", borderRadius: 8, color: "#e8e6e0" }}
            formatter={(value: unknown) => [formatPrice(value as number), "Price"]}
            labelFormatter={(v) => data.brands[v as number] || ""}
          />
          <Scatter data={data.points} fill="#c9a96e" fillOpacity={0.7} />
        </ScatterChart>
      </ResponsiveContainer>
    </div>
  );
}

function GroupPie({ analytics }: { analytics: GetAnalyticsResponse }) {
  const dataWithColors = useMemo(() =>
    analytics.groups.map((g, i) => ({
      name: g.group_name.replace("Moda Watch Club - ", "").replace("Moda Clubs - Watches (Moda Watch Club - ", "").replace(")", "").replace("Moda Watch Club", "Main"),
      value: g.count,
      avgPrice: g.avg_price,
      fill: PIE_COLORS[i % PIE_COLORS.length],
    })),
  [analytics.groups]);

  return (
    <div className="surface-card p-4 sm:p-5">
      <h3 className="text-lg font-semibold mb-4" style={{ fontFamily: "var(--font-display)" }}>
        By Group
      </h3>
      <ResponsiveContainer width="100%" height={240}>
        <PieChart>
          <Pie
            data={dataWithColors} dataKey="value" nameKey="name"
            cx="50%" cy="50%" outerRadius={90} innerRadius={50}
            strokeWidth={2} stroke="#111118"
          />
          <Tooltip
            contentStyle={{ background: "#1a1a24", border: "1px solid #252530", borderRadius: 8, color: "#e8e6e0" }}
            formatter={(value: unknown, _name: unknown, props: unknown) =>
              [`${value} listings (avg ${formatPrice((props as {payload: {avgPrice: number | null}}).payload.avgPrice)})`, ""]
            }
          />
        </PieChart>
      </ResponsiveContainer>
      <div className="flex flex-wrap justify-center gap-3 mt-2">
        {dataWithColors.map((d: { name: string; fill: string }, i: number) => (
          <div key={i} className="flex items-center gap-1.5 text-sm">
            <div className="w-3 h-3 rounded-full" style={{ background: PIE_COLORS[i % PIE_COLORS.length] }} />
            <span style={{ color: "var(--dim)" }}>{d.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function ListingsTable({ listings, onLoadMore, hasMore }: {
  listings: GetListingsResponse;
  onLoadMore: () => void;
  hasMore: boolean;
}) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr style={{ borderBottom: "1px solid var(--border)" }}>
            {["Brand", "Model / Ref", "Price", "Condition", "Contents", "Seller", "Group", "Date", ""].map((h) => (
              <th key={h} className="text-left py-3 px-3 font-medium" style={{ color: "var(--dim)" }}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {listings.listings.map((l) => (
            <tr key={l.id} className="hover:bg-[#1a1a24] transition-colors" style={{ borderBottom: "1px solid var(--border)" }}>
              <td className="py-3 px-3 font-medium">{l.brand}</td>
              <td className="py-3 px-3">
                <div>{l.model || "—"}</div>
                <div className="text-xs" style={{ color: "var(--accent)" }}>{l.reference}</div>
              </td>
              <td className="py-3 px-3 font-semibold" style={{ fontFamily: "var(--font-display)" }}>
                {l.sold ? (
                  <span style={{ color: "var(--sold-red)" }}>SOLD</span>
                ) : (
                  <span style={{ color: l.price ? "var(--accent)" : "var(--dim)" }}>{formatPrice(l.price)}</span>
                )}
                {l.original_price && l.price && l.original_price !== l.price && (
                  <div className="text-xs line-through" style={{ color: "var(--dim)" }}>
                    {formatPrice(l.original_price)}
                  </div>
                )}
              </td>
              <td className="py-3 px-3 text-sm" style={{ color: "var(--dim)" }}>{l.condition || "—"}</td>
              <td className="py-3 px-3 text-sm" style={{ color: "var(--dim)" }}>{l.contents || "—"}</td>
              <td className="py-3 px-3 text-sm">{l.seller}</td>
              <td className="py-3 px-3 text-xs" style={{ color: "var(--dim)" }}>
                {l.group_name.replace("Moda Watch Club - ", "").replace("Moda Clubs - Watches (", "").replace(")", "").replace("Moda Watch Club", "Main")}
              </td>
              <td className="py-3 px-3 text-sm" style={{ color: "var(--dim)" }}>{formatDate(l.date)}</td>
              <td className="py-3 px-3">
                {l.post_url && (
                  <a href={l.post_url} target="_blank" rel="noopener noreferrer" style={{ color: "var(--accent)" }}>
                    <ExternalLink size={14} />
                  </a>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {hasMore && (
        <button onClick={onLoadMore} className="w-full py-3 mt-2 text-sm font-medium rounded-lg transition-colors"
          style={{ background: "var(--accent-dim)", color: "var(--accent)" }}>
          Load More <ChevronDown className="inline ml-1" size={14} />
        </button>
      )}
    </div>
  );
}

function WatchlistSection({ watchlist }: { watchlist: GetWatchlistResponse }) {
  return (
    <div className="space-y-4">
      {watchlist.targets.map((t, i) => (
        <div key={i} className="surface-card p-4 sm:p-5">
          <div className="flex items-start justify-between mb-3">
            <div>
              <h3 className="text-lg font-semibold" style={{ fontFamily: "var(--font-display)" }}>
                <span className="gold-gradient">{t.name}</span>
              </h3>
              <div className="text-sm" style={{ color: "var(--dim)" }}>
                Ref: {t.ref} — {t.note}
              </div>
            </div>
            <div className="flex items-center gap-2">
              {t.matches.length > 0 ? (
                <span className="px-2 py-1 text-xs rounded-full font-medium"
                  style={{ background: "rgba(46,204,113,0.15)", color: "var(--active-green)" }}>
                  {t.matches.length} found
                </span>
              ) : (
                <span className="px-2 py-1 text-xs rounded-full font-medium"
                  style={{ background: "rgba(106,106,122,0.15)", color: "var(--dim)" }}>
                  No matches
                </span>
              )}
            </div>
          </div>
          {t.matches.length > 0 && (
            <>
              <div className="grid grid-cols-3 gap-3 mb-3">
                <div className="p-3 rounded-lg" style={{ background: "var(--accent-dim)" }}>
                  <div className="text-xs mb-1" style={{ color: "var(--dim)" }}>Lowest</div>
                  <div className="font-semibold" style={{ color: "var(--accent)" }}>{formatPrice(t.lowest_price)}</div>
                </div>
                <div className="p-3 rounded-lg" style={{ background: "var(--accent-dim)" }}>
                  <div className="text-xs mb-1" style={{ color: "var(--dim)" }}>Average</div>
                  <div className="font-semibold" style={{ color: "var(--accent)" }}>{formatPrice(t.avg_price)}</div>
                </div>
                <div className="p-3 rounded-lg" style={{ background: "var(--accent-dim)" }}>
                  <div className="text-xs mb-1" style={{ color: "var(--dim)" }}>Highest</div>
                  <div className="font-semibold" style={{ color: "var(--accent)" }}>{formatPrice(t.highest_price)}</div>
                </div>
              </div>
              <div className="space-y-2">
                {t.matches.slice(0, 5).map((m) => (
                  <div key={m.listing_id} className="flex items-center justify-between p-2 rounded-lg text-sm"
                    style={{ background: "var(--surface-elevated)" }}>
                    <div className="flex-1">
                      <span style={{ color: m.sold ? "var(--sold-red)" : "var(--accent)" }} className="font-medium">
                        {m.sold ? "SOLD" : formatPrice(m.price)}
                      </span>
                      <span className="mx-2" style={{ color: "var(--dim)" }}>·</span>
                      <span style={{ color: "var(--dim)" }}>{m.seller}</span>
                      <span className="mx-2" style={{ color: "var(--dim)" }}>·</span>
                      <span style={{ color: "var(--dim)" }}>{formatDate(m.date)}</span>
                    </div>
                    {m.post_url && (
                      <a href={m.post_url} target="_blank" rel="noopener noreferrer" style={{ color: "var(--accent)" }}>
                        <ExternalLink size={13} />
                      </a>
                    )}
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      ))}
    </div>
  );
}

export default function App() {
  const [tab, setTab] = useState<Tab>("dashboard");
  const [analytics, setAnalytics] = useState<GetAnalyticsResponse | null>(null);
  const [listings, setListings] = useState<GetListingsResponse | null>(null);
  const [watchlist, setWatchlist] = useState<GetWatchlistResponse | null>(null);
  const [search, setSearch] = useState("");
  const [brandFilter, setBrandFilter] = useState("");
  const [soldFilter, setSoldFilter] = useState("all");
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    Space.getAnalytics({}).then(setAnalytics);
    Space.getListings({}).then(setListings);
    Space.getWatchlist({}).then(setWatchlist);
  }, []);

  const loadListings = useCallback((reset = false) => {
    const newOffset = reset ? 0 : offset;
    Space.getListings({
      search, brand: brandFilter, sold_filter: soldFilter,
      offset: newOffset, limit: 50,
    }).then((res) => {
      if (reset || newOffset === 0) {
        setListings(res);
      } else if (listings) {
        setListings({
          ...res,
          listings: [...listings.listings, ...res.listings],
        });
      }
      setOffset(newOffset + 50);
    });
  }, [search, brandFilter, soldFilter, offset, listings]);

  useEffect(() => {
    setOffset(0);
    loadListings(true);
  }, [search, brandFilter, soldFilter]);

  const brands = useMemo(() =>
    analytics?.brands.map((b) => b.brand).sort() || [],
  [analytics]);

  return (
    <SpaceRoot style={{ background: "linear-gradient(180deg, #0c0c12 0%, #08080c 100%)" }}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
        {/* Header */}
        <div className="mb-6 sm:mb-8 animate-fade-in" style={{ opacity: 0 }}>
          <h1 className="text-3xl sm:text-4xl font-bold mb-1" style={{ fontFamily: "var(--font-display)" }}>
            <span className="gold-gradient">Watch Market</span>
          </h1>
          <p className="text-sm" style={{ color: "var(--dim)" }}>
            Moda Watch Club Intelligence · {analytics?.total_listings || "—"} listings tracked
            {analytics?.last_sync && analytics.last_sync !== "never" && (
              <span> · Synced {new Date(analytics.last_sync).toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" })}</span>
            )}
          </p>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 mb-6 p-1 rounded-xl" style={{ background: "var(--surface)" }}>
          {([
            ["dashboard", "Dashboard", <TrendingUp key="d" size={16} />],
            ["listings", "Listings", <Package key="l" size={16} />],
            ["watchlist", "Watchlist", <Target key="w" size={16} />],
          ] as [Tab, string, React.ReactNode][]).map(([id, label, icon]) => (
            <button key={id} onClick={() => setTab(id)}
              className="flex-1 flex items-center justify-center gap-2 py-2.5 text-sm font-medium rounded-lg transition-all"
              style={{
                background: tab === id ? "var(--accent-dim)" : "transparent",
                color: tab === id ? "var(--accent)" : "var(--dim)",
              }}>
              {icon} {label}
            </button>
          ))}
        </div>

        {/* Dashboard Tab */}
        {tab === "dashboard" && analytics && (
          <div className="space-y-5">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
              <StatCard label="Total Listings" value={String(analytics.total_listings)} icon={<Eye size={18} color="#c9a96e" />} delay={1} />
              <StatCard label="With Price" value={String(analytics.total_with_price)} icon={<DollarSign size={18} color="#c9a96e" />} delay={2} />
              <StatCard label="Avg Price" value={formatPrice(analytics.avg_price)} icon={<TrendingUp size={18} color="#c9a96e" />} delay={3} />
              <StatCard label="Median Price" value={formatPrice(analytics.median_price)} icon={<Target size={18} color="#c9a96e" />} delay={4} />
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
              <BrandBar analytics={analytics} />
              <PriceScatter analytics={analytics} />
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
              <GroupPie analytics={analytics} />
              <div className="lg:col-span-2 surface-card p-4 sm:p-5">
                <h3 className="text-lg font-semibold mb-4" style={{ fontFamily: "var(--font-display)" }}>
                  Recent Highlights
                </h3>
                <div className="space-y-2">
                  {analytics.brands.slice(0, 6).map((b) => (
                    <div key={b.brand} className="flex items-center justify-between p-3 rounded-lg" style={{ background: "var(--surface-elevated)" }}>
                      <div>
                        <span className="font-medium">{b.brand}</span>
                        <span className="ml-2 text-sm" style={{ color: "var(--dim)" }}>{b.count} listings</span>
                      </div>
                      <div className="text-right">
                        <div className="font-semibold" style={{ color: "var(--accent)", fontFamily: "var(--font-display)" }}>
                          {formatPrice(b.median_price)}
                        </div>
                        <div className="text-xs" style={{ color: "var(--dim)" }}>
                          {formatPrice(b.min_price)} – {formatPrice(b.max_price)}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Listings Tab */}
        {tab === "listings" && (
          <div className="space-y-4">
            <div className="surface-card p-3 sm:p-4">
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="flex-1 relative">
                  <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: "var(--dim)" }} />
                  <input type="text" placeholder="Search brand, model, ref..."
                    value={search} onChange={(e) => setSearch(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 rounded-lg text-sm outline-none"
                    style={{ background: "var(--surface-elevated)", border: "1px solid var(--border)", color: "var(--text)" }} />
                </div>
                <div className="flex gap-2">
                  <div className="relative">
                    <Filter size={14} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: "var(--dim)" }} />
                    <select value={brandFilter} onChange={(e) => setBrandFilter(e.target.value)}
                      className="pl-9 pr-6 py-2.5 rounded-lg text-sm appearance-none cursor-pointer"
                      style={{ background: "var(--surface-elevated)", border: "1px solid var(--border)", color: "var(--text)" }}>
                      <option value="">All Brands</option>
                      {brands.map((b) => <option key={b} value={b}>{b}</option>)}
                    </select>
                  </div>
                  <select value={soldFilter} onChange={(e) => setSoldFilter(e.target.value)}
                    className="px-3 py-2.5 rounded-lg text-sm appearance-none cursor-pointer"
                    style={{ background: "var(--surface-elevated)", border: "1px solid var(--border)", color: "var(--text)" }}>
                    <option value="all">All</option>
                    <option value="active">Active</option>
                    <option value="sold">Sold</option>
                  </select>
                </div>
              </div>
              {listings && (
                <div className="mt-2 text-xs" style={{ color: "var(--dim)" }}>
                  {listings.total} results
                </div>
              )}
            </div>
            <div className="surface-card overflow-hidden">
              {listings && (
                <ListingsTable
                  listings={listings}
                  onLoadMore={() => loadListings(false)}
                  hasMore={listings.has_more}
                />
              )}
            </div>
          </div>
        )}

        {/* Watchlist Tab */}
        {tab === "watchlist" && watchlist && (
          <div className="space-y-4">
            <div className="surface-card p-4 sm:p-5 flex items-start gap-3">
              <AlertTriangle size={20} style={{ color: "var(--accent)", flexShrink: 0, marginTop: 2 }} />
              <div>
                <div className="text-sm font-medium">Active Monitoring</div>
                <div className="text-sm" style={{ color: "var(--dim)" }}>
                  Scanning 3 Moda groups every 30 minutes. Alerts fire on Telegram + main chat.
                </div>
              </div>
              <Clock size={16} style={{ color: "var(--dim)", flexShrink: 0 }} />
            </div>
            <WatchlistSection watchlist={watchlist} />
          </div>
        )}
      </div>
    </SpaceRoot>
  );
}
