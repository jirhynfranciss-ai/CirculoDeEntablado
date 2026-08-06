import { useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import {
  LayoutDashboard,
  Users,
  Trophy,
  Clapperboard,
  CalendarClock,
  Images,
  PlaySquare,
  Quote,
  Settings,
  LogOut,
  Drama,
  Menu,
  X,
} from "lucide-react";
import { cn } from "../utils/cn";

const links = [
  { to: "/admin/dashboard", label: "Dashboard", icon: LayoutDashboard, end: true },
  { to: "/admin/officers", label: "Manage Officers", icon: Users },
  { to: "/admin/achievements", label: "Manage Achievements", icon: Trophy },
  { to: "/admin/productions", label: "Manage Productions", icon: Clapperboard },
  { to: "/admin/events", label: "Manage Events", icon: CalendarClock },
  { to: "/admin/gallery", label: "Manage Gallery", icon: Images },
  { to: "/admin/media", label: "Manage Media", icon: PlaySquare },
  { to: "/admin/testimonials", label: "Manage Testimonials", icon: Quote },
  { to: "/admin/settings", label: "Site Settings", icon: Settings },
];

export default function AdminLayout() {
  const { signOut, user } = useAuth();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const handleLogout = async () => {
    await signOut();
    navigate("/admin/login");
  };

  const SidebarContent = (
    <>
      <div className="flex items-center gap-3 px-6 h-20 border-b border-white/10">
        <span className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-[#db0000] text-[#db0000]">
          <Drama size={18} />
        </span>
        <div>
          <p className="font-display font-bold text-white text-sm leading-tight">CDE Admin</p>
          <p className="text-[10px] text-white/40 truncate max-w-[140px]">{user?.email}</p>
        </div>
      </div>
      <nav className="flex-1 overflow-y-auto py-6 px-3 space-y-1">
        {links.map((l) => (
          <NavLink
            key={l.to}
            to={l.to}
            end={l.end}
            onClick={() => setOpen(false)}
            className={({ isActive }) =>
              cn(
                "flex items-center gap-3 px-4 py-2.5 rounded-sm text-sm font-medium transition-colors duration-200",
                isActive
                  ? "bg-[#db0000] text-white"
                  : "text-white/60 hover:bg-white/5 hover:text-white"
              )
            }
          >
            <l.icon size={17} />
            {l.label}
          </NavLink>
        ))}
      </nav>
      <div className="p-3 border-t border-white/10">
        <button
          onClick={handleLogout}
          className="flex w-full items-center gap-3 px-4 py-2.5 rounded-sm text-sm font-medium text-white/60 hover:bg-[#db0000]/20 hover:text-[#db0000] transition-colors"
        >
          <LogOut size={17} /> Logout
        </button>
      </div>
    </>
  );

  return (
    <div className="min-h-screen bg-black flex">
      {/* Desktop sidebar */}
      <aside className="hidden lg:flex flex-col w-64 shrink-0 border-r border-white/10 bg-[#050505]">
        {SidebarContent}
      </aside>

      {/* Mobile sidebar */}
      <div
        className={cn(
          "fixed inset-0 z-[150] lg:hidden transition-opacity duration-300",
          open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        )}
      >
        <div className="absolute inset-0 bg-black/70" onClick={() => setOpen(false)} />
        <aside
          className={cn(
            "absolute left-0 top-0 h-full w-72 bg-[#050505] border-r border-white/10 flex flex-col transition-transform duration-300",
            open ? "translate-x-0" : "-translate-x-full"
          )}
        >
          {SidebarContent}
        </aside>
      </div>

      <div className="flex-1 min-w-0">
        <div className="lg:hidden flex items-center justify-between h-16 px-5 border-b border-white/10 bg-[#050505]">
          <span className="font-display font-bold text-white">CDE Admin</span>
          <button onClick={() => setOpen(true)} className="text-white" aria-label="Open menu">
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
        <main className="p-6 md:p-10 max-w-6xl mx-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
