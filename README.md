# startsite.ch — Website

Statische Marketing-Website für **startsite.ch** (Websites für KMU, Selbstständige und Startups in der Schweiz). Reines HTML/CSS/JS, keine Build-Tools, GitHub-Pages-kompatibel.

## Projektstruktur

```
index.html          Hauptseite (alle Sections)
impressum.html       Platzhalter-Impressum
datenschutz.html     Platzhalter-Datenschutzerklärung
style.css            Gesamtes Styling
script.js            Nav, Scroll-Reveal, Accordion, Formular
icons/               Einzelne SVG-Icons (auch als Sprite in index.html eingebettet)
images/              Platzhalter-Grafiken (og-image.svg)
```

## Lokal ansehen

Einfach `index.html` im Browser öffnen, oder mit einem lokalen Server (z. B. `npx serve` oder VS-Code "Live Server"), damit relative Pfade sauber laufen.

## Deployment auf GitHub Pages

1. Repository auf GitHub erstellen und dieses Projekt pushen.
2. Im Repo: **Settings → Pages → Source** auf den Branch `main` (Ordner `/root`) stellen.
3. Nach ein paar Minuten ist die Seite unter `https://<username>.github.io/<repo>/` live.
4. Für die eigene Domain `startsite.ch`: eine Datei `CNAME` mit Inhalt `startsite.ch` ins Root-Verzeichnis legen und beim Domain-Provider einen CNAME/ALIAS-Eintrag auf `<username>.github.io` setzen.

## Design-Entscheid: Farbpalette

Für den Showcase-Charakter der Seite wurden drei Paletten evaluiert:

1. **Alpine Momentum** (gewählt) — Indigo/Violett (`#5B3DF6`) als Vertrauens- und Tech-Farbe, kombiniert mit einem elektrischen Lime-Akzent (`#C6FF3D`) für Energie und CTAs, auf warmem Off-White. Wirkt modern, wach und seriös zugleich — passt zu "schnell & professionell ohne Agentur-Chichi".
2. **Swiss Clarity** — Reines Weiss/Anthrazit mit Schweizer Rot als Akzent. Sehr aufgeräumt und vertrauenswürdig, aber weniger "energiegeladen" und nah an vielen bestehenden Schweizer Agentur-Seiten.
3. **Sunset Gradient** — Warmer Verlauf Koralle → Magenta auf Dunkelblau. Sehr auffällig und trendig, aber für die Zielgruppe KMU/Selbstständige potenziell zu "Startup-verspielt" und weniger seriös.

Alpine Momentum wurde umgesetzt, da sie Energie (Lime), Vertrauen (Indigo) und Modernität (Dark-Sections, Glassmorphism) am besten vereint, ohne verspielt zu wirken.

## Placeholder, die vor dem Live-Gang ersetzt werden sollten

- **Texte/Zahlen:** Referenzen-Zitate, Kundenname-Logos, Statistik-Zahlen (`50+`, `Ø 7 Tage` …) sind Platzhalter und sollten durch echte Werte ersetzt werden.
- **Screenshots:** `images/og-image.svg` sowie die drei Mockup-Kacheln in der Referenzen-Section sind gestaltete Platzhalter (kein echter Website-Screenshot). Für Social-Sharing empfiehlt sich zusätzlich eine echte **PNG/JPG-Version** von `og-image.svg` (1200×630px), da nicht alle Plattformen SVG-OG-Bilder zuverlässig rendern.
- **Rechtliches:** `impressum.html` und `datenschutz.html` enthalten Platzhalter in eckigen Klammern (`[...]`) — unbedingt durch echte Firmen-/Kontaktangaben ersetzen und bei Bedarf juristisch prüfen lassen.
- **E-Mail:** Kontaktformular und Footer verweisen auf `hallo@startsite.ch` — Adresse bei Bedarf anpassen.
- **Kontaktformular:** Da die Seite rein statisch ist, öffnet der Formular-Submit aktuell einen `mailto:`-Link. Für ein "echtes" Formular ohne Backend eignet sich später z. B. Formspree, Web3Forms oder ein einfaches Serverless-Function-Setup.

## Performance & SEO

- Keine JS-Frameworks, keine schweren Libraries — nur Vanilla JS mit `IntersectionObserver`.
- Einzige externe Abhängigkeit: Google Fonts (Space Grotesk, Inter) via `preconnect` + `display=swap`.
- Semantisches HTML, Alt-Texte/ARIA-Labels, OpenGraph/Twitter-Card-Tags, `title`/`meta description` mit Bezug auf "Website erstellen Schweiz".
- Vor dem Launch empfiehlt sich ein Lighthouse-Check in Chrome DevTools.
