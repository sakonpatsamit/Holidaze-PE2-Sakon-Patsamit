import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./components/Login/LoginPage";
import SignUpPage from "./components/Pages/SignUpPage";
import HomePage from "./components/Home/Homepage";
import VenuesPage from "./components/Pages/VenuesPage";
import SpecificPostPage from "./components/Pages/PostPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />}></Route>
        <Route path="/venues" element={<VenuesPage />}></Route>
        <Route path="/postpage" element={<SpecificPostPage />}></Route>
      </Routes>
    </Router>
  );
}

export default App;
