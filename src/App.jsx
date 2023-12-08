import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./components/Login/LoginPage";
import SignUpPage from "./components/Pages/SignUpPage";
import HomePage from "./components/Home/Homepage";

import SpecificPostPage from "./components/Pages/PostPage";
import ProfilePage from "./components/Pages/Profile";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />}></Route>

        <Route path="/postpage" element={<SpecificPostPage />}></Route>
        <Route path="/profile" element={<ProfilePage />}></Route>
      </Routes>
    </Router>
  );
}

export default App;
