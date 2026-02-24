"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { toast } from "react-hot-toast";

export default function RegisterPage() {
  const [form, setForm] = useState({ nik: "", name: "", password: "" });
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const toastId = toast.loading("Menyimpan data pendaftaran...");

    const res = await fetch("/api/auth/register", {
      method: "POST",
      body: JSON.stringify(form),
      headers: { "Content-Type": "application/json" },
    });

    const data = await res.json();

    if (!res.ok) {
      toast.error(data.error || "Pendaftaran gagal, periksa data Anda.", { id: toastId });
      setLoading(false);
    } else {
      toast.success("Pendaftaran berhasil! Mengalihkan...", { id: toastId });
      setTimeout(() => {
        router.push("/login");
      }, 1500);
    }
  };

  return (
    <main className="min-h-[100dvh] bg-background text-foreground flex flex-col justify-center items-center px-6 py-16 overflow-y-auto">
      <div className="w-full max-w-[400px]">
        <div className="text-center mb-10">
          <div className="w-16 h-16 bg-slate-900 dark:bg-slate-800 rounded-2xl mx-auto flex items-center justify-center shadow-xl mb-6 border border-slate-800 dark:border-slate-700">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" /></svg>
          </div>
          <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-2">Buat Akun</h1>
          <p className="text-slate-500 dark:text-slate-400 font-medium text-sm">Pendaftaran Anggota Desa Bangeran</p>
        </div>

        <div className="md:elegant-card md:p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">NIK KTP</label>
              <input
                type="text"
                className="elegant-input"
                placeholder="16 Digit NIK"
                value={form.nik}
                onChange={(e) => setForm({ ...form, nik: e.target.value })}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">Nama Lengkap</label>
              <input
                type="text"
                className="elegant-input"
                placeholder="Nama Lengkap Sesuai KTP"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">Kata Sandi</label>
              <input
                type="password"
                className="elegant-input"
                placeholder="Minimal 6 Karakter"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full elegant-btn-primary"
            >
              {loading ? "Menyimpan..." : "Daftar Sekarang"}
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-slate-100 dark:border-slate-800 text-center">
            <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">
              Sudah punya akun?{" "}
              <Link href="/login" className="text-red-600 dark:text-red-500 font-bold hover:text-red-700 dark:hover:text-red-400 transition-colors">
                Masuk
              </Link>
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}