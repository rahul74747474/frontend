import Navbar from "./Components/Navbar";
import Incidents from "./Components/Incidents";
import ChatBot from "./Components/ChatBot";

function App() {
  return (
    <div className="h-screen bg-slate-50 font-sans text-slate-900 selection:bg-indigo-100 selection:text-indigo-700">
      <Navbar />

      <div className="flex h-[calc(100vh-64px)] overflow-hidden bg-gray-100">
        {/* Left: Incidents */}
        <div className="flex-1 overflow-y-auto">
          <Incidents />
        </div>

        {/* Right: ChatBot */}
        <div className="w-[30vw] overflow-y-auto">
          <ChatBot />
        </div>
      </div>
    </div>
  );
}

export default App;

