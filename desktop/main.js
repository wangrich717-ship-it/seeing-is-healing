// Electron main process
// 启动一个本地 HTTP server 提供 web/out/ 静态文件，
// 然后让窗口加载 http://127.0.0.1:<port>/ —— 这样 Next.js 静态导出里的
// 绝对路径（/_next/static/...、/decks/... 等）才能正确解析。

const { app, BrowserWindow, shell, Menu } = require('electron');
const http = require('http');
const path = require('path');
const handler = require('serve-handler');

let mainWindow = null;
let serverInstance = null;

/**
 * 解析打包后的 web/out 目录路径。
 * - 开发模式：相对仓库根目录的 web/out
 * - 生产模式（已打包）：electron-builder 把 web/out 复制到 process.resourcesPath/web
 */
function getWebRoot() {
  if (app.isPackaged) {
    return path.join(process.resourcesPath, 'web');
  }
  return path.join(__dirname, '..', 'web', 'out');
}

function startStaticServer(rootDir) {
  return new Promise((resolve, reject) => {
    const server = http.createServer((req, res) => {
      return handler(req, res, {
        public: rootDir,
        cleanUrls: true,
        // 找不到时回退到 404.html（Next.js 静态导出生成的）
        rewrites: [{ source: '**', destination: '/index.html' }],
      }).catch((err) => {
        res.statusCode = 500;
        res.end(String(err));
      });
    });

    server.on('error', reject);
    server.listen(0, '127.0.0.1', () => {
      const { port } = server.address();
      resolve({ server, port });
    });
  });
}

async function createWindow() {
  const webRoot = getWebRoot();
  const { server, port } = await startStaticServer(webRoot);
  serverInstance = server;

  mainWindow = new BrowserWindow({
    width: 1280,
    height: 820,
    minWidth: 900,
    minHeight: 600,
    title: '看见，即疗愈 · OH卡知识库',
    autoHideMenuBar: true,
    backgroundColor: '#fef9f3',
    webPreferences: {
      contextIsolation: true,
      nodeIntegration: false,
      sandbox: true,
    },
  });

  // 外链（http/https 非本地）一律用系统浏览器打开，不在 app 内导航
  mainWindow.webContents.setWindowOpenHandler(({ url }) => {
    if (!url.startsWith(`http://127.0.0.1:${port}`)) {
      shell.openExternal(url);
      return { action: 'deny' };
    }
    return { action: 'allow' };
  });

  mainWindow.webContents.on('will-navigate', (event, url) => {
    if (!url.startsWith(`http://127.0.0.1:${port}`)) {
      event.preventDefault();
      shell.openExternal(url);
    }
  });

  mainWindow.on('closed', () => {
    mainWindow = null;
  });

  await mainWindow.loadURL(`http://127.0.0.1:${port}/`);
}

// 简化菜单：只保留必要项，去掉默认 dev 菜单
function buildMenu() {
  const isMac = process.platform === 'darwin';
  const template = [
    ...(isMac
      ? [{
          label: app.name,
          submenu: [
            { role: 'about' },
            { type: 'separator' },
            { role: 'hide' },
            { role: 'hideOthers' },
            { role: 'unhide' },
            { type: 'separator' },
            { role: 'quit' },
          ],
        }]
      : []),
    {
      label: '编辑',
      submenu: [
        { role: 'copy', label: '复制' },
        { role: 'paste', label: '粘贴' },
        { role: 'selectAll', label: '全选' },
      ],
    },
    {
      label: '视图',
      submenu: [
        { role: 'reload', label: '刷新' },
        { role: 'forceReload', label: '强制刷新' },
        { type: 'separator' },
        { role: 'resetZoom', label: '实际大小' },
        { role: 'zoomIn', label: '放大' },
        { role: 'zoomOut', label: '缩小' },
        { type: 'separator' },
        { role: 'togglefullscreen', label: '全屏' },
      ],
    },
    {
      label: '窗口',
      submenu: [
        { role: 'minimize', label: '最小化' },
        { role: 'close', label: '关闭' },
      ],
    },
  ];
  Menu.setApplicationMenu(Menu.buildFromTemplate(template));
}

app.whenReady().then(async () => {
  buildMenu();
  await createWindow();

  app.on('activate', async () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      await createWindow();
    }
  });
});

app.on('window-all-closed', () => {
  if (serverInstance) {
    try { serverInstance.close(); } catch (_) { /* ignore */ }
    serverInstance = null;
  }
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('before-quit', () => {
  if (serverInstance) {
    try { serverInstance.close(); } catch (_) { /* ignore */ }
    serverInstance = null;
  }
});
