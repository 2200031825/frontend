"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import CountUp from "react-countup";
import {
  IndianRupee,
  TrendingUp,
  Wallet,
  Landmark,
  Sparkles,
  ShieldCheck,
  Activity,
  ArrowUpRight
} from "lucide-react";

import { fetchNetworth } from "../../services/investorService";
import { useInvestor } from "../../context/InvestorContext";

export default function NetworthPage() {
  const { investor } = useInvestor();
  const [networth, setNetworth] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!investor?.investor_id) return;
    loadNetworth();
  }, [investor?.investor_id]);

  const loadNetworth = async () => {
    try {
      setLoading(true);
      const data = await fetchNetworth(investor.investor_id);
      setNetworth(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }}
      className="min-h-screen bg-[#F8FAFC] p-4 md:p-10 lg:p-16 text-slate-900 font-sans"
    >
      {/* HERO SECTION */}
      <header className="max-w-7xl mx-auto relative overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-[#020617] via-[#0F172A] to-[#1E1B4B] p-8 md:p-12 mb-10 shadow-2xl shadow-indigo-500/20">
        <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/10 rounded-full -mr-20 -mt-20 blur-3xl" />
        
        <div className="relative z-10 flex flex-col lg:flex-row justify-between items-start lg:items-center gap-10">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/20 border border-indigo-500/20 text-indigo-300 text-[10px] font-black uppercase tracking-widest">
              <ShieldCheck size={12} /> Secure Wealth Management
            </div>
            <h1 className="text-5xl md:text-7xl font-black text-white tracking-tight">
              Networth<span className="text-indigo-500">.</span>
            </h1>
            <p className="text-slate-400 max-w-xl text-sm md:text-lg font-medium leading-relaxed">
              Track your financial evolution. Monitor real-time valuations, 
              annual growth patterns, and managed assets in one place.
            </p>
          </div>

          <div className="flex flex-col items-start lg:items-end gap-5">
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl px-6 py-4 flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center text-white font-bold">
                {investor?.first_name?.charAt(0)}
              </div>
              <div>
                <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Primary Investor</p>
                <p className="text-white font-bold">{investor?.first_name}</p>
              </div>
            </div>
            <div className="bg-white text-slate-900 px-8 py-4 rounded-2xl font-black flex items-center gap-3 shadow-xl shadow-black/20 text-sm">
              <Sparkles size={18} className="text-indigo-600" />
              Premium Portfolio Enabled
            </div>
          </div>
        </div>
      </header>

      {/* STATS BENTO GRID */}
      <main className="max-w-7xl mx-auto space-y-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard title="Total Valuation" value={Number(networth?.net_worth || 0)} isCurrency color="text-emerald-500" bg="bg-emerald-50" icon={<IndianRupee />} delay={0.1} />
          <StatCard title="Annual Yield" value="+12.5%" color="text-indigo-600" bg="bg-indigo-50" icon={<TrendingUp />} delay={0.2} />
          <StatCard title="Active Assets" value="04" color="text-blue-600" bg="bg-blue-50" icon={<Wallet />} delay={0.3} />
          <StatCard title="Asset Type" value="Mutual Funds" color="text-amber-600" bg="bg-amber-50" icon={<Landmark />} delay={0.4} />
        </div>

        {/* MAIN VALUATION CARD */}
        <section className="bg-white rounded-[3rem] shadow-sm border border-slate-200 overflow-hidden group">
          <div className="p-8 md:p-16 border-b border-slate-100 relative">
            <div className="absolute top-10 right-10 opacity-5 group-hover:opacity-10 transition-opacity">
              <Activity size={120} className="text-indigo-600" />
            </div>
            
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.4em] mb-6">Aggregate Net Worth</p>
            
            <div className="flex flex-col md:flex-row md:items-end gap-4 md:gap-8">
              {loading ? (
                <div className="h-20 w-64 bg-slate-100 animate-pulse rounded-2xl" />
              ) : (
                <h2 className="text-6xl md:text-8xl font-black text-slate-900 tracking-tighter">
                  ₹<CountUp end={Number(networth?.net_worth || 0)} separator="," duration={2.5} />
                </h2>
              )}
              
              <div className="inline-flex items-center gap-2 bg-emerald-50 text-emerald-600 px-5 py-2.5 rounded-full text-sm font-black mb-2 shadow-sm shadow-emerald-500/10">
                <ArrowUpRight size={18} />
                Market Value Appreciating
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-slate-100 bg-slate-50/50">
            <InfoCard title="Internal Identity" value={investor?.investor_id} delay={0.5} />
            <InfoCard title="Entity Name" value={investor?.first_name} delay={0.6} />
            <InfoCard title="Account Integrity" value="Verified Active" status="active" delay={0.7} />
          </div>
        </section>
      </main>
    </motion.div>
  );
}

/* ===========================
    SUB-COMPONENTS
=========================== */

function StatCard({ title, value, icon, color, bg, delay, isCurrency }) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      whileHover={{ y: -5 }}
      className="bg-white p-7 rounded-[2.5rem] border border-slate-200 shadow-sm flex flex-col justify-between h-48 hover:shadow-xl hover:shadow-indigo-500/5 transition-all"
    >
      <div className={`${bg} ${color} w-12 h-12 rounded-2xl flex items-center justify-center shadow-inner`}>
        {icon}
      </div>
      <div>
        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{title}</p>
        <h3 className="text-2xl font-black text-slate-900 tracking-tight">
          {isCurrency ? `₹${value.toLocaleString()}` : value}
        </h3>
      </div>
    </motion.div>
  );
}

function InfoCard({ title, value, status, delay }) {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay }}
      className="p-10 flex flex-col gap-2"
    >
      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{title}</p>
      <div className="flex items-center gap-3">
        {status === 'active' && <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />}
        <h4 className="text-xl font-black text-slate-900 truncate">{value}</h4>
      </div>
    </motion.div>
  );
}