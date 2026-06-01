// Unternehmensregister.
//
// "status": 'aktiv' | 'rekrutiert' | 'geschlossen'
// "type":   'behörde' | 'gewerbe' | 'gastro' | 'sonstige'

export const companies = [
//   {
//     slug: 'lspd',
//     name: 'Los Santos Police Department',
//     short: 'LSPD',
//     type: 'behörde',
//     status: 'rekrutiert',
//     tagline: 'Schutz und Ordnung für ganz Los Santos.',
//     leadership: 'Chief of Police',
//     content: `
// ## Über das LSPD

// Das **Los Santos Police Department** ist die größte Strafverfolgungsbehörde der Stadt.
// Vom Streifendienst in Mission Row bis zu spezialisierten Einheiten sorgt das LSPD
// rund um die Uhr für Sicherheit  auf der Straße, im Hafen und in den Hügeln von Vinewood.

// ## Aufgabenbereiche

// - Streifendienst & Notrufannahme
// - Verkehrsüberwachung und Unfallaufnahme
// - Kriminalpolizei und Ermittlungen
// - Spezialeinheiten (SWAT, Air Support)

// ## Bewerbung

// Wir suchen Charaktere, die Roleplay ernst nehmen und faires, deeskalierendes
// Spiel schätzen. Eine Bewerbung läuft über unseren Discord. Voraussetzungen:

// - Mindestalter laut Regelwerk
// - Sauberes Führungszeugnis (IC)
// - Bereitschaft zu Schulungen

// > "Wir messen uns nicht an Festnahmen, sondern an Geschichten."  Ausbildungsleitung

// [Zum Bewerbungsformular](https://discord.gg/goldenstate)
// `,
//   },
//   {
//     slug: 'lsmd',
//     name: 'Los Santos Medical Department',
//     short: 'LSMD',
//     type: 'behörde',
//     status: 'rekrutiert',
//     tagline: 'Wenn jede Sekunde zählt.',
//     leadership: 'Ärztliche Leitung',
//     content: `
// ## Über das LSMD

// Das **Los Santos Medical Department** ist der medizinische Rettungsdienst der Stadt.
// Vom Notarzteinsatz auf dem Highway bis zur Versorgung im Pillbox Hill Medical Center 
// das LSMD ist da, wenn es darauf ankommt.

// ## Bereiche

// - Rettungsdienst & Notfallmedizin
// - Krankenhausbetrieb
// - Psychologische Betreuung
// - Aus- und Weiterbildung neuer Sanitäter

// ## Mitmachen

// Du musst kein Medizinstudium haben  nur Lust auf intensives, hilfsbereites Roleplay.
// Wir bilden dich IC aus. Quereinsteiger sind ausdrücklich willkommen.

// - Teamplay statt Heldentum
// - Ruhe bewahren unter Druck
// - Spaß an Charakterspiel

// [Zum Discord](https://discord.gg/goldenstate)
// `,
//   },
]

export function findCompany(slug) {
  return companies.find((c) => c.slug === slug)
}
