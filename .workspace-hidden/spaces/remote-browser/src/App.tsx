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
  Loader2,
} from "lucide-react";
import { Space } from "./actions";

export default function App() {
  const [url, setUrl] = useState("");
  const [displayUrl, setDisplayUrl] = useState("");
  const [pageTitle, setPageTitle] = useState("");
  const [screenshotSrc, setScreenshotSrc] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [autoRefresh, setAutoRefresh] = useState(true);
  const [textInput, setTextInput] = useState("");
  const [error, setError] = useState("");
  const [lastAction, setLastAction] = useState("");

  const imgRef = useRef<HTMLImageElement>(null);
  const refreshTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const isFetchingRef = useRef(false);

  // --- Auto-refresh screenshots at 500ms ---
  useEffect(() => {
    // Take initial screenshot
    takeScreenshot();
  }, []);

  useEffect(() => {
    if (autoRefresh) {
      refreshTimerRef.current = setInterval(() => {
        takeScreenshot(true);
      }, 500);
    }
    return () => {
      if (refreshTimerRef.current) clearInterval(refreshTimerRef.current);
    };
  }, [autoRefresh]);

  // --- Screenshot via CDP ---
  const takeScreenshot = useCallback(async (silent = false) => {
    if (isFetchingRef.current) return; // Skip if already fetching
    isFetchingRef.current = true;
    if (!silent) setLoading(true);
    try {
      const res = await Space.screenshot({});
      if (res.ok && res.image_base64) {
        setScreenshotSrc("data:image/jpeg;base64," + res.image_base64);
        if (res.url) setDisplayUrl(res.url);
        if (res.title) setPageTitle(res.title);
      }
    } catch {
      // Silent fail on auto-refresh
    } finally {
      isFetchingRef.current = false;
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
        setUrl("");
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
    const scaleX = img.naturalWidth / rect.width;
    const scaleY = img.naturalHeight / rect.height;
    const x = Math.round((e.clientX - rect.left) * scaleX);
    const y = Math.round((e.clientY - rect.top) * scaleY);

    setLastAction(`Click (${x}, ${y})`);
    try {
      await Space.click({ x, y });
      await new Promise((r) => setTimeout(r, 200));
      await takeScreenshot();
    } catch {
      setError("Click failed");
    }
    setLastAction("");
  };

  // --- Type text ---
  const handleTypeText = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!textInput) return;
    setLastAction("Typing…");
    try {
      await Space.typeText({ text: textInput, clear_first: false });
      setTextInput("");
      await new Promise((r) => setTimeout(r, 100));
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
      await new Promise((r) => setTimeout(r, 200));
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
      await new Promise((r) => setTimeout(r, 100));
      await takeScreenshot();
    } catch {
      setError("Scroll failed");
    }
    setLastAction("");
  };

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
          <form onSubmit={handleNavigate} className="flex-1 flex items-center gap-2">
            <Globe className="w-4 h-4 shrink-0" style={{ color: "var(--dim)" }} />
            <input
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

          <button
            onClick={() => setAutoRefresh(!autoRefresh)}
            className="p-1.5 rounded text-sm transition-colors"
            style={{
              background: autoRefresh ? "var(--accent)" : "var(--border)",
              color: autoRefresh ? "#000" : "var(--dim)",
            }}
            title={autoRefresh ? "Auto-refresh ON (500ms)" : "Auto-refresh OFF"}
          >
            <RefreshCw className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Page info bar */}
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
            {displayUrl && <span className="truncate opacity-60">{displayUrl}</span>}
          </div>
        )}

        {/* Screenshot area */}
        <div
          className="flex-1 relative overflow-hidden flex items-center justify-center"
          style={{ background: "#000" }}
        >
          {screenshotSrc ? (
            <img
              ref={imgRef}
              src={screenshotSrc}
              alt="Browser"
              onClick={handleClick}
              className="max-w-full max-h-full object-contain cursor-crosshair select-none"
              draggable={false}
            />
          ) : (
            <div className="flex flex-col items-center gap-3" style={{ color: "var(--dim)" }}>
              <MousePointer className="w-12 h-12 opacity-30" />
              <p className="text-sm font-mono">Connecting to browser…</p>
            </div>
          )}

          {loading && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/30">
              <Loader2 className="w-6 h-6 animate-spin" style={{ color: "var(--accent)" }} />
            </div>
          )}

          {lastAction && (
            <div
              className="absolute top-3 left-3 px-2 py-1 rounded text-xs font-mono"
              style={{ background: "rgba(0,0,0,0.7)", color: "var(--accent)" }}
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
              type="text"
              value={textInput}
              onChange={(e) => setTextInput(e.target.value)}
              placeholder="Type text…"
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
          <KeyBtn onClick={() => handleKey("Enter")} icon={<CornerDownLeft className="w-3.5 h-3.5" />} label="Enter" />
          <KeyBtn onClick={() => handleKey("Tab")} label="Tab" />
          <KeyBtn onClick={() => handleKey("Escape")} icon={<X className="w-3.5 h-3.5" />} label="Esc" />
          <KeyBtn onClick={() => handleKey("Backspace")} icon={<Delete className="w-3.5 h-3.5" />} label="Bksp" />
          <Sep />
          <KeyBtn onClick={() => handleScroll("up")} icon={<ChevronUp className="w-3.5 h-3.5" />} label="↑" />
          <KeyBtn onClick={() => handleScroll("down")} icon={<ChevronDown className="w-3.5 h-3.5" />} label="↓" />
          <Sep />
          <KeyBtn onClick={() => handleKey("ArrowUp")} icon={<ArrowUp className="w-3 h-3" />} label="" />
          <KeyBtn onClick={() => handleKey("ArrowDown")} icon={<ArrowDown className="w-3 h-3" />} label="" />
        </div>
      </div>
    </SpaceRoot>
  );
}

function KeyBtn({ onClick, icon, label }: { onClick: () => void; icon?: React.ReactNode; label: string }) {
  return (
    <button
      onClick={onClick}
      className="flex items-center gap-1 px-2 py-1 rounded text-xs font-mono transition-all active:scale-95 hover:opacity-80 shrink-0"
      style={{ background: "var(--border)", color: "var(--text)" }}
    >
      {icon}
      {label && <span>{label}</span>}
    </button>
  );
}

function Sep() {
  return <div className="w-px h-5 mx-1" style={{ background: "var(--border)" }} />;
}
