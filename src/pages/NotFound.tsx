import { Link } from "react-router-dom";
import { useDocumentMeta } from "@/hooks/useDocumentMeta";

export default function NotFoundPage() {
  useDocumentMeta({ title: "Halaman tidak ditemukan - XII RPL 2" });

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-6">
      <div className="max-w-md text-center">
        <p className="eyebrow mb-6">Error 404</p>
        <h1 className="font-heading text-6xl md:text-7xl font-semibold tracking-tight text-foreground">
          Halaman tidak ditemukan
        </h1>
        <p className="mt-4 text-base text-muted-foreground text-pretty">
          Halaman yang Anda cari mungkin telah dipindahkan atau tidak pernah ada. Silakan
          kembali ke beranda.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link to="/" className="btn-primary inline-flex items-center justify-center rounded-full px-5 py-2.5 text-sm font-medium">
            Kembali ke beranda
          </Link>
          <Link to="/schedule" className="btn-secondary-outline inline-flex items-center justify-center rounded-full px-5 py-2.5 text-sm font-medium">
            Lihat jadwal
          </Link>
        </div>
      </div>
    </div>
  );
}
