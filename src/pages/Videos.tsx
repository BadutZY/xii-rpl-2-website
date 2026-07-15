import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Play, Video as VideoIcon, Search, Youtube, Instagram, FileVideo, X } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import VideoModal from "@/components/VideoModal";
import {
  videos,
  videoCategories,
  formatDuration,
  getYouTubeThumbnail,
  type VideoItem,
} from "@/data/videos";
import { useVideoDuration } from "@/hooks/useVideoDuration";
import { useDocumentMeta } from "@/hooks/useDocumentMeta";

export default function VideosPage() {
  useDocumentMeta({
    title: "Video - XII RPL 2",
    description: "Media library kelas XII RPL 2 - vlog, drama pentas seni, video pembelajaran, dan dokumentasi kegiatan.",
  });

  const [active, setActive] = useState<VideoItem | null>(null);
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<string>("all");

  const stats = useMemo(
    () => [
      { label: "Video", value: videos.length.toString().padStart(2, "0") },
      { label: "Kategori", value: videoCategories.length.toString().padStart(2, "0") },
      { label: "Sumber", value: "Youtube · Local" },
    ],
    [],
  );

  const filtered = useMemo(() => {
    const q = query.toLowerCase().trim();
    return videos.filter((v) => {
      if (category !== "all" && v.categoryId !== category) return false;
      if (!q) return true;
      return (
        v.title.toLowerCase().includes(q) ||
        (v.description ?? "").toLowerCase().includes(q)
      );
    });
  }, [query, category]);

  const categoryTitle = (id: string) =>
    videoCategories.find((c) => c.id === id)?.title ?? id;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="container-page py-16 md:py-24">
        {/* ─── HEADER ─────────────────────────────────────── */}
        <div className="max-w-3xl">
          <motion.p initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="eyebrow">
            <VideoIcon size={12} /> Arsip video
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }}
            className="mt-4 font-heading text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight text-foreground text-balance"
          >
            Koleksi <span className="italic font-normal text-muted-foreground">video</span> kelas.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
            className="mt-5 max-w-xl text-base md:text-lg text-muted-foreground text-pretty"
          >
            Media library kelas XII RPL 2 dari vlog dan pentas seni hingga video pembelajaran. Cari, saring
            berdasarkan kategori, atau langsung jelajahi semuanya.
          </motion.p>

          <dl className="mt-10 grid grid-cols-3 gap-x-6 gap-y-5 border-t border-border pt-8 max-w-lg">
            {stats.map((s) => (
              <div key={s.label}>
                <dt className="text-xs font-medium uppercase tracking-[0.14em] text-muted-foreground">{s.label}</dt>
                <dd className="mt-2 font-heading text-xl md:text-2xl font-semibold tracking-tight text-foreground tabular-nums">{s.value}</dd>
              </div>
            ))}
          </dl>
        </div>

        {/* ─── TOOLBAR ────────────────────────────────────── */}
        <div className="mt-12 border-t border-border pt-6 grid gap-4 md:grid-cols-[minmax(0,1fr)_auto] md:items-center">
          <div className="relative min-w-0">
            <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              placeholder="Cari judul atau deskripsi video..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="search-input w-full pl-10 pr-10 py-2.5 text-sm"
            />
            {query && (
              <button
                onClick={() => setQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 grid h-6 w-6 place-items-center rounded-full text-muted-foreground hover:text-foreground hover:bg-muted cursor-pointer"
                aria-label="Bersihkan"
              >
                <X size={14} />
              </button>
            )}
          </div>
          <p className="text-xs text-muted-foreground tabular-nums shrink-0 md:text-right">
            <span className="text-foreground font-medium">{filtered.length}</span> dari {videos.length} video
          </p>
        </div>

        <div className="mt-4 -mx-5 md:mx-0 overflow-x-auto scrollbar-none">
          <div className="flex gap-2 px-5 md:px-0 md:flex-wrap min-w-max md:min-w-0">
            <FilterPill active={category === "all"} onClick={() => setCategory("all")}>
              Semua <span className="ml-1.5 opacity-60 tabular-nums">{videos.length}</span>
            </FilterPill>
            {videoCategories.map((c) => {
              const count = videos.filter((v) => v.categoryId === c.id).length;
              return (
                <FilterPill key={c.id} active={category === c.id} onClick={() => setCategory(c.id)}>
                  {c.title} <span className="ml-1.5 opacity-60 tabular-nums">{count}</span>
                </FilterPill>
              );
            })}
          </div>
        </div>

        {/* ─── GRID ───────────────────────────────────────── */}
        <div className="mt-10">
          {filtered.length === 0 ? (
            <div className="tech-card px-6 py-16 text-center">
              <div className="mx-auto grid h-12 w-12 place-items-center rounded-xl icon-badge">
                <VideoIcon size={20} />
              </div>
              <h3 className="mt-4 font-heading text-lg font-semibold text-foreground">Tidak ada video</h3>
              <p className="mt-1 text-sm text-muted-foreground">Coba ubah kata kunci pencarian atau pilih kategori lain.</p>
              {(query || category !== "all") && (
                <button
                  onClick={() => { setQuery(""); setCategory("all"); }}
                  className="btn-secondary-outline mt-5 inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-xs font-medium"
                >
                  Reset filter
                </button>
              )}
            </div>
          ) : (
            <AnimatePresence mode="popLayout">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
                {filtered.map((v, i) => (
                  <VideoCard
                    key={v.id}
                    video={v}
                    index={i}
                    onPlay={() => setActive(v)}
                    categoryTitle={categoryTitle(v.categoryId)}
                  />
                ))}
              </div>
            </AnimatePresence>
          )}
        </div>
      </main>

      <Footer />

      <VideoModal video={active} onClose={() => setActive(null)} />
    </div>
  );
}

function FilterPill({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      aria-pressed={active}
      className={`filter-btn inline-flex items-center px-3.5 py-1.5 rounded-full text-xs font-medium shrink-0 ${active ? "active" : ""}`}
    >
      {children}
    </button>
  );
}

function VideoCard({
  video,
  index,
  onPlay,
  categoryTitle,
}: {
  video: VideoItem;
  index: number;
  onPlay: () => void;
  categoryTitle: string;
}) {
  const duration = useVideoDuration(video);
  const thumb = video.thumbnail ?? (video.type === "youtube" ? getYouTubeThumbnail(video.src) : null);
  const TypeIcon = video.type === "youtube" ? Youtube : video.type === "instagram" ? Instagram : FileVideo;
  const typeLabel = video.type === "youtube" ? "YouTube" : video.type === "instagram" ? "Instagram" : "Video";

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 8 }}
      transition={{ delay: Math.min(index * 0.03, 0.3), duration: 0.35 }}
    >
      <button
        type="button"
        onClick={onPlay}
        className="tech-card group block w-full text-left overflow-hidden focus:outline-none focus-visible:ring-2 focus-visible:ring-ring cursor-pointer p-0"
      >
        <div className="relative aspect-video bg-[oklch(0.14_0.008_260)] overflow-hidden">
          {thumb ? (
            <img
              src={thumb}
              alt={video.title}
              loading="lazy"
              className="w-full h-full object-cover transition-transform duration-[600ms] group-hover:scale-[1.04]"
            />
          ) : (
            <div className="absolute inset-0 grid place-items-center bg-[var(--surface-2)]">
              <TypeIcon className="w-10 h-10 text-muted-foreground" />
            </div>
          )}

          <div className="absolute inset-0 bg-gradient-to-t from-[oklch(0.05_0.008_260/0.55)] via-transparent to-transparent" />

          <div className="absolute inset-0 grid place-items-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="grid h-14 w-14 place-items-center rounded-full bg-background/95 shadow-[var(--shadow-lg)] scale-90 group-hover:scale-100 transition-transform duration-300">
              <Play className="w-5 h-5 text-foreground ml-0.5" fill="currentColor" />
            </div>
          </div>

          <span className="absolute top-2.5 left-2.5 inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-background/85 border border-border backdrop-blur text-foreground text-[11px] font-medium">
            <TypeIcon className="w-3 h-3" /> {typeLabel}
          </span>

          <span className="absolute bottom-2.5 right-2.5 px-1.5 py-0.5 rounded bg-[oklch(0.14_0.008_260/0.85)] text-white text-[11px] font-mono tabular-nums">
            {duration === null ? "…" : duration > 0 ? formatDuration(duration) : "LIVE"}
          </span>
        </div>

        <div className="p-4">
          <p className="text-[10px] font-medium uppercase tracking-[0.14em] text-muted-foreground">
            {categoryTitle}
          </p>
          <h3 className="mt-1.5 font-heading font-semibold text-foreground line-clamp-2 leading-snug">
            {video.title}
          </h3>
          {video.description && (
            <p className="mt-1.5 text-sm text-muted-foreground line-clamp-2 leading-relaxed">{video.description}</p>
          )}
        </div>
      </button>
    </motion.div>
  );
}
