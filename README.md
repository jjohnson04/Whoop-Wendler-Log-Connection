# WHOOP × Wendler Dashboard

Personal dashboard overlaying WHOOP recovery data with Wendler 5/3/1 lift history.

## Stack
- **Frontend**: Vanilla HTML/CSS/JS — hosted on GitHub Pages
- **Backend**: Vercel serverless functions — handles WHOOP OAuth securely

---

## Setup

### 1. Deploy backend to Vercel

1. Go to [vercel.com](https://vercel.com) and sign up with your GitHub account
2. Click "Add New Project" and import this repo
3. Add the following **Environment Variables** in Vercel's project settings:

| Variable | Value |
|---|---|
| `WHOOP_CLIENT_ID` | Your WHOOP app client ID |
| `WHOOP_CLIENT_SECRET` | Your WHOOP app client secret |
| `WHOOP_REDIRECT_URI` | `https://your-vercel-app.vercel.app/api/callback` |
| `DASHBOARD_URL` | `https://jjohnson04.github.io/Whoop-Wendler-Log-Connection` |

4. Deploy — Vercel will give you a URL like `https://your-vercel-app.vercel.app`

### 2. Update the frontend config

In `index.html`, find this line near the bottom:

```js
const API_BASE = 'https://your-vercel-app.vercel.app/api';
```

Replace it with your actual Vercel URL.

### 3. Update WHOOP developer settings

In your WHOOP developer app settings, set:
- **Redirect URI**: `https://your-vercel-app.vercel.app/api/callback`
- **Privacy Policy URL**: `https://jjohnson04.github.io/Whoop-Wendler-Log-Connection/PRIVACY`

### 4. Enable GitHub Pages

In your repo Settings → Pages → Deploy from branch → `main`

Your dashboard will be live at:
`https://jjohnson04.github.io/Whoop-Wendler-Log-Connection`

---

## Usage

1. Open the dashboard in your browser
2. Click **Connect WHOOP** — log in with your WHOOP account
3. Export your lift history from the Vandersoft Wendler app as CSV
4. Upload the CSV to the dashboard
5. Your recovery scores appear alongside your lift history

---

## Privacy

All lift data stays in your browser session. WHOOP tokens are never stored server-side. See [PRIVACY.md](PRIVACY.md).
