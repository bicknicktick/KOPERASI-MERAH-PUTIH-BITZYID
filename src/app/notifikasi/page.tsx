"use client";

import { useEffect, useState } from "react";
import NavMenu from "@/components/BottomNav";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import useSWR from "swr";
import { ArrowLeftIcon, BellIcon, CheckCircleIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import clsx from "clsx";

const fetcher = (url: string) => fetch(url).then(res => res.json());

export default function NotifikasiPage() {
    const { data: notifications, mutate } = useSWR("/api/notifications", fetcher, { refreshInterval: 10000 });

    useEffect(() => {
        // Mark as read when opened
        const markRead = async () => {
            if (notifications && notifications.some((n: any) => !n.isRead)) {
                await fetch("/api/notifications", { method: "PUT" });
                mutate();
            }
        };
        markRead();
    }, [notifications, mutate]);

    return (
        <div className="flex flex-col md:flex-row min-h-[100dvh] bg-slate-50 dark:bg-[#020617] font-inter">
            <NavMenu />

            <main className="flex-1 w-full md:ml-72 pb-40 md:pb-12 px-6 md:px-12 pt-12 md:pt-16">
                <div className="max-w-3xl mx-auto">
                    <Link href="/" prefetch={true} className="inline-flex items-center gap-2 text-slate-400 font-bold text-xs uppercase tracking-widest hover:text-red-600 transition-colors mb-6">
                        <ArrowLeftIcon className="w-4 h-4" />
                        Kembali
                    </Link>

                    <div className="flex items-center gap-4 mb-10">
                        <div className="w-12 h-12 bg-red-100 dark:bg-red-500/10 rounded-2xl flex items-center justify-center text-red-600 dark:text-red-500">
                            <BellIcon className="w-6 h-6" />
                        </div>
                        <h1 className="text-3xl font-bold text-slate-800 dark:text-white tracking-tight">Notifikasi</h1>
                    </div>

                    <div className="space-y-4">
                        {!notifications ? (
                            [1, 2, 3].map(i => <div key={i} className="h-24 elegant-card animate-pulse"></div>)
                        ) : notifications.length === 0 ? (
                            <div className="elegant-card p-12 text-center flex flex-col items-center justify-center border-dashed border border-slate-200/70 dark:border-slate-700/70">
                                <BellIcon className="w-12 h-12 text-slate-300 dark:text-slate-600 mb-4" />
                                <p className="text-slate-500 dark:text-slate-500 font-medium text-sm">Belum ada notifikasi saat ini.</p>
                            </div>
                        ) : (
                            notifications.map((notif: any) => (
                                <div key={notif.id} className={clsx(
                                    "elegant-card p-5 md:p-6 transition-colors border-l-4",
                                    notif.isRead ? "border-l-transparent" : "border-l-red-500 bg-red-50/30 dark:bg-red-900/10"
                                )}>
                                    <div className="flex justify-between items-start mb-2">
                                        <h3 className={clsx("font-bold text-sm md:text-base", notif.isRead ? "text-slate-700 dark:text-slate-200" : "text-slate-900 dark:text-white")}>
                                            {notif.title}
                                        </h3>
                                        <span className="text-[10px] font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-widest whitespace-nowrap ml-4">
                                            {format(new Date(notif.createdAt), 'dd MMM yyyy', { locale: id })}
                                        </span>
                                    </div>
                                    <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                                        {notif.message}
                                    </p>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </main>
        </div>
    );
}
