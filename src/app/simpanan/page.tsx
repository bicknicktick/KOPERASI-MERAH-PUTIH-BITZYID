"use client";

import { useState, useEffect } from "react";
import NavMenu from "@/components/BottomNav";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import { toast } from "react-hot-toast";
import useSWR from "swr";
import {
  ArrowLeftIcon,
  PlusIcon,
  WalletIcon
} from "@heroicons/react/24/outline";
import Link from "next/link";
import clsx from "clsx";

const fetcher = (url: string) => fetch(url).then(res => res.json());

export default function SimpananPage() {
  const { data: user } = useSWR("/api/user", fetcher, { refreshInterval: 5000 });
  const { data: transactions, mutate } = useSWR("/api/transactions", fetcher, { refreshInterval: 5000 });

  const [amount, setAmount] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const formatter = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  });

  const simpananTrx = (transactions || []).filter((t: any) => t.type === 'simpanan');

  const handleSetor = async (e: React.FormEvent) => {
    e.preventDefault();
    const rawAmount = parseInt(amount.replace(/\D/g, ""));
    if (!rawAmount || rawAmount < 10000) {
      toast.error("Minimal setoran adalah Rp 10.000");
      return;
    }

    setIsSubmitting(true);
    const tid = toast.loading("Mengirim pengajuan setoran...");

    try {
      const res = await fetch("/api/transactions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: "simpanan", amount: rawAmount })
      });

      if (res.ok) {
        toast.success("Pengajuan berhasil dikirim.", { id: tid });
        setAmount("");
        mutate();
      } else {
        toast.error("Gagal mengirim pengajuan.", { id: tid });
      }
    } catch (err) {
      toast.error("Terjadi kesalahan koneksi.", { id: tid });
    }
    setIsSubmitting(false);
  };

  const handleFormat = (val: string) => {
    const raw = val.replace(/\D/g, "");
    if (!raw) return "";
    return formatter.format(parseInt(raw)).replace("Rp", "").trim();
  };

  return (
    <div className="flex flex-col md:flex-row min-h-[100dvh] bg-slate-50 dark:bg-[#020617] font-inter">
      <NavMenu />

      <main className="flex-1 w-full md:ml-72 pb-40 md:pb-12 px-6 md:px-12 pt-12 md:pt-16">
        <div className="max-w-5xl mx-auto">
          <Link href="/" prefetch={true} className="inline-flex items-center gap-2 text-slate-400 font-bold text-xs uppercase tracking-widest hover:text-red-600 transition-colors mb-6">
            <ArrowLeftIcon className="w-4 h-4" />
            Kembali
          </Link>

          <h1 className="text-3xl font-bold text-slate-800 dark:text-white tracking-tight mb-10">Simpanan Dana</h1>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            <div className="lg:col-span-5">
              <div className="bg-red-600 rounded-[2rem] p-8 md:p-10 text-white shadow-xl shadow-red-200 dark:shadow-none mb-10 relative overflow-hidden">
                <div className="absolute -right-8 -top-8 w-40 h-40 bg-white/10 rounded-full blur-3xl"></div>
                <p className="text-red-100 text-sm font-medium mb-2">Total Tabungan Anda</p>
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight truncate pb-2">
                  {user ? formatter.format(user.balance) : <div className="h-10 w-48 bg-white/20 animate-pulse rounded-lg mt-2"></div>}
                </h2>
              </div>

              <div className="elegant-card p-8 bg-white dark:bg-slate-900/50">
                <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-6 flex items-center gap-2">
                  <div className="w-1.5 h-6 bg-red-600 rounded-full"></div>
                  Setoran Baru
                </h3>
                <form onSubmit={handleSetor} className="space-y-6">
                  <div>
                    <label className="block text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-3">Nominal Setoran</label>
                    <div className="relative">
                      <span className="absolute left-5 top-1/2 -translate-y-1/2 font-bold text-slate-500 dark:text-slate-300">Rp</span>
                      <input
                        type="text"
                        value={amount}
                        onChange={(e) => setAmount(handleFormat(e.target.value))}
                        className="elegant-input pl-16 text-xl font-bold text-slate-900 dark:text-white bg-slate-50/80 border border-slate-200 focus:border-red-400 dark:bg-slate-900/80 dark:border-slate-700 dark:focus:border-red-500"
                        placeholder="0"
                        required
                      />
                    </div>
                  </div>
                  <button
                    type="submit"
                    disabled={isSubmitting || !amount}
                    className="w-full elegant-btn-primary flex items-center justify-center gap-2"
                  >
                    <PlusIcon className="w-5 h-5" />
                    {isSubmitting ? "Memproses..." : "Konfirmasi Setoran"}
                  </button>
                </form>
              </div>
            </div>

            <div className="lg:col-span-7">
              <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-8">Riwayat Setoran</h3>
              {!transactions ? (
                <div className="space-y-4">
                  {[1, 2, 3].map(i => <div key={i} className="h-24 elegant-card animate-pulse"></div>)}
                </div>
              ) : simpananTrx.length === 0 ? (
                <div className="elegant-card p-12 text-center text-slate-400 dark:text-slate-500 font-medium border-dashed border border-slate-200/70 dark:border-slate-700/70">
                  Belum ada catatan setoran dana.
                </div>
              ) : (
                <div className="space-y-4">
                  {simpananTrx.map((trx: any) => (
                    <div key={trx.id} className="elegant-card p-6 flex justify-between items-center hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors">
                      <div className="flex items-center gap-5">
                        <div className="w-12 h-12 bg-slate-50 dark:bg-slate-800 rounded-2xl flex items-center justify-center text-slate-700 dark:text-slate-300 shadow-sm border border-slate-100 dark:border-slate-800">
                          <WalletIcon className="w-6 h-6" />
                        </div>
                        <div>
                          <p className="font-bold text-slate-800 dark:text-slate-200 uppercase text-xs tracking-wider">Setoran Tunai</p>
                          <p className="text-xs text-slate-500 dark:text-slate-400 font-medium mt-0.5">{format(new Date(trx.createdAt), 'dd MMMM yyyy', { locale: id })}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-bold text-slate-800 dark:text-white">+{formatter.format(trx.amount)}</p>
                        <div className="flex items-center justify-end gap-1.5 mt-1.5">
                          <div className={clsx(
                            "w-1.5 h-1.5 rounded-full",
                            trx.status === 'approved' ? 'bg-emerald-500' : trx.status === 'pending' ? 'bg-amber-500' : 'bg-red-500'
                          )}></div>
                          <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">{trx.status}</span>
                        </div>
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