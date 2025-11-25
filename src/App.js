import { useState,useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
// Importing pages from src/pages/admin
import SplashScreen from "./SplashScreen";
import AdminDashboard from "./Pages/Admin/AdminDashboard";
import AllUsers from "./Pages/Admin/AllUsers";
import UserDashboard from "./Pages/User/UserDashboard";
import UserLogin from "./Pages/User/UserLogin";
import UserRegister from "./Pages/User/UserRegister";
import SubmitFeedback from "./Pages/User/SubmitFeedback";
import SubmittedFeedbacks from "./Pages/User/SubmittedFeedbacks";
import './axiosConfig';
import ViewStatus from "./Pages/User/ViewStatus";
import PendingFeedbacks from "./Pages/Admin/PendingFeedbacks";
import ApproveFeedbackById from "./Pages/Admin/ApproveFeedbackbyId";
import Footer from "./Footer";
import './App.css'
import FetchUsers from "./Pages/Admin/FetchUsers";
import ApprovedFeedbacks from "./Pages/Admin/ApprovedFeedbacks";

function App() {
  const [user, setUser] = useState(null);
  return (
    <div>
     
   <BrowserRouter>
   <Routes>
    <Route path='/' element={<SplashScreen />}></Route>
    <Route path='/UserLogin' element={<UserLogin/>}></Route>
    <Route path='/UserDashboard' element={<UserDashboard/>}></Route>
   <Route path='/AdminDashboard' element={<AdminDashboard/>}></Route>*
    <Route path="/UserRegister" element={<UserRegister/>}></Route>
    <Route path="/ViewStatus" element={<ViewStatus/>}></Route>
    <Route path="/SubmittedFeedbacks" element={<SubmittedFeedbacks/>}></Route>
    <Route path="/AllUsers" element={<AllUsers />} ></Route>
    <Route path="/SubmitFeedback" element={<SubmitFeedback/>} ></Route>
    <Route path="/SubmittedFeedbacks" element={<SubmittedFeedbacks />} />
    <Route path="/PendingFeedbacks" element={<PendingFeedbacks/>}></Route>
    <Route path="/ApproveFeedbackbyId" element={<ApproveFeedbackById/>}></Route>
    <Route path="/FetchUsers" element={<FetchUsers/>}></Route>
    <Route path="/ApprovedFeedbacks" element={<ApprovedFeedbacks/>}></Route>
   </Routes>
  
   </BrowserRouter>
    <Footer />
    </div>
  );
}

export default App;
