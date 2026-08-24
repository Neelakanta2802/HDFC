import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import NavBar from "./Components/NavBar/NavBar";
import Login from "./Components/Login/Login";
import Signup from "./Components/Signup/Signup";
import Home from "./Components/Home/Home";
import CardsData from "./Components/CardsData/CardsData";
import Bills_Recharge from "./Components/Bills_Recharge/Bills_Recharge";

function App() {
  const location = useLocation();

  // Check if user is logged in (token exists in localStorage)
  const isLoggedIn = localStorage.getItem("token");

  // Don't show NavBar on login and signup pages
  const hideNavBar = location.pathname === "/login" || location.pathname === "/signup";

  return (
    <>
      {/* Show NavBar on all pages except login and signup */}
      {!hideNavBar && isLoggedIn && <NavBar />}

      <Routes>
        {/* Public routes — redirect to dashboard if already logged in */}
        <Route
          path="/login"
          element={isLoggedIn ? <Navigate to="/dashboard" replace /> : <Login />}
        />
        <Route
          path="/signup"
          element={isLoggedIn ? <Navigate to="/dashboard" replace /> : <Signup />}
        />

        {/* Protected routes — redirect to login if not logged in */}
        <Route
          path="/dashboard"
          element={isLoggedIn ? <Home /> : <Navigate to="/login" />}
        />
        <Route
          path="/cards"
          element={isLoggedIn ? <CardsData /> : <Navigate to="/login" />}
        />
        <Route
          path="/bills"
          element={isLoggedIn ? <Bills_Recharge /> : <Navigate to="/login" />}
        />

        {/* Default: redirect to dashboard if logged in, login if not */}
        <Route
          path="*"
          element={<Navigate to={isLoggedIn ? "/dashboard" : "/login"} />}
        />
      </Routes>
    </>
  );
}

export default App;
