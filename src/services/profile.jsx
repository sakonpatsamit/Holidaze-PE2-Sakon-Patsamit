import { getUser } from "./auth";

export const BASE_URL = "https://api.noroff.dev/api/v1/holidaze";

export async function getMyProfile() {
  const user = getUser();
  if (!user || !user.token) return null;

  const endpoint = `${BASE_URL}/profiles/${user.name}`;

  const headers = new Headers();
  headers.append("Content-Type", "application/json");
  headers.append("Authorization", `Bearer ${user.token}`);

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

export async function getMyVenues() {
  const user = getUser();

  if (!user || !user.venueManager) return null;

  const endpoint = `${BASE_URL}/profiles/${user.name}/venues?_bookings=true`;

  const headers = new Headers();
  headers.append("Content-Type", "application/json");
  headers.append("Authorization", `Bearer ${user.token}`);

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

export async function editAvatar(imageUrl) {
  const user = getUser();
  if (!user || !user.token) return { success: false, reason: "Unauthorized" };

  const endpoint = `${BASE_URL}/profiles/${user.name}/media`;

  const headers = new Headers();
  headers.append("Content-Type", "application/json");
  headers.append("Authorization", `Bearer ${user.token}`);

  const request = await fetch(endpoint, {
    method: "PUT",
    headers: headers,
    body: JSON.stringify({
      avatar: imageUrl,
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
