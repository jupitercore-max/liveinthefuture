import { useState, useCallback, useRef } from "react";
import { SpaceRoot } from "@hatch/sdk/components";
import {
  Space,
  type UploadPhotoResponse,
  type GetPeopleResponse,
  type GetPhotosResponse,
  type RecognizeFacesResponse,
} from "./actions";
import {
  Upload,
  Users,
  LayoutGrid,
  ScanFace,
  Check,
  User,
  ImagePlus,
  Sparkles,
} from "lucide-react";

/* ─── Types ─── */

type View = "upload" | "people" | "gallery" | "identify";

type FaceItem = UploadPhotoResponse["faces"][number] & {
  tagName?: string;
  tagged?: boolean;
};

type IconProps = { size?: number; strokeWidth?: number };

/* ─── Small UI Components ─── */

function Skeleton({ className = "", style }: { className?: string; style?: React.CSSProperties }) {
  return <div className={`skeleton-shimmer rounded-xl ${className}`} style={style} />;
}

function ConfidenceBar({ value }: { value: number }) {
  const color =
    value >= 70 ? "var(--success)" : value >= 40 ? "var(--warning)" : "var(--danger)";
  return (
    <div className="w-full h-1.5 rounded-full overflow-hidden" style={{ background: "var(--border)" }}>
      <div
        className="h-full rounded-full transition-all duration-700 ease-out"
        style={{ width: `${Math.min(value, 100)}%`, background: color }}
      />
    </div>
  );
}

function EmptyState({
  icon: Icon,
  title,
  subtitle,
}: {
  icon: React.ComponentType<IconProps>;
  title: string;
  subtitle: string;
}) {
  return (
    <div className="flex flex-col items-center justify-center py-16 sm:py-24 animate-fade-in-up">
      <div
        className="w-16 h-16 rounded-2xl flex items-center justify-center mb-5"
        style={{ background: "var(--space-surface-alt)" }}
      >
        <Icon size={28} strokeWidth={1.5} />
      </div>
      <p className="text-lg font-medium mb-1">{title}</p>
      <p className="text-sm" style={{ color: "var(--dim)" }}>
        {subtitle}
      </p>
    </div>
  );
}

/* ─── Tabs ─── */

const TABS: Array<{ id: View; label: string; icon: React.ComponentType<IconProps> }> = [
  { id: "upload", label: "Upload", icon: Upload },
  { id: "people", label: "People", icon: Users },
  { id: "gallery", label: "Gallery", icon: LayoutGrid },
  { id: "identify", label: "Identify", icon: ScanFace },
];

/* ─── Main App ─── */

export default function App() {
  const [view, setView] = useState<View>("upload");
  const [loading, setLoading] = useState(false);
  const [dragActive, setDragActive] = useState(false);

  /* Upload state */
  const [uploadResult, setUploadResult] = useState<UploadPhotoResponse | null>(null);
  const [faces, setFaces] = useState<FaceItem[]>([]);
  const [taggingFaceId, setTaggingFaceId] = useState<number | null>(null);
  const [tagInput, setTagInput] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  /* People state */
  const [peopleData, setPeopleData] = useState<GetPeopleResponse | null>(null);

  /* Gallery state */
  const [photosData, setPhotosData] = useState<GetPhotosResponse | null>(null);
  const [filterPersonId, setFilterPersonId] = useState<number | null>(null);

  /* Identify state */
  const [identifyResult, setIdentifyResult] = useState<RecognizeFacesResponse | null>(null);
  const identifyInputRef = useRef<HTMLInputElement>(null);
  const [identifyDragActive, setIdentifyDragActive] = useState(false);

  /* ─── Handlers (all action calls preserved exactly) ─── */

  const handleUpload = useCallback(async (file: File) => {
    setLoading(true);
    setUploadResult(null);
    setFaces([]);
    try {
      const reader = new FileReader();
      const b64 = await new Promise<string>((resolve) => {
        reader.onload = () => resolve(reader.result as string);
        reader.readAsDataURL(file);
      });
      const result = await Space.uploadPhoto({ image_base64: b64 });
      setUploadResult(result);
      setFaces((result.faces || []).map((f) => ({ ...f, tagged: false })));
    } catch (e) {
      console.error("Upload error:", e);
    }
    setLoading(false);
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setDragActive(false);
      const file = e.dataTransfer.files[0];
      if (file) handleUpload(file);
    },
    [handleUpload],
  );

  const handleTagFace = useCallback(async (faceId: number, name: string) => {
    if (!name.trim()) return;
    try {
      const result = await Space.tagFace({ face_id: faceId, name: name.trim() });
      setFaces((prev) =>
        prev.map((f) =>
          f.face_id === faceId ? { ...f, tagName: result.person_name, tagged: true } : f,
        ),
      );
      setTaggingFaceId(null);
      setTagInput("");
    } catch (e) {
      console.error("Tag error:", e);
    }
  }, []);

  const loadPeople = useCallback(async () => {
    setLoading(true);
    try {
      const result = await Space.getPeople({});
      setPeopleData(result);
    } catch (e) {
      console.error("People error:", e);
      setPeopleData({ people: [], total: 0 });
    }
    setLoading(false);
  }, []);

  const loadPhotos = useCallback(async (personId?: number | null) => {
    setLoading(true);
    try {
      const result = await Space.getPhotos({
        person_id: personId ?? undefined,
        limit: 50,
      });
      setPhotosData(result);
      setFilterPersonId(personId ?? null);
    } catch (e) {
      console.error("Photos error:", e);
      setPhotosData({ photos: [], total: 0 });
    }
    setLoading(false);
  }, []);

  const handleIdentify = useCallback(async (file: File) => {
    setLoading(true);
    setIdentifyResult(null);
    try {
      const reader = new FileReader();
      const b64 = await new Promise<string>((resolve) => {
        reader.onload = () => resolve(reader.result as string);
        reader.readAsDataURL(file);
      });
      const result = await Space.recognizeFaces({ image_base64: b64 });
      setIdentifyResult(result);
    } catch (e) {
      console.error("Identify error:", e);
    }
    setLoading(false);
  }, []);

  const switchView = useCallback(
    (v: View) => {
      setView(v);
      if (v === "people") loadPeople();
      if (v === "gallery") loadPhotos(null);
    },
    [loadPeople, loadPhotos],
  );

  const peopleList = peopleData?.people ?? [];
  const photosList = photosData?.photos ?? [];
  const peopleTotal = peopleData?.total ?? 0;
  const photosTotal = photosData?.total ?? 0;

  return (
    <SpaceRoot>
      <div
        className="min-h-screen"
        style={{ background: "var(--bg)", color: "var(--text)", fontFamily: "var(--font)" }}
      >
        {/* ─── Header ─── */}
        <header
          className="sticky top-0 z-50 backdrop-blur-xl"
          style={{
            background: "color-mix(in srgb, var(--bg) 80%, transparent)",
            borderBottom: "1px solid var(--border)",
          }}
        >
          <div className="max-w-5xl mx-auto px-5 sm:px-8 py-4 flex items-center justify-between">
            <h1 className="text-xl sm:text-2xl font-bold tracking-tight">Face Library</h1>
            <nav
              className="flex gap-0.5 p-1 rounded-xl"
              style={{ background: "var(--space-surface-alt)" }}
            >
              {TABS.map((tab) => {
                const active = view === tab.id;
                const TabIcon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => switchView(tab.id)}
                    className="flex items-center gap-1.5 px-3 sm:px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200"
                    style={{
                      background: active ? "var(--surface)" : "transparent",
                      color: active ? "var(--text)" : "var(--dim)",
                      boxShadow: active ? "var(--shadow-sm)" : "none",
                    }}
                  >
                    <TabIcon size={15} strokeWidth={active ? 2 : 1.5} />
                    <span className="hidden sm:inline">{tab.label}</span>
                  </button>
                );
              })}
            </nav>
          </div>
        </header>

        {/* ─── Content ─── */}
        <main className="max-w-5xl mx-auto px-5 sm:px-8 py-8 sm:py-10">

          {/* ═══ Upload View ═══ */}
          {view === "upload" && (
            <div className="animate-fade-in-up">
              {/* Dropzone */}
              {!uploadResult && !loading && (
                <div
                  onDrop={handleDrop}
                  onDragOver={(e) => {
                    e.preventDefault();
                    setDragActive(true);
                  }}
                  onDragEnter={() => setDragActive(true)}
                  onDragLeave={() => setDragActive(false)}
                  onClick={() => fileInputRef.current?.click()}
                  className="cursor-pointer rounded-2xl p-16 sm:p-20 text-center transition-all duration-300 group"
                  style={{
                    border: `2px dashed ${dragActive ? "var(--accent)" : "var(--border)"}`,
                    background: dragActive
                      ? "linear-gradient(135deg, color-mix(in srgb, var(--accent) 5%, transparent), color-mix(in srgb, var(--accent) 10%, transparent))"
                      : "var(--surface)",
                    boxShadow: dragActive ? "var(--shadow-glow)" : "var(--shadow-sm)",
                    transform: dragActive ? "scale(1.01)" : "scale(1)",
                  }}
                >
                  <div
                    className="w-20 h-20 mx-auto rounded-2xl flex items-center justify-center mb-6 transition-all duration-300 group-hover:scale-110"
                    style={{
                      background: dragActive
                        ? "color-mix(in srgb, var(--accent) 15%, transparent)"
                        : "var(--space-surface-alt)",
                    }}
                  >
                    <ImagePlus
                      size={36}
                      strokeWidth={1.5}
                      style={{ color: dragActive ? "var(--accent)" : "var(--dim)" }}
                    />
                  </div>
                  <p className="text-lg sm:text-xl font-semibold mb-2">
                    {dragActive ? "Drop to upload" : "Drop a photo here"}
                  </p>
                  <p className="text-sm" style={{ color: "var(--dim)" }}>
                    or click to browse · faces will be detected automatically
                  </p>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => {
                      const f = e.target.files?.[0];
                      if (f) handleUpload(f);
                    }}
                  />
                </div>
              )}

              {/* Upload loading skeleton */}
              {loading && !uploadResult && (
                <div className="space-y-6 animate-fade-in-up">
                  <div className="flex items-center gap-3">
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center"
                      style={{ background: "var(--space-surface-alt)" }}
                    >
                      <Sparkles size={18} style={{ color: "var(--accent)" }} className="animate-pulse" />
                    </div>
                    <div>
                      <p className="text-base font-medium">Detecting faces…</p>
                      <p className="text-sm" style={{ color: "var(--dim)" }}>
                        Analyzing your photo
                      </p>
                    </div>
                  </div>
                  <Skeleton className="w-full" style={{ height: 400 }} />
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    {[1, 2, 3, 4].map((i) => (
                      <Skeleton key={i} style={{ height: 180 }} />
                    ))}
                  </div>
                </div>
              )}

              {/* Upload results */}
              {uploadResult && (
                <div className="space-y-8 animate-scale-in">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
                        {uploadResult.num_faces} face{uploadResult.num_faces !== 1 ? "s" : ""}{" "}
                        detected
                      </h2>
                      <p className="text-sm mt-1" style={{ color: "var(--dim)" }}>
                        Click a face below to tag it
                      </p>
                    </div>
                    <button
                      onClick={() => {
                        setUploadResult(null);
                        setFaces([]);
                      }}
                      className="px-5 py-2.5 text-sm font-medium rounded-xl transition-all duration-200 hover:scale-[1.02]"
                      style={{
                        background: "var(--surface)",
                        border: "1px solid var(--border)",
                        boxShadow: "var(--shadow-sm)",
                      }}
                    >
                      Upload Another
                    </button>
                  </div>

                  {/* Photo with bounding boxes */}
                  <div
                    className="relative inline-block rounded-2xl overflow-hidden"
                    style={{ boxShadow: "var(--shadow-lg)" }}
                  >
                    {uploadResult.photo_base64 && (
                      <img
                        src={uploadResult.photo_base64}
                        alt="Uploaded"
                        className="max-w-full max-h-[500px] object-contain"
                      />
                    )}
                    {faces.map((face, idx) => (
                      <div
                        key={face.face_id}
                        className="absolute rounded-lg cursor-pointer transition-colors duration-200 animate-bbox"
                        style={{
                          left: `${face.bbox_x * 100}%`,
                          top: `${face.bbox_y * 100}%`,
                          width: `${face.bbox_w * 100}%`,
                          height: `${face.bbox_h * 100}%`,
                          border: `2px solid ${face.tagged ? "var(--success)" : "var(--accent)"}`,
                          boxShadow: face.tagged
                            ? "0 0 12px rgba(48,209,88,0.3)"
                            : "0 0 12px rgba(0,113,227,0.3)",
                          animationDelay: `${idx * 0.1}s`,
                        }}
                        onClick={() => {
                          setTaggingFaceId(face.face_id);
                          setTagInput("");
                        }}
                      />
                    ))}
                  </div>

                  {/* Face crops grid */}
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-5">
                    {faces.map((face, idx) => (
                      <div
                        key={face.face_id}
                        className="rounded-2xl overflow-hidden transition-all duration-300 hover:translate-y-[-2px] animate-fade-in-up"
                        style={{
                          background: "var(--surface)",
                          boxShadow: "var(--shadow-md)",
                          animationDelay: `${idx * 0.08}s`,
                        }}
                      >
                        {face.crop_base64 && (
                          <img
                            src={face.crop_base64}
                            alt="Face"
                            className="w-full aspect-square object-cover"
                          />
                        )}
                        <div className="p-3 space-y-2">
                          {/* Match suggestions */}
                          {Array.isArray(face.matches) &&
                            face.matches.length > 0 &&
                            !face.tagged && (
                              <div className="space-y-1.5">
                                <p
                                  className="text-xs font-semibold uppercase tracking-wide"
                                  style={{ color: "var(--dim)" }}
                                >
                                  Possible match
                                </p>
                                {face.matches
                                  .slice(0, 2)
                                  .map((m: Record<string, unknown>, i: number) => (
                                    <button
                                      key={i}
                                      onClick={() =>
                                        handleTagFace(face.face_id, String(m.name ?? ""))
                                      }
                                      className="w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 hover:scale-[1.02]"
                                      style={{ background: "var(--accent)", color: "#fff" }}
                                    >
                                      {String(m.name)}{" "}
                                      <span style={{ opacity: 0.7 }}>{String(m.confidence)}%</span>
                                    </button>
                                  ))}
                              </div>
                            )}

                          {/* Tagged state */}
                          {face.tagged ? (
                            <div className="flex items-center gap-2 py-1">
                              <div
                                className="w-5 h-5 rounded-full flex items-center justify-center"
                                style={{ background: "var(--success)" }}
                              >
                                <Check size={12} color="#fff" strokeWidth={3} />
                              </div>
                              <span className="text-sm font-semibold">{face.tagName}</span>
                            </div>
                          ) : taggingFaceId === face.face_id ? (
                            <form
                              onSubmit={(e) => {
                                e.preventDefault();
                                handleTagFace(face.face_id, tagInput);
                              }}
                              className="flex gap-2 animate-scale-in"
                            >
                              <input
                                autoFocus
                                value={tagInput}
                                onChange={(e) => setTagInput(e.target.value)}
                                placeholder="Name…"
                                className="flex-1 px-3 py-2 text-base rounded-lg outline-none transition-all duration-200"
                                style={{
                                  background: "var(--bg)",
                                  border: "1px solid var(--border)",
                                  color: "var(--text)",
                                }}
                              />
                              <button
                                type="submit"
                                className="px-4 py-2 text-sm rounded-lg font-semibold transition-all duration-200 hover:scale-[1.03]"
                                style={{ background: "var(--accent)", color: "#fff" }}
                              >
                                Tag
                              </button>
                            </form>
                          ) : (
                            <button
                              onClick={() => {
                                setTaggingFaceId(face.face_id);
                                setTagInput("");
                              }}
                              className="w-full text-sm py-2 rounded-lg font-medium transition-all duration-200 hover:scale-[1.02]"
                              style={{
                                background: "var(--bg)",
                                border: "1px solid var(--border)",
                              }}
                            >
                              Tag this face
                            </button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* ═══ People View ═══ */}
          {view === "people" && (
            <div className="animate-fade-in-up">
              <div className="mb-8">
                <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">People</h2>
                {peopleTotal > 0 && (
                  <p className="text-sm mt-1" style={{ color: "var(--dim)" }}>
                    {peopleTotal} {peopleTotal === 1 ? "person" : "people"} in your library
                  </p>
                )}
              </div>

              {/* Loading skeleton */}
              {loading && peopleList.length === 0 && (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 sm:gap-8">
                  {[1, 2, 3, 4, 5, 6].map((i) => (
                    <div key={i} className="flex flex-col items-center gap-3">
                      <Skeleton className="!rounded-full" style={{ width: 96, height: 96 }} />
                      <Skeleton style={{ width: 80, height: 16, borderRadius: 8 }} />
                      <Skeleton style={{ width: 48, height: 12, borderRadius: 6 }} />
                    </div>
                  ))}
                </div>
              )}

              {/* Empty */}
              {peopleList.length === 0 && !loading && (
                <EmptyState
                  icon={Users}
                  title="No people yet"
                  subtitle="Upload photos and tag faces to build your library"
                />
              )}

              {/* People grid */}
              {peopleList.length > 0 && (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 sm:gap-8">
                  {peopleList.map((p, idx) => (
                    <div
                      key={p.id}
                      className="flex flex-col items-center text-center cursor-pointer group animate-fade-in-up"
                      style={{ animationDelay: `${idx * 0.05}s` }}
                      onClick={() => {
                        setFilterPersonId(p.id);
                        loadPhotos(p.id);
                        setView("gallery");
                      }}
                    >
                      <div className="relative mb-3">
                        {p.thumbnail_base64 ? (
                          <img
                            src={p.thumbnail_base64}
                            alt={p.name}
                            className="w-24 h-24 rounded-full object-cover transition-all duration-300 group-hover:scale-105"
                            style={{
                              boxShadow: "var(--shadow-md)",
                              border: "3px solid var(--surface)",
                            }}
                          />
                        ) : (
                          <div
                            className="w-24 h-24 rounded-full flex items-center justify-center transition-all duration-300 group-hover:scale-105"
                            style={{
                              background: "var(--accent)",
                              boxShadow: "var(--shadow-md)",
                              border: "3px solid var(--surface)",
                            }}
                          >
                            <User size={32} color="#fff" strokeWidth={1.5} />
                          </div>
                        )}
                        {/* Glow ring on hover */}
                        <div
                          className="absolute inset-0 rounded-full transition-all duration-300 opacity-0 group-hover:opacity-100 pointer-events-none"
                          style={{ boxShadow: "var(--shadow-glow)" }}
                        />
                        {/* Photo count badge */}
                        <div
                          className="absolute -bottom-1 -right-1 min-w-7 h-7 px-1.5 rounded-full flex items-center justify-center text-xs font-bold"
                          style={{
                            background: "var(--surface)",
                            color: "var(--text)",
                            boxShadow: "var(--shadow-sm)",
                            border: "2px solid var(--bg)",
                          }}
                        >
                          {p.face_count}
                        </div>
                      </div>
                      <p className="font-semibold text-sm truncate max-w-full">{p.name}</p>
                      <p className="text-xs" style={{ color: "var(--dim)" }}>
                        {p.face_count} photo{p.face_count !== 1 ? "s" : ""}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* ═══ Gallery View ═══ */}
          {view === "gallery" && (
            <div className="animate-fade-in-up">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
                    {filterPersonId ? "Filtered Photos" : "Gallery"}
                  </h2>
                  {!filterPersonId && photosTotal > 0 && (
                    <p className="text-sm mt-1" style={{ color: "var(--dim)" }}>
                      {photosTotal} photo{photosTotal !== 1 ? "s" : ""}
                    </p>
                  )}
                </div>
                {filterPersonId && (
                  <button
                    onClick={() => loadPhotos(null)}
                    className="px-4 py-2 text-sm font-medium rounded-xl transition-all duration-200 hover:scale-[1.02]"
                    style={{
                      background: "var(--surface)",
                      border: "1px solid var(--border)",
                      boxShadow: "var(--shadow-sm)",
                    }}
                  >
                    Show All
                  </button>
                )}
              </div>

              {/* Loading skeleton */}
              {loading && photosList.length === 0 && (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                  {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                    <Skeleton key={i} className="aspect-square" />
                  ))}
                </div>
              )}

              {/* Empty */}
              {photosList.length === 0 && !loading && (
                <EmptyState
                  icon={LayoutGrid}
                  title="No photos yet"
                  subtitle="Upload photos to start your gallery"
                />
              )}

              {/* Photo grid */}
              {photosList.length > 0 && (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                  {photosList.map((p, idx) => (
                    <div
                      key={p.id}
                      className="relative rounded-2xl overflow-hidden group cursor-pointer animate-fade-in-up"
                      style={{
                        boxShadow: "var(--shadow-sm)",
                        animationDelay: `${idx * 0.04}s`,
                      }}
                    >
                      {p.thumbnail_base64 ? (
                        <img
                          src={p.thumbnail_base64}
                          alt={p.filename}
                          className="w-full aspect-square object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      ) : (
                        <div
                          className="w-full aspect-square flex items-center justify-center"
                          style={{ background: "var(--space-surface-alt)" }}
                        >
                          <LayoutGrid size={24} style={{ color: "var(--dim)" }} />
                        </div>
                      )}
                      {/* Info overlay — always visible on mobile, hover on desktop */}
                      <div
                        className="absolute inset-0 flex flex-col justify-end p-3 transition-opacity duration-300 sm:opacity-0 sm:group-hover:opacity-100"
                        style={{
                          background:
                            "linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.1) 60%, transparent 100%)",
                        }}
                      >
                        <p className="text-white text-xs font-medium">
                          {p.num_faces} face{p.num_faces !== 1 ? "s" : ""}
                        </p>
                        {Array.isArray(p.people_names) && p.people_names.length > 0 && (
                          <p className="text-white/80 text-xs truncate">
                            {p.people_names.join(", ")}
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* ═══ Identify View ═══ */}
          {view === "identify" && (
            <div className="animate-fade-in-up">
              <div className="mb-8">
                <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">Identify Faces</h2>
                <p className="text-sm mt-1" style={{ color: "var(--dim)" }}>
                  Upload a photo to match faces against your library
                </p>
              </div>

              {/* Dropzone */}
              {!identifyResult && !loading && (
                <div
                  onClick={() => identifyInputRef.current?.click()}
                  onDrop={(e) => {
                    e.preventDefault();
                    setIdentifyDragActive(false);
                    const f = e.dataTransfer.files[0];
                    if (f) handleIdentify(f);
                  }}
                  onDragOver={(e) => {
                    e.preventDefault();
                    setIdentifyDragActive(true);
                  }}
                  onDragEnter={() => setIdentifyDragActive(true)}
                  onDragLeave={() => setIdentifyDragActive(false)}
                  className="cursor-pointer rounded-2xl p-16 sm:p-20 text-center transition-all duration-300 group"
                  style={{
                    border: `2px dashed ${identifyDragActive ? "var(--accent)" : "var(--border)"}`,
                    background: identifyDragActive
                      ? "linear-gradient(135deg, color-mix(in srgb, var(--accent) 5%, transparent), color-mix(in srgb, var(--accent) 10%, transparent))"
                      : "var(--surface)",
                    boxShadow: identifyDragActive ? "var(--shadow-glow)" : "var(--shadow-sm)",
                    transform: identifyDragActive ? "scale(1.01)" : "scale(1)",
                  }}
                >
                  <div
                    className="w-20 h-20 mx-auto rounded-2xl flex items-center justify-center mb-6 transition-all duration-300 group-hover:scale-110"
                    style={{
                      background: identifyDragActive
                        ? "color-mix(in srgb, var(--accent) 15%, transparent)"
                        : "var(--space-surface-alt)",
                    }}
                  >
                    <ScanFace
                      size={36}
                      strokeWidth={1.5}
                      style={{ color: identifyDragActive ? "var(--accent)" : "var(--dim)" }}
                    />
                  </div>
                  <p className="text-lg sm:text-xl font-semibold mb-2">
                    {identifyDragActive ? "Drop to identify" : "Drop a photo to identify"}
                  </p>
                  <p className="text-sm" style={{ color: "var(--dim)" }}>
                    We'll match faces against your known people
                  </p>
                  <input
                    ref={identifyInputRef}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => {
                      const f = e.target.files?.[0];
                      if (f) handleIdentify(f);
                    }}
                  />
                </div>
              )}

              {/* Identify loading skeleton */}
              {loading && !identifyResult && (
                <div className="space-y-6 animate-fade-in-up">
                  <div className="flex items-center gap-3">
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center"
                      style={{ background: "var(--space-surface-alt)" }}
                    >
                      <ScanFace
                        size={18}
                        style={{ color: "var(--accent)" }}
                        className="animate-pulse"
                      />
                    </div>
                    <div>
                      <p className="text-base font-medium">Scanning faces…</p>
                      <p className="text-sm" style={{ color: "var(--dim)" }}>
                        Matching against your library
                      </p>
                    </div>
                  </div>
                  <Skeleton className="w-full" style={{ height: 400 }} />
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                    {[1, 2, 3].map((i) => (
                      <Skeleton key={i} style={{ height: 200 }} />
                    ))}
                  </div>
                </div>
              )}

              {/* Identify results */}
              {identifyResult && (
                <div className="space-y-8 animate-scale-in">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl sm:text-2xl font-bold">
                      {identifyResult.num_faces} face
                      {identifyResult.num_faces !== 1 ? "s" : ""} found
                    </h3>
                    <button
                      onClick={() => setIdentifyResult(null)}
                      className="px-5 py-2.5 text-sm font-medium rounded-xl transition-all duration-200 hover:scale-[1.02]"
                      style={{
                        background: "var(--surface)",
                        border: "1px solid var(--border)",
                        boxShadow: "var(--shadow-sm)",
                      }}
                    >
                      Try Another
                    </button>
                  </div>

                  {/* Photo with animated bounding boxes */}
                  {identifyResult.photo_base64 && (
                    <div
                      className="relative inline-block rounded-2xl overflow-hidden"
                      style={{ boxShadow: "var(--shadow-lg)" }}
                    >
                      <img
                        src={identifyResult.photo_base64}
                        alt="Identify"
                        className="max-w-full max-h-[500px] object-contain"
                      />
                      {(identifyResult.faces || []).map((face, idx) => (
                        <div
                          key={idx}
                          className="absolute rounded-lg animate-bbox"
                          style={{
                            left: `${face.bbox_x * 100}%`,
                            top: `${face.bbox_y * 100}%`,
                            width: `${face.bbox_w * 100}%`,
                            height: `${face.bbox_h * 100}%`,
                            border: `2px solid ${face.best_match_name ? "var(--success)" : "var(--warning)"}`,
                            boxShadow: face.best_match_name
                              ? "0 0 12px rgba(48,209,88,0.3)"
                              : "0 0 12px rgba(255,159,10,0.3)",
                            animationDelay: `${idx * 0.12}s`,
                          }}
                        />
                      ))}
                    </div>
                  )}

                  {/* Face match cards */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
                    {(identifyResult.faces || []).map((face, idx) => (
                      <div
                        key={idx}
                        className="rounded-2xl overflow-hidden animate-fade-in-up"
                        style={{
                          background: "var(--surface)",
                          boxShadow: "var(--shadow-md)",
                          animationDelay: `${idx * 0.08}s`,
                        }}
                      >
                        {face.crop_base64 && (
                          <img
                            src={face.crop_base64}
                            alt="Face"
                            className="w-full aspect-square object-cover"
                          />
                        )}
                        <div className="p-4 space-y-3">
                          {face.best_match_name ? (
                            <div className="flex items-center gap-2">
                              <div
                                className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0"
                                style={{ background: "var(--success)" }}
                              >
                                <Check size={14} color="#fff" strokeWidth={3} />
                              </div>
                              <span className="font-bold text-base">{face.best_match_name}</span>
                            </div>
                          ) : (
                            <p className="font-medium" style={{ color: "var(--dim)" }}>
                              Unknown face
                            </p>
                          )}

                          {/* Confidence bar */}
                          {Array.isArray(face.matches) && face.matches.length > 0 && (
                            <div className="space-y-1">
                              <div className="flex items-center justify-between">
                                <span
                                  className="text-xs font-medium"
                                  style={{ color: "var(--dim)" }}
                                >
                                  Confidence
                                </span>
                                <span className="text-xs font-bold">
                                  {face.matches[0].confidence}%
                                </span>
                              </div>
                              <ConfidenceBar value={face.matches[0].confidence} />
                            </div>
                          )}

                          {/* Other matches */}
                          {Array.isArray(face.matches) && face.matches.length > 1 && (
                            <div
                              className="space-y-2 pt-3"
                              style={{ borderTop: "1px solid var(--border)" }}
                            >
                              <p
                                className="text-xs font-semibold uppercase tracking-wide"
                                style={{ color: "var(--dim)" }}
                              >
                                Other matches
                              </p>
                              {face.matches.slice(1, 3).map((m, mi) => (
                                <div key={mi} className="flex items-center justify-between">
                                  <span className="text-sm">{m.name}</span>
                                  <div className="flex items-center gap-2">
                                    <div className="w-16">
                                      <ConfidenceBar value={m.confidence} />
                                    </div>
                                    <span
                                      className="text-xs font-medium w-8 text-right"
                                      style={{ color: "var(--dim)" }}
                                    >
                                      {m.confidence}%
                                    </span>
                                  </div>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </main>
      </div>
    </SpaceRoot>
  );
}
