const { app, BrowserWindow, BrowserView, ipcMain } = require("electron");
const url = require("url");
const path = require("path");

let mainWindow;

function createWindow() {
  // 创建主窗口
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      webSecurity: false,
      preload: __dirname + "/preload.js",
      backgroundThrottling: false,
      sandbox: false,
      contextIsolation: false,
      nodeIntegration: false,
    },
  });

  let viewList = [];
  mainWindow.webContents.on("destroyed", () => {
    console.log("mainWindow destroyed");
  });
  mainWindow.loadFile("index.html");

  const viewUrl = url.format({
    pathname: path.join(__dirname, "view.html"),
    protocol: "file:",
    slashes: true,
  });
  console.log("🚀 ~ file: main.js:43 ~ setTimeout ~ viewUrl:", viewUrl);

  const browserView = new BrowserView({
    webPreferences: {
      webSecurity: false,
      sandbox: false,
      contextIsolation: false,
      backgroundThrottling: false,
    },
  });
  browserView.setBounds({ x: 0, y: 100, width: 400, height: 600 });
  browserView.webContents.loadURL(viewUrl);
  mainWindow.addBrowserView(browserView);
  // setTimeout(() => {
  //   handleClose();
  // }, 6000)
  browserView.webContents.on("did-navigate", (event, url) => {
    console.log("view navigate", browserView.webContents.getOSProcessId(), url);
    setTimeout(() => {
      handleClose();
    }, 1000);
  });
  function handleClose() {
    console.log("mainWindow destroyed");
    viewList.forEach((view) => {
      view?.webContents?.destroy();
    });
    console.log("handleClose");
    mainWindow.destroy();
  }
}

app.whenReady().then(createWindow);

// 在所有窗口都关闭时退出应用
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    console.log("quit before");
    app.quit();
    console.log("quit after");
  }
});

app.on("activate", () => {
  if (mainWindow === null) createWindow();
});
