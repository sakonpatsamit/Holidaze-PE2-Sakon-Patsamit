import React, { useState } from "react";
import Navigation from "../Shared/Navigation";
import Footer from "../Shared/Footer";

import MyVenues from "../Profile/MyVenues";
import MyBookings from "../Profile/MyBookings";
import EditAvatar from "../Profile/EditAvatar";
import { isVenueManager } from "../../services/auth";
import { useEffect } from "react";

const ProfilePage = () => {
  useEffect(() => {
    document.title = "Holidaze - Profile";
  });
  return (
    <div className="flex flex-col min-h-screen justify-between">
      <Navigation />

      <main className="flex-grow">
        <div className="max-w-5xl mx-auto p-20">
          <EditAvatar />
          <MyBookings />
          {isVenueManager() && <MyVenues />}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ProfilePage;
