# 🏛️ Koperasi Merah Putih

<div align="center">

![Next.js](https://img.shields.io/badge/Next.js-16-black?style=for-the-badge&logo=next.js)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)
![Prisma](https://img.shields.io/badge/Prisma-6.4-2D3748?style=for-the-badge&logo=prisma)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![SQLite](https://img.shields.io/badge/SQLite-003B57?style=for-the-badge&logo=sqlite&logoColor=white)
![PWA](https://img.shields.io/badge/PWA-Ready-5A0FC8?style=for-the-badge&logo=pwa&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)

**Sistem Koperasi Digital Enterprise-Grade — Full-Stack, Open Source, Siap Pakai**

*Simpanan · Pinjaman · E-Voting RAT · Laporan Keuangan · Audit Trail — Semua dalam satu platform.*

---

</div>

## ✨ Fitur Lengkap

### 💰 Keuangan & Transaksi
| Fitur | Deskripsi |
|-------|-----------|
| **Simpanan Pokok, Wajib & Sukarela** | Tiga jenis simpanan sesuai standar koperasi Indonesia |
| **Setoran & Penarikan Dana** | Optimistic UI, offline-sync queue, auto-retry saat koneksi pulih |
| **Pinjaman (Pembiayaan)** | Pengajuan pinjaman dengan kalkulasi bunga flat/efektif, amortisasi, dan penalti keterlambatan |
| **Maker-Checker Approval** | Dual-approval workflow untuk pinjaman: Maker verifikasi → Checker approve |
| **Double-Entry Ledger** | Pembukuan debit/kredit otomatis per transaksi (akuntansi akurat) |
| **Denda Keterlambatan Otomatis** | Cron job untuk menerapkan late fees harian pada pinjaman jatuh tempo |
| **Laporan Keuangan & PDF** | Generate laporan bulanan dan statement dalam format PDF |
| **Payment Webhook** | Integrasi webhook untuk pembayaran dari payment gateway eksternal |

### 🗳️ E-Voting RAT (Rapat Anggota Tahunan)
| Fitur | Deskripsi |
|-------|-----------|
| **Agenda Management** | Admin buat agenda rapat dengan opsi voting |
| **Voting System** | Anggota vote secara digital, satu suara per anggota per agenda |
| **Hasil Real-Time** | Pantau hasil voting secara live |

### 🛡️ Keamanan & Governance
| Fitur | Deskripsi |
|-------|-----------|
| **Autentikasi bcrypt + NextAuth** | Password hashing & session management aman |
| **Transaction PIN** | PIN transaksi terpisah untuk otorisasi keuangan |
| **Role-Based Access** | Admin, Maker, Checker, Member — hak akses bertingkat |
| **Audit Log** | Catatan lengkap semua aksi admin (approval, rejection, adjustment) |
| **Rate Limiting** | Proteksi brute-force pada API endpoints |
| **API Idempotency** | Cegah duplikasi transaksi pada request yang sama |
| **Session Revocation** | Admin bisa revoke sesi user secara langsung |

### 📱 User Experience
| Fitur | Deskripsi |
|-------|-----------|
| **PWA (Progressive Web App)** | Install sebagai native app di HP |
| **Offline Sync** | Transaksi disimpan lokal saat offline, otomatis sync saat online |
| **Dark / Light Mode** | Toggle tema dengan transisi halus |
| **Responsive Sidebar** | Collapsible sidebar di tablet, full sidebar di desktop, bottom nav di mobile |
| **Notifikasi Real-Time** | Bell icon dengan badge unread, halaman notifikasi khusus |
| **Dashboard Interaktif** | Ringkasan saldo, aktivitas terakhir, menu operasional |

### 🌐 Halaman Publik (Landing)
| Halaman | Path |
|---------|------|
| Profil Institusi | `/institusi/profil` |
| Legalitas & AD/ART | `/institusi/legalitas`, `/institusi/ad-art` |
| Layanan (Simpanan, Pembiayaan, Digital) | `/layanan/*` |
| Laporan Keuangan Publik | `/laporan-keuangan` |
| FAQ Pembiayaan | `/faq/pembiayaan` |
| Bantuan & Keluhan | `/bantuan/*` |
| Karir | `/karir` |
| Privacy Policy | `/privacy` |

---

## 🚀 Quick Start

### Prerequisites

- **Node.js** 18+
- **npm** atau **yarn**

### 1. Clone & Install

```bash
git clone https://github.com/bicknicktick/KOPERASI-MERAH-PUTIH-BITZYID.git
cd KOPERASI-MERAH-PUTIH-BITZYID
npm install
```

### 2. Setup Environment

Buat file `.env` di root project:

```env
DATABASE_URL="file:./dev.db"
NEXTAUTH_SECRET="your_super_secret_key_here"
NEXTAUTH_URL="http://localhost:2211"
```

> ⚠️ **Ganti `NEXTAUTH_SECRET`** dengan secret key unik. Gunakan: `openssl rand -base64 32`

### 3. Setup Database & Jalankan

```bash
npx prisma db push
npx prisma generate
npm run dev
```

Buka **http://localhost:2211** di browser.

### 4. (Opsional) Set Admin & Cron Jobs

```bash
# Set user sebagai admin (edit NIK di file terlebih dahulu)
node setAdmin.js

# Jalankan cron denda keterlambatan
npm run cron:late-fees

# Jalankan worker laporan PDF
npm run worker:reports
```

---

## 🏗️ Tech Stack

```
📦 koperasi-merah-putih
├── ⚡ Next.js 16          — App Router + Turbopack
├── 🎨 Tailwind CSS 3      — Utility-first CSS
├── 🗃️ Prisma 6 + SQLite   — Type-safe ORM + embedded DB
├── 🔑 NextAuth.js 4       — Auth + session management
├── 📡 SWR                 — Real-time data fetching
├── 📱 next-pwa            — Progressive Web App
├── 📄 PDFKit + pdf-lib    — PDF report generation
├── 📊 Pino                — Structured logging
├── 🌗 next-themes         — Dark/Light mode
└── 🔥 TypeScript 5        — End-to-end type safety
```

---

## 📂 Struktur Proyek

```
src/
├── app/
│   ├── api/
│   │   ├── admin/             # Admin: users, transactions, loans, analytics, settings, security
│   │   ├── auth/              # Login, register, NextAuth
│   │   ├── cron/              # Scheduled jobs (late fees)
│   │   ├── loans/             # Loan CRUD, repayment, disbursement
│   │   ├── membership/        # Resign membership
│   │   ├── notifications/     # Notification CRUD
│   │   ├── rat/               # E-Voting RAT (agendas, votes)
│   │   ├── reports/           # Monthly reports, file upload
│   │   ├── statements/        # Monthly statements PDF
│   │   ├── transactions/      # Deposit, withdraw, general
│   │   ├── user/              # User data, transaction PIN
│   │   └── webhooks/          # Payment webhook receiver
│   ├── admin/                 # Admin panel UI
│   ├── bantuan/               # Help & complaints pages
│   ├── faq/                   # FAQ pages
│   ├── institusi/             # Institution info (profile, legal, AD/ART)
│   ├── karir/                 # Career page
│   ├── laporan-keuangan/      # Public financial reports
│   ├── layanan/               # Services pages (savings, loans, digital)
│   ├── login/ & register/     # Auth pages
│   ├── notifikasi/            # Notifications page
│   ├── pinjaman/              # Loan application page
│   ├── profil/                # User profile page
│   ├── rat/                   # E-Voting RAT page
│   └── simpanan/              # Savings page
├── components/
│   ├── BottomNav.tsx          # Responsive nav (sidebar + bottom bar)
│   ├── DashboardContent.tsx   # Main dashboard
│   ├── LoanAmortizationCalculator.tsx  # Loan calculator
│   ├── OfflineSyncBootstrap.tsx        # Offline queue sync
│   ├── PublicLanding.tsx      # Public landing page
│   ├── PublicInfoPage.tsx     # Public info template
│   └── TransactionPinInput.tsx # PIN input component
├── lib/
│   ├── auth.ts                # NextAuth config
│   ├── prisma.ts              # Prisma client + soft-delete middleware
│   ├── apiHandler.ts          # API error handling wrapper
│   ├── idempotency.ts         # Request deduplication
│   ├── loanMath.ts            # Interest & amortization calculations
│   ├── loanPenalty.ts         # Late fee logic
│   ├── loanWorkflow.ts        # Maker-checker workflow
│   ├── logger.ts              # Pino structured logging
│   ├── offlineTransactionQueue.ts  # Offline sync queue
│   ├── rateLimit.ts           # API rate limiting
│   ├── shu.ts                 # SHU (Sisa Hasil Usaha) calculation
│   ├── systemSettings.ts      # Dynamic system config
│   ├── transactionPin.ts      # PIN hashing & verification
│   └── validateNIK.ts         # NIK format validation
├── proxy.ts                   # Route proxy (replaces middleware)
└── scripts/
    ├── apply-late-fees.mjs    # Cron: apply daily late fees
    └── report-worker.mjs      # Worker: generate PDF reports
```

---

## 🔒 Keamanan

- ✅ Password di-hash menggunakan **bcrypt**
- ✅ Transaction PIN terpisah dengan hashing
- ✅ Session management via **NextAuth.js** + session revocation
- ✅ Route protection via **proxy** (Next.js 16 style)
- ✅ Role-based access control (**Admin / Maker / Checker / Member**)
- ✅ **Audit log** untuk setiap aksi administratif
- ✅ **Rate limiting** pada API endpoints
- ✅ **API idempotency** untuk mencegah duplikasi transaksi
- ✅ Environment variables untuk konfigurasi sensitif
- ✅ CSRF protection bawaan NextAuth
- ✅ Soft-delete pattern (data tidak benar-benar dihapus)

---

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
