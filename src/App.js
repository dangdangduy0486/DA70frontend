import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login/Login";
import Signup from "./pages/SignUp/SignUp";
import Home from "./pages/Home/Home";
import CoinInfo from "./pages/CoinInfo/CoinInfo";
import EmailVerify from "./pages/EmailVerify/EmailVerify";
import UserInfor from "./pages/UserInfo/UserInfor";
import Forgot from "./pages/Forgot/Forgot";
import UserBudget from "./pages/UserBudget/UserBudget";
import NewPassword from "./pages/NewPassword/NewPassword";
import Coverter from "./components/Converter/Converter";
import Funding from "./pages/Funding/Funding";
import UserManagement from "./components/UserManagement/UserManagement";
import Aboutus from "./pages/AboutUs/AboutUs";
import P2PTrading from "./pages/P2PTrading/P2PTrading";
import Request from "./pages/Request/Request";
import Exchanges from "./pages/Exchanges/Exchanges";
import Derivatives from "./pages/Exchanges/Derivatives";
import ErrorPage from "./pages/ErrorPage/ErrorPage";
import ProtectedRoutes from "./pages/ProtectedRoutes/ProtectedRoutes";
import AllCoins from "./components/All Coins/AllCoins";
import PublicTransactions from "./pages/Request/PublicTransactions";
import MainPage from "./pages/MainPage/MainPage";
import Scroll from "./pages/Scroll";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <div className="pages">
          <Scroll />
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/forgot" element={<Forgot />} />

            <Route path="/aboutus" element={<Aboutus />} />

            <Route path="/" element={<Home />} />
            <Route path="/markets" element={<MainPage />} />
            <Route path="/coins/:coinID" element={<CoinInfo />} />
            <Route path="/converter" element={<Coverter />} />
            <Route path="/exchanges" element={<Exchanges />} />
            <Route path="/exchanges/derivatives" element={<Derivatives />} />
            <Route path="/all-coins" element={<AllCoins />} />
            <Route path="/transactions" element={<PublicTransactions />} />
            <Route
              path="/api/auth/verify/:id/:token"
              element={<EmailVerify />}
            />
            <Route
              path="/api/auth/reset-password/:email"
              element={<NewPassword />}
            />
            {/* Protected Route */}
            <Route element={<ProtectedRoutes />}>
              <Route path="/p2p-trading" element={<P2PTrading />} />
              <Route path="/user-info" element={<UserInfor />} />
              <Route path="/userbudget" element={<UserBudget />} />
              <Route path="/funding" element={<Funding />} />
              <Route path="/usermanagement" element={<UserManagement />} />
              <Route path="/request" element={<Request />} />
            </Route>
            <Route path="*" element={<ErrorPage />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
