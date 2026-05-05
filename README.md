# DSC 152 — Companion Study Guide

Interactive, gamified study companion for UCSD DSC 152 (Spring 2026).

**Live:** https://bigmacchung.github.io/dsc152-spr26-tutor/DSC152-companion.html

## What's here

- `DSC152-companion.html` — single-file build artifact, served by GitHub Pages
- `modular-src/` — maintainable source (styles, scripts, content fragments) used to build the companion HTML. See `modular-src/README.md` for the build workflow.
- `index.html` — landing/index for the GitHub Pages site
- `lab2-companion.html`, `uber-apm-bridge.html` — additional standalone pages
- `DSC152_Lec3.txt`, `DSC152_Lec4.txt` — lecture transcripts kept alongside the source

## Build the single-file artifact

```sh
cd modular-src
bash build.sh
# → writes ../DSC152-companion.html
```

## Notes

Lecture PDFs and audio recordings are kept locally outside this repo (see
`.gitignore`). Course materials live in the parent `DSC152/` folder under
`lectures/`, `audio/`, and `labs/`.
