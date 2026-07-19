import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowRight,
  ArrowUpRight,
  Code2,
  Database,
  Cpu,
  Users,
  CalendarDays,
  Images,
  PlayCircle,
  Sparkles,
  Download,
  Smartphone,
  ShieldCheck,
  WifiOff,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import heroImage from "@/assets/hero-class.jpeg";
import { studentsData } from "@/data/students";
import { teachersData } from "@/data/teachers";
import { useDocumentMeta } from "@/hooks/useDocumentMeta";

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.06, duration: 0.5, ease: [0.22, 1, 0.36, 1] as const },
  }),
};

const stats = [
  { label: "Murid aktif", value: studentsData.length.toString().padStart(2, "0") },
  { label: "Wali Kelas", value: teachersData.length.toString().padStart(2, "0") },
  { label: "Hari sekolah", value: "05" },
];

// Ganti path, versi, dan ukuran file sesuai file .apk yang kamu upload ke folder /public.
const APK_DOWNLOAD = {
  url: "https://github.com/BadutZY/xi-rpl-2-app/releases/download/NEW-APP/xii-rpl-2.apk",
  version: "1.5.0",
  size: "150 MB",
};

const lessons = [
  {
    icon: Code2,
    title: "Web dan App Development",
    desc: "Membangun aplikasi web modern dengan pendekatan berbasis proyek, dari markup hingga deployment.",
    tags: [{ label: " ", cls: "-" }],
  },
  {
    icon: Database,
    title: "Pemrograman GIM",
    desc: "Merancang dan mengembangkan sebuah permainan digital dengan mengatur berbagai elemen serta aturan yang membuat permainan dapat berjalan sesuai dengan konsep yang telah dirancang.",
    tags: [{ label: " ", cls: "-" },],
  },
  {
    icon: Cpu,
    title: "Robotika",
    desc: "Perancangan perangkat, pemrograman kontroler, dan integrasi sensor untuk sistem otomatis.",
    tags: [{ label: " ", cls: "-" },],
  },
];

export default function HomePage() {
  useDocumentMeta({
    title: "XII RPL 2 - SMK INFOKOM",
    description:
      "Pusat informasi kelas XII RPL 2 SMK INFOKOM. Jadwal, murid & guru, galeri kegiatan, dan arsip video kelas - dirancang bersih dan modern.",
  });

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* ─── HERO ─────────────────────────────────────────────── */}
      <section id="home" className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 grid-pattern opacity-[0.5]" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-background" />

        <div className="container-page relative pt-16 md:pt-24 pb-20 md:pb-28">
          <motion.div
            className="flex justify-center md:justify-start"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
          </motion.div>

          <div className="mt-6 grid gap-10 lg:grid-cols-[1.15fr_1fr] lg:items-end">
            <div>
              <h1 className="font-heading text-5xl leading-[0.95] font-semibold tracking-[-0.04em] text-foreground sm:text-6xl md:text-7xl lg:text-[92px] text-balance">
                {["Mari berkenalan dengan murid", null, "XII RPL 2"].map((line, i) =>
                  line === null ? (
                    <br key={i} />
                  ) : (
                    <motion.span
                      key={i}
                      className="inline-block"
                      initial={{ opacity: 0, y: 24, filter: "blur(8px)" }}
                      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                      transition={{
                        delay: 0.1 + i * 0.12,
                        duration: 0.7,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                    >
                      {i === 2 ? (
                        <span className="italic font-normal text-muted-foreground">{line}</span>
                      ) : (
                        line
                      )}
                      {i !== 3 && i !== 2 ? "" : " "}
                    </motion.span>
                  )
                )}
              </h1>

              <motion.p
                className="mt-6 max-w-xl text-base md:text-lg text-muted-foreground text-pretty"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.55, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              >
                Website ini adalah pusat informasi kelas XII RPL 2 SMK INFOKOM.
                Jadwal, murid, guru, galeri, dan arsip video tersusun dalam satu
                antarmuka yang bersih dan mudah dijelajahi.
              </motion.p>

              <motion.div
                className="mt-8 flex flex-wrap gap-3"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              >
                <a
                  href="#download-app"
                  onClick={(e) => {
                    e.preventDefault();
                    const section = document.getElementById("download-app");
                    if (!section) return;
                    const header = document.querySelector("header.nav-header");
                    const offset = (header ? header.getBoundingClientRect().height : 72) + 8;
                    window.scrollTo({
                      top: window.scrollY + section.getBoundingClientRect().top - offset,
                      behavior: "smooth",
                    });
                    window.history.pushState(null, "", "#download-app");
                  }}
                  className="btn-primary inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium"
                >
                  Download Aplikasi <ArrowRight size={16} />
                </a>
                <Link
                  to="/schedule"
                  className="btn-secondary-outline inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium"
                >
                  Lihat jadwal
                </Link>
              </motion.div>

              <dl className="mt-12 grid grid-cols-3 gap-x-6 gap-y-5 border-t border-border pt-8">
                {stats.map((s, i) => (
                  <motion.div
                    key={s.label}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      delay: 0.85 + i * 0.1,
                      duration: 0.6,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                  >
                    <dt className="text-xs font-medium uppercase tracking-[0.14em] text-muted-foreground">
                      {s.label}
                    </dt>
                    <dd className="mt-2 font-heading text-3xl font-semibold tracking-tight text-foreground tabular-nums">
                      {s.value}
                    </dd>
                  </motion.div>
                ))}
              </dl>
            </div>

            {/* Hero image card */}
            <motion.div
              className="relative"
              initial={{ opacity: 0, scale: 0.94, y: 24 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ delay: 0.25, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="relative overflow-hidden rounded-2xl border border-border bg-surface shadow-[var(--shadow-lg)]">
                <img
                  src={heroImage}
                  alt="Suasana kelas XII RPL 2 SMK INFOKOM"
                  className="aspect-[4/5] w-full object-cover"
                  loading="eager"
                />
                <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-background/80 to-transparent p-5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="rounded-full border border-border/60 bg-background/80 px-2.5 py-1 font-medium text-foreground backdrop-blur">
                      SMK INFOKOM (XI RPL 2)
                    </span>
                  </div>
                </div>
              </div>
              <motion.div
                className="absolute -bottom-4 -left-4 hidden md:block rounded-xl border border-border bg-background/90 backdrop-blur px-4 py-3 shadow-[var(--shadow-md)]"
                initial={{ opacity: 0, y: 12, x: -12 }}
                animate={{ opacity: 1, y: 0, x: 0 }}
                transition={{ delay: 0.95, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              >
                <p className="text-[11px] uppercase tracking-widest text-muted-foreground">Program</p>
                <p className="font-heading text-sm font-semibold text-foreground">Rekayasa Perangkat Lunak</p>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>



      {/* ─── ABOUT ────────────────────────────────────────────── */}
      <section id="about" className="border-t border-border">
        <div className="container-page py-20 md:py-28">
          <div className="grid gap-12 lg:grid-cols-[0.9fr_1.4fr]">
            <div>
              <p className="eyebrow">Tentang</p>
              <h2 className="mt-4 font-heading text-4xl md:text-5xl font-semibold tracking-tight text-foreground text-balance">
                Belajar merancang perangkat lunak dengan disiplin nyata.
              </h2>
            </div>
            <div className="grid gap-6 sm:grid-cols-2">
              {[
                {
                  title: "Kurikulum",
                  desc: "Fokus pada pemrograman, pengembangan web, manajemen database, dan robotika dengan proyek yang mendekati praktik industri.",
                },
                {
                  title: "Kegiatan",
                  desc: "Pelatihan intensif, review kode, dan kolaborasi tim untuk membentuk kebiasaan kerja profesional sejak dini.",
                },
                {
                  title: "Identitas",
                  desc: "Kelas yang menghargai proses, dokumentasi, dan estetika dari setiap detail pekerjaan yang dikerjakan.",
                },
                {
                  title: "Tujuan",
                  desc: "Menyiapkan murid menjadi profesional di bidang teknologi siap kerja, magang, atau melanjutkan studi.",
                },
              ].map((item) => (
                <div key={item.title} className="tech-card p-6">
                  <h3 className="font-heading text-lg font-semibold text-foreground">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── LESSONS ──────────────────────────────────────────── */}
      <section id="technologies" className="border-t border-border">
        <div className="container-page py-20 md:py-28">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div className="max-w-2xl">
              <p className="eyebrow">Pelajaran</p>
              <h2 className="mt-4 font-heading text-4xl md:text-5xl font-semibold tracking-tight text-foreground text-balance">
                Fondasi yang kami pelajari, digunakan di produk nyata.
              </h2>
            </div>
          </div>

          <div className="mt-12 grid gap-4 md:grid-cols-3">
            {lessons.map((item, i) => {
              const Icon = item.icon;
              return (
                <motion.article
                  key={item.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ delay: i * 0.05, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  className="tech-card group p-7"
                >
                  <div className="flex items-start justify-between">
                    <div className="icon-badge inline-flex h-11 w-11 items-center justify-center rounded-xl">
                      <Icon size={20} />
                    </div>
                    <span className="text-xs font-medium tabular-nums text-muted-foreground">
                      0{i + 1}
                    </span>
                  </div>
                  <h3 className="mt-6 font-heading text-xl font-semibold text-foreground">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.desc}</p>
                  <div className="mt-5 flex flex-wrap gap-1.5">
                    {item.tags.map((t) => (
                      <span key={t.label} className={`lesson-tag ${t.cls}`}>{t.label}</span>
                    ))}
                  </div>
                </motion.article>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─── QUICK ACCESS BENTO ───────────────────────────────── */}
      <section id="quick-access" className="border-t border-border">
        <div className="container-page py-20 md:py-28">
          <div className="max-w-2xl">
            <p className="eyebrow">Jelajahi</p>
            <h2 className="mt-4 font-heading text-4xl md:text-5xl font-semibold tracking-tight text-foreground text-balance">
              Semua yang perlu diketahui tentang kelas ini.
            </h2>
          </div>

          <div className="mt-12 grid gap-4 md:grid-cols-6">
            <QuickCard
              to="/students"
              icon={Users}
              title="Murid & Guru"
              desc="Kenali seluruh anggota kelas XII RPL 2 dari ketua kelas hingga wali kelas."
              className="md:col-span-3"
              tag={`${studentsData.length} murid · ${teachersData.length} guru`}
            />
            <QuickCard
              to="/schedule"
              icon={CalendarDays}
              title="Jadwal Pelajaran"
              desc="Jadwal harian, piket, dan agenda kelas untuk seminggu penuh."
              className="md:col-span-3"
              tag="Senin – Jumat"
            />
            <QuickCard
              to="/gallery"
              icon={Images}
              title="Galeri Kegiatan"
              desc="Dokumentasi kegiatan kelas dalam gaya polaroid."
              className="md:col-span-2"
              tag="Foto"
            />
            <QuickCard
              to="/videos"
              icon={PlayCircle}
              title="Arsip Video"
              desc="Rekaman momen dan projek kelas arsip yang terus tumbuh."
              className="md:col-span-4"
              tag="Video"
            />
          </div>
        </div>
      </section>

      {/* ─── DOWNLOAD APP ─────────────────────────────────────── */}
      <section id="download-app" className="relative overflow-hidden border-t border-border">
        <div className="container-page py-20 md:py-28">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="relative overflow-hidden rounded-[2rem] border border-border bg-gradient-to-br from-surface via-card-bg to-surface-2 p-8 shadow-[var(--shadow-lg)] md:p-16"
          >
            {/* Ambient floating glow orbs — plain CSS animation (transform-only),
               much lighter on the main thread than the previous JS-driven version. */}
            <div
              aria-hidden
              className="orb-drift-a pointer-events-none absolute -left-24 -top-24 h-56 w-56 rounded-full blur-2xl"
              style={{ background: "var(--gradient-primary)", opacity: 0.12 }}
            />
            <div
              aria-hidden
              className="orb-drift-b pointer-events-none absolute -bottom-20 -right-16 h-48 w-48 rounded-full blur-2xl"
              style={{ background: "var(--gradient-primary)", opacity: 0.1 }}
            />
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 grid-pattern opacity-[0.35]"
            />

            <div className="relative grid gap-12 md:grid-cols-[1.2fr_1fr] md:items-center">
              <div>
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                  className="inline-flex items-center gap-2 rounded-full border border-border bg-background/70 px-3 py-1 backdrop-blur"
                >
                  
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-500 opacity-60" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-red-500" />
                  </span>
                  <span className="text-[11px] font-medium uppercase tracking-widest text-muted-foreground">
                    Belum Tersedia
                  </span>
                  {/* <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-60" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
                  </span>
                  <span className="text-[11px] font-medium uppercase tracking-widest text-muted-foreground">
                    Tersedia untuk Android
                  </span> */}
                </motion.div>

                <motion.h2
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.55, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                  className="mt-5 font-heading text-3xl font-semibold tracking-tight text-foreground text-balance md:text-5xl"
                >
                  Bawa <span className="gradient-text">Aplikasi XII RPL 2</span> di HP-mu.
                </motion.h2>

                <motion.p
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="mt-5 max-w-lg text-sm leading-relaxed text-muted-foreground md:text-base"
                >
                  Unduh aplikasi resmi kelas XII RPL 2 dan akses jadwal, murid, guru, galeri,
                  serta arsip video langsung dari HP kamu. Lebih cepat dan praktis dibanding
                  buka lewat browser.
                </motion.p>

                {/* <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-3">
                  {[
                    { icon: WifiOff, label: "Tanpa koneksi internet" },
                    { icon: Smartphone, label: "Android 8.0 ke atas" },
                    { icon: ShieldCheck, label: "Aman & tanpa iklan" },
                  ].map((f, i) => (
                    <motion.div
                      key={f.label}
                      custom={i}
                      variants={fadeUp}
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true }}
                      whileHover={{ y: -3 }}
                      className="flex items-center gap-2.5 rounded-xl border border-border bg-background/60 px-3.5 py-2.5 shadow-[var(--shadow-xs)] backdrop-blur transition-shadow hover:shadow-[var(--shadow-md)]"
                    >
                      <span className="icon-badge flex h-7 w-7 shrink-0 items-center justify-center rounded-lg">
                        <f.icon size={14} />
                      </span>
                      <span className="text-xs font-medium text-foreground">{f.label}</span>
                    </motion.div>
                  ))}
                </div> */}

                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.35 }}
                  className="mt-9 flex flex-wrap items-center gap-4"
                >
                  <motion.a
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.97 }}
                    transition={{ type: "tween", duration: 0.15, ease: "easeOut" }}
                    className="btn-primary btn-shine inline-flex items-center gap-2.5 rounded-full px-6 py-3 text-sm font-semibold shadow-[var(--shadow-md)]"
                  >
                    Coming Soon
                  </motion.a>
                  {/* <motion.a
                    href={APK_DOWNLOAD.url}
                    download
                    whileHover={{ scale: 1.04, y: -2 }}
                    whileTap={{ scale: 0.97 }}
                    transition={{ type: "spring", stiffness: 400, damping: 20 }}
                    className="btn-primary btn-shine inline-flex items-center gap-2.5 rounded-full px-6 py-3 text-sm font-semibold shadow-[var(--shadow-md)]"
                  >
                    <Download size={18} />
                    Download Aplikasi (.apk)
                  </motion.a>
                  <span className="text-xs text-muted-foreground">
                    v{APK_DOWNLOAD.version} · {APK_DOWNLOAD.size}
                  </span> */}
                </motion.div>

                <p className="mt-5 text-xs text-muted-foreground/80">
                  File akan terunduh langsung. Jika muncul peringatan &ldquo;sumber tidak
                  dikenal&rdquo;, izinkan instalasi dari luar Play Store di pengaturan HP kamu.
                </p>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
                className="relative flex justify-center md:justify-end"
              >
                <div className="relative flex h-52 w-52 items-center justify-center md:h-64 md:w-64">
                  <span
                    aria-hidden
                    className="spin-slow absolute inset-0 rounded-full border border-dashed border-border/70"
                  />
                  <span
                    aria-hidden
                    className="absolute inset-6 rounded-full opacity-25 blur-2xl"
                    style={{ background: "var(--gradient-primary)" }}
                  />
                  <div className="float-badge relative flex h-40 w-40 items-center justify-center rounded-[2rem] icon-badge shadow-xl md:h-48 md:w-48">
                    <img
                      src="/logo.png"
                      alt="Logo XII RPL 2"
                      className="h-24 w-24 rounded-2xl object-cover md:h-28 md:w-28"
                    />
                    <span className="absolute -bottom-3 whitespace-nowrap rounded-full border border-border bg-background px-3 py-1 text-[11px] font-medium text-muted-foreground shadow-sm">
                      XII RPL 2 App
                    </span>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

function QuickCard({
  to,
  icon: Icon,
  title,
  desc,
  className = "",
  tag,
}: {
  to: string;
  icon: typeof Users;
  title: string;
  desc: string;
  className?: string;
  tag?: string;
}) {
  return (
    <Link
      to={to}
      className={`tech-card group relative flex flex-col justify-between overflow-hidden p-7 min-h-[220px] ${className}`}
    >
      <div className="flex items-start justify-between">
        <div className="icon-badge inline-flex h-11 w-11 items-center justify-center rounded-xl">
          <Icon size={20} />
        </div>
        {tag ? (
          <span className="text-[11px] font-medium uppercase tracking-widest text-muted-foreground">
            {tag}
          </span>
        ) : null}
      </div>
      <div>
        <h3 className="font-heading text-2xl font-semibold text-foreground">{title}</h3>
        <p className="mt-2 max-w-md text-sm leading-relaxed text-muted-foreground">{desc}</p>
        <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-foreground">
          Buka
          <ArrowUpRight
            size={16}
            className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          />
        </span>
      </div>
    </Link>
  );
}