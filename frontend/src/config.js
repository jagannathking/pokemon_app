const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

if (!API_BASE_URL) {
  console.error("CRITICAL ERROR: VITE_API_BASE_URL environment variable is not set! Check .env file and restart server.");
}

console.log("Using API Base URL:", API_BASE_URL);

export { API_BASE_URL };