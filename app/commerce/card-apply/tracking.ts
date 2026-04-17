declare global {
  // eslint-disable-next-line no-var
  var fbq: ((...args: unknown[]) => void) | undefined;
  // eslint-disable-next-line no-var
  var gtag: ((...args: unknown[]) => void) | undefined;
}

export function getUtmParams() {
  const params = new URLSearchParams(typeof window !== 'undefined' ? window.location.search : '');
  return {
    utm_source: params.get("utm_source") || "",
    utm_medium: params.get("utm_medium") || "",
    utm_campaign: params.get("utm_campaign") || "",
    utm_content: params.get("utm_content") || "",
    utm_term: params.get("utm_term") || "",
  };
}

export function trackEvent(eventName: string, data: Record<string, string> = {}) {
  const payload = { event: eventName, ...data, ...getUtmParams(), timestamp: new Date().toISOString() };
  console.log("[track]", payload);

  if (typeof fbq === "function") {
    fbq("trackCustom", eventName, payload);
  }

  if (typeof gtag === "function") {
    gtag("event", eventName, payload);
  }
}

export function buildCtaUrl(baseUrl: string) {
  const utm = getUtmParams();
  const params = new URLSearchParams();
  Object.entries(utm).forEach(([k, v]) => { if (v) params.set(k, v); });
  const qs = params.toString();
  return qs ? `${baseUrl}?${qs}` : baseUrl;
}
