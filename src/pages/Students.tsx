import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Users, GraduationCap, X, LayoutGrid, Rows3, User2 } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import StudentModal from "@/components/StudentModal";
import TeacherModal from "@/components/TeacherModal";
import { studentsData, type Student } from "@/data/students";
import { teachersData, type Teacher } from "@/data/teachers";
import { useDocumentMeta } from "@/hooks/useDocumentMeta";

type ViewMode = "grid" | "list";

export default function StudentsPage() {
  useDocumentMeta({
    title: "Anggota Kelas - XII RPL 2",
    description: "Daftar lengkap murid dan wali kelas XII RPL 2 SMK INFOKOM - kenali setiap anggota kelas.",
  });

  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState<string>("all");
  const [view, setView] = useState<ViewMode>("grid");
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [selectedTeacher, setSelectedTeacher] = useState<Teacher | null>(null);

  const roles = useMemo(() => {
    const set = new Set<string>();
    studentsData.forEach((s) => {
      const p = (s.position || "").trim();
      if (p && p !== "-") set.add(p);
    });
    return ["all", ...Array.from(set)];
  }, []);

  const filtered = useMemo(() => {
    const term = searchTerm.toLowerCase().trim();
    const isNumeric = /^\d+$/.test(term);
    return studentsData.filter((s) => {
      if (roleFilter !== "all" && s.position !== roleFilter) return false;
      if (!term) return true;
      const noMatch = isNumeric ? s.no === term : s.no.toLowerCase().includes(term);
      return (
        s.name.toLowerCase().includes(term) ||
        s.fullName.toLowerCase().includes(term) ||
        s.position.toLowerCase().includes(term) ||
        noMatch
      );
    });
  }, [searchTerm, roleFilter]);

  const stats = [
    { label: "Murid", value: studentsData.length.toString().padStart(2, "0") },
    { label: "Wali kelas", value: teachersData.length.toString().padStart(2, "0") },
    { label: "Peran khusus", value: (roles.length - 1).toString().padStart(2, "0") },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="container-page py-16 md:py-24">
        {/* ─── HEADER ─────────────────────────────────────── */}
        <div className="max-w-3xl">
          <motion.p initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="eyebrow">
            <Users size={12} /> Anggota kelas
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }}
            className="mt-4 font-heading text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight text-foreground text-balance"
          >
            Murid & wali <span className="italic font-normal text-muted-foreground">XII RPL 2</span>.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
            className="mt-5 max-w-xl text-base md:text-lg text-muted-foreground text-pretty"
          >
            Kenali (mungkin) calon developer masa depan dari kelas XII RPL 2 SMK INFOKOM beserta wali
            kelas yang membimbing di balik layar.
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

        {/* ─── WALI KELAS ─────────────────────────────────── */}
        <section className="mt-16 border-t border-border pt-12">
          <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="eyebrow"><GraduationCap size={12} /> Wali kelas</p>
              <h2 className="mt-4 font-heading text-3xl md:text-4xl font-semibold tracking-tight text-foreground text-balance">
                Yang membimbing di balik layar.
              </h2>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-2">
            {teachersData.map((teacher, i) => (
              <motion.button
                key={teacher.id}
                type="button"
                initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
                transition={{ delay: Math.min(i * 0.05, 0.3), duration: 0.35 }}
                onClick={() => setSelectedTeacher(teacher)}
                className="teacher-card p-5 md:p-6 flex items-center gap-5 md:gap-6 w-full text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                <div className="w-20 h-24 md:w-24 md:h-28 rounded-lg overflow-hidden teacher-photo-placeholder grid place-items-center flex-shrink-0">
                  {teacher.photo ? (
                    <img src={teacher.photo} alt={teacher.name} className="w-full h-full object-cover object-top" />
                  ) : (
                    <GraduationCap className="w-10 h-10 md:w-12 md:h-12" style={{ color: "oklch(0.55 0.14 45)" }} />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[10px] font-medium uppercase tracking-[0.14em]" style={{ color: "oklch(0.50 0.14 45)" }}>
                    {teacher.role}
                  </p>
                  <h3 className="mt-1 text-lg md:text-xl font-heading font-semibold text-foreground truncate">
                    {teacher.fullName}
                  </h3>
                  <p className="mt-1.5 text-muted-foreground text-xs md:text-sm truncate">
                    <span className="text-foreground/70">Mapel:</span> {teacher.subject}
                  </p>
                  <div className="mt-3 h-1 w-10 rounded-full" style={{ background: "var(--gradient-teacher)" }} />
                </div>
              </motion.button>
            ))}
          </div>
        </section>

        {/* ─── MURID ─────────────────────────────────────── */}
        <section className="mt-16 border-t border-border pt-12">
          <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="eyebrow"><Users size={12} /> Murid</p>
              <h2 className="mt-4 font-heading text-3xl md:text-4xl font-semibold tracking-tight text-foreground text-balance">
                Semua anggota kelas.
              </h2>
            </div>
            <p className="text-xs text-muted-foreground tabular-nums">
              <span className="text-foreground font-medium">{filtered.length}</span> dari {studentsData.length} murid
            </p>
          </div>

          {/* Toolbar */}
          <div className="grid gap-3 md:grid-cols-[minmax(0,1fr)_auto] md:items-center">
            <div className="relative min-w-0">
              <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <input
                type="text"
                placeholder="Cari nama, nomor absen, atau peran..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-input w-full pl-10 pr-10 py-2.5 text-sm"
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 grid h-6 w-6 place-items-center rounded-full text-muted-foreground hover:text-foreground hover:bg-muted cursor-pointer"
                  aria-label="Bersihkan"
                >
                  <X size={14} />
                </button>
              )}
            </div>
            <div className="shrink-0 inline-flex rounded-full border border-border bg-surface p-1 self-start md:self-auto">
              <button
                onClick={() => setView("grid")}
                aria-pressed={view === "grid"}
                className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium transition-colors cursor-pointer ${view === "grid" ? "bg-[var(--ink)] text-[var(--background)]" : "text-muted-foreground hover:text-foreground"}`}
              >
                <LayoutGrid size={13} /> Grid
              </button>
              <button
                onClick={() => setView("list")}
                aria-pressed={view === "list"}
                className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium transition-colors cursor-pointer ${view === "list" ? "bg-[var(--ink)] text-[var(--background)]" : "text-muted-foreground hover:text-foreground"}`}
              >
                <Rows3 size={13} /> List
              </button>
            </div>
          </div>

          <div className="mt-4 -mx-5 md:mx-0 overflow-x-auto scrollbar-none">
            <div className="flex gap-2 px-5 md:px-0 md:flex-wrap min-w-max md:min-w-0">
              {roles.map((r) => (
                <button
                  key={r}
                  onClick={() => setRoleFilter(r)}
                  aria-pressed={roleFilter === r}
                  className={`filter-btn px-3.5 py-1.5 rounded-full text-xs font-medium shrink-0 ${roleFilter === r ? "active" : ""}`}
                >
                  {r === "all" ? "Semua peran" : r}
                </button>
              ))}
            </div>
          </div>

          {/* Content */}
          <div className="mt-8">
            {filtered.length === 0 ? (
              <div className="tech-card px-6 py-16 text-center">
                <div className="mx-auto grid h-12 w-12 place-items-center rounded-xl icon-badge">
                  <Users size={20} />
                </div>
                <h3 className="mt-4 font-heading text-lg font-semibold text-foreground">Tidak ada murid</h3>
                <p className="mt-1 text-sm text-muted-foreground">Coba ubah kata kunci atau reset filter.</p>
                {(searchTerm || roleFilter !== "all") && (
                  <button
                    onClick={() => { setSearchTerm(""); setRoleFilter("all"); }}
                    className="btn-secondary-outline mt-5 inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-xs font-medium"
                  >
                    Reset filter
                  </button>
                )}
              </div>
            ) : view === "grid" ? (
              <AnimatePresence mode="popLayout">
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 md:gap-5">
                  {filtered.map((student, i) => (
                    <StudentGridCard key={student.id} student={student} index={i} onClick={() => setSelectedStudent(student)} />
                  ))}
                </div>
              </AnimatePresence>
            ) : (
              <div className="tech-card divide-y divide-border overflow-hidden">
                {filtered.map((student, i) => (
                  <StudentListRow key={student.id} student={student} index={i} onClick={() => setSelectedStudent(student)} />
                ))}
              </div>
            )}
          </div>
        </section>
      </main>

      <StudentModal student={selectedStudent} onClose={() => setSelectedStudent(null)} />
      <TeacherModal teacher={selectedTeacher} onClose={() => setSelectedTeacher(null)} />

      <Footer />
    </div>
  );
}

function StudentGridCard({ student, index, onClick }: { student: Student; index: number; onClick: () => void }) {
  const hasRole = student.position && student.position !== "-";
  return (
    <motion.button
      type="button"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 8 }}
      transition={{ delay: Math.min(index * 0.015, 0.25), duration: 0.3 }}
      onClick={onClick}
      className="student-card p-4 md:p-5 text-center focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
    >
      <div className="relative w-16 h-20 md:w-20 md:h-24 mx-auto rounded-lg overflow-hidden student-photo-placeholder grid place-items-center">
        {student.photo ? (
          <img src={student.photo} alt={student.name} className="w-full h-full object-cover object-top" />
        ) : (
          <User2 className="w-8 h-8 text-muted-foreground/40" />
        )}
        <span className="absolute top-1 left-1 rounded-md bg-background/85 border border-border backdrop-blur px-1.5 py-0.5 text-[10px] font-mono font-medium text-foreground tabular-nums">
          {student.no.padStart(2, "0")}
        </span>
      </div>
      <h3 className="mt-3 text-sm md:text-base font-heading font-semibold text-foreground truncate">{student.name}</h3>
      {hasRole ? (
        <span className="mt-1.5 inline-block rounded-full border border-border bg-surface px-2 py-0.5 text-[10px] font-medium text-muted-foreground truncate max-w-full">
          {student.position}
        </span>
      ) : (
        <p className="mt-1.5 text-[10px] text-muted-foreground/60 uppercase tracking-widest">Anggota</p>
      )}
    </motion.button>
  );
}

function StudentListRow({ student, index, onClick }: { student: Student; index: number; onClick: () => void }) {
  const hasRole = student.position && student.position !== "-";
  return (
    <motion.button
      type="button"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: Math.min(index * 0.01, 0.2) }}
      onClick={onClick}
      className="grid w-full grid-cols-[auto_auto_minmax(0,1fr)_auto] items-center gap-3 md:gap-4 px-4 md:px-5 py-3 text-left transition-colors hover:bg-surface focus:outline-none focus-visible:bg-surface"
    >
      <span className="w-8 text-xs font-mono font-medium text-muted-foreground tabular-nums text-right">
        {student.no.padStart(2, "0")}
      </span>
      <div className="h-9 w-9 rounded-full overflow-hidden student-photo-placeholder grid place-items-center shrink-0">
        {student.photo ? (
          <img src={student.photo} alt={student.name} className="w-full h-full object-cover object-top" />
        ) : (
          <User2 className="w-4 h-4 text-muted-foreground/40" />
        )}
      </div>
      <div className="min-w-0">
        <p className="text-sm font-heading font-semibold text-foreground truncate">{student.fullName}</p>
        <p className="text-xs text-muted-foreground truncate">{student.name}</p>
      </div>
      <span className="shrink-0 text-[10px] md:text-xs font-medium text-muted-foreground">
        {hasRole ? (
          <span className="rounded-full border border-border bg-surface px-2.5 py-1">{student.position}</span>
        ) : (
          <span className="hidden sm:inline text-muted-foreground/50">-</span>
        )}
      </span>
    </motion.button>
  );
}
