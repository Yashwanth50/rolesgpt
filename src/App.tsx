// src/App.tsx

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import DefaultLayout from "./features/widgets/layouts/DefaultLayout";
import ChatDetails from "./features/chats/ChatDetails";
import Home from "./features/home/Home";
import View from "./features/chats/View";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

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
          </Route>
        </Routes>
      </Router>
    </QueryClientProvider>
  );
}

export default App;
