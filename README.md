# Chat Cipher

A browser-based encoder/decoder using a custom substitution + reversal cipher.

## Structure
```
chat-cipher/
├── index.html      # markup / structure (what elements exist)
├── css/
│   └── style.css   # visual styling (dark, terminal theme)
├── js/
│   └── script.js   # cipher logic + button behavior
└── README.md
```

## Cipher rule
1. Z→5, E→9, K→7, Y→3, S→4 (fixed swaps, checked first)
2. Every other letter swaps with its `26 − position` mirror (B↔X, C↔W, D↔V…)
3. The whole message is reversed

Decrypt runs the same steps backwards.

## Run it locally
Just open `index.html` in a browser — no build step, no install, no server needed.

## No backend
This app has no backend by design: there's nothing to store and nothing sensitive
enough to need a server doing the work. All logic runs in the visitor's browser
via JavaScript. That's *why* it can be hosted for free as static files (see below)
instead of needing a server you pay to keep running.
