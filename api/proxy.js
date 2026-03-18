export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Authorization, Accept, Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const { url } = req.query;
  if (!url) return res.status(400).json({ error: 'Missing url param' });

  const targetUrl = decodeURIComponent(url);
  const authHeader = req.headers['authorization'] || '';

  try {
    const fetchRes = await fetch(targetUrl, {
      headers: {
        'Authorization': authHeader,
        'Accept': 'application/vnd.api+json'
      }
    });
    const data = await fetchRes.json();
    return res.status(fetchRes.status).json(data);
  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
}
