"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Wallet,
  Plus,
  Search,
  CalendarDays,
  IndianRupee,
  PlayCircle,
  BadgeCheck,
  Layers3,
  ArrowUpRight,
  ChevronRight,
  Timer,
  X,
  Loader2,
  Zap,
} from "lucide-react";

import { fetchSips, createSip, processSip } from "../../services/sipService";
import { fetchFunds } from "../../services/fundService";
import { useInvestor } from "../../context/InvestorContext";

// --- ANIMATION VARIANTS ---
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 100, damping: 12 },
  },
};

export default function SipsPage() {
  const { investor } = useInvestor();
  const [sips, setSips] = useState([]);
  const [funds, setFunds] = useState([]);
  const [search, setSearch] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    sip_id: "",
    investor_id: investor?.investor_id || "",
    fund_id: "",
    portfolio_id: "",
    sip_amount: "",
    sip_date: "",
    start_date: "",
    status: "ACTIVE",
  });

  useEffect(() => {
    loadData();
  }, [investor]);

  const loadData = async () => {
    try {
      setLoading(true);
      const [sipData, fundData] = await Promise.all([
        fetchSips(),
        fetchFunds(),
      ]);
      setSips(Array.isArray(sipData) ? sipData : []);
      setFunds(Array.isArray(fundData) ? fundData : []);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateSip = async () => {
    try {
      await createSip({ ...form, investor_id: investor?.investor_id });
      setShowForm(false);
      loadData();
    } catch (error) {
      console.log(error);
    }
  };

  const handleProcessSip = async (sipId) => {
    try {
      await processSip(sipId);
      alert("Investment Cycled Successfully");
    } catch (error) {
      console.log(error);
    }
  };

  const filteredSips = sips.filter((sip) =>
    sip.sip_id?.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="min-h-screen bg-[#F8FAFC] p-4 md:p-10 lg:p-16 text-slate-900 font-sans"
    >
      {/* HEADER SECTION */}
      <motion.header
        variants={itemVariants}
        className="max-w-7xl mx-auto relative overflow-hidden rounded-[2.5rem] bg-slate-900 p-8 md:p-12 mb-12 shadow-2xl"
      >
        <motion.div
          animate={{ scale: [1, 1.2, 1], rotate: [0, 5, 0] }}
          transition={{ duration: 10, repeat: Infinity }}
          className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 rounded-full -mr-20 -mt-20 blur-3xl"
        />
        <div className="relative z-10 flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8">
          <div className="space-y-3">
            <motion.div
              whileHover={{ x: 5 }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-[10px] font-black uppercase tracking-widest"
            >
              <Timer size={12} /> Recurring Wealth Portal
            </motion.div>
            <h1 className="text-4xl md:text-6xl font-black text-white tracking-tight">
              SIP{" "}
              <span className="text-indigo-400 italic font-serif">Vault</span>
            </h1>
            <p className="text-slate-400 max-w-xl text-sm md:text-lg font-medium leading-relaxed">
              Automate your financial future. Manage recurring assets and track
              wealth growth.
            </p>
          </div>

          <div className="flex flex-col items-start lg:items-end gap-4">
            <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl px-6 py-3">
              <p className="text-[10px] font-bold text-slate-500 uppercase mb-1">
                Active Portfolio
              </p>
              <p className="text-white font-bold">
                {investor?.first_name || "Guest Investor"}
              </p>
            </div>
            <motion.button
              whileHover={{
                scale: 1.05,
                boxShadow: "0 20px 25px -5px rgba(99, 102, 241, 0.4)",
              }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowForm(!showForm)}
              className="bg-white text-slate-900 px-8 py-4 rounded-2xl font-black flex items-center gap-3 shadow-xl hover:bg-indigo-50 transition-colors"
            >
              <AnimatePresence mode="wait">
                {showForm ? (
                  <motion.div
                    key="x"
                    initial={{ rotate: -90 }}
                    animate={{ rotate: 0 }}
                    exit={{ rotate: 90 }}
                  >
                    <X size={20} />
                  </motion.div>
                ) : (
                  <motion.div
                    key="plus"
                    initial={{ rotate: 90 }}
                    animate={{ rotate: 0 }}
                    exit={{ rotate: -90 }}
                  >
                    <Plus size={20} />
                  </motion.div>
                )}
              </AnimatePresence>
              {showForm ? "Cancel" : "Setup New SIP"}
            </motion.button>
          </div>
        </div>
      </motion.header>

      <main className="max-w-7xl mx-auto">
        {/* STATS GRID */}
        <motion.div
          variants={itemVariants}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12"
        >
          <StatCard
            title="Total Plans"
            value={sips.length}
            icon={<Layers3 />}
            color="text-violet-600"
            bg="bg-violet-100"
          />
          <StatCard
            title="Active Status"
            value={sips.filter((s) => s.status === "ACTIVE").length}
            icon={<BadgeCheck />}
            color="text-emerald-600"
            bg="bg-emerald-100"
          />
          <StatCard
            title="Asset Funds"
            value={funds.length}
            icon={<Wallet />}
            color="text-blue-600"
            bg="bg-blue-100"
          />
          <StatCard
            title="Yield Status"
            value="Growth"
            icon={<Zap />}
            color="text-amber-600"
            bg="bg-amber-100"
          />
        </motion.div>

        {/* SEARCH BAR */}
        <motion.div variants={itemVariants} className="relative mb-10 group">
          <Search
            className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-600 transition-colors"
            size={20}
          />
          <input
            type="text"
            placeholder="Search Vault by ID..."
            className="w-full bg-white border border-slate-200 p-5 pl-14 rounded-3xl outline-none focus:border-indigo-500 focus:ring-4 ring-indigo-500/5 transition-all text-slate-900 font-medium"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </motion.div>

        {/* REGISTRATION FORM */}
        <AnimatePresence>
          {showForm && (
            <motion.div
              initial={{ opacity: 0, height: 0, scale: 0.95 }}
              animate={{ opacity: 1, height: "auto", scale: 1 }}
              exit={{ opacity: 0, height: 0, scale: 0.95 }}
              className="bg-white border border-indigo-100 rounded-[2.5rem] p-8 md:p-12 shadow-2xl mb-12 overflow-hidden"
            >
              <div className="flex items-center gap-3 mb-10">
                <div className="w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center text-white shadow-lg shadow-indigo-200">
                  <Plus size={20} />
                </div>
                <div>
                  <h3 className="text-2xl font-black">Plan Configuration</h3>
                  <p className="text-slate-400 text-xs font-bold uppercase tracking-widest">
                    Register automated debit
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {Object.keys(form).map((key) => (
                  <motion.div
                    key={key}
                    variants={itemVariants}
                    className="space-y-2"
                  >
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">
                      {key.replace("_", " ")}
                    </label>
                    <input
                      type={key.includes("date") ? "date" : "text"}
                      className="w-full bg-slate-50 border border-slate-100 p-4 rounded-2xl outline-none focus:bg-white focus:border-indigo-500 focus:ring-2 ring-indigo-500/10 transition-all font-medium"
                      value={form[key]}
                      placeholder={`Enter ${key}`}
                      onChange={(e) =>
                        setForm({ ...form, [key]: e.target.value })
                      }
                    />
                  </motion.div>
                ))}
              </div>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleCreateSip}
                className="mt-10 w-full sm:w-auto bg-slate-900 text-white px-12 py-4 rounded-2xl font-black shadow-lg shadow-slate-900/20 hover:bg-black transition-all"
              >
                Authenticate & Save Plan
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* SIP LISTING */}
        <motion.div layout className="grid grid-cols-1 xl:grid-cols-2 gap-8">
          {loading ? (
            <div className="col-span-full flex flex-col items-center justify-center py-20 gap-4">
              <Loader2 className="animate-spin text-indigo-600" size={40} />
              <p className="text-slate-400 font-bold text-xs uppercase tracking-[0.3em]">
                Synchronizing Portfolio
              </p>
            </div>
          ) : (
            <AnimatePresence>
              {filteredSips.map((sip, index) => (
                <motion.div
                  layout
                  key={sip.sip_id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ delay: index * 0.05 }}
                  whileHover={{ y: -8 }}
                  className="bg-white border border-slate-200/60 rounded-[2.5rem] p-8 hover:shadow-2xl hover:shadow-indigo-500/10 transition-all group relative overflow-hidden"
                >
                  <div className="flex justify-between items-start mb-10 relative z-10">
                    <div className="flex items-center gap-4">
                      <motion.div
                        whileHover={{ rotate: 10 }}
                        className="w-14 h-14 rounded-2xl bg-slate-900 text-white flex items-center justify-center shadow-lg group-hover:bg-indigo-600 transition-colors"
                      >
                        <Layers3 size={24} />
                      </motion.div>
                      <div>
                        <h4 className="text-2xl font-black text-slate-900">
                          {sip.sip_id}
                        </h4>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-600 text-[9px] font-black uppercase tracking-widest border border-emerald-100">
                            {sip.status}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-3xl font-black text-slate-900 tracking-tighter">
                        ₹{sip.sip_amount}
                      </p>
                      <p className="text-[10px] font-bold text-slate-400 uppercase mt-1 flex items-center justify-end gap-1">
                        Monthly Cycle <ArrowUpRight size={10} />
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mb-10 relative z-10">
                    <DetailItem
                      label="Fund ID"
                      value={sip.fund_id}
                      icon={<Wallet size={14} />}
                    />
                    <DetailItem
                      label="Next Installment"
                      value={sip.sip_date}
                      icon={<CalendarDays size={14} />}
                    />
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleProcessSip(sip.sip_id)}
                    className="w-full bg-slate-50 hover:bg-slate-900 text-slate-600 hover:text-white py-5 rounded-2xl font-black flex items-center justify-center gap-3 transition-all relative z-10 border border-slate-100 hover:border-slate-900"
                  >
                    <PlayCircle size={20} />
                    Process Installment
                    <ChevronRight
                      size={18}
                      className="ml-2 opacity-30 group-hover:translate-x-1 transition-transform"
                    />
                  </motion.button>
                </motion.div>
              ))}
            </AnimatePresence>
          )}
        </motion.div>
      </main>
    </motion.div>
  );
}

// --- SUB-COMPONENTS ---

function StatCard({ title, value, icon, color, bg }) {
  return (
    <motion.div
      whileHover={{ y: -5, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.05)" }}
      className="bg-white p-6 rounded-[2rem] shadow-sm border border-slate-100 flex items-center justify-between group cursor-default transition-all"
    >
      <div>
        <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">
          {title}
        </p>
        <motion.h3
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          className="text-3xl font-black text-slate-900 mt-2"
        >
          {value}
        </motion.h3>
      </div>
      <div
        className={`${bg} ${color} w-14 h-14 rounded-2xl flex items-center justify-center group-hover:scale-110 group-hover:rotate-6 transition-all duration-300`}
      >
        {icon}
      </div>
    </motion.div>
  );
}

function DetailItem({ label, value, icon }) {
  return (
    <div className="bg-slate-50/50 border border-slate-100 p-4 rounded-2xl group hover:bg-white hover:border-indigo-100 transition-all cursor-default">
      <div className="flex items-center gap-2 text-slate-400 mb-1">
        {icon}
        <p className="text-[10px] font-black uppercase tracking-widest">
          {label}
        </p>
      </div>
      <p className="text-slate-900 font-black text-sm">{value || "N/A"}</p>
    </div>
  );
}
