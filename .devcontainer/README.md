# Codespaces / DDEV

A plain Codespace does **not** include Docker or the `ddev` command — the
`.ddev/` folder only holds project config. This devcontainer fixes that: it
installs Docker-in-Docker + DDEV and brings the project up automatically.

## What happens automatically
When the Codespace is created, `devcontainer.json` runs:

1. install DDEV (`curl -fsSL https://ddev.com/install.sh | bash`)
2. `ddev start`
3. `ddev composer install`
4. `ddev npm install`

On every resume it runs `ddev start` again.

## First-run Craft setup (manual, one time)
The database starts empty, so after the container is ready:

```bash
# Generate the app id + security key into .env (if not present yet)
ddev craft setup/app-id
ddev craft setup/security-key

# Install Craft (creates the DB tables + an admin account — interactive)
ddev craft install

# Apply the committed project config (sections, fields, etc.)
ddev craft up
```

## Running the front-end
```bash
ddev npm run watch      # Vite dev server (HMR)
# or a one-off production build:
ddev npm run build
```

Open the site via the forwarded port that DDEV prints (`ddev describe` shows the
URL). The Craft control panel is at `/admin`.

## Notes
- `gsap` (paid GreenSock) was removed, so `npm install` needs no private token.
- If `ddev` is still not found in an existing Codespace, rebuild the container:
  Command Palette → **Codespaces: Rebuild Container**.
- This is a dev/preview environment. Craft can't run on GitHub Pages (static
  only); production needs a real PHP + database host.
