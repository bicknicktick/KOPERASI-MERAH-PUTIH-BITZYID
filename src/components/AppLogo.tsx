import { ShieldCheckIcon } from "@heroicons/react/24/solid";

export default function AppLogo({ className = "w-10 h-10" }: { className?: string }) {
  return (
    <div className={`bg-gradient-to-br from-red-600 to-red-800 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-red-200 dark:shadow-red-900/50 relative overflow-hidden ${className}`}>
      <div className="absolute -top-4 -right-4 w-10 h-10 bg-white/20 rounded-full blur-xl"></div>
      <div className="absolute -bottom-4 -left-4 w-10 h-10 bg-black/20 rounded-full blur-xl"></div>
      <ShieldCheckIcon className="w-3/5 h-3/5 relative z-10 drop-shadow-md" />
    </div>
  );
}