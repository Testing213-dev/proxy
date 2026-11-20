export default {
  async fetch(request) {
    const url = new URL(request.url);
    const targetUrl = url.searchParams.get('url');
    
    if (!targetUrl) {
      return new Response("Proxy Ready. Use ?url=...", { 
        headers: { 'Content-Type': 'text/plain' } 
      });
    }

    try {
      const response = await fetch(targetUrl, {
        headers: request.headers,
        body: request.body,
        method: request.method,
      });

      return new Response(response.body, {
        status: response.status,
        headers: {
          ...Object.fromEntries(response.headers),
          "Access-Control-Allow-Origin": "*",
        },
      });
    } catch (error) {
      return new Response("Error", { status: 500 });
    }
  },
};
