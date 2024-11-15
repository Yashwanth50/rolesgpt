// src/App.tsx

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import DefaultLayout from "./features/widgets/layouts/DefaultLayout";
import ChatDetails from "./features/chats/ChatDetails";
import Home from "./features/home/Home";
import View from "./features/chats/View";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ProjectDetails from "./features/project/MyProject";
import Settings from "./features/Settings";
import { AuthProvider } from "./features/lib/AuthContext";
// import Dashboard from "./features/dashboard/Dashboard";
import SignInUI from "./components/signin/SignInUI";
import ChatProject from "./features/chatproj/ChatProject";
import GoogleCallback from "./components/signin/GoogleCallback";
import MsCallback from "./components/signin/MsCallback";
import MyFiles from "./features/files/MyFiles";

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
      <AuthProvider>
        <Router>
          <Routes>
            <Route path="/signin" element={<SignInUI />} />
            <Route path="/auth/google/callback" element={<GoogleCallback />} />
            <Route path="/auth/ms/callback" element={<MsCallback />} />

            <Route path="/" element={<DefaultLayout />}>
              {/* <Route index element={<Home />} /> */}
              <Route path="/" element={<Home />} />
              <Route path="view/:id" element={<View />} />
              <Route path="chat/:chatId" element={<ChatDetails />} />
              <Route path="chat" element={<ChatDetails />} />
              <Route path="session/:sessionId" element={<ChatDetails />} />
              <Route path="project/:id" element={<ProjectDetails />} />
              <Route path="chat/:id/project/:id" element={<ChatProject />} />
              <Route path="project/:id/chat/:id" element={<ChatProject />} />
              <Route path="settings" element={<Settings />} />
              <Route path="/my-knowledge" element={<MyFiles />} />
              {/* <Route path="dashboard" element={<Dashboard />} /> */}
            </Route>
          </Routes>
        </Router>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
