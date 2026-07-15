import { useState, useCallback, useEffect, useRef, useMemo, type CSSProperties } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, X, Images, LayoutGrid, StickyNote, Camera } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { galleryImages } from "@/data/gallery";
import { useDocumentMeta } from "@/hooks/useDocumentMeta";

const useScrollLock = (isLocked: boolean) => {
  const scrollYRef = useRef<number>(0);
  useEffect(() => {
    if (isLocked) {
      scrollYRef.current = window.scrollY;
      const sw = window.innerWidth - document.documentElement.clientWidth;
      document.body.style.position = "fixed";
      document.body.style.top = `-${scrollYRef.current}px`;
      document.body.style.left = "0";
      document.body.style.right = "0";
      document.body.style.width = "100%";
      if (sw > 0) document.body.style.paddingRight = `${sw}px`;
    } else {
      const y = scrollYRef.current;
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.left = "";
      document.body.style.right = "";
      document.body.style.width = "";
      document.body.style.paddingRight = "";
      window.scrollTo({ top: y, behavior: "instant" as ScrollBehavior });
    }
  }, [isLocked]);
};

const TILTS = [-3.2, 2.5, -1.4, 3.8, -2.6, 4.1, -3.7, 1.8, -2.2, 3.4, -1.1, 4.3];
type ViewMode = "polaroid" | "grid";

export default function GalleryPage() {
  useDocumentMeta({
    title: "Galeri - XII RPL 2",
    description: "Dokumentasi kegiatan kelas XII RPL 2 SMK INFOKOM - momen belajar, kolaborasi, dan kebersamaan.",
  });

  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [view, setView] = useState<ViewMode>("grid");

  useScrollLock(selectedIndex !== null);

  const total = galleryImages.length;
  const stats = useMemo(
    () => [
      { label: "Foto", value: total.toString().padStart(2, "0") },
      { label: "Momen", value: "∞" },
      { label: "Kelas", value: "XII RPL 2" },
    ],
    [total],
  );

  const goNext = useCallback((e?: React.MouseEvent) => {
    e?.stopPropagation();
    setSelectedIndex((prev) => (prev !== null ? (prev + 1) % total : null));
  }, [total]);

  const goPrev = useCallback((e?: React.MouseEvent) => {
    e?.stopPropagation();
    setSelectedIndex((prev) => (prev !== null ? (prev - 1 + total) % total : null));
  }, [total]);

  useEffect(() => {
    if (selectedIndex === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") goNext();
      if (e.key === "ArrowLeft") goPrev();
      if (e.key === "Escape") setSelectedIndex(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [selectedIndex, goNext, goPrev]);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* ─── HEADER ─────────────────────────────────────────── */}
      <section className="container-page pt-16 md:pt-24 pb-8">
        <div className="max-w-3xl">
          <motion.p initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="eyebrow">
            <Images size={12} /> Galeri
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }}
            className="mt-4 font-heading text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight text-foreground text-balance"
          >
            Momen yang <span className="italic font-normal text-muted-foreground">layak</span> dikenang.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
            className="mt-5 max-w-xl text-base md:text-lg text-muted-foreground text-pretty"
          >
            Dokumentasi kegiatan kelas XII RPL 2 pilih tampilan polaroid untuk suasana klasik,
            atau grid untuk menjelajah lebih cepat.
          </motion.p>

          <dl className="mt-10 grid grid-cols-3 gap-x-6 gap-y-5 border-t border-border pt-8 max-w-lg">
            {stats.map((s) => (
              <div key={s.label}>
                <dt className="text-xs font-medium uppercase tracking-[0.14em] text-muted-foreground">{s.label}</dt>
                <dd className="mt-2 font-heading text-2xl md:text-3xl font-semibold tracking-tight text-foreground tabular-nums">{s.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* ─── TOOLBAR ────────────────────────────────────────── */}
      <section className="container-page pb-8">
        <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4 border-t border-border pt-6">
          <p className="min-w-0 text-sm text-muted-foreground truncate">
            <span className="text-foreground font-medium tabular-nums">{total}</span> foto tersimpan · terbaru di atas
          </p>
          <div className="shrink-0 inline-flex rounded-full border border-border bg-surface p-1">
            <button
              onClick={() => setView("grid")}
              aria-pressed={view === "grid"}
              className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium transition-colors cursor-pointer ${view === "grid" ? "bg-[var(--ink)] text-[var(--background)]" : "text-muted-foreground hover:text-foreground"}`}
            >
              <LayoutGrid size={13} /> Grid
            </button>
            <button
              onClick={() => setView("polaroid")}
              aria-pressed={view === "polaroid"}
              className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium transition-colors cursor-pointer ${view === "polaroid" ? "bg-[var(--ink)] text-[var(--background)]" : "text-muted-foreground hover:text-foreground"}`}
            >
              <StickyNote size={13} /> Polaroid
            </button>
          </div>
        </div>
      </section>

      {/* ─── CONTENT ────────────────────────────────────────── */}
      <section className="pb-24">
        <div className="container-page">
          {total === 0 ? (
            <EmptyGallery />
          ) : view === "polaroid" ? (
            <div className="polaroid-grid">
              {galleryImages.map((img, i) => {
                const tilt = TILTS[i % TILTS.length];
                return (
                  <motion.div
                    key={img.id}
                    className="polaroid-item-wrap"
                    initial={{ opacity: 0, y: 24, scale: 0.92 }}
                    whileInView={{ opacity: 1, y: 0, scale: 1 }}
                    viewport={{ once: true, margin: "-40px" }}
                    transition={{ delay: Math.min(i * 0.04, 0.35), duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] }}
                  >
                    <div
                      className="polaroid-card"
                      style={{ "--tilt": `${tilt}deg` } as CSSProperties}
                      onClick={() => setSelectedIndex(i)}
                    >
                      <div className="polaroid-photo-area">
                        <img src={img.src} alt={img.title} loading="lazy" className="polaroid-img" />
                      </div>
                      <div className="polaroid-footer">
                        <span className="polaroid-caption">{img.title}</span>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          ) : (
            <div className="columns-2 sm:columns-3 lg:columns-4 gap-3 md:gap-4 [column-fill:_balance]">
              {galleryImages.map((img, i) => (
                <motion.button
                  key={img.id}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ delay: Math.min(i * 0.03, 0.3), duration: 0.35 }}
                  onClick={() => setSelectedIndex(i)}
                  className="gallery-tile group relative mb-3 block w-full break-inside-avoid overflow-hidden rounded-xl border border-border bg-surface text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-ring cursor-pointer md:mb-4"
                >
                  <img
                    src={img.src}
                    alt={img.title}
                    loading="lazy"
                    className="block h-auto w-full transition-transform duration-[600ms] group-hover:scale-[1.04]"
                  />
                  <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-[oklch(0.14_0.008_260/0.85)] to-transparent p-3 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    <p className="text-xs font-medium text-white line-clamp-1">{img.title}</p>
                    <p className="mt-0.5 text-[10px] uppercase tracking-widest text-white/70 tabular-nums">
                      {String(i + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
                    </p>
                  </div>
                </motion.button>
              ))}
            </div>
          )}
        </div>
      </section>

      <Footer />

      {/* ─── LIGHTBOX ───────────────────────────────────────── */}
      <AnimatePresence>
        {selectedIndex !== null && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 modal-overlay"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={() => setSelectedIndex(null)}
          >
            <button
              className="absolute top-4 right-4 z-10 grid h-10 w-10 place-items-center rounded-full bg-background/80 border border-border backdrop-blur transition-colors hover:bg-background cursor-pointer"
              onClick={() => setSelectedIndex(null)}
              aria-label="Tutup"
            >
              <X className="w-5 h-5 text-foreground" />
            </button>

            <button
              className="absolute left-3 md:left-6 top-1/2 -translate-y-1/2 z-10 grid h-11 w-11 place-items-center rounded-full bg-background/80 border border-border backdrop-blur transition-colors hover:bg-background cursor-pointer"
              onClick={goPrev}
              aria-label="Sebelumnya"
            >
              <ChevronLeft className="w-5 h-5 text-foreground" />
            </button>

            <button
              className="absolute right-3 md:right-6 top-1/2 -translate-y-1/2 z-10 grid h-11 w-11 place-items-center rounded-full bg-background/80 border border-border backdrop-blur transition-colors hover:bg-background cursor-pointer"
              onClick={goNext}
              aria-label="Berikutnya"
            >
              <ChevronRight className="w-5 h-5 text-foreground" />
            </button>

            <motion.div
              className="modal-content-box overflow-hidden flex flex-col items-stretch max-w-[92vw] w-auto"
              onClick={(e) => e.stopPropagation()}
              initial={{ opacity: 0, scale: 0.94, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94, y: 12 }}
              transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
            >
              <motion.img
                key={selectedIndex}
                src={galleryImages[selectedIndex].src}
                alt={galleryImages[selectedIndex].title}
                className="block max-w-full max-h-[70vh] object-contain bg-[oklch(0.14_0.008_260)]"
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.18 }}
              />
              <div className="w-full px-5 py-4 flex items-center justify-between gap-4 border-t border-border">
                <div className="min-w-0">
                  <p className="eyebrow !py-0.5"><Camera size={11} /> Dokumentasi</p>
                  <p className="mt-2 text-foreground font-heading font-semibold text-sm md:text-base truncate">
                    {galleryImages[selectedIndex].title}
                  </p>
                </div>
                <span className="shrink-0 text-xs text-muted-foreground font-mono tabular-nums">
                  {String(selectedIndex + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
                </span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function EmptyGallery() {
  return (
    <div className="tech-card px-6 py-16 text-center">
      <div className="mx-auto grid h-12 w-12 place-items-center rounded-xl icon-badge">
        <Images size={20} />
      </div>
      <h3 className="mt-4 font-heading text-lg font-semibold text-foreground">Belum ada foto</h3>
      <p className="mt-1 text-sm text-muted-foreground">Foto kegiatan akan tampil di sini begitu tersedia.</p>
    </div>
  );
}
