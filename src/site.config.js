// Zentrale Konfiguration. Alles, was sich öfter ändert, steht hier an einer Stelle.

export const site = {
  name: 'GoldenState',
  tagline: '',

  // Solange wir in der Beta sind, bleibt das auf true.
  // Dann wird statt Spielerzahlen ein "Beta"-Status angezeigt.
  isBeta: true,

  links: {
    discord: 'https://discord.golden-state.tech',
    wiki: 'https://wiki.golden-state.tech',
    // Mastodon ist noch nicht eingerichtet  sobald es steht, hier eintragen,
    // dann erscheinen Events/Changelog automatisch live.
    mastodon: '',
  },
}

// Discord OAuth2 für den Login oben rechts.
// clientId aus dem Discord Developer Portal eintragen, Redirect dort hinterlegen.
export const discord = {
  enabled: true,
  clientId: 'DEINE_CLIENT_ID',
  // Redirect zeigt zurück auf das Panel. In der Entwicklung localhost, live die echte Domain.
  redirectPath: '/panel',
  scopes: ['identify', 'guilds'],
}

// Mastodon-Accounts für Events bzw. Changelog.
// Beispiel: { instance: 'https://social.golden-state.tech', accountId: '109...' }
export const mastodon = {
  events: { instance: '', accountId: '' },
  changelog: { instance: '', accountId: '' },
}
