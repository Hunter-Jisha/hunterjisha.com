# hunterjisha.com

Portfolio site built as a working iPadOS home screen. Vue 3 + TypeScript + Vite + Tailwind CSS v4.

## Develop

```bash
bun install
bun run dev
```

## Build

```bash
bun run build      # typechecks, then writes static files to dist/
bun run preview    # serve dist/ locally
bun run typecheck  # types only
```

The output in `dist/` is plain static files. Any web server can host it.
The one server requirement is a fallback: unknown paths should serve `index.html`,
since the site is a single page and uses hash links (`/#notes`, `/#projects`) for apps.

## Layout

```
src/
  App.vue                  home screen shell: wallpaper, status bar, dock, app launcher
  apps.ts                  app registry, open-app state, hash routing
  clock.ts                 date and time helpers
  style.css                Tailwind entry, fonts, and the liquid glass classes
  components/
    AppIcon.vue            squircle icon with the iOS press and hover behaviour
    AppWindow.vue          full-screen app frame with the home indicator
    StatusBar.vue          time, Wi-Fi, battery
    AlertDialog.vue        iOS alert sheet
    widgets/               clock, up next, news
    apps/                  Projects, Notes, Find Me, Experience, Chipotle
scripts/
  update-chipotles.ts      refreshes the Chipotle store list
public/
  data/chipotles.json      every US Chipotle as [lat, lon, address]
  icons/                   app icons
  media/                   wallpaper, logos, photos
  fonts/                   SF Pro and New York, as woff2
```

## Liquid glass

`.glass` and `.glass-dark` in `src/style.css` are the whole system. Each stacks three
layers: the element blurs and brightens what sits behind it, `::before` paints a
specular rim, and `::after` adds an interior sheen. Use `.glass` over light
backgrounds and `.glass-dark` over photos.

## Adding an app

1. Add an entry to `apps` in `src/apps.ts`. Give it an `href` to open a link, or leave
   `href` off to open a full-screen app.
2. For a full-screen app, add a component under `src/components/apps/` that wraps its
   content in `<AppWindow>`, then register it in the `screens` map in `src/App.vue`.

## Chipotle compass

The Chipotle app points an arrow at the nearest US Chipotle and shows the distance.
Everything runs in the browser: it reads the phone's location and compass, then
searches `public/data/chipotles.json` for the closest store.

The store list comes from [All The Places](https://www.alltheplaces.xyz/), an open
dataset that scrapes store finders weekly and is released under CC-0. To refresh it:

```bash
bun run update-chipotles
```

Location only works over HTTPS. iPhones ask for compass access after the user taps
the start button. Devices with no compass, like laptops, show the arrow with north up.

## Assets

App icons are the current Apple icons, pulled from the iTunes Search API at 1024px and
saved as 512px WebP. Cubify and Comet Chess use their own logos.

The wallpaper is the official iPadOS 27 "Celosia" light wallpaper. Apple ships it
portrait only, so the landscape version is rotated and cropped to 16:10; phones get
Apple's original portrait orientation.

Fonts are SF Pro Text and SF Pro Display, subset to Latin and shipped as woff2. Four
weights each: regular, medium, semibold, bold.
