"use client";

import { memo, useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard,
  BadgeDollarSign,
  Landmark,
  NotebookTabs,
  WalletCards,
  ChartNoAxesCombined,
  Settings2,
  LogOut,
  Menu,
  X,
  Sparkles,
  ShieldCheck
} from "lucide-react";

function SideBar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  const handleLogout = () => {
    document.cookie = "token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
    window.location.href = "/login";
  };

  const menuItems = [
    { title: "Dashboard", icon: <LayoutDashboard size={20} />, path: "/dashboard" },
    { title: "Mutual Funds", icon: <Landmark size={20} />, path: "/funds" },
    { title: "SIP", icon: <BadgeDollarSign size={20} />, path: "/sips" },
    { title: "Transactions", icon: <NotebookTabs size={20} />, path: "/transactions" },
    { title: "Holdings", icon: <WalletCards size={20} />, path: "/holdings" },
    { title: "Networth", icon: <ChartNoAxesCombined size={20} />, path: "/networth" },
  ];

  // 1. Container Variant: Handles the "one by one" staggering from top to bottom
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2, // Slowed down for a more deliberate "one by one" feel
        delayChildren: 0.5,   // Wait for sidebar to settle before showing items
      },
    },
  };

  // 2. Item Variant: Handles individual entry and hover physics
  const itemVariants = {
    hidden: { opacity: 0, y: -20 }, // Changed from x to y for a "drop down" effect
    show: { 
      opacity: 1, 
      y: 0,
      transition: { 
        type: "spring", 
        stiffness: 100, 
        damping: 15,
        duration: 0.8 
      }
    },
    hover: {
      x: 10, // Subtle slide right on hover
      scale: 1.02,
      backgroundColor: "rgba(255, 255, 255, 0.05)",
      transition: { type: "spring", stiffness: 400, damping: 10 }
    }
  };

  const SidebarContent = () => (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className="flex flex-col h-full"
    >
      {/* BRAND LOGO */}
      <motion.div variants={itemVariants} className="mb-12 px-2">
        <div className="flex items-center gap-3 group cursor-default">
          <motion.div 
            whileHover={{ rotate: 180 }}
            transition={{ duration: 0.6 }}
            className="w-12 h-12 rounded-2xl bg-gradient-to-br from-indigo-500 via-purple-600 to-violet-700 flex items-center justify-center shadow-xl shadow-indigo-500/20"
          >
            <Sparkles className="text-white" size={24} />
          </motion.div>
          <div>
            <h1 className="text-2xl font-black text-white tracking-tighter leading-none">KFin</h1>
            <p className="text-[10px] uppercase tracking-[0.2em] text-indigo-400 font-bold mt-1">SIP Management</p>
          </div>
        </div>
      </motion.div>

      {/* NAVIGATION */}
      <nav className="flex-1 space-y-2">
        {menuItems.map((item) => {
          const isActive = pathname === item.path;
          return (
            <motion.div 
              key={item.title} 
              variants={itemVariants}
              whileHover="hover" // Triggers the hover variant
              className="rounded-2xl overflow-hidden"
            >
              <Link href={item.path} prefetch={true}>
                <div
                  className={`
                    group flex items-center gap-4 px-4 py-4 rounded-2xl transition-all relative
                    ${isActive 
                      ? "text-white bg-white/10 border border-white/10 shadow-lg" 
                      : "text-slate-500 hover:text-white border border-transparent"
                    }
                  `}
                >
                  {/* Active Slide Transition */}
                  {isActive && (
                    <motion.div 
                      layoutId="sidebarActive"
                      className="absolute inset-0 bg-indigo-600/20 rounded-2xl border border-indigo-500/30"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                  
                  <div className={`relative z-10 transition-colors duration-500 ${isActive ? "text-indigo-400" : "group-hover:text-indigo-300"}`}>
                    {item.icon}
                  </div>
                  
                  <span className="relative z-10 font-bold text-[14px] tracking-wide flex-1">
                    {item.title}
                  </span>

                  {isActive && (
                    <motion.div 
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="relative z-10 w-1.5 h-1.5 rounded-full bg-indigo-500 shadow-[0_0_12px_rgba(99,102,241,0.8)]"
                    />
                  )}
                </div>
              </Link>
            </motion.div>
          );
        })}
      </nav>

      {/* FOOTER ACTIONS */}
      <div className="pt-6 border-t border-white/5 space-y-3">
        <motion.div 
          variants={itemVariants}
          whileHover="hover"
          className="flex items-center gap-4 px-4 py-3.5 rounded-2xl text-slate-500 hover:text-white cursor-pointer group"
        >
          <Settings2 size={20} className="group-hover:rotate-90 transition-transform duration-700" />
          <span className="font-bold text-[14px]">System Preferences</span>
        </motion.div>

        <motion.button 
          variants={itemVariants}
          whileHover={{ x: 10, backgroundColor: "rgba(239, 68, 68, 0.1)" }}
          onClick={handleLogout}
          className="w-full flex items-center gap-4 px-4 py-3.5 rounded-2xl text-red-400/80 hover:text-red-400 transition-all border border-transparent hover:border-red-500/20"
        >
          <LogOut size={20} />
          <span className="font-bold text-[14px]">Terminate Session</span>
        </motion.button>

        <motion.div 
          variants={itemVariants}
          className="mt-4 p-4 rounded-2xl bg-indigo-500/5 border border-indigo-500/10 flex items-center gap-3"
        >
          <ShieldCheck className="text-indigo-500" size={16} />
          <p className="text-[10px] font-bold text-indigo-300/60 uppercase tracking-widest text-nowrap">AES-256 Encrypted</p>
        </motion.div>
      </div>
    </motion.div>
  );

  return (
    <>
      {/* MOBILE HEADER */}
      <div className="lg:hidden fixed top-0 left-0 right-0 h-16 bg-[#0B0F19]/80 backdrop-blur-md border-b border-white/5 z-[60] px-6 flex items-center justify-between">
        <h1 className="text-xl font-black text-white italic tracking-tighter">KFin</h1>
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className="p-2 text-white bg-white/5 rounded-lg border border-white/10"
        >
          {isOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* DESKTOP SIDEBAR */}
      <aside className="hidden lg:flex w-72 h-screen bg-[#0B0F19] border-r border-white/5 flex-col px-7 py-10 sticky top-0 overflow-hidden">
        <SidebarContent />
      </aside>

      {/* MOBILE DRAWER */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[50] lg:hidden"
            />
            <motion.aside 
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed inset-y-0 left-0 w-[80%] max-w-[300px] bg-[#0B0F19] z-[55] flex flex-col px-7 py-10 border-r border-white/10 lg:hidden"
            >
              <SidebarContent />
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

export default memo(SideBar);