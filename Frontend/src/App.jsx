import React, { useContext, lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import Header from "./components/Header";
import Footer from "./components/Footer";
import SignUp from "./pages/SignUp";
import Loading from "./components/Loading";
import SignIn from "./pages/SignIn";
import Profile from "./pages/Profile";
import NotFound from "./components/NotFound";
import About from "./pages/About";
import RouteNotFound from "./components/RouteNotFound";
import PrivateRoute from "./components/PrivateRoute";
import { UserContext } from "./context/UserContext";

// Lazy-loaded components
const Home = lazy(() => import("./pages/Home"));
const Chat = lazy(() => import("./components/Chat"));

function App() {
  const { currentUser } = useSelector((state) => state.user);
  const { selectedUser } = useContext(UserContext);

  return (
    <div className="bg-slate-900 min-h-screen">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route element={<PrivateRoute />}>
            <Route path="/profile" element={<Profile />} />
            <Route
              path="/"
              element={
                <Suspense fallback={<Loading />}>
                  <Home />
                </Suspense>
              }
            />
          </Route>
          <Route path="/signup" element={<SignUp />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/about" element={<About />} />
          <Route
            path="/chat"
            element={
              selectedUser ? (
                <Suspense fallback={<Loading />}>
                  <Chat selectedUser={selectedUser} />
                </Suspense>
              ) : (
                <NotFound />
              )
            }
          />
          <Route path="*" element={<RouteNotFound />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
