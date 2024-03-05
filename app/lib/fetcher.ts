const apiUrl = "/api/v1/books";

export const fetcher = (url: string) => fetch(`${apiUrl}${url}`).then((res) => res.json())