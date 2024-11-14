// src/App.tsx

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import DefaultLayout from "./features/widgets/layouts/DefaultLayout";
import ChatDetails from "./features/chats/ChatDetails";
import Home from "./features/home/Home";
import View from "./features/chats/View";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ProjectDetails from "./features/project/MyProject";
import Settings from "./features/Settings";

function App() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
        retry: false,
      },
    },
  });
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Routes>
          <Route path="/" element={<DefaultLayout />}>
            {/* <Route index element={<Home />} /> */}
            <Route path="/" element={<Home />} />
            <Route path="view/:id" element={<View />} />
            <Route path="chat/:id" element={<ChatDetails />} />
            <Route path="project/:id" element={<ProjectDetails />} />
            <Route path="chat/:id/project/:id" element={<ProjectDetails />} />
            <Route path="project/:id/chat/:id" element={<ProjectDetails />} />
            <Route path="settings" element={<Settings />} />
          </Route>
        </Routes>
      </Router>
    </QueryClientProvider>
  );
}

export default App;
