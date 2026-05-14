"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  Search, Wallet, IndianRupee, BadgeCheck,
  ArrowUpRight, Clock, Hash, Activity, Filter
} from "lucide-react";
import { fetchSips, fetchTransactions } from "../../services/sipService";
import { useInvestor } from "../../context/InvestorContext";

export default function TransactionsPage() {
  const { investor } = useInvestor();
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");

  useEffect(() => {
    loadTransactions();
  }, []);

  const loadTransactions = async () => {
    try {
      setLoading(true);
      const sips = await fetchSips();
      if (!Array.isArray(sips)) return;

      let allTransactions = [];
      for (const sip of sips) {
        const txn = await fetchTransactions(sip.sip_id);
        if (Array.isArray(txn)) {
          allTransactions = [...allTransactions, ...txn];
        }
      }
      
      setTransactions(allTransactions.sort((a, b) => 
        new Date(b.transaction_date) - new Date(a.transaction_date)
      ));
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const filteredTransactions = transactions.filter((txn) =>
    txn.transaction_id?.toLowerCase().includes(search.toLowerCase()) ||
    txn.fund_id?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#F8FAFC] p-4 md:p-12 text-slate-900 font-sans">
      
      {/* HEADER */}
      <header className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
          <div className="flex items-center gap-2 text-indigo-600 font-bold text-xs uppercase tracking-widest mb-2">
            <Clock size={14} /> Audit Trail
          </div>
          <h1 className="text-4xl md:text-5xl font-black tracking-tight text-slate-900">
            Transactions
          </h1>
          <p className="text-slate-500 font-medium mt-1">
            Reviewing activity for <span className="text-slate-900 font-bold">{investor?.first_name}</span>
          </p>
        </motion.div>

        <div className="bg-white border border-slate-200 px-6 py-4 rounded-[2rem] shadow-sm hidden md:block">
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Lifetime Activity</p>
          <div className="flex items-center gap-3">
            <span className="text-3xl font-black text-slate-900">{transactions.length}</span>
            <span className="text-xs font-bold text-emerald-500 bg-emerald-50 px-2 py-1 rounded-lg">Verified</span>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto space-y-8">
        
        {/* STATS GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <TopCard title="Ledger Entries" value={transactions.length} icon={<Hash />} />
          <TopCard title="Buy Actions" value={transactions.filter(t => t.transaction_type === "BUY").length} icon={<BadgeCheck />} />
          <TopCard title="Total Volume" value={`₹${transactions.reduce((acc, t) => acc + Number(t.amount), 0).toLocaleString()}`} icon={<IndianRupee />} />
          <TopCard title="Total Units" value={transactions.reduce((acc, t) => acc + Number(t.units_allocated), 0).toFixed(2)} icon={<ArrowUpRight />} />
        </div>

        {/* SEARCH & FILTERS */}
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1 group">
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-500 transition-colors" size={20} />
            <input 
              type="text" 
              placeholder="Search by Transaction ID or Fund..."
              className="w-full bg-white border border-slate-200 p-5 pl-14 rounded-2xl outline-none focus:ring-4 ring-indigo-500/5 focus:border-indigo-500 transition-all font-medium"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <button className="bg-white border border-slate-200 px-6 py-4 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-slate-50 transition-colors">
            <Filter size={18} /> Filters
          </button>
        </div>

        {/* TABLE CONTAINER */}
        <div className="bg-white border border-slate-200 rounded-[2.5rem] shadow-sm overflow-hidden">
          {/* TABLE HEADER - Use grid-cols-12 for finer control */}
          <div className="hidden md:grid grid-cols-12 gap-4 px-10 py-6 bg-slate-50/50 border-b border-slate-100 text-[11px] font-black text-slate-400 uppercase tracking-[0.2em]">
            <div className="col-span-3">Ref ID</div>
            <div className="col-span-1">SIP ID</div>
            <div className="col-span-2">Asset</div>
            <div className="col-span-2">Execution</div>
            <div className="col-span-1">NAV</div>
            <div className="col-span-1 text-center">Units</div>
            <div className="col-span-2 text-right">Date</div>
          </div>

          {loading ? (
            <div className="p-24 flex flex-col items-center justify-center gap-4 text-slate-400 font-bold uppercase tracking-widest text-xs">
              <Activity className="animate-spin text-indigo-500" size={32} />
              Loading Central Ledger...
            </div>
          ) : filteredTransactions.length === 0 ? (
            <div className="p-24 text-center text-slate-400 font-medium italic">
              No historical data matching your criteria.
            </div>
          ) : (
            <div className="divide-y divide-slate-50">
              {filteredTransactions.map((txn, index) => (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.03 }}
                  key={txn.transaction_id}
                  className="grid grid-cols-1 md:grid-cols-12 gap-4 px-10 py-7 items-center hover:bg-slate-50/80 transition-colors group"
                >
                  {/* ID Column with Truncation fix for image_be3899.png */}
                  <div className="col-span-1 md:col-span-3 flex items-center gap-3 min-w-0">
                    <div className="shrink-0 w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center text-slate-400 group-hover:bg-indigo-600 group-hover:text-white transition-all">
                      <Hash size={14} />
                    </div>
                    <span className="font-black text-slate-900 text-sm truncate" title={txn.transaction_id}>
                      {txn.transaction_id}
                    </span>
                  </div>

                  {/* SIP ID */}
                  <div className="col-span-1 md:col-span-1 text-sm font-bold text-slate-500 font-mono tracking-tighter truncate">
                    {txn.sip_id}
                  </div>

                  {/* FUND / ASSET */}
                  <div className="col-span-1 md:col-span-2 text-sm font-bold text-slate-900 truncate">
                    {txn.fund_id}
                  </div>

                  {/* EXECUTION / AMOUNT */}
                  <div className="col-span-1 md:col-span-2 flex flex-col">
                    <span className="text-emerald-600 font-black text-lg tracking-tighter">₹{txn.amount}</span>
                    <span className="text-[9px] font-black uppercase text-slate-300 tracking-widest">{txn.transaction_type}</span>
                  </div>

                  {/* NAV */}
                  <div className="col-span-1 md:col-span-1 text-sm font-bold text-slate-600">
                    <span className="text-slate-300 mr-1">@</span> ₹{txn.nav_used}
                  </div>

                  {/* UNITS */}
                  <div className="col-span-1 md:col-span-1 flex justify-center">
                    <span className="text-indigo-600 font-black px-3 py-1 bg-indigo-50 rounded-lg text-sm italic">
                      {Number(txn.units_allocated).toFixed(3)}
                    </span>
                  </div>

                  {/* DATE */}
                  <div className="col-span-1 md:col-span-2 md:text-right">
                    <p className="text-sm font-bold text-slate-900">
                      {new Date(txn.transaction_date).toLocaleDateString("en-IN", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      })}
                    </p>
                    <p className="text-[10px] text-slate-400 font-medium">10:30 AM IST</p>
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

function TopCard({ title, value, icon }) {
  return (
    <motion.div 
      whileHover={{ y: -5 }}
      className="bg-white border border-slate-200 p-6 rounded-[2.5rem] flex items-center justify-between shadow-sm"
    >
      <div className="min-w-0">
        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1 truncate">{title}</p>
        <h3 className="text-2xl font-black text-slate-900 tracking-tight truncate">{value}</h3>
      </div>
      <div className="shrink-0 w-12 h-12 rounded-2xl bg-slate-900 text-white flex items-center justify-center shadow-lg">
        {icon}
      </div>
    </motion.div>
  );
}