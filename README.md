# Electron Stale Renderer Process on Quit

Issue link: [https://github.com/electron/electron/issues/40921](https://github.com/electron/electron/issues/40921)

## How to Start

```bash
pnpm i
npm start
```
After BrowserWindow opens, it will auto-close after 1 second, and then a stale renderer process will appear.

## Steps to Reproduce
1. Open a BrowserWindow
2. Attach a BrowserView to the BrowserWindow
3. Add an iframe in the BrowserView, and let the iframe block the process
4. Once the BrowserView page is displayed, after 1 second, instantly close the window and exit the program. A stale renderer process will appear.