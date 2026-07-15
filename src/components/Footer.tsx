import { Link } from "react-router-dom";
import { Instagram, Youtube, Mail, ArrowUpRight } from "lucide-react";

const linkGroups = [
  {
    title: "Kelas",
    links: [
      { to: "/students", label: "Murid & Guru" },
      { to: "/schedule", label: "Jadwal" },
    ],
  },
  {
    title: "Arsip",
    links: [
      { to: "/gallery", label: "Galeri" },
      { to: "/videos", label: "Video" },
    ],
  },
] as const;

const Footer = () => {
  const year = new Date().getFullYear();
  return (
    <footer className="mt-24 border-t border-border bg-background">
      <div className="container-page py-14">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <Link to="/" className="inline-flex items-center gap-2.5">
              <img src="/logo.png" alt="" className="h-8 w-8 rounded-lg object-cover ring-1 ring-border" />
              <span className="font-heading text-[15px] font-semibold tracking-tight text-foreground">
                XII <span className="text-muted-foreground"> RPL 2</span>
              </span>
            </Link>
            <p className="mt-4 max-w-sm text-sm text-muted-foreground text-pretty">
              Pusat informasi kelas <span className="text-foreground font-medium">XII RPL 2 - SMK INFOKOM </span> 
              jadwal, murid, guru, galeri, dan arsip video kelas.
            </p>
            <div className="mt-5 flex gap-2">
              <a href="https://www.instagram.com/thecoders.space/" target="_blank" aria-label="Instagram" className="social-icon-link inline-flex h-9 w-9 items-center justify-center rounded-full">
                <Instagram size={16} />
              </a>
              <a href="https://www.youtube.com/@xirpltwoo" target="_blank" aria-label="YouTube" className="social-icon-link inline-flex h-9 w-9 items-center justify-center rounded-full">
                <Youtube size={16} />
              </a>
            </div>
          </div>

          {linkGroups.map((group) => (
            <div key={group.title}>
              <p className="font-heading text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                {group.title}
              </p>
              <ul className="mt-4 space-y-2.5">
                {group.links.map((l) => (
                  <li key={l.to}>
                    <Link
                      to={l.to}
                      className="group inline-flex items-center gap-1 text-sm text-foreground/80 hover:text-foreground transition-colors"
                    >
                      {l.label}
                      <ArrowUpRight size={14} className="opacity-0 -translate-x-1 transition-all group-hover:opacity-100 group-hover:translate-x-0" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div>
            <p className="font-heading text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">
              Sekolah
            </p>
            <p className="mt-4 text-sm text-foreground/80">SMK INFOKOM</p>
            <p className="mt-1 text-sm text-muted-foreground">Rekayasa Perangkat Lunak</p>
          </div>
        </div>

        <div className="mt-12 flex flex-col-reverse items-start justify-between gap-3 border-t border-border pt-6 md:flex-row md:items-center">
          <p className="text-xs text-muted-foreground">
            © {year} XII RPL 2 - SMK INFOKOM. All rights reserved.
          </p>
          <p className="text-xs text-muted-foreground">
            Dirancang &amp; dibangun oleh <a href="https://badutzy.vercel.app" target="_blank" className="text-foreground font-medium">BadutZY</a>,
            didukung Claude &amp; Lovable.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
