export function getApiBaseUrl() {
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

  if (!baseUrl) {
    throw new Error(
      'NEXT_PUBLIC_API_BASE_URL is not set. Define it in your environment (e.g. .env.local).',
    );
  }

  return baseUrl.replace(/\/$/, '');
}
