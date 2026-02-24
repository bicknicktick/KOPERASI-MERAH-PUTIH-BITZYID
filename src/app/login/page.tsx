"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { toast } from "react-hot-toast";
import AppLogo from "@/components/AppLogo";

export default function LoginPage() {
  const [nik, setNik] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const toastId = toast.loading("Melakukan otentikasi...");

    const res = await signIn("credentials", {
      nik,
      password,
      redirect: false,
    });

    if (res?.error) {
      toast.error("NIK atau Password yang Anda masukkan salah.", { id: toastId });
      setLoading(false);
    } else {
      toast.success("Otentikasi berhasil! Mengalihkan...", { id: toastId });
      router.replace("/");
      router.refresh();
    }
  };

  return (
    <main className="min-h-[100dvh] bg-white dark:bg-[#020617] md:bg-slate-50 md:dark:bg-slate-950 flex flex-col justify-center items-center px-6 py-16 overflow-y-auto">
      <div className="w-full max-w-[400px]">
        {/* Branding Area */}
        <div className="text-center mb-10 flex flex-col items-center">
          <AppLogo className="w-16 h-16 mb-6" />
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white tracking-tight mb-2">Selamat Datang</h1>
          <p className="text-slate-500 dark:text-slate-400 font-medium text-sm">Sistem Informasi Koperasi Merah Putih</p>
        </div>

        <div className="md:elegant-card md:p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">Nomor Induk Kependudukan</label>
              <input
                type="text"
                className="elegant-input"
                placeholder="Masukkan 16 digit NIK"
                value={nik}
                onChange={(e) => setNik(e.target.value)}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">Kata Sandi</label>
              <input
                type="password"
                className="elegant-input"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full elegant-btn-primary"
            >
              {loading ? "Menghubungkan..." : "Masuk ke Akun"}
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-slate-100 dark:border-slate-800 text-center">
            <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">
              Belum menjadi anggota?{" "}
              <Link href="/register" className="text-red-600 dark:text-red-500 font-bold hover:text-red-700 dark:hover:text-red-400 transition-colors">
                Daftar Sekarang
              </Link>
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}