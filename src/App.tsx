// src/App.tsx

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import DefaultLayout from "./layout/DefaultLayout";
import View from "./components/View";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<DefaultLayout />}>
          {/* <Route index element={<Home />} /> */}
          <Route path="home" element={<Home />} />
          <Route path="view" element={<View />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
