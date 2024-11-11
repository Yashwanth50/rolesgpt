// src/App.tsx

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import DefaultLayout from "./layout/DefaultLayout";
import View from "./components/chats/View";
import ChatDetails from "./components/chats/ChatDetails";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<DefaultLayout />}>
          {/* <Route index element={<Home />} /> */}
          <Route path="/" element={<Home />} />
          <Route path="view/:id" element={<View />} />
          <Route path="chat/:id" element={<ChatDetails />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
