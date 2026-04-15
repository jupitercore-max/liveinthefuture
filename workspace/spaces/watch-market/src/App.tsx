import "./theme.css";
import { SpaceRoot } from "@hatch/sdk/components";
import { useState, useEffect, useMemo, useCallback } from "react";
import {
  Space,
  type GetAnalyticsResponse,
  type GetListingsResponse,
  type GetWatchlistResponse,
  type GetRefHistoryResponse,
} from "./actions";
// Pure CSS charts — no recharts (React 19 ref compat issue)
import {
  Eye, TrendingUp, DollarSign, Package, Search, Filter,
  Target, Clock, AlertTriangle, ExternalLink, ChevronDown, X,
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
  const maxCount = Math.max(...data.map(d => d.count), 1);

  return (
    <div className="surface-card p-4 sm:p-5">
      <h3 className="text-lg font-semibold mb-4" style={{ fontFamily: "var(--font-display)" }}>
        Brand Distribution
      </h3>
      <div className="space-y-2">
        {data.map((d) => (
          <div key={d.name} className="flex items-center gap-3">
            <div className="w-20 text-xs text-right truncate" style={{ color: "var(--text)" }}>{d.name}</div>
            <div className="flex-1 h-6 rounded" style={{ background: "var(--surface-elevated)" }}>
              <div
                className="h-full rounded flex items-center justify-end pr-2 text-xs font-medium transition-all"
                style={{
                  width: `${Math.max((d.count / maxCount) * 100, 8)}%`,
                  background: "linear-gradient(90deg, rgba(201,169,110,0.3), rgba(201,169,110,0.7))",
                  color: "#e8e6e0",
                }}
              >
                {d.count}
              </div>
            </div>
            <div className="w-16 text-xs text-right" style={{ color: "var(--dim)" }}>
              {d.avgPrice ? formatPrice(d.avgPrice) : "—"}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function PriceScatter({ analytics }: { analytics: GetAnalyticsResponse }) {
  const data = useMemo(() => {
    const brandMap: Record<string, { prices: number[]; refs: string[] }> = {};
    analytics.scatter.forEach((s) => {
      if (!brandMap[s.brand]) brandMap[s.brand] = { prices: [], refs: [] };
      brandMap[s.brand].prices.push(s.price);
      brandMap[s.brand].refs.push(s.reference);
    });
    const sorted = Object.entries(brandMap)
      .sort((a, b) => b[1].prices.length - a[1].prices.length)
      .slice(0, 8);
    return sorted.map(([brand, d]) => ({
      brand,
      min: Math.min(...d.prices),
      max: Math.max(...d.prices),
      avg: d.prices.reduce((a, b) => a + b, 0) / d.prices.length,
      count: d.prices.length,
      prices: d.prices,
    }));
  }, [analytics.scatter]);
  const globalMax = Math.max(...data.map(d => d.max), 1);

  return (
    <div className="surface-card p-4 sm:p-5">
      <h3 className="text-lg font-semibold mb-4" style={{ fontFamily: "var(--font-display)" }}>
        Price Range by Brand
      </h3>
      <div className="space-y-3">
        {data.map((d) => (
          <div key={d.brand}>
            <div className="flex justify-between text-xs mb-1">
              <span style={{ color: "var(--text)" }}>{d.brand} ({d.count})</span>
              <span style={{ color: "var(--dim)" }}>{formatPrice(d.min)} – {formatPrice(d.max)}</span>
            </div>
            <div className="relative h-4 rounded" style={{ background: "var(--surface-elevated)" }}>
              <div
                className="absolute h-full rounded"
                style={{
                  left: `${(d.min / globalMax) * 100}%`,
                  width: `${Math.max(((d.max - d.min) / globalMax) * 100, 2)}%`,
                  background: "linear-gradient(90deg, rgba(201,169,110,0.4), rgba(201,169,110,0.8))",
                }}
              />
              <div
                className="absolute w-2 h-4 rounded-sm"
                style={{
                  left: `${(d.avg / globalMax) * 100}%`,
                  background: "#c9a96e",
                  transform: "translateX(-50%)",
                }}
                title={`Avg: ${formatPrice(d.avg)}`}
              />
            </div>
          </div>
        ))}
        <div className="flex justify-between text-xs pt-2" style={{ color: "var(--dim)", borderTop: "1px solid var(--border)" }}>
          <span>$0</span>
          <span>{formatPrice(globalMax)}</span>
        </div>
      </div>
    </div>
  );
}

function GroupPie({ analytics }: { analytics: GetAnalyticsResponse }) {
  const data = useMemo(() => {
    const total = analytics.groups.reduce((s, g) => s + g.count, 0) || 1;
    return analytics.groups.map((g, i) => ({
      name: g.group_name.replace("Moda Watch Club - ", "").replace("Moda Clubs - Watches (Moda Watch Club - ", "").replace(")", "").replace("Moda Watch Club", "Main"),
      count: g.count,
      pct: Math.round((g.count / total) * 100),
      avgPrice: g.avg_price,
      color: PIE_COLORS[i % PIE_COLORS.length],
    }));
  }, [analytics.groups]);
  const total = data.reduce((s, d) => s + d.count, 0);

  // Build conic gradient for donut
  const conicStops = useMemo(() => {
    let cum = 0;
    return data.map((d) => {
      const start = cum;
      cum += (d.count / total) * 360;
      return `${d.color} ${start}deg ${cum}deg`;
    }).join(", ");
  }, [data, total]);

  return (
    <div className="surface-card p-4 sm:p-5">
      <h3 className="text-lg font-semibold mb-4" style={{ fontFamily: "var(--font-display)" }}>
        By Group
      </h3>
      <div className="flex justify-center mb-4">
        <div style={{
          width: 180, height: 180, borderRadius: "50%",
          background: `conic-gradient(${conicStops})`,
          position: "relative",
        }}>
          <div style={{
            position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)",
            width: 100, height: 100, borderRadius: "50%",
            background: "#111118",
            display: "flex", alignItems: "center", justifyContent: "center",
            flexDirection: "column",
          }}>
            <div className="text-2xl font-bold" style={{ color: "var(--accent)" }}>{total}</div>
            <div className="text-xs" style={{ color: "var(--dim)" }}>total</div>
          </div>
        </div>
      </div>
      <div className="space-y-2">
        {data.map((d) => (
          <div key={d.name} className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full" style={{ background: d.color }} />
              <span style={{ color: "var(--text)" }}>{d.name}</span>
            </div>
            <div className="flex gap-3">
              <span style={{ color: "var(--dim)" }}>{d.count} ({d.pct}%)</span>
              <span className="w-16 text-right" style={{ color: "var(--accent)" }}>{formatPrice(d.avgPrice)}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function RefDetailModal({ refData, onClose }: {
  refData: GetRefHistoryResponse;
  onClose: () => void;
}) {
  const pricePoints = useMemo(() => {
    const pts = refData.history
      .filter((h) => {
        const p = h.original_price || h.price;
        return p && p > 0;
      })
      .map((h) => ({ date: h.date, price: (h.original_price || h.price) as number, sold: h.sold, seller: h.seller }))
      .reverse(); // chronological
    return pts;
  }, [refData.history]);
  const maxPrice = Math.max(...pricePoints.map((p) => p.price), 1);
  const minPrice = Math.min(...pricePoints.map((p) => p.price), 0);
  const range = maxPrice - minPrice || 1;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: "rgba(0,0,0,0.75)" }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="w-full max-w-2xl max-h-[85vh] overflow-y-auto rounded-2xl p-5 sm:p-6"
        style={{ background: "#13131b", border: "1px solid var(--border)" }}>
        {/* Header */}
        <div className="flex items-start justify-between mb-5">
          <div>
            <h2 className="text-xl font-bold" style={{ fontFamily: "var(--font-display)" }}>
              <span className="gold-gradient">{refData.brand} {refData.reference}</span>
            </h2>
            {refData.model && <div className="text-sm mt-1" style={{ color: "var(--dim)" }}>{refData.model}</div>}
          </div>
          <button onClick={onClose} className="p-1 rounded-lg hover:bg-[#1a1a24] transition-colors">
            <X size={20} style={{ color: "var(--dim)" }} />
          </button>
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-5">
          {([
            ["Avg", refData.avg_price],
            ["Min", refData.min_price],
            ["Max", refData.max_price],
            ["Median", refData.median_price],
          ] as [string, number | null][]).map(([label, val]) => (
            <div key={label} className="p-3 rounded-lg" style={{ background: "var(--accent-dim)" }}>
              <div className="text-xs mb-1" style={{ color: "var(--dim)" }}>{label}</div>
              <div className="font-semibold" style={{ color: "var(--accent)", fontFamily: "var(--font-display)" }}>
                {formatPrice(val)}
              </div>
            </div>
          ))}
        </div>

        {/* Counts */}
        <div className="flex gap-4 mb-5 text-sm">
          <span>{refData.total_listings} total</span>
          <span style={{ color: "var(--active-green)" }}>{refData.active_count} active</span>
          <span style={{ color: "var(--sold-red)" }}>{refData.sold_count} sold</span>
        </div>

        {/* Price chart (pure CSS) */}
        {pricePoints.length > 1 && (
          <div className="mb-5">
            <h3 className="text-sm font-medium mb-3" style={{ color: "var(--dim)" }}>Price History</h3>
            <div className="relative h-40 rounded-lg p-2" style={{ background: "var(--surface-elevated)" }}>
              {/* Y-axis labels */}
              <div className="absolute left-2 top-2 text-xs" style={{ color: "var(--dim)" }}>{formatPrice(maxPrice)}</div>
              <div className="absolute left-2 bottom-2 text-xs" style={{ color: "var(--dim)" }}>{formatPrice(minPrice)}</div>
              {/* Points and lines */}
              <svg className="w-full h-full" viewBox={`0 0 ${Math.max(pricePoints.length * 60, 200)} 140`} preserveAspectRatio="none">
                {/* Line */}
                <polyline
                  fill="none" stroke="#c9a96e" strokeWidth="2"
                  points={pricePoints.map((p, i) => {
                    const x = (i / Math.max(pricePoints.length - 1, 1)) * (Math.max(pricePoints.length * 60, 200) - 20) + 10;
                    const y = 130 - ((p.price - minPrice) / range) * 120;
                    return `${x},${y}`;
                  }).join(" ")}
                />
                {/* Dots */}
                {pricePoints.map((p, i) => {
                  const x = (i / Math.max(pricePoints.length - 1, 1)) * (Math.max(pricePoints.length * 60, 200) - 20) + 10;
                  const y = 130 - ((p.price - minPrice) / range) * 120;
                  return (
                    <circle key={i} cx={x} cy={y} r="4"
                      fill={p.sold ? "#e07b6e" : "#c9a96e"} stroke="#13131b" strokeWidth="2">
                      <title>{`${formatPrice(p.price)} - ${p.seller} (${p.date})${p.sold ? " SOLD" : ""}`}</title>
                    </circle>
                  );
                })}
              </svg>
            </div>
          </div>
        )}

        {/* Listing history */}
        <h3 className="text-sm font-medium mb-3" style={{ color: "var(--dim)" }}>All Listings</h3>
        <div className="space-y-2">
          {refData.history.map((h) => {
            const displayPrice = h.sold ? (h.original_price || h.price) : h.price;
            return (
              <div key={h.id} className="flex items-center justify-between p-3 rounded-lg text-sm"
                style={{ background: "var(--surface-elevated)" }}>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    {h.sold ? (
                      <>
                        <span className="font-semibold" style={{ color: "var(--sold-red)" }}>SOLD</span>
                        {displayPrice ? (
                          <span className="text-xs" style={{ color: "var(--dim)" }}>was {formatPrice(displayPrice)}</span>
                        ) : null}
                      </>
                    ) : (
                      <span className="font-semibold" style={{ color: "var(--accent)" }}>{formatPrice(displayPrice)}</span>
                    )}
                    <span style={{ color: "var(--dim)" }}>&middot;</span>
                    <span style={{ color: "var(--dim)" }}>{h.seller}</span>
                  </div>
                  <div className="flex gap-3 mt-1 text-xs" style={{ color: "var(--dim)" }}>
                    <span>{formatDate(h.date)}</span>
                    {h.condition && <span>{h.condition}</span>}
                    {h.contents && <span>{h.contents}</span>}
                  </div>
                </div>
                {h.post_url && (
                  <a href={h.post_url} target="_blank" rel="noopener noreferrer"
                    className="flex-shrink-0 ml-2" style={{ color: "var(--accent)" }}>
                    <ExternalLink size={14} />
                  </a>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function ListingsTable({ listings, onLoadMore, hasMore, onRefClick }: {
  listings: GetListingsResponse;
  onLoadMore: () => void;
  hasMore: boolean;
  onRefClick: (ref: string, brand: string) => void;
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
                <div>{l.model || "\u2014"}</div>
                {l.reference ? (
                  <button
                    className="text-xs underline decoration-dotted cursor-pointer hover:brightness-125 transition-all"
                    style={{ color: "var(--accent)", background: "none", border: "none", padding: 0 }}
                    onClick={() => onRefClick(l.reference, l.brand)}
                  >
                    {l.reference}
                  </button>
                ) : (
                  <div className="text-xs" style={{ color: "var(--dim)" }}>\u2014</div>
                )}
              </td>
              <td className="py-3 px-3 font-semibold" style={{ fontFamily: "var(--font-display)" }}>
                {l.sold ? (
                  <div>
                    <span style={{ color: "var(--sold-red)" }}>SOLD</span>
                    {(l.original_price || l.price) ? (
                      <div className="text-xs font-normal" style={{ color: "var(--dim)" }}>
                        was {formatPrice(l.original_price || l.price)}
                      </div>
                    ) : null}
                  </div>
                ) : (
                  <div>
                    <span style={{ color: l.price ? "var(--accent)" : "var(--dim)" }}>{formatPrice(l.price)}</span>
                    {l.original_price && l.price && l.original_price !== l.price && (
                      <div className="text-xs line-through font-normal" style={{ color: "var(--dim)" }}>
                        {formatPrice(l.original_price)}
                      </div>
                    )}
                  </div>
                )}
              </td>
              <td className="py-3 px-3 text-sm" style={{ color: "var(--dim)" }}>{l.condition || "\u2014"}</td>
              <td className="py-3 px-3 text-sm" style={{ color: "var(--dim)" }}>{l.contents || "\u2014"}</td>
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
                        {m.sold ? (
                          <>SOLD{m.price ? <span className="text-xs font-normal ml-1" style={{ color: "var(--dim)" }}>was {formatPrice(m.price)}</span> : null}</>
                        ) : formatPrice(m.price)}
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
  const [sortBy, setSortBy] = useState("date");
  const [offset, setOffset] = useState(0);
  const [refDetail, setRefDetail] = useState<GetRefHistoryResponse | null>(null);

  const handleRefClick = useCallback((ref: string, brand: string) => {
    Space.getRefHistory({ reference: ref, brand }).then(setRefDetail);
  }, []);

  useEffect(() => {
    Space.getAnalytics({}).then(setAnalytics);
    Space.getListings({}).then(setListings);
    Space.getWatchlist({}).then(setWatchlist);
  }, []);

  const loadListings = useCallback((reset = false) => {
    const newOffset = reset ? 0 : offset;
    Space.getListings({
      search, brand: brandFilter, sold_filter: soldFilter, sort_by: sortBy,
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
  }, [search, brandFilter, soldFilter, sortBy, offset, listings]);

  useEffect(() => {
    setOffset(0);
    loadListings(true);
  }, [search, brandFilter, soldFilter, sortBy]);

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
                  <input type="text" placeholder="Search brand, model, ref, seller..."
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
                  onRefClick={handleRefClick}
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

      {/* Ref detail modal */}
      {refDetail && (
        <RefDetailModal refData={refDetail} onClose={() => setRefDetail(null)} />
      )}
    </SpaceRoot>
  );
}
