<div align="center">

  <img src="public/brand-mark.svg" alt="KMP Logo" width="96" />

  # 🏛️ KOPERASI MERAH PUTIH

  **Platform Operasional Koperasi Digital — Enterprise-Grade, Open Source**

  *Simpanan · Pinjaman · E-Voting RAT · Laporan Keuangan · Audit Trail*

  <br />

  <p>
    <img src="https://img.shields.io/badge/Next.js-16-000?style=for-the-badge&logo=next.js" />
    <img src="https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge&logo=typescript&logoColor=fff" />
    <img src="https://img.shields.io/badge/Prisma-6-2D3748?style=for-the-badge&logo=prisma" />
    <img src="https://img.shields.io/badge/PostgreSQL-Supabase-4169E1?style=for-the-badge&logo=postgresql&logoColor=fff" />
  </p>
  <p>
    <img src="https://img.shields.io/badge/NextAuth-Session-1F2937?style=for-the-badge" />
    <img src="https://img.shields.io/badge/SWR-Sync-0EA5E9?style=for-the-badge" />
    <img src="https://img.shields.io/badge/Tailwind_CSS-UI-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=fff" />
    <img src="https://img.shields.io/badge/PWA-Ready-5A0FC8?style=for-the-badge&logo=pwa&logoColor=fff" />
    <img src="https://img.shields.io/badge/License-MIT-22C55E?style=for-the-badge" />
  </p>

  <br />

  > Dibangun untuk operasional koperasi riil: kontrol finansial ketat, alur persetujuan berlapis, audit lengkap, dan arsitektur siap produksi.

</div>

<br />

---

<br />

## 📋 Daftar Isi

- [Ringkasan Sistem](#-ringkasan-sistem)
- [Tujuan Bisnis](#-tujuan-bisnis)
- [Fitur Inti](#-fitur-inti)
- [Workflow End-to-End](#-workflow-end-to-end)
- [Keamanan](#-kontrol-keamanan)
- [Arsitektur Teknis](#-arsitektur-teknis)
- [Peta Modul](#-peta-modul)
- [API Reference](#-api-reference)
- [Quick Start](#-quick-start)
- [Deployment](#-deployment)
- [Troubleshooting](#-troubleshooting)

<br />

---

<br />

## 🔭 Ringkasan Sistem

Melayani proses koperasi dari **hulu ke hilir** dalam satu platform:

| # | Kapabilitas | Deskripsi |
|---|-------------|-----------|
| 1 | 👤 **Onboarding** | Registrasi anggota, validasi NIK, autentikasi aman |
| 2 | 💰 **Simpanan** | Pengelolaan simpanan pokok, wajib, dan sukarela |
| 3 | 🏦 **Pinjaman** | Pengajuan, maker-checker approval, disbursement |
| 4 | 💳 **Cicilan** | Pembayaran, denda keterlambatan, status kolektabilitas |
| 5 | 🗳️ **E-Voting RAT** | Rapat anggota tahunan digital, one-member-one-vote |
| 6 | 📊 **Analytics** | Dashboard pengurus: NPL, cashflow, metrik kas |
| 7 | 📄 **Laporan** | Arus kas bulanan PDF/XLSX, e-statement anggota |
| 8 | 🛡️ **Audit** | Trail lengkap untuk semua aksi finansial & admin |

<br />

---

<br />

## 🎯 Tujuan Bisnis

<table>
<tr>
<td width="80" align="center">🔍</td>
<td><strong>Transparansi</strong> — Dana anggota tercatat dan terpantau real-time</td>
</tr>
<tr>
<td align="center">⚖️</td>
<td><strong>Tata Kelola</strong> — Disiplin pengurus dengan approval berlapis</td>
</tr>
<tr>
<td align="center">📝</td>
<td><strong>Audit Trail</strong> — Jejak lengkap semua aksi sensitif</td>
</tr>
<tr>
<td align="center">🚫</td>
<td><strong>Anti-Fraud</strong> — Cegah double spending, replay request, IDOR</td>
</tr>
<tr>
<td align="center">⚡</td>
<td><strong>UX Optimal</strong> — Responsif, cepat, offline-ready di mobile & desktop</td>
</tr>
</table>

<br />

---

<br />

## ✨ Fitur Inti

### 💰 A. Manajemen Simpanan

| Jenis | Deskripsi | Bisa Ditarik? |
|-------|-----------|:---:|
| **Simpanan Pokok** | Setoran dasar keanggotaan | ❌ |
| **Simpanan Wajib** | Setoran berkala wajib | ❌ |
| **Simpanan Sukarela** | Saldo fleksibel | ✅ |

> 💡 Ketiga simpanan menjadi basis perhitungan **limit pinjaman** dan **SHU** anggota.

---

### 🏦 B. Mesin Pinjaman

```
┌──────────┐      ┌──────────┐      ┌──────────┐      ┌──────────┐
│ Pengajuan │ ───▶ │  Maker   │ ───▶ │ Checker  │ ───▶ │ Disburse │
│  Anggota  │      │ Verif    │      │ Approve  │      │  Dana    │
└──────────┘      └──────────┘      └──────────┘      └──────────┘
                                                             │
                   ┌──────────┐      ┌──────────┐           │
                   │  LUNAS   │ ◀─── │ Cicilan  │ ◀─────────┘
                   │ Settled  │      │ Repay    │
                   └──────────┘      └──────────┘
```

- Kalkulasi bunga **Flat** dan **Efektif**
- Penalti keterlambatan otomatis via cron
- Cek likuiditas kas sebelum pencairan
- Amortization calculator built-in

---

### 📒 C. Ledger & Riwayat Finansial

- **Double-entry bookkeeping** pada `TransactionHistory`
- **Idempotency key** — Cegah mutasi ganda saat klik berulang/retry
- **Audit log** — Semua aksi admin tercatat dengan metadata request

---

### 🗳️ D. E-Voting RAT

| Fitur | Detail |
|-------|--------|
| **Agenda** | Admin buat agenda + opsi voting |
| **Voting** | Satu anggota = satu suara per agenda |
| **Kontrol** | Publish/close agenda oleh pengurus |
| **Hasil** | Real-time vote count |

---

### 🔔 E. Notifikasi Operasional

Notifikasi otomatis untuk: *pengajuan, verifikasi, approval, penolakan, pelunasan, dan RAT*
— Setiap notifikasi **clickable**, langsung menuju halaman terkait.

---

### 📄 F. Laporan & Dokumen

| Output | Format | Keterangan |
|--------|--------|------------|
| Laporan Arus Kas Bulanan | PDF / XLSX | Diqueue via BullMQ worker |
| E-Statement Anggota | PDF | Per-bulan, downloadable |
| Arsip Laporan | File | Unduh ulang kapanpun |

<br />

---

<br />

## 🔄 Workflow End-to-End

<details>
<summary><strong>👤 Workflow Anggota</strong></summary>

```
1. Registrasi akun (NIK, DOB, gender) → validasi NIK ketat
2. Login credentials
3. Set PIN transaksi 6 digit
4. Ajukan setoran / pinjaman
5. Menunggu persetujuan pengurus (pending → approved / rejected)
6. Jika pinjaman aktif → bayar cicilan
7. Pantau notifikasi & unduh e-statement
```
</details>

<details>
<summary><strong>🛡️ Workflow Pengurus</strong></summary>

```
1. Login sebagai admin
2. Pantau dashboard: kas, simpanan, pinjaman, NPL
3. Proses antrian transaksi:
   ├── Simpanan: approve / reject
   └── Pinjaman: maker verifikasi → checker approve
4. Disburse pinjaman yang sudah valid
5. Kelola agenda RAT & voting
6. Atur parameter sistem (bunga, denda, limit)
7. Generate laporan bulanan & review arsip
```
</details>

<details>
<summary><strong>💳 Workflow Pelunasan Pinjaman</strong></summary>

```
1. Anggota/admin submit pembayaran → endpoint repay
2. Sistem hitung outstanding + denda (jika overdue)
3. Update status: ACTIVE → COMPLETED (saat lunas)
4. Catat jurnal ledger + kirim notifikasi
```
</details>

<details>
<summary><strong>📄 Workflow Laporan Bulanan</strong></summary>

```
1. Admin pilih bulan/tahun dan format (PDF/XLSX)
2. API enqueue job laporan ke BullMQ
3. Worker generate file laporan
4. File diunggah ke storage internal
5. Tampil di arsip laporan untuk diunduh
```
</details>

<br />

---

<br />

## 🔒 Kontrol Keamanan

| Layer | Implementasi |
|-------|-------------|
| **Autentikasi** | NextAuth + session revocation model |
| **Otorisasi** | Role-based: `member`, `admin`, `maker`, `checker` |
| **Anti-IDOR** | Validasi kepemilikan data per endpoint |
| **Rate Limiting** | Proteksi brute-force pada endpoint kritikal |
| **Soft Delete** | Data finansial tidak pernah hard-delete |
| **Idempotency** | Key unik per transaksi finansial |
| **Atomicity** | Prisma transaction untuk mutasi saldo kritis |
| **PIN Transaksi** | Hashed terpisah via `bcryptjs` |
| **Audit Log** | Semua aksi admin + metadata request |
| **RLS** | Row Level Security aktif di Supabase |
| **Error Sanitization** | Tidak bocor stack trace internal |

<br />

---

<br />

## 🏗️ Arsitektur Teknis

```
┌─────────────────────────────────────────────────────┐
│                    CLIENT (PWA)                      │
│        Next.js App Router · SWR · Tailwind           │
│           Offline Queue · Optimistic UI              │
├──────────────────────┬──────────────────────────────┤
│    API Routes        │      Background Workers       │
│  /api/* endpoints    │   BullMQ + Redis              │
│  NextAuth Sessions   │   PDF/XLSX Generation         │
│  Rate Limiter        │   Late Fee Cron               │
├──────────────────────┴──────────────────────────────┤
│               PRISMA ORM (Type-safe)                 │
├─────────────────────────────────────────────────────┤
│           PostgreSQL (Supabase + RLS)                │
│  User · Loan · Transaction · TransactionHistory      │
│  AuditLog · Agenda · VoteOption · UserVote           │
│  SystemSettings · Notification · ApiIdempotency      │
└─────────────────────────────────────────────────────┘
```

<br />

---

<br />

## 🗂️ Peta Modul

```
src/
├── app/
│   ├── admin/                  # 🛡️ Panel pengurus
│   ├── profil/                 # 👤 Pengaturan akun anggota
│   ├── simpanan/               # 💰 Setoran & riwayat simpanan
│   ├── pinjaman/               # 🏦 Pengajuan & pelunasan
│   ├── rat/                    # 🗳️ E-Voting RAT
│   ├── notifikasi/             # 🔔 Pusat notifikasi
│   ├── laporan-keuangan/       # 📊 Laporan publik
│   ├── layanan/                # 🌐 Info layanan
│   ├── institusi/              # 🏛️ Profil, legalitas, AD/ART
│   ├── bantuan/                # 💬 Hubungi & keluhan
│   ├── faq/                    # ❓ FAQ
│   ├── karir/                  # 💼 Karir
│   └── api/
│       ├── auth/               #    Auth + register
│       ├── user/               #    Profil + PIN
│       ├── transactions/       #    Deposit / withdraw
│       ├── loans/              #    Detail + repay
│       ├── admin/              #    Analytics, settings, users, security
│       ├── reports/            #    Queue + file laporan
│       ├── statements/         #    E-statement
│       ├── rat/                #    Agenda + vote
│       ├── cron/               #    Keepalive + late fees
│       └── webhooks/           #    Payment gateway
│
├── components/                 # UI reusable
│   ├── BottomNav.tsx           #    Responsive sidebar + bottom nav
│   ├── DashboardContent.tsx    #    Dashboard utama
│   ├── LoanAmortizationCalculator.tsx
│   ├── OfflineSyncBootstrap.tsx
│   ├── PublicLanding.tsx
│   ├── PublicInfoPage.tsx
│   └── TransactionPinInput.tsx
│
├── lib/                        # Domain logic & infra
│   ├── auth.ts                 #    NextAuth config
│   ├── prisma.ts               #    Client + soft-delete middleware
│   ├── loanMath.ts             #    Bunga & amortisasi
│   ├── loanPenalty.ts          #    Denda keterlambatan
│   ├── loanWorkflow.ts         #    Maker-checker workflow
│   ├── idempotency.ts          #    Request deduplication
│   ├── rateLimit.ts            #    Rate limiting
│   ├── transactionPin.ts       #    PIN hash & verify
│   ├── shu.ts                  #    Kalkulasi SHU
│   ├── logger.ts               #    Pino structured logging
│   ├── offlineTransactionQueue.ts
│   ├── systemSettings.ts
│   └── validateNIK.ts
│
├── proxy.ts                    # Route proxy
└── scripts/
    ├── apply-late-fees.mjs     # Cron: denda harian
    └── report-worker.mjs       # Worker: generate PDF/XLSX
```

<br />

---

<br />

## 📡 API Reference

<details>
<summary><strong>🔐 Auth & User</strong></summary>

| Method | Endpoint | Deskripsi |
|--------|----------|-----------|
| `POST` | `/api/auth/register` | Registrasi anggota baru |
| `POST` | `/api/auth/callback/credentials` | Login |
| `GET` | `/api/user` | Data profile user |
| `PUT` | `/api/user` | Update profile |
| `PUT` | `/api/user/transaction-pin` | Set/ubah PIN transaksi |

</details>

<details>
<summary><strong>💰 Transactions & Loans</strong></summary>

| Method | Endpoint | Deskripsi |
|--------|----------|-----------|
| `GET` | `/api/transactions` | Riwayat transaksi user |
| `POST` | `/api/transactions` | Buat transaksi baru |
| `POST` | `/api/transactions/deposit` | Setoran simpanan |
| `POST` | `/api/transactions/withdraw` | Penarikan dana |
| `GET` | `/api/loans` | Daftar pinjaman user |
| `GET` | `/api/loans/[loanId]` | Detail pinjaman |
| `POST` | `/api/loans/[loanId]/repay` | Bayar cicilan |

</details>

<details>
<summary><strong>🛡️ Admin</strong></summary>

| Method | Endpoint | Deskripsi |
|--------|----------|-----------|
| `GET` | `/api/admin/transactions` | Semua transaksi + metrik |
| `PATCH` | `/api/admin/transactions` | Approve/reject transaksi |
| `GET/PUT` | `/api/admin/settings` | Konfigurasi sistem |
| `GET` | `/api/admin/analytics` | Dashboard analitik |
| `GET/PUT/DELETE` | `/api/admin/users` | Kelola anggota |
| `POST` | `/api/admin/users/create` | Tambah anggota baru |
| `POST` | `/api/admin/loans/[id]/disburse` | Cairkan pinjaman |

</details>

<details>
<summary><strong>🗳️ RAT</strong></summary>

| Method | Endpoint | Deskripsi |
|--------|----------|-----------|
| `GET/POST` | `/api/rat/agendas` | Daftar / buat agenda |
| `PATCH` | `/api/rat/agendas/[agendaId]` | Update / close agenda |
| `POST` | `/api/rat/agendas/[agendaId]/vote` | Submit suara |

</details>

<details>
<summary><strong>📄 Reports</strong></summary>

| Method | Endpoint | Deskripsi |
|--------|----------|-----------|
| `POST` | `/api/reports/monthly` | Generate laporan bulanan |
| `GET` | `/api/reports/files` | Arsip file laporan |
| `GET` | `/api/reports/files/[fileName]` | Download file |
| `GET` | `/api/statements/monthly` | E-statement anggota |

</details>

<br />

---

<br />

## 🚀 Quick Start

### Prasyarat

| Tool | Versi | Keterangan |
|------|-------|------------|
| Node.js | 18+ | Runtime |
| npm | — | Package manager |
| PostgreSQL | 15+ | Database (atau Supabase) |
| Redis | 7+ | Queue worker laporan |

### 1️⃣ Clone & Install

```bash
git clone https://github.com/bicknicktick/KOPERASI-MERAH-PUTIH-BITZYID.git
cd KOPERASI-MERAH-PUTIH-BITZYID
npm install
```

### 2️⃣ Environment Variables

Buat file `.env`:

```env
DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DBNAME"
NEXTAUTH_SECRET="replace-with-strong-secret"
NEXTAUTH_URL="http://localhost:2211"
INTERNAL_APP_URL="http://127.0.0.1:2211"
REDIS_URL="redis://127.0.0.1:6379"
CRON_SECRET="replace-with-strong-secret"
PAYMENT_WEBHOOK_SECRET="replace-with-strong-secret"
REPORT_UPLOAD_SECRET="replace-with-strong-secret"
```

> ⚠️ Generate secrets: `openssl rand -base64 32`

### 3️⃣ Database & Run

```bash
npx prisma generate
npx prisma db push
npm run dev
```

Buka → **http://localhost:2211**

<br />

---

<br />

## ⚙️ Perintah Operasional

```bash
npm run dev                    # Development server (port 2211)
npm run build                  # Production build (+ prisma generate)
npm run start                  # Start production

npm run worker:reports         # Worker laporan bulanan (PDF/XLSX)
npm run cron:late-fees         # Hitung denda keterlambatan

npm run audit:smoke            # Smoke test endpoint & halaman
npm run security:enforce-rls   # Terapkan RLS hardening Supabase
```

<br />

---

<br />

## ☁️ Deployment

### Vercel + Supabase (Recommended)

| Step | Aksi |
|------|------|
| 1 | Set semua environment variables di Vercel |
| 2 | Gunakan Supabase pooler-compatible `DATABASE_URL` |
| 3 | Deploy via Vercel |
| 4 | Verifikasi login, admin endpoints, dan cron |
| 5 | PWA: reinstall jika orientation berubah |

### Cron Aktif

| Endpoint | Fungsi |
|----------|--------|
| `/api/cron/keepalive-db` | Keepalive database |
| `/api/cron/apply-late-fees` | Denda loan overdue |

<br />

---

<br />

## 🔧 Troubleshooting

<details>
<summary><strong>❌ Login 401</strong></summary>

- Cek `NEXTAUTH_SECRET`, `NEXTAUTH_URL`, `DATABASE_URL`
- Pastikan user aktif (`isActive=true`, `deletedAt=null`)
- Verifikasi hash password user
</details>

<details>
<summary><strong>❌ Endpoint 429</strong></summary>

- Rate limit endpoint kritikal aktif
- Tunggu window reset atau sesuaikan konfigurasi limiter
</details>

<details>
<summary><strong>❌ Report Monthly timeout/503</strong></summary>

- Cek `REDIS_URL` dan status worker
- Endpoint sekarang fail-fast agar tidak hang
</details>

<details>
<summary><strong>❌ Tablet layout terpotong</strong></summary>

- Pastikan manifest terbaru ter-load
- PWA lama: uninstall lalu install ulang
</details>

<br />

---

<br />

## 🎨 Branding

| Aset | Path |
|------|------|
| Brand Mark | `public/brand-mark.svg` |
| Favicon | `public/favicon.ico` |
| Icon 192px | `public/icon-192.png` |
| Icon 512px | `public/icon-512.png` |

<br />

---

<br />

## 📜 License

This project is licensed under the [MIT License](LICENSE).

<br />

---

<div align="center">

  <br />

  **Built & maintained by [Bitzy.ID](https://cv.bitzy.id)**

  <br />

  [![Support via PayPal](https://img.shields.io/badge/Support-PayPal-00457C?style=for-the-badge&logo=paypal&logoColor=white)](https://paypal.me/bitzyid)
  [![Portfolio](https://img.shields.io/badge/Portfolio-cv.bitzy.id-DC2626?style=for-the-badge&logo=googlechrome&logoColor=white)](https://cv.bitzy.id)

  <br />

  <sub>🇮🇩 Open source untuk kemajuan koperasi Indonesia</sub>

</div>
