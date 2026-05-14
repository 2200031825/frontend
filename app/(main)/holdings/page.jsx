"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  Wallet,
  Landmark,
  TrendingUp,
  IndianRupee,
  PieChart,
  ArrowUpRight,
  Activity,
  ChevronRight
} from "lucide-react";

import { fetchHoldings } from "../../services/investorService";
import { useInvestor } from "../../context/InvestorContext";

export default function HoldingsPage() {
  const { investor } = useInvestor();
  const [holdings, setHoldings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!investor?.investor_id) return;
    loadHoldings();
  }, [investor]);

  const loadHoldings = async () => {
    try {
      setLoading(true);
      const data = await fetchHoldings(investor.investor_id);
      setHoldings(Array.isArray(data) ? data : []);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const totalValue = holdings.reduce(
    (total, item) => total + Number(item.current_value),
    0
  );

  return (
    <div className="min-h-screen bg-[#F8FAFC] p-4 md:p-12 text-slate-900 font-sans">
      
      {/* HERO SECTION */}
      <header className="max-w-7xl mx-auto relative overflow-hidden rounded-[2.5rem] bg-slate-900 p-8 md:p-12 mb-12 shadow-2xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/10 rounded-full -mr-20 -mt-20 blur-3xl" />
        
        <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/20 border border-indigo-500/20 text-indigo-300 text-[10px] font-black uppercase tracking-widest">
              <Activity size={12} /> Live Portfolio
            </div>
            <h1 className="text-4xl md:text-6xl font-black text-white tracking-tight">
              Holdings<span className="text-indigo-500">.</span>
            </h1>
            <p className="text-slate-400 max-w-md text-sm md:text-lg font-medium leading-relaxed">
              Detailed breakdown of your active assets and accumulated units across all fund houses.
            </p>
          </div>

          <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-6 min-w-[240px]">
            <p className="text-[10px] font-black text-indigo-300 uppercase tracking-widest mb-1">Total Valuation</p>
            <h2 className="text-3xl font-black text-white tracking-tighter">
              ₹{totalValue.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
            </h2>
            <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold mt-2">
              <ArrowUpRight size={14} /> +₹12,450.00 (Today)
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto space-y-10">
        
        {/* STATS BENTO GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard title="Active Assets" value={holdings.length} icon={<PieChart />} color="text-violet-600" bg="bg-violet-100" />
          <StatCard title="Total Units" value={holdings.reduce((acc, curr) => acc + Number(curr.total_units), 0).toFixed(2)} icon={<Wallet />} color="text-blue-600" bg="bg-blue-100" />
          <StatCard title="AMC Count" value={new Set(holdings.map(h => h.fund_id)).size} icon={<Landmark />} color="text-emerald-600" bg="bg-emerald-100" />
          <StatCard title="Yield Growth" value="+12.5%" icon={<TrendingUp />} color="text-amber-600" bg="bg-amber-100" />
        </div>

        {/* DATA TABLE */}
        <div className="bg-white border border-slate-200 rounded-[2rem] shadow-sm overflow-hidden">
          <div className="hidden md:grid grid-cols-5 gap-6 px-10 py-6 bg-slate-50/50 border-b border-slate-100 text-[11px] font-black text-slate-400 uppercase tracking-[0.2em]">
            <div className="col-span-2">Fund Description</div>
            <div>Accumulated Units</div>
            <div>Market NAV</div>
            <div className="text-right">Current Value</div>
          </div>

          {loading ? (
            <div className="p-24 flex flex-col items-center justify-center gap-4 text-slate-400 font-bold uppercase tracking-widest text-xs">
              <div className="w-10 h-10 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin" />
              Calculating Market Value...
            </div>
          ) : holdings.length === 0 ? (
            <div className="p-24 text-center">
              <div className="bg-slate-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-slate-300">
                <Wallet size={32} />
              </div>
              <p className="text-slate-500 font-bold">No active holdings detected.</p>
            </div>
          ) : (
            <div className="divide-y divide-slate-50">
              {holdings.map((holding) => (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  key={holding.fund_id}
                  className="grid grid-cols-1 md:grid-cols-5 gap-6 px-10 py-8 items-center hover:bg-slate-50/80 transition-all group cursor-pointer"
                >
                  {/* FUND */}
                  <div className="col-span-1 md:col-span-2 flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-slate-900 text-white flex items-center justify-center font-black text-xs group-hover:bg-indigo-600 transition-colors">
                      {holding.fund_name?.charAt(0)}
                    </div>
                    <div>
                      <h4 className="font-black text-slate-900 text-lg leading-tight group-hover:text-indigo-600 transition-colors">
                        {holding.fund_name}
                      </h4>
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">
                        Ref: {holding.fund_id}
                      </p>
                    </div>
                  </div>

                  {/* UNITS */}
                  <div className="flex flex-col">
                    <span className="text-xs font-bold text-slate-400 uppercase md:hidden">Units</span>
                    <span className="text-slate-700 font-black text-lg">
                      {Number(holding.total_units).toFixed(3)}
                    </span>
                  </div>

                  {/* NAV */}
                  <div className="flex flex-col">
                    <span className="text-xs font-bold text-slate-400 uppercase md:hidden">NAV</span>
                    <span className="text-indigo-600 font-black text-lg">
                      ₹{Number(holding.current_nav).toLocaleString('en-IN')}
                    </span>
                  </div>

                  {/* VALUE */}
                  <div className="flex flex-col md:items-end">
                    <span className="text-xs font-bold text-slate-400 uppercase md:hidden">Total Value</span>
                    <div className="flex items-center gap-3">
                      <span className="text-emerald-500 font-black text-2xl tracking-tighter">
                        ₹{Number(holding.current_value).toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                      </span>
                      <ChevronRight className="text-slate-200 group-hover:text-indigo-400 transition-all" size={20} />
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

function StatCard({ title, value, icon, color, bg }) {
  return (
    <motion.div 
      whileHover={{ y: -5 }}
      className="bg-white p-7 rounded-[2rem] border border-slate-200 flex items-center justify-between shadow-sm hover:shadow-xl hover:shadow-indigo-500/5 transition-all"
    >
      <div>
        <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-2">{title}</p>
        <h3 className="text-3xl font-black text-slate-900 tracking-tight">{value}</h3>
      </div>
      <div className={`${bg} ${color} w-14 h-14 rounded-2xl flex items-center justify-center shadow-inner`}>
        {icon}
      </div>
    </motion.div>
  );
}