import { getUser } from "./auth";

export const BASE_URL = "https://api.noroff.dev/api/v1/holidaze";
const API_BOOKING = "/bookings";

export async function createBooking({ dateFrom, dateTo, guests, venueId }) {
  const user = getUser();
  if (!user) return { success: false, reason: "Unauthorized" };

  const endpoint = `${BASE_URL}${API_BOOKING}`;

  const headers = new Headers();
  headers.append("Content-Type", "application/json");
  headers.append("Authorization", `Bearer ${user.token}`);

  const request = await fetch(endpoint, {
    method: "POST",
    headers: headers,
    body: JSON.stringify({
      dateFrom: dateFrom,
      dateTo: dateTo,
      guests: guests,
      venueId: venueId,
    }),
  });

  if (request.ok) {
    const json = await request.json();
    console.log(json);
    return { success: true, booking: json };
  } else {
    const error = await request.json();
    console.error(error);
    return { success: false, reason: error };
  }
}
