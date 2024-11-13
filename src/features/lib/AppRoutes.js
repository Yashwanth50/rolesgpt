import React, { Suspense, lazy } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import DefaultLayout from "../widgets/layouts/DefaultLayout";
import NewSignUp from "../components/signup/NewSignUp.js";
import NewLogIn from "../components/siginin/NewLogIn.js";
import { Loader } from "../components/common/Loader.js";

// Lazy load components
const Home = lazy(() => import("../features/Home"));
const SignIn = lazy(() => import("../components/siginin/SignIn"));
const SignUp = lazy(() => import("../components/signup/SignUp"));
const MyFiles = lazy(() => import("../features/files/MyFiles"));
const ThanksPage = lazy(() => import("../components/signup/ThanksPage"));
const TermsOfService = lazy(() => import("../features/TermsOfService"));
const EmailSend = lazy(() => import("../components/signup/EmailSend"));
const ForgetPassword = lazy(() => import("../components/siginin/ForgetPass"));
const ChangeForgetPassword = lazy(() =>
  import("../components/siginin/ChangePass")
);
const CheckMail = lazy(() => import("../components/siginin/CheckMail"));
const ChangePassSuccess = lazy(() =>
  import("../components/siginin/ChangePassSuccess")
);
const GoogleCallback = lazy(() =>
  import("../components/siginin/GoogleCallback")
);
const MsCallback = lazy(() => import("../components/siginin/MsCallback"));
const LoginMail = lazy(() => import("../components/signup/LoginMail"));
const UsagePolicy = lazy(() => import("../features/UsagePolicy"));
const PrivacyPolicy = lazy(() => import("../features/PrivacyPolicy"));
const SharedChat = lazy(() => import("../features/chats/SharedChat"));
const SharedProject = lazy(() =>
  import("../features/projects/SharedProject.js")
);
const Settings = lazy(() => import("../features/Settings.js"));
const MobProject = lazy(() => import("../features/projects/MobProject.js"));
const SearchResults = lazy(() => import("../features/SearchResults.js"));

function AppRoutes() {
  return (
    <Router>
      <Suspense
        fallback={
          <div>
            <Loader />
          </div>
        }
      >
        <Routes>
          <Route path="/thanks" element={<ThanksPage />} />
          <Route path="/newsignup" element={<NewSignUp />} />
          <Route path="/newlogin" element={<NewLogIn />} />
          <Route path="/login" element={<SignIn />} />
          <Route path="/register" element={<SignUp />} />
          <Route path="/terms-service" element={<TermsOfService />} />
          <Route path="/usage-policy" element={<UsagePolicy />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/send-mail" element={<EmailSend />} />
          <Route path="/forgot-password" element={<ForgetPassword />} />
          <Route path="/share-chat/:shareId" element={<SharedChat />} />
          <Route path="/share-project/:shareId" element={<SharedProject />} />
          <Route
            path="/change-forget-password"
            element={<ChangeForgetPassword />}
          />
          <Route path="/check-mail" element={<CheckMail />} />
          <Route path="/change-pass-success" element={<ChangePassSuccess />} />
          <Route path="/auth/google/callback" element={<GoogleCallback />} />
          <Route path="/auth/ms/callback" element={<MsCallback />} />

          <Route element={<DefaultLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/s/:sessionId" element={<Home />} />
            <Route path="/auth/verify-request" element={<LoginMail />} />
            <Route element={<PrivateRoute />}>
              <Route path="/new-chat" element={<Home />} />
              <Route path="/new-chat/project/:boardId" element={<Home />} />

              <Route path="/chat/:chatId" element={<Home />} />
              <Route path="/chat/:chatId/project/:boardId" element={<Home />} />
              <Route
                path="/chat/:chatId/project-mobile/:boardId"
                element={<MobProject />}
              />
              <Route path="/research/:researchId" element={<Home />} />
              <Route path="/project/:boardId" element={<Home />} />
              <Route path="/project-mobile/:boardId" element={<MobProject />} />
              <Route path="/myknowledge" element={<MyFiles />} />
              <Route path="/project/:boardId/chat/:chatId" element={<Home />} />
              <Route
                path="/project-mobile/:boardId/chat/:chatId"
                element={<MobProject />}
              />
              <Route path="/settings" element={<Settings />} />
              <Route path="/search-Results" element={<SearchResults />} />
            </Route>
          </Route>
        </Routes>
      </Suspense>
    </Router>
  );
}

export default AppRoutes;
