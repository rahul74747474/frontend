import React, { useEffect, useState, useMemo } from "react";
import { Search, AlertCircle, FileText } from "lucide-react";

import Navbar from "./Navbar";
import ChatBot from "./ChatBot";

// --- Skeleton Loader ---
const TableSkeleton = () => (
  <div className="animate-pulse space-y-4">
    {[...Array(5)].map((_, i) => (
      <div key={i} className="flex items-center space-x-4 p-4 border-b border-slate-100">
        <div className="h-4 w-4 bg-slate-200 rounded"></div>
        <div className="h-4 w-24 bg-slate-200 rounded"></div>
        <div className="h-4 w-full bg-slate-200 rounded"></div>
      </div>
    ))}
  </div>
);

export default function Incident() {
  const [incidents, setIncidents] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("https://backend-8n42.onrender.com/api/incidents")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch");
        return res.json();
      })
      .then((data) => {
        setIncidents(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  const filteredIncidents = useMemo(() => {
    return incidents.filter((inc) => {
      const text = `${inc.number} ${inc.short_description}`.toLowerCase();
      return text.includes(search.toLowerCase());
    });
  }, [incidents, search]);

  return (
    <div className="h-screen bg-slate-50 text-slate-900">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 h-[calc(100vh-64px)] flex flex-col">

        {/* table Header */}
        <div className="sticky top-16 z-20 bg-slate-50 pb-4 mb-6">
          <h1 className="text-3xl font-extrabold tracking-tight">
            Incident Management
          </h1>
          <p className="mt-2 text-slate-500">
            Track and manage system tickets, outages, and service requests.
          </p>
        </div>

        {/* Main Row */}
        <div className="flex flex-1 gap-4 overflow-hidden">

          {/* TABLE CARD */}
          <div className="bg-white rounded-2xl shadow-xl border border-slate-100 w-full lg:w-[70%] flex flex-col overflow-hidden">

            {/* Search */}
            <div className="p-6 border-b border-slate-100 bg-white">
              <div className="relative w-full md:w-96">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search by ID or description..."
                  className="w-full pl-10 pr-3 py-2.5 border border-slate-200 rounded-xl bg-slate-50"
                />
              </div>
            </div>

            {/* Table Scroll Area */}
            <div className="flex-1 overflow-y-auto">
              {loading && <div className="p-8"><TableSkeleton /></div>}
              {error && <div className="p-8 text-red-500">{error}</div>}

              {!loading && !error && (
                <table className="w-full table-fixed divide-y divide-slate-100">
                  <thead className="sticky top-0 bg-slate-50 z-10">
                    <tr>
                      <th className="px-6 py-4 text-left text-xs text-slate-500">S.No</th>
                      <th className="px-6 py-4 text-left text-xs text-slate-500">Incident ID</th>
                      <th className="px-6 py-4 text-left text-xs text-slate-500">Description</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredIncidents.map((inc, i) => (
                      <tr key={inc.number} className="hover:bg-slate-50">
                        <td className="px-6 py-4 text-slate-400">{i + 1}</td>
                        <td className="px-6 py-4 font-mono text-indigo-700">{inc.number}</td>
                        <td className="px-6 py-4">{inc.short_description}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>

            {!loading && !error && (
              <div className="px-6 py-3 border-t text-xs text-slate-500">
                Showing {filteredIncidents.length} results
              </div>
            )}
          </div>

          {/* CHAT CARD */}
          <div className="bg-white rounded-2xl shadow-xl border border-slate-100 w-full lg:w-[30%] flex flex-col overflow-hidden">

            {/* Chat Header */}
            <div className="p-3 border-b border-slate-100 bg-white">
              <h2 className="text-lg font-semibold">L1 Assistant</h2>
              <p className="text-sm text-slate-500">
                Interactive chatbot for Operate Activities
              </p>
            </div>

            {/* Chat Scroll Area */}
            <div className="flex-1 overflow-hidden">
              <ChatBot />
            </div>

          </div>

        </div>
      </main>
    </div>
  );
}
