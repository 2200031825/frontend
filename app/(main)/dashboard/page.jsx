"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import CountUp from "react-countup";
import {
  Wallet, Landmark, TrendingUp, IndianRupee,
  ArrowUpRight, ArrowDownRight, Activity, Zap
} from "lucide-react";
import {
  AreaChart, Area, PieChart, Pie, Cell,
  ResponsiveContainer, Tooltip, XAxis, YAxis,
  CartesianGrid,
} from "recharts";
import { useInvestor } from "../../context/InvestorContext";
import { fetchNetworth } from "../../services/investorService";
import { fetchSips } from "../../services/sipService";
import { fetchFunds } from "../../services/fundService";

export default function DashboardPage() {
  const { investor } = useInvestor();
  const [networth, setNetworth] = useState(0);
  const [funds, setFunds] = useState([]);
  const [sips, setSips] = useState([]);
  const [chartData, setChartData] = useState([]);
  const [allocationData, setAllocationData] = useState([]);

  useEffect(() => {
    loadDashboard();
  }, [investor]);

  const loadDashboard = async () => {
    try {
      if (!investor) return;
      const networthData = await fetchNetworth(investor.investor_id);
      const sipData = await fetchSips();
      const fundData = await fetchFunds();

      setNetworth(networthData?.total_networth || 0);
      setSips(Array.isArray(sipData) ? sipData : []);
      setFunds(Array.isArray(fundData) ? fundData : []);

      // Mock growth data with a more realistic curve
      setChartData([
        { month: "Jan", value: 25000 },
        { month: "Feb", value: 38000 },
        { month: "Mar", value: 32000 },
        { month: "Apr", value: 55000 },
        { month: "May", value: networthData?.total_networth || 0 },
      ]);

      const pieData = fundData.map((fund) => ({
        name: fund.fund_name,
        value: Number(fund.current_nav) || 0,
      }));
      setAllocationData(pieData);
    } catch (error) {
      console.log(error);
    }
  };

  const COLORS = ["#6366F1", "#8B5CF6", "#EC4899", "#10B981", "#F59E0B", "#3B82F6"];

  if (!investor) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F8FAFC]">
        <motion.div 
          animate={{ rotate: 360 }} 
          transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
        >
          <Activity className="text-indigo-600" size={40} />
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC] p-4 md:p-10 lg:p-12 text-slate-900">
      <div className="max-w-7xl mx-auto">
        
        {/* TOP HEADER */}
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6">
          <motion.div 
            initial={{ opacity: 0, x: -20 }} 
            animate={{ opacity: 1, x: 0 }}
          >
            <h1 className="text-4xl md:text-5xl font-black tracking-tight">
              Dashboard<span className="text-indigo-600">.</span>
            </h1>
            <p className="text-slate-500 font-medium mt-1">
              Welcome back, <span className="text-slate-900 font-bold">{investor?.first_name}</span>
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white border border-slate-200 shadow-xl shadow-indigo-500/5 rounded-[2.5rem] p-2 pl-8 flex items-center gap-6"
          >
            <div className="text-right">
              <p className="text-[10px] uppercase tracking-[0.2em] font-black text-slate-400">Total Networth</p>
              <h2 className="text-2xl font-black text-slate-900">
                ₹<CountUp end={networth} separator="," duration={2.5} />
              </h2>
            </div>
            <div className="bg-indigo-600 p-4 rounded-full text-white">
              <Zap size={24} fill="currentColor" />
            </div>
          </motion.div>
        </header>

        {/* KEY STATS GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <StatCard title="Networth" value={`₹${networth.toLocaleString()}`} icon={<IndianRupee />} trend="+12%" />
          <StatCard title="Active SIPs" value={sips.length} icon={<Wallet />} trend="+2 new" />
          <StatCard title="Mutual Funds" value={funds.length} icon={<Landmark />} trend="Diversified" />
          <StatCard title="Total Returns" value="+18.4%" icon={<TrendingUp />} trend="Market Outperform" isPositive />
        </div>

        {/* CHARTS SECTION */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          
          {/* AREA CHART - GROWTH */}
          <motion.div 
            className="lg:col-span-2 bg-white rounded-[2.5rem] border border-slate-200 p-8 shadow-sm"
            whileHover={{ y: -5 }}
          >
            <div className="flex justify-between items-center mb-8">
              <div>
                <h3 className="text-xl font-black">Performance</h3>
                <p className="text-slate-400 text-xs font-bold uppercase tracking-widest">Networth Growth</p>
              </div>
              <div className="flex items-center gap-2 bg-emerald-50 text-emerald-600 px-4 py-2 rounded-full text-xs font-black">
                <ArrowUpRight size={14} /> 12.5% THIS YEAR
              </div>
            </div>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData}>
                  <defs>
                    <linearGradient id="growthGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#6366F1" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#6366F1" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} dy={10} />
                  <YAxis hide />
                  <Tooltip 
                    contentStyle={{ borderRadius: '20px', border: 'none', boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1)' }}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="value" 
                    stroke="#6366F1" 
                    strokeWidth={4} 
                    fillOpacity={1} 
                    fill="url(#growthGradient)" 
                    animationDuration={2000}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          {/* PIE CHART - ALLOCATION */}
          <motion.div 
            className="bg-white rounded-[2.5rem] border border-slate-200 p-8 shadow-sm"
            whileHover={{ y: -5 }}
          >
            <h3 className="text-xl font-black mb-2">Allocation</h3>
            <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-6">Asset Distribution</p>
            <div className="h-[200px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={allocationData}
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={8}
                    dataKey="value"
                  >
                    {allocationData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-6 space-y-3 overflow-y-auto max-h-[120px] pr-2">
              {allocationData.map((item, index) => (
                <div key={index} className="flex justify-between items-center text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full" style={{ backgroundColor: COLORS[index % COLORS.length] }} />
                    <span className="font-bold text-slate-600 truncate max-w-[100px]">{item.name}</span>
                  </div>
                  <span className="font-black text-slate-900">₹{item.value}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* BOTTOM SECTION: RECENT ACTIVITY */}
        <section>
          <div className="flex justify-between items-end mb-8">
            <div>
              <h3 className="text-2xl font-black">Recent SIPs</h3>
              <p className="text-slate-500 font-medium">Monitoring your monthly contributions</p>
            </div>
            <button className="text-indigo-600 font-bold text-sm hover:underline">View All</button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence>
              {sips.slice(0, 3).map((sip, index) => (
                <motion.div
                  key={sip.sip_id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.02 }}
                  className="bg-white border border-slate-200 p-6 rounded-[2rem] flex justify-between items-center group"
                >
                  <div className="flex items-center gap-4">
                    <div className="bg-slate-50 group-hover:bg-indigo-50 transition-colors p-4 rounded-2xl text-slate-400 group-hover:text-indigo-600">
                      <Activity size={20} />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900 leading-tight truncate w-32">{sip.sip_id}</h4>
                      <p className="text-xs font-bold text-slate-400 uppercase mt-1">ID: {sip.fund_id}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-black text-emerald-600">₹{sip.sip_amount}</p>
                    <span className="text-[10px] font-black uppercase text-slate-400 px-2 py-1 bg-slate-100 rounded-md">
                      {sip.status}
                    </span>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </section>
      </div>
    </div>
  );
}

function StatCard({ title, value, icon, trend, isPositive }) {
  return (
    <motion.div
      whileHover={{ y: -5, boxShadow: "0 20px 25px -5px rgba(0,0,0,0.05)" }}
      className="bg-white p-7 rounded-[2.5rem] border border-slate-200 relative overflow-hidden group"
    >
      <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
        {icon}
      </div>
      <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4">{title}</p>
      <h3 className="text-3xl font-black text-slate-900 mb-2">{value}</h3>
      <div className={`text-[10px] font-black flex items-center gap-1 ${isPositive ? 'text-emerald-500' : 'text-slate-500'}`}>
        {isPositive ? <ArrowUpRight size={12} /> : <div className="w-1.5 h-1.5 rounded-full bg-slate-300 mr-1" />}
        {trend}
      </div>
    </motion.div>
  );
}