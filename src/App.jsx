import Incidents from "./Components/Incidents";
import ChatBot from "./Components/ChatBot";

function App() {
  return (
    <div className="flex h-screen overflow-hidden bg-gray-100">

      {/* Left: Incidents (scrolls independently) */}
      <div className="flex-1 overflow-y-auto">
        <Incidents />
      </div>

      {/* Right: ChatBot (scrolls independently) */}
      <div className="w-[30vw] border-l overflow-y-auto">
        <ChatBot />
      </div>

    </div>
  );
}

export default App;


