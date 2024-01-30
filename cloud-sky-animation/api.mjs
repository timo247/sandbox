export const apiUrl = 'http://127.0.0.1:8000/api';

export async function fetchData(url, token) {
  const resp = await fetch(url);
  const txt = await resp.text;
  const data = JSON.parse(txt);
  return data;
}

export async function getToken() {}
