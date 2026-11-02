# dsh-eye-care-theme

**English** | [中文](README.md)

<img src="icon.svg" width="76" height="76" alt="dsh-eye-care-theme icon">

An eye-care theme for the [DeepSeek Harness](https://github.com/deepseek-ai/deepseek-harness) (DSH) Web GUI.

DSH ships three appearances: light, dark, and follow-system. This plugin adds a fourth palette on top of the light structure — a **warm paper** scheme that removes pure-white glare, cuts blue light, and softens accent and status colors, so long sessions of reading chat and code stop stinging. It is a first-class third-party theme registered through `ctx.theme.register`, not a filter layered over the page.

## Features

- **A third appearance**: theme `eye-care`, `colorScheme: light`, expressed as overrides of Harness `--dsw-*` design tokens. Because it recolors the token scales rather than individual components, Settings, the plugin pages, code blocks, menus and diffs all warm up together.
- **Two ways to switch**
  - Settings → General → **Eye care** (right below Appearance): an explicit switch with explanatory copy.
  - Sidebar foot → **eye icon**: one click. The pupil is solid and tinted teal while on, outlined while off; the button resizes for the collapsed 56px rail.
- **Nothing is lost**: the on/off state and the appearance you came from (light / dark / system) live in `localStorage`, so a reload or a new window restores your choice.
- **No fight with the built-in row**: choosing light or dark in Appearance ends eye care immediately, so both entries always agree.
- **Clean disposal**: theme, styles, dictionaries and slot registrations are all held by `ctx.effect`, so removing the plugin restores the original palette without leaving stray tokens.

## Install

This repository is the bundle package root (`dsh.bundle.patch` plus `dsh.client` in `package.json`).

```bash
git clone https://github.com/houguofei/dsh-eye-care-theme
```

Then install the cloned directory as a plugin in DSH — ask the agent to "install `<clone path>` as a plugin", which runs the plugin manager's `install_bundle` against the current profile. Refresh the page once and the switches are there.

> Not published to npm yet. Once it is, `dsh-eye-care-theme` can be installed by package name without cloning.

## Usage

- Click the eye icon at the sidebar foot, or open Settings → General → Eye care.
- Turning eye care off returns you to the appearance you had before (dark stays dark).
- After removing the plugin, the two `localStorage` keys `dsh-eye-care:enabled` and `dsh-eye-care:previous` can be cleared freely.

## Palette

| Role | Token | Built-in light | Eye care |
| --- | --- | --- | --- |
| App background | `--dsw-alias-bg-base` ← `--dsw-static-neutral-bluish-00` | `#ffffff` | `#fbf7ee` |
| Sidebar | `--dsw-specific-sidebar-fill` | `#f9fafb` | `#f5efe2` |
| Module / overlay fill | `--dsw-alias-bg-module-platform` | `#f5f6f7` | `#f1ebdd` |
| Primary text | `--dsw-alias-label-primary` | `#0f1115` | `#23201a` |
| Secondary text | `--dsw-alias-label-secondary` | `#61666b` | `#5e5747` |
| Link / brand accent | `--dsw-static-deepseek-500` | `#4176e6` | `#4a8177` |
| Code block fill | `--dsw-alias-markdown-code-block` | `#f9fafb` | `#f5efe2` |
| Success | `--dsw-alias-state-success-primary` | `#22c55e` | `#4f9a68` |
| Error | `--dsw-alias-state-error-primary` | `#ec1313` | `#bf4b45` |

Harness's alias layer reads almost everything from the `--dsw-static-*` scales, so rewriting those scales (warm neutrals, softened accents, desaturated status colors) recolors the whole app consistently. A handful of hard-coded alias values (menu materials, border alphas, diff fills) and the syntax colors are overridden alongside them, so no cold-gray part is left on a warm ground.

## How it wires in

| Concern | Implementation |
| --- | --- |
| Palette | `ctx.theme.overrideTokens('dsh-eye-care-theme', {…})` — a token layer stacked over the light theme, released with the plugin |
| Settings entry | `settings.general.item`, `id: 'eye-care'`, `order: 10.5` |
| Sidebar entry | `sidebar.footer.action`, `id: 'eye-care'`, `order: 10`, sized by the `wide` owner prop |
| Preference | hosted `Config` (`enabled` / `previous`) plus `settings.configure`, stored in the profile settings document under the `eye-care-theme` namespace and read/written by the browser through `ctx.configForms.get()` |
| Copy | `zh` / `en` dictionaries registered through the Client locale service |

Why a token layer instead of a registered theme id: the built-in theme service only accepts `light` / `dark` / `system` as preferences, so a third-party id never reaches the settings document. As soon as the Host echoes the stored preference back, the client resets to `light`/`dark` and the third-party theme disappears. Stacking a layer over `light` keeps eye care alive through that echo, and the preference itself stays a built-in value that survives a restart.

## Known limitations

- DSH's built-in bootstrap paints the saved light palette before the plugin loads, so the warm tones arrive after one very short transition.
- While eye care is on, picking **light** in Appearance does not turn it off (the base is identical, so the two are indistinguishable) — use the eye-care switch. Picking **dark** or **system (dark)** does turn it off.
- Only design tokens change: hard-coded colors inside components (a few icons, embedded third-party content) keep their own values.
- Eye care is a light scheme; enabling it under a dark preference brightens the window noticeably, which is expected.

## Development

```
client.js         browser half: token table, styles, both slot registrations, layer and Host-switch sync
index.js          host half: Config (enabled / previous) plus settings.configure
cordis.patch.yml  bundle patch: inserts the eye-care-theme row
package.json      bundle manifest (dsh.bundle.patch + dsh.client + schemastery dependency)
locale/           plugin-manager title and description (zh / en)
icon.svg          plugin icon
```

- Dependency: the host half imports `@deepseek-ai/schemastery`; run `pnpm install` (or `npm install`) in this directory after cloning.
- To recolor, edit only the `TOKENS` object at the top of `client.js`: keys are CSS custom property names and values are single CSS values (the plugin turns them into the `{ light, dark }` pairs `overrideTokens` expects).
- Syntax check: `node --check client.js && node --check index.js`.

## License

[MIT](LICENSE)
