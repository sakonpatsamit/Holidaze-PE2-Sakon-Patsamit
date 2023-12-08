import { getUser } from "./auth";

export const BASE_URL = "https://api.noroff.dev/api/v1/holidaze";

export async function getVenues() {
  const endpoint = BASE_URL + "/venues";

  const headers = new Headers();
  headers.append("Content-Type", "application/json");

  const request = await fetch(endpoint, {
    method: "GET",
    headers: headers,
  });

  if (request.ok) {
    const json = await request.json();
    console.log(json);
    return json;
  } else {
    const error = await request.json();
    console.error(error);
    return null;
  }
}

export async function getVenue(id) {
  console.log(id);
  const endpoint = `${BASE_URL}/venues/${id}?_bookings=true`;

  const headers = new Headers();
  headers.append("Content-Type", "application/json");

  const request = await fetch(endpoint, {
    method: "GET",
    headers: headers,
  });

  if (request.ok) {
    const json = await request.json();
    return json;
  } else {
    const error = await request.json();
    return null;
  }
}

export async function createVenue(
  name,
  description,
  imageUrl,
  price,
  maxGuests,
  rating,
  wifi,
  parking,
  breakfast,
  pets,
  city,
  country
) {
  const user = getUser();
  if (!user || !user.token) return { success: false, reason: "Unauthorized" };

  const endpoint = `${BASE_URL}/venues`;

  const headers = new Headers();
  headers.append("Content-Type", "application/json");
  headers.append("Authorization", `Bearer ${user.token}`);

  const request = await fetch(endpoint, {
    method: "POST",
    headers: headers,
    body: JSON.stringify({
      name: name, // Required
      description: description, // Required
      media: imageUrl ? [imageUrl] : [],
      price: price, // Required
      maxGuests: parseInt(maxGuests), // Required
      rating: rating, // Optional (default: 0)
      meta: {
        wifi: wifi, // Optional (default: false)
        parking: parking, // Optional (default: false)
        breakfast: breakfast, // Optional (default: false)
        pets: pets, // Optional (default: false)
      },
      location: {
        city: city, // Optional (default: "Unknown")
        country: country, // Optional (default: "Unknown")
      },
    }),
  });

  if (request.ok) {
    const json = await request.json();
    return json;
  } else {
    const error = await request.json();
    return error;
  }
}

export async function editVenue(
  venueId,
  name,
  description,
  imageUrl,
  price,
  maxGuests,
  rating,
  wifi,
  parking,
  breakfast,
  pets,
  city,
  country
) {
  const user = getUser();
  if (!user || !user.token) return { success: false, reason: "Unauthorized" };

  const endpoint = `${BASE_URL}/venues/${venueId}`;

  const headers = new Headers();
  headers.append("Content-Type", "application/json");
  headers.append("Authorization", `Bearer ${user.token}`);

  const request = await fetch(endpoint, {
    method: "PUT",
    headers: headers,
    body: JSON.stringify({
      name: name, // Required
      description: description, // Required
      media: imageUrl ? [imageUrl] : [],
      price: price, // Required
      maxGuests: parseInt(maxGuests), // Required
      rating: rating, // Optional (default: 0)
      meta: {
        wifi: wifi, // Optional (default: false)
        parking: parking, // Optional (default: false)
        breakfast: breakfast, // Optional (default: false)
        pets: pets, // Optional (default: false)
      },
      location: {
        city: city, // Optional (default: "Unknown")
        country: country, // Optional (default: "Unknown")
      },
    }),
  });

  if (request.ok) {
    const json = await request.json();
    return json;
  } else {
    const error = await request.json();
    return error;
  }
}

export async function deleteVenue(venueId) {
  const user = getUser();
  if (!user || !user.token) return { success: false, reason: "Unauthorized" };

  const endpoint = `${BASE_URL}/venues/${venueId}`;

  const headers = new Headers();
  headers.append("Content-Type", "application/json");
  headers.append("Authorization", `Bearer ${user.token}`);

  const request = await fetch(endpoint, {
    method: "DELETE",
    headers: headers,
  });
  console.log(venueId);

  if (request.ok) {
    window.location.reload();

    return null;
  } else {
    try {
      const error = await request.json();
      return error;
    } catch (error) {
      console.error("Error parsing JSON error response:", error);
      return { success: false, reason: "JSON parsing error" };
    }
  }
}
