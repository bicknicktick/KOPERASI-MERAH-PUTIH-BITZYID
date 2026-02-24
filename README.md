# 🏛️ Koperasi Merah Putih

<div align="center">

![Next.js](https://img.shields.io/badge/Next.js-16-black?style=for-the-badge&logo=next.js)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)
![Prisma](https://img.shields.io/badge/Prisma-6.4-2D3748?style=for-the-badge&logo=prisma)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![PWA](https://img.shields.io/badge/PWA-Ready-5A0FC8?style=for-the-badge&logo=pwa&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)

**Sistem Koperasi Digital Modern — Dibangun dengan Teknologi Web Terkini**

*Kelola simpanan, pinjaman, dan keanggotaan koperasi secara transparan dan efisien.*

---

</div>

## ✨ Fitur Utama

| Fitur | Deskripsi |
|-------|-----------|
| 🔐 **Autentikasi Aman** | Login & registrasi dengan bcrypt password hashing via NextAuth.js |
| 💰 **Manajemen Simpanan** | Setor dana, pantau saldo real-time, riwayat transaksi lengkap |
| 🏦 **Pengajuan Pinjaman** | Ajukan pinjaman transparan dengan sistem approval bertingkat |
| 🔔 **Notifikasi Real-Time** | Sistem notifikasi untuk admin & member dengan indikator unread |
| 🛡️ **Panel Admin** | Kelola anggota, approve/reject transaksi, CRUD pengguna |
| 📱 **PWA & Responsif** | Bisa di-install sebagai aplikasi, tampilan optimal di semua perangkat |
| 🌗 **Dark Mode** | Toggle tema gelap/terang dengan transisi halus |
| 📊 **Dashboard Interaktif** | Ringkasan saldo, aktivitas terakhir, dan menu operasional |

## 🖼️ Preview

<div align="center">

| Dark Mode | Light Mode |
|-----------|------------|
| Dashboard dengan saldo real-time | Navigasi sidebar & bottom bar responsif |

</div>

## 🚀 Quick Start

### Prerequisites

- **Node.js** 18+ 
- **npm** atau **yarn**

### 1. Clone Repository

```bash
git clone https://github.com/bicknicktick/KOPERASI-MERAH-PUTIH-BITZYID.git
cd KOPERASI-MERAH-PUTIH-BITZYID
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Setup Environment

Buat file `.env` di root project:

```env
DATABASE_URL="file:./dev.db"
NEXTAUTH_SECRET="your_super_secret_key_here"
NEXTAUTH_URL="http://localhost:2211"
```

> ⚠️ **Ganti `NEXTAUTH_SECRET`** dengan secret key unik Anda sendiri. Gunakan: `openssl rand -base64 32`

### 4. Setup Database

```bash
npx prisma db push
npx prisma generate
```

### 5. Jalankan Development Server

```bash
npm run dev
```

Buka **http://localhost:2211** di browser Anda.

### 6. (Opsional) Set User sebagai Admin

```bash
node setAdmin.js
```

> Edit file `setAdmin.js` dan ganti NIK sesuai user yang ingin dijadikan admin.

## 🏗️ Tech Stack

```
📦 koperasi-merah-putih
├── ⚡ Next.js 16        — React framework dengan App Router & Turbopack
├── 🎨 Tailwind CSS 3    — Utility-first CSS framework
├── 🗃️ Prisma 6          — Type-safe ORM untuk SQLite
├── 🔑 NextAuth.js 4     — Autentikasi session-based
├── 📡 SWR               — Real-time data fetching & caching
├── 📱 next-pwa           — Progressive Web App support
├── 🌗 next-themes        — Dark/Light mode toggle
└── 🔥 TypeScript 5      — Type safety end-to-end
```

## 📂 Struktur Proyek

```
src/
├── app/
│   ├── api/              # REST API endpoints
│   │   ├── admin/        # Admin CRUD operations
│   │   ├── auth/         # Authentication routes
│   │   ├── notifications/# Notification API
│   │   ├── transactions/ # Transaction API
│   │   └── user/         # User data API
│   ├── admin/            # Admin panel page
│   ├── login/            # Login page
│   ├── notifikasi/       # Notifications page
│   ├── pinjaman/         # Loan page
│   ├── profil/           # Profile page
│   ├── register/         # Registration page
│   ├── simpanan/         # Savings page
│   ├── globals.css       # Global styles & design system
│   ├── layout.tsx        # Root layout
│   └── page.tsx          # Dashboard (home)
├── components/
│   ├── AppLogo.tsx       # Logo component
│   ├── BottomNav.tsx     # Responsive navigation
│   ├── DashboardContent.tsx # Main dashboard
│   └── Providers.tsx     # Context providers
├── lib/
│   ├── auth.ts           # NextAuth configuration
│   └── prisma.ts         # Prisma client singleton
└── middleware.ts         # Route protection
```

## 🔒 Keamanan

- ✅ Password di-hash menggunakan **bcrypt**
- ✅ Session management via **NextAuth.js**
- ✅ Route protection via **middleware**
- ✅ Role-based access control (**admin** / **member**)
- ✅ Environment variables untuk konfigurasi sensitif  
- ✅ CSRF protection bawaan NextAuth

## 🤝 Kontribusi

Kontribusi sangat disambut! Silakan:

1. Fork repository ini
2. Buat branch fitur baru (`git checkout -b fitur-baru`)
3. Commit perubahan (`git commit -m 'Tambah fitur baru'`)
4. Push ke branch (`git push origin fitur-baru`)
5. Buat Pull Request

## 📜 Lisensi

Proyek ini dilisensikan di bawah [MIT License](LICENSE).

---

<div align="center">

**Dibuat dengan ❤️ oleh [Bitzy.ID](https://cv.bitzy.id)**

[![Support](https://img.shields.io/badge/Support-PayPal-blue?style=flat-square&logo=paypal)](https://paypal.me/bitzyid)
[![Portfolio](https://img.shields.io/badge/Portfolio-cv.bitzy.id-red?style=flat-square&logo=googlechrome&logoColor=white)](https://cv.bitzy.id)

</div>
