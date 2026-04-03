import { useState, useCallback, useRef } from "react";
import { SpaceRoot } from "@hatch/sdk/components";
import {
  Space,
  type UploadPhotoResponse,
  type GetPeopleResponse,
  type GetPhotosResponse,
} from "./actions";

type View = "upload" | "people" | "gallery" | "identify";

type FaceItem = UploadPhotoResponse["faces"][number] & {
  tagName?: string;
  tagged?: boolean;
};

export default function App() {
  const [view, setView] = useState<View>("upload");
  const [loading, setLoading] = useState(false);

  const [uploadResult, setUploadResult] = useState<UploadPhotoResponse | null>(null);
  const [faces, setFaces] = useState<FaceItem[]>([]);
  const [taggingFaceId, setTaggingFaceId] = useState<number | null>(null);
  const [tagInput, setTagInput] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [peopleData, setPeopleData] = useState<GetPeopleResponse | null>(null);

  const [photosData, setPhotosData] = useState<GetPhotosResponse | null>(null);
  const [filterPersonId, setFilterPersonId] = useState<number | null>(null);

  const [identifyResult, setIdentifyResult] = useState<{
    num_faces: number;
    faces: Array<{
      bbox_x: number; bbox_y: number; bbox_w: number; bbox_h: number;
      crop_base64: string; best_match_name: string | null;
      matches: Array<{ person_id: number; name: string; distance: number; confidence: number }>;
    }>;
    photo_base64: string;
  } | null>(null);
  const identifyInputRef = useRef<HTMLInputElement>(null);

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

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) handleUpload(file);
  }, [handleUpload]);

  const handleTagFace = useCallback(async (faceId: number, name: string) => {
    if (!name.trim()) return;
    try {
      const result = await Space.tagFace({ face_id: faceId, name: name.trim() });
      setFaces((prev) =>
        prev.map((f) =>
          f.face_id === faceId ? { ...f, tagName: result.person_name, tagged: true } : f
        )
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

  const switchView = useCallback((v: View) => {
    setView(v);
    if (v === "people") loadPeople();
    if (v === "gallery") loadPhotos(null);
  }, [loadPeople, loadPhotos]);

  const peopleList = peopleData?.people ?? [];
  const photosList = photosData?.photos ?? [];
  const peopleTotal = peopleData?.total ?? 0;
  const photosTotal = photosData?.total ?? 0;

  return (
    <SpaceRoot>
      <div className="min-h-screen" style={{ background: "var(--bg)", color: "var(--text)", fontFamily: "var(--font)" }}>
        {/* Header */}
        <header className="sticky top-0 z-50 backdrop-blur-md" style={{ borderBottom: "1px solid var(--border)" }}>
          <div className="max-w-6xl mx-auto px-4 sm:px-5 py-3 sm:py-4 flex items-center justify-between">
            <h1 className="text-lg sm:text-xl font-semibold tracking-tight">Face Library</h1>
            <nav className="flex gap-1">
              {(["upload", "people", "gallery", "identify"] as View[]).map((v) => (
                <button
                  key={v}
                  onClick={() => switchView(v)}
                  className="px-3 sm:px-4 py-2 text-sm font-medium rounded-md transition-colors"
                  style={{
                    background: view === v ? "var(--accent)" : "transparent",
                    color: view === v ? "#fff" : "var(--dim)",
                  }}
                >
                  {v === "upload" ? "Upload" : v === "people" ? "People" : v === "gallery" ? "Gallery" : "Identify"}
                </button>
              ))}
            </nav>
          </div>
        </header>

        <main className="max-w-6xl mx-auto px-4 sm:px-5 py-6 sm:py-8">
          {loading && (
            <div className="mb-6">
              <div className="h-1 rounded-full overflow-hidden" style={{ background: "var(--border)" }}>
                <div className="h-full rounded-full animate-pulse" style={{ background: "var(--accent)", width: "60%" }} />
              </div>
              <p className="text-sm mt-2" style={{ color: "var(--dim)" }}>Processing faces...</p>
            </div>
          )}

          {/* Upload View */}
          {view === "upload" && (
            <div>
              {!uploadResult && (
                <div
                  onDrop={handleDrop}
                  onDragOver={(e) => e.preventDefault()}
                  onClick={() => fileInputRef.current?.click()}
                  className="cursor-pointer rounded-lg p-12 sm:p-16 text-center transition-all hover:scale-[1.01]"
                  style={{ border: "2px dashed var(--border)", background: "var(--surface)" }}
                >
                  <div className="text-5xl mb-4">📸</div>
                  <p className="text-base sm:text-lg font-medium">Drop a photo here or click to upload</p>
                  <p className="text-sm mt-2" style={{ color: "var(--dim)" }}>
                    Faces will be detected automatically
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

              {uploadResult && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h2 className="text-xl sm:text-2xl font-semibold">
                      {uploadResult.num_faces} face{uploadResult.num_faces !== 1 ? "s" : ""} detected
                    </h2>
                    <button
                      onClick={() => { setUploadResult(null); setFaces([]); }}
                      className="px-4 py-2 text-sm rounded-md"
                      style={{ background: "var(--surface)", border: "1px solid var(--border)" }}
                    >
                      Upload Another
                    </button>
                  </div>

                  <div className="relative inline-block rounded-lg overflow-hidden" style={{ background: "var(--surface)" }}>
                    {uploadResult.photo_base64 && (
                      <img
                        src={uploadResult.photo_base64}
                        alt="Uploaded"
                        className="max-w-full max-h-[500px] object-contain"
                      />
                    )}
                    {faces.map((face) => (
                      <div
                        key={face.face_id}
                        className="absolute border-2 rounded cursor-pointer transition-colors"
                        style={{
                          left: `${face.bbox_x * 100}%`,
                          top: `${face.bbox_y * 100}%`,
                          width: `${face.bbox_w * 100}%`,
                          height: `${face.bbox_h * 100}%`,
                          borderColor: face.tagged ? "var(--success)" : "var(--accent)",
                        }}
                        onClick={() => { setTaggingFaceId(face.face_id); setTagInput(""); }}
                      />
                    ))}
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                    {faces.map((face) => (
                      <div
                        key={face.face_id}
                        className="rounded-lg p-3 space-y-2"
                        style={{ background: "var(--surface)", border: "1px solid var(--border)" }}
                      >
                        {face.crop_base64 && (
                          <img src={face.crop_base64} alt="Face" className="w-full aspect-square object-cover rounded" />
                        )}

                        {Array.isArray(face.matches) && face.matches.length > 0 && !face.tagged && (
                          <div className="space-y-1">
                            <p className="text-xs font-medium" style={{ color: "var(--dim)" }}>Possible match:</p>
                            {face.matches.slice(0, 2).map((m: Record<string, unknown>, i: number) => (
                              <button
                                key={i}
                                onClick={() => handleTagFace(face.face_id, String(m.name ?? ""))}
                                className="w-full text-left px-2 py-1 rounded text-sm transition-colors hover:opacity-80"
                                style={{ background: "var(--accent)", color: "#fff" }}
                              >
                                {String(m.name)} ({String(m.confidence)}%)
                              </button>
                            ))}
                          </div>
                        )}

                        {face.tagged ? (
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-medium" style={{ color: "var(--success)" }}>✓</span>
                            <span className="text-sm font-medium">{face.tagName}</span>
                          </div>
                        ) : taggingFaceId === face.face_id ? (
                          <form
                            onSubmit={(e) => { e.preventDefault(); handleTagFace(face.face_id, tagInput); }}
                            className="flex gap-2"
                          >
                            <input
                              autoFocus
                              value={tagInput}
                              onChange={(e) => setTagInput(e.target.value)}
                              placeholder="Name..."
                              className="flex-1 px-2 py-1 text-base rounded"
                              style={{ background: "var(--bg)", border: "1px solid var(--border)", color: "var(--text)" }}
                            />
                            <button
                              type="submit"
                              className="px-3 py-1 text-sm rounded font-medium"
                              style={{ background: "var(--accent)", color: "#fff" }}
                            >
                              Tag
                            </button>
                          </form>
                        ) : (
                          <button
                            onClick={() => { setTaggingFaceId(face.face_id); setTagInput(""); }}
                            className="w-full text-sm py-1 rounded transition-colors"
                            style={{ background: "var(--bg)", border: "1px solid var(--border)" }}
                          >
                            Tag this face
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* People View */}
          {view === "people" && (
            <div>
              <h2 className="text-xl sm:text-2xl font-semibold mb-6">
                {peopleTotal > 0 ? `${peopleTotal} people` : "People"}
              </h2>
              {peopleList.length === 0 && !loading && (
                <p style={{ color: "var(--dim)" }}>No tagged faces yet. Upload photos and tag faces to build your library.</p>
              )}
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {peopleList.map((p) => (
                  <div
                    key={p.id}
                    className="rounded-lg p-4 text-center cursor-pointer transition-transform hover:scale-[1.02]"
                    style={{ background: "var(--surface)", border: "1px solid var(--border)" }}
                    onClick={() => { setFilterPersonId(p.id); loadPhotos(p.id); setView("gallery"); }}
                  >
                    {p.thumbnail_base64 ? (
                      <img src={p.thumbnail_base64} alt={p.name} className="w-20 h-20 mx-auto rounded-full object-cover mb-3" />
                    ) : (
                      <div
                        className="w-20 h-20 mx-auto rounded-full mb-3 flex items-center justify-center text-2xl font-bold"
                        style={{ background: "var(--accent)", color: "#fff" }}
                      >
                        {p.name.charAt(0).toUpperCase()}
                      </div>
                    )}
                    <p className="font-medium text-sm">{p.name}</p>
                    <p className="text-xs" style={{ color: "var(--dim)" }}>
                      {p.face_count} photo{p.face_count !== 1 ? "s" : ""}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Gallery View */}
          {view === "gallery" && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl sm:text-2xl font-semibold">
                  {filterPersonId ? "Filtered Photos" : `All Photos (${photosTotal})`}
                </h2>
                {filterPersonId && (
                  <button
                    onClick={() => loadPhotos(null)}
                    className="text-sm px-3 py-1 rounded"
                    style={{ background: "var(--surface)", border: "1px solid var(--border)" }}
                  >
                    Show All
                  </button>
                )}
              </div>
              {photosList.length === 0 && !loading && (
                <p style={{ color: "var(--dim)" }}>No photos yet. Upload some!</p>
              )}
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                {photosList.map((p) => (
                  <div
                    key={p.id}
                    className="rounded-lg overflow-hidden"
                    style={{ background: "var(--surface)", border: "1px solid var(--border)" }}
                  >
                    {p.thumbnail_base64 && (
                      <img src={p.thumbnail_base64} alt={p.filename} className="w-full aspect-square object-cover" />
                    )}
                    <div className="p-2">
                      <p className="text-xs" style={{ color: "var(--dim)" }}>
                        {p.num_faces} face{p.num_faces !== 1 ? "s" : ""}
                      </p>
                      {Array.isArray(p.people_names) && p.people_names.length > 0 && (
                        <p className="text-xs font-medium truncate">{p.people_names.join(", ")}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Identify View */}
          {view === "identify" && (
            <div>
              <h2 className="text-xl sm:text-2xl font-semibold mb-6">Identify Faces</h2>
              <p className="text-sm mb-4" style={{ color: "var(--dim)" }}>
                Upload a photo and we'll match faces against your library.
              </p>

              {!identifyResult && (
                <div
                  onClick={() => identifyInputRef.current?.click()}
                  onDrop={(e) => { e.preventDefault(); const f = e.dataTransfer.files[0]; if (f) handleIdentify(f); }}
                  onDragOver={(e) => e.preventDefault()}
                  className="cursor-pointer rounded-lg p-12 sm:p-16 text-center"
                  style={{ border: "2px dashed var(--border)", background: "var(--surface)" }}
                >
                  <div className="text-5xl mb-4">🔍</div>
                  <p className="text-base sm:text-lg font-medium">Drop a photo to identify</p>
                  <input
                    ref={identifyInputRef}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => { const f = e.target.files?.[0]; if (f) handleIdentify(f); }}
                  />
                </div>
              )}

              {identifyResult && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg sm:text-xl font-medium">
                      {identifyResult.num_faces} face{identifyResult.num_faces !== 1 ? "s" : ""} found
                    </h3>
                    <button
                      onClick={() => setIdentifyResult(null)}
                      className="px-4 py-2 text-sm rounded-md"
                      style={{ background: "var(--surface)", border: "1px solid var(--border)" }}
                    >
                      Try Another
                    </button>
                  </div>

                  {identifyResult.photo_base64 && (
                    <div className="relative inline-block rounded-lg overflow-hidden">
                      <img src={identifyResult.photo_base64} alt="Identify" className="max-w-full max-h-[500px] object-contain" />
                    </div>
                  )}

                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                    {(identifyResult.faces || []).map((face, idx) => (
                      <div
                        key={idx}
                        className="rounded-lg p-3 space-y-2"
                        style={{ background: "var(--surface)", border: "1px solid var(--border)" }}
                      >
                        {face.crop_base64 && (
                          <img src={face.crop_base64} alt="Face" className="w-full aspect-square object-cover rounded" />
                        )}
                        {face.best_match_name ? (
                          <div>
                            <p className="font-medium text-sm" style={{ color: "var(--success)" }}>
                              ✓ {face.best_match_name}
                            </p>
                            {Array.isArray(face.matches) && face.matches.length > 0 && (
                              <p className="text-xs" style={{ color: "var(--dim)" }}>
                                {face.matches[0].confidence}% confidence
                              </p>
                            )}
                          </div>
                        ) : (
                          <p className="text-sm" style={{ color: "var(--dim)" }}>Unknown face</p>
                        )}
                        {Array.isArray(face.matches) && face.matches.length > 1 && (
                          <div className="text-xs space-y-1" style={{ color: "var(--dim)" }}>
                            {face.matches.slice(1, 3).map((m, mi) => (
                              <p key={mi}>{m.name} ({m.confidence}%)</p>
                            ))}
                          </div>
                        )}
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
