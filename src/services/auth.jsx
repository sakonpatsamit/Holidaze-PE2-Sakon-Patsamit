export const BASE_URL = "https://api.noroff.dev/api/v1/holidaze";
export const API_AUTH = "/auth";

export function setUser(user) {
  if (!user) localStorage.removeItem("user");
  else localStorage.setItem("user", JSON.stringify(user));
}

export function getUser() {
  return JSON.parse(localStorage.getItem("user"));
}

export function isLoggedIn() {
  const user = getUser();
  return user && user.token ? true : false;
}

export function isVenueManager() {
  const user = getUser();
  return user && user.token && user.venueManager ? true : false;
}

export async function registerUser(
  name,
  email,
  password,
  avatarUrl,
  isVenueManager
) {
  const endpoint = BASE_URL + API_AUTH + "/register";

  const headers = new Headers();
  headers.append("Content-Type", "application/json");

  const body = JSON.stringify({
    name: name,
    email: email,
    password: password,
    avatar: avatarUrl,
    venueManager: isVenueManager,
  });

  const request = await fetch(endpoint, {
    method: "POST",
    headers: headers,
    body: body,
  });

  if (request.ok) {
    const json = await request.json();
    console.log(json);
    return json;
  } else {
    console.error(request.status, request.statusText);
    console.error(await request.json());
    return null;
  }
}

export async function login(email, password) {
  const endpoint = BASE_URL + API_AUTH + "/login";

  const headers = new Headers();
  headers.append("Content-Type", "application/json");

  const body = JSON.stringify({
    email: email,
    password: password,
  });

  const request = await fetch(endpoint, {
    method: "POST",
    headers: headers,
    body: body,
  });

  if (request.ok) {
    const json = await request.json();
    setUser({
      name: json.name,
      token: json.accessToken,
      venueManager: json.venueManager,
    });

    return json;
  } else {
    console.error(request.status, request.statusText);
    console.error(await request.json());
    return null;
  }
}

export function logout() {
  setUser(null);
}
