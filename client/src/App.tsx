import { BrowserRouter, Routes, Route } from "react-router-dom";

//Pages
import Login from "./pages/Auth/Login";
import Signup from "./pages/Auth/Signup";
import Home from "./pages/Home/Home";
import UserProfile from "./pages/User-Profile/UserProfile";
import Upload from "./pages/Upload/Upload";

// sub pages
import Main from "./pages/Home/components/Main";
import Subscribed from "./pages/Home/components/Subscribed";
import History from "./pages/Home/components/History";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Signup />}/>
        <Route path="/login" element={<Login />}/>
        <Route path="/upload" element={<Upload />}/>
        <Route path="/home" element={<Home component={<Main trending={false}/>} />}/>
        <Route path="/trending" element={<Home component={<Main trending={true} />} />}/>
        <Route path="/subscribed" element={<Home component={<Subscribed />} />}/>
        <Route path="/history" element={<Home component={<History />} />}/>
        <Route path="/userprofile/:username" element={<UserProfile />} />
      </Routes>
    </BrowserRouter>
  )
}