<div align="center">

<img src="public/logo.png" height="140">

# XII RPL 2 - SMK INFOKOM

**Pusat Informasi Digital Kelas XII RPL 2, SMK INFOKOM**

[![Status](https://img.shields.io/badge/Status-Active%20Development-brightgreen?style=for-the-badge)]()
[![Platform](https://img.shields.io/badge/Platform-Web-0078D6?style=for-the-badge)]()
[![Type](https://img.shields.io/badge/Type-School%20Project-FF6B35?style=for-the-badge)]()
[![Built With](https://img.shields.io/badge/Built%20With-React-61DAFB?style=for-the-badge&logo=react&logoColor=white)]()
[![Built With](https://img.shields.io/badge/Styled%20With-Tailwind%20CSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)]()

[About](#about) • [Features](#core-features) • [Pages](#pages) • [Technology](#technology) • [Getting Started](#getting-started)

---

## About

XII RPL 2 adalah platform web yang dibangun untuk menjadi pusat informasi kelas XII RPL 2 di SMK INFOKOM. Aplikasi ini menghimpun profil murid dan wali kelas, jadwal pelajaran dan piket, dokumentasi kegiatan, serta arsip video kelas ke dalam satu tampilan yang bersih, modern, dan mudah diakses.

Proyek ini dikembangkan sebagai media informasi resmi kelas, dengan tujuan memberikan akses cepat dan rapi bagi murid, wali kelas, maupun pihak lain yang ingin mengenal lebih dekat kelas XII RPL 2.

---

## Getting Started

Tidak diperlukan instalasi maupun pembuatan akun untuk menjelajahi konten yang tersedia secara daring. Bagi yang ingin menjalankan proyek ini secara lokal, ikuti langkah pada bagian [Instalasi](#instalasi).

---

## Pages

Aplikasi ini terbagi ke dalam enam halaman utama, masing-masing dengan fokus informasi yang berbeda.

| Halaman | Rute | Deskripsi |
|---|---|---|
| Beranda | `/` | Ringkasan informasi kelas, statistik murid dan wali kelas, serta gambaran mata pelajaran produktif |
| Anggota Kelas | `/students` | Direktori murid dan wali kelas lengkap dengan foto dan tautan sosial media |
| Jadwal | `/schedule` | Jadwal pelajaran dan jadwal piket harian untuk satu minggu penuh |
| Galeri | `/gallery` | Dokumentasi visual kegiatan kelas dalam mode grid maupun polaroid |
| Video | `/videos` | Pustaka video berisi vlog, dokumentasi acara, dan konten pembelajaran |
| Detail Video | `/videos/:id` | Halaman pemutaran untuk video terpilih beserta video terkait |

---

## Core Features

| Fitur | Deskripsi |
|---|---|
| Direktori Anggota Kelas | Pencarian dan filter murid maupun wali kelas berdasarkan nama atau jabatan, dengan mode tampilan grid dan list |
| Jadwal Interaktif | Jadwal pelajaran dan piket yang dapat difilter per hari, lengkap dengan penanda hari aktif berjalan |
| Galeri Dua Mode | Tampilan galeri dalam bentuk grid rapi maupun gaya polaroid, disertai lightbox untuk melihat gambar secara penuh |
| Pustaka Video | Video dari sumber YouTube, Instagram, maupun berkas lokal, dengan pencarian dan filter kategori |
| Mode Tema | Dukungan tampilan terang dan gelap yang dapat diubah kapan saja |
| Desain Responsif | Tata letak yang menyesuaikan baik di perangkat desktop maupun mobile |
| Tanpa Akun | Seluruh informasi dapat diakses secara bebas tanpa perlu masuk atau mendaftar |

---

## Technology

| Layer | Technology |
|---|---|
| Frontend | React 19, TypeScript |
| Build Tool | Vite |
| Styling | Tailwind CSS 4, shadcn/ui, Radix UI |
| Routing | React Router |
| Animasi | Framer Motion |
| Formulir & Validasi | React Hook Form, Zod |
| Package Manager | Bun |
| Hosting & Deployment | Vercel |

---

## Project Structure

```
xii-rpl-2/
├── public/              # Aset statis (logo, foto murid, dan berkas publik lainnya)
├── src/
│   ├── assets/            # Aset gambar yang diimpor langsung ke dalam kode
│   ├── components/         # Komponen React yang dapat digunakan ulang
│   │   └── ui/               # Komponen antarmuka dasar berbasis shadcn/ui
│   ├── data/                 # Sumber data statis (murid, guru, jadwal, galeri, video)
│   ├── hooks/                  # Custom React hooks
│   ├── lib/                      # Fungsi dan utilitas bantuan
│   ├── pages/                     # Halaman-halaman utama aplikasi
│   ├── App.tsx                      # Konfigurasi routing utama aplikasi
│   ├── main.tsx                       # Titik masuk aplikasi React
│   └── styles.css                      # Berkas gaya global dan konfigurasi Tailwind
├── index.html            # Berkas HTML utama
├── vite.config.ts         # Konfigurasi Vite
├── tsconfig.json            # Konfigurasi TypeScript
├── components.json            # Konfigurasi shadcn/ui
└── package.json                 # Daftar dependensi dan skrip proyek
```

---

## Instalasi

Prasyarat: [Node.js](https://nodejs.org/) versi 18 ke atas dan [Bun](https://bun.sh/) sebagai package manager yang direkomendasikan.

1. Klon repositori ini.

   ```bash
   git clone <url-repositori-ini>
   cd xii-rpl-2
   ```

2. Pasang seluruh dependensi.

   ```bash
   bun install
   ```

3. Jalankan server pengembangan.

   ```bash
   bun dev
   ```

   Aplikasi akan berjalan pada `http://localhost:5173`.

### Skrip yang Tersedia

| Perintah | Deskripsi |
|---|---|
| `bun dev` | Menjalankan aplikasi dalam mode pengembangan dengan hot reload |
| `bun run build` | Membangun aplikasi untuk lingkungan produksi |
| `bun run preview` | Menjalankan pratinjau lokal dari hasil build produksi |
| `bun run lint` | Memeriksa kualitas dan konsistensi kode menggunakan ESLint |
| `bun run format` | Merapikan format seluruh berkas kode menggunakan Prettier |

---

## Disclaimer

XII RPL 2 merupakan proyek yang dikembangkan untuk keperluan internal dan edukasi kelas XII RPL 2, SMK INFOKOM. Seluruh data murid, wali kelas, dan dokumentasi yang ditampilkan digunakan atas dasar persetujuan pihak kelas dan hanya ditujukan untuk kepentingan non-komersial di lingkungan kelas.

---

*Dibangun oleh dan untuk XII RPL 2 - SMK INFOKOM.*

[Back to Top](#xii-rpl-2---smk-infokom)

</div>