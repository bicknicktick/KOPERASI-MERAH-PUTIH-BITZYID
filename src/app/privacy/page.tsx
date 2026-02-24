"use client";

import NavMenu from "@/components/BottomNav";

export default function PrivacyPage() {
  return (
    <div className="flex flex-col md:flex-row min-h-[100dvh] bg-[#fcfdfe] font-inter">
      <NavMenu />
      <main className="flex-1 w-full md:ml-72 pb-40 md:pb-12 px-6 md:px-12 pt-12 md:pt-16">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight mb-8">Kebijakan Privasi</h1>
          <div className="elegant-card p-8 bg-white space-y-6 text-slate-600 leading-relaxed">
            <p className="font-bold text-slate-900 italic">Terakhir diperbarui: 24 Februari 2026</p>
            <p>
              Kami di Koperasi Merah Putih sangat menghormati privasi data Anda. Kebijakan ini menjelaskan bagaimana kami mengelola data Anda.
            </p>
            <h3 className="text-slate-900 font-bold text-lg pt-4 border-t">Data yang Kami Kumpulkan</h3>
            <p>
              Kami mengumpulkan Nomor Induk Kependudukan (NIK) dan Nama Lengkap sebagai syarat otentikasi anggota koperasi yang sah di Desa Bangeran.
            </p>
            <h3 className="text-slate-900 font-bold text-lg pt-4 border-t">Penggunaan Data</h3>
            <p>
              Data Anda hanya digunakan untuk keperluan internal koperasi, termasuk pencatatan transaksi, verifikasi identitas, dan pelaporan berkala bagi pengurus. Kami tidak pernah membagikan data Anda ke pihak ketiga di luar struktur kepengurusan Desa Bangeran tanpa seizin Anda.
            </p>
            <h3 className="text-slate-900 font-bold text-lg pt-4 border-t">Keamanan</h3>
            <p>
              Kami menggunakan enkripsi kata sandi standar industri (Bcrypt) untuk melindungi akses akun Anda.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}