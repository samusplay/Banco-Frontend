import { BACKEND_URL } from "../config/config";

type FetchOptions = {
  method?: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
  body?: unknown;
  cache?: RequestCache;
  headers?: Record<string, string>;
  baseUrl?: string;
};

// Agregamos un genérico <T> para que el retorno sea tipado
export async function apiClient<T>(endpoint: string, options: FetchOptions = {}): Promise<T> {
  const url = `${options.baseUrl || BACKEND_URL}${endpoint}`;
  const isFormData = options.body instanceof FormData;

  const config: RequestInit = {
    method: options.method || "GET",
    headers: {
      // Vital para que Laravel siempre responda JSON
      "Accept": "application/json", 
      ...(isFormData ? {} : { "Content-Type": "application/json" }),
      ...(options.headers || {}),
    },
    cache: options.cache || "no-store",
  };

  if (options.body) {
    config.body = isFormData
      ? (options.body as BodyInit)
      : typeof options.body === "string"
      ? options.body
      : JSON.stringify(options.body);
  }

  const response = await fetch(url, config);

  if (!response.ok) {
    let errorMessage = `Error ${response.status}: Algo salió mal`;

    try {
      const errorData = await response.json();
      // Laravel usa 'message' o 'errors'. Si hay validaciones, 'errors' es un objeto.
      errorMessage = errorData.message || errorData.detail || errorMessage;
      
      // Si quieres ser ultra pro, podrías mapear errorData.errors aquí
    } catch {
      // Fallback si la respuesta no es JSON
    }

    throw new Error(errorMessage);
  }

  return response.json() as Promise<T>;
}