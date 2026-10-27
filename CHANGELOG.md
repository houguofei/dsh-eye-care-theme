# Changelog

## 1.0.0

### Added

- 新增第三方主题 `eye-care`：暖色纸感配色，覆盖 Harness 的 `--dsw-*` 设计变量（中性色阶、强调色、状态色、菜单与浮层、代码块与语法高亮、diff、滚动条）。
- 「设置 → 通用」新增「护眼模式」开关行，注册在 `settings.general.item`（`order: 10.5`，紧跟「外观」）。
- 侧栏底部新增一键切换按钮，注册在 `sidebar.footer.action`（`order: 10`），展开与折叠轨道两种尺寸。
- 开关状态与本机原偏好保存在 `localStorage`，刷新后自动恢复；在「外观」里改选浅色/深色会自动退出护眼。
