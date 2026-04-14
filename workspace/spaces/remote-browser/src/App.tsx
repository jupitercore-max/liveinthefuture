import { useState, useEffect, useRef, useCallback } from "react";
import { SpaceRoot } from "@hatch/sdk/components";
import {
  Globe,
  ArrowRight,
  CornerDownLeft,
  ArrowUp,
  ArrowDown,
  Delete,
  X,
  ChevronUp,
  ChevronDown,
  RefreshCw,
  Keyboard,
  MousePointer,
  Wifi,
  WifiOff,
  Loader2,
  Cookie,
} from "lucide-react";
import { Space } from "./actions";

// --- Types ---
type BrowserStatus = {
  chrome: boolean;
  proxy: boolean;
  ip: string;
};

// --- App ---
export default function App() {
  const [url, setUrl] = useState("");
  const [displayUrl, setDisplayUrl] = useState("");
  const [pageTitle, setPageTitle] = useState("");
  const [screenshotUrl, setScreenshotUrl] = useState<string | null>(null);
  const [status, setStatus] = useState<BrowserStatus>({ chrome: false, proxy: false, ip: "" });
  const [loading, setLoading] = useState(false);
  const [autoRefresh, setAutoRefresh] = useState(true);
  const [textInput, setTextInput] = useState("");
  const [initializing, setInitializing] = useState(true);
  const [error, setError] = useState("");
  const [lastAction, setLastAction] = useState("");
  const [cookieCount, setCookieCount] = useState(0);

  const imgRef = useRef<HTMLImageElement>(null);
  const urlInputRef = useRef<HTMLInputElement>(null);
  const textInputRef = useRef<HTMLInputElement>(null);
  const refreshTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // --- Initialize browser ---
  useEffect(() => {
    const init = async () => {
      try {
        const res = await Space.ensureBrowser({ with_proxy: true });
        setStatus({
          chrome: res.chrome_running ?? false,
          proxy: res.proxy_running ?? false,
          ip: res.ip ?? "",
        });
        if (res.ok) {
          await takeScreenshot();
        }
      } catch (e) {
        setError("Failed to initialize browser");
      } finally {
        setInitializing(false);
      }
    };
    init();
  }, []);

  // --- Auto-refresh screenshots ---
  useEffect(() => {
    if (autoRefresh && status.chrome && !initializing) {
      refreshTimerRef.current = setInterval(() => {
        takeScreenshot(true);
      }, 1500);
    }
    return () => {
      if (refreshTimerRef.current) clearInterval(refreshTimerRef.current);
    };
  }, [autoRefresh, status.chrome, initializing]);

  // --- Screenshot ---
  const takeScreenshot = useCallback(async (silent = false) => {
    if (!silent) setLoading(true);
    try {
      const res = await Space.screenshot({});
      if (res.ok && res.image_url) {
        setScreenshotUrl(res.image_url + "?t=" + Date.now());
        if (res.url) setDisplayUrl(res.url);
        if (res.title) setPageTitle(res.title);
      }
    } catch {
      // Silent fail on auto-refresh
    } finally {
      if (!silent) setLoading(false);
    }
  }, []);

  // --- Navigate ---
  const handleNavigate = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!url.trim()) return;
    setLoading(true);
    setLastAction("Navigating…");
    try {
      const res = await Space.navigate({ url: url.trim() });
      if (res.ok) {
        setDisplayUrl(res.url ?? url);
        setPageTitle(res.title ?? "");
        await takeScreenshot();
      } else {
        setError(res.error ?? "Navigation failed");
      }
    } catch {
      setError("Navigation failed");
    } finally {
      setLoading(false);
      setLastAction("");
    }
  };

  // --- Click ---
  const handleClick = async (e: React.MouseEvent<HTMLImageElement>) => {
    const img = imgRef.current;
    if (!img) return;

    const rect = img.getBoundingClientRect();
    const scaleX = 1280 / rect.width;
    const scaleY = 720 / rect.height;
    const x = Math.round((e.clientX - rect.left) * scaleX);
    const y = Math.round((e.clientY - rect.top) * scaleY);

    setLastAction(`Click (${x}, ${y})`);
    try {
      await Space.click({ x, y });
      // Small delay to let page react, then screenshot
      await new Promise((r) => setTimeout(r, 300));
      await takeScreenshot();
    } catch {
      setError("Click failed");
    }
    setLastAction("");
  };

  // --- Type text ---
  const handleTypeText = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!textInput.trim()) return;
    setLastAction("Typing…");
    try {
      await Space.typeText({ text: textInput, clear_first: true, use_react_trick: true });
      setTextInput("");
      await new Promise((r) => setTimeout(r, 200));
      await takeScreenshot();
    } catch {
      setError("Type failed");
    }
    setLastAction("");
  };

  // --- Press key ---
  const handleKey = async (key: string) => {
    setLastAction(`Key: ${key}`);
    try {
      await Space.pressKey({ key });
      await new Promise((r) => setTimeout(r, 300));
      await takeScreenshot();
    } catch {
      setError(`Key ${key} failed`);
    }
    setLastAction("");
  };

  // --- Scroll ---
  const handleScroll = async (direction: string) => {
    setLastAction(`Scroll ${direction}`);
    try {
      await Space.scroll({ direction, amount: 400 });
      await new Promise((r) => setTimeout(r, 200));
      await takeScreenshot();
    } catch {
      setError("Scroll failed");
    }
    setLastAction("");
  };

  // --- Extract cookies ---
  const handleExtractCookies = async () => {
    setLastAction("Saving cookies…");
    try {
      const res = await Space.extractCookies({});
      if (res.ok) {
        setCookieCount(res.cookie_count ?? 0);
        setLastAction(`Saved ${res.cookie_count} cookies`);
        setTimeout(() => setLastAction(""), 2000);
      } else {
        setError(res.error ?? "Cookie extraction failed");
        setLastAction("");
      }
    } catch {
      setError("Cookie extraction failed");
      setLastAction("");
    }
  };

  // --- Render ---
  if (initializing) {
    return (
      <SpaceRoot style={{ background: "var(--bg)" }}>
        <div className="flex flex-col items-center justify-center h-full gap-4">
          <Loader2 className="w-8 h-8 animate-spin" style={{ color: "var(--accent)" }} />
          <p className="text-base font-mono" style={{ color: "var(--dim)" }}>
            Starting browser…
          </p>
        </div>
      </SpaceRoot>
    );
  }

  return (
    <SpaceRoot style={{ background: "var(--bg)" }}>
      <div className="flex flex-col h-full" style={{ color: "var(--text)" }}>
        {/* URL Bar */}
        <div
          className="flex items-center gap-2 px-3 py-2 shrink-0"
          style={{
            background: "var(--surface)",
            borderBottom: "1px solid var(--border)",
          }}
        >
          {/* Status indicator */}
          <div className="flex items-center gap-1.5 shrink-0">
            {status.proxy ? (
              <Wifi className="w-3.5 h-3.5" style={{ color: "var(--accent)" }} />
            ) : (
              <WifiOff className="w-3.5 h-3.5" style={{ color: "var(--danger)" }} />
            )}
            <div
              className="w-2 h-2 rounded-full"
              style={{
                background: status.chrome ? "var(--accent)" : "var(--danger)",
              }}
            />
          </div>

          {/* URL input */}
          <form onSubmit={handleNavigate} className="flex-1 flex items-center gap-2">
            <Globe className="w-4 h-4 shrink-0" style={{ color: "var(--dim)" }} />
            <input
              ref={urlInputRef}
              type="text"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder={displayUrl || "Enter URL…"}
              className="flex-1 bg-transparent text-sm font-mono outline-none"
              style={{ color: "var(--text)" }}
            />
            <button
              type="submit"
              disabled={loading}
              className="p-1.5 rounded transition-colors hover:opacity-80"
              style={{ background: "var(--accent)", color: "#000" }}
            >
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </form>

          {/* Auto-refresh toggle */}
          <button
            onClick={() => setAutoRefresh(!autoRefresh)}
            className="p-1.5 rounded text-sm transition-colors"
            style={{
              background: autoRefresh ? "var(--accent)" : "var(--border)",
              color: autoRefresh ? "#000" : "var(--dim)",
            }}
            title={autoRefresh ? "Auto-refresh ON" : "Auto-refresh OFF"}
          >
            <RefreshCw className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Page title + current URL bar */}
        {(pageTitle || displayUrl) && (
          <div
            className="px-3 py-1 flex items-center gap-2 text-xs font-mono truncate shrink-0"
            style={{
              background: "var(--surface)",
              borderBottom: "1px solid var(--border)",
              color: "var(--dim)",
            }}
          >
            {pageTitle && <span className="truncate">{pageTitle}</span>}
            {pageTitle && displayUrl && <span>—</span>}
            {displayUrl && (
              <span className="truncate opacity-60">{displayUrl}</span>
            )}
          </div>
        )}

        {/* Screenshot area */}
        <div className="flex-1 relative overflow-hidden flex items-center justify-center" style={{ background: "#000" }}>
          {screenshotUrl ? (
            <img
              ref={imgRef}
              src={screenshotUrl}
              alt="Browser"
              onClick={handleClick}
              className="max-w-full max-h-full object-contain cursor-crosshair select-none"
              draggable={false}
              style={{
                imageRendering: "auto",
              }}
            />
          ) : (
            <div className="flex flex-col items-center gap-3" style={{ color: "var(--dim)" }}>
              <MousePointer className="w-12 h-12 opacity-30" />
              <p className="text-sm font-mono">No screenshot yet</p>
              {!status.chrome && (
                <p className="text-xs font-mono" style={{ color: "var(--danger)" }}>
                  Browser not running
                </p>
              )}
            </div>
          )}

          {/* Loading overlay */}
          {loading && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/30">
              <Loader2 className="w-6 h-6 animate-spin" style={{ color: "var(--accent)" }} />
            </div>
          )}

          {/* Action indicator */}
          {lastAction && (
            <div
              className="absolute top-3 left-3 px-2 py-1 rounded text-xs font-mono"
              style={{
                background: "rgba(0,0,0,0.7)",
                color: "var(--accent)",
              }}
            >
              {lastAction}
            </div>
          )}
        </div>

        {/* Error bar */}
        {error && (
          <div
            className="px-3 py-1.5 text-xs font-mono flex items-center justify-between shrink-0"
            style={{
              background: "rgba(255,68,68,0.1)",
              color: "var(--danger)",
              borderTop: "1px solid var(--danger)",
            }}
          >
            <span>{error}</span>
            <button onClick={() => setError("")} className="p-0.5">
              <X className="w-3 h-3" />
            </button>
          </div>
        )}

        {/* Text input bar */}
        <div
          className="shrink-0 flex items-center gap-2 px-3 py-2"
          style={{
            background: "var(--surface)",
            borderTop: "1px solid var(--border)",
          }}
        >
          <Keyboard className="w-4 h-4 shrink-0" style={{ color: "var(--dim)" }} />
          <form onSubmit={handleTypeText} className="flex-1 flex items-center gap-2">
            <input
              ref={textInputRef}
              type="text"
              value={textInput}
              onChange={(e) => setTextInput(e.target.value)}
              placeholder="Type text into focused element…"
              className="flex-1 bg-transparent text-sm font-mono outline-none"
              style={{ color: "var(--text)" }}
            />
            <button
              type="submit"
              className="px-2 py-1 rounded text-xs font-mono transition-colors hover:opacity-80"
              style={{ background: "var(--border)", color: "var(--text)" }}
            >
              Type
            </button>
          </form>
        </div>

        {/* Key buttons */}
        <div
          className="shrink-0 flex items-center gap-1.5 px-3 py-2 overflow-x-auto"
          style={{
            background: "var(--surface)",
            borderTop: "1px solid var(--border)",
          }}
        >
          <KeyButton onClick={() => handleKey("Enter")} icon={<CornerDownLeft className="w-3.5 h-3.5" />} label="Enter" />
          <KeyButton onClick={() => handleKey("Tab")} label="Tab" />
          <KeyButton onClick={() => handleKey("Escape")} icon={<X className="w-3.5 h-3.5" />} label="Esc" />
          <KeyButton onClick={() => handleKey("Backspace")} icon={<Delete className="w-3.5 h-3.5" />} label="Bksp" />
          <div className="w-px h-5 mx-1" style={{ background: "var(--border)" }} />
          <KeyButton onClick={() => handleScroll("up")} icon={<ChevronUp className="w-3.5 h-3.5" />} label="↑" />
          <KeyButton onClick={() => handleScroll("down")} icon={<ChevronDown className="w-3.5 h-3.5" />} label="↓" />
          <div className="w-px h-5 mx-1" style={{ background: "var(--border)" }} />
          <KeyButton onClick={() => handleKey("ArrowUp")} icon={<ArrowUp className="w-3 h-3" />} label="" />
          <KeyButton onClick={() => handleKey("ArrowDown")} icon={<ArrowDown className="w-3 h-3" />} label="" />
          <div className="w-px h-5 mx-1" style={{ background: "var(--border)" }} />
          <KeyButton onClick={handleExtractCookies} icon={<Cookie className="w-3.5 h-3.5" />} label="Save Cookies" />

          {/* Spacer */}
          <div className="flex-1" />

          {/* Status info */}
          <div className="flex items-center gap-2 text-xs font-mono" style={{ color: "var(--dim)" }}>
            {cookieCount > 0 && <span>🍪 {cookieCount}</span>}
            {status.ip && <span>IP: {status.ip}</span>}
          </div>
        </div>
      </div>
    </SpaceRoot>
  );
}

// --- Key Button Component ---
function KeyButton({
  onClick,
  icon,
  label,
}: {
  onClick: () => void;
  icon?: React.ReactNode;
  label: string;
}) {
  return (
    <button
      onClick={onClick}
      className="flex items-center gap-1 px-2 py-1 rounded text-xs font-mono transition-all active:scale-95 hover:opacity-80 shrink-0"
      style={{
        background: "var(--border)",
        color: "var(--text)",
      }}
    >
      {icon}
      {label && <span>{label}</span>}
    </button>
  );
}
