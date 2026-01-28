export default function ChatBot() {
  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 h-[calc(100vh-64px)] flex flex-col">

      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">
          L1 Assistant
        </h1>
        <p className="mt-2 text-slate-500">
          Interactive chatbot for Operate Activities
        </p>
      </div>

      {/* Dashboard Card */}
      <div className="bg-white rounded-2xl shadow-xl shadow-slate-200/60 border border-slate-100 overflow-hidden flex flex-col h-full">
      <div className="w-[30vw] h-screen bg-white text-black">
{/* ===================================================================================================================================================================================================== */}
      {/* iframe here -> in place of <p> tag */}
      <p className="text-sm text-gray-400">
        Chatbot UI goes here
      </p>
{/* ========================================================================================================================================================================================== */}
    </div>
       
      </div>
    </main>

    
  );
}
