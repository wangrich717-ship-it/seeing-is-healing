# OH 卡知识库 · 桌面客户端

把 [web/](../web/) 静态站点封装成 Windows / macOS 桌面应用，避免在 GitHub Pages 上加载 1.7 GB 资源时的卡顿。

技术栈：Tauri 2 + 现有 Next.js 静态导出（不修改 web/ 任何源码）。

## 推荐：用 GitHub Actions 云端构建

本地构建在 Windows 11 上会被 Smart App Control 拦截 Cargo 临时可执行文件，所以走云端最稳。

### 触发方式

**方式 A：手动触发（推荐用于测试）**

1. GitHub 仓库页面 → `Actions` → 选 `Desktop Build (Windows + macOS)` → 点 `Run workflow` → 选分支 → 跑
2. 跑完在该 workflow 运行页面底部下载 `desktop-windows` / `desktop-macos` artifacts
3. **不会创建 Release，不会动用户可见的页面**

**方式 B：发布版本（推送 tag）**

```bash
git tag desktop-v0.1.0
git push origin desktop-v0.1.0
```

会自动构建并创建 **草稿** Release（`draft: true`），你可以审核后再公开发布。

### 产物

- Windows：`*.msi` 和 `*-setup.exe`（NSIS）
- macOS：`*.dmg`（Apple Silicon 原生，M1/M2/M3 等芯片）

## 本地开发模式

如果以后想本地调试（前提是 SAC 已关或换台没启用 SAC 的电脑）：

```bash
# 1. 在仓库根目录先构建静态站点
cd web
npm install
npm run build

# 2. 进入 desktop/
cd ../desktop
npm install

# 3. 调试模式（开窗口实时查看）
npm run tauri dev

# 4. 构建安装包
npm run build
```

## 注意

- **不修改 [web/](../web/) 任何源文件**。本目录把 web 构建产物 (`web/out/`) 当作只读静态资源打包。
- macOS 版**未签名**。用户首次打开会提示"无法验证开发者"，右键 → 打开 → 确认即可。如需签名，需 Apple 开发者账号（$99/年）+ 在 GitHub Actions 中配置签名 secrets。
- Windows 版未签名。SmartScreen 可能会提示"未知发布者"，点"更多信息 → 仍要运行"即可。
