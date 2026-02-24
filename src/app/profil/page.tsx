"use client";

import { useEffect, useState } from "react";
import NavMenu from "@/components/BottomNav";
import { signOut } from "next-auth/react";
import { useTheme } from "next-themes";
import { toast } from "react-hot-toast";
import { 
  ArrowLeftOnRectangleIcon,
  IdentificationIcon,
  MapPinIcon,
  CheckBadgeIcon,
  SunIcon,
  MoonIcon,
  PencilSquareIcon,
  Cog6ToothIcon,
  BellAlertIcon
} from "@heroicons/react/24/outline";

export default function ProfilPage() {
  const [user, setUser] = useState<any>(null);
  const { setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  
  // State Edit Profil
  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState("");
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [isSavingNotif, setIsSavingNotif] = useState(false);

  useEffect(() => {
    setMounted(true);
    fetch("/api/user").then(res => res.json()).then(data => {
      setUser(data);
      setEditName(data.name);
      setNotificationsEnabled(Boolean(data.notificationsEnabled));
    });
  }, []);

  const handleUpdateProfile = async () => {
    const tid = toast.loading("Menyimpan data...");
    try {
      const res = await fetch("/api/user", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: editName }),
      });
      if (res.ok) {
        setUser({ ...user, name: editName });
        setIsEditing(false);
        toast.success("Profil berhasil diperbarui.", { id: tid });
      } else {
        toast.error("Gagal menyimpan profil.", { id: tid });
      }
    } catch (err) {
      toast.error("Terjadi kesalahan jaringan.", { id: tid });
    }
  };

  const handleToggleNotifications = async () => {
    const nextValue = !notificationsEnabled;
    setNotificationsEnabled(nextValue);
    setIsSavingNotif(true);

    try {
      const res = await fetch("/api/user", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ notificationsEnabled: nextValue }),
      });

      if (!res.ok) {
        setNotificationsEnabled(!nextValue);
        toast.error("Gagal memperbarui notifikasi.");
      } else {
        setUser({ ...user, notificationsEnabled: nextValue });
      }
    } catch {
      setNotificationsEnabled(!nextValue);
      toast.error("Terjadi kesalahan jaringan.");
    } finally {
      setIsSavingNotif(false);
    }
  };

  const handleLogout = async () => {
    toast.loading("Memutuskan koneksi aman...");
    await signOut({ callbackUrl: "/login" });
  };

  if (!user || !mounted) return <div className="min-h-[100dvh] bg-slate-50 dark:bg-[#020617] flex justify-center items-center"><div className="w-8 h-8 border-4 border-slate-200 border-t-red-600 rounded-full animate-spin"></div></div>;

  return (
    <div className="flex flex-col md:flex-row min-h-[100dvh] bg-slate-50 dark:bg-[#020617] font-inter transition-colors duration-300">
      <NavMenu />
      
      <main className="flex-1 w-full md:ml-72 pb-40 md:pb-12 px-6 md:px-12 pt-12 md:pt-16">
        <div className="max-w-4xl mx-auto space-y-8">
          
          <div className="flex items-center justify-between mb-8">
             <div>
               <p className="text-red-600 dark:text-red-500 font-bold text-xs uppercase tracking-widest mb-2">Pusat Akun</p>
               <h1 className="text-3xl font-bold text-slate-900 dark:text-white tracking-tight">Pengaturan</h1>
             </div>
             <button onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')} className="p-3.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl text-slate-500 hover:text-red-600 shadow-sm transition-all active:scale-95">
                {resolvedTheme === 'dark' ? <SunIcon className="w-6 h-6" /> : <MoonIcon className="w-6 h-6" />}
             </button>
          </div>

          {/* Kartu Profil Utama */}
          <div className="elegant-card p-8 md:p-10 relative overflow-hidden bg-white dark:bg-slate-900/40">
            <div className="flex flex-col md:flex-row gap-8 items-center md:items-start text-center md:text-left">
               
               <div className="relative">
                 <div className="w-28 h-28 bg-red-50 dark:bg-red-500/10 rounded-[2rem] flex items-center justify-center text-5xl font-bold text-red-600 dark:text-red-500 shadow-sm border border-red-100 dark:border-red-500/20">
                   {user.name.charAt(0)}
                 </div>
                 <div className="absolute -bottom-2 -right-2 bg-emerald-500 p-2 rounded-xl shadow-lg border-2 border-white dark:border-slate-900">
                   <CheckBadgeIcon className="w-6 h-6 text-white" />
                 </div>
               </div>

               <div className="flex-1 w-full">
                  {isEditing ? (
                    <div className="flex flex-col gap-3">
                       <input 
                         type="text" 
                         value={editName}
                         onChange={(e) => setEditName(e.target.value)}
                         className="elegant-input text-xl font-bold"
                         autoFocus
                       />
                       <div className="flex gap-2 justify-center md:justify-start">
                         <button onClick={handleUpdateProfile} className="px-5 py-2 bg-emerald-50 text-emerald-600 hover:bg-emerald-100 rounded-xl font-bold text-sm transition-colors dark:bg-emerald-500/10 dark:text-emerald-500 dark:hover:bg-emerald-500/20">Simpan</button>
                         <button onClick={() => { setIsEditing(false); setEditName(user.name); }} className="px-5 py-2 bg-slate-100 text-slate-600 hover:bg-slate-200 rounded-xl font-bold text-sm transition-colors dark:bg-slate-800 dark:text-slate-400 dark:hover:bg-slate-700">Batal</button>
                       </div>
                    </div>
                  ) : (
                    <>
                      <div className="flex items-center justify-center md:justify-start gap-3">
                        <h2 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white tracking-tight">{user.name}</h2>
                        <button onClick={() => setIsEditing(true)} className="p-1.5 text-slate-400 hover:text-red-600 transition-colors">
                           <PencilSquareIcon className="w-5 h-5" />
                        </button>
                      </div>
                      <p className="text-slate-500 dark:text-slate-400 font-bold text-xs uppercase tracking-widest mt-2">
                        {user.role === 'admin' ? 'PENGURUS KOPERASI PUSAT' : 'Anggota Aktif Desa Bangeran'}
                      </p>
                    </>
                  )}

                  <div className="mt-6 flex flex-wrap justify-center md:justify-start gap-3">
                     <div className="px-4 py-2 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 flex items-center gap-2">
                        <IdentificationIcon className="w-4 h-4 text-slate-400" />
                        <span className="text-xs font-bold text-slate-600 dark:text-slate-300">NIK: {user.nik}</span>
                     </div>
                     <div className="px-4 py-2 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 flex items-center gap-2">
                        <MapPinIcon className="w-4 h-4 text-slate-400" />
                        <span className="text-xs font-bold text-slate-600 dark:text-slate-300">Dawarblandong</span>
                     </div>
                  </div>
               </div>

            </div>
          </div>

          {/* Pengaturan Aplikasi */}
          <div className="elegant-card overflow-hidden bg-white dark:bg-slate-900/40">
             <div className="p-6 border-b border-slate-100 dark:border-slate-800/60 bg-slate-50 dark:bg-slate-800/30">
                <h3 className="text-sm font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest flex items-center gap-2">
                   <Cog6ToothIcon className="w-5 h-5" /> Konfigurasi Sistem
                </h3>
             </div>
             <div className="divide-y divide-slate-100 dark:divide-slate-800/60">
                <div className="p-6 flex items-center justify-between hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors">
                   <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-500 dark:text-slate-400">
                         {resolvedTheme === 'dark' ? <MoonIcon className="w-5 h-5" /> : <SunIcon className="w-5 h-5" />}
                      </div>
                      <div>
                         <p className="font-bold text-slate-900 dark:text-white text-sm">Tema Aplikasi</p>
                         <p className="text-xs text-slate-500 font-medium mt-0.5">Ubah tampilan terang atau gelap.</p>
                      </div>
                   </div>
                   <button onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')} className="px-4 py-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-bold text-xs rounded-xl transition-colors">
                      {resolvedTheme === 'dark' ? 'Mode Gelap Aktif' : 'Mode Terang Aktif'}
                   </button>
                </div>

                <div className="p-6 flex items-center justify-between hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors">
                   <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-500 dark:text-slate-400">
                         <BellAlertIcon className="w-5 h-5" />
                      </div>
                      <div>
                         <p className="font-bold text-slate-900 dark:text-white text-sm">Pusat Notifikasi</p>
                         <p className="text-xs text-slate-500 font-medium mt-0.5">Notifikasi pencairan dan setoran aktif.</p>
                      </div>
                   </div>
                   <button
                     onClick={handleToggleNotifications}
                     disabled={isSavingNotif}
                     className={`w-11 h-6 rounded-full flex items-center px-1 transition-colors ${notificationsEnabled ? 'bg-red-600' : 'bg-slate-300 dark:bg-slate-700'} ${isSavingNotif ? 'opacity-60 cursor-not-allowed' : ''}`}
                     aria-label="Toggle notifikasi"
                   >
                      <div className={`w-4 h-4 bg-white rounded-full shadow-sm transition-transform ${notificationsEnabled ? 'translate-x-5' : 'translate-x-0'}`}></div>
                   </button>
                </div>
             </div>
          </div>

          <div className="pt-6">
            <button 
              onClick={handleLogout}
              className="w-full elegant-btn-secondary flex items-center justify-center gap-3 !text-red-600 dark:!text-red-500 hover:!bg-red-50 dark:hover:!bg-red-500/10 hover:border-red-200 dark:hover:border-red-900 shadow-sm font-bold tracking-wide"
            >
              <ArrowLeftOnRectangleIcon className="w-5 h-5" />
              Keluar Sesi Aman
            </button>
            <p className="text-center text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-6">
               Koperasi Merah Putih V15.8 © 2026
            </p>
          </div>

        </div>
      </main>
    </div>
  );
}