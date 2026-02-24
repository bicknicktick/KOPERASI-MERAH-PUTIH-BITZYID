"use client";

import { useEffect, useState } from "react";
import NavMenu from "@/components/BottomNav";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import clsx from "clsx";
import Link from "next/link";
import { useSession } from "next-auth/react";
import useSWR from "swr";
import {
  ArrowDownIcon,
  ArrowUpIcon,
  WalletIcon,
  PlusIcon
} from "@heroicons/react/24/outline";

const fetcher = (url: string) => fetch(url).then(res => res.json());

export default function DashboardContent() {
  const { data: session } = useSession();

  // Real-time polling with SWR (every 5 seconds)
  const { data: user, error: userError } = useSWR("/api/user", fetcher, { refreshInterval: 5000 });
  const { data: transactions, error: trxError } = useSWR("/api/transactions", fetcher, { refreshInterval: 5000 });

  const formatter = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  });

  return (
    <div className="flex flex-col md:flex-row min-h-[100dvh] bg-[#fcfdfe] dark:bg-[#020617] font-inter">
      <NavMenu />

      <main className="flex-1 w-full md:ml-72 pb-40 md:pb-12">
        <div className="px-6 md:px-12 pt-12 md:pt-16 pb-8">
          <div className="max-w-5xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <h1 className="text-3xl font-bold text-slate-800 dark:text-white tracking-tight">
                Halo, {user ? user.name.split(' ')[0] : 'Memuat...'} 👋
              </h1>
              <p className="text-slate-500 dark:text-slate-400 font-medium mt-1.5 text-sm md:text-base">Pantau perkembangan saldo dan pengajuan Anda hari ini.</p>
            </div>

            <div className="flex items-center gap-4">
              <div className="text-right hidden sm:block">
                <p className="text-[10px] font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-widest">ID ANGGOTA</p>
                <p className="text-sm font-semibold text-slate-700 dark:text-slate-300">{user ? user.nik : '---'}</p>
              </div>
              <div className="w-12 h-12 bg-red-50 dark:bg-red-500/10 border border-red-100 dark:border-red-500/20 rounded-2xl flex items-center justify-center text-red-600 dark:text-red-500 font-bold text-lg shadow-sm">
                {user ? user.name.charAt(0) : '-'}
              </div>
            </div>
          </div>

          <div className="max-w-5xl mx-auto mt-10 grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Balance Card */}
            <div className="lg:col-span-2 bg-slate-900 dark:bg-slate-900/80 rounded-[2rem] p-8 md:p-10 text-white relative overflow-hidden shadow-xl shadow-slate-200/50 dark:shadow-none">
              <div className="absolute top-0 right-0 w-64 h-64 bg-slate-800 rounded-full blur-[80px] -mr-32 -mt-32"></div>
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-white/10 backdrop-blur-md rounded-xl flex items-center justify-center border border-white/5">
                    <WalletIcon className="w-5 h-5 text-white" />
                  </div>
                  <p className="text-sm font-medium text-slate-300">Total Simpanan Aktif</p>
                </div>
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-4 truncate pb-2">
                  {user ? formatter.format(user.balance) : 'Rp 0'}
                </h2>
                <div className="flex items-center gap-2 text-emerald-400 text-sm font-medium">
                  <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                  Dana Tersedia
                </div>
              </div>
            </div>

            {/* Side Card / Action */}
            <div className="bg-red-600 rounded-[2rem] p-8 md:p-10 text-white shadow-xl shadow-red-200/50 dark:shadow-none flex flex-col justify-between relative overflow-hidden">
              <div className="absolute bottom-0 right-0 w-40 h-40 bg-white/10 rounded-full blur-[60px] -mr-10 -mb-10"></div>
              <div className="relative z-10">
                <h3 className="text-xl font-bold mb-3">Butuh Dana Cepat?</h3>
                <p className="text-red-100/90 text-sm leading-relaxed font-medium">Pengajuan pinjaman transparan untuk anggota koperasi terdaftar.</p>
              </div>
              <Link href="/pinjaman" className="relative z-10 bg-white text-red-600 font-semibold py-3.5 rounded-xl text-center text-sm shadow-md transition-all hover:shadow-lg hover:-translate-y-0.5 mt-6 block">
                Ajukan Pinjaman
              </Link>
            </div>
          </div>
        </div>

        <div className="max-w-5xl mx-auto px-6 md:px-12 mt-4 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">

          <div className="lg:col-span-8">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-bold text-slate-800 dark:text-white">Aktivitas Terakhir</h2>
            </div>

            <div className="space-y-4">
              {!user ? (
                <div className="elegant-card p-12 flex justify-center items-center"><div className="w-6 h-6 border-4 border-slate-200 border-t-slate-800 rounded-full animate-spin"></div></div>
              ) : transactions?.length === 0 ? (
                <div className="elegant-card p-12 text-center text-slate-500 dark:text-slate-400 font-medium text-sm">Belum ada aktivitas transaksi yang terdaftar.</div>
              ) : (transactions || []).map((trx: any) => (
                <div key={trx.id} className="elegant-card p-5 flex items-center justify-between hover:border-slate-200 dark:hover:border-slate-700 group transition-colors">
                  <div className="flex items-center gap-4 md:gap-5">
                    <div className={clsx(
                      "w-12 h-12 rounded-2xl flex items-center justify-center transition-colors shadow-sm",
                      trx.type === 'simpanan' ? 'bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 group-hover:bg-slate-100 dark:group-hover:bg-slate-700' : 'bg-red-50 dark:bg-red-500/10 text-red-600 dark:text-red-500 group-hover:bg-red-100 dark:group-hover:bg-red-500/20'
                    )}>
                      {trx.type === 'simpanan' ? <ArrowDownIcon className="w-5 h-5" /> : <ArrowUpIcon className="w-5 h-5" />}
                    </div>
                    <div>
                      <p className="font-semibold text-slate-800 dark:text-slate-200 capitalize text-sm md:text-base">{trx.type}</p>
                      <p className="text-xs text-slate-500 dark:text-slate-400 font-medium mt-0.5">{format(new Date(trx.createdAt), 'dd MMMM yyyy', { locale: id })}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className={clsx("text-base md:text-lg font-bold tracking-tight", trx.type === 'simpanan' ? 'text-slate-800 dark:text-white' : 'text-slate-800 dark:text-white')}>
                      {trx.type === 'simpanan' ? '+' : '-'}{formatter.format(trx.amount)}
                    </p>
                    <div className="flex items-center justify-end gap-1.5 mt-1.5">
                      <div className={clsx(
                        "w-1.5 h-1.5 rounded-full",
                        trx.status === 'approved' ? 'bg-emerald-500' : trx.status === 'pending' ? 'bg-amber-500' : 'bg-red-500'
                      )}></div>
                      <span className="text-[10px] font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-widest">{trx.status}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-4">
            <h2 className="text-lg font-bold text-slate-800 dark:text-white mb-6">Menu Operasional</h2>
            <div className="grid grid-cols-1 gap-4">
              <Link href="/simpanan" className="elegant-card p-5 flex items-center gap-4 hover:border-slate-300 dark:hover:border-slate-700 group transition-all">
                <div className="w-12 h-12 rounded-xl bg-slate-50 dark:bg-slate-800 flex items-center justify-center group-hover:bg-slate-100 dark:group-hover:bg-slate-700 text-slate-700 dark:text-slate-300 transition-colors shadow-sm border border-slate-100 dark:border-slate-800">
                  <PlusIcon className="w-5 h-5" />
                </div>
                <div>
                  <p className="font-semibold text-slate-800 dark:text-slate-200 text-sm">Setor Dana</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400 font-medium mt-0.5">Tambahkan saldo simpanan</p>
                </div>
              </Link>
              <Link href="/pinjaman" className="elegant-card p-5 flex items-center gap-4 hover:border-slate-300 dark:hover:border-slate-700 group transition-all">
                <div className="w-12 h-12 rounded-xl bg-slate-50 dark:bg-slate-800 flex items-center justify-center group-hover:bg-slate-100 dark:group-hover:bg-slate-700 text-slate-700 dark:text-slate-300 transition-colors shadow-sm border border-slate-100 dark:border-slate-800">
                  <ArrowUpIcon className="w-5 h-5" />
                </div>
                <div>
                  <p className="font-semibold text-slate-800 dark:text-slate-200 text-sm">Tarik Dana</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400 font-medium mt-0.5">Ajukan permohonan pinjaman</p>
                </div>
              </Link>
              {(session?.user as any)?.role === 'admin' && (
                <Link href="/admin" className="elegant-card p-5 flex items-center gap-4 hover:bg-slate-800 dark:hover:bg-slate-700 group bg-slate-900 dark:bg-slate-800/80 text-white mt-2 border-slate-900 dark:border-slate-700 transition-all">
                  <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center text-white border border-white/10">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
                  </div>
                  <div>
                    <p className="font-semibold text-white text-sm">Panel Pengurus</p>
                    <p className="text-xs text-slate-300 dark:text-slate-400 font-medium mt-0.5">Sistem administrasi pusat</p>
                  </div>
                </Link>
              )}
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}