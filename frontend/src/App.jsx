import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./component/Navbar";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Profile from "./pages/Profile";
import CreateProfile from "./pages/createProfile";
import CreateTeam from "./pages/CreateTeam";
import Team from "./pages/Team";
import Notification from "./pages/Notification";
import GetTeam from "./pages/GetTeam";
import Hackathons from "./pages/Hackathon";
import CreateHackathon from "./pages/createHackathon";
import Home from "./pages/Home";
import Chat from "./pages/Chat";
function App() {
  return (
    <BrowserRouter>
    <Navbar/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/profile" element={<Profile/>} />
        <Route path="/create" element={<CreateProfile/>} />
        <Route path="/createTeam" element={<CreateTeam/>} />
        <Route path="/team" element={<Team/>} />
        <Route path="/notification" element={<Notification/>} />
      <Route path="/team/:id" element={<GetTeam />} />
      <Route path="/hackathon" element={<Hackathons />} />
      <Route path="/createHackathon" element={<CreateHackathon />} />
      <Route path="/home" element={<Home/>}/>
       <Route path="/chat" element={<Chat/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;