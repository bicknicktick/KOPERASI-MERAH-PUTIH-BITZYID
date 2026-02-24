"use client";

import { useState, Fragment } from "react";
import NavMenu from "@/components/BottomNav";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import { toast } from "react-hot-toast";
import useSWR from "swr";
import { Dialog, Transition } from "@headlessui/react";
import { 
  CheckCircleIcon, 
  XCircleIcon, 
  UsersIcon, 
  BanknotesIcon,
  WalletIcon,
  ArrowPathIcon,
  PencilSquareIcon,
  TrashIcon,
  PlusIcon,
  XMarkIcon,
  ChartBarIcon,
  BriefcaseIcon
} from "@heroicons/react/24/outline";

const fetcher = (url: string) => fetch(url).then(res => res.json());

export default function AdminPage() {
  const [tab, setTab] = useState('dashboard'); // dashboard | reports | users
  const { data: users, mutate: mutateUsers } = useSWR("/api/admin/users", fetcher, { refreshInterval: 5000 });
  const { data: adminData, mutate: mutateTransactions } = useSWR("/api/admin/transactions", fetcher, { refreshInterval: 5000 });

  // Modal States
  const [isOpen, setIsOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [formData, setFormData] = useState({ name: "", nik: "", password: "", role: "member", balance: 0 });

  const formatter = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  });

  const transactions = adminData?.transactions || [];
  const metrics = adminData?.metrics || { totalSimpanan: 0, totalPinjaman: 0, totalKas: 0, totalAnggota: 0 };

  const openAdd = () => {
    setIsEdit(false);
    setSelectedUser(null);
    setFormData({ name: "", nik: "", password: "", role: "member", balance: 0 });
    setIsOpen(true);
  };

  const openEdit = (user: any) => {
    setIsEdit(true);
    setSelectedUser(user);
    setFormData({ name: user.name, nik: user.nik, password: "", role: user.role, balance: user.balance });
    setIsOpen(true);
  };

  const handleSaveUser = async (e: React.FormEvent) => {
    e.preventDefault();
    const tid = toast.loading("Menyimpan data...");
    
    const url = isEdit ? "/api/admin/users" : "/api/admin/users/create";
    const method = isEdit ? "PUT" : "POST";
    const body = isEdit ? { ...formData, id: selectedUser.id } : formData;

    try {
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body)
      });
      const data = await res.json();

      if (res.ok) {
        toast.success("Berhasil disimpan.", { id: tid });
        setIsOpen(false);
        mutateUsers();
        mutateTransactions();
      } else {
        toast.error(data.error || "Gagal menyimpan.", { id: tid });
      }
    } catch (err) {
      toast.error("Kesalahan jaringan.", { id: tid });
    }
  };

  const handleDeleteUser = async (id: string) => {
    if (!confirm("Hapus anggota ini selamanya? Semua riwayat transaksi akan ikut terhapus dari sistem kas.")) return;
    
    const tid = toast.loading("Menghapus data...");
    try {
      const res = await fetch("/api/admin/users", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id })
      });
      if (res.ok) {
        toast.success("Data dihapus.", { id: tid });
        mutateUsers();
        mutateTransactions();
      } else {
        toast.error("Gagal menghapus.", { id: tid });
      }
    } catch (err) {
      toast.error("Kesalahan jaringan.", { id: tid });
    }
  };

  const handleTransactionAction = async (id: string, status: string) => {
    const tid = toast.loading(`Sedang memproses ${status}...`);
    try {
      const res = await fetch("/api/admin/transactions", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status })
      });
      if (res.ok) {
        toast.success(`Berhasil diperbarui.`, { id: tid });
        mutateTransactions();
        mutateUsers();
      } else {
        toast.error("Gagal memproses.", { id: tid });
      }
    } catch (err) {
      toast.error("Kesalahan jaringan.", { id: tid });
    }
  };

  return (
    <div className="flex flex-col md:flex-row min-h-[100dvh] bg-slate-50 dark:bg-[#020617] font-inter transition-colors duration-300">
      <NavMenu />
      
      <main className="flex-1 w-full md:ml-72 pb-40 md:pb-12 px-6 md:px-12 pt-12 md:pt-16">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div>
              <p className="text-red-600 dark:text-red-500 font-bold text-xs uppercase tracking-widest mb-2">Pusat Komando Admin</p>
              <h1 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white tracking-tight">Kelola Koperasi</h1>
            </div>
            
            <div className="flex items-center gap-4">
              <button onClick={() => { mutateTransactions(); mutateUsers(); }} className="p-3 bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800 rounded-2xl text-slate-400 dark:text-slate-500 hover:text-red-600 shadow-sm transition-all active:scale-95">
                 <ArrowPathIcon className="w-5 h-5" />
              </button>
              <div className="flex bg-slate-100 dark:bg-slate-900 p-1 rounded-2xl border border-slate-200/60 dark:border-slate-800">
                <button 
                  onClick={() => setTab('dashboard')}
                  className={`px-5 py-2.5 rounded-xl font-bold text-sm transition-all ${tab === 'dashboard' ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-sm' : 'text-slate-500 hover:text-slate-900 dark:hover:text-slate-300'}`}
                >
                  Dashboard
                </button>
                <button 
                  onClick={() => setTab('reports')}
                  className={`px-5 py-2.5 rounded-xl font-bold text-sm transition-all ${tab === 'reports' ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-sm' : 'text-slate-500 hover:text-slate-900 dark:hover:text-slate-300'}`}
                >
                  Laporan
                </button>
                <button 
                  onClick={() => setTab('users')}
                  className={`px-5 py-2.5 rounded-xl font-bold text-sm transition-all ${tab === 'users' ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-sm' : 'text-slate-500 hover:text-slate-900 dark:hover:text-slate-300'}`}
                >
                  Anggota
                </button>
              </div>
            </div>
          </div>

          {!adminData || !users ? (
             <div className="elegant-card p-12 flex justify-center items-center"><div className="w-8 h-8 border-4 border-slate-200 border-t-red-600 rounded-full animate-spin"></div></div>
          ) : tab === 'dashboard' ? (
            <div className="space-y-8">
              <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <ChartBarIcon className="w-6 h-6 text-red-600 dark:text-red-500" />
                Laporan Keuangan
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="elegant-card p-8 bg-white dark:bg-slate-900/50">
                   <div className="w-12 h-12 rounded-[1.25rem] bg-emerald-50 dark:bg-emerald-500/10 flex items-center justify-center text-emerald-600 dark:text-emerald-500 mb-6 border border-emerald-100 dark:border-emerald-500/20 shadow-sm">
                      <WalletIcon className="w-6 h-6" />
                   </div>
                   <p className="text-sm font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-1">Total Kas Tersedia</p>
                   <p className="text-3xl font-bold text-slate-900 dark:text-white tracking-tight">{formatter.format(metrics.totalKas)}</p>
                </div>
                
                <div className="elegant-card p-8 bg-white dark:bg-slate-900/50">
                   <div className="w-12 h-12 rounded-[1.25rem] bg-sky-50 dark:bg-sky-500/10 flex items-center justify-center text-sky-600 dark:text-sky-500 mb-6 border border-sky-100 dark:border-sky-500/20 shadow-sm">
                      <BriefcaseIcon className="w-6 h-6" />
                   </div>
                   <p className="text-sm font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-1">Total Setoran Warga</p>
                   <p className="text-3xl font-bold text-slate-900 dark:text-white tracking-tight">{formatter.format(metrics.totalSimpanan)}</p>
                </div>

                <div className="elegant-card p-8 bg-white dark:bg-slate-900/50">
                   <div className="w-12 h-12 rounded-[1.25rem] bg-indigo-50 dark:bg-indigo-500/10 flex items-center justify-center text-indigo-600 dark:text-indigo-500 mb-6 border border-indigo-100 dark:border-indigo-500/20 shadow-sm">
                      <BanknotesIcon className="w-6 h-6" />
                   </div>
                   <p className="text-sm font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-1">Total Pinjaman Aktif</p>
                   <p className="text-3xl font-bold text-slate-900 dark:text-white tracking-tight">{formatter.format(metrics.totalPinjaman)}</p>
                </div>
              </div>

              <div className="elegant-card p-8 bg-white dark:bg-slate-900/50 mt-6 flex justify-between items-center">
                 <div>
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-1">Total Master Anggota</h3>
                    <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">Anggota terdaftar yang tidak termasuk admin sistem.</p>
                 </div>
                 <div className="w-16 h-16 rounded-[1.25rem] bg-slate-50 dark:bg-slate-800 flex items-center justify-center text-slate-900 dark:text-white font-bold text-2xl shadow-sm border border-slate-200/60 dark:border-slate-700">
                    {metrics.totalAnggota}
                 </div>
              </div>
            </div>
          ) : tab === 'reports' ? (
            <div className="space-y-6">
              <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <BanknotesIcon className="w-6 h-6 text-red-600 dark:text-red-500" />
                Laporan & Antrean Verifikasi
              </h2>
              
              <div className="elegant-card overflow-hidden bg-white dark:bg-slate-900/40 border-slate-100 dark:border-slate-800">
                <div className="overflow-x-auto">
                  <table className="w-full text-left">
                    <thead>
                      <tr className="bg-slate-50 dark:bg-slate-800/50 border-b border-slate-100 dark:border-slate-800">
                        <th className="px-6 py-4 text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">Warga</th>
                        <th className="px-6 py-4 text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">Tipe</th>
                        <th className="px-6 py-4 text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">Nominal</th>
                        <th className="px-6 py-4 text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest text-right">Aksi</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                      {transactions.filter((t: any) => t.status === 'pending').map((trx: any) => (
                        <tr key={trx.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors">
                          <td className="px-6 py-4">
                            <p className="font-bold text-slate-900 dark:text-slate-200">{trx.user.name}</p>
                            <p className="text-[10px] text-slate-400 dark:text-slate-500 font-bold">NIK: {trx.user.nik}</p>
                          </td>
                          <td className="px-6 py-4">
                            <span className={`px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase tracking-widest border ${trx.type === 'simpanan' ? 'bg-emerald-50 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-500 border-emerald-100 dark:border-emerald-500/20' : 'bg-red-50 dark:bg-red-500/10 text-red-700 dark:text-red-500 border-red-100 dark:border-red-500/20'}`}>
                              {trx.type}
                            </span>
                          </td>
                          <td className="px-6 py-4 font-bold text-slate-900 dark:text-white">{formatter.format(trx.amount)}</td>
                          <td className="px-6 py-4 text-right">
                            <div className="flex justify-end gap-2">
                              <button onClick={() => handleTransactionAction(trx.id, 'approved')} className="p-2 text-emerald-600 dark:text-emerald-500 hover:bg-emerald-50 dark:hover:bg-emerald-500/10 rounded-xl transition-all">
                                <CheckCircleIcon className="w-7 h-7" />
                              </button>
                              <button onClick={() => handleTransactionAction(trx.id, 'rejected')} className="p-2 text-red-600 dark:text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-xl transition-all">
                                <XCircleIcon className="w-7 h-7" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                      {transactions.filter((t: any) => t.status === 'pending').length === 0 && (
                        <tr>
                          <td colSpan={5} className="px-6 py-12 text-center text-slate-400 dark:text-slate-500 font-medium italic text-sm">Tidak ada antrean transaksi saat ini.</td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <UsersIcon className="w-6 h-6 text-red-600 dark:text-red-500" />
                  Master Anggota
                </h2>
                <button onClick={openAdd} className="elegant-btn-primary flex items-center gap-2 !py-2.5 !text-sm">
                   <PlusIcon className="w-4 h-4" />
                   Tambah Anggota
                </button>
              </div>
              
              <div className="elegant-card overflow-hidden bg-white dark:bg-slate-900/40 border-slate-100 dark:border-slate-800">
                <div className="overflow-x-auto">
                  <table className="w-full text-left">
                    <thead>
                      <tr className="bg-slate-50 dark:bg-slate-800/50 border-b border-slate-100 dark:border-slate-800">
                        <th className="px-6 py-4 text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">Anggota</th>
                        <th className="px-6 py-4 text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">Jabatan</th>
                        <th className="px-6 py-4 text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">Saldo Pribadi</th>
                        <th className="px-6 py-4 text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest text-right">Aksi</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                      {users.map((user: any) => (
                        <tr key={user.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors">
                          <td className="px-6 py-4 font-bold text-slate-900 dark:text-slate-200">
                             <p>{user.name}</p>
                             <p className="text-[10px] text-slate-400 font-bold uppercase tracking-tight">{user.nik}</p>
                          </td>
                          <td className="px-6 py-4">
                            <span className={`px-2 py-0.5 rounded-lg text-[10px] font-bold uppercase tracking-widest border ${user.role === 'admin' ? 'bg-red-50 dark:bg-red-500/10 text-red-600 dark:text-red-500 border-red-100 dark:border-red-500/20' : 'bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 border-slate-200 dark:border-slate-700'}`}>
                              {user.role}
                            </span>
                          </td>
                          <td className="px-6 py-4 font-bold text-slate-900 dark:text-white">{formatter.format(user.balance)}</td>
                          <td className="px-6 py-4 text-right">
                            <div className="flex justify-end gap-1">
                               <button onClick={() => openEdit(user)} className="p-2 text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors">
                                  <PencilSquareIcon className="w-5 h-5" />
                               </button>
                               <button onClick={() => handleDeleteUser(user.id)} className="p-2 text-slate-400 hover:text-red-600 transition-colors">
                                  <TrashIcon className="w-5 h-5" />
                               </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* MODAL ADD/EDIT USER */}
      <Transition show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-[100]" onClose={() => setIsOpen(false)}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-[2rem] bg-white dark:bg-slate-900 p-8 text-left align-middle shadow-2xl transition-all border border-slate-100 dark:border-slate-800">
                  <div className="flex justify-between items-center mb-6">
                    <Dialog.Title as="h3" className="text-xl font-bold text-slate-900 dark:text-white">
                      {isEdit ? 'Ubah Data Anggota' : 'Tambah Anggota Baru'}
                    </Dialog.Title>
                    <button onClick={() => setIsOpen(false)} className="text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors">
                       <XMarkIcon className="w-6 h-6" />
                    </button>
                  </div>
                  
                  <form onSubmit={handleSaveUser} className="space-y-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-2">Nama Lengkap</label>
                      <input 
                        type="text" 
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                        className="elegant-input"
                        placeholder="Contoh: Budi Santoso"
                        required 
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-2">NIK (16 Digit)</label>
                      <input 
                        type="text" 
                        value={formData.nik}
                        onChange={(e) => setFormData({...formData, nik: e.target.value})}
                        className="elegant-input"
                        placeholder="3525..."
                        required 
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-2">Password {isEdit && "(Kosongkan jika tidak diubah)"}</label>
                      <input 
                        type="password" 
                        value={formData.password}
                        onChange={(e) => setFormData({...formData, password: e.target.value})}
                        className="elegant-input"
                        placeholder="••••••••"
                        required={!isEdit}
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                       <div>
                          <label className="block text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-2">Jabatan</label>
                          <select 
                            value={formData.role}
                            onChange={(e) => setFormData({...formData, role: e.target.value})}
                            className="elegant-input"
                          >
                            <option value="member">Member</option>
                            <option value="admin">Admin</option>
                          </select>
                       </div>
                       <div>
                          <label className="block text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-2">Saldo Pribadi</label>
                          <input 
                            type="number" 
                            value={formData.balance}
                            onChange={(e) => setFormData({...formData, balance: parseInt(e.target.value) || 0})}
                            className="elegant-input"
                            required
                          />
                       </div>
                    </div>

                    <div className="mt-8">
                      <button type="submit" className="w-full elegant-btn-primary">
                        {isEdit ? 'Simpan Perubahan' : 'Daftarkan Anggota'}
                      </button>
                    </div>
                  </form>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
}