import React, { useEffect, useState, useMemo } from "react";
import { 
  Search, 
  AlertCircle, 
  FileText
} from "lucide-react";

import Navbar from "./Navbar";

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

// --- Main Component ---
export default function Incident() {

  const [incidents, setIncidents] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

// fetches data from proxy backend 
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

  // 🔍 Search only
  const filteredIncidents = useMemo(() => {
    return incidents.filter((inc) => {
      const text = `${inc.number} ${inc.short_description}`.toLowerCase();
      return text.includes(search.toLowerCase());
    });
  }, [incidents, search]);

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 selection:bg-indigo-100 selection:text-indigo-700">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        
        {/* Page Header */}
        <div className="fixed mb-8">
          <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">
            Incident Management
          </h1>
          <p className="mt-2 text-slate-500">
            Track and manage system tickets, outages, and service requests.
          </p>
        </div>

        {/* Dashboard Card */}
        <div className="bg-white rounded-2xl shadow-xl shadow-slate-200/60 border border-slate-100 overflow-hidden">
          
          {/* Search Bar */}
          <div className="p-6 border-b border-slate-100 bg-white flex items-center">
            <div className="relative w-full md:w-96">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-slate-400" />
              </div>
              <input
                type="text"
                placeholder="Search by ID or description..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="block w-full pl-10 pr-3 py-2.5 border border-slate-200 rounded-xl bg-slate-50 text-slate-900 placeholder-slate-400 focus:outline-none focus:bg-white focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all sm:text-sm"
              />
            </div>
          </div>

          {/* Content Area */}
          <div className="relative min-h-[400px]">
            
            {loading && (
              <div className="p-8">
                <TableSkeleton />
              </div>
            )}

            {error && (
              <div className="flex flex-col items-center justify-center py-20 px-4 text-center">
                <AlertCircle className="h-8 w-8 text-red-500 mb-4" />
                <h3 className="text-lg font-semibold text-slate-900">Connection Error</h3>
                <p className="text-slate-500 max-w-md mt-2">
                  {error}
                </p>
              </div>
            )}

            {!loading && !error && (
              <div className="overflow-x-auto">
                <table className="w-full table-fixed divide-y divide-slate-100">
                  <colgroup>
                    <col className="w-[60px]" />
                    <col className="w-[200px]" />
                    <col className="w-auto" />
                  </colgroup>

                  <thead>
                    <tr className="bg-slate-50/50">
                      <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500">#</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500">Incident ID</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500">Description</th>
                    </tr>
                  </thead>

                  <tbody className="bg-white divide-y divide-slate-100">
                    {filteredIncidents.length === 0 ? (
                      <tr>
                        <td colSpan="3" className="py-20 text-center text-slate-400">
                          <FileText className="h-10 w-10 mx-auto mb-2 opacity-20" />
                          No incidents found
                        </td>
                      </tr>
                    ) : (
                      filteredIncidents.map((inc, index) => (
                        <tr key={inc.number} className="hover:bg-slate-50">
                          <td className="px-6 py-4 text-slate-400">{index + 1}</td>
                          <td className="px-6 py-4">
                            <span className="inline-flex px-2.5 py-1 rounded-md text-xs font-mono bg-indigo-50 text-indigo-700">
                              {inc.number}
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <div className="text-sm text-slate-700 break-words">
                              {inc.short_description}
                            </div>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          {/* Footer */}
          {!loading && !error && (
            <div className="px-6 py-4 border-t border-slate-100 bg-slate-50/30 text-xs text-slate-500">
              Showing {filteredIncidents.length} results
            </div>
          )}
        </div>
      </main>
    </div>
  );
}



