import { discord } from '@/site.config'

const AUTH_BASE = 'https://discord.com/oauth2/authorize'

function redirectUri() {
  return window.location.origin + discord.redirectPath
}

// Baut die Authorize-URL und schickt den Nutzer zu Discord.
// Den Code-Tausch (code -> Token) macht später das Backend, nicht der Browser.
export function loginWithDiscord() {
  const state = crypto.randomUUID()
  sessionStorage.setItem('discord_oauth_state', state)

  const params = new URLSearchParams({
    client_id: discord.clientId,
    redirect_uri: redirectUri(),
    response_type: 'code',
    scope: discord.scopes.join(' '),
    state,
    prompt: 'consent',
  })

  window.location.href = `${AUTH_BASE}?${params.toString()}`
}

// Liest ?code & ?state aus der Rückleitung und prüft den State gegen CSRF.
export function readCallback() {
  const url = new URL(window.location.href)
  const code = url.searchParams.get('code')
  const state = url.searchParams.get('state')
  const saved = sessionStorage.getItem('discord_oauth_state')

  if (!code) return { ok: false, reason: 'no-code' }
  if (state && saved && state !== saved) return { ok: false, reason: 'bad-state' }

  return { ok: true, code }
}
