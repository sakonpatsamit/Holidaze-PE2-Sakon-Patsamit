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
    console.log(json);
    return json;
  } else {
    const error = await request.json();
    console.error(error);
    return null;
  }
}
