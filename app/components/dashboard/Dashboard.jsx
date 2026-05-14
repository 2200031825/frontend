"use client";
import { useState, useEffect } from "react";
import { PlusIcon } from "lucide-react";

export default function Dashboard() {
  const [sip, setSip] = useState([]);
  useEffect(() => {
    alert("Hello");
  }, []);

  return (
    <div className="flex min-h-screen bg-pink-50">
     
      <main className="flex-1 p-8 overflow-y-auto">
        <header className="flex justify-between items-center mb-8">
          <div className="flex justify-between items-center gap-72">
            <h1 className="text-3xl font-bold text-slate-800">Analytics</h1>
            <div className="bg-pink-200 p-1 rounded-full flex gap-1 text-sm font-medium">
              <button className="bg-white px-4 py-1 rounded-full shadow-sm">
                Full Statistics
              </button>
              <button className="px-4 py-1 text-slate-500">
                Result Summary
              </button>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <button className="p-2 bg-white border rounded-lg shadow-sm">
              +
            </button>
            <div className="w-10 h-10 bg-slate-200 rounded-full overflow-hidden">
              <div className="bg-indigo-400 w-full h-full" />
            </div>
          </div>
        </header>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-pink-50 p-6 rounded-3xl border border-dashed border-slate-300">
            <h3 className="font-semibold text-lg text-black">Team Payments</h3>
            <p className="text-sm text-blue-600 mb-4">07 Dec Approval</p>
            <div className="flex space-x-2">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="w-8 h-8 rounded-full border-pink-500 bg-lime-400 flex items-center justify-center text-xs"
                >
                  25+
                </div>
              ))}
            </div>
          </div>
          <div className="bg-white p-6 rounded-3xl border border-dashed border-slate-300 relative">
            <h3 className="font-semibold text-lg text-black">Savings</h3>
            <p className="text-2xl font-bold mt-4 text-black">$5,839</p>
            <span className="text-xs text-red-800">▼ -11% last week</span>
            <button className="absolute bottom-4 right-4 bg-black text-white p-2 rounded-xl">
              →
            </button>
          </div>
          <div className="bg-white p-6 rounded-3xl border border-dashed border-slate-300">
            <h3 className="font-semibold text-lg mb-2 text-black">
              Income statistics
            </h3>
            <div className="flex items-end gap-2 h-12">
              <div className="w-4 h-6 bg-blue-500 rounded-sm"></div>
              <div className="w-4 h-8 bg-blue-800 rounded-sm"></div>
              <div className="w-4 h-12 bg-orange-600 rounded-sm"></div>
            </div>
          </div>
          <div className="bg-[#1EBBA3] p-6 rounded-3xl text-white relative overflow-hidden">
            <p className="text-2xl font-bold">$95.9</p>
            <p className="text-xs opacity-80 mb-4">Per Month</p>
            <p className="font-semibold text-sm mb-4">
              Choose Best Plan For You!
            </p>
            <div className="flex gap-2">
              <button className="text-xs font-bold border-b border-white">
                Details
              </button>
              <button className="bg-black text-white text-xs px-4 py-2 rounded-full">
                Upgrade
              </button>
            </div>
          </div>
        </div>
        <section>
          <h2 className="text-xl font-bold mb-4 text-black">
            Recently Payments
          </h2>
        </section>
      </main>
    </div>
  );
}
