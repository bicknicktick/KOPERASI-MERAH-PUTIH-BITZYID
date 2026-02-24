"use client";

import { useState, useEffect } from "react";
import NavMenu from "@/components/BottomNav";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import { toast } from "react-hot-toast";
import {
  ArrowLeftIcon,
  BanknotesIcon,
  ArrowUpIcon
} from "@heroicons/react/24/outline";
import Link from "next/link";

export default function PinjamanPage() {
  const [user, setUser] = useState<any>(null);
  const [transactions, setTransactions] = useState<any[]>([]);
  const [amount, setAmount] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    fetch("/api/user").then(res => res.json()).then(data => setUser(data));
    fetch("/api/transactions").then(res => res.json()).then(data => setTransactions(data));
  }, []);

  const formatter = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  });

  const pinjamanTrx = transactions.filter(t => t.type === 'pinjaman');
  const activePinjaman = pinjamanTrx.find(t => t.status === 'approved' || t.status === 'pending');

  const handlePinjam = async (e: React.FormEvent) => {
    e.preventDefault();
    const rawAmount = parseInt(amount.replace(/\D/g, ""));
    if (!rawAmount || rawAmount < 100000) {
      toast.error("Minimal pinjaman adalah Rp 100.000");
      return;
    }

    if (activePinjaman) {
      toast.error("Anda masih memiliki pinjaman aktif.");
      return;
    }

    setIsSubmitting(true);
    const tid = toast.loading("Mengirim pengajuan pinjaman...");

    try {
      const res = await fetch("/api/transactions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: "pinjaman", amount: rawAmount })
      });

      if (res.ok) {
        toast.success("Pengajuan terkirim! Silakan hubungi pengurus desa.", { id: tid });
        setAmount("");
        fetch("/api/transactions").then(r => r.json()).then(data => setTransactions(data));
      } else {
        toast.error("Gagal mengajukan pinjaman.", { id: tid });
      }
    } catch (err) {
      toast.error("Kesalahan koneksi.", { id: tid });
    }
    setIsSubmitting(false);
  };

  const handleFormat = (val: string) => {
    const raw = val.replace(/\D/g, "");
    if (!raw) return "";
    return formatter.format(parseInt(raw)).replace("Rp", "").trim();
  };

  if (!user) return <div className="min-h-[100dvh] bg-slate-50 flex justify-center items-center"><div className="w-8 h-8 border-4 border-red-600 border-t-transparent rounded-full animate-spin"></div></div>;

  return (
    <div className="flex flex-col md:flex-row min-h-[100dvh] bg-[#fcfdfe] dark:bg-[#020617] font-inter">
      <NavMenu />

      <main className="flex-1 w-full md:ml-72 pb-40 md:pb-12 px-6 md:px-12 pt-12 md:pt-16">
        <div className="max-w-5xl mx-auto">
          <Link href="/" prefetch={true} className="inline-flex items-center gap-2 text-slate-400 font-bold text-xs uppercase tracking-widest hover:text-red-600 transition-colors mb-6">
            <ArrowLeftIcon className="w-4 h-4" />
            Kembali
          </Link>

          <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-10">Pinjaman Dana</h1>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            <div className="lg:col-span-5">
              <div className="bg-slate-900 rounded-[2rem] p-8 md:p-10 text-white shadow-2xl shadow-slate-200 mb-10 relative overflow-hidden">
                <div className="absolute -left-8 -top-8 w-40 h-40 bg-white/5 rounded-full blur-3xl"></div>
                <p className="text-slate-400 text-sm font-semibold mb-2">Sisa Pinjaman Aktif</p>
                <h2 className="text-4xl md:text-5xl font-extrabold tracking-tighter text-red-500">{formatter.format(activePinjaman?.amount || 0)}</h2>
              </div>

              <div className="elegant-card p-8 bg-white dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-700/80">
                <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 mb-6 flex items-center gap-2">
                  <div className="w-2 h-6 bg-red-600 rounded-full"></div>
                  Pengajuan Baru
                </h3>
                <form onSubmit={handlePinjam} className="space-y-6">
                  <div>
                    <label className="block text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-3">Nominal Pinjaman</label>
                    <div className="relative">
                      <span className="absolute left-5 top-1/2 -translate-y-1/2 font-bold text-slate-500 dark:text-slate-300">Rp</span>
                      <input
                        type="text"
                        value={amount}
                        onChange={(e) => setAmount(handleFormat(e.target.value))}
                        className="elegant-input pl-16 text-xl font-bold text-slate-900 dark:text-white bg-slate-50/80 border border-slate-200 focus:border-red-400 dark:bg-slate-900/80 dark:border-slate-700 dark:focus:border-red-500"
                        placeholder="0"
                        disabled={!!activePinjaman}
                        required
                      />
                    </div>
                  </div>
                  <button
                    type="submit"
                    disabled={isSubmitting || !amount || !!activePinjaman}
                    className="w-full elegant-btn-primary flex items-center justify-center gap-2"
                  >
                    <ArrowUpIcon className="w-5 h-5" />
                    {!!activePinjaman ? "Pinjaman Masih Aktif" : isSubmitting ? "Memproses..." : "Ajukan Pinjaman"}
                  </button>
                </form>
              </div>
            </div>

            <div className="lg:col-span-7">
              <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-8">Riwayat Pinjaman</h3>
              {pinjamanTrx.length === 0 ? (
                <div className="elegant-card p-12 text-center text-slate-400 dark:text-slate-500 font-medium border-dashed border border-slate-200/70 dark:border-slate-700/70">
                  Belum ada pengajuan pinjaman terdaftar.
                </div>
              ) : (
                <div className="space-y-4">
                  {pinjamanTrx.map((trx: any) => (
                    <div key={trx.id} className="elegant-card p-6 flex justify-between items-center hover:bg-slate-50 transition-colors">
                      <div className="flex items-center gap-5">
                        <div className="w-12 h-12 bg-red-50 rounded-2xl flex items-center justify-center text-red-600">
                          <BanknotesIcon className="w-6 h-6" />
                        </div>
                        <div>
                          <p className="font-bold text-slate-900 uppercase text-sm tracking-wide">Pinjaman Dana</p>
                          <p className="text-xs text-slate-400 font-semibold">{format(new Date(trx.createdAt), 'dd MMMM yyyy', { locale: id })}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-black text-red-600">-{formatter.format(trx.amount)}</p>
                        <span className={`text-[10px] font-black uppercase tracking-widest px-2 py-1 rounded-lg border mt-1 inline-block ${trx.status === 'approved' ? 'bg-green-50 border-green-200 text-green-700' :
                            trx.status === 'pending' ? 'bg-orange-50 border-orange-200 text-orange-600' : 'bg-red-50 border-red-200 text-red-700'
                          }`}>
                          {trx.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}