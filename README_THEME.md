# WAA Studio Theme Kit (Board_6 baseline)

## Files
- `styles/tokens.css` : design tokens (light + dark via `html.dark` or `[data-theme="dark"]`)
- `styles/base.css`   : base styles + tailwind layers (import this from your app entry)
- `tailwind.config.ts`: tailwind config wired to CSS variables
- `.gitignore`        : repo ignore baseline
- `AGENTS.md`         : git + agent workflow rules

## How to use in Next (apps/studio-web)
1) Ensure Tailwind build is configured (PostCSS etc.)
2) Import base css in your app entry (e.g. `apps/studio-web/app/globals.css`):
```css
@import "../../styles/base.css";
```
(or copy `styles/` into `apps/studio-web/styles` and adjust path)

3) Dark mode toggle:
- add/remove `dark` class on `<html>` or set `data-theme="dark"`.

## Notes
This kit is derived from Stitch board_6 tokens (blue, compact, less-rounded).
