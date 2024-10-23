import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; // Import Routes
import PrivateChat from "./PrivateChat";
import VideoChat from "./VideoChat";
import ChatApp from "./ChatApp";

const App = () => {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<ChatApp />} />
          <Route path="/chat/:chatId" element={<PrivateChat />} />
          <Route path="/video/:channelName" element={<VideoChat />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
