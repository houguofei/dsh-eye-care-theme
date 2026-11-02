# Changelog

## 1.0.2

### Fixed

- 点击护眼开关没有反应：开启时先叠 token 层、后切浅色，叠层触发的 `theme/change` 被本插件的「外观镜像」当成"用户切走了外观"，于是刚叠上的层立刻被移除，并把 `enabled` 回写成 `false`。现在先切到浅色（受 `ownWrite` 保护）再叠层。
- 开关状态改为以"当前实际生效的层"为准，不再用设置镜像里可能滞后的值判断；自己写入未落地期间忽略镜像回调（与 `ui-theme` 的 `pendingWrites` 同一策略），避免回执把刚做的操作反向撤销。

## 1.0.1

### Fixed

- 重启 DSH 后护眼模式不再保持开启：偏好原先存在 `localStorage`，而桌面端每次启动的页面 origin（端口）都不同，存储随之失效。改为由 Host 侧 `Config` 持久化到 profile 的设置文档（命名空间 `eye-care-theme`，字段 `enabled` / `previous`），跨重启有效。
- 护眼不再被内置「外观」的偏好回填打断：不再注册第三方主题 id（`ui-theme` 在设置回填时会把 preference 改回 light/dark/system，第三方 id 不在其 schema 内），改为在浅色主题上叠加一层 token 覆盖层，回填不会移除它。

### Changed

- Host 半新增 `Config`（依赖 `@deepseek-ai/schemastery`），克隆安装后需要在该目录执行一次 `pnpm install`。

## 1.0.0

### Added

- 新增护眼配色：暖色纸感，覆盖 Harness 的 `--dsw-*` 设计变量（中性色阶、强调色、状态色、菜单与浮层、代码块与语法高亮、diff、滚动条）。
- 「设置 → 通用」新增「护眼模式」开关行，注册在 `settings.general.item`（`order: 10.5`，紧跟「外观」）。
- 侧栏底部新增一键切换按钮，注册在 `sidebar.footer.action`（`order: 10`），展开与折叠轨道两种尺寸。
- 在「外观」里改选浅色/深色会自动退出护眼。

