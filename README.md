# Oscillascura GitHub Pages Starter

A static terminal-style website for the Oscillascura Post-Humanian Ascent Archive.

## Files

- `index.html` contains the page structure.
- `styles.css` controls the terminal and illuminated-manuscript appearance.
- `script.js` contains the terminal commands and album story.
- `assets/illuminated-manuscript.png` is the visual manuscript blueprint.

## Publish with GitHub Pages

1. Create a new public GitHub repository.
2. For a main account website, name it `YOUR-USERNAME.github.io`.
3. Upload all files from this folder to the repository root.
4. Open **Settings → Pages**.
5. Under **Build and deployment**, choose **Deploy from a branch**.
6. Select the `main` branch and `/ (root)`, then save.
7. Visit `https://YOUR-USERNAME.github.io`.

## First edits

### Bandcamp link

Open `script.js`, find:

```js
window.open("https://bandcamp.com", "_blank", "noopener,noreferrer");
```

Replace the URL with your Oscillascura Bandcamp page.

### Visible commands

The `commands` object in `script.js` contains:

- `help`
- `archive`
- `rituals`
- `music`
- `transmissions`
- `manuscript`
- `clear`

Hidden commands currently include:

- `override`
- `killcode`
- `vvampire`

### Colors

Edit the CSS variables at the top of `styles.css`.

## Local preview

Double-click `index.html`, or run a simple local server from this folder:

```bash
python3 -m http.server 8000
```

Then visit `http://localhost:8000`.


## Code-layout archive update

This version replaces the parchment manuscript display with a terminal-style two-column system dossier.
