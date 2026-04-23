// api/callback.js
export default async function handler(req, res) {
  const { code } = req.query;

  if (!code) {
    return res.status(400).json({ error: 'Missing authorization code' });
  }

  const clientId = process.env.WHOOP_CLIENT_ID;
  const clientSecret = process.env.WHOOP_CLIENT_SECRET;
  const redirectUri = process.env.WHOOP_REDIRECT_URI;
  const dashboardUrl = process.env.DASHBOARD_URL;

  try {
    const tokenRes = await fetch('https://api.prod.whoop.com/oauth/oauth2/token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        grant_type: 'authorization_code',
        code,
        client_id: clientId,
        client_secret: clientSecret,
        redirect_uri: redirectUri,
      }),
    });

    const raw = await tokenRes.text();

    if (!tokenRes.ok) {
      return res.status(500).json({ 
        error: 'Token exchange failed', 
        status: tokenRes.status,
        detail: raw,
        redirect_uri_used: redirectUri,
      });
    }

    const { access_token } = JSON.parse(raw);
    res.redirect(`${dashboardUrl}?access_token=${access_token}`);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
