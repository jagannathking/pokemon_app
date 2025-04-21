const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

if (!API_BASE_URL) {
  console.error("CRITICAL ERROR: REACT_APP_API_BASE_URL environment variable is not set!");
}

export { API_BASE_URL };