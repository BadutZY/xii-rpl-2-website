import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/**
 * Mengembalikan posisi scroll ke atas setiap kali berpindah halaman (path berubah),
 * kecuali jika navigasi menuju sebuah #hash (biar tetap bisa lompat ke section).
 * Menggantikan `scrollRestoration: true` bawaan TanStack Router.
 */
export default function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) return;
    window.scrollTo({ top: 0, left: 0, behavior: "instant" as ScrollBehavior });
  }, [pathname, hash]);

  return null;
}
