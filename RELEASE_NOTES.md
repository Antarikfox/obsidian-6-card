# OBSIDIAN-6 v7.6.0 · by Antarikfox

A six-tube biomechanical Nixie clock for Home Assistant dashboards, with an offline standalone version.

### Highlights

- Seven interface languages: English, Russian, German, Italian, French, Simplified Chinese and Japanese.
- Automatic locale selection from Home Assistant or browser, with a manual override.
- Amber Nixie illumination, adjustable reflections, brightness, date, countdown, stopwatch, and cathode cycling.
- Standalone HTML page works offline with images and JavaScript included.
- Installable Home Assistant dashboard module in `obsidian-6-card.js`.

### Installation

For Home Assistant 2026.11 and later, open **Settings → Marketplace → Add from link** and provide `https://github.com/Antarikfox/obsidian-6-card`. For older Home Assistant versions, add the same URL to HACS as a **Dashboard** custom repository. Install and refresh the browser.

Add a card with:

```yaml
type: custom:obsidian-6-card
language: auto
brightness: 82
```

The release asset **obsidian-6-card.js** is the self-contained JavaScript module used by HACS/Marketplace. The offline HTML edition remains available in `standalone/OBSIDIAN-6.html` in the repository and source archive.

**Author:** by Antarikfox
