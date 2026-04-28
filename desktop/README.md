# OH 卡知识库 · 桌面客户端

把 [web/](../web/) 静态站点封装成 Windows / macOS 桌面应用，避免在 GitHub Pages 上加载 1.7 GB 资源时的卡顿。

技术栈：**Electron + electron-builder**（早期版本尝试过 Tauri，但 Tauri 编译期 `include_bytes!` 嵌入策略遇到 1.7 GB 资源会触发 LLVM 对象文件溢出；Electron 运行时从硬盘读文件，天然适配大资源场景）。

## 推荐：用 GitHub Actions 云端构建

### 触发方式

**方式 A：手动触发（推荐用于测试）**

1. GitHub 仓库页面 → `Actions` → 选 `Desktop Build (Windows + macOS)` → 点 `Run workflow` → 选 `main` → 跑
2. 跑完在该 workflow 运行页面底部下载 `desktop-windows` / `desktop-macos` artifacts
3. **不会创建 Release，不影响用户可见页面**

**方式 B：发布版本（推送 tag）**

```bash
git tag desktop-v0.1.0
git push origin desktop-v0.1.0
```

会自动构建并创建 GitHub Release 草稿，你审核后再公开。

### 产物

- Windows：`OH卡知识库-<version>-windows-x64-setup.exe`（NSIS）
- macOS：`OH卡知识库-<version>-macos-arm64.dmg`（Apple Silicon 原生）

体积预估：壳子 ~150 MB + 你的 web/out 1.7 GB = 安装包约 **1.85 GB**。

## 本地开发模式

```bash
# 1. 在仓库根目录先构建静态站点
cd web
npm install
npm run build

# 2. 进入 desktop/
cd ../desktop
npm install

# 3. 调试模式：直接打开窗口（开发模式从 ../web/out 加载）
npm start

# 4. 构建本地平台的安装包（产物在 desktop/dist/）
npm run build
```

## 工作原理

Electron 主进程（[main.js](main.js)）启动后做两件事：

1. 用 Node `http` + `serve-handler` 在 `127.0.0.1` 随机端口启个迷你静态服务器，根目录指向打包到 `process.resourcesPath/web` 的 web/out 内容
2. `BrowserWindow` 加载 `http://127.0.0.1:<port>/`

这样 Next.js 静态导出里的绝对路径（`/_next/static/...`、`/decks/[slug]/index.html` 等）能正常解析，不需要修改 [web/](../web/) 任何源码。

## 注意

- **不修改 [web/](../web/) 任何源文件**。本目录只把 web 构建产物 (`web/out/`) 当只读静态资源打包到 `extraResources`。
- macOS 版**未签名 + 未 notarized**。用户首次打开会提示"无法验证开发者"，**右键点图标 → 选"打开" → 确认**即可。要彻底无提示需要 Apple 开发者账号（$99/年）+ 在 GitHub Actions 配置签名 secrets。
- Windows 版未签名。SmartScreen 可能会拦"未知发布者"，点"更多信息 → 仍要运行"即可。
- macOS 版仅支持 Apple Silicon（M1+）。Intel Mac 用户极少，如有需要可单独加 `arch: ["x64"]` job。
