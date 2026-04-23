// api/auth.js
export default function handler(req, res) {
  const clientId = process.env.WHOOP_CLIENT_ID;
  const redirectUri = process.env.WHOOP_REDIRECT_URI;

  // Debug mode - add ?debug=1 to see what's being sent
  if (req.query.debug) {
    return res.status(200).json({ clientId: clientId ? 'set' : 'MISSING', redirectUri });
  }

  if (!clientId || !redirectUri) {
    return res.status(500).json({ error: 'Missing environment variables', clientId: !!clientId, redirectUri: !!redirectUri });
  }

  const state = Math.random().toString(36).substring(2, 18);

  const params = new URLSearchParams({
    client_id: clientId,
    redirect_uri: redirectUri,
    response_type: 'code',
    scope: 'read:recovery read:sleep read:workout read:body_measurement',
    state: state,
  });

  res.redirect(`https://api.prod.whoop.com/oauth/oauth2/auth?${params}`);
}
