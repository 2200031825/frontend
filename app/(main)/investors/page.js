"use client";

import { useEffect, useState } from "react";
import { fetchInvestors } from "../../services/investorService";

export default function InvestorsPage() {

  const [investor, setInvestor] = useState(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {

    const loadInvestor = async () => {

      try {

        const data = await fetchInvestors();

        console.log("Investor Data:", data);

        setInvestor(data);

      } catch (error) {

        console.log(error);

      } finally {

        setLoading(false);
      }
    };

    loadInvestor();

  }, []);

  return (
    <div className="flex min-h-screen bg-gray-100">

  

      {/* Main Content */}
      <main className="flex-1 p-10">

        <h1 className="text-3xl font-bold text-black mb-8">
          Investors
        </h1>

        {/* Loading */}
        {loading && (
          <div className="text-gray-500">
            Loading...
          </div>
        )}

        {/* Investor Card */}
        {!loading && investor && (

          <div className="bg-white p-6 rounded-2xl shadow-sm border w-96">

            <h2 className="text-2xl font-bold text-black mb-4">
              {investor.name}
            </h2>

            <div className="space-y-2">

              <p className="text-gray-700">
                <strong>ID:</strong> {investor.investor_id}
              </p>

              <p className="text-gray-700">
                <strong>Email:</strong> {investor.email}
              </p>

              <p className="text-gray-700">
                <strong>Phone:</strong> {investor.phone}
              </p>

              <p className="text-gray-700">
                <strong>City:</strong> {investor.pan_number}
              </p>

            </div>

          </div>
        )}

        {/* No Data */}
        {!loading && !investor && (
          <div className="text-red-500">
            No Investor Data Found
          </div>
        )}

      </main>
    </div>
  );
}