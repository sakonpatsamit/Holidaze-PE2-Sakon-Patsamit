import React, { useState } from "react";
import Swal from "sweetalert2";

export const validateVenueFormData = (formData) => {
  const {
    venueName,
    address,
    city,
    zipCode,
    country,
    continent,
    imageUrl,
    maxGuests,
  } = formData;

  if (
    !venueName ||
    !address ||
    !city ||
    !zipCode ||
    !country ||
    !continent ||
    !imageUrl
  ) {
    Swal.fire({
      title: "Missing Information",
      text: "Please fill out all fields.",
      icon: "warning",
      confirmButtonText: "OK",
    });
    return false;
  }

  if (isNaN(maxGuests) || maxGuests === "") {
    Swal.fire({
      title: "Invalid Input",
      text: "Please enter a valid number for Max Guests.",
      icon: "error",
      confirmButtonText: "OK",
    });
    return false;
  }

  return true;
};
