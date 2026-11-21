![OBSIDIAN-6: six glowing Nixie tubes in a biomechanical case, by Antarikfox](docs/preview.webp)

# OBSIDIAN-6 · by Antarikfox

[Русский](README.ru.md)

A six-tube IN-1 Nixie clock with amber illumination and a static biomechanical case. Available as a Home Assistant dashboard card and a standalone offline HTML file.

## Languages

English, Russian, German, Italian, French, Simplified Chinese and Japanese. **Automatic** uses Home Assistant’s language inside the dashboard and the browser’s preferred language in the standalone page. English is the fallback for unsupported languages. To override it, tap the fox logo or **OBSIDIAN-6**, then select **Display → Language**. The selection is stored in the browser. The artwork and engraved markings are part of the image.

## Standalone

Download [OBSIDIAN-6.html](standalone/OBSIDIAN-6.html) and open it directly in a modern browser. All images and scripts are embedded.

## Home Assistant

### HACS

Add the repository as a custom repository with category **Dashboard**, install **OBSIDIAN-6**, and reload the dashboard. The repository name for this bundle is `obsidian-6-card`. See the [HACS dashboard packaging guide](https://hacs.dev/docs/publish/plugin/).

### Manual installation

Copy [obsidian-6-card.js](dist/obsidian-6-card.js) into `/config/www/`. In **Settings → Dashboards → Resources**, add or replace the module resource with `/local/obsidian-6-card.js?v=7.6.0`. Load one OBSIDIAN-6 resource per dashboard. Reload and add:

```yaml
type: custom:obsidian-6-card
language: auto
brightness: 82
```

Set `language` to `en`, `ru`, `de`, `it`, `fr`, `zh` or `ja` to specify a card language. If several cards share a browser, set a unique `id` for each to keep their preferences separate.

**Power entity** accepts a light, switch or input boolean. **Brightness entity** accepts a dimmable light, number or input number. The 0–100% control maps to the numeric entity’s range, and 0% switches a linked light off.

## Controls

Clock, date, countdown and stopwatch. Glass reflections, textured glow and brightness can be adjusted separately. Cathode protection runs a ten-digit sweep in clock and date modes every 15 minutes while the display is lit. **Cycle cathodes** starts a manual sweep.

## Build

Requires Node.js 22. Run `npm run build` to rebuild both entry points from `src/` and `assets/`. Run `npm test` to verify build freshness, translations and clock logic. No packages need to be installed.

See [the publishing checklist](docs/PUBLISH.ru.md) before the first GitHub release.