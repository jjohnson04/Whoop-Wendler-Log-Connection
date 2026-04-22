// api/auth.js
// Vercel serverless function — redirects user to WHOOP OAuth login

export default function handler(req, res) {
  const clientId = process.env.WHOOP_CLIENT_ID;
  const redirectUri = process.env.WHOOP_REDIRECT_URI;

  if (!clientId || !redirectUri) {
    return res.status(500).json({ error: 'Missing environment variables' });
  }

  const params = new URLSearchParams({
    client_id: clientId,
    redirect_uri: redirectUri,
    response_type: 'code',
    scope: 'read:recovery read:sleep read:workout read:body_measurement',
  });

  res.redirect(`https://api.prod.whoop.com/oauth/oauth2/auth?${params}`);
}
