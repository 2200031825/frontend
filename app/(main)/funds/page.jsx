"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  Plus,
  TrendingUp,
  ShieldCheck,
  LayoutGrid,
  X,
  ChevronRight,
  Loader2,
} from "lucide-react";
import { fetchFunds, createFund } from "../../services/fundService";
import { useInvestor } from "../../context/InvestorContext";

export default function FundsPage() {
  const { investor } = useInvestor();
  const [funds, setFunds] = useState([]);
  const [filteredFunds, setFilteredFunds] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({
    fund_id: "",
    amc_id: "",
    fund_name: "",
    scheme_code: "",
    fund_type: "",
    category: "",
    risk_level: "",
    expense_ratio: "",
    current_nav: "",
    launch_date: "",
  });

  useEffect(() => {
    loadFunds();
  }, []);

  useEffect(() => {
    const filtered = funds.filter((f) =>
      f.fund_name?.toLowerCase().includes(search.toLowerCase()),
    );
    setFilteredFunds(filtered);
  }, [search, funds]);

  const loadFunds = async () => {
    try {
      setLoading(true);
      const data = await fetchFunds();
      setFunds(Array.isArray(data) ? data : []);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async () => {
    try {
      await createFund(form);
      setShowForm(false);
      loadFunds();
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] p-4 md:p-10 lg:p-16 text-slate-900 font-sans">
      {/* HEADER SECTION */}
      <header className="max-w-6xl mx-auto mb-12 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="space-y-1"
        >
          <h1 className="text-3xl md:text-5xl font-black tracking-tight text-slate-900">
            Portfolio
          </h1>
          <p className="text-slate-500 font-medium">
            Welcome,{" "}
            <span className="text-indigo-600 font-bold">
              {investor?.first_name || "Investor"}
            </span>
          </p>
        </motion.div>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setShowForm(!showForm)}
          className={`flex items-center gap-2 px-6 py-3 rounded-2xl font-bold transition-all shadow-lg ${
            showForm
              ? "bg-slate-200 text-slate-700"
              : "bg-indigo-600 text-white shadow-indigo-200"
          }`}
        >
          {showForm ? <X size={20} /> : <Plus size={20} />}
          {showForm ? "Close" : "Add Asset"}
        </motion.button>
      </header>

      <main className="max-w-6xl mx-auto space-y-12">
        {/* STATS SECTION */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <StatBox
            label="Active Funds"
            value={funds.length}
            icon={<LayoutGrid size={20} />}
            delay={0.1}
          />
          <StatBox
            label="Max NAV"
            value={`₹${Math.max(...funds.map((f) => Number(f.current_nav) || 0), 0)}`}
            icon={<TrendingUp size={20} />}
            delay={0.2}
          />
          <StatBox
            label="Risk Level"
            value="Mixed"
            icon={<ShieldCheck size={20} />}
            delay={0.3}
          />
        </div>

        {/* SEARCH & ADD FORM */}
        <div className="space-y-6">
          <div className="relative w-full max-w-md group">
            <Search
              className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-500 transition-colors"
              size={18}
            />
            <input
              type="text"
              placeholder="Search funds..."
              className="w-full bg-white border border-slate-200 p-4 pl-12 rounded-2xl outline-none focus:ring-4 ring-indigo-500/5 focus:border-indigo-500 transition-all shadow-sm"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <AnimatePresence>
            {showForm && (
              <motion.div
                initial={{ opacity: 0, height: 0, y: -20 }}
                animate={{ opacity: 1, height: "auto", y: 0 }}
                exit={{ opacity: 0, height: 0, y: -20 }}
                className="overflow-hidden"
              >
                <div className="bg-white border border-slate-200 rounded-[2rem] p-6 md:p-10 shadow-xl shadow-slate-200/50">
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                    {Object.keys(form).map((key) => (
                      <div key={key} className="space-y-2">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">
                          {key.replace("_", " ")}
                        </label>
                        <input
                          type={key === "launch_date" ? "date" : "text"}
                          className="w-full bg-slate-50 border border-slate-100 p-3.5 rounded-xl outline-none focus:bg-white focus:border-indigo-500 focus:ring-2 ring-indigo-500/10 transition-all text-sm"
                          value={form[key]}
                          onChange={(e) =>
                            setForm({ ...form, [key]: e.target.value })
                          }
                        />
                      </div>
                    ))}
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleSubmit}
                    className="mt-8 w-full sm:w-auto bg-slate-900 text-white px-10 py-4 rounded-xl font-bold shadow-lg shadow-slate-900/20"
                  >
                    Confirm Transaction
                  </motion.button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* LIST SECTION */}
        <div className="space-y-4">
          <div className="hidden lg:grid grid-cols-6 px-8 text-[11px] font-bold text-slate-400 uppercase tracking-[0.2em] mb-4">
            <div className="col-span-2">Equity Asset</div>
            <div>Category</div>
            <div>Risk</div>
            <div>Value</div>
            <div className="text-right">Ratio</div>
          </div>

          {loading ? (
            <div className="flex flex-col items-center justify-center py-20 gap-3">
              <Loader2 className="animate-spin text-indigo-500" size={32} />
              <p className="text-slate-400 font-bold text-xs uppercase tracking-widest">
                Updating Markets
              </p>
            </div>
          ) : (
            <motion.div layout className="space-y-4">
              {filteredFunds.map((fund, index) => (
                <FundCard key={fund.fund_id} fund={fund} index={index} />
              ))}
            </motion.div>
          )}
        </div>
      </main>
    </div>
  );
}

function FundCard({ fund, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      whileHover={{ y: -4, shadow: "0 20px 25px -5px rgb(0 0 0 / 0.1)" }}
      className="bg-white border border-slate-200/60 p-5 md:px-8 md:py-6 rounded-[1.5rem] md:rounded-[2rem] shadow-sm transition-all group cursor-pointer"
    >
      <div className="grid grid-cols-1 lg:grid-cols-6 items-center gap-6">
        <div className="lg:col-span-2 flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center text-slate-800 font-black text-xs border border-slate-100 group-hover:bg-indigo-600 group-hover:text-white transition-all duration-300">
            {fund.fund_name?.charAt(0)}
          </div>
          <div className="overflow-hidden">
            <h4 className="font-black text-slate-900 group-hover:text-indigo-600 transition-colors truncate">
              {fund.fund_name}
            </h4>
            <span className="text-[10px] font-bold text-slate-400 font-mono uppercase tracking-tighter">
              {fund.fund_type}
            </span>
          </div>
        </div>

        <div className="text-sm font-bold text-slate-600 lg:block hidden">
          {fund.category}
        </div>

        <div className="lg:block hidden">
          <span
            className={`text-[10px] font-black px-3 py-1 rounded-lg border ${
              fund.risk_level?.toLowerCase().includes("high")
                ? "text-orange-500 bg-orange-50/50 border-orange-100"
                : "text-emerald-500 bg-emerald-50/50 border-emerald-100"
            }`}
          >
            {fund.risk_level}
          </span>
        </div>

        <div className="flex flex-col lg:items-start items-end">
          <span className="text-[10px] font-black text-slate-300 uppercase lg:hidden block">
            Current NAV
          </span>
          <span className="text-xl font-black text-slate-900">
            ₹{fund.current_nav}
          </span>
        </div>

        <div className="lg:text-right flex items-center lg:justify-end justify-between gap-4">
          <div className="flex flex-col lg:items-end items-start">
            <span className="text-sm font-bold text-slate-400 group-hover:text-slate-900 transition-colors">
              {fund.expense_ratio}%
            </span>
            <span className="text-[9px] font-bold text-slate-300 uppercase tracking-tighter">
              Exp. Ratio
            </span>
          </div>
          <ChevronRight
            size={18}
            className="text-slate-200 group-hover:text-indigo-500 group-hover:translate-x-1 transition-all"
          />
        </div>
      </div>
    </motion.div>
  );
}

function StatBox({ label, value, icon, delay }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay }}
      className="bg-white p-6 rounded-[2rem] border border-slate-200 flex items-center gap-5 shadow-sm"
    >
      <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
        {icon}
      </div>
      <div>
        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
          {label}
        </p>
        <p className="text-2xl font-black text-slate-900">{value}</p>
      </div>
    </motion.div>
  );
}
