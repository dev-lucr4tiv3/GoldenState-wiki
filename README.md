# GoldenState

Website für das GTA-V Roleplay-Projekt **GoldenState**. Gebaut mit Vue 3, Vite und
Tailwind CSS.

Soll später auf domain https://golden-state.tech laufen und ist jetzt auf der website

[githubpages](https://tiltann.github.io/GoldenState/) website erreichbar

## Lokal starten

```bash
npm install
npm run dev
```

Build erstellen:

```bash
npm run build      # Ergebnis liegt in dist/
npm run preview    # Build lokal testen
```


## Struktur

```
src/
  site.config.js        zentrale Einstellungen
  data/                 Inhalte zum Pflegen
    characters.js       Charaktere
    companies.js        Unternehmensregister
    streams.js          Streamer
    changelog.js        Versionsverlauf
  pages/                die einzelnen Seiten
  components/           Header, Footer, Video-Hintergrund usw.
  lib/discord.js        Discord-OAuth-Login
public/media/           Trailer 
src/assets/logo.png     Logo
```

## Inhalte ändern

**Unternehmen hinzufügen**  `src/data/companies.js`. 

**Charakter hinzufügen**  `src/data/characters.js` 

**Streamer**  `src/data/streams.js`.

## Hinweise
- Kein offizielles Rockstar-Games-Produkt. Fan-Projekt. 
- Impressum ist noch nicht fertig, und Website ist auch noch nicht **öffentlich** dies ist nur eine Develeopement umgebung.

