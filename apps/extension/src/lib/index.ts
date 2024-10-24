export async function post<T>(route: string, data: T) {
  return await fetch("http://localhost:2099/" + route, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
}
