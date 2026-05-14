"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Eye, EyeOff, TrendingUp, ShieldCheck, ArrowRight, Loader2 } from "lucide-react";
import { loginInvestor } from "../../services/authService";
import { useInvestor } from "../../context/InvestorContext";

export default function LoginPage() {
  const router = useRouter();
  const { setInvestor } = useInvestor();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    try {
      setLoading(true);
      const data = await loginInvestor(email, password);
      if (data?.token) {
        document.cookie = `token=${data.token}; path=/`;
        document.cookie = `investor=${encodeURIComponent(JSON.stringify(data.user))}; path=/`;
        setInvestor(data.user);
        router.push("/dashboard");
      } else {
        alert("Invalid credentials");
      }
    } catch (error) {
      alert("Login failed");
    } finally {
      setLoading(false);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F1F5F9] px-4 font-sans">
      
      {/* Soft Background Orbs (Low Opacity) */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] right-[-5%] w-[400px] h-[400px] rounded-full bg-indigo-200/40 blur-[80px]" />
        <div className="absolute bottom-[-10%] left-[-5%] w-[400px] h-[400px] rounded-full bg-slate-200/60 blur-[80px]" />
      </div>

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative w-full max-w-[1000px] bg-white rounded-[32px] shadow-sm border border-slate-200 grid grid-cols-1 md:grid-cols-2 overflow-hidden"
      >
        {/* LEFT SIDE: Subtle Branding */}
        <div className="hidden md:flex flex-col justify-between p-12 bg-slate-50/50 border-r border-slate-100">
          <motion.div variants={itemVariants} className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-slate-900 flex items-center justify-center text-white">
              <TrendingUp size={20} />
            </div>
            <span className="font-bold text-slate-800 tracking-tight text-xl">KFin Wings</span>
          </motion.div>

          <div className="space-y-4">
            <motion.h2 variants={itemVariants} className="text-4xl font-bold text-slate-900 leading-tight">
              Simple Portfolio <br /> Management.
            </motion.h2>
            <motion.p variants={itemVariants} className="text-slate-500 leading-relaxed">
              A calm and intuitive space to monitor your mutual fund growth and systematic investments.
            </motion.p>
          </div>

          <motion.div variants={itemVariants} className="flex items-center gap-2 text-slate-400 text-xs font-semibold uppercase tracking-widest">
            <ShieldCheck size={14} /> 
            Secure Environment
          </motion.div>
        </div>

        {/* RIGHT SIDE: Login Form */}
        <div className="p-8 md:p-16 flex flex-col justify-center">
          <motion.div variants={itemVariants} className="mb-10">
            <h3 className="text-2xl font-bold text-slate-900">Sign In</h3>
            <p className="text-slate-500 text-sm mt-1 font-medium">Enter details to access your account</p>
          </motion.div>

          <div className="space-y-5">
            <motion.div variants={itemVariants} className="space-y-1.5">
              <label className="text-xs font-bold text-slate-400 ml-1 uppercase">Email</label>
              <input
                type="email"
                placeholder="email@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 p-3.5 rounded-xl outline-none focus:bg-white focus:border-slate-400 transition-all text-slate-900 placeholder:text-slate-300"
              />
            </motion.div>

            <motion.div variants={itemVariants} className="space-y-1.5">
              <label className="text-xs font-bold text-slate-400 ml-1 uppercase">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 p-3.5 pr-12 rounded-xl outline-none focus:bg-white focus:border-slate-400 transition-all text-slate-900 placeholder:text-slate-300"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </motion.div>

            <motion.button
              variants={itemVariants}
              whileHover={{ y: -1 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleLogin}
              disabled={loading}
              className="w-full mt-4 bg-slate-900 text-white p-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-black transition-all disabled:opacity-50 shadow-lg shadow-slate-200"
            >
              {loading ? (
                <Loader2 className="animate-spin" size={20} />
              ) : (
                <>
                  Continue to Dashboard
                  <ArrowRight size={18} />
                </>
              )}
            </motion.button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}