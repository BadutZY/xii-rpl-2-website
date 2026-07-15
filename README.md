# XII RPL 2 - SMK INFOKOM

Pusat informasi digital untuk kelas XII RPL 2 SMK INFOKOM. Aplikasi web ini menyajikan profil murid dan wali kelas, jadwal pelajaran serta piket, galeri dokumentasi kegiatan, dan arsip video kelas dalam satu tampilan yang bersih, modern, dan responsif.

## Daftar Isi

- [Tentang Proyek](#tentang-proyek)
- [Fitur](#fitur)
- [Teknologi yang Digunakan](#teknologi-yang-digunakan)
- [Struktur Proyek](#struktur-proyek)
- [Prasyarat](#prasyarat)
- [Instalasi](#instalasi)
- [Menjalankan Proyek](#menjalankan-proyek)
- [Skrip yang Tersedia](#skrip-yang-tersedia)
- [Build dan Deployment](#build-dan-deployment)
- [Konvensi Kode](#konvensi-kode)
- [Kontribusi](#kontribusi)
- [Lisensi](#lisensi)
- [Kontak](#kontak)

## Tentang Proyek

Proyek ini dibangun sebagai media informasi resmi kelas XII RPL 2 di SMK INFOKOM. Tujuannya adalah menghadirkan satu tempat terpusat bagi murid, wali kelas, maupun pihak lain untuk mengakses data kelas secara cepat dan rapi, mulai dari profil anggota kelas, jadwal harian, hingga dokumentasi visual kegiatan sehari-hari.

Aplikasi dibangun sebagai Single Page Application (SPA) menggunakan React dan Vite, dengan antarmuka yang mengutamakan kecepatan, aksesibilitas, dan pengalaman pengguna yang konsisten di berbagai perangkat.

## Fitur

- **Beranda**: Ringkasan informasi kelas, statistik jumlah murid dan wali kelas, serta gambaran mata pelajaran produktif yang dipelajari.
- **Anggota Kelas**: Direktori murid dan wali kelas lengkap dengan foto, tautan sosial media, dan detail lain. Mendukung pencarian, filter berdasarkan jabatan, serta mode tampilan grid dan list.
- **Jadwal**: Jadwal pelajaran dan jadwal piket harian yang dapat difilter per hari, lengkap dengan indikator hari aktif berjalan.
- **Galeri**: Dokumentasi kegiatan kelas dalam dua mode tampilan, yaitu grid rapi dan gaya polaroid yang lebih kasual, disertai lightbox untuk melihat gambar secara penuh.
- **Video**: Pustaka media berisi vlog, dokumentasi acara, dan video pembelajaran yang bersumber dari YouTube maupun berkas lokal, dengan pencarian dan filter kategori.
- **Mode Tema**: Dukungan tampilan terang dan gelap yang dapat diubah melalui pengalih tema.
- **Desain Responsif**: Tata letak menyesuaikan baik di perangkat desktop maupun mobile.
- **Halaman 404**: Halaman khusus untuk rute yang tidak ditemukan, lengkap dengan navigasi kembali.

## Teknologi yang Digunakan

Proyek ini dibangun di atas ekosistem React modern dengan sejumlah pustaka pendukung berikut.

**Inti**
- [React 19](https://react.dev/) sebagai pustaka antarmuka pengguna
- [TypeScript](https://www.typescriptlang.org/) untuk penulisan kode yang lebih aman dan terstruktur
- [Vite](https://vitejs.dev/) sebagai build tool dan dev server
- [React Router](https://reactrouter.com/) untuk manajemen routing pada sisi klien

**Antarmuka dan Gaya**
- [Tailwind CSS 4](https://tailwindcss.com/) untuk styling berbasis utility class
- [shadcn/ui](https://ui.shadcn.com/) sebagai kumpulan komponen antarmuka berbasis Radix UI
- [Radix UI](https://www.radix-ui.com/) untuk primitif komponen yang aksesibel
- [Framer Motion](https://www.framer.com/motion/) untuk animasi dan transisi
- [Lucide React](https://lucide.dev/) sebagai kumpulan ikon
- [tw-animate-css](https://github.com/Wombosvideo/tw-animate-css) untuk animasi tambahan berbasis Tailwind

**Formulir dan Validasi**
- [React Hook Form](https://react-hook-form.com/) untuk manajemen formulir
- [Zod](https://zod.dev/) untuk validasi skema data
- [@hookform/resolvers](https://github.com/react-hook-form/resolvers) sebagai penghubung antara React Hook Form dan Zod

**Utilitas Lainnya**
- [date-fns](https://date-fns.org/) untuk manipulasi tanggal
- [Recharts](https://recharts.org/) untuk visualisasi data dalam bentuk grafik
- [Embla Carousel](https://www.embla-carousel.com/) untuk komponen carousel
- [Sonner](https://sonner.emilkowal.ski/) untuk notifikasi toast
- [class-variance-authority](https://cva.style/docs) dan [clsx](https://github.com/lukeed/clsx) untuk manajemen kelas kondisional
- [tailwind-merge](https://github.com/dcastil/tailwind-merge) untuk penggabungan kelas Tailwind tanpa konflik

**Perkakas Pengembangan**
- [ESLint](https://eslint.org/) untuk linting kode
- [Prettier](https://prettier.io/) untuk pemformatan kode otomatis
- [Bun](https://bun.sh/) sebagai package manager utama dan runtime pengembangan

## Struktur Proyek

```
xii-rpl-2/
├── public/                  # Aset statis (logo, foto murid, dan berkas publik lainnya)
├── src/
│   ├── assets/               # Aset gambar yang diimpor langsung ke dalam kode
│   ├── components/           # Komponen React yang dapat digunakan ulang
│   │   └── ui/                # Komponen antarmuka dasar berbasis shadcn/ui
│   ├── data/                  # Sumber data statis (murid, guru, jadwal, galeri, video)
│   ├── hooks/                  # Custom React hooks
│   ├── lib/                    # Fungsi dan utilitas bantuan
│   ├── pages/                  # Halaman-halaman utama aplikasi
│   ├── App.tsx                  # Konfigurasi routing utama aplikasi
│   ├── main.tsx                  # Titik masuk aplikasi React
│   └── styles.css                 # Berkas gaya global dan konfigurasi Tailwind
├── index.html                # Berkas HTML utama
├── vite.config.ts            # Konfigurasi Vite
├── tsconfig.json              # Konfigurasi TypeScript
├── eslint.config.js            # Konfigurasi ESLint
├── components.json              # Konfigurasi shadcn/ui
└── package.json                  # Daftar dependensi dan skrip proyek
```

## Prasyarat

Sebelum menjalankan proyek ini, pastikan perangkat sudah memiliki:

- [Node.js](https://nodejs.org/) versi 18 ke atas
- [Bun](https://bun.sh/) sebagai package manager yang direkomendasikan

Sebagai alternatif, npm atau pnpm juga dapat digunakan karena berkas lock untuk keduanya turut tersedia pada proyek ini.

## Instalasi

1. Klon repositori ini ke perangkat lokal.

   ```bash
   git clone <url-repositori-ini>
   cd xii-rpl-2
   ```

2. Pasang seluruh dependensi proyek.

   ```bash
   bun install
   ```

   Atau menggunakan npm:

   ```bash
   npm install
   ```

## Menjalankan Proyek

Setelah proses instalasi selesai, jalankan server pengembangan dengan perintah berikut.

```bash
bun dev
```

Secara bawaan, aplikasi akan berjalan pada `http://localhost:5173` dan dapat diakses melalui jaringan lokal karena konfigurasi server diatur untuk `host: true`.

## Skrip yang Tersedia

| Perintah | Deskripsi |
|---|---|
| `bun dev` | Menjalankan aplikasi dalam mode pengembangan dengan hot reload |
| `bun run build` | Membangun aplikasi untuk lingkungan produksi |
| `bun run build:dev` | Membangun aplikasi menggunakan mode pengembangan |
| `bun run preview` | Menjalankan pratinjau lokal dari hasil build produksi |
| `bun run lint` | Memeriksa kualitas dan konsistensi kode menggunakan ESLint |
| `bun run format` | Merapikan format seluruh berkas kode menggunakan Prettier |

## Build dan Deployment

Untuk menghasilkan berkas produksi, jalankan perintah berikut.

```bash
bun run build
```

Hasil build akan tersimpan pada direktori `dist/` dan siap untuk diunggah ke layanan hosting statis.

Proyek ini telah dikonfigurasi untuk deployment di [Vercel](https://vercel.com/) melalui berkas `vercel.json`, dengan aturan rewrite yang mengarahkan seluruh rute kembali ke `index.html` agar routing sisi klien dapat berfungsi dengan baik.

## Konvensi Kode

Proyek ini menerapkan aturan penulisan kode yang konsisten melalui ESLint dan Prettier, dengan konfigurasi sebagai berikut:

- Lebar baris maksimum sebanyak 100 karakter
- Penggunaan tanda kutip ganda pada string
- Titik koma wajib disertakan pada akhir pernyataan
- Trailing comma diterapkan pada seluruh elemen multi-baris

Sebelum melakukan commit, disarankan untuk menjalankan `bun run lint` dan `bun run format` guna memastikan kode tetap konsisten dengan standar proyek.

## Kontribusi

Kontribusi dalam bentuk perbaikan maupun penambahan fitur sangat terbuka. Untuk berkontribusi, ikuti langkah berikut:

1. Fork repositori ini.
2. Buat branch baru untuk perubahan yang akan dilakukan.

   ```bash
   git checkout -b fitur/nama-fitur
   ```

3. Lakukan perubahan dan commit dengan pesan yang jelas.

   ```bash
   git commit -m "Menambahkan: deskripsi singkat perubahan"
   ```

4. Push branch ke repositori hasil fork.

   ```bash
   git push origin fitur/nama-fitur
   ```

5. Ajukan Pull Request ke repositori utama untuk ditinjau.

## Lisensi

Proyek ini bersifat privat dan dikembangkan untuk keperluan internal kelas XII RPL 2 SMK INFOKOM. Seluruh hak penggunaan dan penyebaran konten mengikuti kebijakan yang ditetapkan oleh pengelola kelas.

## Kontak

Untuk pertanyaan, masukan, atau laporan kendala terkait proyek ini, silakan hubungi pengelola kelas XII RPL 2 SMK INFOKOM.