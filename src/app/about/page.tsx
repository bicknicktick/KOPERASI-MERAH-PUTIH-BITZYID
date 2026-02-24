"use client";

import NavMenu from "@/components/BottomNav";

export default function AboutPage() {
  return (
    <div className="flex flex-col md:flex-row min-h-[100dvh] bg-[#fcfdfe] font-inter">
      <NavMenu />
      <main className="flex-1 w-full md:ml-72 pb-40 md:pb-12 px-6 md:px-12 pt-12 md:pt-16">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight mb-8">Tentang Koperasi</h1>
          <div className="elegant-card p-8 bg-white space-y-6 text-slate-600 leading-relaxed">
            <p>
              <strong>Koperasi Merah Putih Desa Bangeran</strong> adalah lembaga ekonomi kerakyatan yang bertujuan untuk meningkatkan kesejahteraan masyarakat desa melalui sistem simpan pinjam yang transparan dan akuntabel.
            </p>
            <p>
              Visi kami adalah menjadi pilar ekonomi utama di Desa Bangeran dengan memanfaatkan teknologi modern untuk kemudahan akses bagi seluruh warga.
            </p>
            <h3 className="text-slate-900 font-bold text-lg pt-4 border-t">Misi Kami</h3>
            <ul className="list-disc pl-5 space-y-2">
              <li>Menyediakan layanan simpanan yang aman dan menguntungkan.</li>
              <li>Memberikan solusi pinjaman dana cepat untuk kebutuhan produktif maupun darurat.</li>
              <li>Menjaga integritas dan kepercayaan warga melalui sistem digital terpadu.</li>
            </ul>
          </div>
        </div>
      </main>
    </div>
  );
}