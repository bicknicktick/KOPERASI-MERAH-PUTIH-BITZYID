"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import { useTheme } from "next-themes";
import {
  HomeIcon,
  WalletIcon,
  BanknotesIcon,
  UserCircleIcon,
  ShieldCheckIcon,
  SunIcon,
  MoonIcon,
  BellIcon
} from "@heroicons/react/24/outline";
import {
  HomeIcon as HomeSolid,
  WalletIcon as WalletSolid,
  BanknotesIcon as BanknotesSolid,
  UserCircleIcon as UserSolid,
  ShieldCheckIcon as ShieldCheckSolid,
  BellIcon as BellSolid
} from "@heroicons/react/24/solid";
import clsx from "clsx";
import { useEffect, useState } from "react";
import useSWR from "swr";
import AppLogo from "./AppLogo";

const fetcher = (url: string) => fetch(url).then(res => res.json());

export default function NavMenu() {
  const pathname = usePathname();
  const { data: session } = useSession();
  const { setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const userRole = (session?.user as any)?.role || 'member';

  useEffect(() => setMounted(true), []);

  const { data: notifications } = useSWR("/api/notifications", fetcher, { refreshInterval: 10000 });
  const hasUnread = notifications?.some((n: any) => !n.isRead);

  // ROLE-BASED NAVIGATION LINKS
  const memberLinks = [
    { name: "Beranda", href: "/", icon: HomeIcon, activeIcon: HomeSolid },
    { name: "Simpanan", href: "/simpanan", icon: WalletIcon, activeIcon: WalletSolid },
    { name: "Pinjaman", href: "/pinjaman", icon: BanknotesIcon, activeIcon: BanknotesSolid },
    { name: "Notifikasi", href: "/notifikasi", icon: BellIcon, activeIcon: BellSolid },
    { name: "Profil", href: "/profil", icon: UserCircleIcon, activeIcon: UserSolid },
  ];

  const adminLinks = [
    { name: "Beranda", href: "/", icon: HomeIcon, activeIcon: HomeSolid },
    { name: "Simpanan", href: "/simpanan", icon: WalletIcon, activeIcon: WalletSolid },
    { name: "Notifikasi", href: "/notifikasi", icon: BellIcon, activeIcon: BellSolid },
    { name: "Pengurus", href: "/admin", icon: ShieldCheckIcon, activeIcon: ShieldCheckSolid },
    { name: "Profil", href: "/profil", icon: UserCircleIcon, activeIcon: UserSolid },
  ];

  const links = userRole === 'admin' ? adminLinks : memberLinks;

  const toggleTheme = () => {
    setTheme(resolvedTheme === 'dark' ? 'light' : 'dark');
  };

  return (
    <>
      {/* Mobile Bottom Nav - Fixed Sat-Set */}
      <nav className="md:hidden fixed bottom-6 left-6 right-6 z-[60] glass-effect rounded-[2rem] shadow-2xl shadow-slate-200/50 dark:shadow-none border border-white/20 dark:border-slate-800 transition-all duration-300">
        <div className="flex justify-around items-center h-20 px-2 relative">
          {links.map((link) => {
            const isActive = pathname === link.href;
            const Icon = isActive ? link.activeIcon : link.icon;

            return (
              <Link
                key={link.name}
                href={link.href}
                prefetch={true}
                className={clsx(
                  "relative flex flex-col items-center justify-center w-[54px] h-[54px] rounded-2xl transition-all duration-300",
                  isActive ? "bg-red-600 text-white shadow-xl shadow-red-200 dark:shadow-red-900/40" : "text-slate-400 dark:text-slate-500 hover:text-red-500"
                )}
              >
                <div className="relative">
                  <Icon className="w-6 h-6" />
                  {link.name === "Notifikasi" && hasUnread && (
                    <span className="absolute top-0 right-0 w-2.5 h-2.5 bg-red-500 border-2 border-slate-50 dark:border-slate-900 rounded-full"></span>
                  )}
                </div>
              </Link>
            );
          })}
        </div>
      </nav>

      {/* Desktop Sidebar Nav */}
      <nav className="hidden md:flex flex-col w-72 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl h-[100dvh] overflow-y-auto border-r border-slate-100 dark:border-slate-800 fixed left-0 top-0 z-[60] pt-10 pb-8 transition-colors duration-300">
        <div className="px-8 mb-12 flex items-center justify-between">
          <div className="flex items-center gap-3.5">
            <AppLogo className="w-11 h-11" />
            <div>
              <h1 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight leading-none mb-1">Koperasi</h1>
              <p className="text-[10px] text-slate-500 font-bold uppercase tracking-[0.2em]">Merah Putih</p>
            </div>
          </div>

          <button
            onClick={toggleTheme}
            className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700 transition-all shadow-sm border border-slate-100 dark:border-slate-700"
          >
            {mounted && (resolvedTheme === 'dark' ? <SunIcon className="w-5 h-5" /> : <MoonIcon className="w-5 h-5" />)}
          </button>
        </div>

        <div className="px-8 mb-6">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{userRole === 'admin' ? 'PENGELOLA PUSAT' : 'MENU ANGGOTA'}</p>
        </div>

        <div className="flex flex-col gap-2.5 px-5">
          {links.map((link) => {
            const isActive = pathname === link.href;
            const Icon = isActive ? link.activeIcon : link.icon;

            return (
              <Link
                key={link.name}
                href={link.href}
                prefetch={true}
                className={clsx(
                  "flex items-center gap-4 px-6 py-4 rounded-2xl transition-all duration-200 font-semibold text-sm",
                  isActive
                    ? "bg-red-50 dark:bg-red-500/10 text-red-600 dark:text-red-500 shadow-sm"
                    : "text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/50 hover:text-slate-900 dark:hover:text-white"
                )}
              >
                <div className="relative">
                  <Icon className="w-5 h-5" />
                  {link.name === "Notifikasi" && hasUnread && (
                    <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-red-500 border border-slate-50 dark:border-slate-900 rounded-full"></span>
                  )}
                </div>
                <span className="tracking-wide">{link.name}</span>
              </Link>
            );
          })}
        </div>

        <div className="mt-auto px-5 pt-8">
          <div className="bg-slate-900 dark:bg-slate-800 rounded-[2rem] p-6 text-white relative overflow-hidden shadow-xl shadow-slate-900/10 dark:shadow-none border border-slate-800 dark:border-slate-700">
            <div className="absolute -right-6 -bottom-6 w-28 h-28 bg-white/5 rounded-full blur-2xl"></div>
            <p className="text-[11px] text-slate-400 font-bold uppercase tracking-[0.15em] mb-2 relative z-10">Dukungan Sistem</p>
            <p className="text-[13px] font-medium text-slate-200 relative z-10 leading-relaxed">V15.0 - Role Enforced</p>
          </div>
        </div>
      </nav>

      {/* Mobile Floating Theme Toggle */}
      <button
        onClick={toggleTheme}
        className="md:hidden fixed top-6 right-6 z-[60] p-3.5 rounded-2xl glass-effect shadow-xl text-slate-500 dark:text-slate-300 transition-all border border-white/40 dark:border-slate-700"
      >
        {mounted && (resolvedTheme === 'dark' ? <SunIcon className="w-6 h-6" /> : <MoonIcon className="w-6 h-6" />)}
      </button>
    </>
  );
}