# Compass UI

Mattermost plugin that showcases live [`@mattermost/compass-ui`](https://www.npmjs.com/package/@mattermost/compass-ui) components in the right-hand sidebar.

Repository: [https://github.com/matthewbirtch/compass-ui-plugin](https://github.com/matthewbirtch/compass-ui-plugin)

Open the RHS from the channel header palette button or the App Bar icon. Search the component list (grouped by category), then open a row to see live variants.

This plugin bundles the published npm package (`@mattermost/compass-ui@0.1.0-alpha.5`). It does not resolve Compass UI from the Mattermost webapp or from a local `file:` link.

## Requirements

- Node 16+ (see `.nvmrc`) and npm 8+
- Go 1.25+ (for the server binary)

## Build

```bash
make
```

This produces `dist/com.mattermost.compass-ui.tar.gz` for upload to a Mattermost server.

## Deploy (local)

Enable plugin uploads, then:

```bash
export MM_SERVICESETTINGS_SITEURL=http://localhost:8065
export MM_ADMIN_TOKEN=<token>
make deploy
```

Watch the webapp and redeploy on change:

```bash
make watch
```

## Webapp notes

- Styles: import `@mattermost/compass-ui/styles` and `@mattermost/compass-ui/component-styles` once at plugin entry. Do not import `/styles/standalone` — Mattermost already owns theme, reset, and document styles.
- Components: import from `@mattermost/compass-ui/components/<kebab-name>` subpaths, not the root barrel.
- Peers installed in this plugin: `@mattermost/compass-icons`, `simplebar-react`, `react-dom`.
