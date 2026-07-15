import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { BookOpen, Brush, Eye, UserCircle, Clock, CalendarDays, Coffee } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScheduleModal from "@/components/ScheduleModal";
import StudentModal from "@/components/StudentModal";
import { studentsData, type Student } from "@/data/students";
import { lessonSchedule, scheduleDetails, piketSchedule, dayNames, dayLabels } from "@/data/schedule";
import { useDocumentMeta } from "@/hooks/useDocumentMeta";

const jsToDay = ["ahad", "senin", "selasa", "rabu", "kamis", "jumat", "sabtu"];

export default function SchedulePage() {
  useDocumentMeta({
    title: "Jadwal - XII RPL 2",
    description: "Jadwal pelajaran dan piket kelas XII RPL 2 SMK INFOKOM - tersusun rapi untuk seminggu penuh.",
  });

  const [activeTab, setActiveTab] = useState<"lesson" | "piket">("lesson");
  const [filterDay, setFilterDay] = useState<string>("all");
  const [modalDay, setModalDay] = useState<string | null>(null);
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);

  const today = jsToDay[new Date().getDay()];

  const filteredDays = filterDay === "all" ? [...dayNames] : dayNames.filter((d) => d === filterDay);

  const findStudentByName = (fullName: string): Student | null =>
    studentsData.find((s) => s.fullName.toUpperCase() === fullName.toUpperCase()) || null;

  const stats = useMemo(() => {
    const totalLessons = dayNames.reduce(
      (acc, d) => acc + (lessonSchedule[d]?.filter((i) => i.subject.toLowerCase() !== "istirahat").length ?? 0),
      0,
    );
    const uniqueSubjects = new Set<string>();
    dayNames.forEach((d) =>
      lessonSchedule[d]?.forEach((i) => {
        if (i.subject.toLowerCase() !== "istirahat") uniqueSubjects.add(i.subject);
      }),
    );
    return [
      { label: "Hari sekolah", value: dayNames.length.toString().padStart(2, "0") },
      { label: "Sesi/minggu", value: totalLessons.toString().padStart(2, "0") },
      { label: "Mata pelajaran", value: uniqueSubjects.size.toString().padStart(2, "0") },
    ];
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="container-page py-16 md:py-24">
        {/* ─── HEADER ─────────────────────────────────────── */}
        <div className="max-w-3xl">
          <motion.p initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="eyebrow">
            <CalendarDays size={12} /> Jadwal kelas
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }}
            className="mt-4 font-heading text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight text-foreground text-balance"
          >
            Jadwal pelajaran & <span className="italic font-normal text-muted-foreground">piket</span>.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
            className="mt-5 max-w-xl text-base md:text-lg text-muted-foreground text-pretty"
          >
            Jadwal piket dan jadwal pelajaran kelas XII RPL 2.
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

        {/* ─── CONTROLS ───────────────────────────────────── */}
        <div className="mt-12 border-t border-border pt-8">
          <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
            <div className="toggle-container rounded-full p-1 flex relative w-fit">
              <div
                className="toggle-slider-bg absolute top-1 bottom-1 w-[calc(50%-4px)]"
                style={{ transform: activeTab === "piket" ? "translateX(calc(100% + 4px))" : "translateX(2px)" }}
              />
              <button
                onClick={() => { setActiveTab("lesson"); setFilterDay("all"); }}
                className={`toggle-btn px-5 py-2 rounded-full font-medium text-sm flex items-center gap-2 relative ${activeTab === "lesson" ? "active" : ""}`}
              >
                <BookOpen size={15} /> Pelajaran
              </button>
              <button
                onClick={() => { setActiveTab("piket"); setFilterDay("all"); }}
                className={`toggle-btn px-5 py-2 rounded-full font-medium text-sm flex items-center gap-2 relative ${activeTab === "piket" ? "active" : ""}`}
              >
                <Brush size={15} /> Piket
              </button>
            </div>
            <p className="text-xs text-muted-foreground">
              Hari ini: <span className="text-foreground font-medium">{dayLabels[today] ?? "Libur"}</span>
            </p>
          </div>

          {/* Day filter — horizontal scroll on mobile */}
          <div className="mt-5 -mx-5 md:mx-0 overflow-x-auto scrollbar-none">
            <div className="flex gap-2 px-5 md:px-0 md:flex-wrap min-w-max md:min-w-0">
              <button
                onClick={() => setFilterDay("all")}
                className={`filter-btn px-4 py-1.5 rounded-full text-xs font-medium shrink-0 ${filterDay === "all" ? "active" : ""}`}
              >
                Semua hari
              </button>
              {dayNames.map((d) => (
                <button
                  key={d}
                  onClick={() => setFilterDay(d)}
                  className={`filter-btn px-4 py-1.5 rounded-full text-xs font-medium shrink-0 inline-flex items-center gap-1.5 ${filterDay === d ? "active" : ""}`}
                >
                  {dayLabels[d]}
                  {d === today && (
                    <span className={`h-1.5 w-1.5 rounded-full ${filterDay === d ? "bg-background" : "bg-[oklch(0.55_0.14_145)]"}`} />
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* ─── CARDS ──────────────────────────────────────── */}
        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
          {activeTab === "lesson"
            ? filteredDays.map((day, i) => (
                <LessonCard
                  key={day}
                  day={day}
                  isToday={day === today}
                  index={i}
                  onOpenDetail={() => setModalDay(day)}
                />
              ))
            : filteredDays.map((day, i) => (
                <PiketCard
                  key={day}
                  day={day}
                  isToday={day === today}
                  index={i}
                  onSelectStudent={(name) => {
                    const found = findStudentByName(name);
                    if (found) setSelectedStudent(found);
                  }}
                />
              ))}
        </div>
      </main>

      <ScheduleModal
        isOpen={!!modalDay}
        onClose={() => setModalDay(null)}
        details={modalDay ? scheduleDetails[modalDay] : []}
        dayLabel={modalDay ? dayLabels[modalDay] : ""}
      />
      <StudentModal student={selectedStudent} onClose={() => setSelectedStudent(null)} />

      <Footer />
    </div>
  );
}

function DayHeader({ day, isToday, count, kind }: { day: string; isToday: boolean; count: number; kind: "lesson" | "piket" }) {
  return (
    <div className="flex items-start justify-between gap-3">
      <div className="min-w-0">
        <p className="eyebrow"><CalendarDays size={11} /> {kind === "lesson" ? "Hari" : "Piket"}</p>
        <h3 className="mt-2 font-heading text-xl md:text-2xl font-semibold tracking-tight text-foreground truncate">
          {dayLabels[day]}
        </h3>
      </div>
      <div className="flex flex-col items-end gap-1.5 shrink-0">
        {isToday && (
          <span className="inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-[10px] font-medium uppercase tracking-widest"
            style={{ borderColor: "oklch(0.55 0.14 145 / 0.4)", background: "oklch(0.55 0.14 145 / 0.10)", color: "oklch(0.35 0.12 145)" }}>
            <span className="h-1.5 w-1.5 rounded-full" style={{ background: "oklch(0.55 0.14 145)" }} /> Hari ini
          </span>
        )}
        <span className="text-[10px] font-medium uppercase tracking-widest text-muted-foreground tabular-nums">
          {count.toString().padStart(2, "0")} {kind === "lesson" ? "sesi" : "petugas"}
        </span>
      </div>
    </div>
  );
}

function LessonCard({ day, isToday, index, onOpenDetail }: { day: string; isToday: boolean; index: number; onOpenDetail: () => void }) {
  const items = lessonSchedule[day] ?? [];
  return (
    <motion.article
      initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
      transition={{ delay: Math.min(index * 0.04, 0.3), duration: 0.35 }}
      className="tech-card p-5 md:p-6 flex flex-col"
      style={isToday ? { borderColor: "oklch(0.55 0.14 145 / 0.5)" } : undefined}
    >
      <DayHeader day={day} isToday={isToday} count={items.length} kind="lesson" />

      <ol className="mt-5 relative space-y-2 flex-grow">
        {items.map((item, idx) => {
          const isBreak = item.subject.toLowerCase() === "istirahat";
          return (
            <li
              key={idx}
              className="grid grid-cols-[auto_1fr] items-center gap-3 rounded-lg border border-border px-3 py-2.5 transition-colors"
              style={{ background: isBreak ? "color-mix(in oklab, var(--muted) 60%, transparent)" : "var(--surface)" }}
            >
              <span className="time-badge inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[11px] tabular-nums shrink-0">
                <Clock size={10} /> {item.time}
              </span>
              <span className={`min-w-0 text-sm font-medium truncate ${isBreak ? "text-muted-foreground italic" : "text-foreground"}`}>
                {isBreak && <Coffee size={12} className="inline mr-1 -mt-0.5" />}
                {item.subject}
              </span>
            </li>
          );
        })}
      </ol>

      <button
        onClick={onOpenDetail}
        className="btn-detail w-full mt-5 py-2.5 rounded-lg font-medium text-sm flex items-center justify-center gap-2"
      >
        <Eye size={16} /> Lihat Detail
      </button>
    </motion.article>
  );
}

function PiketCard({ day, isToday, index, onSelectStudent }: { day: string; isToday: boolean; index: number; onSelectStudent: (name: string) => void }) {
  const items = piketSchedule[day] ?? [];
  return (
    <motion.article
      initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
      transition={{ delay: Math.min(index * 0.04, 0.3), duration: 0.35 }}
      className="tech-card p-5 md:p-6"
      style={isToday ? { borderColor: "oklch(0.55 0.14 145 / 0.5)" } : undefined}
    >
      <DayHeader day={day} isToday={isToday} count={items.length} kind="piket" />

      <ul className="mt-5 space-y-2">
        {items.map((item, idx) => (
          <li key={idx}>
            <button
              onClick={() => onSelectStudent(item.fullName)}
              className="w-full flex items-center gap-3 rounded-lg border border-border bg-surface px-3 py-2.5 text-left transition-colors hover:border-[var(--border-strong)] hover:bg-[var(--surface-2)] cursor-pointer"
            >
              <div className="grid h-8 w-8 place-items-center rounded-full icon-badge shrink-0">
                <UserCircle size={16} />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium text-foreground truncate">{item.nickname}</p>
                <p className="text-[11px] text-muted-foreground truncate">{item.fullName}</p>
              </div>
            </button>
          </li>
        ))}
      </ul>
    </motion.article>
  );
}
